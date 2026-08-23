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
  ChevronRight
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
    <div className="min-h-screen bg-background text-text-primary flex flex-col selection:bg-brand-teal/20 selection:text-brand-teal">
      <Navbar />

      {/* HERO SECTION — MODERNIZED GOVERNMENT TRUST PORTAL AESTHETIC WITH INTERACTIVE DOT GRID */}
      <section className="relative pt-32 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-gradient-to-b from-[#152A63] via-[#11224d] to-[#0B0E17]">
        {/* Interactive React Bits DotGrid Background Canvas */}
        <div className="absolute inset-0 z-0 opacity-40">
          <DotGrid 
            dotSize={4}
            gap={26}
            baseColor="#1E3A8A"
            activeColor="#F5820D"
            proximity={130}
            shockRadius={220}
            shockStrength={4}
            returnDuration={1.2}
          />
        </div>

        {/* Subtle Institutional Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-br from-portal-blue/20 via-portal-orange/10 to-transparent rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">


            {/* Two-Tone Headline */}
            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white leading-[1.15]">
              Healthcare access, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-portal-orange via-[#ff9b3d] to-portal-orange-light">
                without giving up your privacy.
              </span>
            </h1>

            <p className="font-sans text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              Nexora is a privacy-first multi-agent healthcare network where patients, hospitals, and government services communicate and collaborate through AI agents while blockchain and zero-knowledge technology protect patient control and trust.
            </p>

            {/* Hero CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Primary CTA (Success Green #2E7D32 for official trust cue) */}
              <Link
                href="/dashboard/agents"
                className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 uppercase tracking-wider group"
              >
                <span>Launch Multi-Agent Demo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* Secondary CTA (Structured Outline) */}
              <Link
                href="/architecture"
                className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-[#141826]/80 hover:bg-[#141826] text-portal-orange hover:text-white border-2 border-portal-orange/80 hover:border-portal-orange text-sm font-bold transition-all flex items-center justify-center gap-2 font-sans tracking-wide shadow-sm"
              >
                <span>Technical Architecture</span>
                <span className="text-portal-orange">→</span>
              </Link>
            </div>
          </div>

          {/* Core Visual Metaphor: Interactive Node Diagram */}
          <div className="mt-14 max-w-5xl mx-auto">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="font-mono text-xs text-neutral-300 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-portal-orange" />
                Live Network Orchestration Visualizer
              </span>
              <span className="text-[11px] font-mono text-portal-orange font-semibold">
                Decentralized • Zero-Knowledge • Off-Chain Storage
              </span>
            </div>
            <NodeDiagram mode="hero" />
          </div>
        </div>
      </section>

      {/* PROBLEM / SOLUTION STRIP: FEDERATED LEARNING CONTRAST */}
      <section className="py-20 bg-[#0D1B4C] border-y-2 border-portal-orange/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-mono text-xs text-portal-orange font-bold uppercase tracking-wider">
              Privacy Paradigm Shift
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-white">
              Why Existing Healthcare AI Breaches Patient Trust
            </h2>
            <p className="text-sm font-sans text-neutral-300">
              Traditional healthcare AI hoards sensitive medical records in centralized cloud databases. Nexora flips the paradigm with edge compute and federated learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* The Old Way */}
            <div className="p-6 sm:p-8 rounded-xl bg-[#141826] border border-neutral-700 border-l-4 border-l-red-500 shadow-xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-700">
                <div className="flex items-center gap-2 text-red-400 font-display font-bold text-lg">
                  <AlertTriangle className="w-5 h-5" />
                  <span>The Old Way (Centralized AI)</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-xs font-mono font-bold">
                  High Risk
                </span>
              </div>

              <div className="mt-6 space-y-4 text-xs font-sans">
                <div className="p-4 rounded-lg bg-[#101420] border border-neutral-700 space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <Building2 className="w-4 h-4 text-red-400" />
                    <span>Hospitals A, B, C transmit raw patient records</span>
                  </div>
                  <p className="text-neutral-400 leading-relaxed">
                    Scans, clinical notes, and genomic sequences uploaded to third-party tech giants.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#101420] border border-neutral-700 space-y-2">
                  <div className="flex items-center gap-2 text-red-400 font-bold">
                    <Database className="w-4 h-4" />
                    <span>Honeypot Centralized Database</span>
                  </div>
                  <p className="text-neutral-400 leading-relaxed">
                    Vulnerable to ransomware, catastrophic data leaks, and unauthorized commercial exploitation.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-red-400 text-xs font-mono font-bold pt-2">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Patients lose all control, ownership, and visibility once uploaded.</span>
                </div>
              </div>
            </div>

            {/* The Nexora Way */}
            <div className="p-6 sm:p-8 rounded-xl bg-[#141826] border border-neutral-700 border-l-4 border-l-portal-green shadow-xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-700">
                <div className="flex items-center gap-2 text-portal-green font-display font-bold text-lg">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>The Nexora Way (Federated Learning)</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-portal-green/20 text-portal-green text-xs font-mono font-bold">
                  Zero Trust ✓
                </span>
              </div>

              <div className="mt-6 space-y-4 text-xs font-sans">
                <div className="p-4 rounded-lg bg-[#101420] border border-neutral-700 space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <Cpu className="w-4 h-4 text-portal-green" />
                    <span>Local On-Premise Training Only</span>
                  </div>
                  <p className="text-neutral-300 leading-relaxed">
                    Each hospital trains AI locally behind its firewall. Raw patient records never leave the hospital premise.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#101420] border border-neutral-700 space-y-2">
                  <div className="flex items-center gap-2 text-portal-orange font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Encrypted Weight Updates Only</span>
                  </div>
                  <p className="text-neutral-300 leading-relaxed">
                    Only mathematical gradient parameters are shared to improve the global diagnostic model via secure multiparty computation.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-portal-green text-xs font-mono font-bold pt-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Patient consent cryptographically enforced via smart contracts.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE PILLARS SECTION */}
      <section className="py-24 relative bg-[#0B0E17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-mono text-xs text-portal-orange font-bold uppercase tracking-wider">
              Architecture Core
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-white">
              The Three Pillars of Nexora
            </h2>
            <p className="text-sm font-sans text-neutral-300">
              AI is the interface, not the trust layer. Trust is guaranteed through cryptography.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1: Healthcare Access */}
            <div className="p-6 rounded-xl bg-[#141826] border border-neutral-700 border-l-4 border-l-portal-orange shadow-lg space-y-4 flex flex-col justify-between hover:border-neutral-600 transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-portal-orange/20 border border-portal-orange/40 flex items-center justify-center text-portal-orange">
                  <Activity className="w-5 h-5 stroke-[2.2]" />
                </div>
                <h3 className="font-display text-lg font-bold text-white">
                  1. Healthcare Access
                </h3>
                <p className="text-xs font-sans text-neutral-300 leading-relaxed">
                  Discover and book certified cardiologists, endocrinologists, diagnostic labs, and hospitals with verified credentials and transparent pricing.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#101420] border border-neutral-700 font-mono text-[11px] space-y-1.5">
                <div className="flex justify-between text-neutral-400">
                  <span>Provider Search:</span>
                  <span className="text-portal-orange font-bold">DID-Verified</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Booking Event:</span>
                  <span className="text-white font-bold">Consent Tx Created</span>
                </div>
              </div>
            </div>

            {/* Pillar 2: Multi-Agent Layer */}
            <div className="p-6 rounded-xl bg-[#141826] border border-neutral-700 border-l-4 border-l-portal-orange shadow-lg space-y-4 flex flex-col justify-between hover:border-neutral-600 transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-portal-orange/20 border border-portal-orange/40 flex items-center justify-center text-portal-orange">
                  <Bot className="w-5 h-5 stroke-[2.2]" />
                </div>
                <h3 className="font-display text-lg font-bold text-portal-orange">
                  2. Multi-Agent Layer
                </h3>
                <p className="text-xs font-sans text-neutral-300 leading-relaxed">
                  Patient Agent, Hospital Agents, and Government Agents autonomously communicate to route requests, check slots, and verify subsidies.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#101420] border border-neutral-700 font-mono text-[11px] space-y-1.5">
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Patient ⇄ Hosp ⇄ Gov:</span>
                  <span className="text-portal-orange font-bold">Agentic P2P</span>
                </div>
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Privacy Buffer:</span>
                  <span className="text-portal-green font-bold">Zero Data Leak ✓</span>
                </div>
              </div>
            </div>

            {/* Pillar 3: Privacy & Trust */}
            <div className="p-6 rounded-xl bg-[#141826] border border-neutral-700 border-l-4 border-l-portal-green shadow-lg space-y-4 flex flex-col justify-between hover:border-neutral-600 transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-portal-green/20 border border-portal-green/40 flex items-center justify-center text-portal-green">
                  <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                </div>
                <h3 className="font-display text-lg font-bold text-white">
                  3. Privacy & Trust Layer
                </h3>
                <p className="text-xs font-sans text-neutral-300 leading-relaxed">
                  W3C DIDs, Verifiable Credentials, Smart Consent Contracts, Zero-Knowledge Proofs, and an immutable audit trail guarantee patient sovereignty.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#101420] border border-neutral-700 font-mono text-[11px] space-y-1.5">
                <div className="flex justify-between text-neutral-400">
                  <span>Medical Records:</span>
                  <span className="text-portal-green font-bold">Off-Chain IPFS</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>On-Chain Layer:</span>
                  <span className="text-white font-bold">Proofs & Consents</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW CONSENT WORKS: 4-STEP FLOW */}
      <section className="py-20 bg-[#0D1B4C] border-y-2 border-portal-orange/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-mono text-xs text-portal-orange font-bold uppercase tracking-wider">
              Cryptographic Protocol
            </span>
            <h2 className="font-display text-3xl font-black tracking-tight text-white">
              How Smart Consent Works
            </h2>
            <p className="text-sm font-sans text-neutral-300">
              Every data access request is gated by an immutable, time-limited smart contract.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  className="p-5 rounded-xl bg-[#141826] border border-neutral-700 border-l-4 border-l-portal-orange shadow-md flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-portal-orange">
                        STEP {flow.step}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#101420] text-[10px] font-mono text-neutral-300 border border-neutral-700 font-bold">
                        {flow.badge}
                      </span>
                    </div>

                    <div className="p-2 rounded bg-portal-orange/20 text-portal-orange w-fit">
                      <Icon className="w-4 h-4" />
                    </div>

                    <h4 className="font-sans font-bold text-sm text-white">
                      {flow.title}
                    </h4>

                    <p className="text-xs font-sans text-neutral-300 leading-relaxed">
                      {flow.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-neutral-700/60 text-[10px] font-mono text-portal-green font-bold flex items-center gap-1">
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
      <section className="py-24 bg-[#0B0E17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-mono text-xs text-portal-orange font-bold uppercase tracking-wider">
              Ecosystem Interfaces
            </span>
            <h2 className="font-display text-3xl font-black tracking-tight text-white">
              Built for Every Healthcare Stakeholder
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-3 border-b border-neutral-700 pb-4">
            <button
              onClick={() => setActivePortalTab('hospitals')}
              className={`px-4 py-2.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                activePortalTab === 'hospitals'
                  ? 'bg-portal-orange text-white shadow-md'
                  : 'bg-[#141826] text-neutral-300 hover:text-white border border-neutral-700'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>For Hospitals & Labs</span>
            </button>

            <button
              onClick={() => setActivePortalTab('government')}
              className={`px-4 py-2.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                activePortalTab === 'government'
                  ? 'bg-portal-orange text-white shadow-md'
                  : 'bg-[#141826] text-neutral-300 hover:text-white border border-neutral-700'
              }`}
            >
              <Landmark className="w-4 h-4" />
              <span>For Government Schemes</span>
            </button>

            <button
              onClick={() => setActivePortalTab('researchers')}
              className={`px-4 py-2.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                activePortalTab === 'researchers'
                  ? 'bg-portal-orange text-white shadow-md'
                  : 'bg-[#141826] text-neutral-300 hover:text-white border border-neutral-700'
              }`}
            >
              <Microscope className="w-4 h-4" />
              <span>For Researchers</span>
            </button>
          </div>

          {/* Tab Content Panels */}
          <div className="p-8 rounded-xl bg-[#141826] border-2 border-[#1E3A8A] shadow-xl">
            {activePortalTab === 'hospitals' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 text-xs font-mono font-bold border border-blue-500/40">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Hospital Portal</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Federated AI Training & Clinical Scheduling
                  </h3>
                  <p className="text-sm font-sans text-neutral-300 leading-relaxed">
                    Deploy local agent nodes behind your hospital firewall. Train diagnostic AI models without exposing patient health information (PHI), and receive autonomous booking requests directly via DID-verified channels.
                  </p>
                  <ul className="space-y-2 text-xs font-sans text-neutral-300">
                    <li className="flex items-center gap-2 text-white font-medium">
                      <CheckCircle2 className="w-4 h-4 text-portal-green" />
                      <span>On-premises federated learning node controls</span>
                    </li>
                    <li className="flex items-center gap-2 text-white font-medium">
                      <CheckCircle2 className="w-4 h-4 text-portal-green" />
                      <span>Verifiable Credential issuance for hospital medical staff</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      href="/hospital-portal/ai-training"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                    >
                      <span>Open Hospital Portal Demo</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="p-5 rounded-lg bg-[#101420] border border-neutral-700 border-l-4 border-l-portal-blue">
                  <div className="flex items-center justify-between mb-3 text-xs font-mono">
                    <span className="text-neutral-300 font-bold">Node Status: Apex Heart Node #01</span>
                    <span className="text-portal-green font-bold">Connected (Round #142) ✓</span>
                  </div>
                  <div className="space-y-2 font-mono text-xs">
                    <div className="p-3 rounded bg-[#141826] border border-neutral-700 flex justify-between">
                      <span className="text-neutral-400">Local PHI Records:</span>
                      <span className="text-portal-orange font-bold">100% In-Hospital Boundary</span>
                    </div>
                    <div className="p-3 rounded bg-[#141826] border border-neutral-700 flex justify-between">
                      <span className="text-neutral-400">Model Shared:</span>
                      <span className="text-portal-green font-bold">Gradients Only (zk-Aggregated)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePortalTab === 'government' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-portal-green/20 text-portal-green text-xs font-mono font-bold border border-portal-green/40">
                    <Landmark className="w-3.5 h-3.5" />
                    <span>Government Portal</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Zero-Knowledge Subsidy & Scheme Administration
                  </h3>
                  <p className="text-sm font-sans text-neutral-300 leading-relaxed">
                    Verify citizen eligibility for specialized subsidies and healthcare grants in milliseconds using zero-knowledge proofs without collecting or storing citizens' private tax documents.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/gov-portal"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                    >
                      <span>Open Government Portal Demo</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="p-5 rounded-lg bg-[#101420] border border-neutral-700 border-l-4 border-l-portal-green font-mono text-xs space-y-2">
                  <div className="text-neutral-300 font-bold">ZK-Verification Queue:</div>
                  <div className="p-3 rounded bg-[#141826] border border-neutral-700 flex justify-between items-center">
                    <div>
                      <span className="text-white block font-sans font-bold">Scheme #CARDIO-2026</span>
                      <span className="text-[10px] text-neutral-400">Citizen: did:nexora:pat:8f9a...</span>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-portal-green/20 text-portal-green text-xs font-bold">
                      Proof Valid ✓
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activePortalTab === 'researchers' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 text-xs font-mono font-bold border border-purple-500/40">
                    <Microscope className="w-3.5 h-3.5" />
                    <span>Researcher Portal</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Anonymized Research & ZK-Gated Cohort Queries
                  </h3>
                  <p className="text-sm font-sans text-neutral-300 leading-relaxed">
                    Query epidemiologic trends, rare variant correlations, and treatment outcomes across participating hospitals with differential privacy guarantees (k-anonymity=50).
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/research"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                    >
                      <span>Open Research Portal Demo</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="p-5 rounded-lg bg-[#101420] border border-neutral-700 border-l-4 border-l-purple-500 font-mono text-xs space-y-2">
                  <div className="text-neutral-300 font-bold">Research Request Matrix:</div>
                  <div className="p-3 rounded bg-[#141826] border border-neutral-700 space-y-1">
                    <span className="text-white block font-sans font-bold">Cardiovascular Cohort 2026</span>
                    <span className="text-[10px] text-portal-green font-bold block">ZK-Differential Privacy Protocol Active ✓</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* TRUST & TECHNICAL CREDIBILITY STRIP */}
      <section className="py-16 bg-[#0D1B4C] border-t-2 border-portal-orange/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="font-mono text-xs text-portal-orange font-bold uppercase tracking-wider">
              Cryptographic & Security Foundation
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                  className="p-4 rounded-xl bg-[#141826] border border-neutral-700 border-l-4 border-l-portal-orange hover:border-neutral-600 transition-all text-center flex flex-col items-center justify-center space-y-1.5 shadow-md"
                >
                  <div className="p-2 rounded bg-portal-orange/20 text-portal-orange mb-1">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono font-bold text-xs text-white">{badge.title}</span>
                  <span className="font-sans text-[11px] text-neutral-400">{badge.desc}</span>
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
