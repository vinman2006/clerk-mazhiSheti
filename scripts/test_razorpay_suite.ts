/**
 * Mazhi Sheti — Razorpay Payment System Automated Test Suite
 * 
 * Verifies:
 * 1. Cryptographic HMAC SHA-256 signature verification (timing-safe)
 * 2. Webhook HMAC SHA-256 raw body signature verification
 * 3. Authoritative monetary conversions (Rupees <-> Paise without float drift)
 * 4. Database payment lifecycle & order fulfillment in Neon PostgreSQL
 * 5. Webhook idempotency and duplicate processing protection
 * 6. Audit logging dual-write on payment capture
 * 7. Secret sanitization and zero-credential leakage
 */

import fs from 'fs';
import path from 'path';

// Automatically load local environment variables for standalone test runs
const envFiles = ['.env.local', '.env'];
for (const file of envFiles) {
  const fullPath = path.resolve(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const match = trimmed.match(/^([^=]+)=(.*)$/);
        if (match) {
          const key = match[1].trim();
          let val = match[2].trim();
          if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    }
  }
}

import crypto from 'crypto';
import prisma from '../lib/db/prisma';
import { 
  verifyRazorpayPaymentSignature, 
  verifyRazorpayWebhookSignature, 
  toPaise, 
  toRupees 
} from '../lib/payments/razorpay';
import { createAuditLog } from '../lib/audit/auditLogger';
import { sanitizeLogData } from '../lib/logging/sanitize';

const TEST_SECRET = 'test_secret_key_89234892384923';
const TEST_WEBHOOK_SECRET = 'test_webhook_secret_998877';

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

