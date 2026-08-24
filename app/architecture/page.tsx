'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  KeyRound, 
  FileCheck, 
  Cpu, 
  Scale, 
  Lock, 
  FileText, 
  ShieldCheck, 
  ArrowLeft, 
  Database, 
  Network, 
  Terminal, 
  Server, 
  Layers 
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { NodeDiagram } from '@/components/diagrams/NodeDiagram'
import { SimulatedBadge } from '@/components/ui/SimulatedBadge'
import { useGsapAnimations } from '@/lib/useGsapAnimations'

export default function ArchitecturePage() {
  const { containerRef } = useGsapAnimations()
  const blockchainConcepts = [
    {
      num: '01',
      id: 'did',
      title: 'Decentralized Identity (W3C DID)',
      icon: KeyRound,
      color: 'border-portal-orange text-portal-orange',
      bg: 'bg-portal-orange/20',
      technicalDesc: 'All network participants (patients, physicians, hospital legal entities, government agencies) hold W3C-compliant Decentralized Identifiers (DIDs) resolved on-chain. Key pairs are generated client-side using Edwards-curve Digital Signature Algorithm (Ed25519) or secp256k1. Private keys never leave the participant\'s local hardware enclave or secure enclave proxy. DIDs eliminate centralized identity provider honeypots and empower sovereign cryptographic authentication across multi-agent workflows.'
    },
    {
      num: '02',
      id: 'credentials',
      title: 'Verifiable Credentials (VCs)',
      icon: FileCheck,
      color: 'border-blue-400 text-blue-300',
      bg: 'bg-blue-500/20',
      technicalDesc: 'Licensing authorities (e.g. National Board of Medical Examiners, state health departments) issue cryptographically signed Verifiable Credentials directly to doctor and hospital DIDs. When a patient queries a provider, the provider\'s agent presents a zero-knowledge verifiable presentation demonstrating active board certification, surgical privileges, and malpractice standing without exposing administrative backend credentials or personal registry records.'
    },
    {
      num: '03',
      id: 'contracts',
      title: 'Smart Contracts (EVM / WASM Execution)',
      icon: Cpu,
      color: 'border-portal-orange text-portal-orange',
      bg: 'bg-portal-orange/20',
      technicalDesc: 'Deterministic, self-executing smart contracts govern access control policies, scheme allocations, and settlement logic without human intermediaries. Contracts enforce multi-signature authorization policies where data decryption keys are only derived when conditions (active appointment window, valid insurance voucher, patient signature) are verified on-chain. State transitions are verified by consensus nodes with sub-second finality.'
    },
    {
      num: '04',
      id: 'consent',
      title: 'Granular Smart Consent Manager',
      icon: Scale,
      color: 'border-portal-green text-portal-green',
      bg: 'bg-portal-green/20',
      technicalDesc: 'Consent is treated as a first-class cryptographic primitive. Patients issue cryptographically signed, time-bounded, purpose-scoped capability grants. A consent contract specifies exact data selectors (e.g., cardiovascular telemetry only, excluding mental health or genomic records) and hard expiry timestamps (e.g., 72 hours). Revocation is instant and broadcast across the ledger, immediately invalidating access keys across all participating agent nodes.'
    },
    {
      num: '05',
      id: 'zkp',
      title: 'Zero-Knowledge Proofs (zk-SNARKs)',
      icon: Lock,
      color: 'border-portal-orange text-portal-orange',
      bg: 'bg-portal-orange/20',
      technicalDesc: 'Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge (zk-SNARKs) allow patients and agents to prove mathematical statements about private data without revealing the underlying data. For instance, a patient proves to the Government Scheme Agent: "Income is strictly less than $65,000 and residency code is within District 4" using cryptographic arithmetic circuits (R1CS/Groth16). The verifier receives binary confirmation (Valid/Invalid) while zero tax documents or financial details are disclosed.'
    },
    {
      num: '06',
      id: 'audit',
      title: 'Immutable Cryptographic Audit Trail',
      icon: FileText,
      color: 'border-portal-green text-portal-green',
      bg: 'bg-portal-green/20',
      technicalDesc: 'Every interaction — from medical record access to eligibility verification and federated model gradient contribution — generates an append-only, tamper-evident cryptographic log entry stored on a distributed ledger. Each entry contains the accessor\'s DID, the exact timestamp, the purpose token, and the cryptographic content identifier (CID). Patients possess an unalterable forensic record of precisely who touched their health profile, when, and under which legal basis.'
    }
  ]

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#0B0E17] text-white flex flex-col selection:bg-portal-orange/20 selection:text-portal-orange"
    >
      <Navbar />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Breadcrumb */}
        <div className="space-y-4 gsap-reveal">
          <Link
            href="/"
            className="gsap-magnetic inline-flex items-center gap-2 text-xs font-mono font-bold text-portal-orange hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Network Overview</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-portal-orange font-bold uppercase tracking-wider">
                  Technical Whitepaper & Architecture
                </span>
                <SimulatedBadge variant="inline" label="Interactive Specification" />
              </div>
              <h1 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-white mt-1">
                Nexora System Architecture
              </h1>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-neutral-300 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  const specData = {
                    title: 'Nexora Sovereign Health Platform Specification',
                    version: '2.4-EVM',
                    standards: ['W3C DID v1.0', 'W3C Verifiable Credentials', 'zk-SNARK Groth16 / Plonk', 'AES-GCM-256 IPFS'],
                    publishedDate: new Date().toISOString(),
                    layers: [
                      'Layer 1: Sovereign Multi-Agent Coordination Enclave',
                      'Layer 2: On-Chain Cryptographic Consensus & Smart Consent Engine',
                      'Layer 3: Off-Chain Zero-Knowledge Decentralized IPFS Storage'
                    ],
                    compliance: ['HIPAA Compliant (Zero Raw PHI On-Chain)', 'GDPR Article 9 Compliant', 'ABDM M3 Compatible']
                  }
                  const blob = new Blob([JSON.stringify(specData, null, 2)], { type: 'application/json' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = 'nexora-technical-architecture-spec.json'
                  a.click()
                  URL.revokeObjectURL(url)
                }}
                className="gsap-magnetic px-3.5 py-1.5 rounded-lg bg-[#141826] hover:bg-[#182033] border border-neutral-700 text-portal-orange font-bold flex items-center gap-1.5 shadow-sm"
              >
                <span>Download Spec</span>
              </button>
              <span className="px-3 py-1.5 rounded-lg bg-[#141826] border border-neutral-700">
                Spec Version: <span className="text-portal-orange font-bold">v2.4-EVM</span>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#141826] border border-neutral-700">
                Standard: <span className="text-portal-green font-bold">W3C DID/VC</span>
              </span>
            </div>
          </div>

          <p className="text-base text-neutral-300 max-w-3xl font-sans leading-relaxed">
            A comprehensive breakdown of Nexora’s three-layer architecture: the multi-agent interface layer, the on-chain cryptographic trust and verification infrastructure, and off-chain zero-trust private storage.
          </p>
        </div>

        {/* SECTION 1: FULL 3-TIER SYSTEM ARCHITECTURE DIAGRAM */}
        <section className="space-y-6 gsap-reveal">
          <div className="flex items-center justify-between border-b border-neutral-700 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-portal-orange" />
              <h2 className="font-display text-xl sm:text-2xl font-black text-white">
                1. Full System Architecture Topology
              </h2>
            </div>
            <span className="text-xs font-mono font-bold text-portal-green">Live Topological Render ✓</span>
          </div>

          {/* Rendered 3-tier Node Diagram */}
          <NodeDiagram mode="architecture" />
        </section>

        {/* SECTION 2: SIX PRIORITIZED BLOCKCHAIN & CRYPTOGRAPHIC CONCEPTS */}
        <section className="space-y-8">
          <div className="border-b border-neutral-700 pb-3 gsap-reveal">
            <span className="font-mono text-xs text-portal-orange font-bold uppercase tracking-wider">
              Cryptographic Trust Primitives
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-black text-white mt-1">
              2. The Six Pillars of On-Chain Verification
            </h2>
            <p className="text-xs font-sans text-neutral-300 mt-1">
              Deep dive into the cryptographic mechanisms providing sovereign privacy, unforgeable credentials, and mathematical trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gsap-stagger-group">
            {blockchainConcepts.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.id}
                  className="gsap-stagger-item gsap-card p-6 rounded-xl bg-[#141826] border border-neutral-700 border-l-4 border-l-portal-orange hover:border-neutral-600 transition-all flex flex-col justify-between space-y-4 shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-lg ${item.bg} ${item.color} border border-neutral-700 gsap-float`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-mono font-bold text-xs text-neutral-400">
                          PILLAR {item.num}
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded bg-[#101420] border border-neutral-700 text-[10px] font-mono text-portal-orange font-bold">
                        L1/L2 Primitive
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-white">
                      {item.title}
                    </h3>

                    <p className="text-xs font-sans text-neutral-300 leading-relaxed text-justify">
                      {item.technicalDesc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-700/60 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                    <span>Target Verification:</span>
                    <span className="text-portal-green font-bold">Zero Private Data Exposed ✓</span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* SECTION 3: FEDERATED LEARNING ARCHITECTURE */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-700 pb-3 gsap-reveal">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-portal-orange" />
              <h2 className="font-display text-xl sm:text-2xl font-black text-white">
                3. Federated Learning Architecture (Privacy-Preserving AI)
              </h2>
            </div>
            <span className="text-xs font-mono font-bold text-portal-green">Edge Compute Topology ✓</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 gsap-reveal">
              <NodeDiagram mode="federated-learning" />
            </div>

            <div className="gsap-card p-6 rounded-xl bg-[#141826] border border-neutral-700 border-l-4 border-l-portal-green space-y-4 flex flex-col justify-between shadow-lg gsap-reveal">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-portal-green/20 text-portal-green text-xs font-mono font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Gradient-Only Protocol</span>
                </div>
                <h3 className="font-display text-lg font-bold text-white">
                  How Federated Medical AI Works
                </h3>
                <p className="text-xs font-sans text-neutral-300 leading-relaxed">
                  Instead of aggregating patient scans into a centralized cloud database, diagnostic AI models are dispatched to participating hospitals. Local training runs inside each hospital's secure on-premise compute cluster.
                </p>
                <div className="space-y-2 text-xs font-mono text-neutral-300 pt-2">
                  <div className="p-3 rounded-lg bg-[#101420] border border-neutral-700">
                    <span className="text-portal-orange font-bold block">1. Model Broadcast:</span>
                    <span className="text-neutral-400 font-sans text-[11px]">Global weight tensor sent to Hospital nodes.</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#101420] border border-neutral-700">
                    <span className="text-portal-orange font-bold block">2. On-Premise Training:</span>
                    <span className="text-neutral-400 font-sans text-[11px]">Gradients calculated against encrypted local records.</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#101420] border border-neutral-700">
                    <span className="text-portal-green font-bold block">3. SMPC Aggregation:</span>
                    <span className="text-neutral-400 font-sans text-[11px]">Secure multi-party aggregation blends weights with zero PHI.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-700">
                <Link
                  href="/hospital-portal/ai-training"
                  className="gsap-magnetic w-full py-3 rounded-lg bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <span>Simulate Hospital Training Node →</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

