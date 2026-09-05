/**
 * Mazhi Sheti Centralized Logging - Request Context Carrier
 * 
 * Uses Node.js AsyncLocalStorage to automatically attach request context
 * (requestId, userId, organizationId, role, route, method, duration, environment)
 * to any log emitted during the lifecycle of an async server operation.
 */

import { AsyncLocalStorage } from 'async_hooks';

export interface LogContext {
  requestId?: string;
  userId?: string;
  farmerId?: string;
  organizationId?: string;
  role?: string;
  route?: string;
  method?: string;
  status?: number;
  durationMs?: number;
  environment?: string;
  ipAddress?: string;
  userAgent?: string;
  [key: string]: any;
}

const asyncLocalStorage = new AsyncLocalStorage<LogContext>();

/**
 * Executes a function within an active log context scope.
 */
export function runWithLogContext<T>(context: LogContext, fn: () => T): T {
  const merged: LogContext = {
    environment: process.env.NODE_ENV || 'development',
    requestId: context.requestId || `req_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
    ...context,
  };
  return asyncLocalStorage.run(merged, fn);
}

/**
 * Retrieves the currently active log context (if within a runWithLogContext scope).
 */
export function getLogContext(): LogContext {
  return asyncLocalStorage.getStore() || {
    environment: process.env.NODE_ENV || 'development',
  };
}

/**
 * Returns a new object merging existing store context with provided metadata.
 */
export function mergeLogContext(extra?: Record<string, any>): Record<string, any> {
  const current = getLogContext();
  return {
    ...current,
    ...(extra || {}),
  };
}
