import { NextResponse } from 'next/server';
import { requireUser, requireRole } from '@/lib/auth/requireAuth';
import { ROLES, isBankRole } from '@/lib/auth/roles';
import prisma from '@/lib/db/prisma';
import { loanApplicationSchema } from '@/lib/validation/schemas';
import { createAuditLog } from '@/lib/audit/auditLogger';
import { logger } from '@/lib/logging/logger';

export async function POST(req: Request) {
  const startTime = Date.now();
  try {
    const ctx = await requireUser();

    if (!ctx.farmerId) {
      return NextResponse.json(
        { error: 'FARMER_PROFILE_REQUIRED', message: 'Only registered farmers can apply for agricultural credit.' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const parsed = loanApplicationSchema.safeParse(body);

    if (!parsed.success) {
      logger.warn('Loan submission validation failed', {
        userId: ctx.userId,
        farmerId: ctx.farmerId,
        errors: parsed.error.format(),
        action: 'loan.apply.validation_error',
      });
      return NextResponse.json({ error: 'VALIDATION_FAILED', details: parsed.error.format() }, { status: 400 });
    }

    const data = parsed.data;

    // Generate application number
    const appNo = `MSCB-KCC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const loan = await prisma.loanApplication.create({
      data: {
        farmerId: ctx.farmerId,
        bankOrgId: data.bankOrgId,
        applicationNo: appNo,
        schemeName: data.schemeName,
        amountRequested: data.amountRequested,
        tenureMonths: data.tenureMonths,
        purpose: data.purpose,
        status: 'SUBMITTED',
      },
    });

    // 1. Authoritative AuditLog
    await createAuditLog({
      actorId: ctx.userId,
      actorUserId: ctx.userId,
      actorRole: ctx.role,
      actorName: ctx.name,
      actorOrganizationId: data.bankOrgId,
      action: 'LOAN_CREATED',
      resource: 'LOAN_APPLICATION',
      resourceType: 'LOAN_APPLICATION',
      resourceId: loan.id,
      purpose: 'Agricultural Working Capital / Kisan Credit Card',
      details: `Farmer applied for ₹${data.amountRequested} under ${data.schemeName} (Application: ${appNo})`,
      metadata: {
        applicationNo: appNo,
        amount: data.amountRequested,
        tenureMonths: data.tenureMonths,
      },
    });

    // 2. Structured log to Better Stack
    logger.info('Loan application submitted', {
      userId: ctx.userId,
      farmerId: ctx.farmerId,
      loanId: loan.id,
      applicationNo: appNo,
      amount: data.amountRequested,
      action: 'loan.apply',
      durationMs: Date.now() - startTime,
    });

    return NextResponse.json({ success: true, loan }, { status: 201 });
  } catch (error: any) {
    logger.error('Failed to submit loan application', {
      action: 'loan.apply',
      durationMs: Date.now() - startTime,
    }, error);

    return NextResponse.json(
      { error: error.message || 'Failed to submit loan application.' },
      { status: error.message?.startsWith('UNAUTHORIZED') ? 401 : 500 }
    );
  }
}

export async function PATCH(req: Request) {
  const startTime = Date.now();
  try {
    // Only verified bank officers or admins can update loan status
    const ctx = await requireUser();

    if (!isBankRole(ctx.role) && ctx.role !== ROLES.ADMIN && ctx.role !== ROLES.SUPER_ADMIN) {
      logger.warn('Unauthorized attempt to update loan status', {
        userId: ctx.userId,
        role: ctx.role,
        action: 'loan.status_update.forbidden',
      });
      return NextResponse.json({ error: 'FORBIDDEN: Bank authority required to review loans.' }, { status: 403 });
    }

    const { loanId, status, reviewNotes } = await req.json();

    if (!loanId || !status) {
      return NextResponse.json({ error: 'loanId and status are required' }, { status: 400 });
    }

    // Role-based status transition check
    if ((status === 'APPROVED' || status === 'DISBURSED') && ctx.role === ROLES.BANK_LOAN_OFFICER) {
      logger.warn('Loan Officer attempted approval without BANK_ADMIN role', {
        userId: ctx.userId,
        role: ctx.role,
        loanId,
        attemptedStatus: status,
      });
      return NextResponse.json(
        { error: 'FORBIDDEN: Loan officers can only review; approval requires Bank Admin or Manager.' },
        { status: 403 }
      );
    }

    const updated = await prisma.loanApplication.update({
      where: { id: loanId },
      data: {
        status,
        reviewedByUserId: ctx.userId,
        reviewNotes: reviewNotes || undefined,
      },
    });

    const auditAction = status === 'APPROVED' ? 'LOAN_APPROVED' : status === 'REJECTED' ? 'LOAN_REJECTED' : 'LOAN_STATUS_UPDATED';

    // 1. Authoritative AuditLog
    await createAuditLog({
      actorId: ctx.userId,
      actorUserId: ctx.userId,
      actorRole: ctx.role,
      actorName: ctx.name,
      action: auditAction,
      resource: 'LOAN_APPLICATION',
      resourceType: 'LOAN_APPLICATION',
      resourceId: loanId,
      purpose: 'Credit Risk Decision & Underwriting',
      details: `Bank officer ${ctx.name || ctx.userId} updated status of loan ${updated.applicationNo} to ${status}`,
      metadata: {
        previousStatus: updated.status,
        newStatus: status,
        reviewNotes,
      },
    });

    // 2. Structured log to Better Stack
    logger.info(`Loan status transitioned to ${status}`, {
      userId: ctx.userId,
      role: ctx.role,
      loanId,
      applicationNo: updated.applicationNo,
      status,
      action: 'loan.status_update',
      durationMs: Date.now() - startTime,
    });

    return NextResponse.json({ success: true, loan: updated });
  } catch (error: any) {
    logger.error('Failed to update loan status', {
      action: 'loan.status_update',
      durationMs: Date.now() - startTime,
    }, error);

    return NextResponse.json(
      { error: error.message || 'Failed to update loan status.' },
      { status: error.message?.startsWith('UNAUTHORIZED') ? 401 : 500 }
    );
  }
}
