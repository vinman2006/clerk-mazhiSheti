'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  UserPlus, 
  Check, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles,
  Camera
} from 'lucide-react'
import { useAuth } from '@/lib/authContext'
import { NexoraLogoIcon } from '@/components/ui/NexoraLogo'
import { KiloWaveCanvas } from '@/components/ui/KiloWaveCanvas'

export default function RegisterPage() {
  const router = useRouter()
  const { loginWithGoogle, signupWithEmail } = useAuth()

  // Form states
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match')
      return
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters')
      return
    }
    setIsSubmitting(true)
    try {
      await signupWithEmail(email, password, fullName)
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to create account')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#070A10] text-white flex flex-col justify-between selection:bg-nexora-orange-500/20 selection:text-nexora-orange-400 relative overflow-hidden font-sans">
      {/* 1. KILO-STYLE GENERATIVE STIPPLE WAVE ANIMATION CANVAS */}
      <KiloWaveCanvas />

      {/* 2. TOP NAV / LOGO BAR */}
      <header className="relative z-20 px-6 sm:px-12 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#0D1322] border border-white/10 flex items-center justify-center p-1.5 shadow-md group-hover:border-nexora-orange-500/50 transition-all">
            <NexoraLogoIcon className="w-full h-full" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-xl tracking-tight text-white">
                NEXORA
              </span>
              <span className="font-sans font-bold text-[10px] px-2 py-0.5 rounded bg-nexora-orange-500 text-black leading-none">
                नेक्सोरा
              </span>
            </div>
            <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider">
              Zero-Trust Health Net
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="text-xs font-mono font-semibold text-neutral-400 hover:text-white px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
        >
          ← Back to Home
        </Link>
      </header>

      {/* 3. MAIN SPLIT SECTION */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-6 sm:px-12 py-8 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: REGISTRATION FORM CARD */}
          <div className="lg:col-span-6 max-w-md mx-auto w-full space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-[#0E1526] border border-white/10 flex items-center justify-center mx-auto shadow-xl p-2.5">
                <NexoraLogoIcon className="w-full h-full" />
              </div>
              <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight pt-2">
                Create your account
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400">
                Register your sovereign cryptographic identity on Nexora
              </p>
            </div>

            {/* ERROR NOTIFICATION */}
            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono">
                {errorMsg}
              </div>
            )}

            {/* CONTINUE WITH GOOGLE BUTTON */}
            <div className="space-y-4">
              <button
                type="button"
                onClick={loginWithGoogle}
                className="w-full py-3.5 px-4 rounded-xl bg-[#141B2D] hover:bg-[#1A233A] text-white font-bold text-sm border border-white/15 hover:border-white/30 transition-all shadow-lg flex items-center justify-center gap-3 group active:scale-[0.99]"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
                <span>Continue with Google</span>
              </button>

              {/* DIVIDER */}
              <div className="relative py-1 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <span className="relative bg-[#070A10] px-3 text-[11px] font-mono text-neutral-400">
                  or register with email
                </span>
              </div>

              {/* REGISTRATION FORM */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-mono font-medium text-neutral-300">
                    Full Name / Alias
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Aditi Sharma"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0D1322] border border-white/10 focus:border-nexora-orange-500 text-white text-sm focus:outline-none transition-all placeholder:text-neutral-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono font-medium text-neutral-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0D1322] border border-white/10 focus:border-nexora-orange-500 text-white text-sm focus:outline-none transition-all placeholder:text-neutral-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-mono font-medium text-neutral-300">
                      Password
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1322] border border-white/10 focus:border-nexora-orange-500 text-white text-sm focus:outline-none transition-all placeholder:text-neutral-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-mono font-medium text-neutral-300">
                      Confirm Password
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1322] border border-white/10 focus:border-nexora-orange-500 text-white text-sm focus:outline-none transition-all placeholder:text-neutral-600"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-nexora-green-status hover:bg-[#1b8552] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:shadow-emerald-950/40 flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>{isSubmitting ? 'Creating Sovereign Account...' : 'Create Account'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* BOTTOM TOGGLE */}
            <div className="pt-2 text-center text-xs text-neutral-400">
              Already have an account?{' '}
              <Link href="/login" className="text-nexora-orange-400 hover:underline font-semibold">
                Sign in here →
              </Link>
            </div>
          </div>

          {/* RIGHT: FEATURE SHOWCASE CARD (KILO STYLE) */}
          <div className="lg:col-span-6 w-full flex justify-center">
            <div className="w-full max-w-lg p-8 sm:p-10 rounded-2xl bg-[#0D1322]/80 border border-white/10 backdrop-blur-xl shadow-2xl space-y-8 relative overflow-hidden">
              {/* Ambient gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-nexora-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="space-y-2 relative z-10">
                <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                  One sovereign health key. <br />
                  Every hospital. <br />
                  <span className="text-nexora-orange-400">Total privacy.</span>
                </h2>
              </div>

              {/* CHECKMARK BULLETS */}
              <div className="space-y-5 text-xs sm:text-sm font-sans relative z-10">
                <div className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-nexora-green-status/20 border border-nexora-green-status/40 text-nexora-green-status flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Zero-Knowledge medical attestations.</h3>
                    <p className="text-neutral-400 text-xs mt-0.5 leading-relaxed">
                      Prove eligibility, lab results, and diagnostic metrics without exposing private health records.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-nexora-green-status/20 border border-nexora-green-status/40 text-nexora-green-status flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Everywhere you seek care.</h3>
                    <p className="text-neutral-400 text-xs mt-0.5 leading-relaxed">
                      Hospitals, diagnostic laboratories, specialist clinics, and government health schemes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-nexora-green-status/20 border border-nexora-green-status/40 text-nexora-green-status flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Multi-agent autonomous coordination.</h3>
                    <p className="text-neutral-400 text-xs mt-0.5 leading-relaxed">
                      AI agents coordinate bookings and subsidies with zero PHI leakage.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-nexora-green-status/20 border border-nexora-green-status/40 text-nexora-green-status flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">100% patient-owned sovereign data.</h3>
                    <p className="text-neutral-400 text-xs mt-0.5 leading-relaxed">
                      W3C Decentralized Identifiers (DIDs) & client-side AES-256 encryption.
                    </p>
                  </div>
                </div>
              </div>

              {/* TRUSTED BY NETWORK BADGES */}
              <div className="pt-6 border-t border-white/10 space-y-3 relative z-10">
                <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider block text-center sm:text-left">
                  Trusted by clinical networks & researchers at
                </span>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400">
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Apollo Health</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Fortis Care</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">AIIMS Network</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Stanford Medicine</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Midnight ZK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 4. FOOTER */}
      <footer className="relative z-10 px-6 sm:px-12 py-4 border-t border-white/5 text-center text-xs font-mono text-neutral-400">
        Nexora Sovereign Health Infrastructure • Protected by Zero-Knowledge Cryptography
      </footer>
    </div>
  )
}
