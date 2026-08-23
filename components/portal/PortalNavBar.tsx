'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, LogIn, UserPlus, Menu, X } from 'lucide-react'

export function PortalNavBar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/dashboard/find-care' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Multi-Agent', href: '/dashboard/agents' },
    { label: 'About Us', href: '/architecture' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav className="bg-[#1E3A8A] text-white px-4 sm:px-8 py-2.5 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Nav links */}
        <div className="hidden lg:flex items-center gap-1 font-sans text-xs font-semibold tracking-wide">
          {navLinks.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`px-3.5 py-1.5 rounded transition-colors ${
                  isActive
                    ? 'bg-white/20 text-white font-bold'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Mobile menu toggle */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded bg-white/10 text-white hover:bg-white/20"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Center/Right: Search & Auth Buttons */}
        <div className="flex items-center gap-3">
          {/* Search bar matching screenshot */}
          <div className="relative hidden sm:block w-48 lg:w-60">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-8 pr-3 py-1.5 rounded bg-black/20 text-white text-xs border border-white/20 placeholder:text-white/60 focus:outline-none focus:bg-black/30 focus:border-white/40"
            />
            <Search className="w-3.5 h-3.5 text-white/60 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Auth Action Buttons */}
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className={`px-4 py-1.5 rounded text-xs font-bold uppercase transition-all tracking-wider border border-white/80 hover:bg-white hover:text-portal-blue ${
                pathname === '/login' ? 'bg-white text-portal-blue' : 'text-white'
              }`}
            >
              LOGIN
            </Link>

            <Link
              href="/register"
              className="px-4 py-1.5 rounded text-xs font-bold uppercase bg-portal-orange hover:bg-[#e07507] text-white shadow-sm transition-all tracking-wider font-sans"
            >
              REGISTER
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden pt-3 pb-2 border-t border-white/10 mt-2 space-y-1 text-xs">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded text-white/90 hover:bg-white/10 font-semibold"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
