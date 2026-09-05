import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

/**
 * Readiness Probe: /api/health/ready
 * Verifies that the database connection pool is active and ready to accept transactions.
 */
export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({
      status: 'ready',
      timestamp: new Date().toISOString(),
      dependencies: {
        database: 'ready',
      },
    }, { status: 200 });
  } catch {
    return NextResponse.json({
      status: 'not_ready',
      dependencies: {
        database: 'unavailable',
      },
    }, { status: 503 });
  }
}