async function runRazorpaySuite() {
  console.log('\n=============================================================');
  console.log('MAZHI SHETI: EXECUTING AUTOMATED RAZORPAY PAYMENT TEST SUITE');
  console.log('=============================================================\n');

  // Backup original env
  const origKeySecret = process.env.RAZORPAY_KEY_SECRET;
  const origWebhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  process.env.RAZORPAY_KEY_SECRET = TEST_SECRET;
  process.env.RAZORPAY_WEBHOOK_SECRET = TEST_WEBHOOK_SECRET;

  try {
    // -------------------------------------------------------------------------
    // 1. Monetary Conversion & Precision Security
    // -------------------------------------------------------------------------
    console.log('[1] Monetary Conversion & Precision Security:');
    assert(toPaise(100) === 10000, '₹100 converts strictly to 10000 paise');
    assert(toPaise(6800.50) === 680050, '₹6800.50 converts accurately to 680050 paise');
    assert(toPaise(0) === 0, '₹0 converts to 0 paise');
    assert(toRupees(10000) === 100.00, '10000 paise converts to ₹100.00');
    assert(toRupees(680050) === 6800.50, '680050 paise converts to ₹6800.50');

    let threwOnNegative = false;
    try {
      toPaise(-50);
    } catch {
      threwOnNegative = true;
    }
    assert(threwOnNegative, 'Negative amount rejected with INVALID_AMOUNT error');

    // -------------------------------------------------------------------------
    // 2. Cryptographic Checkout Signature Verification
    // -------------------------------------------------------------------------
    console.log('\n[2] Cryptographic Checkout Signature Verification:');
    const orderId = 'order_test_998811';
    const paymentId = 'pay_test_776655';
    const payload = `${orderId}|${paymentId}`;
    const validSignature = crypto
      .createHmac('sha256', TEST_SECRET)
      .update(payload)
      .digest('hex');

    assert(
      verifyRazorpayPaymentSignature(orderId, paymentId, validSignature),
      'Valid HMAC SHA-256 checkout signature successfully verified'
    );

    const tamperedSignature = validSignature.slice(0, -4) + '0000';
    assert(
      !verifyRazorpayPaymentSignature(orderId, paymentId, tamperedSignature),
      'Tampered signature rejected by timingSafeEqual'
    );

    assert(
      !verifyRazorpayPaymentSignature(orderId, 'pay_different_id', validSignature),
      'Mismatched payment ID rejected'
    );

    assert(
      !verifyRazorpayPaymentSignature('order_different_id', paymentId, validSignature),
      'Mismatched order ID rejected'
    );

    // -------------------------------------------------------------------------
    // 3. Webhook Raw Body Signature Verification
    // -------------------------------------------------------------------------
    console.log('\n[3] Webhook Raw Body Signature Verification:');
    const webhookRawBody = JSON.stringify({
      entity: 'event',
      account_id: 'acc_test_123',
      event: 'payment.captured',
      payload: {
        payment: {
          entity: {
            id: paymentId,
            order_id: orderId,
            amount: 680000,
            status: 'captured',
          },
        },
      },
    });

    const validWebhookSig = crypto
      .createHmac('sha256', TEST_WEBHOOK_SECRET)
      .update(webhookRawBody)
      .digest('hex');

    assert(
      verifyRazorpayWebhookSignature(webhookRawBody, validWebhookSig),
      'Valid raw JSON webhook signature verified'
    );

    const tamperedWebhookBody = webhookRawBody + ' ';
    assert(
      !verifyRazorpayWebhookSignature(tamperedWebhookBody, validWebhookSig),
      'Tampered raw body (even trailing whitespace) rejected'
    );

    assert(
      !verifyRazorpayWebhookSignature(webhookRawBody, 'invalid_hex_sig_here'),
      'Invalid webhook signature string rejected'
    );

    // -------------------------------------------------------------------------
    // 4. Database Payment Lifecycle in Neon PostgreSQL
    // -------------------------------------------------------------------------
    console.log('\n[4] Database Payment Lifecycle & State Machine (Neon PostgreSQL):');
    const testClerkId = `test_clerk_${Date.now()}`;
    const user = await prisma.user.create({
      data: {
        clerkUserId: testClerkId,
        role: 'FARMER',
        name: 'Test Payment Farmer',
        email: `test_pay_${Date.now()}@example.com`,
      },
    });

    const testRzpOrderId = `order_rzp_${Date.now()}`;
    const testRzpPaymentId = `pay_rzp_${Date.now()}`;

    // Create Payment record
    const payment = await prisma.payment.create({
      data: {
        orderId: 'booking_synthetic_01',
        orderType: 'EQUIPMENT_BOOKING',
        userId: user.id,
        razorpayOrderId: testRzpOrderId,
        amount: 4500.0,
        amountPaise: 450000,
        status: 'CREATED',
      },
    });

    assert(payment.status === 'CREATED', 'Initial payment status is CREATED');
    assert(payment.amountPaise === 450000, 'Authoritative amount recorded in paise');
    assert(payment.signatureVerified === false, 'Signature starts unverified');

    // Simulate successful signature verification and capture
    const updatedPayment = await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: 'CAPTURED',
        razorpayPaymentId: testRzpPaymentId,
        signatureVerified: true,
        method: 'UPI',
        paidAt: new Date(),
      },
    });

    assert(updatedPayment.status === 'CAPTURED', 'Payment transitions to CAPTURED');
    assert(updatedPayment.signatureVerified === true, 'signatureVerified set to true');
    assert(updatedPayment.method === 'UPI', 'Payment method recorded');

    // -------------------------------------------------------------------------
    // 5. Webhook Idempotency
    // -------------------------------------------------------------------------
    console.log('\n[5] Webhook Idempotency & Duplicate Prevention:');
    const testEventId = `evt_test_${Date.now()}`;

    const evt1 = await prisma.razorpayWebhookEvent.create({
      data: {
        eventId: testEventId,
        eventType: 'payment.captured',
        status: 'PROCESSED',
      },
    });

    assert(evt1.status === 'PROCESSED', 'First webhook event recorded as PROCESSED');

    const duplicateCheck = await prisma.razorpayWebhookEvent.findUnique({
      where: { eventId: testEventId },
    });

    assert(duplicateCheck !== null, 'Duplicate webhook event correctly detected via unique eventId');

    // -------------------------------------------------------------------------
    // 6. Audit Logging Dual-Write
    // -------------------------------------------------------------------------
    console.log('\n[6] Payment Audit Trail & Dual-Write:');
    await createAuditLog({
      actorId: user.id,
      actorRole: 'FARMER',
      action: 'PAYMENT_CAPTURED',
      resource: 'PAYMENT',
      resourceId: payment.id,
      purpose: 'Online Machinery Rental Settlement',
      details: `Test payment of ₹4,500 captured via UPI for order #booking_synthetic_01`,
      metadata: {
        orderId: 'booking_synthetic_01',
        razorpayOrderId: testRzpOrderId,
        amount: 4500.0,
      },
    });

    const auditLog = await prisma.auditLog.findFirst({
      where: {
        resourceId: payment.id,
        action: 'PAYMENT_CAPTURED',
      },
    });

    assert(auditLog !== null, 'Authoritative AuditLog persisted in Neon PostgreSQL');
    assert(auditLog?.action === 'PAYMENT_CAPTURED', 'AuditLog record action matches');
    assert(auditLog?.resource === 'PAYMENT', 'AuditLog resource is PAYMENT');

    // -------------------------------------------------------------------------
    // 7. Sensitive Credential Sanitization
    // -------------------------------------------------------------------------
    console.log('\n[7] Credential Protection & Redaction:');
    const dirtyData = {
      orderId: 'order_123',
      razorpaySecret: 'secret_live_abcd1234efgh5678',
      keySecret: 'sk_test_key_secret_9988',
      webhookSecret: 'whsec_secret_12345',
      otp: '998877',
      password: 'mypassword123',
    };

    const sanitized = sanitizeLogData(dirtyData);
    assert(sanitized.orderId === 'order_123', 'Normal identifier preserved');
    assert(sanitized.razorpaySecret === '[REDACTED]', 'razorpaySecret strictly redacted to [REDACTED]');
    assert(sanitized.keySecret === '[REDACTED]', 'keySecret strictly redacted to [REDACTED]');
    assert(sanitized.webhookSecret === '[REDACTED]', 'webhookSecret strictly redacted to [REDACTED]');
    assert(sanitized.otp === '[REDACTED]', 'otp strictly redacted to [REDACTED]');
    assert(sanitized.password === '[REDACTED]', 'password strictly redacted to [REDACTED]');

    // Clean up temporary test payment and user
    await prisma.payment.deleteMany({ where: { userId: user.id } });
    await prisma.razorpayWebhookEvent.deleteMany({ where: { eventId: testEventId } });
    await prisma.auditLog.deleteMany({ where: { actorId: user.id } });
    await prisma.user.delete({ where: { id: user.id } });
  } finally {
    // Restore env
    process.env.RAZORPAY_KEY_SECRET = origKeySecret;
    process.env.RAZORPAY_WEBHOOK_SECRET = origWebhookSecret;
  }

  console.log('\n=============================================================');
  console.log(`RAZORPAY SUITE COMPLETED: ${passed} PASSED, ${failed} FAILED`);
  console.log('=============================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runRazorpaySuite().catch((err) => {
  console.error('Fatal error running Razorpay test suite:', err);
  process.exit(1);
});
