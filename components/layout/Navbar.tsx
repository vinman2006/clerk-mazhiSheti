'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Menu, X, LogIn } from 'lucide-react'
import { useAuth } from '@/lib/authContext'
import { useLanguage } from '@/lib/languageContext'
import { NexoraLogo } from '@/components/ui/NexoraLogo'
import { SettingsMenu } from '@/components/ui/SettingsMenu'
import { useSettings } from '@/lib/settingsContext'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)
  const pathname = usePathname()
  const { user } = useAuth()
  const { t, language, setLanguage } = useLanguage()
  const { hero3DEnabled, toggleHero3D } = useSettings()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    {
      href: '/architecture',
      label: t('nav_architecture'),
      badge: t('nav_spec'),
    },
    {
      href: '/hospital-portal/ai-training',
      label: t('nav_hospitals'),
    },
    {
      href: '/gov-portal',
      label: t('nav_government'),
    },
    {
      href: '/research',
      label: t('nav_research'),
    },
  ]

  return (
    <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 flex flex-col items-center px-3 sm:px-6 pointer-events-none transition-all duration-300">
      {/* Floating Rounded Island Navbar */}
      <div
        className={`pointer-events-auto w-full max-w-6xl rounded-2xl transition-all duration-300 border backdrop-blur-xl shadow-2xl ${
          scrolled
            ? 'bg-[#0B1736]/90 border-nexora-orange-500/40 shadow-black/70 py-2 px-3 sm:px-4'
            : 'bg-[#0B1736]/80 border-white/10 hover:border-nexora-orange-500/30 shadow-black/50 py-2.5 px-3.5 sm:px-5'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo with official seal circular badge ring */}
          <Link href="/" className="group shrink-0 relative z-10 flex items-center">
            <NexoraLogo size={32} showText={true} showBadge={true} subtitle="ZERO-TRUST HEALTH NET" />
          </Link>

          {/* Desktop Navigation Links with Smooth Animated Hover Pill & Active State */}
          <nav
            className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]"
            onMouseLeave={() => setHoveredPath(null)}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              const isHovered = hoveredPath === link.href

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredPath(link.href)}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-colors duration-200 flex items-center gap-1.5 select-none ${
                    isActive ? 'text-white font-bold' : 'text-blue-100/75 hover:text-white'
                  }`}
                >
                  {/* Sliding animated background capsule on hover/active */}
                  {(isHovered || (isActive && !hoveredPath)) && (
                    <motion.div
                      layoutId="navbar-hover-pill"
                      className={`absolute inset-0 rounded-lg -z-10 ${
                        isActive
                          ? 'bg-nexora-orange-500/20 border border-nexora-orange-500/40 shadow-sm shadow-orange-950/30'
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
                    <span className="px-1.5 py-0.5 rounded bg-white/10 text-nexora-orange-400 border border-white/10 text-[9px] font-mono font-bold tracking-tight">
                      {link.badge}
                    </span>
                  )}

                  {/* Active bottom glow indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-dot"
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-2.5 h-0.5 rounded-full bg-nexora-orange-400 shadow-[0_0_8px_#F5820D]"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right Actions: Settings (Language + 3D Toggle) + Single 'Sign In / Register' Button */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Settings Popover Button (contains Language selector + 3D background toggle) */}
            <SettingsMenu />

            {/* Single Combined 'Sign In / Register' Button redirecting to /login */}
            <Link
              href="/login"
              className="gsap-magnetic relative group inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-sans font-bold uppercase tracking-wider bg-gradient-to-r from-nexora-orange-500 to-amber-500 hover:from-nexora-orange-600 hover:to-amber-600 text-white shadow-md shadow-orange-950/40 border border-orange-400/40 hover:border-orange-300 transition-all duration-200 active:scale-[0.98] overflow-hidden"
            >
              {/* Subtle shining light sweep across button on hover */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

              <LogIn className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              <span>{t('nav_sign_in_register')}</span>
              <ArrowRight className="w-3 h-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>

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

        {/* Mobile Dropdown Drawer inside floating island */}
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
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`p-2 rounded-lg transition-colors flex items-center justify-between ${
                        isActive
                          ? 'bg-nexora-orange-500/20 text-nexora-orange-400 font-bold border border-nexora-orange-500/30'
                          : 'hover:bg-white/5 text-neutral-200'
                      }`}
                    >
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono text-nexora-orange-400 font-bold">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  )
                })}
              </nav>

              {/* Mobile Quick Settings (Hero 3D Toggle & Language) */}
              <div className="pt-2 border-t border-white/10 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-neutral-300">Hero 3D Animation</span>
                  <button
                    type="button"
                    onClick={toggleHero3D}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                      hero3DEnabled
                        ? 'bg-nexora-orange-500 text-white'
                        : 'bg-neutral-700 text-neutral-400'
                    }`}
                  >
                    {hero3DEnabled ? 'ON' : 'OFF'}
                  </button>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-neutral-300">Language</span>
                  <div className="flex gap-1">
                    {(['en', 'hi', 'mr'] as const).map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => setLanguage(l)}
                        className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
                          language === l
                            ? 'bg-nexora-orange-500 text-white'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-xl text-center text-xs font-bold bg-gradient-to-r from-nexora-orange-500 to-amber-500 text-white uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-orange-950/40"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{t('nav_sign_in_register')}</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}



