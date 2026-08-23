'use client'

import React from 'react'
import Link from 'next/link'
import { 
  KeyRound, 
  FileCheck, 
  Cpu, 
  Scale, 
  Lock, 
  FileText, 
  ShieldCheck, 
  ArrowLeft, 
  Layers 
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { NodeDiagram } from '@/components/diagrams/NodeDiagram'
import { SimulatedBadge } from '@/components/ui/SimulatedBadge'

export default function ArchitecturePage() {
  const blockchainConcepts = [
    {
      num: '01',
      id: 'did',
      title: 'Decentralized Identity (W3C DID)',
      icon: KeyRound,
      color: 'border-[#F5821F] text-[#D66D10]',
      bg: 'bg-amber-50',
      technicalDesc: 'All network participants (citizens, physicians, hospital legal entities, government agencies) hold W3C-compliant Decentralized Identifiers (DIDs) resolved on-chain. Key pairs are generated client-side using Edwards-curve Digital Signature Algorithm (Ed25519) or secp256k1. Private keys never leave the participant\'s local hardware enclave or secure enclave proxy. DIDs eliminate centralized identity provider honeypots and empower sovereign cryptographic authentication across multi-agent workflows.'
    },
    {
      num: '02',
      id: 'credentials',
      title: 'Verifiable Credentials (VCs)',
      icon: FileCheck,
      color: 'border-[#0B3D91] text-[#0B3D91]',
      bg: 'bg-blue-50',
      technicalDesc: 'Licensing authorities (e.g. National Medical Commission, State Medical Councils) issue cryptographically signed Verifiable Credentials directly to doctor and hospital DIDs. When a citizen queries a provider, the provider\'s agent presents a zero-knowledge verifiable presentation demonstrating active board certification, surgical privileges, and malpractice standing without exposing administrative backend credentials or personal registry records.'
    },
    {
      num: '03',
      id: 'contracts',
      title: 'Smart Contracts (EVM / WASM Execution)',
      icon: Cpu,
      color: 'border-[#F5821F] text-[#D66D10]',
      bg: 'bg-amber-50',
      technicalDesc: 'Deterministic, self-executing smart contracts govern access control policies, scheme allocations, and settlement logic without human intermediaries. Contracts enforce multi-signature authorization policies where data decryption keys are only derived when conditions (active appointment window, valid insurance voucher, patient signature) are verified on-chain. State transitions are verified by consensus nodes with sub-second finality.'
    },
    {
      num: '04',
      id: 'consent',
      title: 'Granular Smart Consent Manager',
      icon: Scale,
      color: 'border-[#1E7A34] text-[#1E7A34]',
      bg: 'bg-green-50',
      technicalDesc: 'Consent is treated as a first-class cryptographic primitive. Citizens issue cryptographically signed, time-bounded, purpose-scoped capability grants. A consent contract specifies exact data selectors (e.g., cardiovascular telemetry only, excluding mental health or genomic records) and hard expiry timestamps (e.g., 72 hours). Revocation is instant and broadcast across the ledger, immediately invalidating access keys across all participating agent nodes.'
    },
    {
      num: '05',
      id: 'zkp',
      title: 'Zero-Knowledge Proofs (zk-SNARKs)',
      icon: Lock,
      color: 'border-[#F5821F] text-[#D66D10]',
      bg: 'bg-amber-50',
      technicalDesc: 'Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge (zk-SNARKs) allow citizens and agents to prove mathematical statements about private data without revealing the underlying data. For instance, a citizen proves to the Government Scheme Agent: "Income is strictly less than ₹5,00,000 and residency code is within Nagpur/Umred Zone" using cryptographic arithmetic circuits. The verifier receives binary confirmation (Valid/Invalid) while zero tax documents or financial details are disclosed.'
    },
    {
      num: '06',
      id: 'audit',
      title: 'Immutable Cryptographic Audit Trail',
      icon: FileText,
      color: 'border-[#1E7A34] text-[#1E7A34]',
      bg: 'bg-green-50',
      technicalDesc: 'Every interaction — from medical record access to eligibility verification and federated model gradient contribution — generates an append-only, tamper-evident cryptographic log entry stored on a distributed ledger. Each entry contains the accessor\'s DID, the exact timestamp, the purpose token, and the cryptographic content identifier (CID). Citizens possess an unalterable forensic record of precisely who touched their health profile, when, and under which legal basis.'
    }
  ]

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-[#1A1A1A] flex flex-col">
      <Navbar />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Breadcrumb */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0B3D91] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portal Overview (मुख्यपृष्ठावर जा)</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-lg bg-white border border-[#E0E0E0] border-l-4 border-l-[#0B3D91] shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#D66D10] font-bold uppercase tracking-wider">
                  Technical Architecture & Security Whitepaper
                </span>
                <SimulatedBadge variant="inline" label="Official Specification" />
              </div>
              <h1 className="font-extrabold text-3xl sm:text-4xl text-[#0B3D91] mt-1">
                Nexora System Architecture (तांत्रिक संरचना)
              </h1>
            </div>

            <div className="flex items-center gap-2 text-xs text-neutral-600 flex-wrap">
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
                className="px-3.5 py-1.5 rounded bg-white hover:bg-neutral-50 border border-[#0B3D91] text-[#0B3D91] font-bold flex items-center gap-1.5 shadow-sm"
              >
                <span>Download Technical Spec</span>
              </button>
              <span className="px-3 py-1.5 rounded bg-neutral-100 border border-neutral-300 font-mono text-[11px]">
                Version: <strong className="text-[#0B3D91]">v2.4-EVM</strong>
              </span>
              <span className="px-3 py-1.5 rounded bg-green-100 border border-green-300 text-[#1E7A34] font-bold text-[11px]">
                Standard: W3C DID/VC
              </span>
            </div>
          </div>

          <p className="text-sm text-[#4B5563] max-w-3xl leading-relaxed">
            A comprehensive breakdown of Nexora’s three-layer architecture: the multi-agent interface layer, the on-chain cryptographic trust and verification infrastructure, and off-chain zero-trust private storage.
          </p>
        </div>

        {/* SECTION 1: FULL 3-TIER SYSTEM ARCHITECTURE DIAGRAM */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#0B3D91]" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B3D91]">
                1. Full System Architecture Topology
              </h2>
            </div>
            <span className="text-xs font-bold text-[#1E7A34]">Live Topological Render ✓</span>
          </div>

          {/* Rendered 3-tier Node Diagram */}
          <div className="p-4 rounded-lg bg-white border border-[#E0E0E0] shadow-sm">
            <NodeDiagram mode="architecture" />
          </div>
        </section>

        {/* SECTION 2: SIX PRIORITIZED BLOCKCHAIN & CRYPTOGRAPHIC CONCEPTS */}
        <section className="space-y-8">
          <div className="border-b border-neutral-200 pb-3">
            <span className="text-xs text-[#D66D10] font-bold uppercase tracking-wider">
              Cryptographic Trust Primitives
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B3D91] mt-1">
              2. The Six Pillars of On-Chain Verification
            </h2>
            <p className="text-xs text-[#4B5563] mt-1">
              Deep dive into the cryptographic mechanisms providing sovereign privacy, unforgeable credentials, and mathematical trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blockchainConcepts.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.id}
                  className="p-6 rounded-lg bg-white border border-[#E0E0E0] border-t-4 border-t-[#0B3D91] hover:shadow-md transition-all flex flex-col justify-between space-y-4 shadow-sm"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded ${item.bg} ${item.color} border border-[#CBD5E1]`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-xs text-neutral-500">
                          PILLAR {item.num}
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded bg-neutral-100 border border-neutral-300 text-[10px] text-[#0B3D91] font-bold">
                        L1/L2 Primitive
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-[#0B3D91]">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#4B5563] leading-relaxed text-justify">
                      {item.technicalDesc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
                    <span>Target Verification:</span>
                    <span className="text-[#1E7A34] font-bold">Zero Private Data Exposed ✓</span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* SECTION 3: FEDERATED LEARNING ARCHITECTURE */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#0B3D91]" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B3D91]">
                3. Federated Learning Architecture (Privacy-Preserving AI)
              </h2>
            </div>
            <span className="text-xs font-bold text-[#1E7A34]">Edge Compute Topology ✓</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-4 rounded-lg bg-white border border-[#E0E0E0] shadow-sm">
              <NodeDiagram mode="federated-learning" />
            </div>

            <div className="p-6 rounded-lg bg-white border border-[#E0E0E0] border-l-4 border-l-[#1E7A34] space-y-4 flex flex-col justify-between shadow-sm">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-green-100 text-[#1E7A34] text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Gradient-Only Protocol</span>
                </div>
                <h3 className="text-lg font-bold text-[#0B3D91]">
                  How Federated Medical AI Works
                </h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  Instead of aggregating patient scans into a centralized cloud database, diagnostic AI models are dispatched to participating hospitals. Local training runs inside each hospital's secure on-premise compute cluster.
                </p>
                <div className="space-y-2 text-xs text-neutral-700 pt-2">
                  <div className="p-3 rounded bg-[#F8FAFC] border border-[#CBD5E1]">
                    <span className="text-[#0B3D91] font-bold block">1. Model Broadcast:</span>
                    <span className="text-neutral-600 text-[11px]">Global weight tensor sent to Hospital nodes.</span>
                  </div>
                  <div className="p-3 rounded bg-[#F8FAFC] border border-[#CBD5E1]">
                    <span className="text-[#0B3D91] font-bold block">2. On-Premise Training:</span>
                    <span className="text-neutral-600 text-[11px]">Gradients calculated against encrypted local records.</span>
                  </div>
                  <div className="p-3 rounded bg-[#F8FAFC] border border-[#CBD5E1]">
                    <span className="text-[#1E7A34] font-bold block">3. SMPC Aggregation:</span>
                    <span className="text-neutral-600 text-[11px]">Secure multi-party aggregation blends weights with zero PHI.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100">
                <Link
                  href="/hospital-portal/ai-training"
                  className="w-full py-3 rounded bg-[#1E7A34] hover:bg-[#145524] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
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
