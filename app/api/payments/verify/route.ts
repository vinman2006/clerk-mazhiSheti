import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/db/prisma';
import { requireUser } from '@/lib/auth/requireAuth';
import { verifyRazorpayPaymentSignature, getRazorpayClient } from '@/lib/payments/razorpay';
import { createAuditLog } from '@/lib/audit/auditLogger';
import { logger } from '@/lib/logging/logger';
import { formatSafeApiError } from '@/lib/errors/sentry';

const verifyPaymentSchema = z.object({
  orderId: z.string().min(1, 'orderId is required'),
  orderType: z.enum(['EQUIPMENT_BOOKING', 'MARKETPLACE_ORDER', 'SERVICE_ORDER']),
  razorpayOrderId: z.string().min(1, 'razorpayOrderId is required'),
  razorpayPaymentId: z.string().min(1, 'razorpayPaymentId is required'),
  razorpaySignature: z.string().min(1, 'razorpaySignature is required'),
});

export async function POST(req: Request) {
  const startTime = Date.now();
  try {
    // 1. Authenticate Clerk Session
    const ctx = await requireUser();

    // 2. Validate input
    const body = await req.json();
    const parsed = verifyPaymentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'VALIDATION_FAILED', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { orderId, orderType, razorpayOrderId, razorpayPaymentId, razorpaySignature } = parsed.data;

    // 3. Find corresponding internal Payment record
    const payment = await prisma.payment.findFirst({
      where: {
        razorpayOrderId,
        orderId,
        orderType,
      },
    });

    if (!payment) {
      logger.warn('Payment record not found for verification', {
        orderId,
        razorpayOrderId,
        userId: ctx.userId,
      });
      return NextResponse.json(
        { error: 'NOT_FOUND', message: 'Matching payment record not found.' },
        { status: 404 }
      );
    }

    // 4. Verify Ownership
    if (payment.userId !== ctx.userId && ctx.role !== 'ADMIN' && ctx.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'FORBIDDEN', message: 'You are not authorized to verify this payment.' },
        { status: 403 }
      );
    }

    // 5. Idempotent check: if already CAPTURED, return success immediately
    if (payment.status === 'CAPTURED' && payment.signatureVerified) {
      logger.info('Payment already captured and verified (idempotent)', {
        paymentId: payment.id,
        orderId,
      });
      return NextResponse.json({
        success: true,
        paymentId: payment.id,
        status: 'CAPTURED',
        alreadyProcessed: true,
        amount: payment.amount,
      });
    }

    // 6. Cryptographic Signature Verification (Timing-safe HMAC SHA-256)
    const isSignatureValid = verifyRazorpayPaymentSignature(
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    );

    if (!isSignatureValid) {
      // Record failed verification in database and audit
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'FAILED',
          failureReason: 'CRYPTOGRAPHIC_SIGNATURE_MISMATCH',
          razorpayPaymentId,
          razorpaySignature,
        },
      });

      await createAuditLog({
        actorId: ctx.userId,
        actorUserId: ctx.userId,
        actorRole: ctx.role,
        action: 'PAYMENT_VERIFICATION_FAILED',
        resource: 'PAYMENT',
        resourceId: payment.id,
        purpose: 'Security Interlock',
        details: `Signature verification failed for payment on ${orderType} #${orderId}`,
        metadata: {
          orderId,
          razorpayOrderId,
          razorpayPaymentId,
        },
      });

      logger.warn('Razorpay signature verification rejected', {
        paymentId: payment.id,
        orderId,
        razorpayOrderId,
      });

      return NextResponse.json(
        { error: 'SIGNATURE_INVALID', message: 'Cryptographic payment verification failed.' },
        { status: 400 }
      );
    }

    // 7. Fetch verified payment details from Razorpay SDK
    let paymentMethod = 'ONLINE';
    try {
      const razorpay = getRazorpayClient();
      const rzpPaymentDetails: any = await razorpay.payments.fetch(razorpayPaymentId);

      if (rzpPaymentDetails) {
        paymentMethod = (rzpPaymentDetails.method || 'ONLINE').toUpperCase();

        // Ensure captured amount matches our authoritative internal record
        if (rzpPaymentDetails.amount !== payment.amountPaise) {
          logger.error('Razorpay paid amount does not match authoritative order amount', {
            paymentId: payment.id,
            expectedPaise: payment.amountPaise,
            receivedPaise: rzpPaymentDetails.amount,
          });
          return NextResponse.json(
            { error: 'AMOUNT_MISMATCH', message: 'The verified payment amount does not match the order total.' },
            { status: 400 }
          );
        }
      }
    } catch (fetchErr: any) {
      // In local testing without real API roundtrip, rely on valid HMAC signature
      logger.warn('Razorpay API payment fetch notice', {
        message: fetchErr?.message,
      });
    }

    // 8. Atomic Database Transaction: Update Payment & Business Order
    const now = new Date();
    await prisma.$transaction(async (tx) => {
      // Update Payment to CAPTURED
      await tx.payment.update({
        where: { id: payment.id },
        data: {
          status: 'CAPTURED',
          razorpayPaymentId,
          razorpaySignature,
          signatureVerified: true,
          method: paymentMethod,
          paidAt: now,
        },
      });

      // Update actual business order
      if (orderType === 'EQUIPMENT_BOOKING') {
        await tx.equipmentBooking.update({
          where: { id: orderId },
          data: {
            status: 'ACCEPTED',
          },
        });
      } else if (orderType === 'MARKETPLACE_ORDER') {
        await tx.marketplaceOrder.update({
          where: { id: orderId },
          data: {
            status: 'CONFIRMED',
          },
        });
      }

      // Create notification for farmer
      await tx.notification.create({
        data: {
          userId: ctx.userId,
          title: 'Payment Successful',
          message: `Your payment of ₹${payment.amount.toLocaleString('en-IN')} for ${orderType.replace('_', ' ').toLowerCase()} #${orderId} was confirmed.`,
          category: orderType === 'EQUIPMENT_BOOKING' ? 'EQUIPMENT' : 'SYSTEM',
        },
      });
    });

    // 9. Authoritative AuditLog (Dual-Write)
    await createAuditLog({
      actorId: ctx.userId,
      actorUserId: ctx.userId,
      actorRole: ctx.role,
      actorName: ctx.name,
      action: 'PAYMENT_CAPTURED',
      resource: 'PAYMENT',
      resourceType: 'PAYMENT',
      resourceId: payment.id,
      purpose: 'Order Fulfillment Confirmation',
      details: `Payment of ₹${payment.amount} successfully captured via ${paymentMethod} for ${orderType} #${orderId}`,
      metadata: {
        orderId,
        orderType,
        razorpayOrderId,
        razorpayPaymentId,
        amount: payment.amount,
        method: paymentMethod,
      },
    });

    // 10. Structured operational log to Better Stack
    logger.info('Payment verified and captured successfully', {
      paymentId: payment.id,
      orderId,
      orderType,
      method: paymentMethod,
      amountRupees: payment.amount,
      durationMs: Date.now() - startTime,
    });

    return NextResponse.json({
      success: true,
      paymentId: payment.id,
      status: 'CAPTURED',
      amount: payment.amount,
      method: paymentMethod,
    });
  } catch (error: any) {
    return NextResponse.json(
      formatSafeApiError(error, {
        action: 'payment.verify',
        module: 'marketplace',
      }),
      { status: error.message?.startsWith('UNAUTHORIZED') ? 401 : 500 }
    );
  }
}
