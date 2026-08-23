'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Bot, 
  Building2, 
  Landmark, 
  ShieldCheck, 
  Lock, 
  Database, 
  FileCheck, 
  Cpu, 
  KeyRound, 
  Scale, 
  FileText, 
  Sparkles,
  ArrowRight,
  ArrowDown,
  ArrowLeftRight,
  CheckCircle2,
  Zap
} from 'lucide-react'

interface NodeDiagramProps {
  mode?: 'hero' | 'architecture' | 'agent-routing' | 'federated-learning'
  activeNodes?: string[]
  className?: string
  interactive?: boolean
}

export function NodeDiagram({
  mode = 'hero',
  activeNodes = ['patient', 'patient_agent', 'hospital_agent', 'government_agent', 'blockchain'],
  className = '',
  interactive = true
}: NodeDiagramProps) {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  // -------------------------------------------------------------
  // MODE: AGENT-ROUTING (Used inside Chat & Live Assistant)
  // -------------------------------------------------------------
  if (mode === 'agent-routing') {
    const isNodeActive = (id: string) => activeNodes.includes(id)

    const nodes = [
      { id: 'patient', label: 'Patient Request', sub: 'Encrypted DID', icon: User, color: 'border-l-portal-orange text-neutral-200' },
      { id: 'patient_agent', label: 'Patient Agent', sub: 'Autonomous Orchestrator', icon: Bot, color: 'border-l-portal-orange text-portal-orange' },
      { id: 'hospital_agent', label: 'Hospital Agent', sub: 'Apex & City Care', icon: Building2, color: 'border-l-portal-blue text-blue-300' },
      { id: 'government_agent', label: 'Gov Scheme Agent', sub: 'ZK Verification', icon: Landmark, color: 'border-l-portal-green text-green-300' },
      { id: 'blockchain', label: 'Trust Ledger', sub: 'Smart Consent Recorded', icon: ShieldCheck, color: 'border-l-portal-orange text-portal-orange' }
    ]

    return (
      <div className={`p-4 rounded-xl bg-[#141826] border border-neutral-700 shadow-md ${className}`}>
        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-portal-green"></span>
            <span className="font-mono text-portal-orange font-bold uppercase tracking-wider text-[11px]">
              Live Multi-Agent Routing Graph
            </span>
          </div>
          <span className="text-[10px] font-mono text-neutral-400">
            Consensus: <span className="text-portal-green font-semibold">L1 ZK-Verified</span>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 relative">
          {nodes.map((node) => {
            const active = isNodeActive(node.id)
            const Icon = node.icon

            return (
              <div
                key={node.id}
                className={`p-2.5 rounded-md border border-neutral-700 border-l-4 transition-all duration-200 flex flex-col items-center text-center relative ${
                  active
                    ? `bg-[#1a2133] ${node.color} shadow-sm border-opacity-100`
                    : 'bg-background/40 border-neutral-800 text-neutral-500 opacity-50'
                }`}
              >
                <div className={`p-1.5 rounded-md mb-1.5 ${active ? 'bg-[#141826]' : 'bg-surface/30'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold leading-tight">{node.label}</span>
                <span className="text-[9px] font-mono opacity-80 mt-0.5">{node.sub}</span>

                {active && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-portal-green"></span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // -------------------------------------------------------------
  // MODE: FEDERATED LEARNING
  // -------------------------------------------------------------
  if (mode === 'federated-learning') {
    return (
      <div className={`relative p-6 rounded-xl bg-[#141826] border border-neutral-700 shadow-md overflow-hidden ${className}`}>
        <div className="relative z-10 space-y-6">
          {/* Top: Global Model */}
          <div className="flex flex-col items-center">
            <div className="px-5 py-3.5 rounded-lg bg-[#101420] border-l-4 border-l-portal-orange border border-neutral-700 text-center shadow-md max-w-sm">
              <div className="flex items-center justify-center gap-2 text-portal-orange font-mono font-bold text-sm">
                <Cpu className="w-4 h-4" />
                <span>Global Aggregate Healthcare Model v3.2</span>
              </div>
              <p className="text-[11px] text-neutral-300 mt-1 font-sans">
                Shared weights aggregated via Secure Multi-Party Computation (SMPC)
              </p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-portal-green/15 text-[10px] font-mono text-portal-green border border-portal-green/30">
                <ShieldCheck className="w-3 h-3" />
                <span>Zero Patient Data Transmitted</span>
              </div>
            </div>
          </div>

          {/* Bi-directional Flow Indicators */}
          <div className="flex justify-center items-center gap-8 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-1 text-portal-orange">
              <span>↓ Global Weights</span>
            </div>
            <div className="flex items-center gap-1 text-portal-green">
              <span>↑ Model Gradients Only</span>
            </div>
          </div>

          {/* Bottom Hospital Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Apex Heart & Vascular', patients: '14,200 On-Prem Records', round: 'Round #142 Sync', active: true },
              { name: 'City Care Academic Health', patients: '28,900 On-Prem Records', round: 'Round #142 Sync', active: true },
              { name: 'Metropolitan General', patients: '19,500 On-Prem Records', round: 'Round #142 Sync', active: true },
            ].map((hosp, i) => (
              <div key={i} className="p-4 rounded-lg bg-[#101420] border-l-4 border-l-portal-blue border border-neutral-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-neutral-200 text-xs font-bold">
                    <Building2 className="w-4 h-4 text-portal-blue" />
                    <span>{hosp.name}</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-portal-green"></span>
                </div>
                <span className="text-[11px] font-mono text-neutral-400 block">{hosp.patients}</span>
                <span className="text-[10px] font-mono text-portal-green block mt-1">{hosp.round}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // -------------------------------------------------------------
  // MODE: ARCHITECTURE (3-Tier Deep Diagram)
  // -------------------------------------------------------------
  if (mode === 'architecture') {
    return (
      <div className={`p-6 rounded-xl bg-[#141826] border-2 border-[#1E3A8A] shadow-xl space-y-6 ${className}`}>
        {/* Tier 1: User & Multi-Agent Interface Layer */}
        <div className="p-4 rounded-lg bg-[#101420] border border-neutral-700">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs text-portal-orange font-bold uppercase tracking-wider">
              Layer 1: Sovereign Multi-Agent User Interface
            </span>
            <span className="text-[10px] font-mono text-neutral-400">Ed25519 Signed</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-md bg-[#141826] border border-neutral-700 flex items-center gap-3">
              <User className="w-4 h-4 text-portal-orange shrink-0" />
              <div>
                <span className="font-bold text-white block">Patient Mobile & Web DApp</span>
                <span className="text-[11px] text-neutral-400 block">Sovereign private key custody</span>
              </div>
            </div>
            <div className="p-3 rounded-md bg-[#141826] border border-neutral-700 flex items-center gap-3">
              <Bot className="w-4 h-4 text-portal-orange shrink-0" />
              <div>
                <span className="font-bold text-white block">Local Patient AI Agent</span>
                <span className="text-[11px] text-neutral-400 block">Encrypted intent decomposition</span>
              </div>
            </div>
            <div className="p-3 rounded-md bg-[#141826] border border-neutral-700 flex items-center gap-3">
              <Building2 className="w-4 h-4 text-portal-blue shrink-0" />
              <div>
                <span className="font-bold text-white block">Institutional Portal Nodes</span>
                <span className="text-[11px] text-neutral-400 block">Hospital & government gateways</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tier 2: On-Chain Trust & Settlement */}
        <div className="p-4 rounded-lg bg-[#101420] border border-neutral-700">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs text-portal-green font-bold uppercase tracking-wider">
              Layer 2: Blockchain Consensus & Smart Consent Layer
            </span>
            <span className="text-[10px] font-mono text-portal-green font-semibold">Sub-Second Finality</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-md bg-[#141826] border border-neutral-700">
              <KeyRound className="w-4 h-4 text-portal-orange mb-1" />
              <span className="font-bold text-white block text-[11px]">W3C DIDs</span>
              <span className="text-[10px] text-neutral-400 block">On-chain identity registry</span>
            </div>
            <div className="p-3 rounded-md bg-[#141826] border border-neutral-700">
              <FileCheck className="w-4 h-4 text-blue-300 mb-1" />
              <span className="font-bold text-white block text-[11px]">Verifiable VCs</span>
              <span className="text-[10px] text-neutral-400 block">Cryptographic licensing</span>
            </div>
            <div className="p-3 rounded-md bg-[#141826] border border-neutral-700">
              <Lock className="w-4 h-4 text-portal-green mb-1" />
              <span className="font-bold text-white block text-[11px]">zk-SNARK Circuits</span>
              <span className="text-[10px] text-neutral-400 block">Zero-knowledge proofs</span>
            </div>
            <div className="p-3 rounded-md bg-[#141826] border border-neutral-700">
              <Scale className="w-4 h-4 text-purple-400 mb-1" />
              <span className="font-bold text-white block text-[11px]">Smart Consent</span>
              <span className="text-[10px] text-neutral-400 block">Automated time-bound rules</span>
            </div>
          </div>
        </div>

        {/* Tier 3: Off-Chain Private Storage */}
        <div className="p-4 rounded-lg bg-[#101420] border border-neutral-700">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs text-neutral-300 font-bold uppercase tracking-wider">
              Layer 3: Off-Chain Private Storage (Zero Medical Data on Blockchain)
            </span>
            <span className="text-[10px] font-mono text-portal-green font-semibold">Encrypted at Rest & in Transit</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-md bg-[#141826] border border-neutral-700 flex items-center gap-3">
              <Database className="w-4 h-4 text-portal-blue shrink-0" />
              <div>
                <span className="font-bold text-neutral-100 block">Hospital EHR & PACS Scans</span>
                <span className="text-[11px] text-neutral-400 block">Stored inside hospital private firewalls</span>
              </div>
            </div>
            <div className="p-3 rounded-md bg-[#141826] border border-neutral-700 flex items-center gap-3">
              <Database className="w-4 h-4 text-portal-orange shrink-0" />
              <div>
                <span className="font-bold text-neutral-100 block">Decentralized Encrypted IPFS</span>
                <span className="text-[11px] text-neutral-400 block">Patient-owned encrypted health records</span>
              </div>
            </div>
            <div className="p-3 rounded-md bg-[#141826] border border-neutral-700 flex items-center gap-3">
              <Cpu className="w-4 h-4 text-portal-green shrink-0" />
              <div>
                <span className="font-bold text-neutral-100 block">Local AI Training Engine</span>
                <span className="text-[11px] text-neutral-400 block">Federated on-premise compute nodes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // -------------------------------------------------------------
  // MODE: HERO (Structured, Aligned, High-Precision Orchestration Visualizer)
  // -------------------------------------------------------------
  return (
    <div className={`relative w-full p-5 sm:p-7 rounded-xl bg-[#141826] border-2 border-[#1E3A8A] shadow-2xl overflow-hidden ${className}`}>
      {/* Visualizer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-neutral-700/80 gap-2 mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-portal-orange" />
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
            Live Network Orchestration Visualizer
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-mono">
          <span className="text-portal-orange font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-portal-orange animate-pulse"></span>
            Decentralized
          </span>
          <span className="text-neutral-400">•</span>
          <span className="text-blue-300 font-semibold">Zero-Knowledge</span>
          <span className="text-neutral-400">•</span>
          <span className="text-portal-green font-semibold">Off-Chain Storage</span>
        </div>
      </div>

      <div className="space-y-6 relative">
        {/* ROW 1: Patient (You) <---> Patient Agent */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
          {/* Patient Card */}
          <div 
            onMouseEnter={() => setHoveredNode('patient')}
            onMouseLeave={() => setHoveredNode(null)}
            className="p-4 rounded-xl bg-[#101420] border border-neutral-700 border-l-4 border-l-portal-orange shadow-md relative transition-all duration-200 hover:border-portal-orange"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-portal-orange/15 border border-portal-orange/30 flex items-center justify-center text-portal-orange shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white font-sans">Patient (You)</span>
                    <span className="w-2 h-2 rounded-full bg-portal-green"></span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400 block">did:nexora:pat:8f9a...31da</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-portal-orange font-bold px-2 py-0.5 rounded bg-[#141826] border border-neutral-700">
                Sovereign Keyholder
              </span>
            </div>
          </div>

          {/* Patient Agent Orchestrator */}
          <div 
            onMouseEnter={() => setHoveredNode('agent')}
            onMouseLeave={() => setHoveredNode(null)}
            className="p-4 rounded-xl bg-[#101420] border border-neutral-700 border-l-4 border-l-portal-orange shadow-md relative transition-all duration-200 hover:border-portal-orange"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-portal-orange/20 border border-portal-orange/40 flex items-center justify-center text-portal-orange shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-portal-orange font-sans">Patient Agent</span>
                    <span className="px-2 py-0.5 rounded bg-portal-orange/20 text-[9px] font-mono font-bold text-portal-orange uppercase">
                      Orchestrator
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-300 font-sans block">Encrypted local intent router</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-portal-green font-bold px-2 py-0.5 rounded bg-[#141826] border border-neutral-700">
                Active Router ✓
              </span>
            </div>
          </div>
        </div>

        {/* FLOW CONNECTOR 1: Horizontal & Downward Dispatch Bridge */}
        <div className="flex items-center justify-center gap-3 py-1">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-portal-orange/50 to-transparent"></div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#101420] border border-portal-orange/50 text-[10px] font-mono font-bold text-portal-orange shadow-sm">
            <Zap className="w-3 h-3 text-portal-orange animate-pulse" />
            <span>Encrypted Intent & Multi-Agent Dispatch Stream</span>
            <ArrowDown className="w-3 h-3 text-portal-orange" />
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-portal-orange/50 to-transparent"></div>
        </div>

        {/* ROW 2: External Agent Nodes (Hospital & Government) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Hospital Agent */}
          <div 
            onMouseEnter={() => setHoveredNode('hospital')}
            onMouseLeave={() => setHoveredNode(null)}
            className="p-4 rounded-xl bg-[#101420] border border-neutral-700 border-l-4 border-l-portal-blue shadow-md transition-all duration-200 hover:border-blue-400"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-300 shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white font-sans">Hospital Agent</span>
                    <span className="text-[10px] font-mono text-portal-green font-bold">DID Verified ✓</span>
                  </div>
                  <span className="text-[11px] text-neutral-300 block">Apex & City Care Provider Nodes</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-blue-300 font-bold px-2 py-0.5 rounded bg-[#141826] border border-neutral-700">
                W3C VC Verified
              </span>
            </div>
          </div>

          {/* Government Agent */}
          <div 
            onMouseEnter={() => setHoveredNode('gov')}
            onMouseLeave={() => setHoveredNode(null)}
            className="p-4 rounded-xl bg-[#101420] border border-neutral-700 border-l-4 border-l-portal-green shadow-md transition-all duration-200 hover:border-portal-green"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-portal-green/15 border border-portal-green/30 flex items-center justify-center text-portal-green shrink-0">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white font-sans">Government Agent</span>
                    <span className="text-[10px] font-mono text-portal-green font-bold">ZK Gateway ✓</span>
                  </div>
                  <span className="text-[11px] text-neutral-300 block">Instant subsidy & eligibility check</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-portal-green font-bold px-2 py-0.5 rounded bg-[#141826] border border-neutral-700">
                Zero Data Exposed
              </span>
            </div>
          </div>
        </div>

        {/* FLOW CONNECTOR 2: Downward Consensus & Ledger Bridge */}
        <div className="flex items-center justify-center gap-3 py-1">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-portal-green/50 to-transparent"></div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#101420] border border-portal-green/50 text-[10px] font-mono font-bold text-portal-green shadow-sm">
            <Lock className="w-3 h-3 text-portal-green" />
            <span>Cryptographic Consent Verification & Audit Log Commit</span>
            <ArrowDown className="w-3 h-3 text-portal-green" />
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-portal-green/50 to-transparent"></div>
        </div>

        {/* ROW 3: Blockchain Trust & Audit Layer */}
        <div 
          onMouseEnter={() => setHoveredNode('blockchain')}
          onMouseLeave={() => setHoveredNode(null)}
          className="p-5 rounded-xl bg-[#101420] border border-neutral-700 border-l-4 border-l-portal-orange shadow-lg transition-all duration-200 hover:border-portal-orange"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-portal-orange/15 border border-portal-orange/30 flex items-center justify-center text-portal-orange shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono font-bold text-portal-orange uppercase tracking-wider">
                    Blockchain Trust & Audit Layer
                  </span>
                  <span className="w-2 h-2 rounded-full bg-portal-green"></span>
                  <span className="text-[10px] font-mono text-portal-green font-bold">Consensus Live ✓</span>
                </div>
                <p className="text-xs text-neutral-300 font-sans mt-0.5">
                  Smart Contracts • Zero-Knowledge Proofs • Immutable Audit Trail • W3C DIDs
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="px-3 py-1.5 rounded-lg bg-[#141826] text-xs font-mono text-neutral-300 border border-neutral-700 shadow-sm">
                Off-Chain Medical Data: <strong className="text-portal-green">100% Private</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
