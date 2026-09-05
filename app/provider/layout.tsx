import React from 'react'
import { redirect } from 'next/navigation'
import { requireRole } from '@/lib/auth/requireAuth'
import { ROLES } from '@/lib/auth/roles'

export const dynamic = 'force-dynamic'

interface ProviderLayoutProps {
  children: React.ReactNode
}

export default async function ProviderLayout({ children }: ProviderLayoutProps) {
  try {
    await requireRole([
      ROLES.EQUIPMENT_PROVIDER,
      ROLES.PROVIDER_OWNER,
      ROLES.PROVIDER_OPERATOR,
      ROLES.ADMIN,
      ROLES.SUPER_ADMIN,
    ])
    return <>{children}</>
  } catch (err) {
    redirect('/auth/provider')
  }
}
