'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Shield, Sparkles, Activity, ArrowRight, Lock, Bot } from 'lucide-react'
import { useAuth } from '@/lib/authContext'
import { NexoraLogo } from '@/components/ui/NexoraLogo'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { loginWithGoogle, user } = useAuth()

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
      <div className={`bg-[#0B1736]/95 backdrop-blur-md border-b-2 border-nexora-orange-500 transition-all duration-200 shadow-lg ${scrolled ? 'py-2.5 shadow-xl' : 'py-3.5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo with official seal circular badge ring */}
          <Link href="/" className="group">
            <NexoraLogo size={40} showText={true} showBadge={true} subtitle="ZERO-TRUST HEALTH NET" />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-sans font-semibold text-nexora-text-secondary">
            <Link href="/architecture" className="hover:text-nexora-text-primary transition-colors flex items-center gap-1.5">
              <span>Architecture</span>
              <span className="px-1.5 py-0.5 rounded bg-nexora-bg-elevated text-nexora-steel-300 border border-nexora-border-subtle text-[9px] font-mono">Spec</span>
            </Link>
            <Link href="/hospital-portal/ai-training" className="hover:text-nexora-text-primary transition-colors">
              For Hospitals
            </Link>
            <Link href="/gov-portal" className="hover:text-nexora-text-primary transition-colors">
              For Government
            </Link>
            <Link href="/research" className="hover:text-nexora-text-primary transition-colors">
              Research Portal
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="px-3.5 py-1.5 rounded-md text-xs font-sans font-semibold text-nexora-text-primary hover:text-white bg-nexora-bg-surface/80 hover:bg-nexora-bg-elevated border border-nexora-border-strong hover:border-nexora-steel-500 transition-all uppercase tracking-wider"
            >
              Sign In
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-sans font-bold bg-nexora-orange-500 hover:bg-nexora-orange-600 text-nexora-text-on-orange shadow-sm transition-all uppercase tracking-wider"
            >
              Register
            </Link>

            <Link
              href="/dashboard"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-sans font-semibold text-nexora-text-secondary hover:text-nexora-text-primary hover:bg-nexora-bg-elevated border border-nexora-border-strong transition-all"
            >
              <Bot className="w-3.5 h-3.5 text-nexora-orange-400" />
              <span>Open App</span>
            </Link>

            <button
              onClick={loginWithGoogle}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white hover:bg-neutral-100 text-neutral-900 text-xs font-semibold border border-neutral-300 transition-all shadow-sm group"
            >
              {/* Google G SVG */}
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 14.5s.7 4.8 1.9 7.2l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z"
                />
              </svg>
              <span>Google</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
