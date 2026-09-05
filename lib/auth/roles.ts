/**
 * Mazhi Sheti — Authoritative Role Architecture
 * 
 * Defines the primary platform roles and sub-roles according to Phase 1 specifications:
 * 1. FARMER
 * 2. BANK_USER (with sub-roles BANK_LOAN_OFFICER, BANK_ADMIN, BANK_MANAGER)
 * 3. EQUIPMENT_PROVIDER (with sub-roles PROVIDER_OWNER, PROVIDER_OPERATOR)
 * 4. AGRICULTURE_EXPERT
 * 5. ADMIN (with sub-role SUPER_ADMIN)
 * 6. GOVERNMENT_USER (Reserved extensible role for future regulatory use)
 */

export const PRIMARY_ROLES = {
  FARMER: 'FARMER',
  BANK_USER: 'BANK_USER',
  EQUIPMENT_PROVIDER: 'EQUIPMENT_PROVIDER',
  AGRICULTURE_EXPERT: 'AGRICULTURE_EXPERT',
  ADMIN: 'ADMIN',
  // Extensible future role
  GOVERNMENT_USER: 'GOVERNMENT_USER',
} as const;

export const ROLES = {
  // Primary Roles
  FARMER: 'FARMER',
  BANK_USER: 'BANK_USER',
  EQUIPMENT_PROVIDER: 'EQUIPMENT_PROVIDER',
  AGRICULTURE_EXPERT: 'AGRICULTURE_EXPERT',
  ADMIN: 'ADMIN',

  // Bank Organization Sub-roles
  BANK_LOAN_OFFICER: 'BANK_LOAN_OFFICER',
  BANK_ADMIN: 'BANK_ADMIN',
  BANK_MANAGER: 'BANK_MANAGER',

  // Provider Organization Sub-roles
  PROVIDER_OWNER: 'PROVIDER_OWNER',
  PROVIDER_OPERATOR: 'PROVIDER_OPERATOR',

  // Admin Sub-roles
  SUPER_ADMIN: 'SUPER_ADMIN',

  // Reserved Future Role
  GOVERNMENT_USER: 'GOVERNMENT_USER',
} as const;

export type AppRole = typeof ROLES[keyof typeof ROLES];
export type PrimaryRole = typeof PRIMARY_ROLES[keyof typeof PRIMARY_ROLES];

export const ROLE_DISPLAY_NAMES: Record<AppRole, string> = {
  FARMER: 'Farmer / Cultivator',
  BANK_USER: 'Bank Officer / Underwriter',
  BANK_LOAN_OFFICER: 'Bank Loan Officer',
  BANK_ADMIN: 'Bank Administrator',
  BANK_MANAGER: 'Bank Branch Manager',
  EQUIPMENT_PROVIDER: 'Machinery & Equipment Provider',
  PROVIDER_OWNER: 'Equipment Fleet Owner',
  PROVIDER_OPERATOR: 'Machinery Operator',
  AGRICULTURE_EXPERT: 'Agronomist & Agriculture Expert',
  ADMIN: 'System Administrator',
  SUPER_ADMIN: 'Super Administrator',
  GOVERNMENT_USER: 'Agricultural Regulatory Officer',
};

/**
 * Normalizes any sub-role to its primary role classification.
 */
export function toPrimaryRole(role?: string): PrimaryRole {
  if (!role) return PRIMARY_ROLES.FARMER;
  if (isBankRole(role)) return PRIMARY_ROLES.BANK_USER;
  if (isProviderRole(role)) return PRIMARY_ROLES.EQUIPMENT_PROVIDER;
  if (isExpertRole(role)) return PRIMARY_ROLES.AGRICULTURE_EXPERT;
  if (isAdminRole(role)) return PRIMARY_ROLES.ADMIN;
  if (role === ROLES.GOVERNMENT_USER) return PRIMARY_ROLES.GOVERNMENT_USER;
  return PRIMARY_ROLES.FARMER;
}

export function isFarmerRole(role?: string): boolean {
  return role === ROLES.FARMER;
}

export function isBankRole(role?: string): boolean {
  return (
    role === ROLES.BANK_USER ||
    role === ROLES.BANK_LOAN_OFFICER ||
    role === ROLES.BANK_ADMIN ||
    role === ROLES.BANK_MANAGER
  );
}

export function isProviderRole(role?: string): boolean {
  return (
    role === ROLES.EQUIPMENT_PROVIDER ||
    role === ROLES.PROVIDER_OWNER ||
    role === ROLES.PROVIDER_OPERATOR
  );
}

export function isExpertRole(role?: string): boolean {
  return role === ROLES.AGRICULTURE_EXPERT;
}

export function isAdminRole(role?: string): boolean {
  return role === ROLES.ADMIN || role === ROLES.SUPER_ADMIN;
}

/**
 * Maps a role to its default authorized landing portal.
 */
export function getRolePortalPath(role?: string): string {
  const primary = toPrimaryRole(role);
  switch (primary) {
    case PRIMARY_ROLES.FARMER:
      return '/farmer/dashboard';
    case PRIMARY_ROLES.BANK_USER:
      return '/bank/dashboard';
    case PRIMARY_ROLES.EQUIPMENT_PROVIDER:
      return '/provider/dashboard';
    case PRIMARY_ROLES.AGRICULTURE_EXPERT:
      return '/expert/dashboard';
    case PRIMARY_ROLES.ADMIN:
      return '/admin/dashboard';
    default:
      return '/farmer/dashboard';
  }
}
