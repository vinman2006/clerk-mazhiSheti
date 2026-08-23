'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Shield, 
  Bot, 
  Scale, 
  FileText, 
  Search, 
  Calendar, 
  Database, 
  Landmark, 
  Building2, 
  Microscope, 
  Menu, 
  X, 
  Copy, 
  Check, 
  ChevronRight,
  Activity,
  Layers,
  LogOut,
  FileCheck
} from 'lucide-react'
import { useAuth } from '@/lib/authContext'
import { useUserData } from '@/lib/userDataContext'
import { SimulatedBadge } from '@/components/ui/SimulatedBadge'
import { NexoraLogo } from '@/components/ui/NexoraLogo'
import { User } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { user } = useAuth()
  const { profile } = useUserData()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [copiedDid, setCopiedDid] = useState(false)

  const navItems = [
    { label: 'Patient Overview', href: '/dashboard', icon: Activity },
    { label: 'Profile & Key Vault', href: '/dashboard/profile', icon: User },
    { label: 'Hash-Linked Clinical Store', href: '/dashboard/medical', icon: FileCheck, badge: 'Mongo' },
    { label: 'Multi-Agent Assistant', href: '/dashboard/agents', icon: Bot, badge: 'Active' },
    { label: 'Consent Management', href: '/dashboard/consent', icon: Scale },
    { label: 'Immutable Audit Trail', href: '/dashboard/audit', icon: FileText },
    { label: 'Find Care & Doctors', href: '/dashboard/find-care', icon: Search },
    { label: 'Medical Records', href: '/dashboard/records', icon: Database },
    { label: 'Appointments', href: '/dashboard/appointments', icon: Calendar },
    { label: 'Gov Health Schemes', href: '/dashboard/schemes', icon: Landmark },
  ]

  const portalShortcuts = [
    { label: 'Hospital Portal', href: '/hospital-portal/ai-training', icon: Building2 },
    { label: 'Government Portal', href: '/gov-portal', icon: Landmark },
    { label: 'Research Portal', href: '/research', icon: Microscope },
    { label: 'System Architecture', href: '/architecture', icon: Layers },
  ]

  const handleCopyDid = () => {
    const didToCopy = profile.did || user.did
    if (didToCopy) {
      navigator.clipboard.writeText(didToCopy)
      setCopiedDid(true)
      setTimeout(() => setCopiedDid(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0E17] text-white flex flex-col md:flex-row">
      {/* MOBILE TOPBAR */}
      <div className="md:hidden flex items-center justify-between p-3.5 bg-[#1E3A8A] border-b-2 border-portal-orange sticky top-0 z-40 shadow-md">
        <Link href="/">
          <NexoraLogo size={32} showText={true} showBadge={false} subtitle="Patient Enclave" />
        </Link>

        <div className="flex items-center gap-2">
          <SimulatedBadge variant="inline" />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 rounded-md bg-white/10 border border-white/20 text-white"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#152A63] border-r-2 border-portal-orange/40 flex flex-col justify-between transition-transform duration-200 shadow-2xl
        md:translate-x-0 md:static md:w-64 lg:w-72 shrink-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-5 space-y-6 overflow-y-auto">
          {/* Logo Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/15">
            <Link href="/" className="group">
              <NexoraLogo size={38} showText={true} showBadge={true} subtitle="Patient Health Enclave" />
            </Link>
          </div>

          {/* User Profile DID Card */}
          <Link href="/dashboard/profile" className="block group">
            <div className="p-3.5 rounded-lg bg-[#101420] border border-neutral-700 border-l-4 border-l-portal-orange space-y-2.5 shadow-md group-hover:border-portal-orange transition-all">
              <div className="flex items-center gap-2.5">
                <img
                  src={profile.avatarUrl || user.avatarUrl}
                  alt={profile.name || user.name}
                  className="w-9 h-9 rounded-full object-cover border-2 border-portal-orange shadow-sm"
                />
                <div className="flex-1 min-w-0">
                  <span className="font-sans font-bold text-xs text-white block truncate group-hover:text-portal-orange transition-colors">
                    {profile.name || user.name}
                  </span>
                  <span className="text-[10px] font-mono font-semibold text-portal-green capitalize block">
                    {user.role === 'patient' ? 'Sovereign Patient ✓' : user.role.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Sovereign DID block */}
              <div 
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleCopyDid()
                }}
                className="flex items-center justify-between p-2 rounded bg-[#141826] border border-neutral-700 text-[10px] font-mono text-neutral-300 hover:text-white hover:border-portal-orange cursor-pointer transition-all shadow-sm"
                title="Click to copy sovereign DID"
              >
                <div className="flex items-center gap-1 truncate">
                  <span className="text-portal-orange font-bold">DID:</span>
                  <span className="truncate">{profile.did || user.did}</span>
                </div>
                {copiedDid ? <Check className="w-3.5 h-3.5 text-portal-green shrink-0" /> : <Copy className="w-3.5 h-3.5 text-neutral-400 shrink-0" />}
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="space-y-1">
            <span className="px-2 font-mono text-[10px] text-portal-orange-light font-bold uppercase tracking-wider block mb-2">
              Patient Portal
            </span>
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-sans transition-all ${
                    isActive
                      ? 'bg-[#101420] text-portal-orange border border-neutral-700 border-l-4 border-l-portal-orange font-bold shadow-md'
                      : 'text-neutral-200 hover:text-white hover:bg-white/10 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-portal-orange' : 'text-neutral-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="px-1.5 py-0.2 rounded bg-portal-green text-[9px] font-mono font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Other Ecosystem Portals */}
          <div className="space-y-1 pt-4 border-t border-white/15">
            <span className="px-2 font-mono text-[10px] text-neutral-300 font-bold uppercase tracking-wider block mb-2">
              Ecosystem Portals
            </span>
            {portalShortcuts.map((portal) => {
              const Icon = portal.icon
              const isCurr = pathname === portal.href

              return (
                <Link
                  key={portal.href}
                  href={portal.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-[11px] font-mono transition-all ${
                    isCurr
                      ? 'bg-[#101420] text-portal-orange font-bold border border-neutral-700'
                      : 'text-neutral-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-portal-orange" />
                    <span>{portal.label}</span>
                  </div>
                  <ChevronRight className="w-3 h-3 opacity-60" />
                </Link>
              )
            })}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/15 bg-[#0D1B4C] flex items-center justify-between text-xs font-mono">
          <SimulatedBadge variant="inline" />
          <Link href="/" className="text-neutral-300 hover:text-portal-orange transition-colors flex items-center gap-1 text-[11px] font-bold">
            <LogOut className="w-3 h-3" />
            <span>Home</span>
          </Link>
        </div>
      </aside>

      {/* BACKDROP FOR MOBILE */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
        ></div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-gradient-to-b from-[#0D1B4C] via-[#101525] to-[#0B0E17]">
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  )
}
