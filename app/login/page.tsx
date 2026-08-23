'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Shield, 
  CheckCircle2, 
  Headphones, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Sparkles,
  Building2
} from 'lucide-react'
import { TopUtilityBar } from '@/components/portal/TopUtilityBar'
import { PortalHeader } from '@/components/portal/PortalHeader'
import { PortalNavBar } from '@/components/portal/PortalNavBar'
import { PortalOrgBanner } from '@/components/portal/PortalOrgBanner'
import { PortalFooter } from '@/components/portal/PortalFooter'
import { FloatingChatWidget } from '@/components/portal/FloatingChatWidget'
import { useAuth } from '@/lib/authContext'

export default function LoginPage() {
  const router = useRouter()
  const { setRole, loginWithGoogle, loginWithEmail } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg('')
    try {
      await loginWithEmail(email, password)
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to sign in')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col selection:bg-portal-orange selection:text-white">
      {/* 1. TOP UTILITY BAR */}
      <TopUtilityBar />

      {/* 2. MAIN HEADER WITH LOGO & BADGES */}
      <PortalHeader />

      {/* 3. PRIMARY BLUE NAVBAR */}
      <PortalNavBar />

      {/* 4. ORG BANNER */}
      <PortalOrgBanner 
        title="NEXORA CITIZEN & PATIENT PORTAL"
        hindiTitle="नेक्सोरा नागरिक आणि रुग्ण पोर्टल"
        subtitle="Secure Access Gateway | Encrypted Identity"
      />

      {/* 5. MAIN HERO & AUTH CARD SECTION */}
      <main id="main-content" className="flex-1 relative py-12 px-4 sm:px-8 bg-gradient-to-br from-[#1E3A8A] via-[#1a3275] to-[#152A63] overflow-hidden flex items-center justify-center">
        {/* Subtle background tech grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* LEFT TEXT BLOCK */}
          <div className="lg:col-span-6 text-white space-y-6">
            <div className="space-y-2">
              <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
                Citizen Portal
              </h1>
              <h2 className="font-sans font-bold text-xl sm:text-2xl text-portal-orange tracking-wide">
                नागरिक पोर्टल
              </h2>
            </div>

            <p className="font-sans text-sm sm:text-base text-neutral-200 leading-relaxed max-w-lg">
              Welcome to the official e-Healthcare & Governance portal of Nexora. Access all municipal & medical services, book verified doctors, manage smart consent policies, and track zero-knowledge applications online.
            </p>

            {/* Feature List matching screenshot */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-center gap-3.5 bg-white/10 p-3 rounded-lg border border-white/10 backdrop-blur-sm">
                <div className="w-8 h-8 rounded bg-portal-orange text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="font-sans font-semibold text-xs sm:text-sm text-white">
                  Secure & Encrypted Login (W3C DID)
                </span>
              </div>

              <div className="flex items-center gap-3.5 bg-white/10 p-3 rounded-lg border border-white/10 backdrop-blur-sm">
                <div className="w-8 h-8 rounded bg-portal-orange text-white flex items-center justify-center shrink-0 shadow-sm">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="font-sans font-semibold text-xs sm:text-sm text-white">
                  Verified Citizen & Patient Access
                </span>
              </div>

              <div className="flex items-center gap-3.5 bg-white/10 p-3 rounded-lg border border-white/10 backdrop-blur-sm">
                <div className="w-8 h-8 rounded bg-portal-orange text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Headphones className="w-4 h-4" />
                </div>
                <span className="font-sans font-semibold text-xs sm:text-sm text-white">
                  24x7 Multi-Agent Online Support
                </span>
              </div>
            </div>

            {/* Decorative 3-segment progress bar matching screenshot */}
            <div className="pt-2 flex items-center gap-2 max-w-xs">
              <div className="h-1.5 flex-1 rounded-full bg-portal-orange"></div>
              <div className="h-1.5 flex-1 rounded-full bg-white"></div>
              <div className="h-1.5 flex-1 rounded-full bg-portal-green"></div>
            </div>
          </div>

          {/* RIGHT LOGIN CARD */}
          <div className="lg:col-span-6 max-w-md mx-auto w-full">
            <div className="bg-white rounded-xl shadow-portal-elevated border border-portal-border-light overflow-hidden">
              {/* Card Top Orange Banner */}
              <div className="bg-gradient-to-r from-portal-orange to-[#e07507] p-6 text-center text-white space-y-2 relative">
                {/* Person Circle Icon */}
                <div className="w-16 h-16 rounded-full bg-white text-portal-orange flex items-center justify-center mx-auto shadow-md border-2 border-white">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl sm:text-2xl tracking-tight text-white">
                    Citizen Login
                  </h2>
                  <span className="font-sans text-xs font-semibold text-white/90">
                    नागरिक लॉगिन
                  </span>
                </div>
              </div>

              {/* Form Body */}
              <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-4 text-xs font-sans text-neutral-800">
                {/* Email Field */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-neutral-700 block text-xs">
                    Email Address / ईमेल पत्ता <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    className="w-full px-3.5 py-2.5 rounded-md bg-portal-input-bg border border-portal-border-light text-neutral-900 text-xs focus:outline-none focus:border-portal-orange focus:ring-1 focus:ring-portal-orange transition-all placeholder:text-neutral-400"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-neutral-700 block text-xs">
                    Password / पासवर्ड <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full px-3.5 py-2.5 rounded-md bg-portal-input-bg border border-portal-border-light text-neutral-900 text-xs focus:outline-none focus:border-portal-orange focus:ring-1 focus:ring-portal-orange transition-all placeholder:text-neutral-400 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Primary CTA (Solid Success Green) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 rounded-md bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 uppercase"
                  >
                    <Lock className="w-4 h-4" />
                    <span>{isLoading ? 'Signing in...' : 'SIGN IN / साइन इन करा'}</span>
                  </button>
                </div>

                {/* OR Divider */}
                <div className="relative py-2 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-200"></div>
                  </div>
                  <span className="relative bg-white px-3 text-[11px] font-bold text-neutral-400 font-mono uppercase">
                    OR
                  </span>
                </div>

                {/* Google Sign-In Button */}
                <button
                  type="button"
                  onClick={loginWithGoogle}
                  className="w-full py-3 rounded-md bg-white hover:bg-neutral-50 text-neutral-800 font-bold text-xs border-2 border-neutral-300 transition-all shadow-sm flex items-center justify-center gap-2.5"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
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
                  <span>SIGN IN WITH GOOGLE / गुगलने साइन इन करा</span>
                </button>

                {/* Secondary CTA (Outline Primary Blue) */}
                <div className="space-y-1.5 text-center">
                  <span className="text-[11px] text-neutral-500 font-medium block">
                    Don't have an account?
                  </span>
                  <Link
                    href="/register"
                    className="w-full py-2.5 rounded-md border-2 border-portal-blue text-portal-blue hover:bg-portal-blue hover:text-white font-bold text-xs tracking-wider transition-all flex items-center justify-center uppercase"
                  >
                    REGISTER NOW / नोंदणी करा
                  </Link>
                </div>

                {/* Footer Note */}
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 font-sans">
                  <Lock className="w-3 h-3 text-portal-orange shrink-0" />
                  <span>Your data is securely encrypted under Zero-Knowledge protocol.</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* 6. GREEN SUB-BANNER */}
      <div className="bg-[#2E7D32] text-white py-2.5 px-4 text-center text-xs font-semibold tracking-wide">
        Nexora Trust Infrastructure | नेक्सोरा शासन | © 2026 Nexora Unified Platform
      </div>

      {/* 7. PORTAL FOOTER */}
      <PortalFooter />

      {/* 8. FLOATING CHAT WIDGET */}
      <FloatingChatWidget />
    </div>
  )
}
