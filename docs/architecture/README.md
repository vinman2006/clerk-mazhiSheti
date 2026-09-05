# Mazhi Sheti Architecture & Business Logic Documentation

Welcome to the comprehensive architecture, design, and user perspective documentation for **Mazhi Sheti**.

This directory contains modular, highly detailed specifications covering the complete operational logic of the platform across all primary stakeholders (Farmers, Banks, Equipment Providers, Agronomists, and Administrators).

---

## Documentation Index

| Document | Topic & Focus Area | Key Stakeholders |
| :--- | :--- | :--- |
| [01. System Architecture & Business Logic](./01_SYSTEM_ARCHITECTURE.md) | High-level system architecture, Next.js App Router, Prisma ORM entity graphs (25 models), Neon PostgreSQL connection pooling, Sentry monitoring, and state transition lifecycles. | All Engineers & Architects |
| [02. What Farmers See](./02_WHAT_FARMERS_SEE.md) | In-depth breakdown of all 12 farmer workspace modules (`/farmer/*`), including Command Center, Soil Health Cards, IoT telemetry, automated irrigation, 6-stage organic roadmap, and Razorpay marketplace/rentals. | Farmers, Agronomists, Frontend Engineers |
| [03. What Banks See](./03_WHAT_BANKS_SEE.md) | Institutional credit portal (`/bank/dashboard`), KCC/AIF underwriting queue, empirical "Green CIBIL" agronomic risk indicators, and DPDP Act statutory consent gates. | Banking Underwriters, Credit Officers, Risk Managers |
| [04. What Providers & Experts See](./04_WHAT_PROVIDERS_AND_EXPERTS_SEE.md) | Equipment rental fleet management (`/provider/dashboard`) and certified agronomist / soil scientist consultation and lab verification portal (`/expert/dashboard`). | Custom Hire Centers, Agronomists, Lab Scientists |
| [05. What Admins See](./05_WHAT_ADMINS_SEE.md) | Root administrative console (`/admin/dashboard`), institutional charter verification queues, immutable audit log browser, and system telemetry. | System Administrators, Compliance Auditors |
| [06. Security, Consent & Data Flow](./06_SECURITY_AND_DATA_FLOW.md) | Clerk authentication and RBAC, IDOR isolation, Razorpay timing-safe HMAC SHA-256 verification, webhook idempotency, and IoT actuator safety interlocks. | Security Engineers, Compliance Officers |

---

## Quick Reference: Role & Route Access Matrix

| Role | Allowed Route Paths | Primary Capabilities |
| :--- | :--- | :--- |
| `FARMER` | `/farmer/*` | Farm mapping, soil health, IoT monitoring, irrigation actuation, organic roadmap, equipment booking, marketplace checkout, loan applications. |
| `BANK` | `/bank/*` | Credit underwriting queue, farmer dossier inspection under active DPDP consent, agronomic risk scoring, loan sanctions. |
| `PROVIDER`| `/provider/*` | Machinery inventory, hourly/daily tariff setup, booking confirmations, Razorpay escrow settlement tracking. |
| `EXPERT` | `/expert/*` | Soil laboratory test reviews, digital prescription issuance, farmer crop disease photo diagnosis. |
| `ADMIN` | `/admin/*` | Stakeholder charter verification, immutable audit log inspections, system-wide telemetry and performance monitoring. |
