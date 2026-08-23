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
import { PortalFooter } from '@/components/portal/PortalFooter'
import { StateEmblemOfIndia } from '@/components/ui/NexoraLogo'
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
    <div className="min-h-screen bg-[#F4F6F9] text-[#1A1A1A] flex flex-col font-sans antialiased">
      {/* 1. TOP UTILITY BAR */}
      <TopUtilityBar />

      {/* 2. MAIN HEADER WITH LOGO & BADGES */}
      <PortalHeader />

      {/* 3. PRIMARY BLUE NAVBAR */}
      <PortalNavBar />

      {/* 4. OFFICIAL PAGE TITLE BANNER (Forest Green) */}
      <div className="bg-[#124E2A] text-white border-b-2 border-[#F5821F] py-6 px-4 sm:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <StateEmblemOfIndia className="w-8 h-10 text-white shrink-0" />
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Citizen Portal Login (नागरिक लॉगिन)
              </h1>
              <p className="text-emerald-100 text-xs mt-0.5">
                National Digital Health & Sovereign Governance Portal • Government of India
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold bg-black/20 px-3 py-1.5 rounded border border-white/20">
            <span className="w-2 h-2 rounded-full bg-[#F5821F]"></span>
            <span>24x7 Verified Access</span>
          </div>
        </div>
      </div>

      {/* 5. MAIN HERO & AUTH CARD SECTION */}
      <main id="main-content" className="flex-1 py-12 px-4 sm:px-8 bg-[#F4F6F9] flex items-center justify-center">
        <div className="max-w-5xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT INFORMATIONAL BLOCK */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D66D10] bg-[#FFF5EB] px-3 py-1 rounded border border-[#F5821F]/30">
                Official E-Governance Gateway
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3D91] tracking-tight">
                Secure & Sovereign Citizen Healthcare Login
              </h2>
              <h3 className="text-sm font-bold text-[#F5821F]">
                सुरक्षित आणि डिजिटल आरोग्य सेवा प्रवेश
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
              Welcome to the official e-Healthcare & Governance portal of Nexora. Access all municipal & medical services, book verified doctors, manage smart consent policies, and track zero-knowledge applications online.
            </p>

            {/* Feature List */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 bg-white p-3.5 rounded-lg border border-[#E0E0E0] shadow-sm">
                <div className="w-8 h-8 rounded bg-[#FFF5EB] text-[#F5821F] flex items-center justify-center shrink-0 border border-[#F5821F]/30">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="font-bold text-xs text-[#1A1A1A]">
                  Encrypted Sovereign Login (W3C DID & Firebase Auth)
                </span>
              </div>

              <div className="flex items-center gap-3 bg-white p-3.5 rounded-lg border border-[#E0E0E0] shadow-sm">
                <div className="w-8 h-8 rounded bg-[#E8F5E9] text-[#1E7A34] flex items-center justify-center shrink-0 border border-[#1E7A34]/30">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="font-bold text-xs text-[#1A1A1A]">
                  Verified Citizen & Patient Access
                </span>
              </div>

              <div className="flex items-center gap-3 bg-white p-3.5 rounded-lg border border-[#E0E0E0] shadow-sm">
                <div className="w-8 h-8 rounded bg-[#EAF1FB] text-[#0B3D91] flex items-center justify-center shrink-0 border border-[#0B3D91]/30">
                  <Headphones className="w-4 h-4" />
                </div>
                <span className="font-bold text-xs text-[#1A1A1A]">
                  24x7 Multi-Agent Online Helpdesk Support
                </span>
              </div>
            </div>

            {/* Tricolor Stripe */}
            <div className="pt-2 flex items-center gap-2 max-w-xs">
              <div className="h-1.5 flex-1 rounded-full bg-[#F5821F]"></div>
              <div className="h-1.5 flex-1 rounded-full bg-[#CBD5E1]"></div>
              <div className="h-1.5 flex-1 rounded-full bg-[#1E7A34]"></div>
            </div>
          </div>

          {/* RIGHT LOGIN CARD */}
          <div className="lg:col-span-6 max-w-md mx-auto w-full">
            <div className="bg-white rounded-lg shadow-md border border-[#E0E0E0] overflow-hidden">
              {/* Card Top Banner in Saffron */}
              <div className="bg-[#F5821F] p-6 text-center text-white space-y-2">
                <div className="w-14 h-14 rounded-full bg-white text-[#F5821F] flex items-center justify-center mx-auto shadow-sm border-2 border-white">
                  <User className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="font-bold text-xl tracking-tight text-white">
                    Citizen Login
                  </h2>
                  <span className="text-xs font-semibold text-white/90">
                    नागरिक लॉगिन
                  </span>
                </div>
              </div>

              {/* Form Body */}
              <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-4 text-xs font-sans text-[#1A1A1A]">
                {errorMsg && (
                  <div className="p-3 rounded bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                    {errorMsg}
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-1">
                  <label className="font-bold text-[#1A1A1A] block text-xs">
                    Email Address / ईमेल पत्ता <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    className="w-full px-3.5 py-2.5 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] text-xs font-medium focus:outline-none focus:bg-white focus:border-[#0B3D91] transition-all placeholder:text-[#64748B]"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-1">
                  <label className="font-bold text-[#1A1A1A] block text-xs">
                    Password / पासवर्ड <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full px-3.5 py-2.5 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] text-xs font-medium focus:outline-none focus:bg-white focus:border-[#0B3D91] transition-all placeholder:text-[#64748B] pr-10"
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
                    className="w-full py-3 rounded-md bg-[#1E7A34] hover:bg-[#145524] text-white font-bold text-xs tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 uppercase"
                  >
                    <Lock className="w-4 h-4" />
                    <span>{isLoading ? 'Authenticating...' : 'SIGN IN / साइन इन करा'}</span>
                  </button>
                </div>

                {/* OR Divider */}
                <div className="relative py-2 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#E0E0E0]"></div>
                  </div>
                  <span className="relative bg-white px-3 text-[11px] font-bold text-neutral-400 uppercase">
                    OR
                  </span>
                </div>

                {/* Google Sign-In Button */}
                <button
                  type="button"
                  onClick={loginWithGoogle}
                  className="w-full py-2.5 rounded-md bg-white hover:bg-neutral-50 text-[#1A1A1A] font-bold text-xs border border-[#CBD5E1] transition-all shadow-sm flex items-center justify-center gap-2.5"
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

                {/* Secondary CTA (Outline Primary Navy) */}
                <div className="space-y-1 text-center pt-1">
                  <span className="text-[11px] text-neutral-500 font-medium block">
                    New Citizen / Patient?
                  </span>
                  <Link
                    href="/register"
                    className="w-full py-2 rounded-md border-2 border-[#0B3D91] text-[#0B3D91] hover:bg-[#0B3D91] hover:text-white font-bold text-xs tracking-wider transition-all flex items-center justify-center uppercase"
                  >
                    REGISTER NEW ACCOUNT / नोंदणी करा
                  </Link>
                </div>

                {/* Footer Note */}
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-center gap-1.5 text-[10px] text-neutral-500">
                  <Lock className="w-3 h-3 text-[#F5821F] shrink-0" />
                  <span>Sovereign data protection guaranteed under Digital India Act.</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* 6. PORTAL FOOTER */}
      <PortalFooter />
    </div>
  )
}

