'use client'

import React from 'react'
import Link from 'next/link'
import { Shield, Lock, Cpu, Globe, CheckCircle2 } from 'lucide-react'
import { NexoraLogo } from '@/components/ui/NexoraLogo'

export function Footer() {
  return (
    <footer className="bg-[#0D1B4C] border-t-2 border-portal-orange text-xs font-mono text-neutral-300">
      {/* Top Footer Banner */}
      <div className="bg-[#152A63] border-b border-neutral-700/60 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-white font-bold">
            <span className="w-2 h-2 rounded-full bg-portal-green"></span>
            <span>Nexora National Sovereign Health Network</span>
          </div>
          <div className="flex items-center gap-4 text-portal-orange font-semibold">
            <span>• W3C Verifiable Credentials</span>
            <span>• Zero-Knowledge Proofs</span>
            <span>• Off-Chain EHR Security</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Sovereign Seal */}
          <div className="space-y-3">
            <NexoraLogo size={36} showText={true} showBadge={false} subtitle="Zero-Trust Health Net" />
            <p className="font-sans text-xs text-neutral-300 leading-relaxed">
              Privacy-first multi-agent healthcare network combining decentralized identity, verifiable credentials, zero-knowledge proofs, and federated learning.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#101420] border-l-4 border-l-portal-green border border-neutral-700 text-[11px] text-portal-green font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Zero Medical Data Stored On-Chain</span>
            </div>
          </div>

          {/* Col 2: Architecture & Protocols */}
          <div className="space-y-3">
            <span className="text-white font-bold text-xs tracking-wider uppercase border-b-2 border-portal-orange pb-1 block w-fit">
              Core Protocols
            </span>
            <ul className="space-y-2 font-sans text-xs">
              <li><Link href="/architecture" className="text-neutral-300 hover:text-portal-orange transition-colors">Decentralized Identity (W3C DID)</Link></li>
              <li><Link href="/architecture" className="text-neutral-300 hover:text-portal-orange transition-colors">Zero-Knowledge Eligibility (zk-SNARKs)</Link></li>
              <li><Link href="/dashboard/consent" className="text-neutral-300 hover:text-portal-orange transition-colors">Smart Consent Manager</Link></li>
              <li><Link href="/dashboard/audit" className="text-neutral-300 hover:text-portal-orange transition-colors">Immutable Audit Ledger</Link></li>
            </ul>
          </div>

          {/* Col 3: Network Portals */}
          <div className="space-y-3">
            <span className="text-white font-bold text-xs tracking-wider uppercase border-b-2 border-portal-orange pb-1 block w-fit">
              Network Portals
            </span>
            <ul className="space-y-2 font-sans text-xs">
              <li><Link href="/dashboard" className="text-neutral-300 hover:text-portal-orange transition-colors">Patient Hub & Care Discovery</Link></li>
              <li><Link href="/dashboard/agents" className="text-neutral-300 hover:text-portal-orange transition-colors">Multi-Agent Orchestrator</Link></li>
              <li><Link href="/hospital-portal/ai-training" className="text-neutral-300 hover:text-portal-orange transition-colors">Hospital Federated Learning</Link></li>
              <li><Link href="/gov-portal" className="text-neutral-300 hover:text-portal-orange transition-colors">National Scheme Administration</Link></li>
              <li><Link href="/research" className="text-neutral-300 hover:text-portal-orange transition-colors">Approved Research Datasets</Link></li>
            </ul>
          </div>

          {/* Col 4: Trust & Compliance */}
          <div className="space-y-3">
            <span className="text-white font-bold text-xs tracking-wider uppercase border-b-2 border-portal-orange pb-1 block w-fit">
              Security Guarantee
            </span>
            <div className="p-3.5 rounded-lg bg-[#101420] border-l-4 border-l-portal-orange border border-neutral-700 text-[11px] font-sans text-neutral-300 space-y-1.5">
              <div className="flex items-center gap-1.5 text-portal-orange font-mono font-bold">
                <Lock className="w-3.5 h-3.5" />
                <span>Zero-Trust Architecture</span>
              </div>
              <p className="leading-relaxed">
                Patient records remain on-premises behind hospital firewalls or in decentralized encrypted patient storage. AI models train solely via local gradient updates.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-neutral-700/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-400 text-[11px]">
          <span>© 2026 Nexora Network. Built on cryptographic trust primitives.</span>
          <div className="flex items-center gap-4 font-mono">
            <span>Status: <span className="text-portal-green font-bold">Mainnet Sim v2.4 ✓</span></span>
            <span>Consensus: <span className="text-portal-orange font-bold">ZK-Rollup L2</span></span>
          </div>
        </div>
      </div>
    </footer>
  )
}
