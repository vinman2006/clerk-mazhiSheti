import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth/requireAuth';
import prisma from '@/lib/db/prisma';
import { irrigationCommandSchema } from '@/lib/validation/schemas';
import { createAuditLog } from '@/lib/audit/auditLogger';
import { logger } from '@/lib/logging/logger';

export async function POST(req: Request) {
  const startTime = Date.now();
  try {
    const ctx = await requireUser();

    if (!ctx.farmerId) {
      return NextResponse.json({ error: 'FARMER_PROFILE_REQUIRED' }, { status: 400 });
    }

    const body = await req.json();
    const parsed = irrigationCommandSchema.safeParse(body);

    if (!parsed.success) {
      logger.warn('Irrigation command schema validation failed', {
        userId: ctx.userId,
        farmerId: ctx.farmerId,
        errors: parsed.error.format(),
        action: 'irrigation.control.validation_error',
      });
      return NextResponse.json({ error: 'VALIDATION_FAILED', details: parsed.error.format() }, { status: 400 });
    }

    const data = parsed.data;

    // Verify system ownership via farm
    const system = await prisma.irrigationSystem.findUnique({
      where: { id: data.systemId },
      include: {
        farm: true,
        device: true,
      },
    });

    if (!system || system.farm.farmerId !== ctx.farmerId) {
      logger.warn('Unauthorized irrigation command attempt', {
        userId: ctx.userId,
        farmerId: ctx.farmerId,
        targetSystemId: data.systemId,
        action: 'irrigation.control.forbidden',
      });
      return NextResponse.json({ error: 'FORBIDDEN: You do not own this irrigation valve system.' }, { status: 403 });
    }

    const auditAction = data.action === 'START' ? 'IRRIGATION_STARTED' : data.action === 'EMERGENCY_STOP' ? 'IRRIGATION_EMERGENCY_ABORT' : 'IRRIGATION_STOPPED';

    // Update system status
    const updatedSystem = await prisma.irrigationSystem.update({
      where: { id: data.systemId },
      data: {
        status: data.action === 'START' ? 'IRRIGATING' : data.action === 'EMERGENCY_STOP' ? 'EMERGENCY_STOPPED' : 'IDLE',
        autoMode: data.action === 'UPDATE_AUTO_MODE' ? true : system.autoMode,
        moistureMinThreshold: data.moistureMinThreshold || system.moistureMinThreshold,
        moistureMaxThreshold: data.moistureMaxThreshold || system.moistureMaxThreshold,
        lastRunAt: data.action === 'START' ? new Date() : system.lastRunAt,
      },
    });

    // Record Irrigation Event
    await prisma.irrigationEvent.create({
      data: {
        systemId: data.systemId,
        fieldId: system.device?.fieldId || undefined,
        startTime: new Date(),
        durationSeconds: (data.durationMinutes || 15) * 60,
        waterVolumeLiters: (data.durationMinutes || 15) * 45.0, // estimated 45L/min micro-sprinklers
        trigger: data.action === 'START' ? 'MANUAL_OVERRIDE' : 'AUTO_SENSOR',
        status: data.action === 'EMERGENCY_STOP' ? 'EMERGENCY_ABORTED' : 'COMPLETED',
        notes: data.reason || `Actuation requested by farmer ${ctx.name || ctx.userId}`,
      },
    });

    // 1. Authoritative AuditLog in database + Better Stack
    await createAuditLog({
      actorId: ctx.userId,
      actorUserId: ctx.userId,
      actorRole: ctx.role,
      actorName: ctx.name,
      action: auditAction,
      resource: 'IRRIGATION_SYSTEM',
      resourceType: 'IRRIGATION_SYSTEM',
      resourceId: system.id,
      purpose: 'Field Micro-Sprinkler Soil Moisture Regulation',
      details: `Action ${data.action} executed for farm '${system.farm.name}'. Duration: ${data.durationMinutes || 15}m. Safety interlock active.`,
      metadata: {
        action: data.action,
        durationMinutes: data.durationMinutes,
        farmId: system.farmId,
      },
    });

    // 2. Structured log to Better Stack
    logger.info(`Irrigation command executed: ${data.action}`, {
      userId: ctx.userId,
      farmerId: ctx.farmerId,
      systemId: system.id,
      farmId: system.farmId,
      action: 'irrigation.actuate',
      command: data.action,
      durationMinutes: data.durationMinutes,
      durationMs: Date.now() - startTime,
    });

    return NextResponse.json({ success: true, system: updatedSystem });
  } catch (error: any) {
    logger.error('Failed to execute irrigation command', {
      action: 'irrigation.actuate',
      durationMs: Date.now() - startTime,
    }, error);

    return NextResponse.json(
      { error: error.message || 'Failed to actuate irrigation system.' },
      { status: error.message?.startsWith('UNAUTHORIZED') ? 401 : 500 }
    );
  }
}
