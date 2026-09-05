'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { SignIn, SignUp, useUser, ClerkLoaded, ClerkLoading } from '@clerk/nextjs'
import { Microscope, ArrowLeft, CheckCircle2, FlaskConical } from 'lucide-react'
import { MazhiShetiLogo } from '@/components/ui/MazhiShetiLogo'
import dynamic from 'next/dynamic'

const DotGrid = dynamic(() => import('@/components/ui/DotGrid'), { ssr: false })

export default function ExpertAuthPage() {
  const { user, isSignedIn } = useUser()
  const [isSignUp, setIsSignUp] = useState(false)

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
    <div className="min-h-screen bg-[#0A0F1E] text-slate-100 flex flex-col relative overflow-hidden selection:bg-orange-500/25 selection:text-orange-400">
      <div className="absolute inset-0 z-0 opacity-90">
        <DotGrid 
          dotSize={3.5}
          gap={24}
          baseColor="#581C87"
          activeColor="#C084FC"
        />
      </div>

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-purple-600/15 via-indigo-900/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <header className="relative z-10 py-5 px-6 sm:px-12 border-b border-white/10 bg-[#0B1736]/70 backdrop-blur-xl flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <MazhiShetiLogo size={36} showText={true} showBadge={false} roleLabel="Agriculture Expert" subtitle="SOVEREIGN AGRI PLATFORM" />
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
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-3xl bg-[#0B152E]/85 border border-purple-500/30 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 text-xs font-mono font-bold">
              <Microscope className="w-3.5 h-3.5" />
              <span>CERTIFIED ADVISORY ACCESS</span>
            </div>

            <div className="space-y-2">
              <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                Scientific agronomic guidance.
              </h1>
              <p className="text-sm font-sans text-blue-100/80 leading-relaxed">
                Review farmer soil assays, certify personalized biological prescriptions, and mentor farmers through accredited 6-stage organic transition roadmaps.
              </p>
            </div>

            <div className="space-y-3 font-sans text-xs text-blue-100/70 border-t border-white/10 pt-4">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Certified soil scientist & ICAR agronomy consultation queue</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Multi-parameter NPK, EC, pH, and organic carbon prescription tools</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Direct farmer messaging and consultation resolution tracking</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/5 font-mono text-[11px] text-blue-200/70 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Agronomist login or instant pitch sandbox.</span>
              </div>
              <Link
                href="/expert/dashboard"
                className="px-2.5 py-1 rounded bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 font-bold border border-purple-500/30 transition-colors whitespace-nowrap"
              >
                Inspect Expert →
              </Link>
            </div>
          </div>

          <div className="flex justify-center w-full min-h-[380px] items-center">
            {/* Loading state while Clerk initializes */}
            <ClerkLoading>
              <div className="w-full max-w-md rounded-2xl bg-[#0F1C3F] border border-purple-500/20 p-8 text-center space-y-4 shadow-xl">
                <div className="w-9 h-9 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-mono text-blue-200">Connecting to Clerk Security Enclave...</p>
                <Link
                  href="/expert/dashboard"
                  className="inline-block mt-2 px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30 text-xs font-mono font-bold hover:bg-purple-500/30 transition-colors"
                >
                  Direct Sandbox Access →
                </Link>
              </div>
            </ClerkLoading>

            {/* Clerk Loaded Content */}
            <ClerkLoaded>
              {isSignedIn && user ? (
                <div className="w-full max-w-md rounded-2xl bg-[#0F1C3F] border border-purple-500/30 p-6 sm:p-8 shadow-2xl text-center space-y-6 backdrop-blur-xl">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center font-bold text-2xl text-purple-400 shadow-md">
                    {user.firstName ? user.firstName[0] : '✓'}
                  </div>
                  <div className="space-y-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono text-[10px] font-bold border border-purple-500/30">
                      CLERK SESSION ACTIVE
                    </span>
                    <h2 className="text-xl font-bold text-white">
                      {user.fullName || user.firstName}
                    </h2>
                    <p className="text-xs font-mono text-blue-200/70 truncate">
                      {user.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                  <div className="space-y-2.5 pt-2">
                    <Link
                      href="/expert/dashboard"
                      className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-950/50"
                    >
                      <span>Enter Expert Portal →</span>
                    </Link>
                    <Link
                      href="/auth/select"
                      className="w-full py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-blue-200 text-xs font-mono transition-colors block border border-white/10"
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
                          ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-950/40'
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
                          ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-950/40'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Create Account
                    </button>
                  </div>

                  {!isSignUp ? (
                    <SignIn 
                      routing="hash"
                      fallbackRedirectUrl="/expert/dashboard"
                      signUpUrl="/auth/expert?mode=signup"
                      appearance={{
                        elements: {
                          rootBox: 'w-full max-w-md',
                          card: 'bg-[#0F1C3F] border border-purple-500/20 shadow-2xl text-white rounded-2xl',
                          headerTitle: 'text-white font-display text-xl',
                          headerSubtitle: 'text-blue-200/70 text-xs',
                          socialButtonsBlockButton: 'bg-white/5 border-white/10 text-white hover:bg-white/10',
                          formFieldLabel: 'text-blue-200 text-xs font-mono',
                          formFieldInput: 'bg-[#0B152E] border-white/10 text-white focus:border-purple-400',
                          formButtonPrimary: 'bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider',
                          footerActionLink: 'text-purple-400 hover:text-purple-300 font-bold',
                        }
                      }}
                    />
                  ) : (
                    <SignUp 
                      routing="hash"
                      fallbackRedirectUrl="/expert/dashboard"
                      signInUrl="/auth/expert?mode=signin"
                      appearance={{
                        elements: {
                          rootBox: 'w-full max-w-md',
                          card: 'bg-[#0F1C3F] border border-purple-500/20 shadow-2xl text-white rounded-2xl',
                          headerTitle: 'text-white font-display text-xl',
                          headerSubtitle: 'text-blue-200/70 text-xs',
                          socialButtonsBlockButton: 'bg-white/5 border-white/10 text-white hover:bg-white/10',
                          formFieldLabel: 'text-blue-200 text-xs font-mono',
                          formFieldInput: 'bg-[#0B152E] border-white/10 text-white focus:border-purple-400',
                          formButtonPrimary: 'bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider',
                          footerActionLink: 'text-purple-400 hover:text-purple-300 font-bold',
                        }
                      }}
                    />
                  )}

                  <div className="pt-4 text-center">
                    <Link
                      href="/expert/dashboard"
                      className="text-xs font-mono text-purple-400/80 hover:text-purple-300 hover:underline"
                    >
                      Bypass to Expert Sandbox →
                    </Link>
                  </div>
                </div>
              )}
            </ClerkLoaded>
          </div>

        </div>
      </main>
    </div>
  )
}
