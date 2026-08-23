'use client'

import React from 'react'
import Link from 'next/link'
import { Building2, Shield, Lock, Phone, Mail, MapPin, ExternalLink } from 'lucide-react'

export function PortalFooter() {
  return (
    <footer id="contact" className="bg-[#0D0D0D] text-white border-t border-neutral-800 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-10">
        {/* 4 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Information */}
          <div className="space-y-3">
            <h4 className="font-sans font-bold text-sm text-portal-orange uppercase tracking-wider">
              Information
            </h4>
            <ul className="space-y-2 text-neutral-300 text-xs">
              <li><Link href="/architecture" className="hover:text-white transition-colors">About Nexora Network</Link></li>
              <li><Link href="/hospital-portal/ai-training" className="hover:text-white transition-colors">Usage Statistics</Link></li>
              <li><Link href="/dashboard/audit" className="hover:text-white transition-colors">Performance Reports</Link></li>
              <li><Link href="/dashboard/consent" className="hover:text-white transition-colors">User Privacy Charter</Link></li>
            </ul>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <h4 className="font-sans font-bold text-sm text-portal-orange uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2 text-neutral-300 text-xs">
              <li><Link href="/dashboard/find-care" className="hover:text-white transition-colors">Doctor & Hospital Discovery</Link></li>
              <li><Link href="/dashboard/agents" className="hover:text-white transition-colors">Multi-Agent AI Assistance</Link></li>
              <li><Link href="/dashboard/records" className="hover:text-white transition-colors">Data & Sync (Encrypted IPFS)</Link></li>
              <li><Link href="/dashboard/schemes" className="hover:text-white transition-colors">Government Health Schemes</Link></li>
            </ul>
          </div>

          {/* Col 3: Important Links */}
          <div className="space-y-3">
            <h4 className="font-sans font-bold text-sm text-portal-orange uppercase tracking-wider">
              Important Links
            </h4>
            <ul className="space-y-2 text-neutral-300 text-xs">
              <li><Link href="/architecture" className="hover:text-white transition-colors">Nexora Technical Docs</Link></li>
              <li><Link href="/dashboard/audit" className="hover:text-white transition-colors">Real-Time Status & Ledger</Link></li>
              <li><Link href="/research" className="hover:text-white transition-colors">API Reference & Research</Link></li>
              <li><Link href="/architecture" className="hover:text-white transition-colors">Trust & Cryptographic Safety</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div className="space-y-3">
            <h4 className="font-sans font-bold text-sm text-portal-orange uppercase tracking-wider">
              Contact Us
            </h4>
            <div className="space-y-2.5 text-neutral-300 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-portal-orange shrink-0 mt-0.5" />
                <span>Nexora HQ, Metropolis Medical District, Sector 4, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-portal-orange shrink-0" />
                <span>Support Toll Free: 1800-NEXORA-CARE</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-portal-orange shrink-0" />
                <span>Email: support@nexora.io</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row Portal Buttons matching screenshot */}
        <div className="pt-6 border-t border-neutral-800 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/hospital-portal/ai-training"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border-2 border-portal-orange text-portal-orange hover:bg-portal-orange hover:text-white font-bold text-xs tracking-wider transition-all"
          >
            <Building2 className="w-4 h-4" />
            <span>ORGANIZATION / HOSPITAL PORTAL LOGIN</span>
            <Lock className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/gov-portal"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border-2 border-portal-green text-portal-green hover:bg-portal-green hover:text-white font-bold text-xs tracking-wider transition-all"
          >
            <Shield className="w-4 h-4" />
            <span>ADMIN & GOV PANEL LOGIN</span>
            <Lock className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Legal Bar (#000000) */}
      <div className="bg-black py-4 px-4 border-t border-neutral-900 text-center text-[11px] text-neutral-400 space-y-1 font-sans">
        <p>Website Content Managed by <strong className="text-neutral-200">Nexora Unified Trust Administration</strong>.</p>
        <p>Designed & Hosted by <strong className="text-neutral-200">Nexora Decentralized Infrastructure</strong>.</p>
        <div className="pt-1 text-[10px] text-neutral-500 font-mono">
          Last Updated: 23 Aug 2026 • Encrypted under Zero-Knowledge Protocol
        </div>
      </div>
    </footer>
  )
}
