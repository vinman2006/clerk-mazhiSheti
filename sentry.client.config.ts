/**
 * Mazhi Sheti — Sentry Client Configuration
 * Captures unhandled client exceptions, React rendering errors, and browser performance.
 */

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  // Distinguish environments clearly
  environment: process.env.NEXT_PUBLIC_APP_ENV || process.env.NODE_ENV || 'development',
  // Release tracking for version tracing
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'mazhi-sheti@1.0.0',

  // Performance sampling: lower in production for cost control, higher in dev
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Session replay sampling
  replaysSessionSampleRate: 0.05,
  replaysOnErrorSampleRate: 1.0,

  // Privacy: Sanitize event data before dispatching
  beforeSend(event, hint) {
    if (!SENTRY_DSN) {
      // Graceful fallback when Sentry is not configured in local environment
      return null;
    }

    // Sanitize request URL query parameters
    if (event.request?.url) {
      event.request.url = event.request.url.replace(
        /([?&](password|otp|token|secret|code|key)=)[^&]+/gi,
        '$1[REDACTED]'
      );
    }

    // Sanitize user context (Never leak sensitive PII or passwords)
    if (event.user) {
      delete (event.user as any).password;
      delete (event.user as any).otp;
      delete (event.user as any).token;
      delete (event.user as any).credentials;
    }

    return event;
  },
});
