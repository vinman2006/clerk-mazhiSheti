'use client'

import React from 'react'
import Link from 'next/link'
import { ShieldCheck, Sprout, Award } from 'lucide-react'
import { MazhiShetiLogo } from '@/components/ui/MazhiShetiLogo'

export function PortalHeader() {
  return (
    <div className="bg-[#0B152E]/90 text-white h-20 sm:h-[90px] px-4 sm:px-8 flex items-center justify-between border-b border-white/10 shadow-sm backdrop-blur-md">
      {/* Left: Master Mazhi Sheti Brand */}
      <Link href="/" className="group">
        <MazhiShetiLogo size={42} showText={true} showBadge={true} subtitle="Sovereign Agriculture Platform" />
      </Link>

      {/* Right: Partner / Standard Verification Badges */}
      <div className="hidden md:flex items-center gap-6">
        {/* Emblem 1 */}
        <div className="flex items-center gap-2 border-r border-white/10 pr-5">
          <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Sprout className="w-5 h-5" />
          </div>
          <div className="flex flex-col text-[10px] leading-tight">
            <span className="font-bold text-slate-200 uppercase">ICAR Agronomy</span>
            <span className="text-slate-400 font-mono">Standard Protocols</span>
          </div>
        </div>

        {/* Emblem 2 */}
        <div className="flex items-center gap-2 border-r border-white/10 pr-5">
          <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex flex-col text-[10px] leading-tight">
            <span className="font-bold text-slate-200 uppercase">Role-Gated</span>
            <span className="text-slate-400 font-mono">Clerk Auth System</span>
          </div>
        </div>

        {/* Emblem 3 */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Award className="w-5 h-5" />
          </div>
          <div className="flex flex-col text-[10px] leading-tight">
            <span className="font-bold text-slate-200 uppercase">Direct APMC Mandi</span>
            <span className="text-slate-400 font-mono">Real-Time Prices</span>
          </div>
        </div>
      </div>
    </div>
  )
}
