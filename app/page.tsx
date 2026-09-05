'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Sprout, 
  TrendingUp, 
  Sun, 
  Droplets, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Tractor, 
  ShoppingBag, 
  Landmark, 
  Bot, 
  Lock, 
  Activity,
  Check,
  AlertCircle,
  Eye,
  Sliders,
  Play,
  RotateCcw
} from 'lucide-react'
import { Taskbar } from '@/components/layout/Taskbar'
import { FarmerLogo } from '@/components/ui/FarmerLogo'

// Dynamically import DotGrid to ensure canvas runs on client side without hydration mismatch
const DotGrid = dynamic(() => import('@/components/ui/DotGrid'), { ssr: false })

export default function HomePage() {
  const [dotColor, setDotColor] = useState<'orange' | 'emerald' | 'cyan'>('orange')
  const [sprinklerActive, setSprinklerActive] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'soil' | 'organic' | 'finance'>('overview')

  const activeColorHex = 
    dotColor === 'orange' ? '#F5820D' :
    dotColor === 'emerald' ? '#22C55E' : '#38BDF8'

  return (
    <main className="min-h-screen bg-[#070B16] text-slate-100 flex flex-col selection:bg-orange-500/25 selection:text-orange-400 relative overflow-x-hidden">
      {/* Floating Island Taskbar */}
      <Taskbar onSettingsClick={() => setDotColor(c => c === 'orange' ? 'emerald' : c === 'emerald' ? 'cyan' : 'orange')} />

      {/* ============================================================
          1. HERO SECTION WITH NAVY BLUE BACKGROUND & INTERACTIVE DOT GRID
          ============================================================ */}
      <section className="relative min-h-screen pt-36 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#0D1C44] bg-gradient-to-b from-[#0B1736] via-[#0E204E] to-[#070B16] flex flex-col justify-center">
        
        {/* Interactive Vivid DotGrid Background Canvas */}
        <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
          <DotGrid 
            dotSize={3.5}
            gap={24}
            baseColor="#2A4880"
            activeColor={activeColorHex}
            proximity={160}
            shockRadius={260}
            shockStrength={5}
            returnDuration={1.2}
          />
        </div>

        {/* Ambient Structural Blue & Cyan Radial Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-gradient-to-tr from-blue-600/15 via-blue-500/10 to-transparent rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[550px] h-[400px] bg-blue-700/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full space-y-12">
          
          {/* Header & Titles */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
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
                The Farmer Operating System
              </span>
            </motion.div>

            {/* Two-Tone Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white leading-[1.12] drop-shadow-md uppercase"
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
              className="font-sans text-base sm:text-lg md:text-xl text-blue-100/85 max-w-3xl mx-auto leading-relaxed font-normal drop-shadow-sm"
            >
              Mazhi Sheti connects farmers with soil intelligence, smart farming, equipment, markets, finance and expert guidance — helping every farm move toward healthier and more sustainable agriculture.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              {/* Primary Green CTA */}
              <Link
                href="/farmer/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#22A567] hover:bg-[#1b8552] text-white font-black text-xs uppercase tracking-wider transition-all shadow-xl hover:shadow-emerald-950/40 flex items-center justify-center gap-2.5 group active:scale-[0.99]"
              >
                <span>OPEN MY FARM</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/auth/select"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#081228]/85 hover:bg-[#0E1F4B] text-orange-400 border-2 border-orange-500/70 hover:border-orange-400 text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 tracking-wide shadow-lg"
              >
                <span>EXPLORE PLATFORM ROLES</span>
                <span className="text-orange-400">→</span>
              </Link>
            </motion.div>
          </div>

          {/* ============================================================
              LIVE-LOOKING FARM COMMAND CENTER PREVIEW (SECTION 40)
              ============================================================ */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-5xl mx-auto rounded-3xl bg-[#0B152E]/90 border border-white/10 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6"
          >
            {/* Header bar of Live Preview */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                      MY FARM COMMAND CENTER • LIVE TELEMETRY
                    </h2>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                      CONNECTED
                    </span>
                  </div>
                  <p className="text-xs text-blue-200/70">
                    Anandarao Patil Farm • Baramati, Maharashtra • 14.5 Total Acres Supervised
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSprinklerActive(!sprinklerActive)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                    sprinklerActive 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' 
                      : 'bg-white/[0.04] text-slate-400 border border-white/10'
                  }`}
                >
                  <Droplets className={`w-3.5 h-3.5 ${sprinklerActive ? 'text-cyan-400 animate-pulse' : ''}`} />
                  <span>Sprinkler Valve: {sprinklerActive ? 'ACTIVE (08:32)' : 'STANDBY'}</span>
                </button>
              </div>
            </div>

            {/* The Key Live Indicators from Section 40 */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {/* Metric 1 */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Soil Health</span>
                <div className="text-2xl font-black text-emerald-400 font-mono">82 / 100</div>
                <div className="text-[10px] text-emerald-400/80 font-mono">Grade A (Fertile)</div>
              </div>

              {/* Metric 2 */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Moisture</span>
                <div className="text-2xl font-black text-cyan-400 font-mono">42%</div>
                <div className="text-[10px] text-cyan-400/80 font-mono">Optimal Root Zone</div>
              </div>

              {/* Metric 3 */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Fields</span>
                <div className="text-2xl font-black text-white font-mono">4</div>
                <div className="text-[10px] text-slate-400 font-mono">14.5 Total Acres</div>
              </div>

              {/* Metric 4 */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Connected Devices</span>
                <div className="text-2xl font-black text-orange-400 font-mono">6</div>
                <div className="text-[10px] text-orange-400/80 font-mono">LoRaWAN Online</div>
              </div>

              {/* Metric 5 */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Organic Journey</span>
                <div className="text-2xl font-black text-indigo-400 font-mono">Stage 3 / 6</div>
                <div className="text-[10px] text-indigo-400/80 font-mono">Organic Inputs Active</div>
              </div>

              {/* Metric 6 */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">KCC Loan Status</span>
                <div className="text-2xl font-black text-emerald-400 font-mono">APPROVED</div>
                <div className="text-[10px] text-slate-400 font-mono">₹3.50L MSCB Bank</div>
              </div>
            </div>

            {/* Next Action Bar (from Section 40) */}
            <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-orange-400 uppercase">Recommended Next Action:</span>
                  <p className="text-xs text-white font-sans">
                    "Field 02 moisture is below target (28.5%). Micro-sprinkler zone initiated. Increase organic matter using Jeevamrutha to retain root moisture."
                  </p>
                </div>
              </div>

              <Link
                href="/farmer/dashboard"
                className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono font-bold transition-colors whitespace-nowrap self-start sm:self-auto"
              >
                Inspect Zone →
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ============================================================
          2. TRUSTED FARMING INFRASTRUCTURE / MARQUEE
          ============================================================ */}
      <section className="py-10 bg-[#060913] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-xs font-mono text-slate-500 uppercase tracking-widest mb-6">
            Trusted by India's Agricultural Ecosystem & Cooperative Financial Networks
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
              <div className="text-[10px] text-slate-500">Custom Hiring Centers</div>
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
          3. EVERYTHING IN ONE PLACE — UNIFIED OPERATING SYSTEM
          ============================================================ */}
      <section className="py-20 bg-[#070C1B] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
              Unified Platform Philosophy
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              An Operating System for the Modern Farmer.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-sans">
              No farmer should have to use ten disconnected applications. Mazhi Sheti unifies your digital identity, field boundaries, IoT sensor readings, machinery rental, and institutional banking into one coherent experience.
            </p>
          </div>

          {/* Core Architecture Wheel / Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-[#0B152E]/70 border border-white/10 hover:border-white/20 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center">
                <Sprout className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">1. Field & Crop Management</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Map acreage, soil classifications, planting dates, and crop cycles across Sugarcane, Soybean, Cotton, and Pomegranate with real-time health indicators.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0B152E]/70 border border-white/10 hover:border-white/20 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <Droplets className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">2. Soil & Automated Irrigation</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Monitor root-zone moisture, NPK ratios, and pH levels. Trigger micro-sprinklers with automated safety cutoffs and hardware fail-safes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0B152E]/70 border border-white/10 hover:border-white/20 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">3. 6-Stage Organic Journey</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                A non-dogmatic, gradual transition plan: from chemical dependency reduction to biological soil stewardship and zero-tillage adoption.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0B152E]/70 border border-white/10 hover:border-white/20 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Tractor className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">4. Tractor & Machinery Rental</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Book John Deere 55HP tractors, laser land levelers, rotavators, and seed drills from verified local custom hiring fleets with transparent hourly billing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0B152E]/70 border border-white/10 hover:border-white/20 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">5. Direct Crop Marketplace</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                List harvested grains and organic produce directly to institutional buyers and processors with real-time APMC mandi benchmark pricing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0B152E]/70 border border-white/10 hover:border-white/20 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Landmark className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">6. Consent-Driven Finance</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Apply for Kisan Credit Card (KCC) and Agri Infrastructure loans. Banks only access verified farm records when you explicitly grant scoped consent.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================
          4. THE 6-STAGE ORGANIC TRANSITION ROADMAP (SECTION 21)
          ============================================================ */}
      <section className="py-20 bg-[#0B142A] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              The Organic Transition Engine
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              A Realistic Path to Sustainable Agriculture.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-sans leading-relaxed">
              We never force immediate organic adoption. Mazhi Sheti designs an individualized 6-stage biological journey tailored to your current soil health score and economic needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
            {[
              { num: '01', title: 'Soil Baseline', desc: 'Comprehensive NPK, pH & Organic Carbon assay', color: 'text-slate-400', badge: 'COMPLETED' },
              { num: '02', title: 'Chemical Reduction', desc: 'Reduce synthetic urea & DAP inputs by 30%', color: 'text-slate-400', badge: 'COMPLETED' },
              { num: '03', title: 'Organic Inputs', desc: 'Integrate Jeevamrutha & farmyard manure', color: 'text-emerald-400', badge: 'ACTIVE STAGE' },
              { num: '04', title: 'Biological Soil', desc: 'Microbial bio-fertilizers & Trichoderma inoculation', color: 'text-slate-400', badge: 'NEXT' },
              { num: '05', title: 'Reduced Tillage', desc: 'Cover cropping & minimum tillage adoption', color: 'text-slate-400', badge: 'PLANNED' },
              { num: '06', title: 'Organic Farm', desc: 'NPOP certification & premium harvest sales', color: 'text-slate-400', badge: 'DESTINATION' },
            ].map((step, idx) => (
              <div 
                key={idx} 
                className={`p-4 rounded-2xl bg-[#070D1F] border ${step.badge === 'ACTIVE STAGE' ? 'border-emerald-500/50 shadow-lg shadow-emerald-950/40' : 'border-white/10'} space-y-2`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">STAGE {step.num}</span>
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold ${
                    step.badge === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400' :
                    step.badge === 'ACTIVE STAGE' ? 'bg-emerald-500 text-white' :
                    'bg-white/5 text-slate-400'
                  }`}>
                    {step.badge}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white font-mono">{step.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================
          5. PRIVACY & CONSENT ARCHITECTURE (SECTION 26 & 42)
          ============================================================ */}
      <section className="py-20 bg-[#070B16] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>Data Sovereignty & Privacy by Design</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Your Farm Data Belongs to You.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-sans">
              Banks and lenders cannot freely inspect your farm. Every single access is strictly gated by scoped farmer consent, enforced server-side, and recorded to an immutable audit log.
            </p>
          </div>

          <div className="max-w-4xl mx-auto rounded-3xl bg-[#0B152E]/80 border border-white/10 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Landmark className="w-6 h-6 text-blue-400" />
                <div>
                  <h4 className="text-sm font-bold text-white">Active Bank Consent Charter</h4>
                  <p className="text-xs text-slate-400 font-mono">MSCB Baramati • Kisan Credit Card Verification</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                Consent Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <span className="text-emerald-400 font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Granted Scopes (Least-Privilege)</span>
                </span>
                <ul className="text-slate-300 space-y-1 pl-6 list-disc">
                  <li>Farm Title & Supervised Acreage (14.5 Acres)</li>
                  <li>Soil Health Grade & Organic Carbon (82/100)</li>
                  <li>Crop Harvest History (Last 3 Seasons)</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <span className="text-rose-400 font-bold flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>Strictly Blocked by Protocol</span>
                </span>
                <ul className="text-slate-400 space-y-1 pl-6 list-disc">
                  <li>Private AI Agronomist Conversations</li>
                  <li>Direct IoT Sprinkler Actuator Controls</li>
                  <li>Unrelated Marketplace Crop Invoices</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2">
              <span>Farmers retain the right to revoke consent at any moment from their Finance dashboard.</span>
              <Link href="/farmer/finance" className="text-orange-400 hover:underline font-bold">
                Manage Consents →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================
          6. ROLE GATEWAYS (SECTION 69)
          ============================================================ */}
      <section className="py-20 bg-[#0B152E] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
              Choose Your Gateway
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              One Platform. Scoped Portals.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-sans">
              Enter Mazhi Sheti with tailored authentication experiences designed for farmers, financial institutions, equipment fleet providers, agronomists, and administrators.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* Farmer */}
            <Link 
              href="/auth/farmer"
              className="p-5 rounded-2xl bg-[#070D1F] border border-white/10 hover:border-emerald-500/50 hover:bg-[#0A1430] transition-all flex flex-col justify-between group space-y-4 shadow-lg"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sprout className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white font-mono">Farmer Portal</h4>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Mobile OTP login, farm command center, automated irrigation & organic roadmaps.
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                <span>Enter Farm</span>
                <span>→</span>
              </span>
            </Link>

            {/* Bank */}
            <Link 
              href="/auth/bank"
              className="p-5 rounded-2xl bg-[#070D1F] border border-white/10 hover:border-blue-500/50 hover:bg-[#0A1430] transition-all flex flex-col justify-between group space-y-4 shadow-lg"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Landmark className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white font-mono">Bank Portal</h4>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Institutional loan underwriting, Kisan Credit Card verification & consent audit logs.
                </p>
              </div>
              <span className="text-xs font-mono text-blue-400 font-bold flex items-center gap-1">
                <span>Access Bank</span>
                <span>→</span>
              </span>
            </Link>

            {/* Provider */}
            <Link 
              href="/auth/provider"
              className="p-5 rounded-2xl bg-[#070D1F] border border-white/10 hover:border-amber-500/50 hover:bg-[#0A1430] transition-all flex flex-col justify-between group space-y-4 shadow-lg"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Tractor className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white font-mono">Equipment Fleet</h4>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Custom hiring center fleet management, booking requests & hourly pricing controls.
                </p>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold flex items-center gap-1">
                <span>Fleet Console</span>
                <span>→</span>
              </span>
            </Link>

            {/* Expert */}
            <Link 
              href="/auth/expert"
              className="p-5 rounded-2xl bg-[#070D1F] border border-white/10 hover:border-indigo-500/50 hover:bg-[#0A1430] transition-all flex flex-col justify-between group space-y-4 shadow-lg"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white font-mono">Expert Network</h4>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Agronomic consultation queue, soil prescription approvals & organic mentoring.
                </p>
              </div>
              <span className="text-xs font-mono text-indigo-400 font-bold flex items-center gap-1">
                <span>Agronomist View</span>
                <span>→</span>
              </span>
            </Link>

            {/* Admin */}
            <Link 
              href="/auth/admin"
              className="p-5 rounded-2xl bg-[#070D1F] border border-white/10 hover:border-rose-500/50 hover:bg-[#0A1430] transition-all flex flex-col justify-between group space-y-4 shadow-lg"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white font-mono">Root Admin</h4>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Platform oversight, institution charters, live tamper-evident audit logs & telemetry.
                </p>
              </div>
              <span className="text-xs font-mono text-rose-400 font-bold flex items-center gap-1">
                <span>Admin Console</span>
                <span>→</span>
              </span>
            </Link>

          </div>
        </div>
      </section>

      {/* ============================================================
          7. FOOTER
          ============================================================ */}
      <footer className="bg-[#050811] border-t border-white/10 py-12 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <FarmerLogo className="w-6 h-6" />
            <span className="font-bold text-white uppercase tracking-wider">Mazhi Sheti • माझी शेती</span>
            <span className="text-slate-600">|</span>
            <span>Empowering Indian Agriculture with Data & Trust</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/auth/farmer" className="hover:text-white transition-colors">Farmer Login</Link>
            <Link href="/auth/bank" className="hover:text-white transition-colors">Bank Portal</Link>
            <Link href="/auth/admin" className="hover:text-white transition-colors">Admin Console</Link>
            <Link href="/farmer/dashboard" className="text-orange-400 hover:underline">Farmer Dashboard</Link>
          </div>
        </div>
      </footer>

    </main>
  )
}
