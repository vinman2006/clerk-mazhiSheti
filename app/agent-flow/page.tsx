'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Building2,
  Landmark,
  ShieldCheck,
  Cpu,
  Lock,
  KeyRound,
  CheckCircle2,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Terminal,
  Activity,
  ArrowRight,
  Database,
  Radio,
  FileCheck,
  ChevronRight
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

// Log entry structure
interface LogEntry {
  id: string
  timestamp: string
  agent: string
  action: string
  status: 'info' | 'success' | 'warning' | 'encrypted'
  payload?: string
}

// Scramble text effect generator
function useScrambledHash(targetText: string, active: boolean) {
  const [display, setDisplay] = useState(targetText)
  const chars = '0123456789abcdef'

  useEffect(() => {
    if (!active) {
      setDisplay(targetText)
      return
    }

    let iterations = 0
    const interval = setInterval(() => {
      setDisplay(
        targetText
          .split('')
          .map((char, index) => {
            if (index < iterations) return targetText[index]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )

      if (iterations >= targetText.length) {
        clearInterval(interval)
      }
      iterations += 1 / 2
    }, 30)

    return () => clearInterval(interval)
  }, [active, targetText])

  return display
}

export default function AgentFlowPage() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [speed, setSpeed] = useState<number>(1)
  const [cycleTime, setCycleTime] = useState<number>(0) // 0 to 14 seconds
  const [selectedNode, setSelectedNode] = useState<string>('patient')
  const [logs, setLogs] = useState<LogEntry[]>([])
  const logContainerRef = useRef<HTMLDivElement>(null)

  const TOTAL_CYCLE = 14 // 14 seconds per full loop

  // Animation cycle clock
  useEffect(() => {
    if (!isPlaying) return

    const intervalMs = 50
    const timer = setInterval(() => {
      setCycleTime((prev) => {
        const next = prev + (intervalMs / 1000) * speed
        if (next >= TOTAL_CYCLE) {
          return 0
        }
        return next
      })
    }, intervalMs)

    return () => clearInterval(timer)
  }, [isPlaying, speed])

  // Map cycleTime to 5 explicit steps
  // Step 0: 0s - 3.2s -> Patient sends to Hospital
  // Step 1: 3.0s - 6.5s -> Patient sends to Government (staggered)
  // Step 2: 6.5s - 10.2s -> Hospital & Gov converge on Blockchain Trust Layer (Mint & consensus)
  // Step 3: 10.2s - 13.0s -> Blockchain Trust Layer delivers receipt to Patient
  // Step 4: 13.0s - 14.0s -> Complete & cycle reset
  const step = cycleTime < 3.2 ? 0 : cycleTime < 6.5 ? 1 : cycleTime < 10.2 ? 2 : cycleTime < 13.0 ? 3 : 4

  // Manage synchronized log streaming based on cycle time
  useEffect(() => {
    const formatTime = (offsetSec: number) => {
      const now = new Date()
      now.setSeconds(now.getSeconds() + Math.floor(offsetSec))
      return now.toTimeString().split(' ')[0]
    }

    const currentLogs: LogEntry[] = []

    if (cycleTime >= 0.2) {
      currentLogs.push({
        id: '1',
        timestamp: formatTime(0),
        agent: 'patient-agent',
        action: 'intent.dispatch({ appointment: "Cardiology", window: "48h" })',
        status: 'encrypted',
        payload: 'Payload: DID did:nexora:pat:8f9a2b signed with ed25519',
      })
    }
    if (cycleTime >= 1.5) {
      currentLogs.push({
        id: '2',
        timestamp: formatTime(1.5),
        agent: 'hospital-agent',
        action: 'vc.verify(patientDID) → active credentials valid',
        status: 'info',
        payload: 'Querying internal slot availability (Zero PHI disclosed)',
      })
    }
    if (cycleTime >= 2.8) {
      currentLogs.push({
        id: '3',
        timestamp: formatTime(2.8),
        agent: 'hospital-agent',
        action: 'slot.reserve("Apex Heart #01", timestamp: 1787539200)',
        status: 'success',
        payload: 'Slot reserved. Emitting cryptographic capability request.',
      })
    }
    if (cycleTime >= 3.8) {
      currentLogs.push({
        id: '4',
        timestamp: formatTime(3.8),
        agent: 'patient-agent',
        action: 'zk.evalProof("Income < $65k", "District 4 Resident")',
        status: 'encrypted',
        payload: 'Groth16 zk-SNARK generated in local browser sandbox (142ms)',
      })
    }
    if (cycleTime >= 5.0) {
      currentLogs.push({
        id: '5',
        timestamp: formatTime(5.0),
        agent: 'gov-agent',
        action: 'zk.verifyProof(proof, publicSignals) → VALID ✓',
        status: 'success',
        payload: 'Scheme subsidy voucher approved without storing tax records',
      })
    }
    if (cycleTime >= 7.2) {
      currentLogs.push({
        id: '6',
        timestamp: formatTime(7.2),
        agent: 'trust-layer',
        action: 'mempool.ingest({ slotGrant, subsidyGrant })',
        status: 'info',
        payload: 'Assembling atomic multi-party state commit block #481920',
      })
    }
    if (cycleTime >= 8.8) {
      currentLogs.push({
        id: '7',
        timestamp: formatTime(8.8),
        agent: 'trust-layer',
        action: 'consensus.finalize(blockHash: 0x8f2a4e91b7c3d20f)',
        status: 'success',
        payload: '21/21 partner chain validators signed state transition',
      })
    }
    if (cycleTime >= 10.8) {
      currentLogs.push({
        id: '8',
        timestamp: formatTime(10.8),
        agent: 'trust-layer',
        action: 'receipt.dispatch(did:nexora:pat:8f9a2b)',
        status: 'encrypted',
        payload: 'Encrypted consent token with automated 72h auto-expiry revocation',
      })
    }
    if (cycleTime >= 12.0) {
      currentLogs.push({
        id: '9',
        timestamp: formatTime(12.0),
        agent: 'patient-agent',
        action: 'consent.sealed() — Zero PHI leaked across entire multi-agent cycle ✓',
        status: 'success',
        payload: 'Appointment locked, subsidy applied, sovereign key verified.',
      })
    }

    setLogs(currentLogs)
  }, [cycleTime])

  // Auto-scroll terminal log
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
    }
  }, [logs])

  // Compute live sub-progress for bezier packets
  const packet1Prog = Math.max(0, Math.min(1, (cycleTime - 0.2) / 2.6))
  const packet2Prog = Math.max(0, Math.min(1, (cycleTime - 3.2) / 2.6))
  const packet3Prog = Math.max(0, Math.min(1, (cycleTime - 6.5) / 2.2))
  const packet4Prog = Math.max(0, Math.min(1, (cycleTime - 7.0) / 2.2))
  const packet5Prog = Math.max(0, Math.min(1, (cycleTime - 10.2) / 2.3))

  const isHashScrambling = cycleTime >= 6.5 && cycleTime <= 9.8
  const blockHash = useScrambledHash('0x8f2a4e91b7c3d20f', isHashScrambling)

  // Status badges per node based on cycle progression
  const getPatientStatus = () => {
    if (cycleTime >= 12.0) return { label: 'Consent Sealed ✓', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10' }
    if (cycleTime >= 10.2) return { label: 'Receiving Receipt...', color: 'text-teal-400 border-teal-500/40 bg-teal-500/10' }
    if (cycleTime >= 3.2) return { label: 'Dispatching zk-Proof', color: 'text-amber-400 border-amber-500/40 bg-amber-500/10' }
    if (cycleTime >= 0.2) return { label: 'Transmitting Intent', color: 'text-blue-400 border-blue-500/40 bg-blue-500/10' }
    return { label: 'Ready', color: 'text-neutral-400 border-neutral-700 bg-neutral-800/40' }
  }

  const getHospitalStatus = () => {
    if (cycleTime >= 6.5) return { label: 'Slot Committed ✓', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10' }
    if (cycleTime >= 2.5) return { label: 'Slot Found ✓', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10' }
    if (cycleTime >= 1.0) return { label: 'Verifying DID & VCs...', color: 'text-amber-400 border-amber-500/40 bg-amber-500/10' }
    return { label: 'Idle / Listening', color: 'text-neutral-400 border-neutral-700 bg-neutral-800/40' }
  }

  const getGovStatus = () => {
    if (cycleTime >= 7.0) return { label: 'Voucher Committed ✓', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10' }
    if (cycleTime >= 5.0) return { label: 'Subsidy Approved ✓', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10' }
    if (cycleTime >= 3.5) return { label: 'Checking zk-Eligibility...', color: 'text-amber-400 border-amber-500/40 bg-amber-500/10' }
    return { label: 'Idle / Listening', color: 'text-neutral-400 border-neutral-700 bg-neutral-800/40' }
  }

  const getTrustLayerStatus = () => {
    if (cycleTime >= 10.2) return { label: 'State Finalized ✓', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10' }
    if (cycleTime >= 8.5) return { label: 'Consensus 21/21 ✓', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10' }
    if (cycleTime >= 6.5) return { label: 'Minting Block #481920...', color: 'text-purple-400 border-purple-500/40 bg-purple-500/10' }
    return { label: 'Standby / Validating', color: 'text-neutral-400 border-neutral-700 bg-neutral-800/40' }
  }

  // Node details panel content
  const nodeDetails: Record<string, { title: string; type: string; did: string; role: string; privacy: string }> = {
    patient: {
      title: 'Patient Autonomous Agent',
      type: 'Local Enclave / Edge Agent',
      did: 'did:nexora:pat:8f9a2b37c1d4',
      role: 'Holds master ed25519 signing keys, generates client-side zero-knowledge proofs, and releases capability grants without disclosing underlying records.',
      privacy: '100% Client-Side. No raw medical or financial records ever leave local secure proxy.',
    },
    hospital: {
      title: 'Hospital Clinical Scheduling Agent',
      type: 'On-Premises Hospital Node',
      did: 'did:nexora:hosp:apex-heart-01',
      role: 'Resolves slot availability behind hospital firewall, signs appointment reservations with Verifiable Credentials, and checks patient DID authenticity.',
      privacy: 'PHI Isolation. Only sees cryptographic query selectors and returns time-stamped booking vouchers.',
    },
    government: {
      title: 'Government Scheme Administration Agent',
      type: 'Public Policy Verification Agent',
      did: 'did:nexora:gov:health-subsidy-dept',
      role: 'Verifies zk-SNARK mathematical proofs for subsidy and reimbursement eligibility without requesting or inspecting raw tax returns or salary slips.',
      privacy: 'Zero-Knowledge Verification. Accepts Groth16 binary proofs (Valid / Invalid). No records stored.',
    },
    trust: {
      title: 'Blockchain Trust Layer & Consensus',
      type: 'Cardano Partner Chain Consensus',
      did: 'chain:nexora:l2:mainnet-state',
      role: 'Coordinates atomic multi-signature execution, mints immutable consent tokens, timestamps audit logs, and enforces cryptographic automatic expiration.',
      privacy: 'Public Auditability. Ledger records cryptographic hashes (CIDs), DIDs, and state proofs with zero PHI.',
    },
  }

  return (
    <div className="min-h-screen bg-[#070D1E] text-white flex flex-col selection:bg-nexora-orange-500/20 selection:text-nexora-orange-400 font-sans antialiased overflow-x-hidden">
      <Navbar />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 w-full">
        {/* Breadcrumb & Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-xs font-mono font-bold text-nexora-orange-400 hover:text-white transition-colors"
            >
              Nexora
            </Link>
            <span className="text-neutral-500">/</span>
            <span className="text-xs font-mono text-neutral-300 font-medium">Mission Control</span>
            <span className="px-2 py-0.5 rounded-full bg-nexora-orange-500/15 border border-nexora-orange-500/30 text-[10px] font-mono text-nexora-orange-400 font-bold uppercase tracking-wider ml-2">
              Live Topology Simulation
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight text-white">
                Agent Mission Control
              </h1>
              <p className="text-sm sm:text-base text-blue-100/80 max-w-2xl mt-2 font-normal leading-relaxed">
                Watch a real multi-agent healthcare request move through the Nexora network in real time — decentralized identity, zero-knowledge verification, and cryptographic consent.
              </p>
            </div>

            {/* Playback Controls Strip */}
            <div className="flex items-center gap-2 bg-[#0C1938] border border-white/10 p-1.5 rounded-xl shadow-lg shrink-0">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`p-2 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                  isPlaying
                    ? 'bg-nexora-orange-500 text-white shadow-md shadow-orange-950/40'
                    : 'bg-white/10 text-neutral-200 hover:bg-white/20'
                }`}
                title={isPlaying ? 'Pause Animation' : 'Resume Animation'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <button
                type="button"
                onClick={() => setCycleTime(0)}
                className="p-2 rounded-lg text-xs font-mono text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                title="Restart Cycle"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Speed Switchers */}
              <div className="flex items-center bg-black/30 rounded-lg p-0.5 border border-white/5 text-xs font-mono">
                {[1, 1.5, 2].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSpeed(s)}
                    className={`px-2 py-1 rounded-md transition-all ${
                      speed === s
                        ? 'bg-white/20 text-white font-bold'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>

              {/* Cycle progress indicator */}
              <div className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/5 text-[11px] font-mono text-nexora-orange-400 font-bold flex items-center gap-1.5">
                <Activity className="w-3 h-3 animate-pulse" />
                <span>{cycleTime.toFixed(1)}s / {TOTAL_CYCLE}s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step Progress Tracker Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { num: '01', name: 'Intent Dispatch', active: step === 0, desc: 'Patient → Hospital DID' },
            { num: '02', name: 'zk-Eligibility', active: step === 1, desc: 'Patient → Gov Agency' },
            { num: '03', name: 'Atomic Consensus', active: step === 2, desc: 'Block Mint & Validation' },
            { num: '04', name: 'Consent Receipt', active: step === 3 || step === 4, desc: 'Receipt → Patient Enclave' },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border transition-all ${
                item.active
                  ? 'bg-[#102454] border-nexora-orange-500/70 shadow-lg shadow-orange-950/20'
                  : 'bg-[#091530]/60 border-white/5 text-neutral-400'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className={item.active ? 'text-nexora-orange-400 font-bold' : 'text-neutral-500'}>
                  STEP {item.num}
                </span>
                {item.active && (
                  <span className="w-2 h-2 rounded-full bg-nexora-orange-400 animate-ping" />
                )}
              </div>
              <div className={`font-display font-bold text-sm mt-1 ${item.active ? 'text-white' : 'text-neutral-300'}`}>
                {item.name}
              </div>
              <div className="text-[11px] font-sans text-neutral-400 truncate mt-0.5">
                {item.desc}
              </div>
            </div>
          ))}
        </div>

        {/* CORE INTERACTIVE CANVAS & LOG PANEL GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Topologic Simulation Visualizer (8 Cols) */}
          <div className="lg:col-span-8 bg-[#091432]/90 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            {/* Ambient Background Grid and Radial Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(#203870_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Canvas Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2 text-xs font-mono">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="text-white font-bold uppercase tracking-wider">Topological Enclave Grid</span>
                <span className="text-neutral-500">|</span>
                <span className="text-neutral-300">4 Active Autonomous Nodes</span>
              </div>
              <span className="text-[11px] font-mono text-neutral-400">
                Click any node for deep telemetry
              </span>
            </div>

            {/* SVG Interactive Canvas */}
            <div className="relative w-full aspect-[16/10] min-h-[380px] sm:min-h-[460px]">
              <svg
                viewBox="0 0 900 560"
                className="w-full h-full absolute inset-0 select-none overflow-visible"
              >
                <defs>
                  {/* Glowing Gradients for Animated Circuit Connectors */}
                  <linearGradient id="grad-blue-orange" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#F5820D" stopOpacity="0.9" />
                  </linearGradient>

                  <linearGradient id="grad-orange-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F5820D" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#A855F7" stopOpacity="0.9" />
                  </linearGradient>

                  <linearGradient id="grad-green-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#2DE8C8" stopOpacity="0.9" />
                  </linearGradient>

                  {/* Filter for glowing effects */}
                  <filter id="glow-strong" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="packet-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* 1. Curved Circuit Path: Patient (160, 220) -> Hospital (740, 110) */}
                <path
                  d="M 190 200 C 360 110, 540 90, 710 110"
                  fill="none"
                  stroke="#1E3A70"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
                {/* Active energized line on Step 0 */}
                {step === 0 && (
                  <path
                    d="M 190 200 C 360 110, 540 90, 710 110"
                    fill="none"
                    stroke="url(#grad-blue-orange)"
                    strokeWidth="3.5"
                    strokeDasharray="14 10"
                    className="animate-pulse-flow"
                  />
                )}

                {/* 2. Curved Circuit Path: Patient (160, 240) -> Government (740, 390) */}
                <path
                  d="M 190 240 C 360 330, 540 370, 710 390"
                  fill="none"
                  stroke="#1E3A70"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
                {step === 1 && (
                  <path
                    d="M 190 240 C 360 330, 540 370, 710 390"
                    fill="none"
                    stroke="url(#grad-blue-orange)"
                    strokeWidth="3.5"
                    strokeDasharray="14 10"
                    className="animate-pulse-flow"
                  />
                )}

                {/* 3. Curved Circuit Path: Hospital (710, 140) -> Blockchain Trust Layer (480, 460) */}
                <path
                  d="M 710 140 C 650 300, 580 440, 480 460"
                  fill="none"
                  stroke="#1E3A70"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
                {step === 2 && (
                  <path
                    d="M 710 140 C 650 300, 580 440, 480 460"
                    fill="none"
                    stroke="url(#grad-orange-purple)"
                    strokeWidth="3.5"
                    strokeDasharray="14 10"
                    className="animate-pulse-flow"
                  />
                )}

                {/* 4. Curved Circuit Path: Government (710, 410) -> Blockchain Trust Layer (480, 475) */}
                <path
                  d="M 710 410 C 630 460, 560 475, 480 475"
                  fill="none"
                  stroke="#1E3A70"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
                {step === 2 && (
                  <path
                    d="M 710 410 C 630 460, 560 475, 480 475"
                    fill="none"
                    stroke="url(#grad-orange-purple)"
                    strokeWidth="3.5"
                    strokeDasharray="14 10"
                    className="animate-pulse-flow"
                  />
                )}

                {/* 5. Curved Circuit Path: Blockchain Trust Layer (420, 470) -> Patient (160, 260) */}
                <path
                  d="M 420 470 C 280 450, 180 360, 160 260"
                  fill="none"
                  stroke="#1E3A70"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
                {(step === 3 || step === 4) && (
                  <path
                    d="M 420 470 C 280 450, 180 360, 160 260"
                    fill="none"
                    stroke="url(#grad-green-cyan)"
                    strokeWidth="3.5"
                    strokeDasharray="14 10"
                    className="animate-pulse-flow"
                  />
                )}

                {/* ANIMATED PACKETS (Moving glowing tokens) */}
                {/* Packet 1: Patient -> Hospital */}
                {step === 0 && packet1Prog > 0 && packet1Prog < 1 && (
                  <g filter="url(#packet-glow)">
                    {/* Interpolate along bezier M 190 200 C 360 110, 540 90, 710 110 */}
                    {(() => {
                      const t = packet1Prog
                      const x = (1 - t) ** 3 * 190 + 3 * (1 - t) ** 2 * t * 360 + 3 * (1 - t) * t ** 2 * 540 + t ** 3 * 710
                      const y = (1 - t) ** 3 * 200 + 3 * (1 - t) ** 2 * t * 110 + 3 * (1 - t) * t ** 2 * 90 + t ** 3 * 110
                      return (
                        <>
                          <circle cx={x} cy={y} r="10" fill="#F5820D" fillOpacity="0.4" />
                          <circle cx={x} cy={y} r="5.5" fill="#FFFFFF" />
                          <text x={x} y={y - 12} fill="#F5820D" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                            intent.token
                          </text>
                        </>
                      )
                    })()}
                  </g>
                )}

                {/* Packet 2: Patient -> Government */}
                {step === 1 && packet2Prog > 0 && packet2Prog < 1 && (
                  <g filter="url(#packet-glow)">
                    {/* Interpolate along bezier M 190 240 C 360 330, 540 370, 710 390 */}
                    {(() => {
                      const t = packet2Prog
                      const x = (1 - t) ** 3 * 190 + 3 * (1 - t) ** 2 * t * 360 + 3 * (1 - t) * t ** 2 * 540 + t ** 3 * 710
                      const y = (1 - t) ** 3 * 240 + 3 * (1 - t) ** 2 * t * 330 + 3 * (1 - t) * t ** 2 * 370 + t ** 3 * 390
                      return (
                        <>
                          <circle cx={x} cy={y} r="10" fill="#2DE8C8" fillOpacity="0.4" />
                          <circle cx={x} cy={y} r="5.5" fill="#FFFFFF" />
                          <text x={x} y={y + 18} fill="#2DE8C8" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                            zk.proof_token
                          </text>
                        </>
                      )
                    })()}
                  </g>
                )}

                {/* Packet 3: Hospital -> Blockchain Trust Layer */}
                {step === 2 && packet3Prog > 0 && packet3Prog < 1 && (
                  <g filter="url(#packet-glow)">
                    {(() => {
                      const t = packet3Prog
                      const x = (1 - t) ** 3 * 710 + 3 * (1 - t) ** 2 * t * 650 + 3 * (1 - t) * t ** 2 * 580 + t ** 3 * 480
                      const y = (1 - t) ** 3 * 140 + 3 * (1 - t) ** 2 * t * 300 + 3 * (1 - t) * t ** 2 * 440 + t ** 3 * 460
                      return (
                        <>
                          <circle cx={x} cy={y} r="9" fill="#A855F7" fillOpacity="0.4" />
                          <circle cx={x} cy={y} r="5" fill="#FFFFFF" />
                          <text x={x + 14} y={y} fill="#A855F7" fontSize="9" fontFamily="monospace" fontWeight="bold">
                            slot.sig
                          </text>
                        </>
                      )
                    })()}
                  </g>
                )}

                {/* Packet 4: Government -> Blockchain Trust Layer */}
                {step === 2 && packet4Prog > 0 && packet4Prog < 1 && (
                  <g filter="url(#packet-glow)">
                    {(() => {
                      const t = packet4Prog
                      const x = (1 - t) ** 3 * 710 + 3 * (1 - t) ** 2 * t * 630 + 3 * (1 - t) * t ** 2 * 560 + t ** 3 * 480
                      const y = (1 - t) ** 3 * 410 + 3 * (1 - t) ** 2 * t * 460 + 3 * (1 - t) * t ** 2 * 475 + t ** 3 * 475
                      return (
                        <>
                          <circle cx={x} cy={y} r="9" fill="#A855F7" fillOpacity="0.4" />
                          <circle cx={x} cy={y} r="5" fill="#FFFFFF" />
                          <text x={x + 14} y={y + 12} fill="#A855F7" fontSize="9" fontFamily="monospace" fontWeight="bold">
                            voucher.sig
                          </text>
                        </>
                      )
                    })()}
                  </g>
                )}

                {/* Packet 5: Blockchain Trust Layer -> Patient */}
                {(step === 3 || step === 4) && packet5Prog > 0 && packet5Prog < 1 && (
                  <g filter="url(#packet-glow)">
                    {(() => {
                      const t = packet5Prog
                      const x = (1 - t) ** 3 * 420 + 3 * (1 - t) ** 2 * t * 280 + 3 * (1 - t) * t ** 2 * 180 + t ** 3 * 160
                      const y = (1 - t) ** 3 * 470 + 3 * (1 - t) ** 2 * t * 450 + 3 * (1 - t) * t ** 2 * 360 + t ** 3 * 260
                      return (
                        <>
                          <circle cx={x} cy={y} r="12" fill="#10B981" fillOpacity="0.4" />
                          <circle cx={x} cy={y} r="6" fill="#FFFFFF" />
                          <text x={x} y={y + 18} fill="#10B981" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                            consent.receipt ✓
                          </text>
                        </>
                      )
                    })()}
                  </g>
                )}
              </svg>

              {/* NODE 1: PATIENT AGENT (Left) */}
              <div
                onClick={() => setSelectedNode('patient')}
                className={`absolute top-[32%] left-[4%] sm:left-[6%] -translate-y-1/2 cursor-pointer p-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 group ${
                  selectedNode === 'patient'
                    ? 'bg-[#0E2356] border-nexora-orange-500 shadow-xl shadow-orange-950/40 ring-2 ring-nexora-orange-500/30'
                    : 'bg-[#0C1B40]/90 border-white/10 hover:border-white/30 shadow-lg'
                }`}
                style={{ width: '220px' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 group-hover:scale-105 transition-transform">
                    <User className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Edge Enclave</span>
                    <h3 className="font-display font-black text-sm text-white">Patient Agent</h3>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${getPatientStatus().color}`}>
                    {getPatientStatus().label}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">DID Sovereign</span>
                </div>
              </div>

              {/* NODE 2: HOSPITAL AGENT (Top Right) */}
              <div
                onClick={() => setSelectedNode('hospital')}
                className={`absolute top-[8%] right-[4%] sm:right-[6%] cursor-pointer p-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 group ${
                  selectedNode === 'hospital'
                    ? 'bg-[#0E2356] border-nexora-orange-500 shadow-xl shadow-orange-950/40 ring-2 ring-nexora-orange-500/30'
                    : 'bg-[#0C1B40]/90 border-white/10 hover:border-white/30 shadow-lg'
                }`}
                style={{ width: '230px' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 group-hover:scale-105 transition-transform">
                    <Building2 className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Clinical Node</span>
                    <h3 className="font-display font-black text-sm text-white">Hospital Agent</h3>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${getHospitalStatus().color}`}>
                    {getHospitalStatus().label}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">VC-Verified</span>
                </div>
              </div>

              {/* NODE 3: GOVERNMENT AGENT (Bottom Right) */}
              <div
                onClick={() => setSelectedNode('government')}
                className={`absolute bottom-[20%] right-[4%] sm:right-[6%] cursor-pointer p-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 group ${
                  selectedNode === 'government'
                    ? 'bg-[#0E2356] border-nexora-orange-500 shadow-xl shadow-orange-950/40 ring-2 ring-nexora-orange-500/30'
                    : 'bg-[#0C1B40]/90 border-white/10 hover:border-white/30 shadow-lg'
                }`}
                style={{ width: '230px' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 group-hover:scale-105 transition-transform">
                    <Landmark className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Subsidy & Policy</span>
                    <h3 className="font-display font-black text-sm text-white">Government Agent</h3>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${getGovStatus().color}`}>
                    {getGovStatus().label}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">zk-SNARK</span>
                </div>
              </div>

              {/* NODE 4: BLOCKCHAIN TRUST LAYER (Center Bottom) */}
              <div
                onClick={() => setSelectedNode('trust')}
                className={`absolute bottom-[2%] left-[45%] -translate-x-1/2 cursor-pointer p-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 group ${
                  selectedNode === 'trust'
                    ? 'bg-[#151238] border-purple-500 shadow-xl shadow-purple-950/40 ring-2 ring-purple-500/30'
                    : 'bg-[#0E132E]/95 border-white/10 hover:border-purple-500/40 shadow-lg'
                }`}
                style={{ width: '260px' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 group-hover:scale-105 transition-transform">
                    <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Decentralized L2</span>
                    <h3 className="font-display font-black text-sm text-white">Blockchain Trust Layer</h3>
                  </div>
                </div>

                {/* Scrambling Hash Display */}
                <div className="mt-2.5 px-2.5 py-1 rounded bg-black/50 border border-purple-500/20 font-mono text-[10px] text-purple-300 flex items-center justify-between">
                  <span>Block Hash:</span>
                  <span className="font-bold text-white tracking-wider">{blockHash}</span>
                </div>

                <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${getTrustLayerStatus().color}`}>
                    {getTrustLayerStatus().label}
                  </span>
                  <span className="text-[10px] font-mono text-purple-300">21 Validators</span>
                </div>
              </div>
            </div>

            {/* Bottom Status Ticker Strip */}
            <div className="relative z-10 mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-xs font-mono text-neutral-400 gap-2">
              <div className="flex items-center gap-2">
                <span className="text-white font-bold">Privacy Guarantee:</span>
                <span className="text-emerald-400 font-bold">Zero Raw PHI On-Chain (HIPAA/GDPR Compliant ✓)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neutral-500">Latency:</span>
                <span className="text-neutral-300 font-bold">Sub-Second ZK Verification</span>
              </div>
            </div>
          </div>

          {/* Right Log Terminal & Active Node Telemetry Panel (4 Cols) */}
          <div className="lg:col-span-4 space-y-6 flex flex-col">
            {/* Live Terminal Log */}
            <div className="bg-[#050C1F] border border-white/10 rounded-2xl shadow-xl overflow-hidden flex flex-col h-[340px]">
              <div className="px-4 py-2.5 bg-[#091530] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-nexora-orange-400" />
                  <span className="text-xs font-mono font-bold text-white">Live Execution Telemetry</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">SYNCED</span>
                </div>
              </div>

              {/* Scrollable Log Stream */}
              <div
                ref={logContainerRef}
                className="p-4 space-y-3 font-mono text-xs overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-white/10"
              >
                {logs.length === 0 ? (
                  <div className="text-neutral-500 text-center pt-8">
                    Initializing mission telemetry...
                  </div>
                ) : (
                  logs.map((log) => (
                    <div
                      key={log.id}
                      className="space-y-1 animate-in fade-in slide-in-from-bottom-1 duration-200"
                    >
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <span className="text-neutral-500">[{log.timestamp}]</span>
                        <span
                          className={`font-bold ${
                            log.agent === 'patient-agent'
                              ? 'text-blue-400'
                              : log.agent === 'hospital-agent'
                              ? 'text-amber-400'
                              : log.agent === 'gov-agent'
                              ? 'text-teal-400'
                              : 'text-purple-400'
                          }`}
                        >
                          {log.agent}
                        </span>
                      </div>
                      <p className="text-neutral-200 text-xs pl-2 border-l border-white/10 leading-relaxed font-sans">
                        {log.action}
                      </p>
                      {log.payload && (
                        <p className="text-[10px] text-neutral-400 pl-2 font-mono">
                          ↳ {log.payload}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Selected Node Deep Dive Inspector Card */}
            <div className="bg-[#091530] border border-white/10 rounded-2xl p-5 shadow-xl space-y-3.5">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span className="text-xs font-mono text-nexora-orange-400 font-bold uppercase tracking-wider">
                  Node Inspector
                </span>
                <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-neutral-300">
                  {nodeDetails[selectedNode]?.type}
                </span>
              </div>

              <div>
                <h4 className="font-display font-black text-base text-white">
                  {nodeDetails[selectedNode]?.title}
                </h4>
                <p className="text-xs font-mono text-neutral-400 mt-1 break-all bg-black/40 p-2 rounded-lg border border-white/5">
                  DID: <span className="text-neutral-200">{nodeDetails[selectedNode]?.did}</span>
                </p>
              </div>

              <div className="space-y-2 text-xs font-sans">
                <div>
                  <span className="text-neutral-400 font-bold block text-[11px] font-mono uppercase tracking-wider">
                    Role & Orchestration:
                  </span>
                  <p className="text-neutral-300 leading-relaxed mt-0.5">
                    {nodeDetails[selectedNode]?.role}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5">
                  <span className="text-emerald-400 font-bold block text-[11px] font-mono uppercase tracking-wider">
                    Privacy Boundary:
                  </span>
                  <p className="text-neutral-300 leading-relaxed mt-0.5">
                    {nodeDetails[selectedNode]?.privacy}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Architecture Context Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0C1A3E] via-[#0E204E] to-[#0A1634] border border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nexora-orange-500/15 border border-nexora-orange-500/30 text-nexora-orange-400 font-mono text-xs font-bold">
              <Lock className="w-3.5 h-3.5" />
              <span>Full End-to-End Cryptographic Security</span>
            </div>
            <h3 className="font-display font-black text-xl sm:text-2xl text-white">
              Sovereign Multi-Agent Architecture
            </h3>
            <p className="text-xs sm:text-sm font-sans text-neutral-300 leading-relaxed">
              Every request is signed client-side with W3C Decentralized Identifiers (DIDs). Zero-Knowledge Proofs guarantee eligibility without revealing tax or identity records, and time-bounded smart consents ensure access terminates automatically after 72 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <Link
              href="/architecture"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-nexora-orange-500 hover:bg-nexora-orange-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-950/40 transition-all active:scale-[0.98]"
            >
              <span>Read Architecture Spec</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
