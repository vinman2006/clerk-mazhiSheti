/**
 * Mazhi Sheti — Authoritative Razorpay Payment Gateway Service
 * 
 * Cryptographic helpers, SDK factory, timing-safe signature verification,
 * and monetary conversion utilities.
 */

import crypto from 'crypto';
import Razorpay from 'razorpay';
import { logger } from '@/lib/logging/logger';

let razorpayInstance: Razorpay | null = null;

/**
 * Returns the singleton Razorpay client instance initialized with environment credentials.
 */
export function getRazorpayClient(): Razorpay {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    logger.error('Razorpay credentials not configured in environment', {
      hasKeyId: !!key_id,
      hasKeySecret: !!key_secret,
    });
    throw new Error('GATEWAY_ERROR: Razorpay API keys are missing. Please configure RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.');
  }

  if (!razorpayInstance) {
    razorpayInstance = new Razorpay({
      key_id,
      key_secret,
    });
  }

  return razorpayInstance;
}

/**
 * Verifies the authenticity of a client checkout payment signature using timing-safe comparison.
 * Signature digest formula: HMAC_SHA256(razorpay_order_id + "|" + razorpay_payment_id, secret)
 */
export function verifyRazorpayPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_secret) {
    throw new Error('CONFIG_ERROR: RAZORPAY_KEY_SECRET is not configured.');
  }

  if (!orderId || !paymentId || !signature) {
    return false;
  }

  try {
    const payload = `${orderId}|${paymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', key_secret)
      .update(payload)
      .digest('hex');

    const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
    const signatureBuffer = Buffer.from(signature, 'utf8');

    if (expectedBuffer.length !== signatureBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
  } catch (err: any) {
    logger.error('Failed to verify Razorpay payment signature', { orderId, paymentId }, err as Error);
    return false;
  }
}

/**
 * Verifies a Razorpay webhook raw body against the X-Razorpay-Signature header.
 * Uses timing-safe string comparison to mitigate side-channel timing attacks.
 */
export function verifyRazorpayWebhookSignature(
  rawBody: string,
  signature: string,
  customSecret?: string
): boolean {
  const webhookSecret = customSecret || process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error('CONFIG_ERROR: RAZORPAY_WEBHOOK_SECRET is not configured.');
  }

  if (!rawBody || !signature) {
    return false;
  }

  try {
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(rawBody)
      .digest('hex');

    const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
    const signatureBuffer = Buffer.from(signature, 'utf8');

    if (expectedBuffer.length !== signatureBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
  } catch (err: any) {
    logger.error('Failed to verify Razorpay webhook signature', {}, err as Error);
    return false;
  }
}

/**
 * Safely converts an authoritative rupee float (e.g. ₹1,500.50) into an integer number of paise.
 * Uses Math.round to avoid floating point precision issues.
 */
export function toPaise(rupees: number): number {
  if (isNaN(rupees) || rupees < 0) {
    throw new Error('INVALID_AMOUNT: Rupee amount must be a non-negative number.');
  }
  return Math.round(rupees * 100);
}

/**
 * Converts paise back to standard rupees formatted to two decimal places.
 */
export function toRupees(paise: number): number {
  return parseFloat((paise / 100).toFixed(2));
}
