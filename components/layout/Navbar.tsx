'use client'

import React from 'react'
import { TopUtilityBar } from '@/components/portal/TopUtilityBar'
import { PortalHeader } from '@/components/portal/PortalHeader'
import { PortalNavBar } from '@/components/portal/PortalNavBar'

export function Navbar() {
  return (
    <header className="w-full relative z-50 bg-white">
      {/* 1. Dark Top Accessibility & Utility Bar */}
      <TopUtilityBar />

      {/* 2. White Emblem & Logo Header */}
      <PortalHeader />

      {/* 3. Solid Navy Navigation Bar */}
      <PortalNavBar />
    </header>
  )
}

