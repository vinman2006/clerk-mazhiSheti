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
import { SimulatedBadge } from '@/components/ui/SimulatedBadge'
import { useAuth } from '@/lib/authContext'
import dynamic from 'next/dynamic'

const DotGrid = dynamic(() => import('@/components/ui/DotGrid'), { ssr: false })

export default function LandingPage() {
  const { loginWithGoogle } = useAuth()
  const [activePortalTab, setActivePortalTab] = useState<'hospitals' | 'government' | 'researchers'>('hospitals')

  return (
    <div className="min-h-screen bg-[#070A12] text-[#F1F5F9] flex flex-col selection:bg-portal-orange/20 selection:text-portal-orange antialiased overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION — CLEAN HIGH-TRUST SOVEREIGN PORTAL */}
      <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden bg-gradient-to-b from-[#0D152F] via-[#090E1D] to-[#070A12]">
        {/* Interactive React Bits DotGrid Background Canvas */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <DotGrid 
            dotSize={3}
            gap={28}
            baseColor="#1E3A8A"
            activeColor="#F5820D"
            proximity={130}
            shockRadius={220}
            shockStrength={4}
            returnDuration={1.2}
          />
        </div>

        {/* Ambient Radial Soft Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#1E3A8A]/25 via-[#F5820D]/10 to-transparent rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111936]/80 border border-[#1E3A8A]/60 shadow-inner backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-portal-green animate-pulse"></span>
              <span className="font-mono text-xs font-semibold text-slate-200 tracking-wide">
                W3C DID & ZK-SNARK Enabled Multi-Agent Network
              </span>
            </div>

            {/* Two-Tone Headline */}
            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white leading-[1.12]">
              Healthcare access, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5820D] via-[#FFA34D] to-[#FFD5A3]">
                without giving up your privacy.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="font-sans text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
              Nexora is a privacy-first multi-agent healthcare network where patients, hospitals, and government services communicate and collaborate through AI agents while blockchain and zero-knowledge technology protect patient control and trust.
            </p>

            {/* Hero CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Primary CTA */}
              <Link
                href="/dashboard/agents"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-green-900/30 flex items-center justify-center gap-2.5 group active:scale-[0.99]"
              >
                <span>Launch Multi-Agent Enclave</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/architecture"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#11182C]/90 hover:bg-[#18223E] text-slate-200 hover:text-white border border-slate-700 hover:border-portal-orange/60 text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 tracking-wide shadow-md backdrop-blur-md"
              >
                <span>Technical Architecture</span>
                <span className="text-portal-orange">→</span>
              </Link>
            </div>
          </div>

          {/* Core Visual Metaphor: Interactive Node Diagram */}
          <div className="mt-12 max-w-5xl mx-auto">
            <div className="p-1 rounded-2xl bg-gradient-to-b from-[#1E3A8A]/50 via-slate-800/30 to-transparent shadow-2xl backdrop-blur-md">
              <div className="bg-[#0B1020]/95 rounded-[14px] p-4 sm:p-6 border border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-800/80">
                  <span className="font-mono text-xs text-slate-200 font-bold flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-portal-orange" />
                    Live Network Orchestration Visualizer
                  </span>
                  <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                    <span className="inline-flex items-center gap-1 text-portal-green">
                      <span className="w-1.5 h-1.5 rounded-full bg-portal-green"></span>
                      Decentralized
                    </span>
                    <span>•</span>
                    <span>Zero-Knowledge</span>
                    <span>•</span>
                    <span>Off-Chain IPFS</span>
                  </div>
                </div>
                <NodeDiagram mode="hero" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM / SOLUTION STRIP: FEDERATED LEARNING CONTRAST */}
      <section className="py-24 bg-[#0A0F1E] border-y border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-mono text-xs text-portal-orange font-bold uppercase tracking-wider">
              Privacy Paradigm Shift
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-black tracking-tight text-white">
              Why Existing Healthcare AI Breaches Patient Trust
            </h2>
            <p className="text-sm sm:text-base font-sans text-slate-300 leading-relaxed">
              Traditional healthcare AI hoards sensitive medical records in centralized cloud databases. Nexora flips the paradigm with edge compute and federated learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* The Old Way */}
            <div className="p-8 rounded-2xl bg-[#0F1528] border border-red-500/30 shadow-xl relative flex flex-col justify-between space-y-6 hover:border-red-500/50 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2.5 text-red-400 font-display font-bold text-lg">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <span>The Old Way (Centralized AI)</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-bold">
                    High Risk
                  </span>
                </div>

                <div className="space-y-3.5 text-xs font-sans">
                  <div className="p-4 rounded-xl bg-[#0B1020] border border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-2 text-slate-100 font-bold">
                      <Building2 className="w-4 h-4 text-red-400 shrink-0" />
                      <span>Hospitals A, B, C transmit raw patient records</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed pl-6">
                      Scans, clinical notes, and genomic sequences uploaded to third-party tech giants.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0B1020] border border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-2 text-red-400 font-bold">
                      <Database className="w-4 h-4 shrink-0" />
                      <span>Honeypot Centralized Database</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed pl-6">
                      Vulnerable to ransomware, catastrophic data leaks, and unauthorized commercial exploitation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 text-red-400 text-xs font-mono font-semibold">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Patients lose all control, ownership, and visibility once uploaded.</span>
              </div>
            </div>

            {/* The Nexora Way */}
            <div className="p-8 rounded-2xl bg-[#0F1528] border border-portal-green/40 shadow-xl relative flex flex-col justify-between space-y-6 hover:border-portal-green/60 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2.5 text-portal-green font-display font-bold text-lg">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>The Nexora Way (Federated Learning)</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-portal-green/10 border border-portal-green/30 text-portal-green text-xs font-mono font-bold">
                    Zero Trust ✓
                  </span>
                </div>

                <div className="space-y-3.5 text-xs font-sans">
                  <div className="p-4 rounded-xl bg-[#0B1020] border border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-2 text-slate-100 font-bold">
                      <Cpu className="w-4 h-4 text-portal-green shrink-0" />
                      <span>Local On-Premise Training Only</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed pl-6">
                      Each hospital trains AI locally behind its firewall. Raw patient records never leave the hospital premise.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0B1020] border border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-2 text-portal-orange font-bold">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span>Encrypted Weight Updates Only</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed pl-6">
                      Only mathematical gradient parameters are shared to improve the global diagnostic model via secure multiparty computation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 text-portal-green text-xs font-mono font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Patient consent cryptographically enforced via smart contracts.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE PILLARS SECTION */}
      <section className="py-24 relative bg-[#070A12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-mono text-xs text-portal-orange font-bold uppercase tracking-wider">
              Architecture Core
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-white">
              The Three Pillars of Nexora
            </h2>
            <p className="text-sm sm:text-base font-sans text-slate-300">
              AI is the interface, not the trust layer. Trust is guaranteed through cryptography.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Pillar 1: Healthcare Access */}
            <div className="p-7 rounded-2xl bg-[#0F1528] border border-slate-800 hover:border-portal-orange/40 shadow-lg space-y-6 flex flex-col justify-between transition-all group">
              <div className="space-y-3.5">
                <div className="w-12 h-12 rounded-xl bg-portal-orange/15 border border-portal-orange/30 flex items-center justify-center text-portal-orange group-hover:scale-105 transition-transform">
                  <Activity className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  1. Healthcare Access
                </h3>
                <p className="text-xs sm:text-sm font-sans text-slate-300 leading-relaxed">
                  Discover and book certified cardiologists, endocrinologists, diagnostic labs, and hospitals with verified credentials and transparent pricing.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B1020] border border-slate-800 font-mono text-xs space-y-2">
                <div className="flex justify-between text-slate-400">
                  <span>Provider Search:</span>
                  <span className="text-portal-orange font-bold">DID-Verified</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Booking Event:</span>
                  <span className="text-slate-200 font-bold">Consent Tx Created</span>
                </div>
              </div>
            </div>

            {/* Pillar 2: Multi-Agent Layer */}
            <div className="p-7 rounded-2xl bg-[#0F1528] border border-slate-800 hover:border-portal-orange/40 shadow-lg space-y-6 flex flex-col justify-between transition-all group">
              <div className="space-y-3.5">
                <div className="w-12 h-12 rounded-xl bg-portal-orange/15 border border-portal-orange/30 flex items-center justify-center text-portal-orange group-hover:scale-105 transition-transform">
                  <Bot className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="font-display text-xl font-bold text-portal-orange">
                  2. Multi-Agent Layer
                </h3>
                <p className="text-xs sm:text-sm font-sans text-slate-300 leading-relaxed">
                  Patient Agent, Hospital Agents, and Government Agents autonomously communicate to route requests, check slots, and verify subsidies.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B1020] border border-slate-800 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Patient ⇄ Hosp ⇄ Gov:</span>
                  <span className="text-portal-orange font-bold">Agentic P2P</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Privacy Buffer:</span>
                  <span className="text-portal-green font-bold">Zero Data Leak ✓</span>
                </div>
              </div>
            </div>

            {/* Pillar 3: Privacy & Trust */}
            <div className="p-7 rounded-2xl bg-[#0F1528] border border-slate-800 hover:border-portal-green/40 shadow-lg space-y-6 flex flex-col justify-between transition-all group">
              <div className="space-y-3.5">
                <div className="w-12 h-12 rounded-xl bg-portal-green/15 border border-portal-green/30 flex items-center justify-center text-portal-green group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  3. Privacy & Trust Layer
                </h3>
                <p className="text-xs sm:text-sm font-sans text-slate-300 leading-relaxed">
                  W3C DIDs, Verifiable Credentials, Smart Consent Contracts, Zero-Knowledge Proofs, and an immutable audit trail guarantee patient sovereignty.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B1020] border border-slate-800 font-mono text-xs space-y-2">
                <div className="flex justify-between text-slate-400">
                  <span>Medical Records:</span>
                  <span className="text-portal-green font-bold">Off-Chain IPFS</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>On-Chain Layer:</span>
                  <span className="text-slate-200 font-bold">Proofs & Consents</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW CONSENT WORKS: 4-STEP FLOW */}
      <section className="py-24 bg-[#0A0F1E] border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-mono text-xs text-portal-orange font-bold uppercase tracking-wider">
              Cryptographic Protocol
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-white">
              How Smart Consent Works
            </h2>
            <p className="text-sm sm:text-base font-sans text-slate-300">
              Every data access request is gated by an immutable, time-limited smart contract.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Patient Grants Consent',
                desc: 'Select precise data scope (e.g. cardiac telemetry only) and set time expiry.',
                icon: KeyRound,
                badge: 'Signed with DID'
              },
              {
                step: '02',
                title: 'Contract Records Permission',
                desc: 'Smart contract mints an on-chain permission token tied to the provider DID.',
                icon: Cpu,
                badge: 'Immutable State'
              },
              {
                step: '03',
                title: 'Hospital/AI Accesses Record',
                desc: 'Off-chain encrypted key is resolved only for approved scope and time duration.',
                icon: Database,
                badge: 'Zero Over-Access'
              },
              {
                step: '04',
                title: 'Patient Audits Access',
                desc: 'Real-time record logged to the immutable ledger: "Hospital X accessed report at 10:42 AM."',
                icon: FileText,
                badge: 'Verifiable Proof'
              }
            ].map((flow, index) => {
              const Icon = flow.icon
              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-[#0F1528] border border-slate-800 hover:border-portal-orange/40 shadow-md flex flex-col justify-between space-y-5 transition-all group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-portal-orange px-2 py-0.5 rounded bg-portal-orange/10 border border-portal-orange/30">
                        STEP {flow.step}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#0B1020] text-[10px] font-mono text-slate-300 border border-slate-800 font-bold">
                        {flow.badge}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-portal-orange/15 text-portal-orange w-fit">
                      <Icon className="w-5 h-5" />
                    </div>

                    <h4 className="font-sans font-bold text-base text-white">
                      {flow.title}
                    </h4>

                    <p className="text-xs font-sans text-slate-300 leading-relaxed">
                      {flow.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 text-[11px] font-mono text-portal-green font-bold flex items-center gap-1.5">
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
      <section className="py-24 bg-[#070A12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-mono text-xs text-portal-orange font-bold uppercase tracking-wider">
              Ecosystem Interfaces
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-white">
              Built for Every Healthcare Stakeholder
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-2 sm:gap-4 border-b border-slate-800 pb-5">
            <button
              onClick={() => setActivePortalTab('hospitals')}
              className={`px-5 py-3 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                activePortalTab === 'hospitals'
                  ? 'bg-portal-orange text-white shadow-lg shadow-orange-950/40'
                  : 'bg-[#0F1528] text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>For Hospitals & Labs</span>
            </button>

            <button
              onClick={() => setActivePortalTab('government')}
              className={`px-5 py-3 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                activePortalTab === 'government'
                  ? 'bg-portal-orange text-white shadow-lg shadow-orange-950/40'
                  : 'bg-[#0F1528] text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Landmark className="w-4 h-4" />
              <span>For Government Schemes</span>
            </button>

            <button
              onClick={() => setActivePortalTab('researchers')}
              className={`px-5 py-3 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                activePortalTab === 'researchers'
                  ? 'bg-portal-orange text-white shadow-lg shadow-orange-950/40'
                  : 'bg-[#0F1528] text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Microscope className="w-4 h-4" />
              <span>For Researchers</span>
            </button>
          </div>

          {/* Tab Content Panels */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#0F1528] border border-slate-800 shadow-2xl">
            {activePortalTab === 'hospitals' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/15 text-blue-300 text-xs font-mono font-bold border border-blue-500/30">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Hospital Portal</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-snug">
                    Federated AI Training & Clinical Scheduling
                  </h3>
                  <p className="text-sm font-sans text-slate-300 leading-relaxed">
                    Deploy local agent nodes behind your hospital firewall. Train diagnostic AI models without exposing patient health information (PHI), and receive autonomous booking requests directly via DID-verified channels.
                  </p>
                  <ul className="space-y-2.5 text-xs font-sans text-slate-300">
                    <li className="flex items-center gap-2 text-slate-100 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-portal-green shrink-0" />
                      <span>On-premises federated learning node controls</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-100 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-portal-green shrink-0" />
                      <span>Verifiable Credential issuance for hospital medical staff</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      href="/hospital-portal/ai-training"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-[0.99]"
                    >
                      <span>Open Hospital Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-[#0B1020] border border-slate-800 border-l-4 border-l-portal-blue shadow-inner">
                  <div className="flex items-center justify-between mb-4 text-xs font-mono">
                    <span className="text-slate-300 font-bold">Node Status: Apex Heart Node #01</span>
                    <span className="text-portal-green font-bold">Connected (Round #142) ✓</span>
                  </div>
                  <div className="space-y-2.5 font-mono text-xs">
                    <div className="p-3.5 rounded-lg bg-[#0F1528] border border-slate-800 flex justify-between">
                      <span className="text-slate-400">Local PHI Records:</span>
                      <span className="text-portal-orange font-bold">100% In-Hospital Boundary</span>
                    </div>
                    <div className="p-3.5 rounded-lg bg-[#0F1528] border border-slate-800 flex justify-between">
                      <span className="text-slate-400">Model Shared:</span>
                      <span className="text-portal-green font-bold">Gradients Only (zk-Aggregated)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePortalTab === 'government' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-portal-green/15 text-portal-green text-xs font-mono font-bold border border-portal-green/30">
                    <Landmark className="w-3.5 h-3.5" />
                    <span>Government Portal</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-snug">
                    Zero-Knowledge Subsidy & Scheme Administration
                  </h3>
                  <p className="text-sm font-sans text-slate-300 leading-relaxed">
                    Verify citizen eligibility for specialized subsidies and healthcare grants in milliseconds using zero-knowledge proofs without collecting or storing citizens' private tax documents.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/gov-portal"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-[0.99]"
                    >
                      <span>Open Government Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-[#0B1020] border border-slate-800 border-l-4 border-l-portal-green font-mono text-xs space-y-3 shadow-inner">
                  <div className="text-slate-300 font-bold">ZK-Verification Queue:</div>
                  <div className="p-3.5 rounded-lg bg-[#0F1528] border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="text-white block font-sans font-bold">Scheme #CARDIO-2026</span>
                      <span className="text-[11px] text-slate-400">Citizen: did:nexora:pat:8f9a...</span>
                    </div>
                    <span className="px-3 py-1 rounded-md bg-portal-green/20 text-portal-green text-xs font-bold">
                      Proof Valid ✓
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activePortalTab === 'researchers' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/15 text-purple-300 text-xs font-mono font-bold border border-purple-500/30">
                    <Microscope className="w-3.5 h-3.5" />
                    <span>Researcher Portal</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-snug">
                    Anonymized Research & ZK-Gated Cohort Queries
                  </h3>
                  <p className="text-sm font-sans text-slate-300 leading-relaxed">
                    Query epidemiologic trends, rare variant correlations, and treatment outcomes across participating hospitals with differential privacy guarantees (k-anonymity=50).
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/research"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-[0.99]"
                    >
                      <span>Open Research Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-[#0B1020] border border-slate-800 border-l-4 border-l-purple-500 font-mono text-xs space-y-3 shadow-inner">
                  <div className="text-slate-300 font-bold">Research Request Matrix:</div>
                  <div className="p-3.5 rounded-lg bg-[#0F1528] border border-slate-800 space-y-1">
                    <span className="text-white block font-sans font-bold">Cardiovascular Cohort 2026</span>
                    <span className="text-[11px] text-portal-green font-bold block">ZK-Differential Privacy Protocol Active ✓</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* TRUST & TECHNICAL CREDIBILITY STRIP */}
      <section className="py-20 bg-[#0A0F1E] border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center">
            <span className="font-mono text-xs text-portal-orange font-bold uppercase tracking-wider">
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
                  className="p-5 rounded-2xl bg-[#0F1528] border border-slate-800 hover:border-slate-700 transition-all text-center flex flex-col items-center justify-center space-y-2 shadow-md group"
                >
                  <div className="p-2.5 rounded-xl bg-portal-orange/15 text-portal-orange mb-1 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono font-bold text-xs text-white">{badge.title}</span>
                  <span className="font-sans text-xs text-slate-400">{badge.desc}</span>
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
