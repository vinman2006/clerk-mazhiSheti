import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth/requireAuth';
import prisma from '@/lib/db/prisma';
import { farmerOnboardingSchema } from '@/lib/validation/schemas';
import { createAuditLog } from '@/lib/audit/auditLogger';
import { logger } from '@/lib/logging/logger';

export async function POST(req: Request) {
  try {
    const ctx = await requireUser();
    const body = await req.json();

    // Validate payload against Zod schema
    const parsed = farmerOnboardingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'VALIDATION_FAILED', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Run in transaction to guarantee complete entity graph creation
    const result = await prisma.$transaction(async (tx) => {
      // 1. Update User basic info
      await tx.user.update({
        where: { id: ctx.userId },
        data: {
          name: data.name,
          phone: data.phone,
          email: data.email || undefined,
        },
      });

      // 2. Create Farmer profile
      const farmer = await tx.farmer.upsert({
        where: { userId: ctx.userId },
        update: {
          name: data.name,
          phone: data.phone,
          email: data.email || undefined,
          state: data.state,
          district: data.district,
          taluka: data.taluka,
          village: data.village,
          pincode: data.pincode || undefined,
          totalLandAcres: data.totalLandAcres,
          ownershipType: data.ownershipType,
          experienceYears: data.experienceYears,
          farmingMethod: data.farmingMethod,
          irrigationType: data.irrigationType,
        },
        create: {
          userId: ctx.userId,
          clerkUserId: ctx.clerkUserId,
          name: data.name,
          phone: data.phone,
          email: data.email || undefined,
          state: data.state,
          district: data.district,
          taluka: data.taluka,
          village: data.village,
          pincode: data.pincode || undefined,
          totalLandAcres: data.totalLandAcres,
          ownershipType: data.ownershipType,
          experienceYears: data.experienceYears,
          farmingMethod: data.farmingMethod,
          irrigationType: data.irrigationType,
          soilHealthScore: 70.0,
          organicPercentage: data.farmingMethod === 'ORGANIC' ? 100 : data.farmingMethod === 'TRANSITIONAL' ? 30 : 10,
          transitionStage: data.farmingMethod === 'ORGANIC' ? 6 : data.farmingMethod === 'TRANSITIONAL' ? 3 : 1,
        },
      });

      // 3. Create First Farm
      const farm = await tx.farm.create({
        data: {
          farmerId: farmer.id,
          name: data.initialFarmName,
          totalAreaAcres: data.totalLandAcres,
          location: `${data.village}, ${data.taluka}, ${data.district}, ${data.state}`,
        },
      });

      // 4. Create Initial Field 01
      const initialSoilType = data.district.toLowerCase().includes('pune') || data.district.toLowerCase().includes('solapur') || data.district.toLowerCase().includes('satara')
        ? 'Black Cotton Soil'
        : 'Red Loam';

      const field = await tx.field.create({
        data: {
          farmId: farm.id,
          name: 'Field 01 — Main Plot',
          areaAcres: data.totalLandAcres,
          soilType: initialSoilType,
          currentCrop: 'Seasonal Crop',
          isNoTill: data.farmingMethod === 'NO_TILL',
          irrigationZone: 'Zone A',
          status: 'ACTIVE',
        },
      });

      // 5. Initialize Baseline Soil Reading
      await tx.soilRecord.create({
        data: {
          fieldId: field.id,
          source: 'MANUAL_ENTRY',
          ph: 6.8,
          moisture: 38.0,
          temperature: 25.0,
          nitrogen: 215.0,
          phosphorus: 18.0,
          potassium: 190.0,
          organicCarbon: 0.65,
          healthScore: 70.0,
          recommendation: 'Baseline farm profile created. Connect soil sensors or import lab soil test for precision advisory.',
        },
      });

      // 6. Initialize 6-Stage Organic Transition Plan
      await tx.organicPlan.create({
        data: {
          farmerId: farmer.id,
          currentStage: data.farmingMethod === 'ORGANIC' ? 6 : 1,
          overallScore: data.farmingMethod === 'ORGANIC' ? 90.0 : 40.0,
          steps: {
            create: [
              { stageNumber: 1, title: 'Soil Baseline Assessment', description: 'Establish baseline N-P-K, organic carbon, and pH across all field zones.', status: 'COMPLETED' },
              { stageNumber: 2, title: 'Reduce Chemical Dependency by 40%', description: 'Replace synthetic fertilizers with biological nitrogen fixers and green manure.', status: 'IN_PROGRESS' },
              { stageNumber: 3, title: 'Introduce Organic Matter & Bio-Inputs', description: 'Apply farmyard manure (FYM), jeevamrut, and vermicompost.', status: 'PENDING' },
              { stageNumber: 4, title: 'Biological Soil & Pest Management', description: 'Use beneficial nematodes, Trichoderma, and pheromone traps.', status: 'PENDING' },
              { stageNumber: 5, title: 'Reduced Tillage & Cover Cropping', description: 'Adopt no-till planting to preserve fungal mycorrhizal networks.', status: 'PENDING' },
              { stageNumber: 6, title: 'Certified Organic Farm Status', description: 'Undergo organic standards audit and chemical residue clearance.', status: 'PENDING' },
            ],
          },
        },
      });

      return { farmerId: farmer.id, farmId: farm.id };
    });

    // 7. Audit log
    await createAuditLog({
      actorId: ctx.userId,
      actorRole: ctx.role,
      actorName: data.name,
      action: 'FARMER_ONBOARDING_COMPLETED',
      resource: 'FARMER',
      resourceId: result.farmerId,
      details: `Farmer ${data.name} completed progressive onboarding with ${data.totalLandAcres} acres in ${data.village}, ${data.district}`,
    });

    logger.info('Farmer onboarding completed', {
      userId: ctx.userId,
      farmerId: result.farmerId,
      farmId: result.farmId,
      action: 'farmer.onboard',
      acres: data.totalLandAcres,
      village: data.village,
    });

    return NextResponse.json({
      success: true,
      message: 'Onboarding completed successfully',
      data: result,
    });
  } catch (error: any) {
    logger.error('Failed to complete farmer onboarding', {
      action: 'farmer.onboard',
      error: error.message,
    }, error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred during onboarding.' },
      { status: error.message?.startsWith('UNAUTHORIZED') ? 401 : 500 }
    );
  }
}
