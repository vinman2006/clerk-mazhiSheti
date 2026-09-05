import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Liveness Probe: /api/health/live
 * Verifies that the Next.js application process is running and able to handle HTTP traffic.
 */
export async function GET() {
  return NextResponse.json({
    status: 'alive',
    timestamp: new Date().toISOString(),
  }, { status: 200 });
}
