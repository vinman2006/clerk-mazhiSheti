import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { verifyRazorpayWebhookSignature } from '@/lib/payments/razorpay';
import { createAuditLog } from '@/lib/audit/auditLogger';
import { logger } from '@/lib/logging/logger';
import { captureAppError } from '@/lib/errors/sentry';

export async function POST(req: Request) {
  const startTime = Date.now();
  let eventId = 'unknown';
  let eventType = 'unknown';

  try {
    // 1. Read the RAW request body directly for strict cryptographic signature verification
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature) {
      logger.warn('Razorpay webhook missing x-razorpay-signature header');
      return NextResponse.json(
        { error: 'MISSING_SIGNATURE', message: 'Webhook signature header missing.' },
        { status: 400 }
      );
    }

    // 2. Cryptographic HMAC SHA-256 Signature Verification
    const isValid = verifyRazorpayWebhookSignature(rawBody, signature);
    if (!isValid) {
      logger.error('Razorpay webhook signature verification failed', {
        action: 'razorpay.webhook.signature_error',
      });
      return NextResponse.json(
        { error: 'INVALID_SIGNATURE', message: 'Webhook signature is invalid.' },
        { status: 400 }
      );
    }

    // 3. Parse Event Body safely
    const event = JSON.parse(rawBody);
    eventId = event.id || `evt_${Date.now()}`;
    eventType = event.event || 'unknown';

    // 4. Idempotency Check: Prevent duplicate webhook processing
    const existingEvent = await prisma.razorpayWebhookEvent.findUnique({
      where: { eventId },
    });

    if (existingEvent) {
      logger.info('Razorpay webhook event already processed (idempotent response)', {
        eventId,
        eventType,
      });
      return NextResponse.json({ received: true, idempotent: true }, { status: 200 });
    }

    // 5. Process Supported Razorpay Events
    if (eventType === 'payment.captured' || eventType === 'order.paid') {
      const paymentEntity = event.payload?.payment?.entity;
      const orderEntity = event.payload?.order?.entity;

      const rzpOrderId = paymentEntity?.order_id || orderEntity?.id;
      const rzpPaymentId = paymentEntity?.id;
      const paymentMethod = (paymentEntity?.method || 'ONLINE').toUpperCase();

      if (rzpOrderId) {
        const payment = await prisma.payment.findUnique({
          where: { razorpayOrderId: rzpOrderId },
        });

        if (payment && payment.status !== 'CAPTURED') {
          const now = new Date();

          await prisma.$transaction(async (tx) => {
            // Update payment record
            await tx.payment.update({
              where: { id: payment.id },
              data: {
                status: 'CAPTURED',
                razorpayPaymentId: rzpPaymentId || payment.razorpayPaymentId,
                method: paymentMethod,
                signatureVerified: true,
                paidAt: now,
              },
            });

            // Update underlying business order
            if (payment.orderType === 'EQUIPMENT_BOOKING') {
              await tx.equipmentBooking.update({
                where: { id: payment.orderId },
                data: { status: 'ACCEPTED' },
              });
            } else if (payment.orderType === 'MARKETPLACE_ORDER') {
              await tx.marketplaceOrder.update({
                where: { id: payment.orderId },
                data: { status: 'CONFIRMED' },
              });
            }

            // Record webhook idempotency
            await tx.razorpayWebhookEvent.create({
              data: {
                eventId,
                eventType,
                status: 'PROCESSED',
                payload: JSON.stringify({
                  orderId: payment.orderId,
                  razorpayOrderId: rzpOrderId,
                  amount: payment.amount,
                }),
              },
            });
          });

          // Audit trail
          await createAuditLog({
            actorId: 'RAZORPAY_SYSTEM_WEBHOOK',
            actorRole: 'SYSTEM',
            action: 'RAZORPAY_WEBHOOK_PROCESSED',
            resource: 'PAYMENT',
            resourceId: payment.id,
            purpose: 'Server-to-Server Payment Reconciliation',
            details: `Reconciled ${eventType} for ${payment.orderType} #${payment.orderId}`,
            metadata: {
              eventId,
              eventType,
              razorpayOrderId: rzpOrderId,
              razorpayPaymentId: rzpPaymentId,
              amount: payment.amount,
            },
          });

          logger.info('Razorpay webhook reconciled payment successfully', {
            eventId,
            eventType,
            orderId: payment.orderId,
            paymentId: payment.id,
            durationMs: Date.now() - startTime,
          });

          return NextResponse.json({ received: true, reconciled: true }, { status: 200 });
        }
      }
    } else if (eventType === 'payment.failed') {
      const paymentEntity = event.payload?.payment?.entity;
      const rzpOrderId = paymentEntity?.order_id;
      const failureReason = paymentEntity?.error_description || 'Payment rejected by bank or gateway';

      if (rzpOrderId) {
        const payment = await prisma.payment.findUnique({
          where: { razorpayOrderId: rzpOrderId },
        });

        if (payment && payment.status === 'CREATED') {
          await prisma.$transaction(async (tx) => {
            await tx.payment.update({
              where: { id: payment.id },
              data: {
                status: 'FAILED',
                failureReason,
                razorpayPaymentId: paymentEntity?.id,
              },
            });

            await tx.razorpayWebhookEvent.create({
              data: {
                eventId,
                eventType,
                status: 'PROCESSED',
                payload: JSON.stringify({
                  orderId: payment.orderId,
                  failureReason,
                }),
              },
            });
          });

          await createAuditLog({
            actorId: 'RAZORPAY_SYSTEM_WEBHOOK',
            actorRole: 'SYSTEM',
            action: 'PAYMENT_FAILED',
            resource: 'PAYMENT',
            resourceId: payment.id,
            details: `Payment failure webhook processed: ${failureReason}`,
          });
        }
      }
    }

    // 6. Record processed generic event
    await prisma.razorpayWebhookEvent.create({
      data: {
        eventId,
        eventType,
        status: 'PROCESSED',
      },
    });

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    captureAppError(error, {
      action: 'razorpay.webhook',
      module: 'marketplace',
      extra: { eventId, eventType },
    });

    return NextResponse.json(
      { error: 'WEBHOOK_PROCESSING_ERROR', message: 'An internal error occurred while processing the webhook.' },
      { status: 500 }
    );
  }
}
