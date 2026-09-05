/**
 * Mazhi Sheti Centralized Application Logger
 * 
 * Official Centralized Platform: Better Stack
 * Integrates:
 * - Structured JSON logging with DEBUG, INFO, WARN, ERROR levels
 * - Automated request context resolution (requestId, userId, org, route, duration)
 * - Strict recursive data sanitization (credential, token, password redaction)
 * - Better Stack HTTP Ingestion transport (non-blocking, batched)
 * - Extensible Error Monitoring hook (Sentry ready)
 */

import { sanitizeLogData } from './sanitize';
import { getLogContext } from './context';

export type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

export interface StructuredLogPayload {
  level: LogLevel;
  message: string;
  timestamp: string;
  context: Record<string, any>;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

class BetterStackTransport {
  private endpoint = 'https://in.logs.betterstack.com';
  private sourceToken = process.env.BETTER_STACK_SOURCE_TOKEN || process.env.LOGTAIL_SOURCE_TOKEN;
  private queue: any[] = [];
  private flushTimer: NodeJS.Timeout | null = null;

  constructor() {
    // Periodically flush buffer every 2 seconds if logs are queued
    if (typeof window === 'undefined') {
      this.flushTimer = setInterval(() => {
        if (this.queue.length > 0) {
          this.flush();
        }
      }, 2000);
      if (this.flushTimer.unref) {
        this.flushTimer.unref();
      }
    }
  }

  public enqueue(payload: StructuredLogPayload) {
    // If no token is provided, Better Stack transport gracefully relies on local structured output
    if (!this.sourceToken) {
      return;
    }

    this.queue.push({
      dt: payload.timestamp,
      level: payload.level.toLowerCase(),
      message: payload.message,
      ...payload.context,
      error: payload.error,
    });

    if (this.queue.length >= 10) {
      this.flush();
    }
  }

  public async flush() {
    if (this.queue.length === 0 || !this.sourceToken) return;

    const batch = [...this.queue];
    this.queue = [];

    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.sourceToken}`,
        },
        body: JSON.stringify(batch),
      });
    } catch (err) {
      // Avoid recursive crash if remote logging fails
      if (process.env.NODE_ENV !== 'production') {
        console.error('[BetterStack Transport Error]: Failed to ship logs', err);
      }
    }
  }
}

class Logger {
  private betterStack = new BetterStackTransport();

  private log(level: LogLevel, message: string, metadata?: Record<string, any>, errorObj?: Error) {
    const timestamp = new Date().toISOString();
    const activeContext = getLogContext();

    // Deep sanitize both context and metadata
    const rawContext = {
      ...activeContext,
      ...(metadata || {}),
    };

    const sanitizedContext = sanitizeLogData(rawContext);
    const sanitizedError = errorObj ? sanitizeLogData(errorObj) : undefined;

    const structuredPayload: StructuredLogPayload = {
      level,
      message,
      timestamp,
      context: sanitizedContext,
      error: sanitizedError,
    };

    // 1. Better Stack Centralized Shipping
    this.betterStack.enqueue(structuredPayload);

    // 2. Optional Sentry Error Monitoring Hook
    if ((level === 'ERROR' || level === 'WARN') && process.env.SENTRY_DSN) {
      this.forwardToErrorMonitoring(structuredPayload);
    }

    // 3. Local Structured Terminal Output (Readable in development & server console)
    this.outputToConsole(structuredPayload);
  }

  private outputToConsole(payload: StructuredLogPayload) {
    const { level, message, timestamp, context, error } = payload;
    const prefix = `[${timestamp}] [${level}] [MazhiSheti]:`;

    const contextSummary = Object.keys(context).length > 0 ? JSON.stringify(context) : '';

    switch (level) {
      case 'DEBUG':
        if (process.env.LOG_LEVEL === 'debug' || process.env.NODE_ENV === 'development') {
          console.debug(prefix, message, contextSummary);
        }
        break;
      case 'INFO':
        console.info(prefix, message, contextSummary);
        break;
      case 'WARN':
        console.warn(prefix, message, contextSummary, error || '');
        break;
      case 'ERROR':
        console.error(prefix, message, contextSummary, error || '');
        break;
    }
  }

  private forwardToErrorMonitoring(payload: StructuredLogPayload) {
    // Hook for Sentry or OpenTelemetry when initialized
    try {
      const globalAny: any = globalThis;
      if (globalAny.Sentry && typeof globalAny.Sentry.captureException === 'function') {
        if (payload.error) {
          globalAny.Sentry.captureException(payload.error, { extra: payload.context });
        } else {
          globalAny.Sentry.captureMessage(payload.message, payload.level.toLowerCase());
        }
      }
    } catch {
      // Ignore monitoring forwarding errors
    }
  }

  public debug(message: string, metadata?: Record<string, any>) {
    this.log('DEBUG', message, metadata);
  }

  public info(message: string, metadata?: Record<string, any>) {
    this.log('INFO', message, metadata);
  }

  public warn(message: string, metadata?: Record<string, any>, error?: Error) {
    this.log('WARN', message, metadata, error);
  }

  public error(message: string, metadata?: Record<string, any>, error?: Error) {
    this.log('ERROR', message, metadata, error);
  }
}

export const logger = new Logger();
export default logger;
