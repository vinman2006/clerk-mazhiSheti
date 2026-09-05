import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';
import prisma from '@/lib/db/prisma';
import { logger } from '@/lib/logging/logger';
import { captureAppError } from '@/lib/errors/sentry';
import { createAuditLog } from '@/lib/audit/auditLogger';

export async function POST(req: Request) {
  const startTime = Date.now();
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    logger.warn('Clerk webhook rejected: missing Svix verification headers', {
      action: 'clerk.webhook.missing_headers',
    });
    return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    logger.error('CLERK_WEBHOOK_SECRET is not configured in environment', {
      action: 'clerk.webhook.misconfigured',
    });
    return NextResponse.json({ error: 'Webhook secret unconfigured' }, { status: 500 });
  }

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: any;

  // 1. Verify Webhook Signature
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err: any) {
    captureAppError(err, {
      action: 'clerk.webhook.signature_verification_failed',
      module: 'auth',
      extra: { svixId: svix_id },
    });
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
  }

  const eventType = evt.type;
  logger.info(`Clerk webhook received: ${eventType}`, {
    eventType,
    eventId: evt.data?.id,
    action: 'clerk.webhook.received',
  });

  // 2. Process Business Identity Events
  try {
    if (eventType === 'user.created' || eventType === 'user.updated') {
      const { id: clerkUserId, email_addresses, phone_numbers, first_name, last_name, public_metadata } = evt.data;
      const primaryEmail = email_addresses?.[0]?.email_address;
      const primaryPhone = phone_numbers?.[0]?.phone_number;
      const fullName = [first_name, last_name].filter(Boolean).join(' ') || 'Farmer User';
      const assignedRole = (public_metadata?.role as string) || 'FARMER';

      const user = await prisma.user.upsert({
        where: { clerkUserId },
        update: {
          email: primaryEmail || undefined,
          phone: primaryPhone || undefined,
          name: fullName,
          role: assignedRole,
        },
        create: {
          clerkUserId,
          email: primaryEmail,
          phone: primaryPhone,
          name: fullName,
          role: assignedRole,
        },
      });

      // Authoritative audit log
      await createAuditLog({
        actorId: user.id,
        actorUserId: user.id,
        actorRole: user.role,
        actorName: user.name || 'User',
        action: eventType === 'user.created' ? 'USER_REGISTERED' : 'USER_UPDATED',
        resource: 'USER',
        resourceType: 'USER',
        resourceId: user.id,
        purpose: 'Identity Lifecycle Synchronization',
        details: `Synchronized Clerk identity ${clerkUserId} for ${user.name} (${user.role})`,
      });

      logger.info(`Synchronized Clerk user in application database: ${clerkUserId}`, {
        clerkUserId,
        userId: user.id,
        role: user.role,
        durationMs: Date.now() - startTime,
        action: 'clerk.webhook.user_synced',
      });
    }

    if (eventType === 'user.deleted') {
      const clerkUserId = evt.data?.id;
      if (clerkUserId) {
        await prisma.user.updateMany({
          where: { clerkUserId },
          data: { status: 'SUSPENDED' },
        });

        logger.info(`Deactivated user in database following Clerk deletion: ${clerkUserId}`, {
          clerkUserId,
          action: 'clerk.webhook.user_deactivated',
        });
      }
    }

    return NextResponse.json({ success: true, eventType });
  } catch (dbError: any) {
    // 3. Dual error logging to Sentry and Better Stack
    captureAppError(dbError, {
      action: 'clerk.webhook.db_sync_error',
      module: 'auth',
      extra: { eventType, eventId: evt.data?.id },
    });

    return NextResponse.json({ error: 'Database synchronization failed' }, { status: 500 });
  }
}
