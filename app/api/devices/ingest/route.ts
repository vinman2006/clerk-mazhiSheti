import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { deviceIngestSchema } from '@/lib/validation/schemas';
import { createAuditLog } from '@/lib/audit/auditLogger';
import { logger } from '@/lib/logging/logger';

export async function POST(req: Request) {
  const startTime = Date.now();
  try {
    const body = await req.json();

    // 1. Strict Zod Schema validation
    const parsed = deviceIngestSchema.safeParse(body);
    if (!parsed.success) {
      logger.warn('IoT telemetry packet rejected by validation schema', {
        errors: parsed.error.format(),
        rawDeviceCode: body?.deviceCode,
        action: 'iot.ingest.validation_error',
        durationMs: Date.now() - startTime,
      });
      return NextResponse.json({ error: 'INVALID_TELEMETRY_PAYLOAD', details: parsed.error.format() }, { status: 400 });
    }

    const data = parsed.data;

    // 2. Identify hardware device by deviceCode
    const device = await prisma.device.findUnique({
      where: { deviceCode: data.deviceCode },
      include: {
        field: true,
        farm: true,
        irrigationSystems: true,
      },
    });

    if (!device) {
      logger.warn('Unregistered IoT device attempted telemetry ingestion', {
        deviceCode: data.deviceCode,
        action: 'iot.ingest.unregistered_device',
        durationMs: Date.now() - startTime,
      });
      return NextResponse.json({ error: 'DEVICE_NOT_REGISTERED' }, { status: 404 });
    }

    // 3. Persist DeviceReading time-series
    const reading = await prisma.deviceReading.create({
      data: {
        deviceId: device.id,
        timestamp: data.timestamp ? new Date(data.timestamp) : new Date(),
        moisture: data.moisture,
        temperature: data.temperature,
        humidity: data.humidity,
        battery: data.battery,
        rawPayload: data.rawPayload,
      },
    });

    // 4. Update Device Heartbeat and Battery
    await prisma.device.update({
      where: { id: device.id },
      data: {
        lastHeartbeat: new Date(),
        status: 'ONLINE',
        batteryLevel: data.battery ? data.battery : device.batteryLevel,
      },
    });

    // 5. Automatic Irrigation Threshold Evaluation
    let autoTriggered = false;
    if (data.moisture !== undefined && device.irrigationSystems?.length) {
      const activeSystem = device.irrigationSystems[0];
      
      // If autoMode is active and moisture dropped below safety min threshold (e.g. < 30%)
      if (activeSystem.autoMode && data.moisture < activeSystem.moistureMinThreshold && activeSystem.status === 'IDLE') {
        autoTriggered = true;
        
        // Actuate system with 15-minute cycle
        await prisma.irrigationSystem.update({
          where: { id: activeSystem.id },
          data: { status: 'IRRIGATING', lastRunAt: new Date() },
        });

        await prisma.irrigationEvent.create({
          data: {
            systemId: activeSystem.id,
            fieldId: device.fieldId,
            startTime: new Date(),
            durationSeconds: 15 * 60,
            waterVolumeLiters: 675.0, // 15m * 45L/m
            trigger: 'AUTO_SENSOR',
            status: 'COMPLETED',
            notes: `Auto-triggered by probe ${device.deviceCode}: moisture dropped to ${data.moisture}% (target min: ${activeSystem.moistureMinThreshold}%)`,
          },
        });

        // Audit the automated actuation
        await createAuditLog({
          actorId: device.id,
          actorUserId: device.id,
          actorRole: 'SYSTEM_DEVICE',
          actorName: `IoT Gateway (${device.deviceCode})`,
          action: 'IRRIGATION_AUTO_TRIGGER',
          resource: 'IRRIGATION_SYSTEM',
          resourceType: 'IRRIGATION_SYSTEM',
          resourceId: activeSystem.id,
          purpose: 'Automated Root-Zone Moisture Defense',
          details: `Soil moisture dropped to ${data.moisture}%. 15-minute micro-sprinkler cycle actuated.`,
          metadata: {
            moisture: data.moisture,
            threshold: activeSystem.moistureMinThreshold,
            fieldId: device.fieldId,
          },
        });
      }
    }

    // 6. Ship structured log to Better Stack
    logger.info('IoT telemetry packet ingested', {
      deviceId: device.id,
      deviceCode: device.deviceCode,
      fieldId: device.fieldId,
      moisture: data.moisture,
      temperature: data.temperature,
      battery: data.battery,
      autoIrrigationTriggered: autoTriggered,
      action: 'iot.ingest.success',
      durationMs: Date.now() - startTime,
    });

    return NextResponse.json({
      success: true,
      readingId: reading.id,
      deviceStatus: 'ONLINE',
      autoIrrigationTriggered: autoTriggered,
    }, { status: 201 });
  } catch (error: any) {
    logger.error('Failed to ingest IoT device telemetry', {
      action: 'iot.ingest.fatal',
      durationMs: Date.now() - startTime,
    }, error);

    return NextResponse.json(
      { error: error.message || 'Internal ingestion error' },
      { status: 500 }
    );
  }
}
