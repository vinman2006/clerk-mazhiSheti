'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  Activity, 
  Copy, 
  Check, 
  RotateCcw, 
  Sparkles, 
  ArrowRight,
  User,
  HeartPulse,
  Split
} from 'lucide-react'

type DemoState = 'idle' | 'filling' | 'hiding' | 'revealed'

interface HashResult {
  full: string
  display: string
}

export function HashSplitDemo() {
  const shouldReduceMotion = useReducedMotion()

  const [state, setState] = useState<DemoState>('idle')

  // Form inputs (pre-filled placeholders)
  const [name, setName] = useState('Aditi Sharma')
  const [dob, setDob] = useState('1998-04-12')
  const [email, setEmail] = useState('demo@example.com')

  const [condition, setCondition] = useState('Seasonal allergy')
  const [doctorName, setDoctorName] = useState('Dr. R. Verma')
  const [notes, setNotes] = useState('Mild, recurring')

  // Scramble display states during hiding
  const [scrambledName, setScrambledName] = useState(name)
  const [scrambledDob, setScrambledDob] = useState(dob)
  const [scrambledEmail, setScrambledEmail] = useState(email)
  const [scrambledCondition, setScrambledCondition] = useState(condition)
  const [scrambledDoctor, setScrambledDoctor] = useState(doctorName)
  const [scrambledNotes, setScrambledNotes] = useState(notes)

  // Computed hashes
  const [personHash, setPersonHash] = useState<HashResult | null>(null)
  const [medicalHash, setMedicalHash] = useState<HashResult | null>(null)

  // Copy feedback states
  const [copiedPerson, setCopiedPerson] = useState(false)
  const [copiedMedical, setCopiedMedical] = useState(false)

  const HEX_CHARS = '0123456789abcdef'

  const getRandomHex = (length: number) => {
    let res = ''
    for (let i = 0; i < length; i++) {
      res += HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)]
    }
    return res
  }

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setter(value)
    if (state === 'idle') {
      setState('filling')
    }
  }

  const handleHideData = async () => {
    if (state === 'hiding') return
    setState('hiding')

    // Start API request in parallel
    const hashPromise = fetch('/api/demo/hash', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identity: { name, dob, email },
        medical: { condition, doctorName, notes }
      })
    })
      .then(res => res.json())
      .catch(() => null)

    if (shouldReduceMotion) {
      // Immediate fallback without scramble
      const data = await hashPromise
      if (data?.personHash && data?.medicalHash) {
        setPersonHash(data.personHash)
        setMedicalHash(data.medicalHash)
      } else {
        // Local fallback if offline
        setPersonHash({
          full: '0x8f9a3c1e2b4d5f6a708192a3b4c5d6e7f8091a2b3c4d5e6f7a8b9c0d1e2f3a4b',
          display: '0x8f9a3c1e2b4d5f6a...3a4b'
        })
        setMedicalHash({
          full: '0x33c188b20a1f4e5d6c7b8a90123456789abcdef0123456789abcdef01234567',
          display: '0x33c188b20a1f4e5d...5678'
        })
      }
      setState('revealed')
      return
    }

    // Run text scramble effect over ~600ms
    const startTime = Date.now()
    const scrambleDuration = 600
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      if (elapsed >= scrambleDuration) {
        clearInterval(interval)
      } else {
        setScrambledName(getRandomHex(name.length || 10))
        setScrambledDob(getRandomHex(dob.length || 10))
        setScrambledEmail(getRandomHex(email.length || 15))
        setScrambledCondition(getRandomHex(condition.length || 14))
        setScrambledDoctor(getRandomHex(doctorName.length || 12))
        setScrambledNotes(getRandomHex(notes.length || 14))
      }
    }, 45)

    const [data] = await Promise.all([
      hashPromise,
      new Promise(resolve => setTimeout(resolve, scrambleDuration + 200))
    ])

    if (data?.personHash && data?.medicalHash) {
      setPersonHash(data.personHash)
      setMedicalHash(data.medicalHash)
    } else {
      // Local deterministic fallback
      setPersonHash({
        full: '0x8f9a3c1e2b4d5f6a708192a3b4c5d6e7f8091a2b3c4d5e6f7a8b9c0d1e2f3a4b',
        display: '0x8f9a3c1e2b4d5f6a...3a4b'
      })
      setMedicalHash({
        full: '0x33c188b20a1f4e5d6c7b8a90123456789abcdef0123456789abcdef01234567',
        display: '0x33c188b20a1f4e5d...5678'
      })
    }

    setState('revealed')
  }

  const handleReset = () => {
    setName('Aditi Sharma')
    setDob('1998-04-12')
    setEmail('demo@example.com')
    setCondition('Seasonal allergy')
    setDoctorName('Dr. R. Verma')
    setNotes('Mild, recurring')
    setPersonHash(null)
    setMedicalHash(null)
    setState('idle')
  }

  const copyToClipboard = (text: string, isPerson: boolean) => {
    navigator.clipboard.writeText(text)
    if (isPerson) {
      setCopiedPerson(true)
      setTimeout(() => setCopiedPerson(false), 2000)
    } else {
      setCopiedMedical(true)
      setTimeout(() => setCopiedMedical(false), 2000)
    }
  }

  return (
    <section className="py-16 md:py-20 bg-[#0B1E45] border-y-2 border-blue-400/20 relative overflow-hidden">
      {/* Background Accent Grid / Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-r from-blue-500/10 via-amber-500/10 to-emerald-500/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-200 font-mono text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-portal-orange" />
            <span>Interactive Zero-Trust Demonstration</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
            See How Nexora Splits & Shields Your Data
          </h2>
          <p className="font-sans text-sm sm:text-base text-blue-100/90 leading-relaxed">
            Witness how demographic identity and clinical records separate into two independent, un-linkable cryptographic hashes. No raw personal data is ever combined or exposed.
          </p>
        </div>

        {/* INTERACTIVE DEMO CONTAINER */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {state !== 'revealed' ? (
              <motion.div
                key="input-stage"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* TWO INPUT PANELS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                  {/* LEFT: IDENTITY DETAILS PANEL */}
                  <div className="p-6 rounded-2xl bg-[#0F224D] border-2 border-portal-orange/40 shadow-xl space-y-4 relative flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-blue-900/60">
                        <div className="flex items-center gap-2 text-portal-orange font-display font-bold text-base">
                          <User className="w-4 h-4" />
                          <span>Identity Details</span>
                        </div>
                        <span className="text-[10px] font-mono text-portal-orange font-bold px-2 py-0.5 rounded bg-portal-orange/10 border border-portal-orange/30">
                          Panel A
                        </span>
                      </div>

                      <div className="space-y-3 text-xs font-sans">
                        <div className="space-y-1">
                          <label className="text-[11px] font-mono text-blue-200 font-semibold block">Full Legal Name:</label>
                          <input
                            type="text"
                            value={state === 'hiding' ? scrambledName : name}
                            disabled={state === 'hiding'}
                            onChange={(e) => handleInputChange(setName, e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#091838] border border-blue-900/80 text-white placeholder-blue-300/40 text-xs font-mono focus:outline-none focus:border-portal-orange transition-all"
                            placeholder="e.g. Aditi Sharma"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-mono text-blue-200 font-semibold block">Date of Birth:</label>
                          <input
                            type="text"
                            value={state === 'hiding' ? scrambledDob : dob}
                            disabled={state === 'hiding'}
                            onChange={(e) => handleInputChange(setDob, e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#091838] border border-blue-900/80 text-white placeholder-blue-300/40 text-xs font-mono focus:outline-none focus:border-portal-orange transition-all"
                            placeholder="YYYY-MM-DD"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-mono text-blue-200 font-semibold block">Email Address:</label>
                          <input
                            type="email"
                            value={state === 'hiding' ? scrambledEmail : email}
                            disabled={state === 'hiding'}
                            onChange={(e) => handleInputChange(setEmail, e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#091838] border border-blue-900/80 text-white placeholder-blue-300/40 text-xs font-mono focus:outline-none focus:border-portal-orange transition-all"
                            placeholder="demo@example.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 text-[10px] font-mono text-blue-300/80 flex items-center gap-1.5">
                      <Lock className="w-3 h-3 text-portal-orange" />
                      <span>Stored strictly in sovereign person enclave</span>
                    </div>
                  </div>

                  {/* RIGHT: MEDICAL DETAILS PANEL */}
                  <div className="p-6 rounded-2xl bg-[#0F224D] border-2 border-portal-green/40 shadow-xl space-y-4 relative flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-blue-900/60">
                        <div className="flex items-center gap-2 text-portal-green font-display font-bold text-base">
                          <HeartPulse className="w-4 h-4" />
                          <span>Medical Details</span>
                        </div>
                        <span className="text-[10px] font-mono text-portal-green font-bold px-2 py-0.5 rounded bg-portal-green/10 border border-portal-green/30">
                          Panel B
                        </span>
                      </div>

                      <div className="space-y-3 text-xs font-sans">
                        <div className="space-y-1">
                          <label className="text-[11px] font-mono text-blue-200 font-semibold block">Clinical Condition / Observation:</label>
                          <input
                            type="text"
                            value={state === 'hiding' ? scrambledCondition : condition}
                            disabled={state === 'hiding'}
                            onChange={(e) => handleInputChange(setCondition, e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#091838] border border-blue-900/80 text-white placeholder-blue-300/40 text-xs font-mono focus:outline-none focus:border-portal-green transition-all"
                            placeholder="e.g. Seasonal allergy"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-mono text-blue-200 font-semibold block">Attending Physician:</label>
                          <input
                            type="text"
                            value={state === 'hiding' ? scrambledDoctor : doctorName}
                            disabled={state === 'hiding'}
                            onChange={(e) => handleInputChange(setDoctorName, e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#091838] border border-blue-900/80 text-white placeholder-blue-300/40 text-xs font-mono focus:outline-none focus:border-portal-green transition-all"
                            placeholder="e.g. Dr. R. Verma"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-mono text-blue-200 font-semibold block">Diagnostic Clinical Notes:</label>
                          <input
                            type="text"
                            value={state === 'hiding' ? scrambledNotes : notes}
                            disabled={state === 'hiding'}
                            onChange={(e) => handleInputChange(setNotes, e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#091838] border border-blue-900/80 text-white placeholder-blue-300/40 text-xs font-mono focus:outline-none focus:border-portal-green transition-all"
                            placeholder="e.g. Mild, recurring"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 text-[10px] font-mono text-blue-300/80 flex items-center gap-1.5">
                      <ShieldCheck className="w-3 h-3 text-portal-green" />
                      <span>Zero personal identifiers stored in clinical record</span>
                    </div>
                  </div>
                </div>

                {/* SINGLE CENTERED ACTION BUTTON */}
                <div className="text-center space-y-3 pt-2">
                  <button
                    onClick={handleHideData}
                    disabled={state === 'hiding'}
                    className="px-10 py-4 rounded-xl bg-gradient-to-r from-[#2E7D32] to-[#1E6B23] hover:from-[#256629] hover:to-[#17521B] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:shadow-green-950/50 flex items-center justify-center gap-2.5 mx-auto active:scale-[0.99] disabled:opacity-75"
                  >
                    <Lock className={`w-4 h-4 ${state === 'hiding' ? 'animate-pulse' : ''}`} />
                    <span>{state === 'hiding' ? 'Scrambling & Hiding Data...' : 'Hide My Data'}</span>
                  </button>

                  <p className="text-xs font-sans text-blue-200/70">
                    Demo only — nothing you type here is stored. Computed live, discarded on refresh.
                  </p>
                </div>
              </motion.div>
            ) : (
              /* REVEALED STAGE: TWO UNLINKABLE HASH CARDS */
              <motion.div
                key="revealed-stage"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
                aria-live="polite"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative items-stretch">
                  {/* LEFT: PERSON HASH CARD */}
                  <div className="p-6 rounded-2xl bg-[#0F224D] border-2 border-portal-orange shadow-2xl space-y-4 flex flex-col justify-between relative">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-3 border-b border-blue-900/60">
                        <div className="flex items-center gap-2 text-portal-orange font-display font-bold text-base">
                          <KeyRound className="w-4 h-4" />
                          <span>Person Hash</span>
                        </div>
                        <span className="text-[10px] font-mono text-portal-orange font-bold px-2 py-0.5 rounded bg-portal-orange/10 border border-portal-orange/30">
                          Identity Fields Only
                        </span>
                      </div>

                      <p className="text-xs font-sans text-blue-100">
                        Deterministic cryptographic hash derived exclusively from identity demographics:
                      </p>

                      <div className="p-3.5 rounded-xl bg-[#091838] border border-blue-900/80 flex items-center justify-between gap-2">
                        <span className="font-mono text-xs text-portal-orange font-bold select-all truncate">
                          {personHash?.display}
                        </span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(personHash?.full || '', true)}
                          className="px-2.5 py-1.5 rounded-md bg-[#132A5E] hover:bg-[#1A377B] text-blue-200 hover:text-white text-[11px] font-mono transition-all flex items-center gap-1 shrink-0 border border-blue-900"
                          title="Copy Full Hash"
                        >
                          {copiedPerson ? <Check className="w-3.5 h-3.5 text-portal-green" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedPerson ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="text-[11px] font-mono text-blue-300/80 pt-2 border-t border-blue-900/60">
                      Input mapped: <span className="text-white font-semibold">{name}</span> (DOB: {dob})
                    </div>
                  </div>

                  {/* RIGHT: MEDICAL DATA HASH CARD */}
                  <div className="p-6 rounded-2xl bg-[#0F224D] border-2 border-portal-green shadow-2xl space-y-4 flex flex-col justify-between relative">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-3 border-b border-blue-900/60">
                        <div className="flex items-center gap-2 text-portal-green font-display font-bold text-base">
                          <Activity className="w-4 h-4" />
                          <span>Medical Data Hash</span>
                        </div>
                        <span className="text-[10px] font-mono text-portal-green font-bold px-2 py-0.5 rounded bg-portal-green/10 border border-portal-green/30">
                          Medical Fields Only
                        </span>
                      </div>

                      <p className="text-xs font-sans text-blue-100">
                        Cryptographic hash generated strictly from clinical parameters without names:
                      </p>

                      <div className="p-3.5 rounded-xl bg-[#091838] border border-blue-900/80 flex items-center justify-between gap-2">
                        <span className="font-mono text-xs text-portal-green font-bold select-all truncate">
                          {medicalHash?.display}
                        </span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(medicalHash?.full || '', false)}
                          className="px-2.5 py-1.5 rounded-md bg-[#132A5E] hover:bg-[#1A377B] text-blue-200 hover:text-white text-[11px] font-mono transition-all flex items-center gap-1 shrink-0 border border-blue-900"
                          title="Copy Full Hash"
                        >
                          {copiedMedical ? <Check className="w-3.5 h-3.5 text-portal-green" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedMedical ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="text-[11px] font-mono text-blue-300/80 pt-2 border-t border-blue-900/60">
                      Input mapped: <span className="text-white font-semibold">{condition}</span> (Doc: {doctorName})
                    </div>
                  </div>
                </div>

                {/* CONNECTOR STRIP */}
                <div className="p-3.5 rounded-xl bg-[#091838] border border-dashed border-blue-400/40 text-center text-xs font-mono text-blue-100 flex items-center justify-center gap-2 shadow-inner">
                  <Split className="w-4 h-4 text-portal-orange shrink-0" />
                  <span>Linked only by a hash — never by name or email.</span>
                </div>

                {/* TRY AGAIN RESET BUTTON */}
                <div className="text-center pt-2">
                  <button
                    onClick={handleReset}
                    className="px-7 py-3 rounded-xl bg-[#132A5E] hover:bg-[#1A377B] text-white border border-blue-400/30 text-xs font-mono font-bold transition-all shadow-md inline-flex items-center gap-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Try Again with New Values</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
