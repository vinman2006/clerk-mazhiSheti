'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Menu, X, LogIn, Settings, Sprout, CloudSun, TrendingUp, ShieldCheck } from 'lucide-react'
import { FarmerLogo } from '@/components/ui/FarmerLogo'
import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs'
import dynamic from 'next/dynamic'

const NotificationInbox = dynamic(() => import('@/components/ui/NotificationInbox'), { ssr: false })

interface TaskbarProps {
  onSettingsClick?: () => void
}

export function Taskbar({ onSettingsClick }: TaskbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<string>('overview')
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    {
      id: 'overview',
      label: 'Overview',
      icon: Sprout,
      badge: 'Live',
    },
    {
      id: 'crop-advisory',
      label: 'Crop Advisory',
      icon: Sprout,
    },
    {
      id: 'market-rates',
      label: 'Mandi Rates',
      icon: TrendingUp,
    },
    {
      id: 'weather',
      label: 'Weather & Soil',
      icon: CloudSun,
    },
    {
      id: 'schemes',
      label: 'Govt Schemes',
      icon: ShieldCheck,
    },
  ]

  return (
    <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 flex flex-col items-center px-3 sm:px-6 pointer-events-none transition-all duration-300">
      {/* Floating Rounded Island Navbar */}
      <div
        className={`pointer-events-auto w-full max-w-6xl rounded-2xl transition-all duration-300 border backdrop-blur-xl shadow-2xl ${
          scrolled
            ? 'bg-[#0B1736]/95 border-orange-500/40 shadow-black/80 py-2 px-3 sm:px-4'
            : 'bg-[#0B1736]/85 border-white/10 hover:border-orange-500/30 shadow-black/50 py-2.5 px-3.5 sm:px-5'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo with agricultural emblem */}
          <Link href="/" className="group shrink-0 relative z-10 flex items-center">
            <FarmerLogo size={34} showText={true} showBadge={true} subtitle="SMART AGRI-TECH PLATFORM" />
          </Link>

          {/* Desktop Navigation Links with Smooth Animated Pill */}
          <nav
            className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]"
            onMouseLeave={() => setHoveredTab(null)}
          >
            {navLinks.map((link) => {
              const isActive = activeTab === link.id
              const isHovered = hoveredTab === link.id

              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  onMouseEnter={() => setHoveredTab(link.id)}
                  className={`relative px-3.5 py-1.5 rounded-lg text-xs font-sans font-medium transition-colors duration-200 flex items-center gap-1.5 select-none ${
                    isActive ? 'text-white font-bold' : 'text-blue-100/75 hover:text-white'
                  }`}
                >
                  {/* Sliding animated background capsule */}
                  {(isHovered || (isActive && !hoveredTab)) && (
                    <motion.div
                      layoutId="taskbar-hover-pill"
                      className={`absolute inset-0 rounded-lg -z-10 ${
                        isActive
                          ? 'bg-orange-500/20 border border-orange-500/40 shadow-sm shadow-orange-950/30'
                          : 'bg-white/10 border border-white/10'
                      }`}
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 450,
                        damping: 32,
                      }}
                    />
                  )}

                  <span>{link.label}</span>

                  {link.badge && (
                    <span className="px-1.5 py-0.5 rounded bg-white/10 text-orange-400 border border-white/10 text-[9px] font-mono font-bold tracking-tight">
                      {link.badge}
                    </span>
                  )}

                  {/* Active bottom glow indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="taskbar-active-dot"
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-2.5 h-0.5 rounded-full bg-orange-400 shadow-[0_0_8px_#F5820D]"
                    />
                  )}
                </button>
              )
            })}
          </nav>

          {/* Right Actions: Settings Status Pill + Clerk Auth Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Settings Status Pill */}
            <button
              onClick={onSettingsClick}
              type="button"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-blue-100/80 hover:text-white text-xs font-mono font-semibold transition-all shadow-sm group"
            >
              <Settings className="w-3.5 h-3.5 text-blue-200 group-hover:rotate-45 transition-transform duration-300" />
              <span>Settings</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399] animate-pulse" />
            </button>

            {/* Novu Notification Inbox */}
            <NotificationInbox />

            {/* Proper Role-Based Access Link */}
            <Link
              href="/auth/select"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 text-xs font-mono font-semibold text-blue-100 hover:text-white transition-all shadow-sm group"
              title="Select Role Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Role Portals</span>
            </Link>

            {/* Clerk Authentication Controls */}
            <Show when="signed-out">
              <Link
                href="/auth/select"
                className="relative group inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-sans font-bold uppercase tracking-wider bg-gradient-to-r from-[#F5820D] to-[#E0821F] hover:from-[#FFA726] hover:to-[#F5820D] text-white shadow-md shadow-orange-950/50 border border-orange-400/40 hover:border-orange-300 transition-all duration-200 active:scale-[0.98] overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
                <LogIn className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                <span>SIGN IN</span>
                <ArrowRight className="w-3 h-3 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>

              <Link
                href="/auth/select"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white text-xs font-sans font-bold uppercase tracking-wider transition-all duration-200 shadow-sm"
              >
                <span>REGISTER</span>
              </Link>
            </Show>

            <Show when="signed-in">
              <div className="flex items-center gap-2 pl-1">
                <Link
                  href="/farmer/dashboard"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold transition-all shadow-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Farm OS</span>
                </Link>

                <UserButton 
                  appearance={{
                    elements: {
                      userButtonAvatarBox: 'w-8 h-8 rounded-xl border border-orange-500/40 shadow-md',
                    }
                  }}
                />
              </div>
            </Show>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden border-t border-white/10 pt-3 mt-2 pb-2 space-y-3"
            >
              <nav className="flex flex-col space-y-1 text-sm font-sans font-medium text-neutral-200">
                {navLinks.map((link) => {
                  const isActive = activeTab === link.id
                  return (
                    <button
                      key={link.id}
                      onClick={() => {
                        setActiveTab(link.id)
                        setMobileMenuOpen(false)
                      }}
                      className={`p-2 rounded-lg transition-colors flex items-center justify-between text-left ${
                        isActive
                          ? 'bg-orange-500/20 text-orange-400 font-bold border border-orange-500/30'
                          : 'hover:bg-white/5 text-neutral-200'
                      }`}
                    >
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono text-orange-400 font-bold">
                          {link.badge}
                        </span>
                      )}
                    </button>
                  )
                })}
              </nav>

              {/* Mobile Auth Actions */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <Show when="signed-out">
                  <SignInButton mode="modal">
                    <button
                      type="button"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-2.5 rounded-xl text-center text-xs font-bold bg-gradient-to-r from-[#F5820D] to-[#E0821F] text-white uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-orange-950/40"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>SIGN IN</span>
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button
                      type="button"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-2 rounded-xl text-center text-xs font-bold bg-white/[0.08] hover:bg-white/[0.14] text-white uppercase tracking-wider border border-white/10"
                    >
                      <span>REGISTER NEW ACCOUNT</span>
                    </button>
                  </SignUpButton>
                </Show>

                <Show when="signed-in">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.05] border border-white/10">
                    <span className="text-xs text-blue-200">Your Account</span>
                    <UserButton />
                  </div>
                </Show>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-300">
                <span>System Status</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Clerk Auth Active
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
