'use client'

import React from 'react'
import Link from 'next/link'
import { SignIn, useUser } from '@clerk/nextjs'
import { Microscope, ArrowLeft, CheckCircle2, Award } from 'lucide-react'
import { FarmerLogo } from '@/components/ui/FarmerLogo'
import dynamic from 'next/dynamic'

const DotGrid = dynamic(() => import('@/components/ui/DotGrid'), { ssr: false })

export default function ExpertAuthPage() {
  const { user, isSignedIn } = useUser()
  return (
    <div className="min-h-screen bg-[#0A0F1E] text-slate-100 flex flex-col relative overflow-hidden selection:bg-purple-500/25 selection:text-purple-400">
      <div className="absolute inset-0 z-0 opacity-75 pointer-events-none">
        <DotGrid 
          dotSize={3.5}
          gap={24}
          baseColor="#4C1D95"
          activeColor="#A855F7"
          proximity={160}
          shockRadius={260}
          shockStrength={5}
          returnDuration={1.2}
        />
      </div>

      <header className="relative z-10 py-5 px-6 sm:px-12 border-b border-white/10 bg-[#0B1736]/70 backdrop-blur-xl flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <FarmerLogo size={36} showText={true} showBadge={true} subtitle="AGRONOMIST & EXPERT NETWORK" />
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
              <span>CERTIFIED ADVISORY PORTAL</span>
            </div>

            <div className="space-y-2">
              <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                Scientific guidance for healthier soils.
              </h1>
              <p className="text-sm font-sans text-blue-100/80 leading-relaxed">
                Review farmer soil test reports, guide sustainable and organic transitions, and prescribe biological pest solutions with verified agronomist credentials.
              </p>
            </div>

            <div className="space-y-3 font-sans text-xs text-blue-100/70 border-t border-white/10 pt-4">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Verified agronomist badge displayed on recommendations</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Structured N-P-K & organic carbon diagnostic workbenches</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Audited advice logs to protect farmer safety and crop yield</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/5 font-mono text-[11px] text-blue-200/70 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Agronomist credentials or instant pitch sandbox.</span>
              </div>
              <Link
                href="/expert/dashboard"
                className="px-2.5 py-1 rounded bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 font-bold border border-purple-500/30 transition-colors whitespace-nowrap"
              >
                Inspect Expert →
              </Link>
            </div>
          </div>

          <div className="flex justify-center w-full">
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
                    <span>Enter Agronomy Dashboard →</span>
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
              <SignIn 
                routing="hash"
                forceRedirectUrl="/expert/dashboard"
                signUpUrl="/auth/expert"
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
          </div>

        </div>
      </main>
    </div>
  )
}
