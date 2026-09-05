import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('\n=============================================================');
  console.log('🌱 MAZHI SHETI: SEEDING REALISTIC AGRICULTURAL DOMAIN DATA');
  console.log('=============================================================\n');

  // SAFETY GUARD: NEVER SEED PRODUCTION ACCIDENTALLY
  if (process.env.NODE_ENV === 'production' && process.env.ALLOW_PRODUCTION_SEED !== 'true') {
    throw new Error('FATAL: Attempted to seed development data against a production database. Aborted.');
  }

  // 1. Standard Agricultural Crops Catalog
  console.log('[1/12] Creating standard crop catalog...');
  const crops = [
    { name: 'Sugarcane (ऊस)', season: 'PERENNIAL', defaultDurationDays: 360, waterRequirement: 'HIGH' },
    { name: 'Soybean (सोयाबीन)', season: 'KHARIF', defaultDurationDays: 105, waterRequirement: 'MEDIUM' },
    { name: 'Pomegranate (डाळिंब)', season: 'PERENNIAL', defaultDurationDays: 180, waterRequirement: 'LOW' },
    { name: 'Wheat (गहू)', season: 'RABI', defaultDurationDays: 120, waterRequirement: 'MEDIUM' },
    { name: 'Onion (कांदा)', season: 'RABI', defaultDurationDays: 95, waterRequirement: 'MEDIUM' },
    { name: 'Cotton (कापूस)', season: 'KHARIF', defaultDurationDays: 160, waterRequirement: 'MEDIUM' },
  ];

  for (const c of crops) {
    await prisma.crop.upsert({
      where: { name: c.name },
      update: {},
      create: c,
    });
  }

  // 2. System Root Admin
  console.log('[2/12] Creating platform root admin...');
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

  // 3. Financial Institution: Maharashtra State Cooperative Bank (MSCB)
  console.log('[3/12] Creating bank organization & officers...');
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
      name: 'Ramesh Kulkarni',
      email: 'ramesh.kulkarni@mscb.org.in',
      phone: '9822099881',
      status: 'ACTIVE',
    },
  });

  // Organization Member association
  await prisma.organizationMember.upsert({
    where: {
      organizationId_userId: {
        organizationId: bankOrg.id,
        userId: bankOfficerUser.id,
      },
    },
    update: {},
    create: {
      organizationId: bankOrg.id,
      userId: bankOfficerUser.id,
      role: 'BANK_LOAN_OFFICER',
      status: 'ACTIVE',
    },
  });

  // 4. Equipment Rental Fleet Provider
  console.log('[4/12] Creating machinery rental provider fleet...');
  const providerUser = await prisma.user.upsert({
    where: { clerkUserId: 'provider_sahyadri_clerk_id' },
    update: {},
    create: {
      clerkUserId: 'provider_sahyadri_clerk_id',
      role: 'PROVIDER_OWNER',
      name: 'Sahyadri Custom Hiring Fleet',
      email: 'rentals@sahyadricustomhiring.in',
      phone: '9822088771',
      status: 'ACTIVE',
    },
  });

  // 5. Seed 3 Diverse Farmers (Anandarao Patil, Balasaheb Jagtap, Sunita More)
  console.log('[5/12] Creating 3 farmer profiles...');

  // Farmer 1: Anandarao Patil (14.5 Acres, Transitional Organic)
  const user1 = await prisma.user.upsert({
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

  const farmer1 = await prisma.farmer.upsert({
    where: { clerkUserId: 'farmer_ananda_seed_clerk_id' },
    update: {},
    create: {
      userId: user1.id,
      clerkUserId: 'farmer_ananda_seed_clerk_id',
      name: 'Anandarao Patil',
      phone: '9822012345',
      email: 'anand.patil@agrimail.in',
      state: 'Maharashtra',
      district: 'Pune',
      taluka: 'Baramati',
      village: 'Malegaon',
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

  // Farmer 2: Balasaheb Jagtap (8.0 Acres, Conventional Farming)
  const user2 = await prisma.user.upsert({
    where: { clerkUserId: 'farmer_balasaheb_clerk_id' },
    update: {},
    create: {
      clerkUserId: 'farmer_balasaheb_clerk_id',
      role: 'FARMER',
      name: 'Balasaheb Jagtap',
      email: 'balasaheb.jagtap@agrimail.in',
      phone: '9822045678',
      status: 'ACTIVE',
    },
  });

  const farmer2 = await prisma.farmer.upsert({
    where: { clerkUserId: 'farmer_balasaheb_clerk_id' },
    update: {},
    create: {
      userId: user2.id,
      clerkUserId: 'farmer_balasaheb_clerk_id',
      name: 'Balasaheb Jagtap',
      phone: '9822045678',
      email: 'balasaheb.jagtap@agrimail.in',
      state: 'Maharashtra',
      district: 'Pune',
      taluka: 'Baramati',
      village: 'Morgaon',
      pincode: '412304',
      totalLandAcres: 8.0,
      ownershipType: 'OWNED',
      experienceYears: 12,
      farmingMethod: 'CONVENTIONAL',
      irrigationType: 'SPRINKLER',
      soilHealthScore: 74.0,
      organicPercentage: 10.0,
      transitionStage: 1,
      noTillPercentage: 0.0,
    },
  });

  // Farmer 3: Sunita More (5.5 Acres, 100% Certified Organic)
  const user3 = await prisma.user.upsert({
    where: { clerkUserId: 'farmer_sunita_clerk_id' },
    update: {},
    create: {
      clerkUserId: 'farmer_sunita_clerk_id',
      role: 'FARMER',
      name: 'Sunita More',
      email: 'sunita.more@agrimail.in',
      phone: '9822078901',
      status: 'ACTIVE',
    },
  });

  const farmer3 = await prisma.farmer.upsert({
    where: { clerkUserId: 'farmer_sunita_clerk_id' },
    update: {},
    create: {
      userId: user3.id,
      clerkUserId: 'farmer_sunita_clerk_id',
      name: 'Sunita More',
      phone: '9822078901',
      email: 'sunita.more@agrimail.in',
      state: 'Maharashtra',
      district: 'Pune',
      taluka: 'Baramati',
      village: 'Hol',
      pincode: '412306',
      totalLandAcres: 5.5,
      ownershipType: 'OWNED',
      experienceYears: 9,
      farmingMethod: 'ORGANIC',
      irrigationType: 'DRIP',
      soilHealthScore: 91.0,
      organicPercentage: 100.0,
      transitionStage: 6,
      noTillPercentage: 75.0,
    },
  });

  // 6. Farms & Fields
  console.log('[6/12] Creating farms and spatial field parcels...');
  
  // Farm 1: Anandarao Patil Farm
  const farm1 = await prisma.farm.create({
    data: {
      farmerId: farmer1.id,
      name: 'Patil Krishi Farm',
      totalAreaAcres: 14.5,
      surveyNumber: '78/2A, 78/2B',
      location: 'Malegaon Budruk, Baramati',
      latitude: 18.1524,
      longitude: 74.5772,
    },
  });

  const field1 = await prisma.field.create({
    data: {
      farmId: farm1.id,
      name: 'Field 01 - North Sugarcane Parcel',
      areaAcres: 5.0,
      soilType: 'Black Cotton Soil',
      currentCrop: 'Sugarcane (ऊस)',
      cropVariety: 'Co 86032 (Nira)',
      isNoTill: true,
      status: 'ACTIVE',
    },
  });

  const field2 = await prisma.field.create({
    data: {
      farmId: farm1.id,
      name: 'Field 02 - Soybean & Pulse Rotation',
      areaAcres: 4.0,
      soilType: 'Black Cotton Soil',
      currentCrop: 'Soybean (सोयाबीन)',
      cropVariety: 'JS 335',
      isNoTill: true,
      status: 'ACTIVE',
    },
  });

  const field3 = await prisma.field.create({
    data: {
      farmId: farm1.id,
      name: 'Field 03 - Pomegranate High-Density',
      areaAcres: 3.5,
      soilType: 'Red Loam',
      currentCrop: 'Pomegranate (डाळिंब)',
      cropVariety: 'Bhagwa',
      isNoTill: false,
      status: 'ACTIVE',
    },
  });

  const field4 = await prisma.field.create({
    data: {
      farmId: farm1.id,
      name: 'Field 04 - Fodder & Cover Crop Nursery',
      areaAcres: 2.0,
      soilType: 'Alluvial',
      currentCrop: 'Wheat (गहू)',
      cropVariety: 'Lokwan',
      isNoTill: false,
      status: 'ACTIVE',
    },
  });

  // Farm 2: Jagtap Agro Fields
  const farm2 = await prisma.farm.create({
    data: {
      farmerId: farmer2.id,
      name: 'Jagtap Agro Fields',
      totalAreaAcres: 8.0,
      surveyNumber: '114/1',
      location: 'Morgaon, Baramati',
      latitude: 18.2789,
      longitude: 74.3168,
    },
  });

  const fieldJagtap1 = await prisma.field.create({
    data: {
      farmId: farm2.id,
      name: 'East Onion Field',
      areaAcres: 4.5,
      soilType: 'Black Cotton Soil',
      currentCrop: 'Onion (कांदा)',
      cropVariety: 'Bhima Super',
      isNoTill: false,
      status: 'ACTIVE',
    },
  });

  // 7. Precision Soil Telemetry & Laboratory Records
  console.log('[7/12] Creating soil intelligence and laboratory assays...');
  await prisma.soilRecord.create({
    data: {
      fieldId: field1.id,
      ph: 7.2,
      moisture: 42.0,
      temperature: 26.5,
      nitrogen: 280.0,
      phosphorus: 24.5,
      potassium: 210.0,
      organicCarbon: 1.15,
      electricalConductivity: 0.52,
      healthScore: 84.0,
      trend: 'IMPROVING',
      recommendation: 'Soil carbon increasing under zero-tillage mulch. Maintain microbial inoculant Jeevamrutha.',
    },
  });

  await prisma.soilRecord.create({
    data: {
      fieldId: field2.id,
      ph: 6.8,
      moisture: 28.5, // Below safety target -> triggers sprinkler
      temperature: 27.8,
      nitrogen: 220.0,
      phosphorus: 18.0,
      potassium: 175.0,
      organicCarbon: 0.88,
      electricalConductivity: 0.44,
      healthScore: 78.0,
      trend: 'STABLE',
      recommendation: 'Root moisture dropped below minimum safety target (35%). Micro-sprinkler initiated.',
    },
  });

  await prisma.soilTest.create({
    data: {
      fieldId: field1.id,
      labName: 'MPKV Regional Soil Health & Testing Lab',
      sampleId: 'MPKV-SOIL-2026-9901',
      ph: 7.2,
      nitrogen: 280.0,
      phosphorus: 24.5,
      potassium: 210.0,
      organicCarbon: 1.15,
      micronutrients: 'Zinc: 1.2 ppm (Adequate), Iron: 5.4 ppm, Boron: 0.6 ppm',
      reportUrl: 'https://documents.mazhisheti.in/soil-reports/MPKV-SOIL-2026-9901.pdf',
    },
  });

  // 8. Smart IoT Ecosystem & Actuators
  console.log('[8/12] Creating smart IoT devices and sprinkler controllers...');
  const probeDevice = await prisma.device.create({
    data: {
      farmId: farm1.id,
      fieldId: field2.id,
      deviceCode: 'LORA-BARAMATI-01',
      name: 'LoRaWAN Soil Sensor Node Zone 2',
      deviceType: 'SOIL_MOISTURE',
      batteryLevel: 88.0,
      firmwareVersion: 'v3.1.0-lora',
      status: 'ONLINE',
    },
  });

  await prisma.deviceReading.create({
    data: {
      deviceId: probeDevice.id,
      moisture: 28.5,
      temperature: 27.8,
      humidity: 58.0,
      battery: 88.0,
    },
  });

  const irrigationSystem = await prisma.irrigationSystem.create({
    data: {
      farmId: farm1.id,
      deviceId: probeDevice.id,
      name: 'Micro-Sprinkler Sub-station Zone 2',
      type: 'SPRINKLER',
      status: 'IRRIGATING',
      autoMode: true,
      moistureMinThreshold: 35.0,
      moistureMaxThreshold: 60.0,
      maxDurationMinutes: 45,
      lastRunAt: new Date(),
    },
  });

  await prisma.irrigationEvent.create({
    data: {
      systemId: irrigationSystem.id,
      fieldId: field2.id,
      startTime: new Date(),
      durationSeconds: 15 * 60,
      waterVolumeLiters: 675.0,
      trigger: 'AUTO_SENSOR',
      status: 'IN_PROGRESS',
      notes: 'Automated irrigation cycle active: Field 02 moisture (28.5%) below 35% safety threshold.',
    },
  });

  // 9. 6-Stage Organic Transition Engine
  console.log('[9/12] Creating 6-stage biological organic transition roadmap...');
  const organicPlan = await prisma.organicPlan.create({
    data: {
      farmerId: farmer1.id,
      currentStage: 3,
      overallScore: 68.0,
    },
  });

  const stages = [
    { num: 1, title: 'Soil Baseline Assay', desc: 'Complete NPK, pH, and Organic Carbon baseline test', status: 'COMPLETED' },
    { num: 2, title: 'Reduce Chemical Dependency', desc: 'Reduce synthetic urea and DAP fertilizer usage by 30%', status: 'COMPLETED' },
    { num: 3, title: 'Introduce Organic Inputs', desc: 'Apply farmyard manure and 200L/acre Jeevamrutha biostimulant', status: 'IN_PROGRESS' },
    { num: 4, title: 'Biological Soil Stewardship', desc: 'Inoculate Trichoderma and mycorrhiza microbial cultures', status: 'PENDING' },
    { num: 5, title: 'Reduced Tillage / No-Till', desc: 'Adopt zero-tillage direct seeding with crop residue retention', status: 'PENDING' },
    { num: 6, title: 'Certified Organic Production', desc: 'Attain NPOP / Jaivik Bharat national organic certification', status: 'PENDING' },
  ];

  for (const s of stages) {
    await prisma.transitionStep.create({
      data: {
        planId: organicPlan.id,
        stageNumber: s.num,
        title: s.title,
        description: s.desc,
        status: s.status,
      },
    });
  }

  // 10. Machinery & Tractor Fleets
  console.log('[10/12] Creating equipment fleet & bookings...');
  const tractor = await prisma.equipment.create({
    data: {
      providerUserId: providerUser.id,
      name: 'John Deere 5050D 4WD Heavy Duty Tractor',
      category: 'TRACTOR',
      makeModel: 'John Deere 5050D 4WD',
      horsepower: 50,
      hourlyRate: 850.0,
      dailyRate: 6500.0,
      location: 'Sahyadri CHC, Baramati',
      contactPhone: '9822088771',
      status: 'AVAILABLE',
      imageUrl: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800&auto=format&fit=crop',
    },
  });

  const leveler = await prisma.equipment.create({
    data: {
      providerUserId: providerUser.id,
      name: 'Precision Laser Land Leveler with Dual Transmitter',
      category: 'NO_TILL_PLANTER',
      makeModel: 'Spectra Precision Laser Leveler',
      horsepower: 55,
      hourlyRate: 1100.0,
      dailyRate: 8000.0,
      location: 'Sahyadri CHC, Baramati',
      contactPhone: '9822088771',
      status: 'AVAILABLE',
      imageUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=800&auto=format&fit=crop',
    },
  });

  await prisma.equipmentBooking.create({
    data: {
      equipmentId: tractor.id,
      farmerId: farmer1.id,
      startDate: new Date(),
      endDate: new Date(Date.now() + 86400000),
      totalHours: 8,
      totalAmount: 6800.0,
      status: 'ACCEPTED',
      deliveryAddress: 'Patil Krishi Farm, Survey 78/2, Malegaon Budruk',
      notes: 'Requires rotavator implement attached for field 02 bed preparation.',
    },
  });

  // 11. Crop Marketplace Listings
  console.log('[11/12] Creating crop marketplace listings...');
  await prisma.marketplaceListing.create({
    data: {
      farmerId: farmer1.id,
      cropName: 'Bhagwa Pomegranate (Grade A Export Quality)',
      variety: 'Bhagwa Ruby',
      quantityKg: 3500.0,
      pricePerKg: 145.0,
      minOrderKg: 100.0,
      organicCertified: false,
      location: 'Malegaon, Baramati',
      status: 'ACTIVE',
      imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=800&auto=format&fit=crop',
    },
  });

  await prisma.marketplaceListing.create({
    data: {
      farmerId: farmer3.id,
      cropName: 'Certified Organic Desi Soybean',
      variety: 'JS 335 (Certified NPOP)',
      quantityKg: 2200.0,
      pricePerKg: 62.0,
      minOrderKg: 50.0,
      organicCertified: true,
      location: 'Hol, Baramati',
      status: 'ACTIVE',
      imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800&auto=format&fit=crop',
    },
  });

  // 12. Kisan Credit Card Loan & Consent Audit Trail
  console.log('[12/12] Creating bank loan application & consent audit trail...');
  await prisma.loanApplication.create({
    data: {
      farmerId: farmer1.id,
      bankOrgId: bankOrg.id,
      applicationNo: 'MSCB-KCC-2026-8891',
      schemeName: 'Kisan Credit Card (KCC) Crop Working Capital',
      amountRequested: 350000.0,
      tenureMonths: 36,
      purpose: 'Working capital for sugarcane drip maintenance and organic bio-fertilizer inputs.',
      status: 'APPROVED',
      reviewedByUserId: bankOfficerUser.id,
      reviewNotes: 'Verified 14.5A ownership, Grade A soil score (82/100), and 3 seasons consistent harvest history.',
    },
  });

  await prisma.consent.create({
    data: {
      farmerId: farmer1.id,
      bankOrgId: bankOrg.id,
      purpose: 'Kisan Credit Card Underwriting & Land Record Verification',
      scopes: 'farm_ownership,soil_health,crop_history',
      status: 'ACTIVE',
    },
  });

  // Seed sample immutable audit logs
  await prisma.auditLog.create({
    data: {
      actorId: user1.id,
      actorUserId: user1.id,
      actorRole: 'FARMER',
      actorName: 'Anandarao Patil',
      action: 'FARM_CREATED',
      resource: 'FARM',
      resourceType: 'FARM',
      resourceId: farm1.id,
      purpose: 'Initial Farm Setup',
      details: 'Created farm Patil Krishi Farm (14.5 acres) in Malegaon, Baramati',
      metadata: JSON.stringify({ farmId: farm1.id, acres: 14.5 }),
    },
  });

  await prisma.auditLog.create({
    data: {
      actorId: bankOfficerUser.id,
      actorUserId: bankOfficerUser.id,
      actorRole: 'BANK_LOAN_OFFICER',
      actorName: 'Ramesh Kulkarni',
      actorOrganizationId: bankOrg.id,
      action: 'BANK_VIEWED_SOIL_DATA',
      resource: 'FARMER_DOSSIER',
      resourceType: 'SOIL_RECORD',
      resourceId: farmer1.id,
      purpose: 'KCC Credit Underwriting',
      details: 'Inspected soil health summary (Grade A, 82/100) under active consent',
      ipAddress: '192.168.1.104',
      metadata: JSON.stringify({ farmerId: farmer1.id, consentScopes: ['soil_health'] }),
    },
  });

  console.log('\n=============================================================');
  console.log('✅ SEEDING COMPLETE: 3 Farmers, 2 Farms, 5 Fields, 6 Crops,');
  console.log('   IoT Telemetry, Irrigation, Equipment, Listings, and Loans.');
  console.log('=============================================================\n');
}

main()
  .catch((e) => {
    console.error('Fatal seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
