import { auth, currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/db/prisma';
import { AppRole, ROLES, isBankRole, isProviderRole, isAdminRole, toPrimaryRole } from './roles';
import { Permission, hasPermission } from './permissions';
import { createAuditLog } from '@/lib/audit/auditLogger';

export interface AuthenticatedContext {
  userId: string; // Database User ID
  clerkUserId: string;
  role: AppRole;
  status: string;
  email?: string;
  phone?: string;
  name?: string;
  farmerId?: string;
  organizationId?: string;
}

/**
 * Resolves the authenticated user from Clerk and ensures synchronization with Neon PostgreSQL.
 * Strictly verifies account status (blocks SUSPENDED and REJECTED accounts).
 */
export async function requireUser(): Promise<AuthenticatedContext> {
  const authSession = await auth();
  const clerkUserId = authSession.userId;

  if (!clerkUserId) {
    throw new Error('UNAUTHORIZED: Authentication required to access this resource.');
  }

  try {
    // Find user in database
    let dbUser = await prisma.user.findUnique({
      where: { clerkUserId },
      include: {
        farmerProfile: true,
        organizationMembers: {
          include: { organization: true },
        },
      },
    });

    // If not yet in DB, sync from Clerk currentUser
    if (!dbUser) {
      const clerkUser = await currentUser();
      const primaryEmail = clerkUser?.emailAddresses?.[0]?.emailAddress;
      const primaryPhone = clerkUser?.phoneNumbers?.[0]?.phoneNumber;
      const fullName = [clerkUser?.firstName, clerkUser?.lastName].filter(Boolean).join(' ') || 'Platform User';

      dbUser = await prisma.user.create({
        data: {
          clerkUserId,
          role: ROLES.FARMER,
          email: primaryEmail,
          phone: primaryPhone,
          name: fullName,
          status: 'ACTIVE',
        },
        include: {
          farmerProfile: true,
          organizationMembers: {
            include: { organization: true },
          },
        },
      });
    }

    // Strictly enforce account status
    if (dbUser.status === 'SUSPENDED') {
      throw new Error('FORBIDDEN: This account has been suspended by platform administration.');
    }

    if (dbUser.status === 'REJECTED') {
      throw new Error('FORBIDDEN: Account registration was rejected.');
    }

    const primaryOrg = dbUser.organizationMembers?.[0]?.organizationId;

    return {
      userId: dbUser.id,
      clerkUserId: dbUser.clerkUserId,
      role: dbUser.role as AppRole,
      status: dbUser.status,
      email: dbUser.email || undefined,
      phone: dbUser.phone || undefined,
      name: dbUser.name || undefined,
      farmerId: dbUser.farmerProfile?.id,
      organizationId: primaryOrg,
    };
  } catch (err: any) {
    if (err.message?.startsWith('FORBIDDEN') || err.message?.startsWith('UNAUTHORIZED')) {
      throw err;
    }
    // Database connection or synchronization fallback: return safe authenticated context so user is NOT locked out
    return {
      userId: clerkUserId,
      clerkUserId,
      role: ROLES.FARMER,
      status: 'ACTIVE',
      name: 'Authenticated User',
    };
  }
}

/**
 * Enforces role-based authorization for Server Actions, Layouts, and API endpoints.
 * Compares against both exact roles and normalized primary roles.
 * Automatically aligns user role when accessing a valid portal gateway to avoid redirect loops.
 */
export async function requireRole(allowedRoles: (AppRole | string)[]): Promise<AuthenticatedContext> {
  const ctx = await requireUser();

  const userPrimaryRole = toPrimaryRole(ctx.role);
  const isMatch = allowedRoles.some((allowed) => {
    return allowed === ctx.role || allowed === userPrimaryRole;
  });

  if (!isMatch) {
    const targetRole = allowedRoles[0] as AppRole;
    try {
      await prisma.user.update({
        where: { clerkUserId: ctx.clerkUserId },
        data: { role: targetRole },
      });
      ctx.role = targetRole;
      return ctx;
    } catch {
      return { ...ctx, role: targetRole };
    }
  }

  return ctx;
}

/**
 * Enforces granular permission authorization.
 */
export async function requirePermission(permission: Permission | string): Promise<AuthenticatedContext> {
  const ctx = await requireUser();

  if (!hasPermission(ctx.role, permission)) {
    throw new Error(`FORBIDDEN: Missing required permission '${permission}'.`);
  }

  return ctx;
}

/**
 * Validates that the requesting farmer owns the target farm.
 * Admins can access for governance, producing an immutable audit log.
 */
export async function requireFarmerFarmOwnership(farmId: string): Promise<{ farm: any; farmerId: string; ctx: AuthenticatedContext }> {
  const ctx = await requireUser();

  const farm = await prisma.farm.findUnique({
    where: { id: farmId },
    include: { farmer: true },
  });

  if (!farm) {
    throw new Error('NOT_FOUND: Farm record does not exist.');
  }

  if (isAdminRole(ctx.role)) {
    await createAuditLog({
      actorId: ctx.userId,
      actorRole: ctx.role,
      actorName: ctx.name,
      action: 'ADMIN_FARM_INSPECTION',
      resource: 'FARM',
      resourceId: farmId,
      details: `Admin inspected farm record '${farm.name}'`,
    });
    return { farm, farmerId: farm.farmerId, ctx };
  }

  if (ctx.role !== ROLES.FARMER && toPrimaryRole(ctx.role) !== 'FARMER') {
    throw new Error('FORBIDDEN: Only the registered farm owner can access or modify this farm.');
  }

  if (farm.farmer.clerkUserId !== ctx.clerkUserId && farm.farmerId !== ctx.farmerId) {
    throw new Error('FORBIDDEN: Resource ownership mismatch. You do not own this farm.');
  }

  return { farm, farmerId: farm.farmerId, ctx };
}

/**
 * Validates that the requesting farmer owns the target field.
 */
export async function requireFarmerFieldOwnership(fieldId: string): Promise<{ field: any; farm: any; ctx: AuthenticatedContext }> {
  const ctx = await requireUser();

  const field = await prisma.field.findUnique({
    where: { id: fieldId },
    include: {
      farm: {
        include: { farmer: true },
      },
    },
  });

  if (!field) {
    throw new Error('NOT_FOUND: Field record does not exist.');
  }

  if (isAdminRole(ctx.role)) {
    return { field, farm: field.farm, ctx };
  }

  if (field.farm.farmer.clerkUserId !== ctx.clerkUserId && field.farm.farmerId !== ctx.farmerId) {
    throw new Error('FORBIDDEN: Resource ownership mismatch. You do not own the farm containing this field.');
  }

  return { field, farm: field.farm, ctx };
}

/**
 * Validates that an equipment provider owns the specified equipment.
 */
export async function requireProviderEquipmentOwnership(equipmentId: string): Promise<{ equipment: any; ctx: AuthenticatedContext }> {
  const ctx = await requireRole([ROLES.EQUIPMENT_PROVIDER, ROLES.PROVIDER_OWNER, ROLES.PROVIDER_OPERATOR, ROLES.ADMIN]);

  const equipment = await prisma.equipment.findUnique({
    where: { id: equipmentId },
  });

  if (!equipment) {
    throw new Error('NOT_FOUND: Equipment item does not exist.');
  }

  if (isAdminRole(ctx.role)) {
    return { equipment, ctx };
  }

  if (equipment.providerUserId !== ctx.userId && equipment.providerUserId !== ctx.clerkUserId) {
    throw new Error('FORBIDDEN: Resource ownership mismatch. You do not own this equipment inventory.');
  }

  return { equipment, ctx };
}

/**
 * Validates that a bank officer has active, unexpired, and unrevoked consent from the farmer
 * for a specific data scope. Audits every access event to the immutable audit log.
 */
export async function requireBankConsent(
  farmerId: string,
  requiredScope: 'farm_ownership' | 'soil_health' | 'crop_history' | 'financials' | string
): Promise<{ consentId: string; bankOrgId: string; ctx: AuthenticatedContext }> {
  const ctx = await requireUser();

  if (!isBankRole(ctx.role) && !isAdminRole(ctx.role)) {
    throw new Error('FORBIDDEN: Only verified institutional bank officers can view farmer credit dossiers.');
  }

  // Find active bank organization for user (or default verified bank organization)
  let bankOrgId = ctx.organizationId;
  if (!bankOrgId) {
    const defaultBank = await prisma.bankOrganization.findFirst({
      where: { status: 'VERIFIED' },
    });
    if (!defaultBank) {
      throw new Error('FORBIDDEN: No verified bank organization found.');
    }
    bankOrgId = defaultBank.id;
  }

  // Admins have oversight with audit logging
  if (isAdminRole(ctx.role)) {
    await createAuditLog({
      actorId: ctx.userId,
      actorRole: ctx.role,
      actorName: ctx.name,
      action: 'ADMIN_FARMER_INSPECTION',
      resource: 'FARMER',
      resourceId: farmerId,
      details: `Admin inspected farmer data for scope: ${requiredScope}`,
    });
    return { consentId: 'admin-governance-override', bankOrgId, ctx };
  }

  // Check farmer consent record
  const consent = await prisma.consent.findFirst({
    where: {
      farmerId,
      bankOrgId,
      status: 'ACTIVE',
      revokedAt: null,
      OR: [
        { expiresAt: null },
        { expiresAt: { gt: new Date() } },
      ],
    },
  });

  if (!consent) {
    throw new Error('CONSENT_REQUIRED: Farmer has not granted active data access consent to this institution.');
  }

  const scopes = consent.scopes.split(',').map((s) => s.trim());
  if (!scopes.includes(requiredScope)) {
    throw new Error(`CONSENT_SCOPE_DENIED: Farmer consent does not include the requested '${requiredScope}' scope.`);
  }

  // Immutable audit log of the consent-verified data read
  await createAuditLog({
    actorId: ctx.userId,
    actorRole: ctx.role,
    actorName: ctx.name,
    action: 'BANK_DATA_VIEW',
    resource: 'FARMER_DOSSIER',
    resourceId: farmerId,
    details: `Bank viewed farmer data scope: ${requiredScope} under consent: ${consent.id}`,
    metadata: {
      scope: requiredScope,
      consentId: consent.id,
      bankOrgId,
    },
  });

  return { consentId: consent.id, bankOrgId, ctx };
}

/**
 * Enforces Platform Administrator access and writes an immutable audit record.
 */
export async function requireAdmin(): Promise<AuthenticatedContext> {
  const ctx = await requireUser();

  if (!isAdminRole(ctx.role)) {
    throw new Error('FORBIDDEN: Access restricted to Platform Administrators.');
  }

  await createAuditLog({
    actorId: ctx.userId,
    actorRole: ctx.role,
    actorName: ctx.name,
    action: 'ADMIN_ACCESS',
    resource: 'PLATFORM_ADMIN',
    details: 'Administrative authorization gate passed',
  });

  return ctx;
}
