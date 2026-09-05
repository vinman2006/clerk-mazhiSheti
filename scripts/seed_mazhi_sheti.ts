import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Mazhi Sheti initial production-quality domain data...');

  // 1. Create System Admin User
  const adminUser = await prisma.user.upsert({
    where: { clerkUserId: 'admin_seed_clerk_id' },
    update: {},
    create: {
      clerkUserId: 'admin_seed_clerk_id',
      role: 'ADMIN',
      name: 'System Admin',
      email: 'admin@mazhisheti.in',
      phone: '9800000001',
      status: 'ACTIVE',
    },
  });

  // 2. Create Bank Organization & Officer
  const bankOrg = await prisma.bankOrganization.upsert({
    where: { registrationNo: 'MSCB-MH-1961-042' },
    update: {},
    create: {
      name: 'Maharashtra State Cooperative Bank',
      institutionType: 'COOPERATIVE_BANK',
      branchName: 'Baramati Central Branch',
      registrationNo: 'MSCB-MH-1961-042',
      officialEmail: 'credit.baramati@mscb.org.in',
      phone: '02112224500',
      status: 'VERIFIED',
    },
  });

  const bankOfficerUser = await prisma.user.upsert({
    where: { clerkUserId: 'bank_officer_seed_clerk_id' },
    update: {},
    create: {
      clerkUserId: 'bank_officer_seed_clerk_id',
      role: 'BANK_LOAN_OFFICER',
      name: 'Suresh Deshmukh',
      email: 'suresh.deshmukh@mscb.org.in',
      phone: '9822099881',
      status: 'ACTIVE',
    },
  });

  // 3. Create Demo Farmer User & Profile
  const farmerUser = await prisma.user.upsert({
    where: { clerkUserId: 'farmer_ananda_seed_clerk_id' },
    update: {},
    create: {
      clerkUserId: 'farmer_ananda_seed_clerk_id',
      role: 'FARMER',
      name: 'Anandarao Patil',
      email: 'anand.patil@agrimail.in',
      phone: '9822012345',
      status: 'ACTIVE',
    },
  });

  const farmer = await prisma.farmer.upsert({
    where: { clerkUserId: farmerUser.clerkUserId },
    update: {},
    create: {
      userId: farmerUser.id,
      clerkUserId: farmerUser.clerkUserId,
      name: 'Anandarao Patil',
      phone: '9822012345',
      email: 'anand.patil@agrimail.in',
      state: 'Maharashtra',
      district: 'Pune',
      taluka: 'Baramati',
      village: 'Malegaon Budruk',
      pincode: '413115',
      totalLandAcres: 14.5,
      ownershipType: 'OWNED',
      experienceYears: 18,
      farmingMethod: 'TRANSITIONAL',
      irrigationType: 'DRIP',
      soilHealthScore: 82.0,
      organicPercentage: 35.0,
      transitionStage: 3,
      noTillPercentage: 40.0,
    },
  });

  // 4. Create Farm
  const farm = await prisma.farm.create({
    data: {
      farmerId: farmer.id,
      name: 'Patil Krishi Sanjivani Farm',
      totalAreaAcres: 14.5,
      surveyNumber: 'Gat No. 142/2A',
      location: 'Malegaon Rd, Baramati, Pune, MH',
      latitude: 18.1523,
      longitude: 74.5784,
    },
  });

  // 5. Create 4 Distinct Fields
  const field1 = await prisma.field.create({
    data: {
      farmId: farm.id,
      name: 'Field 01 — Sugarcane Plot',
      areaAcres: 5.0,
      soilType: 'Black Cotton Soil',
      currentCrop: 'Sugarcane',
      cropVariety: 'Co 86032 (Nira)',
      isNoTill: false,
      irrigationZone: 'Zone A',
      status: 'ACTIVE',
    },
  });

  const field2 = await prisma.field.create({
    data: {
      farmId: farm.id,
      name: 'Field 02 — Soybean & Wheat No-Till',
      areaAcres: 4.0,
      soilType: 'Black Cotton Soil',
      currentCrop: 'Soybean',
      cropVariety: 'JS 335',
      isNoTill: true,
      irrigationZone: 'Zone B',
      status: 'ACTIVE',
    },
  });

  const field3 = await prisma.field.create({
    data: {
      farmId: farm.id,
      name: 'Field 03 — Organic Pomegranate Orchard',
      areaAcres: 3.5,
      soilType: 'Red Loam',
      currentCrop: 'Pomegranate',
      cropVariety: 'Bhagwa Super',
      isNoTill: true,
      irrigationZone: 'Zone C',
      status: 'ACTIVE',
    },
  });

  const field4 = await prisma.field.create({
    data: {
      farmId: farm.id,
      name: 'Field 04 — Pulses & Vegetables',
      areaAcres: 2.0,
      soilType: 'Alluvial',
      currentCrop: 'Chickpea & Onion',
      cropVariety: 'Digvijay Gram',
      isNoTill: false,
      irrigationZone: 'Zone D',
      status: 'ACTIVE',
    },
  });

  // 6. Soil Records & Lab Tests
  await prisma.soilRecord.create({
    data: {
      fieldId: field2.id,
      source: 'SENSOR',
      ph: 6.85,
      moisture: 42.0,
      temperature: 24.2,
      nitrogen: 228.0,
      phosphorus: 21.0,
      potassium: 210.0,
      organicCarbon: 0.82,
      electricalConductivity: 0.38,
      healthScore: 84.0,
      trend: 'IMPROVING',
      recommendation: 'Soil organic carbon rising steadily. Continue no-till residue mulching.',
    },
  });

  await prisma.soilRecord.create({
    data: {
      fieldId: field3.id,
      source: 'LAB_IMPORT',
      ph: 7.1,
      moisture: 36.5,
      temperature: 25.0,
      nitrogen: 210.0,
      phosphorus: 24.5,
      potassium: 235.0,
      organicCarbon: 0.95,
      electricalConductivity: 0.32,
      healthScore: 88.0,
      trend: 'IMPROVING',
      recommendation: 'Exceptional microbial activity. Ready for Stage 4 biological certification.',
    },
  });

  // 7. IoT Devices & Automated Irrigation
  const soilSensor = await prisma.device.create({
    data: {
      farmId: farm.id,
      fieldId: field2.id,
      deviceCode: 'MS-SOIL-PROBE-042',
      name: 'Baramati Soil Multi-Probe #01',
      deviceType: 'SOIL_MOISTURE',
      status: 'ONLINE',
      batteryLevel: 96.0,
      firmwareVersion: 'v2.4.2',
    },
  });

  const irrigationController = await prisma.device.create({
    data: {
      farmId: farm.id,
      fieldId: field2.id,
      deviceCode: 'MS-SPRINKLER-CTL-108',
      name: 'Smart Sprinkler Valve Node #02',
      deviceType: 'SPRINKLER_CONTROLLER',
      status: 'ONLINE',
      batteryLevel: 98.0,
    },
  });

  const irrigationSys = await prisma.irrigationSystem.create({
    data: {
      farmId: farm.id,
      deviceId: irrigationController.id,
      name: 'Field 02 Automated Micro-Sprinkler',
      type: 'SPRINKLER',
      status: 'IDLE',
      autoMode: true,
      moistureMinThreshold: 35.0,
      moistureMaxThreshold: 55.0,
      maxDurationMinutes: 45,
    },
  });

  // 8. 6-Stage Organic Transition Plan
  const organicPlan = await prisma.organicPlan.create({
    data: {
      farmerId: farmer.id,
      currentStage: 3,
      overallScore: 62.0,
      steps: {
        create: [
          { stageNumber: 1, title: 'Soil Baseline Assessment', description: 'Comprehensive lab soil test across all fields to measure baseline NPK and residual chemical load.', status: 'COMPLETED' },
          { stageNumber: 2, title: 'Reduce Chemical Dependency by 40%', description: 'Substitute synthetic nitrogen with neem-coated urea and green manuring (Dhaincha).', status: 'COMPLETED' },
          { stageNumber: 3, title: 'Introduce Organic Carbon & Bio-Inputs', description: 'Apply 5 tons/acre enriched farmyard manure (FYM), jeevamrut, and vermicompost.', status: 'IN_PROGRESS' },
          { stageNumber: 4, title: 'Biological Soil & Pest Management', description: 'Introduce Trichoderma, Pseudomonas bio-fungicides, and pheromone pest traps.', status: 'PENDING' },
          { stageNumber: 5, title: 'Reduced Tillage / No-Till Expansion', description: 'Transition 75% of acreage to zero-till seed drills and permanent cover crop mulch.', status: 'PENDING' },
          { stageNumber: 6, title: 'Certified Organic Farm Status', description: 'Third-party NPOP/PGS-India organic certification inspection and chemical residue test.', status: 'PENDING' },
        ],
      },
    },
  });

  // 9. Equipment Rental Fleet
  await prisma.equipment.createMany({
    data: [
      {
        providerUserId: 'provider_seed_01',
        name: 'Mahindra 575 DI Bhoomiputra Tractor',
        category: 'TRACTOR',
        makeModel: 'Mahindra 575 DI (47 HP)',
        horsepower: 47,
        hourlyRate: 650.0,
        dailyRate: 4800.0,
        location: 'Baramati MIDC, Pune',
        status: 'AVAILABLE',
        contactPhone: '9822455667',
      },
      {
        providerUserId: 'provider_seed_02',
        name: 'John Deere 5050D 4WD Heavy Duty Tractor',
        category: 'TRACTOR',
        makeModel: 'John Deere 5050D (50 HP)',
        horsepower: 50,
        hourlyRate: 850.0,
        dailyRate: 6200.0,
        location: 'Daund Phata, Pune',
        status: 'AVAILABLE',
        contactPhone: '9822112233',
      },
      {
        providerUserId: 'provider_seed_01',
        name: 'Happy Seeder Zero-Till Planter Implement',
        category: 'NO_TILL_PLANTER',
        makeModel: 'Shaktiman 9-Tyne No-Till Seeder',
        horsepower: 45,
        hourlyRate: 500.0,
        dailyRate: 3600.0,
        location: 'Baramati MIDC, Pune',
        status: 'AVAILABLE',
        contactPhone: '9822455667',
      },
    ],
  });

  // 10. Crop Marketplace Listings
  await prisma.marketplaceListing.createMany({
    data: [
      {
        farmerId: farmer.id,
        cropName: 'Pomegranate (Bhagwa Quality)',
        variety: 'Export Grade Grade-A',
        quantityKg: 1500.0,
        pricePerKg: 135.0,
        minOrderKg: 50.0,
        organicCertified: true,
        location: 'Baramati, Pune',
        status: 'ACTIVE',
      },
      {
        farmerId: farmer.id,
        cropName: 'Soybean (Organic Transition)',
        variety: 'JS 335 Non-GMO',
        quantityKg: 2800.0,
        pricePerKg: 58.0,
        minOrderKg: 100.0,
        organicCertified: false,
        location: 'Baramati, Pune',
        status: 'ACTIVE',
      },
    ],
  });

  // 11. Bank Loan & Consent
  await prisma.loanApplication.create({
    data: {
      farmerId: farmer.id,
      bankOrgId: bankOrg.id,
      applicationNo: 'MSCB-KCC-2026-8891',
      schemeName: 'Kisan Credit Card (KCC) Crop Working Capital',
      amountRequested: 350000.0,
      tenureMonths: 36,
      purpose: 'Drip irrigation upgrade and organic bio-fertilizer seasonal input procurement.',
      status: 'APPROVED',
      reviewedByUserId: bankOfficerUser.id,
      reviewNotes: 'Verified soil health score (82/100) and 14.5 acre title deeds via auditable consent record.',
    },
  });

  await prisma.consent.create({
    data: {
      farmerId: farmer.id,
      bankOrgId: bankOrg.id,
      purpose: 'Seasonal Agricultural Credit Underwriting & Farm Title Verification',
      scopes: 'farm_ownership,soil_health,crop_history',
      status: 'ACTIVE',
    },
  });

  // 12. Initial Audit Record
  await prisma.auditLog.create({
    data: {
      actorId: farmerUser.id,
      actorRole: 'FARMER',
      actorName: farmer.name,
      action: 'CONSENT_GRANTED',
      resource: 'CONSENT',
      details: `Farmer granted access scopes [farm_ownership,soil_health,crop_history] to ${bankOrg.name}`,
    },
  });

  console.log('✅ Mazhi Sheti seed data successfully populated!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
