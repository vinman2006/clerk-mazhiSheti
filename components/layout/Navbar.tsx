'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Shield, Sparkles, Activity, ArrowRight, Lock, Bot, Menu, X } from 'lucide-react'
import { useAuth } from '@/lib/authContext'
import { useLanguage } from '@/lib/languageContext'
import { NexoraLogo } from '@/components/ui/NexoraLogo'
import { LanguageSelector } from '@/components/ui/LanguageSelector'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { loginWithGoogle, user } = useAuth()
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-200">
      {/* Top Utility Nav Bar with Orange Accent Border */}
      <div className={`bg-[#0B1736]/95 backdrop-blur-md border-b-2 border-nexora-orange-500 transition-all duration-200 shadow-lg ${scrolled ? 'py-2.5 shadow-xl' : 'py-3'}`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo with official seal circular badge ring */}
          <Link href="/" className="group shrink-0">
            <NexoraLogo size={36} showText={true} showBadge={true} subtitle="ZERO-TRUST HEALTH NET" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-sans font-semibold text-nexora-text-secondary">
            <Link href="/architecture" className="hover:text-nexora-text-primary transition-colors flex items-center gap-1.5">
              <span>{t('nav_architecture')}</span>
              <span className="px-1.5 py-0.5 rounded bg-nexora-bg-elevated text-nexora-steel-300 border border-nexora-border-subtle text-[9px] font-mono">{t('nav_spec')}</span>
            </Link>
            <Link href="/hospital-portal/ai-training" className="hover:text-nexora-text-primary transition-colors">
              {t('nav_hospitals')}
            </Link>
            <Link href="/gov-portal" className="hover:text-nexora-text-primary transition-colors">
              {t('nav_government')}
            </Link>
            <Link href="/research" className="hover:text-nexora-text-primary transition-colors">
              {t('nav_research')}
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Language Selector Dropdown */}
            <LanguageSelector />

            <Link
              href="/login"
              className="hidden sm:inline-block px-3 py-1.5 rounded-md text-xs font-sans font-semibold text-nexora-text-primary hover:text-white bg-nexora-bg-surface/80 hover:bg-nexora-bg-elevated border border-nexora-border-strong hover:border-nexora-steel-500 transition-all uppercase tracking-wider"
            >
              {t('nav_sign_in')}
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center gap-1 px-3 sm:px-4 py-1.5 rounded-md text-xs font-sans font-bold bg-nexora-orange-500 hover:bg-nexora-orange-600 text-nexora-text-on-orange shadow-sm transition-all uppercase tracking-wider"
            >
              {t('nav_register')}
            </Link>

            <Link
              href="/dashboard"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-sans font-semibold text-nexora-text-secondary hover:text-nexora-text-primary hover:bg-nexora-bg-elevated border border-nexora-border-strong transition-all"
            >
              <Bot className="w-3.5 h-3.5 text-nexora-orange-400" />
              <span>{t('nav_open_app')}</span>
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-3 pb-5 border-t border-white/10 bg-[#09132E]/98 backdrop-blur-2xl space-y-3 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-2 text-sm font-sans font-medium text-neutral-200">
              <Link
                href="/architecture"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg hover:bg-white/5 flex items-center justify-between"
              >
                <span>{t('nav_architecture')}</span>
                <span className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono text-nexora-orange-400">{t('nav_spec')}</span>
              </Link>
              <Link
                href="/hospital-portal/ai-training"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg hover:bg-white/5"
              >
                {t('nav_hospitals')}
              </Link>
              <Link
                href="/gov-portal"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg hover:bg-white/5"
              >
                {t('nav_government')}
              </Link>
              <Link
                href="/research"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg hover:bg-white/5"
              >
                {t('nav_research')}
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg hover:bg-white/5 flex items-center gap-2 text-nexora-orange-400 font-bold"
              >
                <Bot className="w-4 h-4" />
                <span>{t('nav_open_app')}</span>
              </Link>
            </nav>

            <div className="pt-2 border-t border-white/10 flex items-center gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-2.5 text-center rounded-lg text-xs font-bold bg-white/10 text-white uppercase tracking-wider"
              >
                {t('nav_sign_in')}
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  loginWithGoogle()
                }}
                className="py-2.5 px-4 rounded-lg bg-white text-black text-xs font-bold flex items-center justify-center gap-2"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                  <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 14.5s.7 4.8 1.9 7.2l3.7-2.9z" />
                  <path fill="#34A853" d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z" />
                </svg>
                <span>Google</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
