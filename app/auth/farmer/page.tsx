'use client'

import React from 'react'
import Link from 'next/link'
import { SignIn, useUser } from '@clerk/nextjs'
import { Sprout, Phone, ShieldCheck, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { FarmerLogo } from '@/components/ui/FarmerLogo'
import dynamic from 'next/dynamic'

const DotGrid = dynamic(() => import('@/components/ui/DotGrid'), { ssr: false })

export default function FarmerAuthPage() {
  const { user, isSignedIn } = useUser()
  return (
    <div className="min-h-screen bg-[#0A0F1E] text-slate-100 flex flex-col relative overflow-hidden selection:bg-orange-500/25 selection:text-orange-400">
      {/* Background Dot Grid */}
      <div className="absolute inset-0 z-0 opacity-75 pointer-events-none">
        <DotGrid 
          dotSize={3.5}
          gap={24}
          baseColor="#2A4880"
          activeColor="#22C55E"
          proximity={160}
          shockRadius={260}
          shockStrength={5}
          returnDuration={1.2}
        />
      </div>

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-emerald-600/15 via-blue-500/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      {/* Top Navigation */}
      <header className="relative z-10 py-5 px-6 sm:px-12 border-b border-white/10 bg-[#0B1736]/70 backdrop-blur-xl flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <FarmerLogo size={36} showText={true} showBadge={true} subtitle="FARMER IDENTITY PORTAL" />
        </Link>

        <Link
          href="/auth/select"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white transition-all text-xs font-sans font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Switch Role</span>
        </Link>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-3xl bg-[#0B152E]/85 border border-emerald-500/30 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
          
          {/* Left Hero Context */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
              <Sprout className="w-3.5 h-3.5" />
              <span>शेतकरी प्रवेश • FARMER LOGIN</span>
            </div>

            <div className="space-y-2">
              <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                Welcome back to your farm.
              </h1>
              <p className="text-sm font-sans text-blue-100/80 leading-relaxed">
                Log in to inspect live soil moisture readings, trigger automated sprinkler valves, track your 6-stage organic transition, and manage mandi crop sales.
              </p>
            </div>

            {/* Farmer Features Checklist */}
            <div className="space-y-3 font-sans text-xs text-blue-100/70 border-t border-white/10 pt-4">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant Mobile Number + OTP verification</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero-leak privacy: Your data is never shared without your consent</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct access to Kisan Credit Card & low-interest bank schemes</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/5 font-mono text-[11px] text-blue-200/70 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>First time farmer? Sign up or launch live demo directly.</span>
              </div>
              <Link
                href="/farmer/dashboard"
                className="px-2.5 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-bold border border-emerald-500/30 transition-colors whitespace-nowrap"
              >
                Launch Demo →
              </Link>
            </div>
          </div>

          {/* Right Clerk SignIn Component */}
          <div className="flex justify-center w-full">
            {isSignedIn && user ? (
              <div className="w-full max-w-md rounded-2xl bg-[#0F1C3F] border border-emerald-500/30 p-6 sm:p-8 shadow-2xl text-center space-y-6 backdrop-blur-xl">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center font-bold text-2xl text-emerald-400 shadow-md">
                  {user.firstName ? user.firstName[0] : '✓'}
                </div>
                <div className="space-y-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
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
                    href="/farmer/dashboard"
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50"
                  >
                    <span>Launch Farmer OS →</span>
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
                forceRedirectUrl="/farmer/dashboard"
                signUpUrl="/auth/farmer"
                appearance={{
                  elements: {
                    rootBox: 'w-full max-w-md',
                    card: 'bg-[#0F1C3F] border border-white/10 shadow-2xl text-white rounded-2xl',
                    headerTitle: 'text-white font-display text-xl',
                    headerSubtitle: 'text-blue-200/70 text-xs',
                    socialButtonsBlockButton: 'bg-white/5 border-white/10 text-white hover:bg-white/10',
                    formFieldLabel: 'text-blue-200 text-xs font-mono',
                    formFieldInput: 'bg-[#0B152E] border-white/10 text-white focus:border-emerald-400',
                    formButtonPrimary: 'bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider',
                    footerActionLink: 'text-emerald-400 hover:text-emerald-300 font-bold',
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
