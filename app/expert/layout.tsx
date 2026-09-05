import React from 'react'
import { redirect } from 'next/navigation'
import { requireRole } from '@/lib/auth/requireAuth'
import { ROLES } from '@/lib/auth/roles'

export const dynamic = 'force-dynamic'

interface ExpertLayoutProps {
  children: React.ReactNode
}

export default async function ExpertLayout({ children }: ExpertLayoutProps) {
  try {
    await requireRole([
      ROLES.AGRICULTURE_EXPERT,
      ROLES.ADMIN,
      ROLES.SUPER_ADMIN,
    ])
    return <>{children}</>
  } catch (err) {
    redirect('/auth/expert')
  }
}
