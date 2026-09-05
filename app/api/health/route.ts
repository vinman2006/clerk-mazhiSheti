import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

/**
 * Better Stack Uptime Monitoring Endpoint: /api/health
 * Returns HTTP 200 OK when application and database are operational.
 * Does NOT leak database passwords, environment secrets, or stack traces.
 */
export async function GET() {
  const startTime = Date.now();

  try {
    // Light ping to database to verify connectivity
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      status: 'healthy',
      platform: 'Mazhi Sheti Operating System',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      latencyMs: Date.now() - startTime,
      services: {
        database: 'connected',
        auth: 'operational',
      },
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      status: 'degraded',
      platform: 'Mazhi Sheti Operating System',
      timestamp: new Date().toISOString(),
      services: {
        database: 'unreachable',
      },
    }, { status: 503 });
  }
}
