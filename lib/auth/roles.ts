export const ROLES = {
  FARMER: 'FARMER',
  BANK_LOAN_OFFICER: 'BANK_LOAN_OFFICER',
  BANK_ADMIN: 'BANK_ADMIN',
  BANK_MANAGER: 'BANK_MANAGER',
  PROVIDER_OWNER: 'PROVIDER_OWNER',
  PROVIDER_OPERATOR: 'PROVIDER_OPERATOR',
  AGRICULTURE_EXPERT: 'AGRICULTURE_EXPERT',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const;

export type AppRole = typeof ROLES[keyof typeof ROLES];

export const ROLE_DISPLAY_NAMES: Record<AppRole, string> = {
  FARMER: 'Farmer / Cultivator',
  BANK_LOAN_OFFICER: 'Bank Loan Officer',
  BANK_ADMIN: 'Bank Administrator',
  BANK_MANAGER: 'Branch Manager',
  PROVIDER_OWNER: 'Equipment & Service Provider',
  PROVIDER_OPERATOR: 'Machinery Operator',
  AGRICULTURE_EXPERT: 'Agronomist & Agriculture Expert',
  ADMIN: 'System Administrator',
  SUPER_ADMIN: 'Super Administrator',
};

export function isBankRole(role?: string): boolean {
  return role === ROLES.BANK_LOAN_OFFICER || role === ROLES.BANK_ADMIN || role === ROLES.BANK_MANAGER;
}

export function isProviderRole(role?: string): boolean {
  return role === ROLES.PROVIDER_OWNER || role === ROLES.PROVIDER_OPERATOR;
}

export function isAdminRole(role?: string): boolean {
  return role === ROLES.ADMIN || role === ROLES.SUPER_ADMIN;
}
