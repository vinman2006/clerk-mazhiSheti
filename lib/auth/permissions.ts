import { AppRole, ROLES } from './roles';

export const PERMISSIONS = {
  // Farm & Field
  FARM_READ: 'farm:read',
  FARM_WRITE: 'farm:write',
  FIELD_MANAGE: 'field:manage',
  
  // Soil & IoT
  SOIL_READ: 'soil:read',
  SOIL_ENTRY: 'soil:entry',
  DEVICE_MANAGE: 'device:manage',
  DEVICE_INGEST: 'device:ingest',
  IRRIGATION_CONTROL: 'irrigation:control',

  // Marketplace & Machinery
  MARKETPLACE_LIST: 'marketplace:list',
  EQUIPMENT_RENT: 'equipment:rent',
  EQUIPMENT_MANAGE: 'equipment:manage',

  // Banking & Consent
  LOAN_APPLY: 'loan:apply',
  LOAN_REVIEW: 'loan:review',
  LOAN_APPROVE: 'loan:approve',
  CONSENT_GRANT: 'consent:grant',
  CONSENT_REVOKE: 'consent:revoke',
  BANK_VIEW_FARMER: 'bank:view_farmer',

  // Expert Advisory
  EXPERT_ADVISE: 'expert:advise',

  // Platform Admin
  ADMIN_VERIFY_ORG: 'admin:verify_org',
  ADMIN_AUDIT_VIEW: 'admin:audit_view',
  ADMIN_MANAGE_USERS: 'admin:manage_users',
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

// Role to permissions mapping (Least-Privilege)
const ROLE_PERMISSIONS: Record<AppRole, readonly Permission[]> = {
  [ROLES.FARMER]: [
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
    PERMISSIONS.CONSENT_GRANT,
    PERMISSIONS.CONSENT_REVOKE,
  ],
  [ROLES.BANK_LOAN_OFFICER]: [
    PERMISSIONS.LOAN_REVIEW,
    PERMISSIONS.BANK_VIEW_FARMER,
  ],
  [ROLES.BANK_ADMIN]: [
    PERMISSIONS.LOAN_REVIEW,
    PERMISSIONS.LOAN_APPROVE,
    PERMISSIONS.BANK_VIEW_FARMER,
  ],
  [ROLES.BANK_MANAGER]: [
    PERMISSIONS.LOAN_REVIEW,
    PERMISSIONS.LOAN_APPROVE,
    PERMISSIONS.BANK_VIEW_FARMER,
  ],
  [ROLES.PROVIDER_OWNER]: [
    PERMISSIONS.EQUIPMENT_MANAGE,
  ],
  [ROLES.PROVIDER_OPERATOR]: [
    PERMISSIONS.EQUIPMENT_MANAGE,
  ],
  [ROLES.AGRICULTURE_EXPERT]: [
    PERMISSIONS.SOIL_READ,
    PERMISSIONS.EXPERT_ADVISE,
  ],
  [ROLES.ADMIN]: [
    PERMISSIONS.ADMIN_VERIFY_ORG,
    PERMISSIONS.ADMIN_AUDIT_VIEW,
    PERMISSIONS.ADMIN_MANAGE_USERS,
    PERMISSIONS.LOAN_REVIEW,
    PERMISSIONS.DEVICE_MANAGE,
  ],
  [ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),
};

export function hasPermission(role: AppRole, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  return permissions ? permissions.includes(permission) : false;
}
