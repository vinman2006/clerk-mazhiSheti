'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  UserPlus, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  FileText, 
  Lock, 
  Camera, 
  Upload, 
  ArrowRight,
  Sparkles,
  Check
} from 'lucide-react'
import { TopUtilityBar } from '@/components/portal/TopUtilityBar'
import { PortalHeader } from '@/components/portal/PortalHeader'
import { PortalNavBar } from '@/components/portal/PortalNavBar'
import { PortalOrgBanner } from '@/components/portal/PortalOrgBanner'
import { PortalFooter } from '@/components/portal/PortalFooter'
import { FloatingChatWidget } from '@/components/portal/FloatingChatWidget'
import { useAuth } from '@/lib/authContext'

export default function RegisterPage() {
  const router = useRouter()
  const { setRole, loginWithGoogle, signupWithEmail } = useAuth()

  // Form states
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedUnit, setSelectedUnit] = useState('Ward 1 - Medical District')
  const [idType, setIdType] = useState('W3C Sovereign DID')
  const [idNumber, setIdNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [scannedDocument, setScannedDocument] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(2)

  const handleScanDoc = () => {
    setScannedDocument(true)
    setIdNumber(`did:nexora:pat:${Math.random().toString(36).substring(2, 8)}`)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await signupWithEmail(email, password, fullName)
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col selection:bg-portal-orange selection:text-white">
      {/* 1. TOP UTILITY BAR */}
      <TopUtilityBar />

      {/* 2. PORTAL HEADER */}
      <PortalHeader />

      {/* 3. NAVBAR */}
      <PortalNavBar />

      {/* 4. ORG BANNER */}
      <PortalOrgBanner 
        title="NEXORA CITIZEN & PATIENT ENCLAVE"
        hindiTitle="नेक्सोरा नागरिक आणि रुग्ण नोंदणी"
        subtitle="New Account Registration & Identity Verification"
      />

      {/* 5. MAIN TWO-COLUMN REGISTRATION SECTION */}
      <main id="main-content" className="flex-1 relative py-12 px-4 sm:px-8 bg-gradient-to-br from-[#1E3A8A] via-[#1a3275] to-[#152A63] overflow-hidden">
        {/* Background tech grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
          {/* LEFT PANEL */}
          <div className="lg:col-span-5 text-white space-y-6 lg:sticky lg:top-8">
            <div className="space-y-2">
              <h1 className="font-display font-black text-3xl sm:text-4xl tracking-tight leading-tight">
                Citizen Registration
              </h1>
              <h2 className="font-sans font-bold text-xl text-portal-orange tracking-wide">
                नागरिक नोंदणी
              </h2>
            </div>

            <p className="font-sans text-xs sm:text-sm text-neutral-200 leading-relaxed">
              Register to access all e-Governance and healthcare services of Nexora. Once registered, you can book verified doctors, manage smart consent policies, and access your sovereign health records online.
            </p>

            {/* Orange-bordered info card matching screenshot */}
            <div className="p-5 rounded-lg bg-white/10 border-l-4 border-portal-orange backdrop-blur-sm space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-white font-bold text-xs sm:text-sm">
                <FileText className="w-4 h-4 text-portal-orange" />
                <span>Registration Requirements</span>
              </div>
              <ul className="space-y-2 text-xs text-neutral-200 font-sans">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-portal-green shrink-0" />
                  <span>Valid Email Address</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-portal-green shrink-0" />
                  <span>Mobile Number</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-portal-green shrink-0" />
                  <span>Government / Organization ID Proof (DID / Aadhaar / Voter ID)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-portal-green shrink-0" />
                  <span>Ward or Unit Information</span>
                </li>
              </ul>
            </div>

            {/* 3-segment progress bar */}
            <div className="flex items-center gap-2 max-w-xs pt-1">
              <div className="h-1.5 flex-1 rounded-full bg-portal-orange"></div>
              <div className="h-1.5 flex-1 rounded-full bg-white"></div>
              <div className="h-1.5 flex-1 rounded-full bg-portal-green"></div>
            </div>
          </div>

          {/* RIGHT PANEL: FORM CARD */}
          <div className="lg:col-span-7 w-full">
            <div className="bg-white rounded-xl shadow-portal-elevated border border-portal-border-light overflow-hidden">
              {/* Card Header (Orange Banner) */}
              <div className="bg-gradient-to-r from-portal-orange to-[#e07507] p-5 sm:p-6 text-center text-white space-y-2 relative">
                <div className="w-14 h-14 rounded-full bg-white text-portal-orange flex items-center justify-center mx-auto shadow-md border-2 border-white">
                  <UserPlus className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl sm:text-2xl tracking-tight text-white">
                    New Citizen Registration
                  </h2>
                  <span className="font-sans text-xs font-semibold text-white/90">
                    नवीन नागरिक नोंदणी फॉर्म
                  </span>
                </div>
              </div>

              {/* 3-Step Stepper matching screenshot */}
              <div className="bg-slate-50 px-6 py-4 border-b border-neutral-200">
                <div className="flex items-center justify-between max-w-md mx-auto relative">
                  {/* Stepper connecting line */}
                  <div className="absolute top-4 left-6 right-6 h-0.5 bg-neutral-200 -z-0"></div>

                  {[
                    { num: 1, label: 'Personal Details' },
                    { num: 2, label: 'Ward Selection' },
                    { num: 3, label: 'ID Verification' }
                  ].map((step) => {
                    const isActive = step.num <= currentStep
                    return (
                      <div key={step.num} className="flex flex-col items-center relative z-10">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all ${
                          isActive 
                            ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]' 
                            : 'bg-white text-neutral-400 border-neutral-300'
                        }`}>
                          {step.num}
                        </div>
                        <span className="text-[10px] font-semibold text-neutral-600 mt-1 font-sans text-center">
                          {step.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 text-xs font-sans text-neutral-800">
                {/* SECTION 1: PERSONAL DETAILS */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-portal-blue font-bold text-xs uppercase tracking-wide border-b border-neutral-200 pb-1.5">
                    <CreditCard className="w-4 h-4 text-portal-blue" />
                    <span>Personal Details / वैयक्तिक माहिती</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="font-semibold text-neutral-700 block text-xs">
                        Full Name / पूर्ण नाव <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter full name"
                        className="w-full px-3.5 py-2.5 rounded-md bg-portal-input-bg border border-portal-border-light text-neutral-900 text-xs focus:outline-none focus:border-portal-orange focus:ring-1 focus:ring-portal-orange"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-neutral-700 block text-xs">
                        Email Address / ईमेल <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email address"
                        className="w-full px-3.5 py-2.5 rounded-md bg-portal-input-bg border border-portal-border-light text-neutral-900 text-xs focus:outline-none focus:border-portal-orange focus:ring-1 focus:ring-portal-orange"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-neutral-700 block text-xs">
                        Phone Number / फोन नं. <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter mobile number"
                        className="w-full px-3.5 py-2.5 rounded-md bg-portal-input-bg border border-portal-border-light text-neutral-900 text-xs focus:outline-none focus:border-portal-orange focus:ring-1 focus:ring-portal-orange"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-neutral-700 block text-xs">
                        Select Ward / प्रभाग निवडा <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={selectedUnit}
                        onChange={(e) => setSelectedUnit(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-md bg-portal-input-bg border border-portal-border-light text-neutral-900 text-xs focus:outline-none focus:border-portal-orange focus:ring-1 focus:ring-portal-orange"
                      >
                        <option>Ward 1 - Medical District</option>
                        <option>Ward 2 - Central Healthcare Zone</option>
                        <option>Ward 3 - North Clinical Wing</option>
                        <option>Cardiology Research Unit</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: ID VERIFICATION & SCAN DOCUMENT */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-portal-green font-bold text-xs uppercase tracking-wide border-b border-neutral-200 pb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-portal-green" />
                    <span>ID Verification / ओळख पडताळणी</span>
                  </div>

                  {/* Scan ID Document Action Button matching screenshot */}
                  <div>
                    <button
                      type="button"
                      onClick={handleScanDoc}
                      className={`w-full py-3 px-4 rounded-md border-2 border-dashed font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 uppercase ${
                        scannedDocument
                          ? 'border-portal-green bg-green-50 text-portal-green'
                          : 'border-portal-green text-portal-green hover:bg-green-50'
                      }`}
                    >
                      {scannedDocument ? <Check className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
                      <span>{scannedDocument ? 'ID DOCUMENT ATTESTED & VERIFIED ✓' : 'SCAN ID DOCUMENT / दस्तऐवज स्कॅन करा'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                    <div className="space-y-1">
                      <label className="font-semibold text-neutral-700 block text-xs">
                        ID Proof Type / ओळख प्रकार
                      </label>
                      <select
                        value={idType}
                        onChange={(e) => setIdType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-md bg-portal-input-bg border border-portal-border-light text-neutral-900 text-xs focus:outline-none focus:border-portal-orange"
                      >
                        <option>W3C Sovereign DID</option>
                        <option>Aadhaar / National ID</option>
                        <option>Voter ID Card</option>
                        <option>Passport / Health Card</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-neutral-700 block text-xs">
                        ID Proof Number / ओळख क्रमांक
                      </label>
                      <input
                        type="text"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                        placeholder="Enter ID number"
                        className="w-full px-3.5 py-2.5 rounded-md bg-portal-input-bg border border-portal-border-light text-neutral-900 text-xs focus:outline-none focus:border-portal-orange"
                      />
                      <span className="text-[10px] text-neutral-400 block">
                        You can add or update this later in Profile
                      </span>
                    </div>
                  </div>
                </div>

                {/* SECTION 3: SECURITY */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-portal-blue font-bold text-xs uppercase tracking-wide border-b border-neutral-200 pb-1.5">
                    <Lock className="w-4 h-4 text-portal-blue" />
                    <span>Security Credentials / पासवर्ड</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="font-semibold text-neutral-700 block text-xs">
                        Password / पासवर्ड <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create strong password"
                        className="w-full px-3.5 py-2.5 rounded-md bg-portal-input-bg border border-portal-border-light text-neutral-900 text-xs focus:outline-none focus:border-portal-orange"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-neutral-700 block text-xs">
                        Confirm Password / पासवर्ड पुष्टी करा <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                        className="w-full px-3.5 py-2.5 rounded-md bg-portal-input-bg border border-portal-border-light text-neutral-900 text-xs focus:outline-none focus:border-portal-orange"
                      />
                    </div>
                  </div>
                </div>

                {/* PRIMARY CTA (Solid Success Green, height 52px) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-[52px] rounded-md bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 uppercase"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>{isSubmitting ? 'Registering...' : 'REGISTER / नोंदणी करा'}</span>
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
                  <span>SIGN UP WITH GOOGLE / गुगलने नोंदणी करा</span>
                </button>

                {/* Secondary Link */}
                <div className="text-center pt-1">
                  <span className="text-xs text-neutral-600">
                    Already have an account?{' '}
                    <Link href="/login" className="text-portal-blue font-bold hover:underline">
                      Sign In / साइन इन
                    </Link>
                  </span>
                </div>

                {/* Footer Note */}
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 font-sans">
                  <Lock className="w-3 h-3 text-portal-orange shrink-0" />
                  <span>Your data is securely encrypted and protected under Zero-Knowledge protocol.</span>
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
