/**
 * Mazhi Sheti Immutable Audit Logging & Better Stack Dual-Dispatch
 * 
 * For critical security and business events:
 * 1. Persists the append-only audit event in the application database (Prisma).
 * 2. Emits a sanitized application log to Better Stack.
 * 3. Guarantees that users cannot edit or delete audit logs.
 */

import prisma from '@/lib/db/prisma';
import { logger } from '@/lib/logging/logger';
import { sanitizeLogData } from '@/lib/logging/sanitize';

export interface AuditLogEntry {
  actorId: string;
  actorUserId?: string;
  actorRole: string;
  actorName?: string;
  actorOrganizationId?: string;
  action: string;
  resource: string;
  resourceType?: string;
  resourceId?: string;
  purpose?: string;
  details?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
}

export async function createAuditLog(entry: AuditLogEntry): Promise<void> {
  // 1. Sanitize all incoming metadata and details
  const sanitizedMeta = entry.metadata ? sanitizeLogData(entry.metadata) : undefined;
  const sanitizedDetails = entry.details ? sanitizeLogData(entry.details) : undefined;

  try {
    // 2. Persist to authoritative database
    await prisma.auditLog.create({
      data: {
        actorId: entry.actorId,
        actorUserId: entry.actorUserId || entry.actorId,
        actorRole: entry.actorRole,
        actorName: entry.actorName,
        actorOrganizationId: entry.actorOrganizationId,
        action: entry.action,
        resource: entry.resource,
        resourceType: entry.resourceType || entry.resource,
        resourceId: entry.resourceId,
        purpose: entry.purpose,
        details: typeof sanitizedDetails === 'string' ? sanitizedDetails : JSON.stringify(sanitizedDetails),
        ipAddress: entry.ipAddress,
        userAgent: entry.userAgent,
        metadata: sanitizedMeta ? JSON.stringify(sanitizedMeta) : undefined,
      },
    });

    // 3. Send sanitized audit log stream to Better Stack
    logger.info(`AUDIT: ${entry.action}`, {
      auditAction: entry.action,
      actorId: entry.actorId,
      actorRole: entry.actorRole,
      actorName: entry.actorName,
      actorOrganizationId: entry.actorOrganizationId,
      resource: entry.resource,
      resourceId: entry.resourceId,
      purpose: entry.purpose,
      details: sanitizedDetails,
      ipAddress: entry.ipAddress,
      category: 'AUDIT_TRAIL',
    });
  } catch (error: any) {
    // Never crash the primary business transaction if audit writing fails, but log severe error
    logger.error('Failed to write authoritative audit log to database', {
      action: entry.action,
      resource: entry.resource,
      resourceId: entry.resourceId,
      actorId: entry.actorId,
    }, error);
  }
}
