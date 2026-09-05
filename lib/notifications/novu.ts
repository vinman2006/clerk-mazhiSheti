import { logger } from '@/lib/logging/logger';

interface TriggerNotificationParams {
  subscriberId: string; // Clerk User ID
  name?: string; // workflow identifier
  title: string;
  body: string;
  payload?: Record<string, any>;
}

/**
 * Triggers a real Novu notification for an authenticated user.
 * Communicates with Novu Cloud API using NOVU_SECRET_KEY / NOVU_API_KEY.
 * Gracefully degrades if credentials are not yet configured.
 */
export async function triggerNovuNotification({
  subscriberId,
  name = 'tractor-booking-confirmed',
  title,
  body,
  payload = {},
}: TriggerNotificationParams): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.NOVU_SECRET_KEY || process.env.NOVU_API_KEY;

  if (!apiKey) {
    logger.info('Novu trigger skipped: NOVU_SECRET_KEY not set. Stored in Neon PostgreSQL Notification table.', {
      subscriberId,
      title,
    });
    return { success: false, error: 'NOVU_SECRET_KEY_NOT_CONFIGURED' };
  }

  try {
    const res = await fetch('https://api.novu.co/v1/events/trigger', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `ApiKey ${apiKey}`,
      },
      body: JSON.stringify({
        name,
        to: {
          subscriberId,
        },
        payload: {
          title,
          body,
          ...payload,
        },
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      logger.warn('Novu trigger API returned error status', { status: res.status, data });
      return { success: false, error: data.message || 'NOVU_TRIGGER_FAILED' };
    }

    logger.info('Novu notification triggered successfully via API', { subscriberId, title });
    return { success: true };
  } catch (err: any) {
    logger.error('Failed to trigger Novu notification', err);
    return { success: false, error: err.message };
  }
}
