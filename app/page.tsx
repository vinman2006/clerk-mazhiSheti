'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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
  CheckCircle2,
  Cpu,
  KeyRound
} from 'lucide-react'
import { Taskbar } from '@/components/layout/Taskbar'
import { MazhiShetiLogo } from '@/components/ui/MazhiShetiLogo'
import { HeroTelemetryCard } from '@/components/landing/HeroTelemetryCard'
import { SmoothScroll } from '@/components/ui/SmoothScroll'

// Dynamically import DotGrid to ensure canvas runs purely on client
const DotGrid = dynamic(() => import('@/components/ui/DotGrid'), { ssr: false })

export default function HomePage() {
  const [dotColor, setDotColor] = useState<'orange' | 'emerald' | 'cyan'>('orange')
  const heroRef = useRef<HTMLElement>(null)

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
      borderColor: 'border-emerald-500/30 hover:border-emerald-400 hover:shadow-emerald-950/30 hover:bg-[#0C1A38]',
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
      borderColor: 'border-blue-500/30 hover:border-blue-400 hover:shadow-blue-950/30 hover:bg-[#0C1A38]',
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
      borderColor: 'border-orange-500/30 hover:border-orange-400 hover:shadow-orange-950/30 hover:bg-[#0C1A38]',
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
      borderColor: 'border-purple-500/30 hover:border-purple-400 hover:shadow-purple-950/30 hover:bg-[#0C1A38]',
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
      borderColor: 'border-red-500/30 hover:border-red-400 hover:shadow-rose-950/30 hover:bg-[#0C1A38]',
      badgeColor: 'bg-red-500/15 text-red-400 border-red-500/30',
      badge: 'Restricted Access',
      href: '/auth/admin',
      ctaText: 'Admin Gateway',
    },
  ]

  const stages = [
    { num: '01', title: 'Soil Baseline', desc: 'Comprehensive NPK, pH & Organic Carbon assay', badge: 'COMPLETED' },
    { num: '02', title: 'Chemical Reduction', desc: 'Taper synthetic urea & DAP inputs by 30%', badge: 'COMPLETED' },
    { num: '03', title: 'Organic Inputs', desc: 'Integrate Jeevamrutha & farmyard manure', badge: 'ACTIVE STAGE' },
    { num: '04', title: 'Biological Soil', desc: 'Microbial bio-fertilizers & Trichoderma inoculation', badge: 'NEXT' },
    { num: '05', title: 'Reduced Tillage', desc: 'Cover cropping & zero-tillage soil retention', badge: 'PLANNED' },
    { num: '06', title: 'Accredited Organic', desc: 'NPOP certification & premium harvest sales', badge: 'DESTINATION' },
  ]

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) return

    // 1. Coordinated Hero Entrance Timeline (Section 6)
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    heroTl
      .fromTo('#hero-brand', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 0.05)
      .fromTo('#hero-eyebrow', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45 }, 0.12)
      .fromTo('#hero-headline', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.65 }, 0.2)
      .fromTo('#hero-description', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.32)
      .fromTo('#hero-cta', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45 }, 0.42)
      .fromTo('#hero-trust', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.5)
      .fromTo('#hero-telemetry', { opacity: 0, y: 16, scale: 0.99 }, { opacity: 1, y: 0, scale: 1, duration: 0.65 }, 0.52)

    // 2. Role Portals ScrollTrigger (Section 9 & 14)
    const portalsEl = document.getElementById('portals')
    if (portalsEl) {
      gsap.fromTo(
        portalsEl.querySelectorAll('.portal-card'),
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.07,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: portalsEl,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }

    // 3. 6-Stage Transition Horizontal Progression (Section 15)
    const journeyEl = document.getElementById('transition-journey')
    if (journeyEl) {
      const stageCards = journeyEl.querySelectorAll('.stage-card')
      const progressBar = document.getElementById('stage-progress-bar')

      const journeyTl = gsap.timeline({
        scrollTrigger: {
          trigger: journeyEl,
          start: 'top 75%',
          once: true,
        },
      })

      if (progressBar) {
        journeyTl.fromTo(progressBar, { width: '0%' }, { width: '50%', duration: 1.1, ease: 'power2.inOut' }, 0)
      }

      journeyTl.fromTo(
        stageCards,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: 'power2.out' },
        0.15
      )
    }

    // 4. Subtle Data Flow Pulsing Indicator (Section 16)
    const pulse1 = document.getElementById('flow-pulse-1')
    const pulse2 = document.getElementById('flow-pulse-2')
    let flowTween1: gsap.core.Tween | null = null
    let flowTween2: gsap.core.Tween | null = null

    if (pulse1 && pulse2) {
      flowTween1 = gsap.to(pulse1, {
        x: 64,
        duration: 3.2,
        repeat: -1,
        ease: 'sine.inOut',
      })
      flowTween2 = gsap.to(pulse2, {
        x: 64,
        duration: 3.2,
        repeat: -1,
        delay: 1.6,
        ease: 'sine.inOut',
      })
    }

    // 5. Section Timelines Cleanup on Unmount (Section 29)
    return () => {
      heroTl.kill()
      if (flowTween1) flowTween1.kill()
      if (flowTween2) flowTween2.kill()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#070B16] text-slate-100 flex flex-col selection:bg-orange-500/25 selection:text-orange-400 relative overflow-x-hidden">
        {/* Floating Island Taskbar */}
        <Taskbar onSettingsClick={() => setDotColor(c => c === 'orange' ? 'emerald' : c === 'emerald' ? 'cyan' : 'orange')} />

        {/* ============================================================
            1. HERO SECTION WITH CALM AGRICULTURAL DOT GRID & TELEMETRY
            ============================================================ */}
        <section 
          ref={heroRef}
          className="relative min-h-[90vh] pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-[#0D1C44] bg-gradient-to-b from-[#0B1736] via-[#0E204E] to-[#070B16] flex flex-col justify-center"
        >
          {/* Calm, GPU-Efficient DotGrid Background (Strictly 80% stable, 20% moving) */}
          <div className="absolute inset-0 z-0">
            <DotGrid 
              dotSize={5}
              gap={26}
              baseColor="#224275"
              activeColor={activeColorHex}
            />
          </div>

          {/* Ambient Structural Blue & Cyan Radial Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-gradient-to-tr from-blue-600/15 via-blue-500/10 to-transparent rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-[550px] h-[400px] bg-blue-700/10 rounded-full blur-[140px] pointer-events-none" />

          {/* Main Hero Content */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full space-y-6 text-center">
            
            {/* 1. Master Brand Anchor (Option 01 The Leaf) */}
            <div id="hero-brand" className="flex justify-center">
              <MazhiShetiLogo
                size={38}
                showText={true}
                showBadge={true}
                subtitle="SOVEREIGN AGRI PLATFORM"
                className="bg-[#0A1735]/80 px-4 py-2 rounded-2xl border border-white/10 backdrop-blur-md shadow-lg"
              />
            </div>

            {/* 2. Clean Eyebrow */}
            <div id="hero-eyebrow">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Role-Based Sovereign Agriculture Network
              </span>
            </div>

            {/* Two-Tone Headline (Order 3) */}
            <h1 
              id="hero-headline"
              className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white leading-[1.12] drop-shadow-md uppercase max-w-4xl mx-auto"
            >
              Everything your farm needs, <br />
              <span className="text-[#F5820D] drop-shadow-sm">
                in one place.
              </span>
            </h1>

            {/* Sub-headline (Order 4) */}
            <p 
              id="hero-description"
              className="font-sans text-base sm:text-lg md:text-xl text-blue-100/85 max-w-2xl mx-auto leading-relaxed font-normal drop-shadow-sm"
            >
              Sovereign agricultural infrastructure with strict role-based access for farmers, lending institutions, equipment providers, agronomists, and administrators.
            </p>

            {/* CTAs (Order 5) */}
            <div 
              id="hero-cta"
              className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="#portals"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#22A567] hover:bg-[#1b8552] text-white font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-xl hover:shadow-emerald-950/40 flex items-center justify-center gap-2.5 group hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <span>CHOOSE YOUR ROLE PORTAL</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <Link
                href="/auth/select"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#081228]/85 hover:bg-[#0E1F4B] text-orange-400 border-2 border-orange-500/70 hover:border-orange-400 text-xs font-mono font-bold transition-all duration-200 flex items-center justify-center gap-2 tracking-wide shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <ShieldCheck className="w-4 h-4 text-orange-400" />
                <span>ROLE GATEWAYS</span>
                <span className="text-orange-400">→</span>
              </Link>
            </div>

            {/* Trust Highlights (Order 5b) */}
            <div 
              id="hero-trust"
              className="pt-3 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-blue-200/70"
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
            </div>

            {/* Hero Live Telemetry Dashboard Panel (Order 6, Sections 6, 7, 8) */}
            <div id="hero-telemetry">
              <HeroTelemetryCard />
            </div>

          </div>
        </section>

        {/* ============================================================
            2. ROLE-BASED ACCESS GATEWAYS (ONE PLATFORM. SCOPED PORTALS.)
            ============================================================ */}
        <section id="portals" className="py-24 bg-[#070C1B] relative border-t border-white/10">
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

            {/* Role Cards Grid with Distinct Calm Accents (Section 14) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roles.map((role) => {
                const Icon = role.icon
                return (
                  <div
                    key={role.id}
                    className={`portal-card group relative rounded-2xl bg-[#0B152E]/80 border ${role.borderColor} p-6 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 hover:-translate-y-1`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-xl ${role.bgColor} border border-white/10 flex items-center justify-center ${role.color} transition-colors`}>
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
                        className="w-full py-2.5 rounded-xl bg-white/[0.06] hover:bg-orange-500 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 border border-white/10 group-hover:border-orange-400 group-hover:shadow-lg group-hover:shadow-orange-950/50 active:scale-[0.98]"
                      >
                        <span>{role.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
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
            3. SUSTAINABLE FARMING JOURNEY (6-STAGE TRANSITION ROADMAP, Section 15)
            ============================================================ */}
        <section id="transition-journey" className="py-24 bg-[#0A142D] border-t border-white/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
            
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wide">
                ORGANIC TRANSITION ENGINE
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                A Realistic Path to Sustainable Agriculture.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base font-sans leading-relaxed">
                Non-dogmatic agronomic progression. Mazhi Sheti designs an individualized 6-stage biological journey tailored to your soil health score and economic yield requirements.
              </p>
            </div>

            {/* Horizontal progression track */}
            <div className="relative">
              <div className="hidden lg:block absolute top-1/2 left-6 right-6 h-0.5 bg-white/10 -translate-y-1/2 z-0">
                <div id="stage-progress-bar" className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500/30 w-1/2 transition-all duration-1000" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5 relative z-10">
                {stages.map((st, idx) => (
                  <div
                    key={idx}
                    className={`stage-card p-4 rounded-2xl bg-[#070D1F]/90 border ${
                      st.badge === 'ACTIVE STAGE'
                        ? 'border-emerald-500/60 shadow-xl shadow-emerald-950/50 bg-[#0C1B3A]'
                        : st.badge === 'COMPLETED'
                        ? 'border-emerald-500/25'
                        : 'border-white/10'
                    } space-y-2.5 transition-all duration-300 hover:-translate-y-1`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-500">STAGE {st.num}</span>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold ${
                        st.badge === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400' :
                        st.badge === 'ACTIVE STAGE' ? 'bg-emerald-500 text-white' :
                        'bg-white/5 text-slate-400'
                      }`}>
                        {st.badge}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white font-mono">{st.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">{st.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ============================================================
            4. DATA SOVEREIGNTY & CONSENT FLOW (Section 16)
            ============================================================ */}
        <section id="data-sovereignty" className="py-24 bg-[#070B16] border-t border-white/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <span className="px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-mono font-bold tracking-wide inline-flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>DATA SOVEREIGNTY BY DESIGN</span>
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Your Farm Data Belongs to You.
              </h2>
              <p className="text-slate-400 text-sm sm:text-base font-sans">
                Banks and lenders cannot freely inspect your farm. Every access is strictly governed by cryptographic, time-bound consent with granular permission scopes.
              </p>
            </div>

            {/* Subtle Data Flow Architecture Bar: Farmer -> Consent Charter -> Scoped Token -> Bank */}
            <div className="max-w-4xl mx-auto p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-300 relative z-10">
                <div className="flex items-center gap-2">
                  <Sprout className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-white">Farmer Node</span>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-slate-600 relative w-24 justify-center">
                  <div className="h-0.5 w-full bg-white/10 relative overflow-hidden">
                    <div id="flow-pulse-1" className="absolute top-0 bottom-0 w-6 bg-emerald-400/80 rounded-full" />
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-orange-400" />
                  <span>Consent Charter</span>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-slate-600 relative w-24 justify-center">
                  <div className="h-0.5 w-full bg-white/10 relative overflow-hidden">
                    <div id="flow-pulse-2" className="absolute top-0 bottom-0 w-6 bg-blue-400/80 rounded-full" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-blue-400" />
                  <span className="font-bold text-white">Bank Underwriter</span>
                </div>
              </div>
            </div>

            {/* Active Consent Charter Card */}
            <div className="max-w-4xl mx-auto rounded-3xl bg-[#0B152E]/80 border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Active Institutional Consent Charter</h4>
                    <p className="text-xs text-slate-400 font-mono">MSCB Baramati • Kisan Credit Card Verification</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold self-start sm:self-auto">
                  Scope Verified ✓
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                  <span className="text-emerald-400 font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Authorized Scopes (Least-Privilege)</span>
                  </span>
                  <ul className="text-slate-300 space-y-1.5 pl-6 list-disc font-sans text-xs">
                    <li>7/12 Land Title Extract & Supervised Acreage (14.5 Acres)</li>
                    <li>Soil Health Grade & NPK Organic Balance (84/100)</li>
                    <li>Historical Yield Records (Past 3 Kharif Seasons)</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                  <span className="text-rose-400 font-bold flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span>Strictly Sealed by Protocol</span>
                  </span>
                  <ul className="text-slate-400 space-y-1.5 pl-6 list-disc font-sans text-xs">
                    <li>Private Agronomist Diagnostics & Personal Notes</li>
                    <li>Micro-Sprinkler Hardware Automation Controls</li>
                    <li>Direct Mandi Negotiation & Unsettled Inquiries</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ============================================================
            5. UNIFIED PLATFORM CAPABILITIES
            ============================================================ */}
        <section id="ecosystem" className="py-24 bg-[#0B142A] border-t border-white/10">
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
              <div className="p-6 rounded-2xl bg-[#070D1F] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Sprout className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-mono">Soil & Irrigation Intelligence</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Real-time NPK assay monitoring, root-zone moisture metrics, and micro-sprinkler automation with hardware cut-offs.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#070D1F] border border-white/10 hover:border-orange-500/40 transition-all duration-300 hover:-translate-y-1 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Tractor className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-mono">Machinery Rental Hub</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Verified custom hiring centers with transparent hourly rates for tractors, seed drills, harvesters, and levelers.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#070D1F] border border-white/10 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1 space-y-3">
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
            6. TRUSTED ECOSYSTEM MARQUEE
            ============================================================ */}
        <section className="py-12 bg-[#060913] border-y border-white/5">
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
            7. FOOTER
            ============================================================ */}
        <footer className="bg-[#050811] border-t border-white/10 py-12 text-xs font-mono text-slate-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <MazhiShetiLogo size={32} showText={true} showBadge={true} subtitle="SOVEREIGN AGRI PLATFORM" />
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
    </SmoothScroll>
  )
}
