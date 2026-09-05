# Mazhi Sheti Production Deployment Guide

This guide details the end-to-end steps to deploy **Mazhi Sheti** to production on **Vercel** (or any Node.js container / PaaS) paired with **Neon PostgreSQL**, **Clerk**, **Razorpay**, **Sentry**, and **Better Stack**.

---

## 1. Quick Deployment Checklist

| Component | Target Provider | Configuration Key |
| :--- | :--- | :--- |
| **Frontend & API Routes** | Vercel (or Node.js 18+) | Next.js 14 App Router |
| **Database** | Neon Serverless PostgreSQL | `DATABASE_URL` (pooled) & `DIRECT_URL` |
| **Identity & Authentication** | Clerk Auth | `CLERK_SECRET_KEY` & `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` |
| **Payments & Escrow** | Razorpay Gateway | `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET` |
| **Error Monitoring** | Sentry SaaS | `SENTRY_DSN`, `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT` |
| **Log Streaming & Uptime** | Better Stack Logtail | `BETTER_STACK_SOURCE_TOKEN`, Uptime monitoring `/api/health` |

---

## 2. Environment Variables Configuration

Set these variables in the **Vercel Project Settings > Environment Variables** (or your production `.env.production`):

```bash
# ------------------------------------------------------------------------------
# 1. Clerk Authentication
# ------------------------------------------------------------------------------
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_..."
CLERK_SECRET_KEY="sk_live_..."
CLERK_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/auth/farmer"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/auth/farmer"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/farmer/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/onboarding/farmer"

# ------------------------------------------------------------------------------
# 2. Neon PostgreSQL Database (Pooled + Direct)
# ------------------------------------------------------------------------------
DATABASE_URL="postgresql://neondb_owner:[PASSWORD]@[HOST]-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&pgbouncer=true"
DIRECT_URL="postgresql://neondb_owner:[PASSWORD]@[HOST].c-5.us-east-2.aws.neon.tech/neondb?sslmode=require"

# ------------------------------------------------------------------------------
# 3. Razorpay Payment Gateway
# ------------------------------------------------------------------------------
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_live_..."
RAZORPAY_KEY_ID="rzp_live_..."
RAZORPAY_KEY_SECRET="your_razorpay_live_secret"
RAZORPAY_WEBHOOK_SECRET="your_razorpay_live_webhook_secret"

# ------------------------------------------------------------------------------
# 4. Sentry Error Monitoring & Release Tracking
# ------------------------------------------------------------------------------
SENTRY_DSN="https://...@o....ingest.sentry.io/..."
NEXT_PUBLIC_SENTRY_DSN="https://...@o....ingest.sentry.io/..."
SENTRY_ORG="vineet-ravi-mandhalkar"
SENTRY_PROJECT="mazhisheti"
SENTRY_AUTH_TOKEN="sntrys_..."

# ------------------------------------------------------------------------------
# 5. Better Stack Logging & Monitoring
# ------------------------------------------------------------------------------
BETTER_STACK_SOURCE_TOKEN="your_better_stack_source_token"
LOG_LEVEL="info"
NEXT_PUBLIC_APP_ENV="production"
NODE_ENV="production"
```

---

## 3. Build & Runtime Settings on Vercel

In the Vercel dashboard:
- **Framework Preset**: Next.js
- **Root Directory**: `./`
- **Build Command**: `prisma generate && next build` (or `npm run build`)
- **Install Command**: `npm install` (with `.npmrc` containing `legacy-peer-deps=true`)
- **Node.js Version**: 20.x or 18.x

---

## 4. Production Database Migrations

Before pointing traffic to the new deployment, run the database migrations against the Neon production branch:

```bash
# Push migrations to production database
npm run db:deploy

# (Optional) Seed initial reference data if launching fresh instance:
npm run seed:mazhi
```

---

## 5. Webhook Configurations

### A. Razorpay Webhook
- In your Razorpay Dashboard: **Settings > Webhooks > Add New Webhook**.
- **Webhook URL**: `https://your-domain.com/api/webhooks/razorpay`
- **Secret**: Must match your `RAZORPAY_WEBHOOK_SECRET`.
- **Subscribed Events**:
  - `payment.captured`
  - `payment.failed`
  - `order.paid`
  - `refund.processed`

### B. Clerk Webhook
- In Clerk Dashboard: **Configure > Webhooks > Add Endpoint**.
- **Endpoint URL**: `https://your-domain.com/api/webhooks/clerk`
- **Subscribed Events**:
  - `user.created`
  - `user.updated`
  - `user.deleted`

---

## 6. Uptime Monitoring & Health Checks

Configure Better Stack Uptime (or Pingdom/UptimeRobot) to ping:
- **Primary Uptime URL**: `https://your-domain.com/api/health`
  - Expected Response: `200 OK` with JSON `{"status": "healthy", "services": {"database": "connected"}}`
- **Readiness URL**: `https://your-domain.com/api/health/ready`
- **Liveness URL**: `https://your-domain.com/api/health/live`
