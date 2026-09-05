import { auth, currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/db/prisma';
import { AppRole, ROLES, isBankRole } from './roles';
import { createAuditLog } from '@/lib/audit/auditLogger';

export interface AuthenticatedContext {
  userId: string; // Database User ID
  clerkUserId: string;
  role: AppRole;
  email?: string;
  phone?: string;
  name?: string;
  farmerId?: string;
}

/**
 * Resolves the authenticated user from Clerk and ensures synchronization with the application database.
 */
export async function requireUser(): Promise<AuthenticatedContext> {
  const authSession = await auth();
  const clerkUserId = authSession.userId;

  if (!clerkUserId) {
    throw new Error('UNAUTHORIZED: Authentication required to access this resource.');
  }

  // Find user in database
  let dbUser = await prisma.user.findUnique({
    where: { clerkUserId },
    include: { farmerProfile: true },
  });

  // If not yet in DB, sync from Clerk currentUser
  if (!dbUser) {
    const clerkUser = await currentUser();
    const primaryEmail = clerkUser?.emailAddresses?.[0]?.emailAddress;
    const primaryPhone = clerkUser?.phoneNumbers?.[0]?.phoneNumber;
    const fullName = [clerkUser?.firstName, clerkUser?.lastName].filter(Boolean).join(' ') || 'Farmer User';

    dbUser = await prisma.user.create({
      data: {
        clerkUserId,
        role: ROLES.FARMER,
        email: primaryEmail,
        phone: primaryPhone,
        name: fullName,
      },
      include: { farmerProfile: true },
    });
  }

  if (dbUser.status === 'SUSPENDED') {
    throw new Error('FORBIDDEN: This account has been suspended by platform administration.');
  }

  return {
    userId: dbUser.id,
    clerkUserId: dbUser.clerkUserId,
    role: dbUser.role as AppRole,
    email: dbUser.email || undefined,
    phone: dbUser.phone || undefined,
    name: dbUser.name || undefined,
    farmerId: dbUser.farmerProfile?.id,
  };
}

/**
 * Enforces role-based authorization for Server Actions and API endpoints.
 */
export async function requireRole(allowedRoles: AppRole[]): Promise<AuthenticatedContext> {
  const ctx = await requireUser();

  if (!allowedRoles.includes(ctx.role)) {
    throw new Error(`FORBIDDEN: Insufficient permissions. Required role in [${allowedRoles.join(', ')}] but found '${ctx.role}'.`);
  }

  return ctx;
}

/**
 * Validates that the requesting farmer owns the target farm.
 */
export async function requireFarmerFarmOwnership(farmId: string): Promise<{ farm: any; farmerId: string }> {
  const ctx = await requireRole([ROLES.FARMER, ROLES.ADMIN, ROLES.SUPER_ADMIN]);

  const farm = await prisma.farm.findUnique({
    where: { id: farmId },
    include: { farmer: true },
  });

  if (!farm) {
    throw new Error('NOT_FOUND: Farm record does not exist.');
  }

  // Admins can inspect; farmers must own it
  if (ctx.role === ROLES.FARMER && farm.farmer.clerkUserId !== ctx.clerkUserId) {
    throw new Error('FORBIDDEN: You do not have permission to access or manage this farm.');
  }

  return { farm, farmerId: farm.farmerId };
}

/**
 * Validates that a bank officer has active consent from the farmer for a specific scope.
 * Audits the access event to the immutable audit log.
 */
export async function requireBankConsent(
  farmerId: string,
  requiredScope: 'farm_ownership' | 'soil_health' | 'crop_history' | 'financials'
): Promise<{ consentId: string; bankOrgId: string }> {
  const ctx = await requireUser();

  if (!isBankRole(ctx.role) && ctx.role !== ROLES.ADMIN && ctx.role !== ROLES.SUPER_ADMIN) {
    throw new Error('FORBIDDEN: Only verified institutional bank officers can view farmer credit dossiers.');
  }

  // Find active bank organization for user (or default demo org)
  const bankOrg = await prisma.bankOrganization.findFirst({
    where: { status: 'VERIFIED' },
  });

  if (!bankOrg) {
    throw new Error('FORBIDDEN: No verified bank organization found.');
  }

  // If Admin, grant oversight access with audit
  if (ctx.role === ROLES.ADMIN || ctx.role === ROLES.SUPER_ADMIN) {
    await createAuditLog({
      actorId: ctx.userId,
      actorRole: ctx.role,
      actorName: ctx.name,
      action: 'ADMIN_FARMER_INSPECTION',
      resource: 'FARMER',
      resourceId: farmerId,
      details: `Admin inspected farmer data for scope: ${requiredScope}`,
    });
    return { consentId: 'admin-override', bankOrgId: bankOrg.id };
  }

  // Check farmer consent record
  const consent = await prisma.consent.findFirst({
    where: {
      farmerId,
      bankOrgId: bankOrg.id,
      status: 'ACTIVE',
      OR: [
        { expiresAt: null },
        { expiresAt: { gt: new Date() } },
      ],
    },
  });

  if (!consent) {
    throw new Error('CONSENT_REQUIRED: Farmer has not granted data access consent to this institution.');
  }

  const scopes = consent.scopes.split(',').map((s) => s.trim());
  if (!scopes.includes(requiredScope)) {
    throw new Error(`CONSENT_SCOPE_DENIED: Farmer consent does not include the requested '${requiredScope}' scope.`);
  }

  // Log successful consent-verified read
  await createAuditLog({
    actorId: ctx.userId,
    actorRole: ctx.role,
    actorName: ctx.name,
    action: 'BANK_DATA_VIEW',
    resource: 'FARMER_DOSSIER',
    resourceId: farmerId,
    details: `Bank viewed farmer data scope: ${requiredScope} under consent: ${consent.id}`,
  });

  return { consentId: consent.id, bankOrgId: bankOrg.id };
}
