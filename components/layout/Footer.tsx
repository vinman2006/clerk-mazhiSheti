'use client'

import React from 'react'
import Link from 'next/link'
import { ShieldCheck, Sprout, Tractor, Landmark, CheckCircle2, Lock } from 'lucide-react'
import { MazhiShetiLogo } from '@/components/ui/MazhiShetiLogo'

export function Footer() {
  return (
    <footer className="bg-[#050811] border-t border-white/10 text-xs font-mono text-slate-400">
      {/* Top Footer Banner */}
      <div className="bg-[#0B152E]/60 border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-white font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>MAZHI SHETI — Sovereign Agriculture Infrastructure</span>
          </div>
          <div className="flex items-center gap-4 text-blue-200/75 font-semibold">
            <span>• ICAR Soil Standards</span>
            <span>• APMC Mandi Feeds</span>
            <span>• Role-Based Security</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Sovereign Seal */}
          <div className="space-y-3">
            <MazhiShetiLogo size={36} showText={true} showBadge={false} subtitle="SOVEREIGN AGRI PLATFORM" />
            <p className="font-sans text-xs text-slate-300 leading-relaxed">
              Intelligent farming telemetry, verified crop advisory, and institutional credit collaboration built for Indian agriculture.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Accredited MPKV & NPOP Protocols</span>
            </div>
          </div>

          {/* Col 2: Agriculture Infrastructure */}
          <div className="space-y-3">
            <span className="text-white font-bold text-xs tracking-wider uppercase border-b-2 border-emerald-500/50 pb-1 block w-fit">
              Core Modules
            </span>
            <ul className="space-y-2 font-sans text-xs">
              <li><Link href="/farmer/soil" className="text-slate-400 hover:text-white transition-colors">Soil Moisture & NPK Telemetry</Link></li>
              <li><Link href="/farmer/marketplace" className="text-slate-400 hover:text-white transition-colors">Mandi Real-Time Benchmarks</Link></li>
              <li><Link href="/farmer/finance" className="text-slate-400 hover:text-white transition-colors">KCC & AIF Credit Portals</Link></li>
              <li><Link href="/farmer/sprinklers" className="text-slate-400 hover:text-white transition-colors">Precision Micro-Irrigation Control</Link></li>
            </ul>
          </div>

          {/* Col 3: Role Portals */}
          <div className="space-y-3">
            <span className="text-white font-bold text-xs tracking-wider uppercase border-b-2 border-orange-500/50 pb-1 block w-fit">
              Role Access
            </span>
            <ul className="space-y-2 font-sans text-xs">
              <li><Link href="/auth/farmer" className="text-slate-400 hover:text-white transition-colors">Farmer Operating System</Link></li>
              <li><Link href="/auth/bank" className="text-slate-400 hover:text-white transition-colors">Institutional Lending Portal</Link></li>
              <li><Link href="/auth/provider" className="text-slate-400 hover:text-white transition-colors">Equipment & Machinery Fleet</Link></li>
              <li><Link href="/auth/expert" className="text-slate-400 hover:text-white transition-colors">Certified Agronomy Advisory</Link></li>
              <li><Link href="/auth/admin" className="text-slate-400 hover:text-white transition-colors">Platform Governance Console</Link></li>
            </ul>
          </div>

          {/* Col 4: Trust & Compliance */}
          <div className="space-y-3">
            <span className="text-white font-bold text-xs tracking-wider uppercase border-b-2 border-blue-500/50 pb-1 block w-fit">
              Security Guarantee
            </span>
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] font-sans text-slate-300 space-y-1.5">
              <div className="flex items-center gap-1.5 text-orange-400 font-mono font-bold">
                <Lock className="w-3.5 h-3.5" />
                <span>Role-Gated Cryptographic Auth</span>
              </div>
              <p className="leading-relaxed">
                Farm telemetry, land records, and financial disclosures are cryptographically isolated with verified authentication. Cultivator sovereignty is protected by design.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <span>© 2026 Mazhi Sheti (माझी शेती). All rights reserved.</span>
          <div className="flex items-center gap-4 font-mono">
            <span>Engine: <span className="text-emerald-400 font-bold">AgriOS v3.2 ✓</span></span>
            <span>Security: <span className="text-orange-400 font-bold">Role-Based Access</span></span>
          </div>
        </div>
      </div>
    </footer>
  )
}
