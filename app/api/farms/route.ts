import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth/requireAuth';
import prisma from '@/lib/db/prisma';
import { farmCreateSchema } from '@/lib/validation/schemas';
import { createAuditLog } from '@/lib/audit/auditLogger';
import { logger } from '@/lib/logging/logger';

export async function GET() {
  const startTime = Date.now();
  try {
    const ctx = await requireUser();

    if (!ctx.farmerId) {
      return NextResponse.json({ error: 'FARMER_PROFILE_REQUIRED' }, { status: 400 });
    }

    const farms = await prisma.farm.findMany({
      where: { farmerId: ctx.farmerId },
      include: {
        fields: true,
      },
    });

    logger.info('Fetched farmer farms', {
      userId: ctx.userId,
      farmerId: ctx.farmerId,
      farmCount: farms.length,
      durationMs: Date.now() - startTime,
      action: 'farm.list',
    });

    return NextResponse.json({ farms });
  } catch (error: any) {
    logger.error('Failed to fetch farmer farms', {
      durationMs: Date.now() - startTime,
      error: error.message,
    }, error);

    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: error.message?.startsWith('UNAUTHORIZED') ? 401 : 500 }
    );
  }
}

export async function POST(req: Request) {
  const startTime = Date.now();
  try {
    const ctx = await requireUser();

    if (!ctx.farmerId) {
      return NextResponse.json(
        { error: 'FARMER_PROFILE_REQUIRED', message: 'Please complete farmer onboarding before creating farms.' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const parsed = farmCreateSchema.safeParse(body);

    if (!parsed.success) {
      logger.warn('Farm creation validation failed', {
        userId: ctx.userId,
        farmerId: ctx.farmerId,
        validationErrors: parsed.error.format(),
        action: 'farm.create.validation_error',
      });
      return NextResponse.json({ error: 'VALIDATION_FAILED', details: parsed.error.format() }, { status: 400 });
    }

    const data = parsed.data;

    const farm = await prisma.farm.create({
      data: {
        farmerId: ctx.farmerId,
        name: data.name,
        totalAreaAcres: data.totalAreaAcres,
        surveyNumber: data.surveyNumber,
        location: data.location,
        latitude: data.latitude,
        longitude: data.longitude,
      },
    });

    // 1. Authoritative AuditLog in database + Better Stack stream
    await createAuditLog({
      actorId: ctx.userId,
      actorUserId: ctx.userId,
      actorRole: ctx.role,
      actorName: ctx.name,
      action: 'FARM_CREATED',
      resource: 'FARM',
      resourceType: 'FARM',
      resourceId: farm.id,
      purpose: 'Farmer Farm Expansion',
      details: `Created new farm '${farm.name}' (${farm.totalAreaAcres} acres) in ${farm.location}`,
      metadata: {
        farmId: farm.id,
        totalAreaAcres: farm.totalAreaAcres,
      },
    });

    // 2. Structured log to Better Stack
    logger.info('Farm created', {
      userId: ctx.userId,
      farmerId: ctx.farmerId,
      farmId: farm.id,
      action: 'farm.create',
      totalAreaAcres: farm.totalAreaAcres,
      durationMs: Date.now() - startTime,
    });

    return NextResponse.json({ success: true, farm }, { status: 201 });
  } catch (error: any) {
    logger.error('Failed to create farm', {
      action: 'farm.create',
      durationMs: Date.now() - startTime,
      errorCode: error.code || 'UNKNOWN',
    }, error);

    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred while creating your farm.' },
      { status: error.message?.startsWith('UNAUTHORIZED') ? 401 : 500 }
    );
  }
}
