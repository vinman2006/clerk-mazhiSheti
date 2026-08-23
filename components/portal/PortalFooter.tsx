'use client'

import React from 'react'
import Link from 'next/link'
import { Building2, Shield, Phone, Mail, MapPin, ExternalLink, Lock } from 'lucide-react'
import { StateEmblemOfIndia } from '@/components/ui/NexoraLogo'

export function PortalFooter() {
  return (
    <footer id="contact" className="text-white text-xs font-sans">
      {/* 1. Green Action / Trust Band (#1E7A34) */}
      <div className="bg-[#1E7A34] px-4 sm:px-8 py-3.5 border-b border-[#145524] shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 font-bold text-sm text-white tracking-wide">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F5821F] inline-block"></span>
            <span>National Sovereign Health Data Infrastructure (नेक्सोरा राष्ट्रीय आरोग्य मंच)</span>
          </div>
          <div className="text-[11px] font-semibold text-emerald-100 flex items-center gap-3">
            <span>ISO/IEC 27001 Certified</span>
            <span>•</span>
            <span>ABDM Integrated</span>
            <span>•</span>
            <span>Zero-Trust Privacy</span>
          </div>
        </div>
      </div>

      {/* 2. Main 4-Column Upper Footer (#0A192F) */}
      <div className="bg-[#0A192F] px-4 sm:px-8 py-12 border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Col 1: Information */}
            <div className="space-y-3">
              <h4 className="font-sans font-bold text-sm text-[#F5821F] uppercase tracking-wider border-b border-[#1E293B] pb-2">
                Information
              </h4>
              <ul className="space-y-2 text-neutral-300 text-xs">
                <li><Link href="/architecture" className="hover:text-[#F5821F] transition-colors">About Nexora Portal</Link></li>
                <li><Link href="/hospital-portal/ai-training" className="hover:text-[#F5821F] transition-colors">Ward & District Statistics</Link></li>
                <li><Link href="/dashboard/audit" className="hover:text-[#F5821F] transition-colors">Performance & Audit Reports</Link></li>
                <li><Link href="/dashboard/consent" className="hover:text-[#F5821F] transition-colors">Citizens Charter & Privacy</Link></li>
                <li><Link href="/research" className="hover:text-[#F5821F] transition-colors">RTI & Public Disclosures</Link></li>
              </ul>
            </div>

            {/* Col 2: Services */}
            <div className="space-y-3">
              <h4 className="font-sans font-bold text-sm text-[#F5821F] uppercase tracking-wider border-b border-[#1E293B] pb-2">
                Services
              </h4>
              <ul className="space-y-2 text-neutral-300 text-xs">
                <li><Link href="/dashboard/find-care" className="hover:text-[#F5821F] transition-colors">Doctor & Hospital Booking</Link></li>
                <li><Link href="/dashboard/consent" className="hover:text-[#F5821F] transition-colors">Smart Consent Management</Link></li>
                <li><Link href="/dashboard/records" className="hover:text-[#F5821F] transition-colors">Encrypted Clinical Records</Link></li>
                <li><Link href="/dashboard/schemes" className="hover:text-[#F5821F] transition-colors">Government Health Subsidies</Link></li>
                <li><Link href="/dashboard/agents" className="hover:text-[#F5821F] transition-colors">Multi-Agent AI Tele-Consult</Link></li>
              </ul>
            </div>

            {/* Col 3: Important Links */}
            <div className="space-y-3">
              <h4 className="font-sans font-bold text-sm text-[#F5821F] uppercase tracking-wider border-b border-[#1E293B] pb-2">
                Important Links
              </h4>
              <ul className="space-y-2 text-neutral-300 text-xs">
                <li><a href="https://www.india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#F5821F] transition-colors flex items-center gap-1">National Portal of India <ExternalLink className="w-3 h-3 text-neutral-500" /></a></li>
                <li><a href="https://abdm.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#F5821F] transition-colors flex items-center gap-1">Ayushman Bharat (ABDM) <ExternalLink className="w-3 h-3 text-neutral-500" /></a></li>
                <li><a href="https://digitalindia.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#F5821F] transition-colors flex items-center gap-1">Digital India <ExternalLink className="w-3 h-3 text-neutral-500" /></a></li>
                <li><a href="https://www.mohfw.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#F5821F] transition-colors flex items-center gap-1">Ministry of Health (MoHFW) <ExternalLink className="w-3 h-3 text-neutral-500" /></a></li>
              </ul>
            </div>

            {/* Col 4: Contact Us */}
            <div className="space-y-3">
              <h4 className="font-sans font-bold text-sm text-[#F5821F] uppercase tracking-wider border-b border-[#1E293B] pb-2">
                Contact Us
              </h4>
              <div className="space-y-2.5 text-neutral-300 text-xs">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#F5821F] shrink-0 mt-0.5" />
                  <span>National Health Authority, 9th Floor, Tower-l, Jeevan Bharati Building, Connaught Place, New Delhi - 110001</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#F5821F] shrink-0" />
                  <span>Toll Free Helpline: <strong>1800-11-2026</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#F5821F] shrink-0" />
                  <span>Email: <strong>helpdesk@nexora.gov.in</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Portal Action Buttons (Matching Screenshot) */}
          <div className="pt-6 border-t border-[#1E293B] flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/gov-portal"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-[#F5821F] text-[#F5821F] hover:bg-[#F5821F] hover:text-white font-bold text-xs tracking-wider transition-all bg-[#0A192F]"
            >
              <Building2 className="w-4 h-4" />
              <span>GOVERNMENT PORTAL LOGIN</span>
              <Lock className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/hospital-portal/ai-training"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-[#1E7A34] text-[#1E7A34] hover:bg-[#1E7A34] hover:text-white font-bold text-xs tracking-wider transition-all bg-[#0A192F]"
            >
              <Shield className="w-4 h-4" />
              <span>HOSPITAL / ADMIN PANEL LOGIN</span>
              <Lock className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Official NIC & MeitY Legal Bar (#050D1A) */}
      <div className="bg-[#050D1A] py-5 px-4 text-center text-[11px] text-neutral-400 space-y-2 font-sans border-t border-[#0A192F]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <StateEmblemOfIndia className="w-7 h-9 text-neutral-400" />
            <div className="text-left text-[10px] leading-tight text-neutral-300">
              <p>Website Content Managed by <strong>Nexora National Health Administration</strong></p>
              <p>Designed, Developed and Hosted by <strong>National Informatics Centre (NIC)</strong></p>
              <p className="text-neutral-500">Ministry of Electronics & Information Technology, Government of India</p>
            </div>
          </div>

          <div className="text-right text-[10px] text-neutral-400 font-mono">
            <p>Last Updated: <strong>23 Aug 2026</strong></p>
            <p className="text-emerald-400">Status: All Systems Operational ✓</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

