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
  FileCheck,
  User
} from 'lucide-react'
import { useAuth } from '@/lib/authContext'
import { useUserData } from '@/lib/userDataContext'
import { SimulatedBadge } from '@/components/ui/SimulatedBadge'
import { NexoraLogo, StateEmblemOfIndia } from '@/components/ui/NexoraLogo'
import { OnboardingModal } from '@/components/onboarding/OnboardingModal'
import { WalletConnectButton } from '@/components/wallet/WalletConnectButton'

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
    { label: 'Citizen Overview (मुख्यपृष्ठ)', href: '/dashboard', icon: Activity },
    { label: 'Profile & Key Vault (प्रोफाइल)', href: '/dashboard/profile', icon: User },
    { label: 'Clinical Data Store (वैद्यकीय नोंदी)', href: '/dashboard/medical', icon: FileCheck, badge: 'Mongo' },
    { label: 'AI Health Assistant (एआय सल्लागार)', href: '/dashboard/agents', icon: Bot, badge: 'Live' },
    { label: 'Smart Consent Center (संमती केंद्र)', href: '/dashboard/consent', icon: Scale },
    { label: 'Immutable Audit Ledger (लेखापरीक्षण)', href: '/dashboard/audit', icon: FileText },
    { label: 'Book Doctor & Care (डॉक्टर बुकिंग)', href: '/dashboard/find-care', icon: Search },
    { label: 'Encrypted Records (आरोग्य दस्तऐवज)', href: '/dashboard/records', icon: Database },
    { label: 'Appointments (अपॉइंटमेंट्स)', href: '/dashboard/appointments', icon: Calendar },
    { label: 'Gov Health Schemes (आरोग्य योजना)', href: '/dashboard/schemes', icon: Landmark },
  ]

  const portalShortcuts = [
    { label: 'Hospital AI Portal', href: '/hospital-portal/ai-training', icon: Building2 },
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
    <div className="min-h-screen bg-[#F4F6F9] text-[#1A1A1A] flex flex-col md:flex-row font-sans antialiased">
      {/* MOBILE TOPBAR */}
      <div className="md:hidden flex items-center justify-between p-3.5 bg-[#0B3D91] text-white border-b-4 border-[#F5821F] sticky top-0 z-40 shadow-md">
        <Link href="/">
          <div className="flex items-center gap-2">
            <StateEmblemOfIndia className="w-6 h-7 text-white" />
            <div>
              <span className="font-black text-sm text-white tracking-wide block">NEXORA</span>
              <span className="text-[9px] text-[#FDBA74] font-medium block -mt-0.5">Citizen Enclave</span>
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <WalletConnectButton />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 rounded bg-white/10 border border-white/20 text-white"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#0B3D91] text-white border-r-2 border-[#F5821F] flex flex-col justify-between transition-transform duration-200 shadow-xl
        md:translate-x-0 md:static md:w-64 lg:w-72 shrink-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 space-y-5 overflow-y-auto">
          {/* Logo Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/20">
            <Link href="/" className="flex items-center gap-2.5 group">
              <StateEmblemOfIndia className="w-7 h-9 text-white shrink-0" />
              <div>
                <span className="font-black text-base text-white tracking-wider block">NEXORA</span>
                <span className="text-[10px] text-[#FDBA74] font-medium block -mt-0.5">
                  Citizen Health Enclave
                </span>
              </div>
            </Link>
          </div>

          {/* User Profile DID Card */}
          <Link href="/dashboard/profile" className="block group">
            <div className="p-3 rounded-lg bg-[#07265E] border border-white/20 border-l-4 border-l-[#F5821F] space-y-2 shadow-sm group-hover:border-[#F5821F] transition-all">
              <div className="flex items-center gap-2.5">
                <img
                  src={profile.avatarUrl || user.avatarUrl}
                  alt={profile.name || user.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-[#F5821F] shadow-sm bg-white"
                />
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-xs text-white block truncate group-hover:text-[#FDBA74] transition-colors">
                    {profile.name || user.name}
                  </span>
                  <span className="text-[10px] text-emerald-300 capitalize block font-semibold">
                    {user.role === 'patient' ? 'Verified Citizen ✓' : user.role.replace('_', ' ')}
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
                className="flex items-center justify-between p-1.5 rounded bg-black/25 border border-white/10 text-[10px] font-mono text-neutral-200 hover:text-white hover:border-[#F5821F] cursor-pointer transition-all"
                title="Click to copy sovereign DID"
              >
                <div className="flex items-center gap-1 truncate">
                  <span className="text-[#F5821F] font-bold">DID:</span>
                  <span className="truncate">{profile.did || user.did}</span>
                </div>
                {copiedDid ? <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <Copy className="w-3.5 h-3.5 text-neutral-400 shrink-0" />}
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="space-y-1">
            <span className="px-2 text-[10px] text-[#FDBA74] font-bold uppercase tracking-wider block mb-1.5">
              Citizen Services
            </span>
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded text-xs transition-all ${
                    isActive
                      ? 'bg-[#F5821F] text-white font-bold shadow-sm'
                      : 'text-neutral-100 hover:bg-white/10 hover:text-white font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                      isActive ? 'bg-[#0B3D91] text-white' : 'bg-[#1E7A34] text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Other Ecosystem Portals */}
          <div className="space-y-1 pt-3 border-t border-white/20">
            <span className="px-2 text-[10px] text-neutral-300 font-bold uppercase tracking-wider block mb-1.5">
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
                  className={`flex items-center justify-between px-3 py-1.5 rounded text-xs transition-all ${
                    isCurr
                      ? 'bg-[#F5821F] text-white font-bold'
                      : 'text-neutral-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-[#FDBA74]" />
                    <span>{portal.label}</span>
                  </div>
                  <ChevronRight className="w-3 h-3 opacity-60" />
                </Link>
              )
            })}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-white/20 bg-[#07265E] flex items-center justify-between text-xs">
          <SimulatedBadge variant="inline" />
          <Link href="/" className="text-neutral-200 hover:text-[#FDBA74] transition-colors flex items-center gap-1 text-[11px] font-bold">
            <LogOut className="w-3 h-3" />
            <span>Portal Home</span>
          </Link>
        </div>
      </aside>

      {/* BACKDROP FOR MOBILE */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        ></div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#F4F6F9]">
        {/* Desktop Top Status Utility Bar */}
        <header className="hidden md:flex items-center justify-between px-6 py-2.5 bg-white border-b border-[#E0E0E0] sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-[#1E7A34] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#1E7A34] animate-pulse"></span>
              Sovereign Citizen Gateway Active
            </span>
            <span className="text-neutral-300">|</span>
            <span className="text-neutral-600 font-medium">
              Ministry of Health & Family Welfare • Government of India
            </span>
          </div>

          <div className="flex items-center gap-3">
            <SimulatedBadge variant="inline" />
            <WalletConnectButton />
          </div>
        </header>

        {/* Tricolor Indicator Line */}
        <div className="h-1 w-full flex">
          <div className="w-1/3 bg-[#F5821F]"></div>
          <div className="w-1/3 bg-white"></div>
          <div className="w-1/3 bg-[#1E7A34]"></div>
        </div>

        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>

      {/* SOVEREIGN ONBOARDING MODAL */}
      <OnboardingModal />
    </div>
  )
}

