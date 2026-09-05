'use client'

import React from 'react'
import Link from 'next/link'
import { SignIn } from '@clerk/nextjs'
import { Landmark, ShieldAlert, ArrowLeft, CheckCircle2, Lock } from 'lucide-react'
import { FarmerLogo } from '@/components/ui/FarmerLogo'
import dynamic from 'next/dynamic'

const DotGrid = dynamic(() => import('@/components/ui/DotGrid'), { ssr: false })

export default function BankAuthPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] text-slate-100 flex flex-col relative overflow-hidden selection:bg-blue-500/25 selection:text-blue-400">
      <div className="absolute inset-0 z-0 opacity-75 pointer-events-none">
        <DotGrid 
          dotSize={3.5}
          gap={24}
          baseColor="#1E3A8A"
          activeColor="#3B82F6"
          proximity={160}
          shockRadius={260}
          shockStrength={5}
          returnDuration={1.2}
        />
      </div>

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-blue-600/15 via-indigo-900/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      {/* Top Navigation */}
      <header className="relative z-10 py-5 px-6 sm:px-12 border-b border-white/10 bg-[#0B1736]/70 backdrop-blur-xl flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <FarmerLogo size={36} showText={true} showBadge={true} subtitle="INSTITUTIONAL FINANCE PORTAL" />
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
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-3xl bg-[#0B152E]/85 border border-blue-500/30 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
          
          {/* Left Context */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold">
              <Landmark className="w-3.5 h-3.5" />
              <span>INSTITUTIONAL LENDER ACCESS</span>
            </div>

            <div className="space-y-2">
              <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                Secure access to agricultural finance.
              </h1>
              <p className="text-sm font-sans text-blue-100/80 leading-relaxed">
                Review Kisan Credit Card (KCC) portfolios, agricultural equipment financing, and assess verified farm health indicators under strict farmer consent.
              </p>
            </div>

            <div className="space-y-3 font-sans text-xs text-blue-100/70 border-t border-white/10 pt-4">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Audited access: Every file view is cryptographically recorded</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Consent-scoped data: Only authorized farmer fields are visible</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Multi-officer workflow: Underwriting, Verification, and Approval roles</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/5 font-mono text-[11px] text-blue-200/70 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Officer credentials or instant pitch sandbox.</span>
              </div>
              <Link
                href="/bank/dashboard"
                className="px-2.5 py-1 rounded bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 font-bold border border-blue-500/30 transition-colors whitespace-nowrap"
              >
                Inspect Bank →
              </Link>
            </div>
          </div>

          {/* Right Clerk SignIn Component */}
          <div className="flex justify-center w-full">
            <SignIn 
              routing="hash"
              forceRedirectUrl="/bank/dashboard"
              signUpUrl="/auth/bank"
              appearance={{
                elements: {
                  rootBox: 'w-full max-w-md',
                  card: 'bg-[#0F1C3F] border border-blue-500/20 shadow-2xl text-white rounded-2xl',
                  headerTitle: 'text-white font-display text-xl',
                  headerSubtitle: 'text-blue-200/70 text-xs',
                  socialButtonsBlockButton: 'bg-white/5 border-white/10 text-white hover:bg-white/10',
                  formFieldLabel: 'text-blue-200 text-xs font-mono',
                  formFieldInput: 'bg-[#0B152E] border-white/10 text-white focus:border-blue-400',
                  formButtonPrimary: 'bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider',
                  footerActionLink: 'text-blue-400 hover:text-blue-300 font-bold',
                }
              }}
            />
          </div>

        </div>
      </main>
    </div>
  )
}
