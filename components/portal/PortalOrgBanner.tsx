'use client'

import React from 'react'
import { Building2, Shield, Sparkles } from 'lucide-react'

interface PortalOrgBannerProps {
  title?: string
  subtitle?: string
  hindiTitle?: string
}

export function PortalOrgBanner({
  title = "NEXORA UNIFIED PORTAL",
  hindiTitle = "नेक्सोरा युनिफाइड पोर्टल",
  subtitle = "Healthcare & Multi-Agent Network | Secure Citizen Workspace"
}: PortalOrgBannerProps) {
  return (
    <div className="bg-[#152A63] text-white py-3.5 px-4 sm:px-8 border-b-2 border-portal-orange shadow-inner">
      <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-start gap-3.5">
        {/* Emblem / Org Icon in White Circle */}
        <div className="w-10 h-10 rounded-full bg-white text-portal-blue flex items-center justify-center shrink-0 shadow-md">
          <Building2 className="w-5 h-5 text-portal-blue" />
        </div>

        <div className="flex flex-col text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-sm sm:text-base tracking-wider uppercase">
              {title}
            </span>
          </div>
          <span className="text-[11px] font-sans text-neutral-300 font-medium">
            {hindiTitle} | {subtitle}
          </span>
        </div>
      </div>
    </div>
  )
}
