import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth/requireAuth';
import prisma from '@/lib/db/prisma';
import { consentGrantSchema } from '@/lib/validation/schemas';
import { createAuditLog } from '@/lib/audit/auditLogger';
import { logger } from '@/lib/logging/logger';
import { isBankRole, ROLES } from '@/lib/auth/roles';

/**
 * GET /api/consents
 * List consents for the authenticated farmer or bank organization.
 */
export async function GET(req: Request) {
  const startTime = Date.now();
  try {
    const ctx = await requireUser();
    const { searchParams } = new URL(req.url);
    const targetFarmerId = searchParams.get('farmerId');

    // 1. Farmer viewing their own consents
    if (ctx.farmerId) {
      const consents = await prisma.consent.findMany({
        where: { farmerId: ctx.farmerId },
        include: { bank: true },
        orderBy: { grantedAt: 'desc' },
      });

      logger.info('Fetched farmer consents', {
        userId: ctx.userId,
        farmerId: ctx.farmerId,
        count: consents.length,
        durationMs: Date.now() - startTime,
        action: 'consent.list.farmer',
      });

      return NextResponse.json({ consents });
    }

    // 2. Bank Officer viewing consents granted to their bank organization
    if (isBankRole(ctx.role) || ctx.role === ROLES.ADMIN || ctx.role === ROLES.SUPER_ADMIN) {
      // Find the user's organization membership
      const membership = await prisma.organizationMember.findFirst({
        where: { userId: ctx.userId },
        include: { organization: true },
      });

      const bankOrgId = membership?.organizationId;

      const whereClause: any = {};
      if (bankOrgId) {
        whereClause.bankOrgId = bankOrgId;
      }
      if (targetFarmerId) {
        whereClause.farmerId = targetFarmerId;
      }

      const consents = await prisma.consent.findMany({
        where: whereClause,
        include: {
          farmer: {
            select: {
              id: true,
              name: true,
              village: true,
              taluka: true,
              district: true,
              totalLandAcres: true,
              soilHealthScore: true,
            },
          },
          bank: true,
        },
        orderBy: { grantedAt: 'desc' },
      });

      logger.info('Fetched bank consents', {
        userId: ctx.userId,
        bankOrgId,
        count: consents.length,
        durationMs: Date.now() - startTime,
        action: 'consent.list.bank',
      });

      return NextResponse.json({ consents });
    }

    return NextResponse.json({ consents: [] });
  } catch (error: any) {
    logger.error('Failed to list consents', {
      durationMs: Date.now() - startTime,
    }, error);

    return NextResponse.json(
      { error: error.message || 'Failed to list consents.' },
      { status: error.message?.startsWith('UNAUTHORIZED') ? 401 : 500 }
    );
  }
}

/**
 * POST /api/consents
 * Farmer grants scoped data access consent to a bank institution.
 */
