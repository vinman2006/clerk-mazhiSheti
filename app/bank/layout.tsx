import React from 'react'
import { redirect } from 'next/navigation'
import { requireRole } from '@/lib/auth/requireAuth'
import { ROLES } from '@/lib/auth/roles'

export const dynamic = 'force-dynamic'

interface BankLayoutProps {
  children: React.ReactNode
}

export default async function BankLayout({ children }: BankLayoutProps) {
  try {
    await requireRole([
      ROLES.BANK_USER,
      ROLES.BANK_LOAN_OFFICER,
      ROLES.BANK_ADMIN,
      ROLES.BANK_MANAGER,
      ROLES.ADMIN,
      ROLES.SUPER_ADMIN,
    ])
    return <>{children}</>
  } catch (err) {
    redirect('/auth/bank')
  }
}
