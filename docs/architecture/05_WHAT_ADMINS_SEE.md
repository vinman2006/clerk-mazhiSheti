# What Admins See: Platform Governance & Compliance Console

## 1. Overview & Root Governance

The central administrative portal is mounted at `/admin/dashboard`. It is restricted to authenticated users bearing the system `ADMIN` role. 

```
/admin
 └── /dashboard      -> Institutional Onboarding, KYC Approval, Audit Log Explorer & System Telemetry
```

The administrative tier guarantees systemic integrity, prevents unverified financial or input providers from accessing farmers, and maintains continuous regulatory compliance with Indian agricultural and banking mandates.

---

## 2. Institutional & Provider Verification Queue

All secondary stakeholders (Banks, Equipment Providers, Agronomists) must pass administrative verification before their accounts are activated.

### Verification Categories
1. **Bank Branches & Lending Officers**:
   - Verification of RBI banking charter license numbers, branch IFSC codes, and institutional email domains (`@mscb.com`, `@sbi.co.in`).
   - Approval/Rejection action triggers automatic role activation in Clerk metadata and database records.
2. **Custom Hire Equipment Providers (CHCs)**:
   - Verification of business GSTIN, commercial machinery registration papers (RTO forms 23 & 24), and operator insurance policies.
3. **Agronomy Experts**:
   - Verification of ICAR registration certificates, university diplomas, and state agriculture department empanelment records.

---

## 3. Real-Time Immutable Audit Log Browser

Admins have full visibility into the system-wide security and compliance ledger (`AuditLog` model).

### Audit Browser Features
- **Filter by Actor Type**: `FARMER`, `BANK`, `PROVIDER`, `EXPERT`, `SYSTEM`.
- **Search by Entity Target**: e.g., Filter by loan application ID `loan_app_9918` to see full history of underwriter access.
- **Tamper-Evident Verification**: Visual confirmation of cryptographic sequence hashes ensuring no records have been altered or purged.
- **Regulatory Export**: One-click generation of encrypted CSV/PDF audit records for state statutory audits or RBI ombudsman reviews.

---

## 4. System Telemetry & Infrastructure Health

The admin dashboard aggregates real-time health metrics from connected micro-services:
- **Neon PostgreSQL Database**:
  - Connection pool saturation status, active query latency, and database replica lag.
- **Clerk Authentication**:
  - Active sessions, token refresh rates, and failed login attempt alerts.
- **Razorpay Payment Gateway**:
  - Webhook delivery latency, settlement success ratios, and signature failure alerts.
- **IoT Ingestion Mesh**:
  - Total packets received in last 24 hours, dead-letter queue count, and offline device heartbeat warnings.
- **Sentry & Better Stack Integrations**:
  - Unresolved error spike alerts and log ingestion volume metrics.
