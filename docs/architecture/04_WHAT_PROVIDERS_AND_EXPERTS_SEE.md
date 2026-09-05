# What Providers & Agriculture Experts See

## 1. Overview

Mazhi Sheti provides dedicated interfaces for two key agricultural ecosystem enablers:
1. **Equipment & Machinery Providers** (`/provider/dashboard`): Operators of Custom Hire Centers (CHCs), tractor fleet managers, and agricultural implement suppliers.
2. **Certified Agriculture Experts** (`/expert/dashboard`): Agronomists, soil laboratory scientists, and Indian Council of Agricultural Research (ICAR) / Krishi Vigyan Kendra (KVK) specialists.

---

## 2. Equipment Provider Workspace (`/provider/dashboard`)

```
/provider
 └── /dashboard      -> Fleet Telemetry, Rental Queue, Hourly Pricing & Payouts
```

### Key Provider Capabilities
- **Fleet Inventory Management**:
  - Register machinery with horsepower, registration plates, implement types (Rotavator, Laser Leveler, Happy Seeder, Drone Sprayer).
  - Status indicators: `AVAILABLE`, `BOOKED`, `UNDER_MAINTENANCE`, `TRANSIT`.
- **Dynamic Tariff Configuration**:
  - Configure hourly rental rates (e.g., ₹850/hour for 55HP 4WD Tractor).
  - Configure daily maximum caps and security deposit thresholds.
  - Driver/Operator addon pricing (e.g., +₹150/hour for certified operator).
- **Incoming Booking Queue**:
  - Real-time notification of farmer booking requests with field location GPS coordinates.
  - Verification of Razorpay payment escrow status (`ESCROW_HELD`).
  - Action buttons: `Confirm & Dispatch`, `Reschedule`, `Complete Rental & Release Deposit`.
- **Earnings & Settlement Tracking**:
  - Gross rental revenue, platform facilitation fee deduction ($3\%$), and bank settlement ledger.

---

## 3. Agriculture Expert & Soil Scientist Workspace (`/expert/dashboard`)

```
/expert
 └── /dashboard      -> Consultation Queue, Lab Test Verification & Prescriptions
```

### Key Expert Capabilities
- **Accreditation Header**:
  - Displays ICAR/KVK registration identifier, verified educational degree (e.g., M.Sc. Soil Science & Agricultural Chemistry, MPKV Rahuri), and verified badge.
- **Soil Laboratory Test Review Queue**:
  - Incoming requests from farmers who submitted soil samples.
  - Laboratory instrument data verification (spectrophotometer readings for $N$, $P$, $K$, flame photometer readings for micronutrients, and pH/EC probe calibrations).
- **Agronomic Prescription Generator**:
  - Form to issue certified digital recommendations with dosage schedules.
  - Automatic conversion between conventional chemical recommendations and bio-organic alternatives (e.g., substituting synthetic DAP with rock phosphate + Phosphate Solubilizing Bacteria).
- **Farmer Direct Q&A & Diagnostic Consultations**:
  - Image inspection console: Farmers submit photographs of crop leaf discoloration, pest infestation, or fungal rust.
  - Expert diagnosis entry: Pest identification, severity tier (Low/Critical), and organic remediation measures (e.g., Trichoderma viride spray schedule).
- **Official Seal & Signing**:
  - Every issued recommendation is stamped with the expert's digital signature hash and stored in the farmer's permanent soil record.
