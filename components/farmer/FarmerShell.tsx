'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Sprout, 
  Layers, 
  Activity, 
  Droplets, 
  Leaf, 
  Tractor, 
  ShoppingBag, 
  Landmark, 
  Bot, 
  Cpu, 
  ArrowLeft,
  Wind
} from 'lucide-react'
import { MazhiShetiLogo } from '@/components/ui/MazhiShetiLogo'
import { UserButton, useUser } from '@clerk/nextjs'
import { useLanguage } from '@/lib/languageContext'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import dynamic from 'next/dynamic'

const NotificationInbox = dynamic(() => import('@/components/ui/NotificationInbox'), { ssr: false })

interface FarmerShellProps {
  children: React.ReactNode
  userRole?: string
}

export default function FarmerShell({ children, userRole }: FarmerShellProps) {
  const pathname = usePathname()
  const { user } = useUser()
  const { t } = useLanguage()

  const navItems = [
    { href: '/farmer/dashboard', label: t('farmer_command_center'), icon: Activity, badge: 'Live' },
    { href: '/farmer/fields', label: t('farmer_my_fields'), icon: Layers },
    { href: '/farmer/soil', label: t('farmer_soil_health'), icon: Sprout },
    { href: '/farmer/irrigation', label: t('farmer_irrigation'), icon: Droplets, badge: 'Active' },
    { href: '/farmer/organic', label: t('farmer_organic'), icon: Leaf },
    { href: '/farmer/no-till', label: 'No-Till Farming', icon: Wind },
    { href: '/farmer/devices', label: 'Smart Devices', icon: Cpu },
    { href: '/farmer/equipment', label: t('farmer_tractor_rental'), icon: Tractor },
    { href: '/farmer/marketplace', label: t('farmer_crop_market'), icon: ShoppingBag },
    { href: '/farmer/finance', label: t('farmer_finance'), icon: Landmark },
    { href: '/farmer/assistant', label: t('farmer_ai_assistant'), icon: Bot },
  ]

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col selection:bg-emerald-500/25 selection:text-emerald-400">
      
      {/* Top Application Bar - Rounded Floating Navbar */}
      <header className="sticky top-2 z-40 px-3 sm:px-6 pt-2 pb-1 pointer-events-none">
        <div className="max-w-7xl mx-auto rounded-2xl bg-[#0B142A]/90 backdrop-blur-xl border border-white/15 px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-2xl pointer-events-auto ring-1 ring-white/10">
          <div className="flex items-center gap-6">
            <Link href="/farmer/dashboard" className="flex items-center gap-2">
              <MazhiShetiLogo size={30} showText={true} showBadge={false} roleLabel="Farmer" subtitle="SOVEREIGN AGRI PLATFORM" />
            </Link>

            {/* Farm Switcher / Badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono">
              <span className="text-blue-300">Active Farm:</span>
              <span className="font-bold text-white">
                {user?.fullName ? `${user.fullName}'s Farm` : 'Patil Krishi Sanjivani'}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
            </div>
          </div>

          {/* Right Status Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Language Switcher Button directly in Navbar */}
            <LanguageSwitcher compact={true} />

            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-blue-100 text-xs font-sans transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>

            {/* Novu Notification Inbox */}
            <NotificationInbox />

            {/* Verified Role Indicator */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold">Farmer Role</span>
            </div>

            <UserButton 
              appearance={{
                elements: {
                  userButtonAvatarBox: 'w-8 h-8 rounded-xl border border-emerald-500/40 shadow-sm',
                }
              }}
            />
          </div>
        </div>
      </header>

      {/* Sub-Navigation Strip (Horizontally Scrollable on Mobile) */}
      <nav className="bg-[#091024] border-b border-white/10 px-4 sm:px-8 overflow-x-auto no-scrollbar py-2">
        <div className="flex items-center gap-1 min-w-max">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/farmer/dashboard' && pathname.startsWith(item.href))
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs font-sans font-medium transition-all flex items-center gap-2 select-none ${
                  isActive
                    ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold shadow-sm shadow-emerald-950/30'
                    : 'text-blue-200/70 hover:text-white hover:bg-white/[0.05] border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-blue-300/60'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-mono font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Main Module Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
        {children}
      </main>

      {/* Footer System Status */}
      <footer className="border-t border-white/10 bg-[#060913] py-4 px-6 text-center text-xs font-mono text-blue-200/50 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Mazhi Sheti Engine v1.0 • All 4 Fields Operational • IoT Gateway Connected</span>
        </div>
        <div>
          <span>Your Data Is Private • Governed by Cryptographic Farmer Consent</span>
        </div>
      </footer>

    </div>
  )
}
