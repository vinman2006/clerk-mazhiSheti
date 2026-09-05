/**
 * Mazhi Sheti — Authoritative Permissions System
 * 
 * Granular permissions model following the Principle of Least Privilege.
 * Corresponds to Phase 1.1 specifications.
 */

import { AppRole, ROLES } from './roles';

export const PERMISSIONS = {
  // Farm & Field Management (Farmer)
  FARM_READ_OWN: 'farm:read:own',
  FARM_CREATE_OWN: 'farm:create:own',
  FARM_UPDATE_OWN: 'farm:update:own',
  FIELD_READ_OWN: 'field:read:own',
  FIELD_CREATE_OWN: 'field:create:own',
  FIELD_UPDATE_OWN: 'field:update:own',
  CROP_READ_OWN: 'crop:read:own',
  CROP_UPDATE_OWN: 'crop:update:own',

  // Soil Health & IoT
  SOIL_READ_OWN: 'soil:read:own',
  SOIL_ENTRY_OWN: 'soil:entry:own',
  DEVICE_MANAGE_OWN: 'device:manage:own',
  DEVICE_INGEST: 'device:ingest',
  IRRIGATION_CONTROL_OWN: 'irrigation:control:own',

  // Marketplace & Rentals
  MARKETPLACE_CREATE: 'marketplace:create',
  MARKETPLACE_ORDER: 'marketplace:order',
  RENTAL_CREATE: 'rental:create',
  RENTAL_READ_OWN: 'rental:read:own',
  RENTAL_UPDATE_OWN: 'rental:update:own',

  // Loans & Consents
  LOAN_CREATE: 'loan:create',
  LOAN_READ_OWN: 'loan:read:own',
  CONSENT_MANAGE: 'consent:manage',
  CONSENT_GRANT: 'consent:grant',
  CONSENT_REVOKE: 'consent:revoke',
  PAYMENT_READ_OWN: 'payment:read:own',
  PAYMENT_CREATE: 'payment:create',

  // Bank Organization Permissions
  LOAN_READ: 'loan:read',
  LOAN_REVIEW: 'loan:review',
  LOAN_APPROVE: 'loan:approve',
  FARMER_DATA_REQUEST: 'farmer_data:request',
  FARMER_DATA_READ_CONSENTED: 'farmer_data:read:consented',
  DOCUMENT_REQUEST: 'document:request',

  // Equipment Provider Permissions
  EQUIPMENT_CREATE_OWN: 'equipment:create:own',
  EQUIPMENT_UPDATE_OWN: 'equipment:update:own',
  BOOKING_READ_OWN: 'booking:read:own',
  BOOKING_UPDATE_OWN: 'booking:update:own',

  // Agriculture Expert Permissions
  CONSULTATION_READ_ASSIGNED: 'consultation:read:assigned',
  FARM_DATA_READ_SHARED: 'farm_data:read:shared',
  RECOMMENDATION_CREATE: 'recommendation:create',

  // Admin Permissions (Explicitly bounded)
  ADMIN_AUDIT_VIEW: 'admin:audit:view',
  ADMIN_ORG_VERIFY: 'admin:org:verify',
  ADMIN_USERS_MANAGE: 'admin:users:manage',
  ADMIN_SYSTEM_MANAGE: 'admin:system:manage',

  // Legacy compatibility aliases
  FARM_READ: 'farm:read:own',
  FARM_WRITE: 'farm:write',
  FIELD_MANAGE: 'field:create:own',
  SOIL_READ: 'soil:read:own',
  SOIL_ENTRY: 'soil:entry:own',
  DEVICE_MANAGE: 'device:manage:own',
  IRRIGATION_CONTROL: 'irrigation:control:own',
  MARKETPLACE_LIST: 'marketplace:create',
  EQUIPMENT_RENT: 'rental:create',
  EQUIPMENT_MANAGE: 'equipment:update:own',
  LOAN_APPLY: 'loan:create',
  BANK_VIEW_FARMER: 'farmer_data:read:consented',
  EXPERT_ADVISE: 'recommendation:create',
  ADMIN_VERIFY_ORG: 'admin:org:verify',
  ADMIN_MANAGE_USERS: 'admin:users:manage',
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

// Role to permissions mapping (Least-Privilege)
const ROLE_PERMISSIONS: Record<AppRole, readonly Permission[]> = {
  [ROLES.FARMER]: [
    PERMISSIONS.FARM_READ_OWN,
    PERMISSIONS.FARM_CREATE_OWN,
    PERMISSIONS.FARM_UPDATE_OWN,
    PERMISSIONS.FIELD_READ_OWN,
    PERMISSIONS.FIELD_CREATE_OWN,
    PERMISSIONS.FIELD_UPDATE_OWN,
    PERMISSIONS.CROP_READ_OWN,
    PERMISSIONS.CROP_UPDATE_OWN,
    PERMISSIONS.SOIL_READ_OWN,
    PERMISSIONS.SOIL_ENTRY_OWN,
    PERMISSIONS.DEVICE_MANAGE_OWN,
    PERMISSIONS.IRRIGATION_CONTROL_OWN,
    PERMISSIONS.MARKETPLACE_CREATE,
    PERMISSIONS.MARKETPLACE_ORDER,
    PERMISSIONS.RENTAL_CREATE,
    PERMISSIONS.RENTAL_READ_OWN,
    PERMISSIONS.LOAN_CREATE,
    PERMISSIONS.LOAN_READ_OWN,
    PERMISSIONS.CONSENT_MANAGE,
    PERMISSIONS.CONSENT_GRANT,
    PERMISSIONS.CONSENT_REVOKE,
    PERMISSIONS.PAYMENT_READ_OWN,
    PERMISSIONS.PAYMENT_CREATE,
    // Aliases
    PERMISSIONS.FARM_READ,
    PERMISSIONS.FARM_WRITE,
    PERMISSIONS.FIELD_MANAGE,
    PERMISSIONS.SOIL_READ,
    PERMISSIONS.SOIL_ENTRY,
    PERMISSIONS.DEVICE_MANAGE,
    PERMISSIONS.IRRIGATION_CONTROL,
    PERMISSIONS.MARKETPLACE_LIST,
    PERMISSIONS.EQUIPMENT_RENT,
    PERMISSIONS.LOAN_APPLY,
  ],

  [ROLES.BANK_USER]: [
    PERMISSIONS.LOAN_READ,
    PERMISSIONS.LOAN_REVIEW,
    PERMISSIONS.FARMER_DATA_REQUEST,
    PERMISSIONS.FARMER_DATA_READ_CONSENTED,
    PERMISSIONS.DOCUMENT_REQUEST,
    PERMISSIONS.BANK_VIEW_FARMER,
  ],

  [ROLES.BANK_LOAN_OFFICER]: [
    PERMISSIONS.LOAN_READ,
    PERMISSIONS.LOAN_REVIEW,
    PERMISSIONS.FARMER_DATA_REQUEST,
    PERMISSIONS.FARMER_DATA_READ_CONSENTED,
    PERMISSIONS.DOCUMENT_REQUEST,
    PERMISSIONS.BANK_VIEW_FARMER,
  ],

  [ROLES.BANK_ADMIN]: [
    PERMISSIONS.LOAN_READ,
    PERMISSIONS.LOAN_REVIEW,
    PERMISSIONS.LOAN_APPROVE,
    PERMISSIONS.FARMER_DATA_REQUEST,
    PERMISSIONS.FARMER_DATA_READ_CONSENTED,
    PERMISSIONS.DOCUMENT_REQUEST,
    PERMISSIONS.BANK_VIEW_FARMER,
  ],

  [ROLES.BANK_MANAGER]: [
    PERMISSIONS.LOAN_READ,
    PERMISSIONS.LOAN_REVIEW,
    PERMISSIONS.LOAN_APPROVE,
    PERMISSIONS.FARMER_DATA_REQUEST,
    PERMISSIONS.FARMER_DATA_READ_CONSENTED,
    PERMISSIONS.DOCUMENT_REQUEST,
    PERMISSIONS.BANK_VIEW_FARMER,
  ],

  [ROLES.EQUIPMENT_PROVIDER]: [
    PERMISSIONS.EQUIPMENT_CREATE_OWN,
    PERMISSIONS.EQUIPMENT_UPDATE_OWN,
    PERMISSIONS.BOOKING_READ_OWN,
    PERMISSIONS.BOOKING_UPDATE_OWN,
    PERMISSIONS.EQUIPMENT_MANAGE,
  ],

  [ROLES.PROVIDER_OWNER]: [
    PERMISSIONS.EQUIPMENT_CREATE_OWN,
    PERMISSIONS.EQUIPMENT_UPDATE_OWN,
    PERMISSIONS.BOOKING_READ_OWN,
    PERMISSIONS.BOOKING_UPDATE_OWN,
    PERMISSIONS.EQUIPMENT_MANAGE,
  ],

  [ROLES.PROVIDER_OPERATOR]: [
    PERMISSIONS.BOOKING_READ_OWN,
    PERMISSIONS.BOOKING_UPDATE_OWN,
    PERMISSIONS.EQUIPMENT_MANAGE,
  ],

  [ROLES.AGRICULTURE_EXPERT]: [
    PERMISSIONS.CONSULTATION_READ_ASSIGNED,
    PERMISSIONS.FARM_DATA_READ_SHARED,
    PERMISSIONS.RECOMMENDATION_CREATE,
    PERMISSIONS.SOIL_READ,
    PERMISSIONS.EXPERT_ADVISE,
  ],

  [ROLES.ADMIN]: [
    PERMISSIONS.ADMIN_AUDIT_VIEW,
    PERMISSIONS.ADMIN_ORG_VERIFY,
    PERMISSIONS.ADMIN_USERS_MANAGE,
    PERMISSIONS.ADMIN_SYSTEM_MANAGE,
    PERMISSIONS.LOAN_READ,
    PERMISSIONS.LOAN_REVIEW,
    PERMISSIONS.ADMIN_VERIFY_ORG,
    PERMISSIONS.ADMIN_MANAGE_USERS,
  ],

  [ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),

  [ROLES.GOVERNMENT_USER]: [
    PERMISSIONS.ADMIN_AUDIT_VIEW,
    PERMISSIONS.LOAN_READ,
  ],
};

/**
 * Validates whether a given role holds a specific permission.
 */
export function hasPermission(role: AppRole | string, permission: Permission | string): boolean {
  const permissions = ROLE_PERMISSIONS[role as AppRole];
  return permissions ? permissions.includes(permission as Permission) : false;
}
