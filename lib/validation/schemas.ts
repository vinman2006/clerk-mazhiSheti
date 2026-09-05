import { z } from 'zod';

// Farmer Onboarding & Profile Schema
export const farmerOnboardingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  state: z.string().min(2, 'State is required'),
  district: z.string().min(2, 'District is required'),
  taluka: z.string().min(2, 'Taluka is required'),
  village: z.string().min(2, 'Village is required'),
  pincode: z.string().regex(/^\d{6}$/, 'Please enter a valid 6-digit pincode').optional().or(z.literal('')),
  totalLandAcres: z.number().positive('Total land must be greater than 0'),
  ownershipType: z.enum(['OWNED', 'LEASED', 'SHARECROPPER']),
  experienceYears: z.number().int().nonnegative('Years must be 0 or more'),
  farmingMethod: z.enum(['CONVENTIONAL', 'TRANSITIONAL', 'ORGANIC', 'NO_TILL']),
  irrigationType: z.enum(['DRIP', 'SPRINKLER', 'CANAL', 'BOREWELL', 'RAINFED']),
  initialFarmName: z.string().min(2, 'Farm name is required'),
});

// Farm Creation Schema
export const farmCreateSchema = z.object({
  name: z.string().min(2, 'Farm name is required'),
  totalAreaAcres: z.number().positive('Area must be positive'),
  surveyNumber: z.string().optional(),
  location: z.string().min(2, 'Location is required'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

// Field Creation Schema
export const fieldCreateSchema = z.object({
  farmId: z.string().min(1, 'Farm ID is required'),
  name: z.string().min(2, 'Field name is required'),
  areaAcres: z.number().positive('Field area must be positive'),
  soilType: z.enum(['Black Cotton Soil', 'Red Loam', 'Alluvial', 'Sandy Loam', 'Laterite Soil']),
  currentCrop: z.string().min(2, 'Current crop is required'),
  cropVariety: z.string().optional(),
  isNoTill: z.boolean().default(false),
  irrigationZone: z.string().optional(),
});

// Soil Test Entry Schema
export const soilRecordSchema = z.object({
  fieldId: z.string().min(1, 'Field ID is required'),
  ph: z.number().min(3.5).max(10.0, 'pH must be between 3.5 and 10.0'),
  moisture: z.number().min(0).max(100, 'Moisture percentage must be between 0 and 100'),
  nitrogen: z.number().nonnegative('Nitrogen must be non-negative'),
  phosphorus: z.number().nonnegative('Phosphorus must be non-negative'),
  potassium: z.number().nonnegative('Potassium must be non-negative'),
  organicCarbon: z.number().min(0).max(10, 'Organic carbon must be realistic (0-10%)'),
  source: z.enum(['SENSOR', 'LAB_IMPORT', 'MANUAL_ENTRY']).default('MANUAL_ENTRY'),
});

// Safe IoT Ingestion Schema
export const deviceIngestSchema = z.object({
  deviceCode: z.string().min(4, 'Device code required'),
  timestamp: z.string().datetime().optional(),
  moisture: z.number().min(0).max(100).optional(),
  temperature: z.number().min(-10).max(60).optional(),
  humidity: z.number().min(0).max(100).optional(),
  battery: z.number().min(0).max(100).optional(),
  rawPayload: z.string().optional(),
});

// Automated Irrigation Command with Safety Limits
export const irrigationCommandSchema = z.object({
  systemId: z.string().min(1, 'System ID is required'),
  action: z.enum(['START', 'STOP', 'EMERGENCY_STOP', 'UPDATE_AUTO_MODE']),
  durationMinutes: z.number().int().min(1).max(120, 'Max duration cannot exceed 120 minutes').optional(),
  moistureMinThreshold: z.number().min(10).max(50).optional(),
  moistureMaxThreshold: z.number().min(40).max(80).optional(),
  reason: z.string().optional(),
});

// Equipment Rental Booking Schema
export const equipmentBookingSchema = z.object({
  equipmentId: z.string().min(1, 'Equipment ID is required'),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  totalHours: z.number().int().positive('Hours must be positive'),
  deliveryAddress: z.string().min(5, 'Delivery address is required'),
  notes: z.string().optional(),
});

// Crop Marketplace Listing Schema
export const marketplaceListingSchema = z.object({
  cropName: z.string().min(2, 'Crop name is required'),
  variety: z.string().optional(),
  quantityKg: z.number().positive('Quantity must be greater than 0'),
  pricePerKg: z.number().positive('Price per kg must be positive'),
  minOrderKg: z.number().positive('Minimum order must be positive').default(50),
  harvestDate: z.string().optional(),
  organicCertified: z.boolean().default(false),
  location: z.string().min(2, 'Location is required'),
});

// Loan Application Submission Schema
export const loanApplicationSchema = z.object({
  bankOrgId: z.string().min(1, 'Bank organization ID is required'),
  schemeName: z.string().min(2, 'Scheme name is required'),
  amountRequested: z.number().min(10000, 'Minimum loan amount is ₹10,000'),
  tenureMonths: z.number().int().min(6).max(120, 'Tenure must be between 6 and 120 months'),
  purpose: z.string().min(10, 'Please provide detailed purpose for loan request'),
});

// Farmer Consent Grant Schema
export const consentGrantSchema = z.object({
  bankOrgId: z.string().min(1, 'Bank organization is required'),
  scopes: z.array(z.enum(['farm_ownership', 'soil_health', 'crop_history', 'financials'])).min(1, 'Select at least one data scope'),
  purpose: z.string().min(5, 'Consent purpose is required'),
  expiresInDays: z.number().int().min(1).max(365).default(90),
});
