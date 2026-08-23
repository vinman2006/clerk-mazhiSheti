'use client'

import React from 'react'

interface SimulatedBadgeProps {
  label?: string
  className?: string
  variant?: 'subtle' | 'outline' | 'inline'
}

export function SimulatedBadge({ 
  label = "Simulated Data", 
  className = "",
  variant = "subtle"
}: SimulatedBadgeProps) {
  if (variant === 'inline') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-[#152A63] text-portal-orange-light border border-portal-orange/30 shadow-sm ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-portal-green"></span>
        {label}
      </span>
    )
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium tracking-wide bg-[#152A63] text-neutral-200 border border-portal-orange/40 shadow-sm ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-portal-green"></span>
      <span className="text-portal-orange-light font-semibold">{label}</span>
    </div>
  )
}
