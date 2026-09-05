'use client'

import React from 'react'
import { ShieldCheck, Clock, Ban } from 'lucide-react'

interface ConsentPillProps {
  status: 'active' | 'expired' | 'revoked'
  className?: string
}

export function ConsentPill({ status, className = "" }: ConsentPillProps) {
  if (status === 'active') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-[#101420] text-portal-green border border-neutral-700 border-l-4 border-l-portal-green shadow-sm ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-portal-green animate-pulse"></span>
        Active (Authorized)
      </span>
    )
  }

  if (status === 'expired') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-[#101420] text-amber-400 border border-neutral-700 border-l-4 border-l-amber-500 shadow-sm ${className}`}>
        <Clock className="w-3.5 h-3.5 text-amber-400" />
        Expired
      </span>
    )
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-[#101420] text-portal-orange border border-neutral-700 border-l-4 border-l-portal-orange shadow-sm ${className}`}>
      <Ban className="w-3.5 h-3.5 text-portal-orange" />
      Revoked
    </span>
  )
}
