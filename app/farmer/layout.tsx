import React from 'react'
import { redirect } from 'next/navigation'
import { requireRole } from '@/lib/auth/requireAuth'
import { ROLES } from '@/lib/auth/roles'
import FarmerShell from '@/components/farmer/FarmerShell'

export const dynamic = 'force-dynamic'

interface FarmerLayoutProps {
  children: React.ReactNode
}

export default async function FarmerLayout({ children }: FarmerLayoutProps) {
  try {
    const ctx = await requireRole([ROLES.FARMER, ROLES.ADMIN, ROLES.SUPER_ADMIN])
    return <FarmerShell userRole={ctx.role}>{children}</FarmerShell>
  } catch (err) {
    redirect('/auth/farmer')
  }
}
