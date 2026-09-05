# Mazhi Sheti (माझी शेती)

> **A Unified Digital Farming Operating Platform for Farmers, Cooperatives, and Sustainable Agriculture.**

[![Next.js](https://img.shields.io/badge/Next.js-14.2.35-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Database](https://img.shields.io/badge/Neon-PostgreSQL%2016-00E599?style=flat&logo=postgresql)](https://neon.tech/)
[![ORM](https://img.shields.io/badge/Prisma-5.22.0-2D3748?style=flat&logo=prisma)](https://www.prisma.io/)
[![Auth](https://img.shields.io/badge/Clerk-Authentication-6C47FF?style=flat&logo=clerk)](https://clerk.com/)
[![Payments](https://img.shields.io/badge/Razorpay-Test%20Mode-0C2340?style=flat&logo=razorpay)](https://razorpay.com/)
[![Observability](https://img.shields.io/badge/Better%20Stack-Logging-10B981?style=flat)](https://betterstack.com/)
[![Error Tracking](https://img.shields.io/badge/Sentry-10.73.0-362D59?style=flat&logo=sentry)](https://sentry.io/)
[![Tests](https://img.shields.io/badge/Automated%20Tests-77%20Passed-success?style=flat)](#quality--automated-tests)

---

## 1. Core Vision & Product Philosophy

**Mazhi Sheti is NOT simply an e-commerce marketplace for farmers.** It is a comprehensive agricultural operating platform engineered to connect every phase of a farmer's operational lifecycle:

```
Farmer Identity (Sovereign Profile)
       │
       ▼
   Farm & Fields (Spatial Boundaries & Cadastral Parcels)
       │
       ▼
   Crop Cycles ──► Soil Intelligence ──► Smart IoT Telemetry ──► Automated Irrigation
       │
       ▼
   Farming Activities & Sustainable Transition (6-Stage Organic Roadmap & No-Till)
       │
       ▼
   Machinery Rentals (Tractors/Harvesters) & Crop Marketplace (Direct-to-Buyer)
       │
       ▼
   Institutional Finance (KCC Loans) ──► Farmer Data Consent ──► Immutable Audit Trail
```

### The Sustainable Transition Mission
Rather than demanding an unrealistic overnight shift from conventional chemical farming to organic production, Mazhi Sheti provides an **individualized, 6-stage biological roadmap**. The system guides farmers through gradual chemical reduction, biological soil remediation (e.g., *Trichoderma*, FYM, Jeevamrutha), conservation no-till soil cover, and eventual accredited organic certification.

---

## 2. System Architecture

```
[ Web & Mobile Browser (Farmer / Bank / Provider / Admin) ]
                          │
                          ▼
             [ Next.js 14 App Router ]
                          │
        ┌─────────────────┴─────────────────┐
        ▼                                   ▼
[ Clerk Authentication ]         [ Application Authorization & RBAC ]
(Identity, Sessions, Roles)     (Resource Ownership & Farmer Consent)
        │                                   │
        └─────────────────┬─────────────────┘
                          │
                          ▼
             [ Business Services & APIs ]
   (/api/payments, /api/farms, /api/consents, /api/devices, etc.)
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
[ Neon PostgreSQL ]  [ Razorpay ]    [ Observability ]
 (Prisma ORM - 25    (Checkout, HMAC  (Better Stack Logs &
 Normalized Models)   Signatures)      Sentry Exceptions)
```

### Service Responsibilities

| Service | Primary Responsibility | Architectural Rule |
| :--- | :--- | :--- |
| **Next.js 14** | App Router, Server Components, API route handlers | Unified frontend & backend with SSR and React Server Actions |
| **Clerk** | User authentication, identity sessions, organizations | **Identity only**. Never used as the application database |
| **Neon PostgreSQL** | Single source of truth for all business entities | **Zero MongoDB**. Strict foreign keys, compound indexes |
| **Prisma ORM** | Schema migrations, typed queries, transactions | Database transactions (`prisma.$transaction`) for atomicity |
| **Razorpay** | Online payments (UPI, Cards, Net Banking, Wallets) | Authoritative server amounts only; timing-safe HMAC signatures |
| **Sentry** | Technical exceptions, unhandled crashes, releases | Captures errors with stripped PII and sanitized contexts |
| **Better Stack** | Centralized application logs, latency telemetry | Structured JSON logs (`DEBUG`, `INFO`, `WARN`, `ERROR`) |

---

## 3. Technology Stack

### Core Framework & Runtime
- **Next.js**: `14.2.35` (App Router, dynamic and static route handlers)
- **React**: `18.3.1` (Client & Server Components)
- **TypeScript**: `5.7.3` (Strict type safety, zero emit errors)
- **Node.js**: `20.x` recommended (`18.x` minimum)

### Styling, Icons & UI Physics
- **Tailwind CSS**: `3.4.17`
- **Iconography**: `lucide-react` (`0.475.0`)
- **Animations & Smooth Scrolling**: `framer-motion` (`11.18.2`), `gsap` (`3.15.0`), `lenis` (`1.3.26`)
- **Data Visualizations**: `recharts` (`2.15.1`)
- **3D Graphics**: `three` (`0.185.1`) with `@types/three`

### Identity, Database & Payments
- **Authentication**: `@clerk/nextjs` (`^7.9.1`)
- **Database Backend**: Neon Serverless PostgreSQL (`16.x`)
- **ORM & Migrations**: Prisma CLI & Client (`5.22.0`)
- **Payment Processing**: `razorpay` (`^2.9.6`)
- **Validation**: `zod` (`^4.5.4`)

### Observability & Infrastructure
- **Exception Monitoring**: `@sentry/nextjs` (`^10.73.0`)
- **Instrumentation**: `instrumentation.ts` (App Router runtime hook)
- **Centralized Logging**: Better Stack structured log abstraction (`lib/logging/`)
- **Cloud Configuration**: `@neon/config` (`^1.3.0`)

---

## 4. Authentication, Roles & Data Sovereignty

Mazhi Sheti decouples **Clerk Identity** from **Application Business Data**.

```
Clerk Identity (`clerkUserId`)
       │
       ▼
   User Profile (`id`, `clerkUserId`, `role`, `status`)
       │
       └── Farmer Profile (`id`, `userId`, `taluka`, `district`, `soilHealthScore`)
             │
             ├── Farms & Fields
             ├── Machinery Rentals
             ├── Crop Listings
             └── Consent Records
```

### Supported Roles
1. **Farmer (`FARMER`)**: Complete access to own farms, fields, IoT devices, rental requests, crop listings, and consent controls.
2. **Bank Loan Officer (`BANK_LOAN_OFFICER`)**: Reviews submitted KCC loan applications; can inspect farmer data **only if active consent has been granted**.
3. **Bank Administrator (`BANK_ADMIN`)**: Approves or rejects institutional loan applications for verified banks.
4. **Machinery Provider (`PROVIDER_OWNER`)**: Manages equipment fleets (tractors, harvesters), schedules, and inbound bookings.
5. **Agriculture Expert (`AGRICULTURE_EXPERT`)**: Inspects soil health assays and issues agronomic guidance.
6. **Platform Admin (`ADMIN`, `SUPER_ADMIN`)**: System-wide governance, institutional charter verification, and immutable audit log reviews.

### Access Control & Scoped Farmer Consent
A financial institution cannot browse farmer records arbitrarily. Access requires:
1. Valid Clerk authentication + verified bank charter in `BankOrganization`.
2. An active `Consent` record linked to the specific farmer and bank.
3. Query scope verification (`farm_ownership`, `soil_health`, `crop_history`, etc.).
4. Immutable audit trail write to the database (`AuditLog`).

---

## 5. Database Schema (Neon PostgreSQL via Prisma)

All 25 models are deployed and indexed in Neon PostgreSQL:

| Category | Model Name | Description |
| :--- | :--- | :--- |
| **Identity** | `User` | Maps Clerk user (`clerkUserId`) to application role and profile |
| | `Farmer` | Sovereign farmer profile (location, acreage, sustainability score) |
| **Institutions** | `BankOrganization` | Verified banking and credit cooperative entities |
| | `OrganizationMember` | Institutional bank officers and administrators |
| **Spatial Parcels** | `Farm` | Cadastral agricultural land holding (acres, survey numbers) |
| | `Field` | Individual field parcels (soil type, active crop, no-till toggle) |
| **Agronomy** | `Crop` | Normalized crop master catalog (Sugarcane, Soybean, Onion, etc.) |
| | `CropCycle` | Sowing, vegetative, flowering, and harvest tracking per field |
| **Soil Intelligence** | `SoilRecord` | Time-series NPK, pH, organic carbon, and moisture readings |
| | `SoilTest` | Laboratory soil assay reports with certified micronutrient data |
| **Smart IoT** | `Device` | LoRaWAN field sensors, weather nodes, and valve actuators |
| | `DeviceReading` | High-frequency telemetry packets (moisture, temperature, pH) |
| | `IrrigationSystem` | Automated sprinkler/drip controller with safety runtimes |
| | `IrrigationEvent` | Water disbursement tracking, duration, and water volume |
| **Sustainability** | `OrganicPlan` | 6-stage biological roadmap toward accredited organic farming |
| | `TransitionStep` | Milestones: Chemical reduction, biological inputs, certification |
| **Machinery** | `Equipment` | Tractors, laser levelers, and planters available for rent |
| | `EquipmentBooking` | Rental reservations with dates, hours, and authoritative totals |
| **Marketplace** | `MarketplaceListing` | Crop lots for sale with APMC mandi price benchmarks |
| | `MarketplaceOrder` | B2B / wholesale crop orders placed by buyers |
| **Payments** | `Payment` | Authoritative Razorpay transactions, method, and capture state |
| | `RazorpayWebhookEvent` | Unique event tracker ensuring idempotent webhook processing |
| **Finance** | `LoanApplication` | Kisan Credit Card (KCC) and agricultural credit applications |
| | `FarmDocument` | Encrypted 7/12 land records, soil certificates, and water rights |
| **Governance** | `Consent` | Granular farmer-granted access scopes for financial institutions |
| | `AuditLog` | Append-only, immutable regulatory and security trail |
| | `Notification` | System alerts for soil thresholds, irrigation, and payments |

---

## 6. Razorpay Payment Gateway Integration

Mazhi Sheti integrates the official **Razorpay Node.js SDK and Checkout** in **Test Mode** with a zero-trust financial architecture:

```
[ Farmer Client ]
       │
       ▼ 1. User clicks "Pay with Razorpay" (sends orderId, orderType)
[ Server: POST /api/payments/create-order ]
       │ 2. Authenticates Clerk user
       │ 3. Fetches authoritative total from PostgreSQL (Never trusts client amount!)
       │ 4. Converts rupees to paise: Math.round(totalAmount * 100)
       │ 5. Checks for duplicate payments (blocks if already CAPTURED)
       │ 6. Calls Razorpay SDK: orders.create(...)
       ▼ 7. Saves internal Payment (status: CREATED) & returns razorpayOrderId
[ Razorpay Checkout Modal ]
       │ 8. Displays UPI (GPay/PhonePe), Card, NetBanking options
       │ 9. Farmer completes payment
       ▼ 10. Gateway returns (order_id, payment_id, signature)
[ Server: POST /api/payments/verify ]
       │ 11. Timing-safe cryptographic HMAC SHA-256 verification
       │ 12. Prisma Transaction: Payment=CAPTURED, EquipmentBooking=ACCEPTED
       │ 13. Dual-writes AuditLog and Better Stack operational log
       ▼ 14. Returns success
[ Client UI ] ──► Updates status badge to "PAID & CONFIRMED"
```

### Server-to-Server Webhook Processing
- **Endpoint**: `POST /api/webhooks/razorpay`
- **Raw Body Signature**: Computes HMAC SHA-256 using the **raw request body string** against `X-Razorpay-Signature`.
- **Idempotency**: Before processing, checks `RazorpayWebhookEvent` by unique `eventId`. If already processed, returns HTTP 200 immediately without executing duplicate state changes.
- **Handled Events**: `payment.captured`, `order.paid`, `payment.failed`.

---

## 7. Implementation Status: Reality Check

To provide full transparency for developers, judges, and investors, here is an exact accounting of what is **implemented**, **partially implemented**, and **planned**:

### Implemented (Production-Grade Code)
- [x] **Clerk Identity Sync**: Role-based authentication routes, user synchronization with Neon PostgreSQL.
- [x] **Relational Schema**: 25 normalized Prisma models deployed on live Neon PostgreSQL with cascading deletes and compound indexes.
- [x] **Razorpay Payment Engine**: Server-side order creation, cryptographic checkout signature verification (`timingSafeEqual`), and raw-body webhook verification.
- [x] **Webhook Idempotency**: `RazorpayWebhookEvent` table preventing double fulfillment.
- [x] **Authoritative Amount Security**: Zero client trust; all monetary amounts calculated server-side in paise.
- [x] **Centralized Observability**: Better Stack structured logging with recursive secret redaction (`lib/logging/`).
- [x] **Sentry Error Tracking**: Sentry Next.js configuration (`sentry.client.config.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`, and `instrumentation.ts`).
- [x] **Automated Test Suites**: 77/77 passing assertions across security, observability, and payments (`npm test`).
- [x] **Dual-Write Audit Trail**: Every sensitive financial, consent, and farm operation is written to Neon PostgreSQL `AuditLog` and Better Stack.
- [x] **Vercel Deployment Architecture**: `.npmrc` peer dependency resolution and `prisma generate` postinstall hooks.

### Partially Implemented (Functional UI with Seed/Simulated Data)
- [~] **Farmer Dashboards** (`/farmer/*`): Fully interactive UI layouts (Command Center, Fields, Soil, Irrigation, No-Till, Equipment, Marketplace, Finance) backed by comprehensive seed data.
- [~] **Smart IoT Telemetry**: Database ingestion schema and API endpoints (`/api/devices/ingest`) exist; currently consuming simulated telemetry packets rather than physical hardware.
- [~] **AI Farming Assistant** (`/farmer/assistant`): Interactive chat interface styled with agronomist presets; currently operates in mock advisory mode (not yet hooked to a live billing LLM gateway).
- [~] **Direct APMC Mandi Benchmarks**: Displaying real market rate benchmarks (Pune / Baramati APMC); live API webhook auto-sync is planned.

### Planned (Future Roadmap)
- [ ] **Physical LoRaWAN Hardware Gateways**: Direct MQTT / ChirpStack hardware bridges to physical soil probe arrays.
- [ ] **Satellite NDVI Imagery**: Sentinel-2 satellite data integration for farm-wide vegetative health indexing.
- [ ] **Production Razorpay Live Mode**: Transition from Test Mode to Live Mode following business KYC verification.
- [ ] **Full Multi-Language Localization**: Expanded Marathi (मराठी) and Hindi (हिंदी) language toggles beyond current agricultural terminology.
- [ ] **Automated Bank Loan Underwriting Pipeline**: Direct integration with core banking systems for instantaneous KCC disbursements.

---

## 8. Project Structure

```
Mazhi Sheti/
├── app/                           # Next.js 14 App Router
│   ├── api/                       # Authoritative Backend API Routes
│   │   ├── consents/              # Scoped bank consent management
│   │   ├── devices/               # IoT sensor ingestion endpoints
│   │   ├── farms/                 # Farm & field CRUD operations
│   │   ├── health/                # Health checks (/live, /ready)
│   │   ├── irrigation/            # Smart sprinkler actuator controls
│   │   ├── loans/                 # KCC loan applications
│   │   ├── payments/              # Razorpay order creation & verification
│   │   │   ├── create-order/      # POST /api/payments/create-order
│   │   │   └── verify/            # POST /api/payments/verify
│   │   └── webhooks/              # Inbound Webhooks
│   │       ├── clerk/             # Clerk identity event webhook
│   │       └── razorpay/          # Razorpay payment & order webhook
│   ├── auth/                      # Role-specific entry portals
│   │   ├── admin/                 # Platform administration portal
│   │   ├── bank/                  # Institutional banking portal
│   │   ├── expert/                # Agronomist accreditation portal
│   │   ├── farmer/                # Farmer OTP sign-in portal
│   │   ├── provider/              # Equipment fleet provider portal
│   │   └── select/                # Role selection gateway
│   ├── bank/dashboard/            # Bank loan officer underwriting queue
│   ├── expert/dashboard/          # Agronomist consultation dashboard
│   ├── farmer/                    # Comprehensive Farmer Workspaces
│   │   ├── assistant/             # Context-aware AI Agronomist
│   │   ├── dashboard/             # Command center & soil health summary
│   │   ├── devices/               # LoRaWAN IoT telemetry monitor
│   │   ├── equipment/             # Machinery rental with Razorpay checkout
│   │   ├── fields/                # Cadastral land and field parcel manager
│   │   ├── finance/               # KCC loans and data consent manager
│   │   ├── irrigation/            # Automated irrigation scheduler & override
│   │   ├── marketplace/           # Crop lot trading with APMC benchmarks
│   │   ├── no-till/               # Conservation agriculture metrics
│   │   ├── organic/               # 6-Stage biological organic roadmap
│   │   └── soil/                  # Precision NPK, pH & organic carbon assays
│   └── provider/dashboard/        # Machinery fleet booking management
├── components/                    # Reusable React UI Components
│   ├── layout/                    # Sidebar, headers, shell wrappers
│   ├── payments/                  # RazorpayCheckoutModal.tsx
│   └── ui/                        # Buttons, cards, badges, modal dialogs
├── docs/                          # Architecture & Integration Guides
│   └── RAZORPAY_SETUP.md          # Step-by-step Razorpay configuration guide
├── lib/                           # Central Core Utilities & Services
│   ├── audit/                     # Immutable audit logging (dual-write)
│   ├── auth/                      # Clerk authentication & RBAC guards
│   ├── db/                        # Prisma client singleton (server-only)
│   ├── errors/                    # Sentry error capture & API sanitization
│   ├── logging/                   # Better Stack structured logger & redaction
│   ├── payments/                  # Razorpay SDK client & HMAC helpers
│   └── validation/                # Zod request validation schemas
├── prisma/                        # Database Definition
│   └── schema.prisma              # 25 normalized PostgreSQL models
├── public/                        # Static assets, branding, icons
├── scripts/                       # Executable Suites & Seeders
│   ├── seed_mazhi_sheti.ts        # Multi-farmer, farm, crop & fleet seeder
│   ├── test_security_suite.ts     # RBAC, IDOR & actuator safety tests
│   ├── test_observability_suite.ts# Logging, sanitization & Sentry tests
│   └── test_razorpay_suite.ts     # Payments, signatures & webhook tests
├── instrumentation.ts             # Next.js runtime Sentry instrumentation
├── next.config.mjs                # Next.js & Sentry Webpack build options
├── package.json                   # Dependencies, scripts & metadata
└── tsconfig.json                  # Strict TypeScript compiler options
```

---

## 9. Environment Variables

Create `.env.local` in your root directory (derived from `.env.example`). **Never commit `.env.local` or expose private secrets.**

```env
# ------------------------------------------------------------------------------
# 1. CLERK AUTHENTICATION (Required)
# ------------------------------------------------------------------------------
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
CLERK_SECRET_KEY=sk_test_your_secret_key
CLERK_WEBHOOK_SECRET=whsec_your_clerk_webhook_secret
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# ------------------------------------------------------------------------------
# 2. NEON POSTGRESQL DATABASE (Required)
# ------------------------------------------------------------------------------
# Pooled connection string (used by Next.js application runtime)
DATABASE_URL="postgresql://user:password@endpoint-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# Direct connection string (used by Prisma CLI for migrations)
DIRECT_URL="postgresql://user:password@endpoint.us-east-2.aws.neon.tech/neondb?sslmode=require"

# ------------------------------------------------------------------------------
# 3. RAZORPAY PAYMENT GATEWAY (Test Mode)
# ------------------------------------------------------------------------------
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_T8KoDPvXFqJ91x
RAZORPAY_KEY_ID=rzp_test_T8KoDPvXFqJ91x
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret_here

# ------------------------------------------------------------------------------
# 4. OBSERVABILITY & MONITORING (Sentry & Better Stack)
# ------------------------------------------------------------------------------
BETTER_STACK_SOURCE_TOKEN=your_better_stack_source_token_here
SENTRY_DSN=https://key@org.ingest.sentry.io/project
NEXT_PUBLIC_SENTRY_DSN=https://key@org.ingest.sentry.io/project
SENTRY_ORG=vineet-ravi-mandhalkar
SENTRY_PROJECT=mazhisheti
SENTRY_AUTH_TOKEN=your_sentry_build_auth_token_here
NEXT_PUBLIC_APP_ENV=development
```

---

## 10. Local Development Setup

### Prerequisites
- Node.js `20.x` or `18.x`
- npm (bundled with Node.js)
- A Neon PostgreSQL project (or local PostgreSQL instance)
- A Clerk application instance

### Installation Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/vinman2006/clerk-mazhiSheti.git
   cd clerk-mazhiSheti
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment:**
   ```bash
   cp .env.example .env.local
   # Fill in your Clerk, Neon, and Razorpay test keys in .env.local
   ```

4. **Synchronize Database Schema:**
   ```bash
   npx prisma db push
   ```

5. **Seed Initial Agronomic Data:**
   ```bash
   npm run db:seed
   ```
   *Populates 3 distinct farmer profiles, farm parcels, soil tests, LoRaWAN devices, machinery fleets, and KCC loan records.*

6. **Run Automated Test Suites:**
   ```bash
   npm test
   ```

7. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 11. Available NPM Scripts

All commands are validated against [`package.json`](file:///e:/Mazhi%20Sheti/package.json):

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server on port 3000 |
| `npm run build` | Compiles Prisma Client and creates an optimized Next.js production build |
| `npm run start` | Runs the compiled Next.js production server |
| `npm test` | Runs the complete automated test suite (Security + Observability + Razorpay) |
| `npm run test:security` | Executes the 15-test RBAC, IDOR, and actuator safety test suite |
| `npm run test:observability` | Executes the 32-test Better Stack, Sentry, and credential redaction suite |
| `npm run test:razorpay` | Executes the 30-test Razorpay signature, webhook, and idempotency suite |
| `npm run db:generate` | Regenerates the Prisma Client types from `prisma/schema.prisma` |
| `npm run db:migrate` | Runs Prisma interactive migrations in development |
| `npm run db:deploy` | Deploys pending Prisma schema migrations to production |
| `npm run db:seed` | Populates sample farmers, farms, crops, machinery, and loans |

---

## 12. Quality & Automated Tests

The platform includes a comprehensive test suite executed against live PostgreSQL:

```bash
npm test
```

### Test Summary: 77 Passed, 0 Failed
1. **Security & RBAC Suite (15 Tests)**:
   - Least-privilege role boundaries (Farmer, Bank Officer, Admin, Provider).
   - Insecure Direct Object Reference (IDOR) farm boundary isolation.
   - Farmer consent scope exclusion (`ai_conversations`, `irrigation_control`).
   - IoT sensor input validation and runaway flooding safety interlocks (>120 min blocked).
2. **Centralized Observability Suite (32 Tests)**:
   - Recursive credential sanitization (passwords, OTPs, Clerk secret keys, tokens).
   - `AsyncLocalStorage` request-context preservation across async boundaries.
   - Dual-write audit log verification in Neon PostgreSQL.
   - Sentry exception correlation with user-safe error messaging.
   - Operational health check endpoint uptime verification.
3. **Razorpay Payment Suite (30 Tests)**:
   - Rupee-to-paise conversion precision without floating-point drift.
   - Negative and zero amount input rejection.
   - Timing-safe HMAC SHA-256 checkout signature verification (`timingSafeEqual`).
   - Raw JSON request body webhook signature verification.
   - Atomic database state machine transition from `CREATED` to `CAPTURED`.
   - Webhook idempotency protection against duplicate event delivery.
   - Sensitive payment secret sanitization in all logs.

---

## 13. Deployment

Mazhi Sheti is configured for deployment on **Vercel**:

- **Build Command**: `prisma generate && next build`
- **Postinstall**: `prisma generate` (configured in `package.json` to guarantee Prisma Client availability in serverless execution environments)
- **Dependency Resolution**: Configured via `.npmrc` (`legacy-peer-deps=true`) to resolve peer dependency boundaries between Next.js 14, `@clerk/nextjs`, and `@sentry/nextjs`.

### Production Deployment Checklist
1. Connect your GitHub repository to Vercel.
2. In Vercel Project Settings (`Settings` -> `Environment Variables`), configure:
   - `DATABASE_URL` and `DIRECT_URL` (from your production Neon branch).
   - `CLERK_SECRET_KEY` and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (production Clerk instance).
   - `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, and `RAZORPAY_WEBHOOK_SECRET` (Live Mode credentials once verified).
   - `BETTER_STACK_SOURCE_TOKEN` and `SENTRY_DSN` / `SENTRY_AUTH_TOKEN`.
3. Configure the production webhook endpoint in Razorpay Dashboard:
   `https://your-domain.vercel.app/api/webhooks/razorpay`

---

## 14. Contributing

1. Create a feature branch (`git checkout -b feature/your-feature-name`).
2. Implement your changes following established patterns (use server-side authorization, Zod validation, and centralized logging).
3. Ensure all tests pass:
   ```bash
   npx tsc --noEmit
   npm test
   npm run build
   ```
4. Commit your changes and open a Pull Request.

---

## 15. License

This repository is proprietary software belonging to the Mazhi Sheti project team. All rights reserved.
