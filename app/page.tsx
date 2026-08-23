'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ShieldCheck,
  Bot,
  Lock,
  Activity,
  ArrowRight,
  Building2,
  Landmark,
  Microscope,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Scale,
  FileText,
  Sparkles,
  KeyRound,
  Database,
  Layers,
  ChevronRight,
  Globe,
  Radio
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { NodeDiagram } from '@/components/diagrams/NodeDiagram'
import { HashSplitDemo } from '@/components/landing/HashSplitDemo'
import { SimulatedBadge } from '@/components/ui/SimulatedBadge'
import { useAuth } from '@/lib/authContext'
import { useLanguage } from '@/lib/languageContext'
import dynamic from 'next/dynamic'

const DotGrid = dynamic(() => import('@/components/ui/DotGrid'), { ssr: false })

export default function LandingPage() {
  const { loginWithGoogle } = useAuth()
  const { t } = useLanguage()
  const [activePortalTab, setActivePortalTab] = useState<'hospitals' | 'government' | 'researchers'>('hospitals')

  return (
    <div className="min-h-screen bg-nexora-bg-base text-nexora-text-primary flex flex-col selection:bg-nexora-orange-500/20 selection:text-nexora-orange-400 antialiased overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION — TRUST-FIRST HIGH-PRECISION PORTAL */}
      <section className="relative pt-36 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#0D1C44] bg-gradient-to-b from-[#0B1736] via-[#0E204E] to-[#0A1530]">
        {/* Interactive Vivid DotGrid Background Canvas */}
        <div className="absolute inset-0 z-0 opacity-85 pointer-events-none">
          <DotGrid 
            dotSize={3.5}
            gap={24}
            baseColor="#2A4880"
            activeColor="#F5820D"
            proximity={160}
            shockRadius={260}
            shockStrength={5}
            returnDuration={1.2}
          />
        </div>

        {/* Ambient Structural Steel Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-gradient-to-tr from-blue-600/15 via-nexora-steel-500/10 to-transparent rounded-full blur-[160px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Two-Tone Headline */}
            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white leading-[1.12] drop-shadow-md">
              {t('hero_title_line1')} <br />
              <span className="text-nexora-orange-500 drop-shadow-sm">
                {t('hero_title_line2')}
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="font-sans text-base sm:text-lg md:text-xl text-blue-100/90 max-w-3xl mx-auto leading-relaxed font-normal drop-shadow-sm">
              {t('hero_subtitle')}
            </p>

            {/* Hero CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Primary CTA (Green Status for Launch / Positive Action) */}
              <Link
                href="/dashboard/agents"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-nexora-green-status hover:bg-[#1b8552] text-white font-black text-xs uppercase tracking-wider transition-all shadow-xl hover:shadow-emerald-950/40 flex items-center justify-center gap-2.5 group active:scale-[0.99]"
              >
                <span>{t('hero_cta_primary')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Secondary CTA (Dark navy with orange border) */}
              <Link
                href="/architecture"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#081228]/85 hover:bg-[#0E1F4B] text-nexora-orange-400 border-2 border-nexora-orange-500/70 hover:border-nexora-orange-400 text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 tracking-wide shadow-lg"
              >
                <span>{t('hero_cta_secondary')}</span>
                <span className="text-nexora-orange-400">→</span>
              </Link>
            </div>
          </div>

          {/* Core Visual Metaphor: Interactive Node Diagram */}
          <div className="mt-8 max-w-5xl mx-auto">
            <NodeDiagram mode="hero" />
          </div>
        </div>
      </section>

      {/* INTERACTIVE HASH SPLIT DEMO ANIMATION */}
      <HashSplitDemo />

      {/* PROBLEM / SOLUTION STRIP: FEDERATED LEARNING CONTRAST */}
      <section className="py-20 bg-nexora-bg-base border-y border-nexora-border-subtle relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-mono text-xs text-nexora-orange-400 font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[rgba(224,130,31,0.12)] border border-nexora-orange-500/30">
              {t('paradigm_badge')}
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-black tracking-tight text-nexora-text-primary">
              {t('paradigm_title')}
            </h2>
            <p className="text-sm sm:text-base font-sans text-nexora-text-secondary leading-relaxed">
              {t('paradigm_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* The Old Way */}
            <div className="p-8 rounded-2xl bg-nexora-bg-elevated border border-red-500/30 shadow-xl relative flex flex-col justify-between space-y-6 hover:border-red-500/50 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-nexora-border-subtle">
                  <div className="flex items-center gap-2.5 text-red-400 font-display font-bold text-lg">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <span>{t('old_way_title')}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-mono font-bold">
                    {t('old_way_risk')}
                  </span>
                </div>

                <div className="space-y-3.5 text-xs font-sans">
                  <div className="p-4 rounded-xl bg-nexora-bg-elevated-2 border border-nexora-border-subtle space-y-1.5">
                    <div className="flex items-center gap-2 text-nexora-text-primary font-bold">
                      <Building2 className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{t('old_way_hosp_transmit')}</span>
                    </div>
                    <p className="text-nexora-text-secondary leading-relaxed pl-6">
                      {t('old_way_hosp_desc')}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-nexora-bg-elevated-2 border border-nexora-border-subtle space-y-1.5">
                    <div className="flex items-center gap-2 text-red-400 font-bold">
                      <Database className="w-4 h-4 shrink-0" />
                      <span>{t('old_way_honeypot')}</span>
                    </div>
                    <p className="text-nexora-text-secondary leading-relaxed pl-6">
                      {t('old_way_honeypot_desc')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-nexora-border-subtle flex items-center gap-2 text-red-300 text-xs font-mono font-semibold">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>{t('old_way_footer')}</span>
              </div>
            </div>

            {/* The Nexora Way */}
            <div className="p-8 rounded-2xl bg-nexora-bg-elevated border border-nexora-green-status/40 shadow-xl relative flex flex-col justify-between space-y-6 hover:border-nexora-green-status/60 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-nexora-border-subtle">
                  <div className="flex items-center gap-2.5 text-nexora-green-status font-display font-bold text-lg">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>{t('nexora_way_title')}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-nexora-green-status/15 border border-nexora-green-status/40 text-nexora-green-status text-xs font-mono font-bold">
                    {t('nexora_way_badge')}
                  </span>
                </div>

                <div className="space-y-3.5 text-xs font-sans">
                  <div className="p-4 rounded-xl bg-nexora-bg-elevated-2 border border-nexora-border-subtle space-y-1.5">
                    <div className="flex items-center gap-2 text-nexora-text-primary font-bold">
                      <Cpu className="w-4 h-4 text-nexora-green-status shrink-0" />
                      <span>{t('nexora_way_local')}</span>
                    </div>
                    <p className="text-nexora-text-secondary leading-relaxed pl-6">
                      {t('nexora_way_local_desc')}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-nexora-bg-elevated-2 border border-nexora-border-subtle space-y-1.5">
                    <div className="flex items-center gap-2 text-nexora-orange-400 font-bold">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span>{t('nexora_way_weights')}</span>
                    </div>
                    <p className="text-nexora-text-secondary leading-relaxed pl-6">
                      {t('nexora_way_weights_desc')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-nexora-border-subtle flex items-center gap-2 text-nexora-green-status text-xs font-mono font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{t('nexora_way_footer')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE PILLARS SECTION */}
      <section className="py-20 relative bg-nexora-bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-mono text-xs text-nexora-orange-400 font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[rgba(224,130,31,0.12)] border border-nexora-orange-500/30">
              {t('pillars_core')}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-nexora-text-primary">
              {t('pillars_title')}
            </h2>
            <p className="text-sm sm:text-base font-sans text-nexora-text-secondary">
              {t('pillars_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Pillar 1: Healthcare Access */}
            <div className="p-7 rounded-2xl bg-nexora-bg-elevated border border-nexora-border-subtle hover:border-nexora-border-strong shadow-xl space-y-6 flex flex-col justify-between transition-all group">
              <div className="space-y-3.5">
                <div className="w-12 h-12 rounded-xl bg-nexora-steel-700/40 border border-nexora-steel-500/40 flex items-center justify-center text-nexora-steel-300 group-hover:scale-105 transition-transform">
                  <Activity className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="font-display text-xl font-bold text-nexora-text-primary">
                  {t('pillar_1_title')}
                </h3>
                <p className="text-xs sm:text-sm font-sans text-nexora-text-secondary leading-relaxed">
                  {t('pillar_1_desc')}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-nexora-bg-elevated-2 border border-nexora-border-subtle font-mono text-xs space-y-2">
                <div className="flex justify-between text-nexora-text-secondary">
                  <span>Provider Search:</span>
                  <span className="text-nexora-orange-400 font-bold">DID-Verified</span>
                </div>
                <div className="flex justify-between text-nexora-text-secondary">
                  <span>Booking Event:</span>
                  <span className="text-nexora-text-primary font-bold">Consent Tx Created</span>
                </div>
              </div>
            </div>

            {/* Pillar 2: Multi-Agent Layer */}
            <div className="p-7 rounded-2xl bg-nexora-bg-elevated border border-nexora-border-subtle hover:border-nexora-border-strong shadow-xl space-y-6 flex flex-col justify-between transition-all group">
              <div className="space-y-3.5">
                <div className="w-12 h-12 rounded-xl bg-[rgba(224,130,31,0.15)] border border-nexora-orange-500/30 flex items-center justify-center text-nexora-orange-400 group-hover:scale-105 transition-transform">
                  <Bot className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="font-display text-xl font-bold text-nexora-orange-400">
                  {t('pillar_2_title')}
                </h3>
                <p className="text-xs sm:text-sm font-sans text-nexora-text-secondary leading-relaxed">
                  {t('pillar_2_desc')}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-nexora-bg-elevated-2 border border-nexora-border-subtle font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-nexora-text-secondary">
                  <span>Patient ⇄ Hosp ⇄ Gov:</span>
                  <span className="text-nexora-orange-400 font-bold">Agentic P2P</span>
                </div>
                <div className="flex items-center justify-between text-nexora-text-secondary">
                  <span>Privacy Buffer:</span>
                  <span className="text-nexora-green-status font-bold">Zero Data Leak ✓</span>
                </div>
              </div>
            </div>

            {/* Pillar 3: Privacy & Trust */}
            <div className="p-7 rounded-2xl bg-nexora-bg-elevated border border-nexora-border-subtle hover:border-nexora-border-strong shadow-xl space-y-6 flex flex-col justify-between transition-all group">
              <div className="space-y-3.5">
                <div className="w-12 h-12 rounded-xl bg-nexora-green-status/15 border border-nexora-green-status/30 flex items-center justify-center text-nexora-green-status group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="font-display text-xl font-bold text-nexora-text-primary">
                  {t('pillar_3_title')}
                </h3>
                <p className="text-xs sm:text-sm font-sans text-nexora-text-secondary leading-relaxed">
                  {t('pillar_3_desc')}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-nexora-bg-elevated-2 border border-nexora-border-subtle font-mono text-xs space-y-2">
                <div className="flex justify-between text-nexora-text-secondary">
                  <span>Medical Records:</span>
                  <span className="text-nexora-green-status font-bold">Off-Chain IPFS</span>
                </div>
                <div className="flex justify-between text-nexora-text-secondary">
                  <span>On-Chain Layer:</span>
                  <span className="text-nexora-text-primary font-bold">Proofs & Consents</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW CONSENT WORKS: 4-STEP FLOW */}
      <section className="py-20 bg-nexora-bg-base border-y border-nexora-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-mono text-xs text-nexora-orange-400 font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[rgba(224,130,31,0.12)] border border-nexora-orange-500/30">
              {t('consent_protocol_badge')}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-nexora-text-primary">
              {t('consent_how_title')}
            </h2>
            <p className="text-sm sm:text-base font-sans text-nexora-text-secondary">
              {t('consent_how_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: t('consent_step1_title'),
                desc: t('consent_step1_desc'),
                icon: KeyRound,
                badge: 'Signed with DID'
              },
              {
                step: '02',
                title: t('consent_step2_title'),
                desc: t('consent_step2_desc'),
                icon: Cpu,
                badge: 'Immutable State'
              },
              {
                step: '03',
                title: t('consent_step3_title'),
                desc: t('consent_step3_desc'),
                icon: Database,
                badge: 'Zero Over-Access'
              },
              {
                step: '04',
                title: t('consent_step4_title'),
                desc: t('consent_step4_desc'),
                icon: FileText,
                badge: 'Verifiable Proof'
              }
            ].map((flow, index) => {
              const Icon = flow.icon
              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-nexora-bg-elevated border border-nexora-border-subtle hover:border-nexora-border-strong shadow-lg flex flex-col justify-between space-y-5 transition-all group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-nexora-orange-400 px-2 py-0.5 rounded bg-[rgba(224,130,31,0.12)] border border-nexora-orange-500/30">
                        STEP {flow.step}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-nexora-bg-elevated-2 text-[10px] font-mono text-nexora-steel-300 border border-nexora-border-subtle font-bold">
                        {flow.badge}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-nexora-steel-700/40 text-nexora-steel-300 border border-nexora-steel-500/40 w-fit">
                      <Icon className="w-5 h-5" />
                    </div>

                    <h4 className="font-sans font-bold text-base text-nexora-text-primary">
                      {flow.title}
                    </h4>

                    <p className="text-xs font-sans text-nexora-text-secondary leading-relaxed">
                      {flow.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-nexora-border-subtle text-[11px] font-mono text-nexora-green-status font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Cryptographically Enforced ✓</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FOR HOSPITALS / GOVERNMENT / RESEARCHERS PORTALS */}
      <section className="py-20 bg-nexora-bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-mono text-xs text-nexora-orange-400 font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[rgba(224,130,31,0.12)] border border-nexora-orange-500/30">
              {t('stakeholder_badge')}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-nexora-text-primary">
              {t('stakeholder_title')}
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-2 sm:gap-4 border-b border-nexora-border-subtle pb-5">
            <button
              onClick={() => setActivePortalTab('hospitals')}
              className={`px-5 py-3 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                activePortalTab === 'hospitals'
                  ? 'bg-nexora-orange-500 text-nexora-text-on-orange shadow-lg shadow-orange-950/40'
                  : 'bg-nexora-bg-elevated text-nexora-text-secondary hover:text-nexora-text-primary border border-nexora-border-subtle'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>{t('tab_hospitals')}</span>
            </button>

            <button
              onClick={() => setActivePortalTab('government')}
              className={`px-5 py-3 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                activePortalTab === 'government'
                  ? 'bg-nexora-orange-500 text-nexora-text-on-orange shadow-lg shadow-orange-950/40'
                  : 'bg-nexora-bg-elevated text-nexora-text-secondary hover:text-nexora-text-primary border border-nexora-border-subtle'
              }`}
            >
              <Landmark className="w-4 h-4" />
              <span>{t('tab_government')}</span>
            </button>

            <button
              onClick={() => setActivePortalTab('researchers')}
              className={`px-5 py-3 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                activePortalTab === 'researchers'
                  ? 'bg-nexora-orange-500 text-nexora-text-on-orange shadow-lg shadow-orange-950/40'
                  : 'bg-nexora-bg-elevated text-nexora-text-secondary hover:text-nexora-text-primary border border-nexora-border-subtle'
              }`}
            >
              <Microscope className="w-4 h-4" />
              <span>{t('tab_researchers')}</span>
            </button>
          </div>

          {/* Tab Content Panels */}
          <div className="p-8 sm:p-10 rounded-2xl bg-nexora-bg-elevated border border-nexora-border-strong shadow-2xl">
            {activePortalTab === 'hospitals' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-nexora-steel-700/30 text-nexora-steel-300 text-xs font-mono font-bold border border-nexora-steel-500/40">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Hospital Portal</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-nexora-text-primary leading-snug">
                    Federated AI Training & Clinical Scheduling
                  </h3>
                  <p className="text-sm font-sans text-nexora-text-secondary leading-relaxed">
                    Deploy local agent nodes behind your hospital firewall. Train diagnostic AI models without exposing patient health information (PHI), and receive autonomous booking requests directly via DID-verified channels.
                  </p>
                  <ul className="space-y-2.5 text-xs font-sans text-nexora-text-secondary">
                    <li className="flex items-center gap-2 text-nexora-text-primary font-medium">
                      <CheckCircle2 className="w-4 h-4 text-nexora-green-status shrink-0" />
                      <span>On-premises federated learning node controls</span>
                    </li>
                    <li className="flex items-center gap-2 text-nexora-text-primary font-medium">
                      <CheckCircle2 className="w-4 h-4 text-nexora-green-status shrink-0" />
                      <span>Verifiable Credential issuance for hospital medical staff</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      href="/hospital-portal/ai-training"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-nexora-green-status hover:bg-[#1b8552] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-[0.99]"
                    >
                      <span>Open Hospital Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-nexora-bg-elevated-2 border border-nexora-border-strong border-l-4 border-l-nexora-steel-500 shadow-inner">
                  <div className="flex items-center justify-between mb-4 text-xs font-mono">
                    <span className="text-nexora-text-primary font-bold">Node Status: Apex Heart Node #01</span>
                    <span className="text-nexora-green-status font-bold">Connected (Round #142) ✓</span>
                  </div>
                  <div className="space-y-2.5 font-mono text-xs">
                    <div className="p-3.5 rounded-lg bg-nexora-bg-surface border border-nexora-border-subtle flex justify-between">
                      <span className="text-nexora-text-secondary">Local PHI Records:</span>
                      <span className="text-nexora-orange-400 font-bold">100% In-Hospital Boundary</span>
                    </div>
                    <div className="p-3.5 rounded-lg bg-nexora-bg-surface border border-nexora-border-subtle flex justify-between">
                      <span className="text-nexora-text-secondary">Model Shared:</span>
                      <span className="text-nexora-green-status font-bold">Gradients Only (zk-Aggregated)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePortalTab === 'government' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-nexora-green-status/20 text-nexora-green-status text-xs font-mono font-bold border border-nexora-green-status/40">
                    <Landmark className="w-3.5 h-3.5" />
                    <span>Government Portal</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-nexora-text-primary leading-snug">
                    Zero-Knowledge Subsidy & Scheme Administration
                  </h3>
                  <p className="text-sm font-sans text-nexora-text-secondary leading-relaxed">
                    Verify citizen eligibility for specialized subsidies and healthcare grants in milliseconds using zero-knowledge proofs without collecting or storing citizens' private tax documents.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/gov-portal"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-nexora-green-status hover:bg-[#1b8552] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-[0.99]"
                    >
                      <span>Open Government Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-nexora-bg-elevated-2 border border-nexora-border-strong border-l-4 border-l-nexora-green-status font-mono text-xs space-y-3 shadow-inner">
                  <div className="text-nexora-text-primary font-bold">ZK-Verification Queue:</div>
                  <div className="p-3.5 rounded-lg bg-nexora-bg-surface border border-nexora-border-subtle flex justify-between items-center">
                    <div>
                      <span className="text-nexora-text-primary block font-sans font-bold">Scheme #CARDIO-2026</span>
                      <span className="text-[11px] text-nexora-text-muted">Citizen: did:nexora:pat:8f9a...</span>
                    </div>
                    <span className="px-3 py-1 rounded-md bg-nexora-green-status/20 text-nexora-green-status text-xs font-bold">
                      Proof Valid ✓
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activePortalTab === 'researchers' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-nexora-steel-700/30 text-nexora-steel-300 text-xs font-mono font-bold border border-nexora-steel-500/40">
                    <Microscope className="w-3.5 h-3.5" />
                    <span>Researcher Portal</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-nexora-text-primary leading-snug">
                    Anonymized Research & ZK-Gated Cohort Queries
                  </h3>
                  <p className="text-sm font-sans text-nexora-text-secondary leading-relaxed">
                    Query epidemiologic trends, rare variant correlations, and treatment outcomes across participating hospitals with differential privacy guarantees (k-anonymity=50).
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/research"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-nexora-green-status hover:bg-[#1b8552] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-[0.99]"
                    >
                      <span>Open Research Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-nexora-bg-elevated-2 border border-nexora-border-strong border-l-4 border-l-nexora-steel-500 font-mono text-xs space-y-3 shadow-inner">
                  <div className="text-nexora-text-primary font-bold">Research Request Matrix:</div>
                  <div className="p-3.5 rounded-lg bg-nexora-bg-surface border border-nexora-border-subtle space-y-1">
                    <span className="text-nexora-text-primary block font-sans font-bold">Cardiovascular Cohort 2026</span>
                    <span className="text-[11px] text-nexora-green-status font-bold block">ZK-Differential Privacy Protocol Active ✓</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* TRUST & TECHNICAL CREDIBILITY STRIP */}
      <section className="py-16 bg-nexora-bg-base border-t border-nexora-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center">
            <span className="font-mono text-xs text-nexora-orange-400 font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[rgba(224,130,31,0.12)] border border-nexora-orange-500/30">
              Cryptographic & Security Foundation
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { title: 'Zero-Knowledge Proofs', desc: 'zk-SNARKs for private assertions', icon: Lock },
              { title: 'Decentralized Identity', desc: 'W3C DID v1.0 standard', icon: KeyRound },
              { title: 'Federated Learning', desc: 'SMPC gradient aggregation', icon: Cpu },
              { title: 'Immutable Audit Trail', desc: 'Cryptographically hashed ledger', icon: FileText },
            ].map((badge, idx) => {
              const Icon = badge.icon
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-nexora-bg-elevated border border-nexora-border-subtle hover:border-nexora-border-strong transition-all text-center flex flex-col items-center justify-center space-y-2 shadow-md group"
                >
                  <div className="p-2.5 rounded-xl bg-nexora-steel-700/40 border border-nexora-steel-500/40 text-nexora-steel-300 mb-1 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono font-bold text-xs text-nexora-text-primary">{badge.title}</span>
                  <span className="font-sans text-xs text-nexora-text-secondary">{badge.desc}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
