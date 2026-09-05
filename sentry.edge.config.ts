/**
 * Mazhi Sheti — Sentry Edge Configuration
 * Captures exceptions occurring within Edge middleware or edge API route handlers.
 */

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  environment: process.env.NODE_ENV || 'development',
  release: 'mazhi-sheti@1.0.0',
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  beforeSend(event) {
    if (!SENTRY_DSN) return null;
    return event;
  },
});
