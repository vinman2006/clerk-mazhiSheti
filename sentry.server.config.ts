/**
 * Mazhi Sheti — Sentry Server Configuration
 * Captures unhandled server exceptions, API errors, server action crashes, and database failures.
 */

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  environment: process.env.NODE_ENV || 'development',
  release: 'mazhi-sheti@1.0.0',

  // Performance sampling
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 1.0,

  // Privacy: Sanitize server event context
  beforeSend(event, hint) {
    if (!SENTRY_DSN) {
      return null;
    }

    // Strip raw authorization headers, cookies, and tokens
    if (event.request?.headers) {
      delete event.request.headers['authorization'];
      delete event.request.headers['cookie'];
      delete event.request.headers['x-clerk-auth-token'];
    }

    // Scrub request bodies
    if (event.request?.data && typeof event.request.data === 'string') {
      event.request.data = event.request.data.replace(
        /("password"|"otp"|"token"|"secret"|"apiKey"):\s*"[^"]+"/gi,
        '$1:"[REDACTED]"'
      );
    }

    return event;
  },
});
