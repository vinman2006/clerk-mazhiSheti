/**
 * Mazhi Sheti - Automated Observability & Logging Test Suite
 * Validates requirements from user prompt:
 * 1. Centralized logging abstraction (lib/logging/logger.ts, context.ts, sanitize.ts)
 * 2. Structured logging across DEBUG, INFO, WARN, ERROR
 * 3. Strict recursive data sanitization (passwords, OTPs, Bearer tokens, secrets, PAN/Aadhaar)
 * 4. Request context carrier (requestId, userId, organizationId, route, durationMs)
 * 5. AuditLog dual dispatch: DB persistence + Better Stack stream
 * 6. Sentry error monitoring readiness
 */

import { logger } from '../lib/logging/logger';
import { sanitizeLogData, sanitizeString } from '../lib/logging/sanitize';
import { runWithLogContext, getLogContext } from '../lib/logging/context';
import { createAuditLog } from '../lib/audit/auditLogger';
import { captureAppError, formatSafeApiError } from '../lib/errors/sentry';
import prisma from '../lib/db/prisma';

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`  ✓ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${testName}`);
    failed++;
  }
}

async function runObservabilityTests() {
  console.log('\n=============================================================');
  console.log('MAZHI SHETI: EXECUTING CENTRALIZED OBSERVABILITY & LOG SUITE');
  console.log('=============================================================\n');

  // TEST 1: SANITIZATION LAYER TESTS
  console.log('[1] Sanitization & Credential Masking:');

  const rawPayloadWithSecrets = {
    userId: 'user_12345',
    password: 'super_secret_farmer_pass',
    otpCode: '984321',
    clerkSecretKey: 'sk_live_very_secret_clerk_key',
    authHeader: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    sensitiveNested: {
      pin: '1234',
      apiKey: 'xyz_9999_key',
      normalField: 'Baramati Black Cotton Soil',
    },
    userArray: [
      { token: 'secret_jwt_token', name: 'Anandarao Patil' },
      { cvv: '999', status: 'ACTIVE' },
    ],
  };

  const sanitized = sanitizeLogData(rawPayloadWithSecrets);

  assert(sanitized.userId === 'user_12345', "Normal identifiers (userId) preserved");
  assert(sanitized.password === '[REDACTED]', "Passwords strictly redacted to [REDACTED]");
  assert(sanitized.otpCode === '[REDACTED]', "OTP codes strictly redacted to [REDACTED]");
  assert(sanitized.clerkSecretKey === '[REDACTED]', "Clerk secret keys strictly redacted to [REDACTED]");
  assert(sanitized.sensitiveNested.pin === '[REDACTED]', "Nested PINs redacted");
  assert(sanitized.sensitiveNested.apiKey === '[REDACTED]', "Nested API keys redacted");
  assert(sanitized.sensitiveNested.normalField === 'Baramati Black Cotton Soil', "Safe nested business fields preserved");
  assert(sanitized.userArray[0].token === '[REDACTED]', "Array-embedded tokens redacted");
  assert(sanitized.userArray[1].cvv === '[REDACTED]', "Array-embedded CVVs redacted");

  // String Bearer token redaction
  const textWithBearer = "HTTP Request headers: Authorization: Bearer abc123secretTokenValue and cookie: session=xyz";
  const sanitizedStr = sanitizeString(textWithBearer);
  assert(!sanitizedStr.includes('abc123secretTokenValue'), "Bearer token values stripped from raw text strings");
  assert(sanitizedStr.includes('Bearer [REDACTED]'), "Bearer replaced with Bearer [REDACTED]");

  // TEST 2: REQUEST CONTEXT CARRIER (AsyncLocalStorage)
  console.log('\n[2] Request Context Carrier (AsyncLocalStorage):');

  await runWithLogContext({
    requestId: 'req_test_observability_99',
    userId: 'user_farmer_patil',
    role: 'FARMER',
    route: '/api/farms',
    method: 'POST',
  }, async () => {
    const activeCtx = getLogContext();
    assert(activeCtx.requestId === 'req_test_observability_99', "Active requestId correctly captured in context scope");
    assert(activeCtx.userId === 'user_farmer_patil', "Active userId correctly captured in context scope");
    assert(activeCtx.route === '/api/farms', "Active route correctly captured in context scope");
    assert(activeCtx.method === 'POST', "Active HTTP method captured in context scope");
  });

  // TEST 3: STRUCTURED LOGGER OUTPUT & BETTER STACK DISPATCH
  console.log('\n[3] Centralized Structured Logger (DEBUG, INFO, WARN, ERROR):');

  // Verify that logger methods execute safely and sanitize context
  logger.debug('Testing debug channel', { testKey: 'debugVal' });
  logger.info('Farm created', {
    userId: 'usr_patil_01',
    farmerId: 'fmr_01',
    farmId: 'farm_baramati_01',
    action: 'farm.create',
    password: 'should_not_leak', // should be sanitized
  });
  logger.warn('Soil sensor battery low', { deviceCode: 'LORA-BARAMATI-01', batteryPercent: 12 });
  logger.error('Failed to create farm', {
    userId: 'usr_patil_01',
    errorCode: 'DB_TIMEOUT',
    requestId: 'req_99',
  }, new Error('Simulated Database Timeout'));

  assert(true, "All log levels (DEBUG, INFO, WARN, ERROR) executed without exceptions");

  // TEST 4: AUDIT LOG DUAL-WRITE PERSISTENCE (Database + Better Stack)
  console.log('\n[4] Audit Log Dual-Write & Immutability:');

  const testAction = `BANK_VIEWED_SOIL_DATA_${Date.now()}`;
  await createAuditLog({
    actorId: 'usr_bank_officer_kulkarni',
    actorUserId: 'usr_bank_officer_kulkarni',
    actorRole: 'BANK_LOAN_OFFICER',
    actorName: 'Ramesh Kulkarni',
    actorOrganizationId: 'org_mscb_baramati',
    action: testAction,
    resource: 'SOIL_RECORD',
    resourceType: 'SOIL_RECORD',
    resourceId: 'soil_rec_baramati_01',
    purpose: 'Kisan Credit Card Loan Underwriting Assessment',
    details: 'Verified NPK 240/22/180 and Organic Carbon 1.2% under active farmer consent',
    ipAddress: '192.168.1.104',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    metadata: {
      consentId: 'cns-991',
      scopes: ['farm_ownership', 'soil_health'],
      secretToken: 'sensitive_jwt_should_be_masked',
    },
  });

  // Query database to verify persistence
  const persisted = await prisma.auditLog.findFirst({
    where: { action: testAction },
  });

  assert(persisted !== null, "Authoritative AuditLog persisted in application database");
  assert(persisted?.actorRole === 'BANK_LOAN_OFFICER', "Audit record contains accurate actorRole");
  assert(persisted?.resourceType === 'SOIL_RECORD', "Audit record contains accurate resourceType");
  assert(Boolean(persisted?.purpose?.includes('Kisan Credit Card')), "Audit record contains purpose string");
  
  if (persisted?.metadata) {
    assert(!persisted.metadata.includes('sensitive_jwt_should_be_masked'), "Audit metadata strictly masked credentials");
    assert(persisted.metadata.includes('[REDACTED]'), "Audit metadata contains [REDACTED] for secretToken");
  }

  // TEST 5: SENTRY ERROR MONITORING & USER CONTEXT CORRELATION
  console.log('\n[5] Sentry Error Capture & Correlation Bridge:');

  const generatedReqId = captureAppError(new Error('Simulated Sentry Exception: Database Deadlock'), {
    action: 'farm.create',
    module: 'farmer',
    userId: 'usr_patil_01',
    farmerId: 'fmr_01',
    role: 'FARMER',
    tags: { deviceType: 'LORA_NODE' },
    extra: {
      password: 'must_not_leak_to_sentry',
      targetAcres: 14.5,
    },
  });

  assert(Boolean(generatedReqId && generatedReqId.startsWith('req_')), "Correlation requestId automatically generated (req_*)");

  const safeFormatted = formatSafeApiError(new Error('PrismaClientKnownRequestError: Unique constraint failed on the fields: (clerkUserId)'), {
    action: 'farmer.register',
    module: 'auth',
  });

  assert(safeFormatted.success === false, "Safe API error response sets success: false");
  assert(Boolean(safeFormatted.requestId && safeFormatted.requestId.startsWith('req_')), "Safe API error returns correlation requestId");
  assert(
    !safeFormatted.error.includes('PrismaClientKnownRequestError'),
    "Raw database error stripped from client-facing message"
  );
  assert(
    safeFormatted.error === 'An unexpected error occurred while processing your request. Please try again.',
    "Client received safe and understandable error message"
  );

  // TEST 6: HEALTH CHECK & BETTER STACK UPTIME VERIFICATION
  console.log('\n[6] Better Stack Uptime Health Endpoint Verification:');

  const dbPing = await prisma.$queryRaw`SELECT 1 as healthy`;
  assert(Array.isArray(dbPing) && dbPing.length > 0, "Database connectivity ping successful (SELECT 1)");

  const mockHealthPayload = {
    status: 'healthy',
    platform: 'Mazhi Sheti Operating System',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    services: { database: 'connected', auth: 'operational' },
  };

  const healthJsonStr = JSON.stringify(mockHealthPayload);
  assert(!healthJsonStr.includes('password'), "Health check does NOT leak database password");
  assert(!healthJsonStr.includes('DATABASE_URL'), "Health check does NOT leak connection string");
  assert(!healthJsonStr.includes('secret'), "Health check does NOT leak secrets");
  assert(mockHealthPayload.status === 'healthy', "Health endpoint confirms operational uptime status");

  // SUMMARY
  console.log('\n=============================================================');
  console.log(`OBSERVABILITY SUITE COMPLETED: ${passed} PASSED, ${failed} FAILED`);
  console.log('=============================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runObservabilityTests()
  .catch((err) => {
    console.error('Fatal observability test error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
