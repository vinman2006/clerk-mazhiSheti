import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { requireUser } from '@/lib/auth/requireAuth';
import { logger } from '@/lib/logging/logger';

export async function GET(req: Request) {
  try {
    // 1. Ensure realistic equipment exists in database
    let equipment = await prisma.equipment.findMany({
      where: { status: 'AVAILABLE' },
      orderBy: { createdAt: 'desc' },
      take: 6,
    });

    if (equipment.length === 0) {
      // Seed minimal realistic tractors
      await prisma.equipment.createMany({
        data: [
          {
            providerUserId: 'system_chc_provider',
            name: 'Mahindra 575 DI Tractor',
            category: 'TRACTOR',
            makeModel: 'Mahindra 575 DI Bhoomiputra (47 HP)',
            horsepower: 47,
            hourlyRate: 350.0,
            dailyRate: 2500.0,
            location: 'Baramati MIDC (4.2 km away)',
            status: 'AVAILABLE',
            contactPhone: '9822455667',
            imageUrl: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800&auto=format&fit=crop',
          },
          {
            providerUserId: 'system_chc_provider',
            name: 'John Deere 5050D Tractor',
            category: 'TRACTOR',
            makeModel: 'John Deere 5050D Heavy Duty (50 HP)',
            horsepower: 50,
            hourlyRate: 450.0,
            dailyRate: 3200.0,
            location: 'Daund Phata, Baramati (6.8 km away)',
            status: 'AVAILABLE',
            contactPhone: '9822112233',
            imageUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=800&auto=format&fit=crop',
          },
          {
            providerUserId: 'system_chc_provider',
            name: 'Sonalika DI 745 III Tractor',
            category: 'TRACTOR',
            makeModel: 'Sonalika Sikander RX 47 (50 HP)',
            horsepower: 50,
            hourlyRate: 400.0,
            dailyRate: 2800.0,
            location: 'Indapur Rd, Baramati (5.1 km away)',
            status: 'AVAILABLE',
            contactPhone: '9822998877',
            imageUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?q=80&w=800&auto=format&fit=crop',
          },
        ],
      });

      equipment = await prisma.equipment.findMany({
        where: { status: 'AVAILABLE' },
        orderBy: { createdAt: 'desc' },
      });
    }

    // 2. Fetch authenticated user's real bookings if session active
    let userBookings: any[] = [];
    try {
      const ctx = await requireUser();
      const farmer = await prisma.farmer.findFirst({
        where: { clerkUserId: ctx.clerkUserId },
      });

      if (farmer) {
        userBookings = await prisma.equipmentBooking.findMany({
          where: { farmerId: farmer.id },
          include: { equipment: true },
          orderBy: { createdAt: 'desc' },
          take: 10,
        });
      }
    } catch {
      // Unauthenticated or public view - ignore
    }

    return NextResponse.json({
      success: true,
      equipment,
      bookings: userBookings,
    });
  } catch (error: any) {
    logger.error('Failed to fetch equipment list', error);
    return NextResponse.json(
      { error: 'FETCH_FAILED', message: error.message || 'Could not load equipment.' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const ctx = await requireUser();
    const body = await req.json();
    const { equipmentId, rentalDate, durationDays = 1 } = body;

    if (!equipmentId) {
      return NextResponse.json(
        { error: 'VALIDATION_FAILED', message: 'Equipment selection is required.' },
        { status: 400 }
      );
    }

    // 1. Authoritative lookup of equipment
    const equipment = await prisma.equipment.findUnique({
      where: { id: equipmentId },
    });

    if (!equipment) {
      return NextResponse.json(
        { error: 'NOT_FOUND', message: 'Equipment not found.' },
        { status: 404 }
      );
    }

    // 2. Authoritative server-calculated amount (never trust client)
    const days = Math.max(1, parseInt(durationDays) || 1);
    const authoritativeAmount = equipment.dailyRate * days;

    // 3. Resolve or create Farmer record linked to authenticated Clerk user
    let farmer = await prisma.farmer.findFirst({
      where: { clerkUserId: ctx.clerkUserId },
    });

    if (!farmer) {
      // Find or create DB user
      let user = await prisma.user.findUnique({
        where: { clerkUserId: ctx.clerkUserId },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            clerkUserId: ctx.clerkUserId,
            name: ctx.name || 'Sovereign Farmer',
            email: ctx.email,
            phone: ctx.phone || '9822000000',
            role: 'FARMER',
          },
        });
      }

      farmer = await prisma.farmer.create({
        data: {
          userId: user.id,
          clerkUserId: ctx.clerkUserId,
          name: user.name || 'Sovereign Farmer',
          phone: user.phone || '9822000000',
          email: user.email,
          village: 'Malegaon',
          taluka: 'Baramati',
          district: 'Pune',
        },
      });
    }

    // 4. Create EquipmentBooking in Neon PostgreSQL with PENDING status
    const startDate = rentalDate ? new Date(rentalDate) : new Date();
    const endDate = new Date(startDate.getTime() + days * 24 * 60 * 60 * 1000);

    const booking = await prisma.equipmentBooking.create({
      data: {
        equipmentId: equipment.id,
        farmerId: farmer.id,
        startDate,
        endDate,
        totalHours: days * 8,
        totalAmount: authoritativeAmount,
        status: 'PENDING',
        deliveryAddress: `${farmer.village}, Taluka ${farmer.taluka}, Dist. ${farmer.district}`,
        notes: `Tractor rental for ${days} day(s). Authoritative rate: ₹${equipment.dailyRate}/day.`,
      },
      include: {
        equipment: true,
      },
    });

    logger.info('Created new EquipmentBooking in Neon PostgreSQL', {
      bookingId: booking.id,
      equipmentName: equipment.name,
      totalAmount: authoritativeAmount,
      clerkUserId: ctx.clerkUserId,
    });

    return NextResponse.json({
      success: true,
      booking: {
        id: booking.id,
        equipmentId: equipment.id,
        equipmentName: equipment.name,
        rentalDate: startDate.toISOString().split('T')[0],
        durationDays: days,
        totalAmount: authoritativeAmount,
        status: booking.status,
      },
    });
  } catch (error: any) {
    logger.error('Failed to create equipment booking', error);
    return NextResponse.json(
      { error: 'BOOKING_FAILED', message: error.message || 'Could not reserve equipment.' },
      { status: error.message?.startsWith('UNAUTHORIZED') ? 401 : 500 }
    );
  }
}
