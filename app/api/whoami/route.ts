import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ authenticated: false, error: 'Unauthorized' }, { status: 401 });
    }

    const user = await currentUser();
    const dbUser = await prisma.user.findUnique({
      where: { clerkUserId: userId },
      include: {
        farmerProfile: true,
        organizationMembers: {
          include: { organization: true },
        },
      },
    });

    return NextResponse.json({
      authenticated: true,
      clerkUserId: userId,
      email: user?.emailAddresses?.[0]?.emailAddress || dbUser?.email,
      name: user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : dbUser?.name,
      role: dbUser?.role || 'FARMER',
      farmer: dbUser?.farmerProfile,
      organizations: dbUser?.organizationMembers?.map((m) => ({
        id: m.organization.id,
        name: m.organization.name,
        role: m.role,
      })) || [],
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
