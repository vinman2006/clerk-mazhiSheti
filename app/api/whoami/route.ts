import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/db/prisma';
import { getRolePortalPath, toPrimaryRole } from '@/lib/auth/roles';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ authenticated: false, error: 'Unauthorized' }, { status: 401 });
    }

    const user = await currentUser();
    let dbUser = await prisma.user.findUnique({
      where: { clerkUserId: userId },
      include: {
        farmerProfile: true,
        organizationMembers: {
          include: { organization: true },
        },
      },
    });

    if (!dbUser && user) {
      try {
        const primaryEmail = user.emailAddresses?.[0]?.emailAddress;
        const primaryPhone = user.phoneNumbers?.[0]?.phoneNumber;
        const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ') || 'Farmer User';

        dbUser = await prisma.user.create({
          data: {
            clerkUserId: userId,
            role: 'FARMER',
            email: primaryEmail,
            phone: primaryPhone,
            name: fullName,
            status: 'ACTIVE',
          },
          include: {
            farmerProfile: true,
            organizationMembers: {
              include: { organization: true },
            },
          },
        });
      } catch {
        dbUser = await prisma.user.findUnique({
          where: { clerkUserId: userId },
          include: {
            farmerProfile: true,
            organizationMembers: {
              include: { organization: true },
            },
          },
        });
      }
    }

    if (!dbUser) {
      return NextResponse.json({ authenticated: false, error: 'User record not found' }, { status: 404 });
    }

    const primaryRole = toPrimaryRole(dbUser.role);
    const portalPath = getRolePortalPath(dbUser.role);

    return NextResponse.json({
      authenticated: true,
      clerkUserId: userId,
      email: user?.emailAddresses?.[0]?.emailAddress || dbUser.email,
      name: user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : dbUser.name,
      role: dbUser.role,
      primaryRole,
      status: dbUser.status,
      portalPath,
      farmer: dbUser.farmerProfile,
      organizations: dbUser.organizationMembers?.map((m) => ({
        id: m.organization.id,
        name: m.organization.name,
        role: m.role,
      })) || [],
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
