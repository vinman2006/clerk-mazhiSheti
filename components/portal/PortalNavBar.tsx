'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Bot, Shield, FileText } from 'lucide-react'

export function PortalNavBar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'HOME', href: '/' },
    { label: 'SERVICES', href: '/#services' },
    { label: 'DASHBOARD', href: '/dashboard' },
    { label: 'DOCTORS & CLINICS', href: '/dashboard/find-care' },
    { label: 'SMART CONSENT', href: '/dashboard/consent' },
    { label: 'HEALTH RECORDS', href: '/dashboard/records' },
    { label: 'GOV SCHEMES', href: '/dashboard/schemes' },
    { label: 'AUDIT LEDGER', href: '/dashboard/audit' },
    { label: 'MULTI-AGENT AI', href: '/dashboard/agents' },
    { label: 'ABOUT US', href: '/architecture' },
    { label: 'CONTACT', href: '#contact' },
  ]

  return (
    <nav className="bg-[#0B3D91] text-white px-4 sm:px-8 py-0 border-b-2 border-[#F5821F] shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center space-x-0.5 font-sans text-[12px] font-bold tracking-wider">
          {navLinks.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`px-3.5 py-3 transition-colors flex items-center gap-1 border-b-2 ${
                  isActive
                    ? 'bg-[#07265E] text-[#F5821F] border-[#F5821F]'
                    : 'text-white/95 hover:bg-[#07265E] hover:text-[#F5821F] border-transparent'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Mobile Header Bar */}
        <div className="lg:hidden flex items-center justify-between w-full py-2.5">
          <span className="text-xs font-bold tracking-wider text-white">NEXORA E-GOVERNANCE MENU</span>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded bg-white/10 text-white hover:bg-white/20"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Right Portal Badge */}
        <div className="hidden lg:flex items-center gap-2 py-1.5">
          <Link
            href="/gov-portal"
            className="px-2.5 py-1 rounded bg-[#1E7A34] hover:bg-[#145524] text-white text-[11px] font-bold tracking-wide flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Gov Portal</span>
          </Link>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden py-3 border-t border-white/20 space-y-1 text-xs bg-[#07265E]">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-white hover:bg-white/10 font-bold border-l-4 border-transparent hover:border-[#F5821F]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

