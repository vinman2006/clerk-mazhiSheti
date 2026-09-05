'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Sprout, 
  Landmark, 
  Tractor, 
  Microscope, 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  Droplets,
  Layers,
  ShoppingBag,
  CheckCircle2
} from 'lucide-react'
import { Taskbar } from '@/components/layout/Taskbar'
import { FarmerLogo } from '@/components/ui/FarmerLogo'

// Dynamically import DotGrid to ensure canvas runs on client side without hydration mismatch
const DotGrid = dynamic(() => import('@/components/ui/DotGrid'), { ssr: false })

export default function HomePage() {
  const [dotColor, setDotColor] = useState<'orange' | 'emerald' | 'cyan'>('orange')

  const activeColorHex = 
    dotColor === 'orange' ? '#F5820D' :
    dotColor === 'emerald' ? '#22C55E' : '#38BDF8'

  const roles = [
    {
      id: 'farmer',
      title: 'Farmer Portal',
      marathi: 'शेतकरी प्रवेश',
      subtitle: 'Individual Cultivator & Farm Owner',
      description: 'Mobile OTP authentication, real-time soil telemetry, micro-irrigation controls, 6-stage organic transition, and APMC mandi benchmarks.',
      icon: Sprout,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30 hover:border-emerald-400',
      badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      badge: 'Primary Account',
      href: '/auth/farmer',
      ctaText: 'Access Farmer Portal',
    },
    {
      id: 'bank',
      title: 'Bank & Financial Portal',
      marathi: 'बँक व संस्था',
      subtitle: 'Credit Officers & Institutional Lenders',
      description: 'Review Kisan Credit Card (KCC) applications, inspect consent-verified farm land records, and monitor loan disbursements.',
      icon: Landmark,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30 hover:border-blue-400',
      badgeColor: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
      badge: 'Institutional Portal',
      href: '/auth/bank',
      ctaText: 'Institutional Sign In',
    },
    {
      id: 'provider',
      title: 'Machinery Fleet Provider',
      marathi: 'यंत्रसामग्री पुरवठादार',
      subtitle: 'Tractor Fleet Owners & Custom Hiring Hubs',
      description: 'Manage tractors, rotavators, and laser levelers. Set hourly and acreage rates, dispatch equipment, and manage farmer bookings.',
      icon: Tractor,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30 hover:border-orange-400',
      badgeColor: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
      badge: 'Business Fleet',
      href: '/auth/provider',
      ctaText: 'Provider Sign In',
    },
    {
      id: 'expert',
      title: 'Agronomist & Expert Network',
      marathi: 'कृषी तज्ञ',
      subtitle: 'Soil Scientists & Crop Advisors',
      description: 'Provide certified soil test interpretations, pest diagnostic guidance, and scientifically backed biological transition roadmaps.',
      icon: Microscope,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30 hover:border-purple-400',
      badgeColor: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
      badge: 'Certified Advisory',
      href: '/auth/expert',
      ctaText: 'Expert Sign In',
    },
    {
      id: 'admin',
      title: 'Platform Governance & Admin',
      marathi: 'प्रशासन कक्ष',
      subtitle: 'Platform Oversight & Compliance',
      description: 'Audit log inspection, institutional partner verifications, LoRaWAN IoT gateway monitoring, and user registry administration.',
      icon: ShieldAlert,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30 hover:border-red-400',
      badgeColor: 'bg-red-500/15 text-red-400 border-red-500/30',
      badge: 'Restricted Access',
      href: '/auth/admin',
      ctaText: 'Admin Gateway',
    },
  ]

  return (
    <main className="min-h-screen bg-[#070B16] text-slate-100 flex flex-col selection:bg-orange-500/25 selection:text-orange-400 relative overflow-x-hidden">
      {/* Floating Island Taskbar */}
      <Taskbar onSettingsClick={() => setDotColor(c => c === 'orange' ? 'emerald' : c === 'emerald' ? 'cyan' : 'orange')} />

      {/* ============================================================
          1. HERO SECTION WITH NAVY GRADIENT & INTERACTIVE CANVAS
          ============================================================ */}
      <section className="relative min-h-[85vh] pt-36 pb-20 md:pt-44 md:pb-24 overflow-hidden bg-[#0D1C44] bg-gradient-to-b from-[#0B1736] via-[#0E204E] to-[#070B16] flex flex-col justify-center">
        
        {/* Interactive Vivid DotGrid Background Canvas */}
        <div className="absolute inset-0 z-0">
          <DotGrid 
            dotSize={6}
            gap={24}
            baseColor="#224275"
            activeColor={activeColorHex}
            proximity={180}
            speedTrigger={30}
            shockRadius={320}
            shockStrength={10}
            resistance={500}
            returnDuration={1.2}
          />
        </div>

        {/* Ambient Structural Blue & Cyan Radial Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-gradient-to-tr from-blue-600/15 via-blue-500/10 to-transparent rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[550px] h-[400px] bg-blue-700/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Main Hero Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full space-y-8 text-center">
          
          {/* Project Pill Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-orange-400 text-xs font-mono font-semibold backdrop-blur-md shadow-lg"
          >
            <Sprout className="w-3.5 h-3.5 text-orange-400" />
            <span>MAZHI SHETI • माझी शेती</span>
            <span className="text-neutral-500">|</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Role-Based Sovereign Agriculture
            </span>
          </motion.div>

          {/* Two-Tone Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white leading-[1.12] drop-shadow-md uppercase max-w-4xl mx-auto"
          >
            Everything your farm needs, <br />
            <span className="text-[#F5820D] drop-shadow-sm">
              in one place.
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-sans text-base sm:text-lg md:text-xl text-blue-100/85 max-w-2xl mx-auto leading-relaxed font-normal drop-shadow-sm"
          >
            Sovereign agricultural infrastructure with strict role-based access for farmers, lending institutions, equipment providers, agronomists, and administrators.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#portals"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#22A567] hover:bg-[#1b8552] text-white font-black text-xs uppercase tracking-wider transition-all shadow-xl hover:shadow-emerald-950/40 flex items-center justify-center gap-2.5 group active:scale-[0.99]"
            >
              <span>CHOOSE YOUR ROLE PORTAL</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <Link
              href="/auth/select"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#081228]/85 hover:bg-[#0E1F4B] text-orange-400 border-2 border-orange-500/70 hover:border-orange-400 text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 tracking-wide shadow-lg"
            >
              <ShieldCheck className="w-4 h-4 text-orange-400" />
              <span>ROLE GATEWAYS</span>
              <span className="text-orange-400">→</span>
            </Link>
          </motion.div>

          {/* Trust Highlights */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-blue-200/70"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Tenant-Isolated Access
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Consent-Governed Data
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Clerk Identity Protected
            </span>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          2. ROLE-BASED ACCESS GATEWAYS (CORE FOCUS)
          ============================================================ */}
      <section id="portals" className="py-20 bg-[#070C1B] relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-mono font-bold tracking-wide">
              ROLE-BASED ACCESS CONTROL
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              One Platform. Scoped Portals.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-sans">
              Access Mazhi Sheti through dedicated, secure portals with isolated permissions for every stakeholder in the agricultural economy.
            </p>
          </div>

          {/* Role Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role, idx) => {
              const Icon = role.icon
              return (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className={`group relative rounded-2xl bg-[#0B152E]/80 border ${role.borderColor} p-6 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 hover:-translate-y-1`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl ${role.bgColor} border border-white/10 flex items-center justify-center ${role.color} group-hover:scale-105 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${role.badgeColor}`}>
                        {role.badge}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-baseline gap-2">
                        <h3 className="font-display font-bold text-lg text-white group-hover:text-orange-400 transition-colors">
                          {role.title}
                        </h3>
                        <span className="text-xs font-sans text-slate-400">
                          {role.marathi}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-blue-300/80 mt-0.5">
                        {role.subtitle}
                      </p>
                    </div>

                    <p className="text-xs font-sans text-blue-100/70 leading-relaxed">
                      {role.description}
                    </p>
                  </div>

                  <div>
                    <Link
                      href={role.href}
                      className="w-full py-2.5 rounded-xl bg-white/[0.06] hover:bg-orange-500 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 border border-white/10 group-hover:border-orange-400 group-hover:shadow-lg group-hover:shadow-orange-950/50"
                    >
                      <span>{role.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Security & Access Banner */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-3">
              <Lock className="w-4 h-4 text-orange-400 shrink-0" />
              <span>
                Each portal strictly validates identity credentials and enforces isolated data scopes.
              </span>
            </div>
            <Link
              href="/auth/select"
              className="text-orange-400 hover:text-orange-300 font-bold whitespace-nowrap transition-colors"
            >
              Overview All Gateways →
            </Link>
          </div>

        </div>
      </section>

      {/* ============================================================
          3. UNIFIED PLATFORM CAPABILITIES
          ============================================================ */}
      <section className="py-20 bg-[#0B142A] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              SOVEREIGN ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Integrated Agricultural Ecosystem
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-sans">
              Connecting real-world agronomy, machinery logistics, and institutional finance in a unified sovereign cloud.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#070D1F] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Sprout className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-mono">Soil & Irrigation Intelligence</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Real-time NPK assay monitoring, root-zone moisture metrics, and micro-sprinkler automation with hardware cut-offs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#070D1F] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Tractor className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-mono">Machinery Rental Hub</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Verified custom hiring centers with transparent hourly rates for tractors, seed drills, harvesters, and levelers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#070D1F] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Landmark className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-mono">Consent-Scoped Banking</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Kisan Credit Card (KCC) underwriting where banks only access land and harvest records explicitly authorized by the farmer.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================
          4. TRUSTED ECOSYSTEM MARQUEE
          ============================================================ */}
      <section className="py-10 bg-[#060913] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-xs font-mono text-slate-500 uppercase tracking-widest mb-6">
            Institutional & Agronomic Compliance
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 text-center text-xs font-mono text-slate-400">
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="font-bold text-slate-300">MSCB Baramati</span>
              <div className="text-[10px] text-slate-500">Cooperative Banking</div>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="font-bold text-slate-300">ICAR Soils</span>
              <div className="text-[10px] text-slate-500">Agronomic Standards</div>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="font-bold text-slate-300">Sahyadri Fleet</span>
              <div className="text-[10px] text-slate-500">Custom Hiring</div>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="font-bold text-slate-300">MPKV Rahuri</span>
              <div className="text-[10px] text-slate-500">Research Advisory</div>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="font-bold text-slate-300">NABL Labs</span>
              <div className="text-[10px] text-slate-500">Soil Assay Testing</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          5. FOOTER
          ============================================================ */}
      <footer className="bg-[#050811] border-t border-white/10 py-12 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <FarmerLogo size={28} showText={true} showBadge={false} subtitle="SOVEREIGN AGRI PLATFORM" />
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/auth/farmer" className="hover:text-white transition-colors">Farmer Login</Link>
            <Link href="/auth/bank" className="hover:text-white transition-colors">Bank Portal</Link>
            <Link href="/auth/provider" className="hover:text-white transition-colors">Fleet Provider</Link>
            <Link href="/auth/expert" className="hover:text-white transition-colors">Expert Advisory</Link>
            <Link href="/auth/admin" className="hover:text-white transition-colors">Admin Console</Link>
            <Link href="/auth/select" className="text-orange-400 hover:underline">Select Role →</Link>
          </div>
        </div>
      </footer>

    </main>
  )
}
