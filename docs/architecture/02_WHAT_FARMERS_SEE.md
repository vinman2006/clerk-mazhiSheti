# What Farmers See: The Farmer Workspace & Modules

## 1. Overview & Navigation

The farmer workspace is mounted at `/farmer/*`. It is tailored for low-friction mobile and desktop responsiveness, utilizing clear Marathi-English bilingual terminology, high-contrast visual cues, and resilient progressive disclosure.

```
/farmer
 ├── /dashboard      -> Agronomic Command Center
 ├── /farms          -> Multi-Farm & Cadastral Mapping
 ├── /fields         -> Field Micro-Management & Crop Rotations
 ├── /soil           -> Soil Health Card & NPK Analysis
 ├── /iot            -> Real-time Telemetry & Microclimate
 ├── /irrigation     -> Smart Water Budgeting & Solenoid Control
 ├── /organic        -> 6-Stage Organic Conversion Roadmap
 ├── /notill         -> Conservation Tillage & Crop Residue
 ├── /equipment      -> Custom Hire Center (CHC) & Razorpay Rentals
 ├── /marketplace    -> Direct Input Marketplace & Razorpay Checkout
 ├── /loans          -> Institutional Credit & Consent Manager
 └── /chat           -> Multilingual AI Agronomy Assistant
```

---

## 2. Deep Dive: Module by Module

### 1. Command Center (`/farmer/dashboard`)
- **Primary Hero**: Greeted with personalized farm weather, active crop cycles, and rapid alert banners (e.g., pest alerts, moisture deficit warnings).
- **KPI Metrics Cards**:
  - **Total Cultivated Area**: Aggregated acreage across all registered fields.
  - **Live Soil Moisture**: Average volumetric water content across active IoT probes.
  - **Organic Transition Stage**: Progress badge (e.g., "Stage 3: Zero Synthetic Inversion").
  - **Active Credit Status**: Active KCC/AIF micro-credit balances.
- **Quick Action Bar**: One-tap navigation to run irrigation, book a tractor, request a soil test, or consult the AI assistant.

### 2. Land & Farm Infrastructure (`/farmer/farms` & `/farmer/fields`)
- **Farm Manager**: List of owned/leased holdings with 7/12 land extract (Saat Bara Utara) verification status.
- **Field Micro-Partitioning**:
  - Breakdown of fields (e.g., "Field 1 - North Plot: 4.2 Acres, Black Cotton Soil").
  - Crop history timeline showing past kharif, rabi, and zaid rotations.
  - Soil moisture and nitrogen saturation indicators per plot.

### 3. Soil Health Intelligence (`/farmer/soil`)
- **Digital Soil Health Card**:
  - Displays primary macronutrients ($N$, $P$, $K$) alongside secondary micronutrients ($Zn$, $Fe$, $B$, Organic Carbon percentage).
  - Color-coded deficiency badges (Deficient, Optimum, Surplus).
- **Fertilizer Recommendation Calculator**:
  - Translates chemical soil test deficiencies into organic equivalents (e.g., "Apply 4 tonnes of Farm Yard Manure (FYM) + 200 kg Jeevamrut per acre to restore active nitrogen").
- **Soil Test Request Engine**: Enables booking on-site soil sampling by accredited mobile testing vans.

### 4. Precision IoT Telemetry (`/farmer/iot`)
- **Sensor Telemetry Dashboard**:
  - Live charts polling moisture at $15\text{ cm}$ and $30\text{ cm}$ root depths.
  - Ambient microclimate graphs: temperature, relative humidity, UV index, and solar irradiance.
- **Device Health Status**:
  - LoRaWAN/GSM signal strength (RSSI), battery voltage, and last-seen heartbeat timestamps.

### 5. Automated Irrigation Control (`/farmer/irrigation`)
- **Interactive Solenoid Valve Control**:
  - Real-time valve actuators (Zone 1: Drip lines, Zone 2: Sprinklers).
  - Safety Interlock Indicators: Prevents dry runs if main line pressure drops below $0.5\text{ bar}$.
- **Smart Scheduling Calendar**:
  - Evapotranspiration-based automated watering recommendations.
  - Night-time irrigation scheduling to leverage off-peak agricultural power tariffs.

### 6. Organic Transition Engine (`/farmer/organic`)
- **6-Stage Progressive Roadmap**:
  1. **Stage 1**: Baseline Soil Audit & Chemical Residue Profiling.
  2. **Stage 2**: Bio-fertilizer Integration (Rhizobium & Azotobacter cultures).
  3. **Stage 3**: Synthetic Pesticide Elimination (Neemastra & Dashparni Ark).
  4. **Stage 4**: Green Manuring & Multi-cropping (Dhaincha / Sunn hemp).
  5. **Stage 5**: Zero Chemical Fertilizer & Full Jeevamrut Saturation.
  6. **Stage 6**: NPOP / SGS Organic Certification Ready.
- **Audit Checklist & Verification Log**: Allows uploading photos of compost pits, bio-pesticide preparation, and receipt vouchers for organic audit trails.

### 7. No-Till Conservation Hub (`/farmer/notill`)
- **Residue Management Tracker**:
  - Happy Seeder / Super Seeder operation logs.
  - Mulch cover index (Target: $>70\%$ soil ground cover).
- **Carbon Sequestration Counter**: Estimated metric tonnes of $CO_2$ equivalent retained in soil per hectare.

### 8. Equipment Leasing Center (`/farmer/equipment`)
- **Local CHC Machinery Catalog**:
  - Tractors (45 HP - 75 HP), Laser Land Levelers, Rotavators, Multi-crop Harvesters, Drone Sprayers.
  - Hourly and daily transparent rental rates with refundable security deposits.
- **Instant Razorpay Booking**:
  - Date and time slot picker.
  - Operator preference toggle ("With driver" / "Self-operated").
  - Seamless Razorpay modal for online token advance or complete pre-authorization.

### 9. Agricultural Input Marketplace (`/farmer/marketplace`)
- **Direct Marketplace Catalog**:
  - Certified non-GMO organic seeds, bio-fertilizers, bio-fungicides, and drip-irrigation accessories.
- **Cart & Direct Order Checkout**:
  - Integrated with Razorpay checkout (`RazorpayCheckoutModal` component).
  - Displays instant payment status (Pending, Captured, Shipped).

### 10. Credit & Loan Application Manager (`/farmer/loans`)
- **Kisan Credit Card (KCC) & Agri-Infrastructure Fund (AIF)**:
  - Form to request working capital credit or long-term infrastructure funding.
- **Consent Gate & Dossier Sharing**:
  - Farmers explicitly check consent toggles allowing specific regional rural banks (e.g., MSCB Baramati branch) to inspect crop yield records and soil health indices.
  - Status tracking with timeline: `Submitted` $\rightarrow$ `Under Inspection` $\rightarrow$ `Underwritten` $\rightarrow$ `Approved`.

### 11. Multilingual Agronomy Chatbot (`/farmer/chat`)
- **AI-Powered Diagnostic Assistant**:
  - Interactive chat interface accepting queries in Marathi, Hindi, and English.
  - Common preset questions: *"कपाशीवरील बोंडअळी नियंत्रण कसे करावे?"* (How to control bollworms on cotton?), *"उसासाठी ठिबक सिंचन वेळापत्रक"* (Drip irrigation schedule for sugarcane).
  - Contextual responses integrating local weather forecast and active crop stage.
