# Mazhi Sheti (माझी शेती) — The Unified Digital Farming Operating Platform

> **"An Operating System for a Farmer."**
> Mazhi Sheti is an enterprise-grade digital agriculture platform designed to bring together farmer identity, field boundaries, IoT sensor telemetry, soil intelligence, automated irrigation, sustainable transition roadmaps, machinery rental, direct crop marketplace, and consent-driven institutional bank financing.

---

## 1. Product Vision & Architecture Philosophy

Mazhi Sheti is designed around the core principle that **a farmer should not have to juggle ten disconnected applications**. 

Instead of treating farming as isolated transactions, Mazhi Sheti organizes the entire agricultural enterprise around a single sovereign farmer identity:

```
                          FARMER (Sovereign Identity)
                                     |
    +---------------+----------------+---------------+---------------+
    |               |                |               |               |
FARM & FIELDS   SOIL INTELLIGENCE   IOT DEVICES   MACHINERY HUB   MARKETPLACE
(4 Fields, 14.5A) (NPK, pH, OC)     (LoRaWAN)     (Tractor Fleet) (Direct APMC)
    |               |                |               |               |
    +---------------+----------------+---------------+---------------+
                                     |
                     +---------------+---------------+
                     |                               |
             ORGANIC JOURNEY                  BANK FINANCE
             (6-Stage Roadmap)           (Consent-Gated Lending)
                     |                               |
                     +---------------+---------------+
                                     |
                           AI FARMING ASSISTANT
                      (Context-Aware Agronomic LLM)
```

---