export async function POST(req: Request) {
  const startTime = Date.now();
  try {
    const ctx = await requireUser();

    if (!ctx.farmerId) {
      return NextResponse.json(
        { error: 'FARMER_PROFILE_REQUIRED', message: 'Only registered farmers can grant data consent.' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const parsed = consentGrantSchema.safeParse(body);

    if (!parsed.success) {
      logger.warn('Consent grant validation failed', {
        userId: ctx.userId,
        farmerId: ctx.farmerId,
        errors: parsed.error.format(),
        action: 'consent.grant.validation_error',
      });
      return NextResponse.json({ error: 'VALIDATION_FAILED', details: parsed.error.format() }, { status: 400 });
    }

    const data = parsed.data;

    const bank = await prisma.bankOrganization.findUnique({
      where: { id: data.bankOrgId },
    });

    if (!bank) {
      return NextResponse.json({ error: 'NOT_FOUND: Bank institution does not exist.' }, { status: 404 });
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + data.expiresInDays);

    const consent = await prisma.consent.create({
      data: {
        farmerId: ctx.farmerId,
        bankOrgId: data.bankOrgId,
        purpose: data.purpose,
        scopes: data.scopes.join(','),
        status: 'ACTIVE',
        expiresAt,
      },
      include: { bank: true },
    });

    // 1. Authoritative AuditLog
    await createAuditLog({
      actorId: ctx.userId,
      actorUserId: ctx.userId,
      actorRole: ctx.role,
      actorName: ctx.name,
      actorOrganizationId: data.bankOrgId,
      action: 'CONSENT_GRANTED',
      resource: 'CONSENT',
      resourceType: 'CONSENT',
      resourceId: consent.id,
      purpose: data.purpose,
      details: `Farmer ${ctx.name || ctx.userId} granted scopes [${data.scopes.join(', ')}] to bank ${bank.name}`,
      metadata: {
        scopes: data.scopes,
        bankOrgId: data.bankOrgId,
        bankName: bank.name,
        expiresAt: expiresAt.toISOString(),
      },
    });

    // 2. Structured log to Better Stack
    logger.info('Consent granted to financial institution', {
      userId: ctx.userId,
      farmerId: ctx.farmerId,
      consentId: consent.id,
      bankOrgId: data.bankOrgId,
      scopes: data.scopes,
      action: 'consent.grant',
      durationMs: Date.now() - startTime,
    });

    return NextResponse.json({ success: true, consent }, { status: 201 });
  } catch (error: any) {
    logger.error('Failed to grant consent', {
      action: 'consent.grant',
      durationMs: Date.now() - startTime,
    }, error);

    return NextResponse.json(
      { error: error.message || 'Failed to grant consent.' },
      { status: error.message?.startsWith('UNAUTHORIZED') ? 401 : 500 }
    );
  }
}

/**
 * DELETE /api/consents
 * Farmer revokes scoped data access, immediately preventing bank queries.
 */
export async function DELETE(req: Request) {
  const startTime = Date.now();
  try {
    const ctx = await requireUser();

    if (!ctx.farmerId) {
      return NextResponse.json({ error: 'FARMER_PROFILE_REQUIRED' }, { status: 400 });
    }

    const { consentId } = await req.json();

    if (!consentId) {
      return NextResponse.json({ error: 'consentId is required' }, { status: 400 });
    }

    const consent = await prisma.consent.findUnique({
      where: { id: consentId },
      include: { bank: true },
    });

    if (!consent || consent.farmerId !== ctx.farmerId) {
      logger.warn('Unauthorized consent revocation attempt', {
        userId: ctx.userId,
        farmerId: ctx.farmerId,
        consentId,
        action: 'consent.revoke.forbidden',
      });
      return NextResponse.json({ error: 'FORBIDDEN: You do not own this consent record.' }, { status: 403 });
    }

    const updated = await prisma.consent.update({
      where: { id: consentId },
      data: {
        status: 'REVOKED',
        revokedAt: new Date(),
      },
      include: { bank: true },
    });

    // 1. Authoritative AuditLog
    await createAuditLog({
      actorId: ctx.userId,
      actorUserId: ctx.userId,
      actorRole: ctx.role,
      actorName: ctx.name,
      actorOrganizationId: consent.bankOrgId,
      action: 'CONSENT_REVOKED',
      resource: 'CONSENT',
      resourceType: 'CONSENT',
      resourceId: consent.id,
      purpose: 'Data Sovereignty / Farmer Revocation',
      details: `Farmer ${ctx.name || ctx.userId} REVOKED data access from ${consent.bank.name}`,
      metadata: {
        consentId: consent.id,
        bankOrgId: consent.bankOrgId,
        revokedAt: updated.revokedAt?.toISOString(),
      },
    });

    // 2. Structured log to Better Stack
    logger.info('Consent revoked by farmer', {
      userId: ctx.userId,
      farmerId: ctx.farmerId,
      consentId: consent.id,
      bankOrgId: consent.bankOrgId,
      action: 'consent.revoke',
      durationMs: Date.now() - startTime,
    });

    return NextResponse.json({ success: true, consent: updated });
  } catch (error: any) {
    logger.error('Failed to revoke consent', {
      action: 'consent.revoke',
      durationMs: Date.now() - startTime,
    }, error);

    return NextResponse.json(
      { error: error.message || 'Failed to revoke consent.' },
      { status: error.message?.startsWith('UNAUTHORIZED') ? 401 : 500 }
    );
  }
}
