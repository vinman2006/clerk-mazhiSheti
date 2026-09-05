/**
 * Mazhi Sheti — Centralized Error Monitoring (Sentry + Better Stack Bridge)
 * 
 * Rules:
 * SENTRY = "Something went wrong" (Exceptions, stack traces, release & user correlation)
 * BETTER STACK = "What is happening in the system?" (Structured operational logs, latency, events)
 * AUDIT LOG = "Who did what, to which resource, and when?" (Database-persisted compliance records)
 */

import * as Sentry from '@sentry/nextjs';
import { logger } from '@/lib/logging/logger';
import { sanitizeLogData } from '@/lib/logging/sanitize';

export interface ErrorCaptureOptions {
  action?: string;
  module?: 'farmer' | 'soil' | 'crop' | 'irrigation' | 'device' | 'marketplace' | 'equipment' | 'finance' | 'ai' | 'auth' | 'admin' | 'system';
  route?: string;
  requestId?: string;
  userId?: string;
  farmerId?: string;
  farmId?: string;
  role?: string;
  organizationId?: string;
  tags?: Record<string, string>;
  extra?: Record<string, any>;
}

/**
 * Captures an exception, correlates it with request/user context,
 * reports to Sentry, and logs structured error details to Better Stack.
 */
export function captureAppError(error: unknown, options: ErrorCaptureOptions = {}): string {
  const reqId = options.requestId || `req_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const errObj = error instanceof Error ? error : new Error(typeof error === 'string' ? error : 'Unknown Application Error');

  // Sanitize all extra context before passing to monitoring platforms
  const sanitizedExtra = sanitizeLogData({
    action: options.action || 'unknown.action',
    route: options.route,
    farmerId: options.farmerId,
    farmId: options.farmId,
    requestId: reqId,
    environment: process.env.NODE_ENV || 'development',
    ...(options.extra || {}),
  });

  // 1. SENTRY ERROR CAPTURE
  Sentry.withScope((scope) => {
    // Set Safe User Context (No PII, passwords, OTPs, or financial records)
    if (options.userId) {
      scope.setUser({
        id: options.userId,
        role: options.role,
        organizationId: options.organizationId,
      } as any);
    }

    // Set Low-Cardinality Structured Tags
    if (options.module) scope.setTag('module', options.module);
    if (options.role) scope.setTag('role', options.role);
    if (options.route) scope.setTag('route', options.route);
    scope.setTag('environment', process.env.NODE_ENV || 'development');
    scope.setTag('requestId', reqId);

    if (options.tags) {
      for (const [key, val] of Object.entries(options.tags)) {
        scope.setTag(key, val);
      }
    }

    // Set Sanitized Context
    scope.setContext('operation', sanitizedExtra);

    Sentry.captureException(errObj);
  });

  // 2. BETTER STACK ERROR LOGGING
  logger.error(errObj.message, {
    action: options.action || 'system.error',
    module: options.module,
    route: options.route,
    requestId: reqId,
    userId: options.userId,
    farmerId: options.farmerId,
    farmId: options.farmId,
    errorName: errObj.name,
    errorMessage: errObj.message,
    ...sanitizedExtra,
  }, errObj);

  return reqId;
}

/**
 * Creates a safe user-facing API response object that includes correlation requestId
 * while preventing database or infrastructure leakages.
 */
export function formatSafeApiError(error: unknown, options: ErrorCaptureOptions = {}) {
  const reqId = captureAppError(error, options);

  let userFriendlyMessage = 'An unexpected error occurred while processing your request. Please try again.';

  if (error instanceof Error) {
    // Whitelist clean validation and authorization messages
    if (error.message.startsWith('UNAUTHORIZED')) {
      userFriendlyMessage = 'Authentication required. Please sign in to continue.';
    } else if (error.message.startsWith('FORBIDDEN')) {
      userFriendlyMessage = error.message;
    } else if (error.message.startsWith('VALIDATION_FAILED')) {
      userFriendlyMessage = 'The submitted information is incomplete or invalid.';
    } else if (error.message.startsWith('CONSENT_REQUIRED')) {
      userFriendlyMessage = 'Active farmer consent is required to access this data.';
    }
  }

  return {
    success: false,
    error: userFriendlyMessage,
    requestId: reqId,
  };
}