## 2. Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Actions, Server Components)
- **Identity & Authentication**: [Clerk](https://clerk.com/) with role-based routing and organization charters
- **Database & ORM**: [Prisma v5.22.0](https://www.prisma.io/) with SQLite (local development) and PostgreSQL readiness
- **Validation**: [Zod](https://zod.dev/) for server-side input sanitization and IoT packet boundaries
- **UI & Aesthetics**: Custom high-tech enterprise design inspired by Nexora
  - Palette: Deep Navy (`#0D1C44`, `#0B1736`, `#070B16`), Warm Orange (`#F5820D`), Emerald Green (`#22A567`)
  - Interactive canvas physics: `DotGrid` with proximity repulsion and shockwave ripple
  - Iconography: `lucide-react`
  - Animations: `framer-motion`
- **Testing**: Automated security, RBAC and IoT validation test suite (`scripts/test_security_suite.ts`)

---

## 3. Scoped Authentication Entry Points

Mazhi Sheti avoids a generic sign-in page. Users enter via dedicated institutional and farmer portals:

| Portal | Route | Primary Flow | Visual Theme |
| :--- | :--- | :--- | :--- |
| **Role Selector Gateway** | `/auth/select` | Interactive gateway for choosing actor role | Deep Navy / Overview |
| **Farmer Portal** | `/auth/farmer` | Indian Mobile Phone + OTP | Soil-tech, Emerald green accents |
| **Bank Portal** | `/auth/bank` | Institutional corporate email + Organization | Fintech Blue, KYC & Consent notice |
| **Equipment Provider** | `/auth/provider` | Fleet business email + Service registration | Machinery Amber |
| **Agriculture Expert** | `/auth/expert` | Agronomist credentials + ICAR/MPKV accreditation | Indigo Academic |
| **Platform Root Admin** | `/auth/admin` | Security-hardened console | High-security Rose/Crimson |

---

## 4. Security & Data Sovereignty

### A. Role-Based Access Control (RBAC)
Server-side authorization is strictly enforced through `lib/auth/requireAuth.ts` and `lib/auth/permissions.ts`. Client-side UI toggling is never treated as security:
- `requireUser()`: Syncs and guarantees a valid application database user.
- `requireRole([ROLES])`: Enforces least-privilege role boundaries.
- `requireFarmerFarmOwnership(farmId)`: Verifies that the authenticated farmer owns the requested farm, preventing Insecure Direct Object Reference (IDOR) exploits.

### B. Farmer Data Consent Model
Financial institutions (e.g., MSCB Baramati) cannot unilaterally inspect a farmer's records. A bank officer can only view a dossier if:
1. The bank's institutional charter is `VERIFIED` by an administrator.
2. The farmer has created an active `Consent` record specifically for that bank.
3. The query matches the granted scopes (`farm_ownership`, `soil_health`, `crop_history`, etc.).
4. The access is automatically logged to the immutable `AuditLog`.

### C. Actuator Safety & IoT Interlocks
IoT commands to physical valves and sprinkler controllers are protected by strict schema constraints:
- Maximum duration capped at 120 minutes (hardcoded prevention against field flooding).
- Hardware emergency stop killswitch accessible directly from the Farmer Command Center.
- Out-of-range sensor readings (e.g. moisture > 100%, pH > 10) are rejected by Zod before persisting.

---

## 5. Modules & Capabilities Overview

### 1. Farmer Command Center (`/farmer/dashboard`)
Instant real-time overview:
- Soil health composite score (82 / 100 Grade A)
- Average root-zone moisture (42%)
- Connected IoT probes & active sprinkler countdown timer
- Contextual next action advisory

### 2. Field & Boundary Management (`/farmer/fields`)
Management of farm acreage, soil types (Black Cotton Soil, Red Loam), current crops, and no-till toggles across multiple parcels.

### 3. Soil Intelligence (`/farmer/soil`)
Detailed NPK bars, pH gauges, Organic Carbon percentages, and ICAR-MPKV agronomic prescriptions.

### 4. Automated Micro-Sprinkler Irrigation (`/farmer/irrigation`)
Automated moisture-triggered watering, configurable min/max target thresholds, and manual emergency override.

### 5. 6-Stage Organic Transition Engine (`/farmer/organic`)
Individualized roadmap moving from conventional chemical farming to certified organic:
1. Soil Baseline Assay
2. Chemical Dependency Reduction (-30%)
3. Organic Inputs (Jeevamrutha, FYM)
4. Biological Soil Management (Trichoderma)
5. Conservation No-Till
6. Certified Organic Production

### 6. No-Till Farming Hub (`/farmer/no-till`)
Adoption tracker, carbon sequestration metrics, and specialized machinery requirements.

### 7. IoT Device Ecosystem (`/farmer/devices`)
LoRaWAN gateway telemetry, battery levels, packet reception rates, and node heartbeat status.

### 8. Tractor & Machinery Rental (`/farmer/equipment`)
On-demand booking of 55HP tractors, laser land levelers, rotavators, and seed drills with hourly pricing.

### 9. Crop Marketplace (`/farmer/marketplace`)
Direct-to-buyer crop listing with live APMC mandi benchmark pricing (Pomegranate ₹145/kg, Soybean ₹46/kg).

### 10. Financial Services & Consent Center (`/farmer/finance`)
Kisan Credit Card (KCC) application tracking and granular data consent management with instant revocation.

### 11. Context-Aware AI Agronomist (`/farmer/assistant`)
Agricultural assistant receiving authorized farm context (soil readings, active crops, weather) while strictly refusing to prescribe banned pesticides or fabrications.

### 12. Institutional Dashboards
- **Bank Dashboard** (`/bank/dashboard`): Credit officer underwriting queue, consent-verified farmer dossiers.
- **Provider Dashboard** (`/provider/dashboard`): Fleet management, inbound booking requests.
- **Expert Dashboard** (`/expert/dashboard`): Consultation queue, prescription approvals.
- **Admin Dashboard** (`/admin/dashboard`): Institution verification queue, tamper-evident audit browser, server health telemetry.

---

## 6. Local Development Setup

### Prerequisites
- Node.js 18+ (Node.js 20+ recommended)
- npm or yarn

### Installation Steps

1. **Clone the repository and install dependencies:**
   ```bash
   git clone https://github.com/vinman2006/nexora.git
   cd "Mazhi Sheti"
   npm install
   ```

2. **Configure Environment Variables:**
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Add your Clerk publishable and secret keys.

3. **Initialize the Database:**
   Push the Prisma schema to the local SQLite database:
   ```bash
   npx prisma db push
   ```

4. **Seed Realistic Agricultural Data:**
   Populate MSCB bank, Anandarao Patil's 14.5A farm, 4 fields, IoT soil telemetry, and tractor fleet:
   ```bash
   npm run seed:mazhi
   ```

5. **Run the Automated Security Suite:**
   Verify RBAC, consent scoping, IDOR prevention, and IoT safety bounds:
   ```bash
   npm run test
   ```

6. **Start the Next.js Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

---

## 7. Centralized Observability & Better Stack Logging

Mazhi Sheti uses **Better Stack** as the official centralized application logging platform, backed by a strict sanitization and request-context layer:

```
Server Request / Operation
            |
            v
   [AsyncLocalStorage Context] (requestId, userId, org, route, durationMs)
            |
            v
   [Centralized Logger] (DEBUG, INFO, WARN, ERROR)
            |
            v
   [Sanitization Layer] (Masks passwords, OTPs, Clerk keys, Bearer tokens, PAN/Aadhaar)
            |
    +-------+-------+--------------------+
    |               |                    |
    v               v                    v
Better Stack   Sentry (Errors)    Terminal JSON (Dev)
(HTTP Ingestion)
```

### Key Capabilities:
1. **Centralized Abstraction** (`lib/logging/`):
   - `logger.ts`: Structured methods (`logger.debug`, `logger.info`, `logger.warn`, `logger.error`).
   - `context.ts`: Automatically attaches request tracing context (`requestId`, `userId`, `route`, `durationMs`).
   - `sanitize.ts`: Recursive redaction preventing sensitive credential leakage.
2. **Audit Log Dual-Dispatch** (`lib/audit/auditLogger.ts`):
   - Every security-sensitive event is persisted in the application database (`AuditLog`).
   - Simultaneously, a sanitized structured audit event is shipped to Better Stack.
   - Database audit records are append-only and cannot be altered or removed.
3. **Error Monitoring Hook**:
   - Ready for Sentry / OpenTelemetry error capture.

---

## 8. Quality & Validation Metrics

- **TypeScript compilation**: 100% clean (`npx tsc --noEmit` exited 0).
- **Security & RBAC test suite**: 15/15 assertions passing (`npm run test:security`).
- **Observability & Logging test suite**: 22/22 assertions passing (`npm run test:observability`).
- **Total automated tests**: 37/37 passing (`npm test`).
- **HTTP status tests**: All 17 platform routes verified responding with HTTP 200 OK.
- **Zero credential leaks**: All log payloads and audit metadata pass through the sanitization engine.
