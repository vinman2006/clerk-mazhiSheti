'use client'

import React from 'react'
import Link from 'next/link'
import { ShieldCheck, Cpu, CheckCircle, Award, Lock, Sparkles } from 'lucide-react'

import { NexoraLogo } from '@/components/ui/NexoraLogo'

export function PortalHeader() {
  return (
    <div className="bg-white text-neutral-900 h-20 sm:h-[90px] px-4 sm:px-8 flex items-center justify-between border-b border-portal-border-light shadow-sm">
      {/* Left: Monogram 'N' & Wordmark */}
      <Link href="/" className="group">
        <NexoraLogo size={46} showText={true} showBadge={true} subtitle="Unified Platform Access & Trust Net" />
      </Link>

      {/* Right: Abstract Partner / Standard Verification Badges */}
      <div className="hidden md:flex items-center gap-6">
        {/* Abstract Emblem 1 */}
        <div className="flex items-center gap-2 border-r border-neutral-200 pr-5">
          <div className="w-9 h-9 rounded-full bg-blue-50 border border-portal-blue/30 flex items-center justify-center text-portal-blue">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex flex-col text-[10px] leading-tight">
            <span className="font-bold text-neutral-800 uppercase">ZK-Trust Net</span>
            <span className="text-neutral-500 font-mono">ISO/W3C Standard</span>
          </div>
        </div>

        {/* Abstract Emblem 2 */}
        <div className="flex items-center gap-2 border-r border-neutral-200 pr-5">
          <div className="w-9 h-9 rounded-full bg-amber-50 border border-portal-orange/30 flex items-center justify-center text-portal-orange">
            <Cpu className="w-5 h-5" />
          </div>
          <div className="flex flex-col text-[10px] leading-tight">
            <span className="font-bold text-neutral-800 uppercase">Federated AI</span>
            <span className="text-neutral-500 font-mono">Edge Verified</span>
          </div>
        </div>

        {/* Abstract Emblem 3 */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-green-50 border border-portal-green/30 flex items-center justify-center text-portal-green">
            <Award className="w-5 h-5" />
          </div>
          <div className="flex flex-col text-[10px] leading-tight">
            <span className="font-bold text-neutral-800 uppercase">Zero Data Leak</span>
            <span className="text-neutral-500 font-mono">Compliant 2026</span>
          </div>
        </div>
      </div>
    </div>
  )
}
