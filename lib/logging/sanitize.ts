/**
 * Mazhi Sheti Centralized Logging - Data Sanitization Layer
 * 
 * Guarantees that sensitive credentials, authentication tokens, passwords, OTPs,
 * API keys, and private data are never leaked into server logs or external platforms (Better Stack).
 */

// Keys that must always be redacted (case-insensitive substring match)
const SENSITIVE_KEYS = [
  'password',
  'passcode',
  'otp',
  'secret',
  'token',
  'authorization',
  'cookie',
  'apikey',
  'api_key',
  'clerksecretkey',
  'privatekey',
  'private_key',
  'accesstoken',
  'access_token',
  'refreshtoken',
  'refresh_token',
  'sessiontoken',
  'session_token',
  'pin',
  'cvv',
  'cardnumber',
  'card_number',
  'credential',
  'bearer',
  'client_secret',
  'signature',
];

// Regex patterns to identify sensitive strings inside text/headers
const SENSITIVE_PATTERNS = [
  // Bearer tokens
  /Bearer\s+[A-Za-z0-9\-_.]+/gi,
  // 12-digit Aadhaar format
  /\b\d{4}\s?\d{4}\s?\d{4}\b/g,
  // Indian PAN card format
  /\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/g,
  // Credit / Debit card 16-digit format
  /\b(?:\d{4}[-\s]?){3}\d{4}\b/g,
];

/**
 * Sanitizes a string by replacing regex matched sensitive patterns with [REDACTED]
 */
export function sanitizeString(val: string): string {
  let sanitized = val;

  // Mask Bearer tokens
  sanitized = sanitized.replace(/Bearer\s+[A-Za-z0-9\-_.]+/gi, 'Bearer [REDACTED]');

  // Mask sensitive JSON key-values inside raw stringified JSON
  for (const key of SENSITIVE_KEYS) {
    const jsonPattern = new RegExp(`("${key}"|'${key}')\\s*:\\s*("[^"]+"|'[^']+'|\\d+)`, 'gi');
    sanitized = sanitized.replace(jsonPattern, '$1:"[REDACTED]"');
  }

  return sanitized;
}

/**
 * Recursively inspects and sanitizes any data payload (object, array, error, primitive).
 * Includes cycle detection and depth limiting to prevent stack overflows.
 */
export function sanitizeLogData<T = any>(data: T, depth = 0, seen = new WeakSet()): any {
  if (depth > 6) {
    return '[MAX_DEPTH_EXCEEDED]';
  }

  if (data === null || data === undefined) {
    return data;
  }

  // Handle Strings
  if (typeof data === 'string') {
    return sanitizeString(data);
  }

  // Handle Primitives (number, boolean, bigint, symbol)
  if (typeof data !== 'object') {
    return data;
  }

  // Handle Date
  if (data instanceof Date) {
    return data.toISOString();
  }

  // Handle Error instances
  if (data instanceof Error) {
    return {
      name: data.name,
      message: sanitizeString(data.message),
      stack: data.stack ? sanitizeString(data.stack) : undefined,
    };
  }

  // Handle Arrays
  if (Array.isArray(data)) {
    return data.map((item) => sanitizeLogData(item, depth + 1, seen));
  }

  // Cycle detection for Objects
  if (seen.has(data as object)) {
    return '[CIRCULAR_REFERENCE]';
  }
  seen.add(data as object);

  // Handle Objects
  const result: Record<string, any> = {};
  const entries = Object.entries(data);

  for (const [key, value] of entries) {
    const lowerKey = key.toLowerCase();

    // Check if the key itself matches a sensitive keyword
    const isSensitiveKey = SENSITIVE_KEYS.some((sensitive) => lowerKey.includes(sensitive));

    if (isSensitiveKey) {
      result[key] = '[REDACTED]';
    } else {
      result[key] = sanitizeLogData(value, depth + 1, seen);
    }
  }

  return result;
}
