import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/db/prisma';
import { requireUser } from '@/lib/auth/requireAuth';
import { getRazorpayClient, toPaise } from '@/lib/payments/razorpay';
import { createAuditLog } from '@/lib/audit/auditLogger';
import { logger } from '@/lib/logging/logger';
import { formatSafeApiError } from '@/lib/errors/sentry';

const createOrderSchema = z.object({
  orderId: z.string().min(1, 'orderId is required'),
  orderType: z.enum(['EQUIPMENT_BOOKING', 'MARKETPLACE_ORDER', 'SERVICE_ORDER']),
});

export async function POST(req: Request) {
  const startTime = Date.now();
  try {
    // 1. Authenticate Clerk Session & resolve DB user
    const ctx = await requireUser();

    // 2. Validate request input
    const body = await req.json();
    const parsed = createOrderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'VALIDATION_FAILED', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { orderId, orderType } = parsed.data;

    // 3. Authoritative Order Lookup & Ownership Validation from PostgreSQL
    let authoritativeAmountRupees = 0;
    let orderDescription = '';

    if (orderType === 'EQUIPMENT_BOOKING') {
      const booking = await prisma.equipmentBooking.findUnique({
        where: { id: orderId },
        include: { farmer: true, equipment: true },
      });

      if (!booking) {
        return NextResponse.json(
          { error: 'NOT_FOUND', message: 'Equipment booking not found.' },
          { status: 404 }
        );
      }

      // Check ownership: Farmer must own the booking, or Admin
      if (booking.farmer.clerkUserId !== ctx.clerkUserId && ctx.role !== 'ADMIN' && ctx.role !== 'SUPER_ADMIN') {
        logger.warn('Unauthorized payment attempt on equipment booking', {
          userId: ctx.userId,
          bookingId: orderId,
          ownerClerkId: booking.farmer.clerkUserId,
        });
        return NextResponse.json(
          { error: 'FORBIDDEN', message: 'You are not authorized to pay for this booking.' },
          { status: 403 }
        );
      }

      if (booking.status === 'CANCELLED' || booking.status === 'REJECTED') {
        return NextResponse.json(
          { error: 'ORDER_NOT_PAYABLE', message: `Cannot pay for a ${booking.status.toLowerCase()} booking.` },
          { status: 400 }
        );
      }

      // Check if already paid
      const existingPaid = await prisma.payment.findFirst({
        where: {
          orderId,
          orderType,
          status: 'CAPTURED',
        },
      });

      if (existingPaid) {
        return NextResponse.json(
          { error: 'ORDER_ALREADY_PAID', message: 'This equipment booking has already been paid for.' },
          { status: 400 }
        );
      }

      authoritativeAmountRupees = booking.totalAmount;
      orderDescription = `Rental: ${booking.equipment.name} (${booking.totalHours} hrs)`;
    } else if (orderType === 'MARKETPLACE_ORDER') {
      const order = await prisma.marketplaceOrder.findUnique({
        where: { id: orderId },
        include: { listing: true },
      });

      if (!order) {
        return NextResponse.json(
          { error: 'NOT_FOUND', message: 'Marketplace order not found.' },
          { status: 404 }
        );
      }

      if (order.buyerUserId !== ctx.userId && ctx.role !== 'ADMIN' && ctx.role !== 'SUPER_ADMIN') {
        return NextResponse.json(
          { error: 'FORBIDDEN', message: 'You are not authorized to pay for this marketplace order.' },
          { status: 403 }
        );
      }

      if (order.status === 'CANCELLED') {
        return NextResponse.json(
          { error: 'ORDER_NOT_PAYABLE', message: 'Cannot pay for a cancelled order.' },
          { status: 400 }
        );
      }

      const existingPaid = await prisma.payment.findFirst({
        where: {
          orderId,
          orderType,
          status: 'CAPTURED',
        },
      });

      if (existingPaid) {
        return NextResponse.json(
          { error: 'ORDER_ALREADY_PAID', message: 'This marketplace order has already been paid for.' },
          { status: 400 }
        );
      }

      authoritativeAmountRupees = order.totalAmount;
      orderDescription = `Crop Purchase: ${order.listing.cropName} (${order.quantityKg} kg)`;
    } else {
      return NextResponse.json(
        { error: 'UNSUPPORTED_ORDER_TYPE', message: `Order type '${orderType}' is not currently supported.` },
        { status: 400 }
      );
    }

    // 4. Server-Side Authoritative Amount Calculation
    const amountPaise = toPaise(authoritativeAmountRupees);
    if (amountPaise <= 0) {
      return NextResponse.json(
        { error: 'INVALID_AMOUNT', message: 'Order amount must be greater than zero.' },
        { status: 400 }
      );
    }

    // 5. Prevent Unnecessary Duplicate Razorpay Orders (Reuse pending order if created within 15 min)
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
    const existingActivePayment = await prisma.payment.findFirst({
      where: {
        orderId,
        orderType,
        userId: ctx.userId,
        status: 'CREATED',
        amountPaise,
        createdAt: { gte: fifteenMinutesAgo },
      },
    });

    if (existingActivePayment) {
      logger.info('Reusing active Razorpay order', {
        orderId,
        paymentId: existingActivePayment.id,
        razorpayOrderId: existingActivePayment.razorpayOrderId,
      });

      return NextResponse.json({
        success: true,
        razorpayOrderId: existingActivePayment.razorpayOrderId,
        amount: existingActivePayment.amountPaise,
        currency: existingActivePayment.currency,
        keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID,
        orderId,
        orderType,
        displayAmountRupees: authoritativeAmountRupees,
        description: orderDescription,
      });
    }

    // 6. Create Razorpay Order via official SDK (with safe test mode fallback)
    let rzpOrderId: string;
    let isTestFallback = false;
    try {
      const razorpay = getRazorpayClient();
      const shortReceipt = `rcpt_${orderId.slice(-8)}_${Date.now().toString().slice(-4)}`;

      const rzpOrder = await razorpay.orders.create({
        amount: amountPaise,
        currency: 'INR',
        receipt: shortReceipt,
        notes: {
          orderId,
          orderType,
          userId: ctx.userId,
          clerkUserId: ctx.clerkUserId,
        },
      });
      rzpOrderId = rzpOrder.id;
    } catch (rzpErr: any) {
      logger.warn('Razorpay API credentials unavailable or rejected, using test mode order for demo', {
        error: rzpErr.message,
      });
      rzpOrderId = `order_test_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      isTestFallback = true;
    }

    // 7. Persist Internal Payment Record in Neon PostgreSQL
    const payment = await prisma.payment.create({
      data: {
        orderId,
        orderType,
        userId: ctx.userId,
        razorpayOrderId: rzpOrderId,
        amount: authoritativeAmountRupees,
        amountPaise,
        currency: 'INR',
        status: 'CREATED',
        equipmentBookingId: orderType === 'EQUIPMENT_BOOKING' ? orderId : undefined,
        marketplaceOrderId: orderType === 'MARKETPLACE_ORDER' ? orderId : undefined,
      },
    });

    // 8. Authoritative AuditLog (Dual-Write)
    await createAuditLog({
      actorId: ctx.userId,
      actorUserId: ctx.userId,
      actorRole: ctx.role,
      actorName: ctx.name,
      action: 'PAYMENT_ORDER_CREATED',
      resource: 'PAYMENT',
      resourceType: 'PAYMENT',
      resourceId: payment.id,
      purpose: 'Razorpay Checkout Order Initialization',
      details: `Created Razorpay order ${rzpOrderId} for ${orderType} #${orderId} (₹${authoritativeAmountRupees})`,
      metadata: {
        orderId,
        orderType,
        razorpayOrderId: rzpOrderId,
        amountRupees: authoritativeAmountRupees,
        amountPaise,
      },
    });

    // 9. Structured operational logging to Better Stack
    logger.info('Razorpay payment order initialized', {
      paymentId: payment.id,
      orderId,
      orderType,
      razorpayOrderId: rzpOrderId,
      amountRupees: authoritativeAmountRupees,
      durationMs: Date.now() - startTime,
    });

    // 10. Return only safe data required by client Checkout (Never leak secrets!)
    return NextResponse.json({
      success: true,
      razorpayOrderId: rzpOrderId,
      isTestFallback,
      amount: amountPaise,
      currency: 'INR',
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || 'rzp_test_T8KoDPvXFqJ91x',
      orderId,
      orderType,
      displayAmountRupees: authoritativeAmountRupees,
      description: orderDescription,
    });
  } catch (error: any) {
    return NextResponse.json(
      formatSafeApiError(error, {
        action: 'payment.create_order',
        module: 'marketplace',
      }),
      { status: error.message?.startsWith('UNAUTHORIZED') ? 401 : 500 }
    );
  }
}
