'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sprout, 
  Landmark, 
  Tractor, 
  Microscope, 
  ShieldAlert, 
  ChevronDown, 
  Check, 
  ExternalLink,
  Sparkles,
  ShieldCheck,
  UserCheck
} from 'lucide-react'
import { useUser } from '@clerk/nextjs'

interface PitchRoleSwitcherProps {
  currentRole?: 'farmer' | 'bank' | 'provider' | 'expert' | 'admin' | 'portal'
}

export default function PitchRoleSwitcher({ currentRole }: PitchRoleSwitcherProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const { user, isLoaded, isSignedIn } = useUser()

  // Detect role from pathname if not explicitly passed
  const activeRoleKey = currentRole || (
    pathname.startsWith('/bank') ? 'bank' :
    pathname.startsWith('/provider') ? 'provider' :
    pathname.startsWith('/expert') ? 'expert' :
    pathname.startsWith('/admin') ? 'admin' :
    pathname.startsWith('/farmer') ? 'farmer' : 'portal'
  )

  const roles = [
    {
      id: 'farmer',
      title: 'Farmer OS',
      subtitle: 'Individual Cultivator',
      icon: Sprout,
      href: '/farmer/dashboard',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30',
      badge: 'Patil Farm',
    },
    {
      id: 'bank',
      title: 'Institutional Bank',
      subtitle: 'Credit & KCC Underwriter',
      icon: Landmark,
      href: '/bank/dashboard',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/30',
      badge: 'MSCB Bank',
    },
    {
      id: 'provider',
      title: 'Fleet Provider',
      subtitle: 'Machinery & Tractor Hub',
      icon: Tractor,
      href: '/provider/dashboard',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10 hover:bg-orange-500/20 border-orange-500/30',
      badge: 'Agro Fleet',
    },
    {
      id: 'expert',
      title: 'Agronomist Advisory',
      subtitle: 'Soil & Crop Scientist',
      icon: Microscope,
      href: '/expert/dashboard',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/30',
      badge: 'MPKV Certified',
    },
    {
      id: 'admin',
      title: 'Platform Super Admin',
      subtitle: 'Audit & Governance',
      icon: ShieldAlert,
      href: '/admin/dashboard',
      color: 'text-red-400',
      bgColor: 'bg-red-500/10 hover:bg-red-500/20 border-red-500/30',
      badge: 'Gov & Security',
    },
  ]

  const activeRole = roles.find((r) => r.id === activeRoleKey) || roles[0]
  const ActiveIcon = activeRole.icon

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 text-xs font-sans transition-all shadow-sm active:scale-98"
        aria-expanded={open}
        title="Quickly switch roles during presentation"
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <ActiveIcon className={`w-3.5 h-3.5 ${activeRole.color}`} />
          <span className="font-semibold text-white hidden sm:inline">{activeRole.title}</span>
        </div>

        <span className="px-1.5 py-0.2 rounded bg-white/10 text-orange-300 font-mono text-[10px] font-bold">
          PITCH ROLE
        </span>

        <ChevronDown
          className={`w-3.5 h-3.5 text-blue-200/70 transition-transform duration-200 ${
            open ? 'rotate-180 text-white' : 'group-hover:text-white'
          }`}
        />
      </button>

      {/* Role Switcher Dropdown Popover */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#0C1630]/95 backdrop-blur-2xl border border-white/15 p-3.5 shadow-2xl shadow-black/80 z-50 space-y-3"
          >
            {/* Header / Clerk User State */}
            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm">
                  {user?.firstName ? user.firstName[0] : <UserCheck className="w-4 h-4" />}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-white truncate">
                      {user?.fullName || 'Pitch Presenter'}
                    </p>
                    <span className="px-1 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-mono font-bold">
                      CLERK AUTH
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-blue-200/70 truncate">
                    {user?.primaryEmailAddress?.emailAddress || 'demo.presenter@mazhisheti.org'}
                  </p>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-bold">
                  <ShieldCheck className="w-3 h-3" />
                  Live Token
                </span>
              </div>
            </div>

            {/* Pitch Switcher Notice */}
            <div className="px-1 flex items-center justify-between text-[11px] font-mono text-blue-200/60">
              <span>SWITCH ECOSYSTEM ROLE:</span>
              <span className="text-orange-400 font-bold">5 Portals Connected</span>
            </div>

            {/* Role List */}
            <div className="space-y-1.5">
              {roles.map((r) => {
                const isCurrent = r.id === activeRoleKey
                const Icon = r.icon

                return (
                  <Link
                    key={r.id}
                    href={r.href}
                    onClick={() => setOpen(false)}
                    className={`group flex items-center justify-between p-2.5 rounded-xl border transition-all text-left ${
                      isCurrent
                        ? `${r.bgColor} shadow-md`
                        : 'bg-white/[0.02] hover:bg-white/[0.07] border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isCurrent ? 'bg-white/10 text-white' : 'bg-white/[0.04] ' + r.color
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold ${isCurrent ? 'text-white' : 'text-slate-200'}`}>
                            {r.title}
                          </span>
                          <span className="px-1.5 py-0.2 rounded bg-white/10 text-[9px] font-mono text-blue-200">
                            {r.badge}
                          </span>
                        </div>
                        <p className="text-[10px] font-sans text-blue-200/60 mt-0.5">
                          {r.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isCurrent ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <span className="text-xs text-blue-200/40 group-hover:text-white transition-colors">
                          →
                        </span>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Footer Quick Links */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono px-1">
              <Link
                href="/auth/select"
                onClick={() => setOpen(false)}
                className="text-blue-300 hover:text-white transition-colors flex items-center gap-1"
              >
                <span>Role Gateway</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="text-orange-400 hover:text-orange-300 transition-colors"
              >
                Portal Home →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
