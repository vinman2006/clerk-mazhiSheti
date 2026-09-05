'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { SignIn, SignUp, useUser } from '@clerk/nextjs'
import { ShieldAlert, ArrowLeft, CheckCircle2, KeyRound, Loader2 } from 'lucide-react'
import { MazhiShetiLogo } from '@/components/ui/MazhiShetiLogo'
import dynamic from 'next/dynamic'

const DotGrid = dynamic(() => import('@/components/ui/DotGrid'), { ssr: false })

export default function AdminAuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, isSignedIn, isLoaded } = useUser()
  const [isSignUp, setIsSignUp] = useState(false)

  // Determine sanitized redirect destination
  const redirectTarget = useMemo(() => {
    const rawRedirect = searchParams?.get('redirect_url')
    if (rawRedirect) {
      try {
        if (!rawRedirect.includes('/auth') && !rawRedirect.includes('/sign-in') && !rawRedirect.includes('/sign-up')) {
          const parsed = new URL(rawRedirect, typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')
          return parsed.pathname + parsed.search
        }
      } catch {
        // fallback
      }
    }
    return '/admin/dashboard'
  }, [searchParams])

  // Instant automatic redirect once user identity is verified
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      router.replace(redirectTarget)
    }
  }, [isLoaded, isSignedIn, user, router, redirectTarget])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('mode') === 'signup' || window.location.hash.includes('sign-up')) {
        setIsSignUp(true)
      } else if (params.get('mode') === 'signin') {
        setIsSignUp(false)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col relative overflow-hidden selection:bg-red-500/25 selection:text-red-400">
      <div className="absolute inset-0 z-0 opacity-90">
        <DotGrid 
          dotSize={3.5}
          gap={24}
          baseColor="#7F1D1D"
          activeColor="#EF4444"
        />
      </div>

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-red-600/15 via-rose-950/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <header className="relative z-10 py-5 px-6 sm:px-12 border-b border-white/10 bg-[#0A0D18]/70 backdrop-blur-xl flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <MazhiShetiLogo size={36} showText={true} showBadge={false} roleLabel="Admin" subtitle="SOVEREIGN AGRI PLATFORM" />
        </Link>

        <Link
          href="/auth/select"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white transition-all text-xs font-sans font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Switch Role</span>
        </Link>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-3xl bg-[#0C101D]/85 border border-red-500/30 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-mono font-bold">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>ROOT GOVERNANCE ACCESS</span>
            </div>

            <div className="space-y-2">
              <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                Platform oversight & compliance.
              </h1>
              <p className="text-sm font-sans text-neutral-300 leading-relaxed">
                Supervise cross-tenant security, inspect tamper-evident audit logs, review banking institution charters, and monitor hardware gateways.
              </p>
            </div>

            <div className="space-y-3 font-sans text-xs text-neutral-400 border-t border-white/10 pt-4">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0" />
                <span>Strict multi-factor authentication (MFA) enforcement</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0" />
                <span>Cryptographic audit trail with SHA-256 integrity checks</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0" />
                <span>LoRaWAN gateway telemetry and hardware provisioning</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/5 font-mono text-[11px] text-neutral-300 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-red-400 shrink-0" />
                <span>Superadmin login or instant pitch sandbox.</span>
              </div>
              <Link
                href="/admin/dashboard"
                className="px-2.5 py-1 rounded bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold border border-red-500/30 transition-colors whitespace-nowrap"
              >
                Inspect Admin →
              </Link>
            </div>
          </div>

          <div className="flex justify-center w-full min-h-[380px] items-center">
            {!isLoaded ? (
              <div className="w-full max-w-md rounded-2xl bg-[#0E1322] border border-red-500/30 p-8 shadow-2xl text-center space-y-4 backdrop-blur-xl">
                <div className="w-12 h-12 mx-auto rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-mono font-bold tracking-widest text-red-400 uppercase">
                    Verifying Identity
                  </p>
                  <p className="text-xs text-neutral-400">
                    Connecting to secure sovereign gateway...
                  </p>
                </div>
              </div>
            ) : isSignedIn && user ? (
              <div className="w-full max-w-md rounded-2xl bg-[#0E1322] border border-red-500/30 p-6 sm:p-8 shadow-2xl text-center space-y-5 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-300">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center font-bold text-2xl text-red-400 shadow-md">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="space-y-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
                    IDENTITY VERIFIED • ACCESS GRANTED
                  </span>
                  <h2 className="text-xl font-bold text-white">
                    Welcome, {user.fullName || user.firstName || 'Administrator'}
                  </h2>
                  <p className="text-xs font-mono text-neutral-400 truncate">
                    {user.primaryEmailAddress?.emailAddress}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-300 flex items-center justify-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-red-400 shrink-0" />
                  <span>Entering Governance Console...</span>
                </div>

                <div className="space-y-2 pt-1">
                  <Link
                    href={redirectTarget}
                    className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-950/50"
                  >
                    <span>Enter Immediately →</span>
                  </Link>
                  <Link
                    href="/auth/select"
                    className="w-full py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 text-xs font-mono transition-colors block border border-white/10"
                  >
                    Switch to Another Role
                  </Link>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-md flex flex-col items-center">
                {/* Mode Tab Switcher */}
                <div className="w-full grid grid-cols-2 p-1 rounded-xl bg-white/[0.04] border border-white/10 mb-4 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className={`py-2 rounded-lg text-center transition-all ${
                      !isSignUp
                        ? 'bg-red-600 text-white font-bold shadow-md shadow-red-950/40'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className={`py-2 rounded-lg text-center transition-all ${
                      isSignUp
                        ? 'bg-red-600 text-white font-bold shadow-md shadow-red-950/40'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Create Account
                  </button>
                </div>

                {!isSignUp ? (
                  <SignIn 
                    routing="hash"
                    forceRedirectUrl={redirectTarget}
                    fallbackRedirectUrl={redirectTarget}
                    signUpForceRedirectUrl={redirectTarget}
                    signUpFallbackRedirectUrl={redirectTarget}
                    appearance={{
                      elements: {
                        rootBox: 'w-full max-w-md',
                        card: 'bg-[#0E1322] border border-red-500/20 shadow-2xl text-white rounded-2xl',
                        headerTitle: 'text-white font-display text-xl',
                        headerSubtitle: 'text-neutral-400 text-xs',
                        socialButtonsBlockButton: 'bg-white/5 border-white/10 text-white hover:bg-white/10',
                        formFieldLabel: 'text-neutral-300 text-xs font-mono',
                        formFieldInput: 'bg-[#070A12] border-white/10 text-white focus:border-red-400',
                        formButtonPrimary: 'bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider',
                        footerActionLink: 'text-red-400 hover:text-red-300 font-bold',
                      }
                    }}
                  />
                ) : (
                  <SignUp 
                    routing="hash"
                    forceRedirectUrl={redirectTarget}
                    fallbackRedirectUrl={redirectTarget}
                    signInForceRedirectUrl={redirectTarget}
                    signInFallbackRedirectUrl={redirectTarget}
                    appearance={{
                      elements: {
                        rootBox: 'w-full max-w-md',
                        card: 'bg-[#0E1322] border border-red-500/20 shadow-2xl text-white rounded-2xl',
                        headerTitle: 'text-white font-display text-xl',
                        headerSubtitle: 'text-neutral-400 text-xs',
                        socialButtonsBlockButton: 'bg-white/5 border-white/10 text-white hover:bg-white/10',
                        formFieldLabel: 'text-neutral-300 text-xs font-mono',
                        formFieldInput: 'bg-[#070A12] border-white/10 text-white focus:border-red-400',
                        formButtonPrimary: 'bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider',
                        footerActionLink: 'text-red-400 hover:text-red-300 font-bold',
                      }
                    }}
                  />
                )}

                <div className="pt-4 text-center">
                  <Link
                    href="/admin/dashboard"
                    className="text-xs font-mono text-red-400/80 hover:text-red-300 hover:underline"
                  >
                    Bypass to Admin Sandbox →
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  )
}
