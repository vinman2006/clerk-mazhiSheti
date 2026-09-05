import React from 'react'
import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/auth/requireAuth'

export const dynamic = 'force-dynamic'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  try {
    await requireAdmin()
    return <>{children}</>
  } catch (err) {
    redirect('/auth/admin')
  }
}
