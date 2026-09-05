# Mazhi Sheti — Razorpay Payment Gateway Integration Guide

This guide provides end-to-end instructions for configuring, testing, and operating the Razorpay Payment Gateway within the Mazhi Sheti platform.

---

## 1. Overview & Security Principles

Mazhi Sheti integrates Razorpay for agricultural machinery rental and direct crop marketplace transactions under a zero-trust model:

- **Authoritative Amounts**: The server calculates the payable amount from Neon PostgreSQL (`EquipmentBooking.totalAmount` or `MarketplaceOrder.totalAmount`). Amounts submitted by browsers are strictly ignored.
- **Cryptographic Verification**: Every successful checkout signature is verified using timing-safe HMAC SHA-256 (`order_id|payment_id`) before changing payment or order state.
- **Server-to-Server Webhook Reconciliation**: Webhooks at `/api/webhooks/razorpay` use the raw request body with `X-Razorpay-Signature` to protect against side-channel tampering.
- **Idempotency**: Webhook events are tracked in the `RazorpayWebhookEvent` table to prevent double fulfillment or repeated inventory allocations.
- **No Client Secrets**: Private keys (`RAZORPAY_KEY_SECRET` and `RAZORPAY_WEBHOOK_SECRET`) remain exclusively on the server.

---

## 2. Setting Up Razorpay Test Mode

1. **Sign Up**: Register at [https://dashboard.razorpay.com/](https://dashboard.razorpay.com/).
2. **Toggle Test Mode**: Switch the toggle in the top-right corner of the Razorpay Dashboard to **Test Mode**.
3. **Generate API Keys**:
   - Navigate to **Settings** -> **API Keys**.
   - Click **Generate Key**.
   - Copy the **Key ID** and **Key Secret**.
4. **Configure Environment Variables**:
   Add them to `.env.local` (and your Vercel deployment variables):
   ```env
   # Razorpay API Credentials (Test Mode)
   NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_T8KoDPvXFqJ91x"
   RAZORPAY_KEY_ID="rzp_test_T8KoDPvXFqJ91x"
   RAZORPAY_KEY_SECRET="your_actual_key_secret_here"
   RAZORPAY_WEBHOOK_SECRET="your_chosen_webhook_secret_here"
   ```

---

## 3. Configuring Webhooks in Razorpay Dashboard

1. In the Razorpay Dashboard, navigate to **Settings** -> **Webhooks**.
2. Click **Add New Webhook**.
3. **Webhook URL**:
   ```
   https://YOUR_DOMAIN/api/webhooks/razorpay
   ```
   *(For local development testing, use an HTTPS tunnel like ngrok: `https://your-tunnel.ngrok-free.app/api/webhooks/razorpay`)*.
4. **Secret**: Enter the exact secret string you configured in `RAZORPAY_WEBHOOK_SECRET`.
5. **Active Events**: Select the following events:
   - `payment.captured`
   - `payment.failed`
   - `order.paid`
6. Click **Create Webhook**.

---

## 4. Test Cards & Payment Credentials (Test Mode)

When the Razorpay Checkout Modal opens in Test Mode:

### UPI Payments
- **Test VPA / UPI ID**: `success@razorpay`
- **Failure VPA**: `failure@razorpay`

### Card Payments
- **Card Number**: Any valid test card (e.g. `4111 1111 1111 1111`)
- **Expiry Date**: Any future date (e.g. `12/28`)
- **CVV**: Any 3 digits (e.g. `123`)
- **OTP Screen**: Click **Success** or **Failure** on the simulated bank ACS screen.

### Net Banking
- Choose any bank (e.g. SBI, HDFC, ICICI). On the mock screen, select **Success**.

---

## 5. Automated Verification

Run the automated payment test suite against your live database:
```bash
npm run test:razorpay
```

To run all automated security, observability, and payment suites:
```bash
npm test
```

---

## 6. Switching to Live Mode (Production)

> [!CAUTION]
> Never switch to Live Mode until you have verified successful payments in Test Mode and completed business KYC verification on Razorpay.

1. In Razorpay Dashboard, switch the environment toggle from **Test** to **Live**.
2. Generate Live API Keys (**Settings** -> **API Keys**).
3. In your Vercel Project Settings (`Settings` -> `Environment Variables`):
   - Update `NEXT_PUBLIC_RAZORPAY_KEY_ID` to your Live Key (`rzp_live_...`).
   - Update `RAZORPAY_KEY_ID` to your Live Key.
   - Update `RAZORPAY_KEY_SECRET` to your Live Secret.
   - Update `RAZORPAY_WEBHOOK_SECRET` to your Live Webhook Secret.
4. Configure the production webhook endpoint in Razorpay Dashboard targeting your production domain:
   `https://YOUR_PRODUCTION_DOMAIN/api/webhooks/razorpay`
