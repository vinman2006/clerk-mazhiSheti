/**
 * Mazhi Sheti — Centralized Database Client
 * Primary Database: Neon PostgreSQL
 * ORM: Prisma Client
 * 
 * Guarantees:
 * 1. Server-side only execution (guards against client-side bundling/leakage)
 * 2. Neon-compatible connection pooling with global singleton pattern in development
 * 3. Query error logging to Better Stack and Sentry
 */

import { PrismaClient } from '@prisma/client';
import { logger } from '@/lib/logging/logger';
import { captureAppError } from '@/lib/errors/sentry';

// Server-only runtime assertion
if (typeof window !== 'undefined') {
  throw new Error('SECURITY VIOLATION: Prisma database client cannot be imported or executed in the browser.');
}

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: [
      { emit: 'event', level: 'error' },
      { emit: 'event', level: 'warn' },
    ],
  });

// Attach event listeners for database observability
if (!globalForPrisma.prisma) {
  // @ts-ignore Prisma event emitter types
  prisma.$on('error', (e: any) => {
    logger.error('Neon PostgreSQL Error', {
      target: e.target,
      timestamp: e.timestamp,
      message: e.message,
      action: 'db.error',
    });
    captureAppError(new Error(e.message), {
      action: 'db.query_error',
      module: 'system',
      extra: { target: e.target },
    });
  });

  // @ts-ignore Prisma event emitter types
  prisma.$on('warn', (e: any) => {
    logger.warn('Neon PostgreSQL Warning', {
      target: e.target,
      message: e.message,
      action: 'db.warning',
    });
  });
}

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
