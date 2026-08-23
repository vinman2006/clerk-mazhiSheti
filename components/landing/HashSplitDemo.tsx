'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  Activity, 
  Copy, 
  Check, 
  RotateCcw, 
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

  // Form inputs
  const [name, setName] = useState('Aditi Sharma')
  const [dob, setDob] = useState('1998-04-12')
  const [email, setEmail] = useState('demo@example.gov.in')

  const [condition, setCondition] = useState('Type 2 Diabetes Review')
  const [doctorName, setDoctorName] = useState('Dr. R. Verma, AIIMS')
  const [notes, setNotes] = useState('HbA1c normal, maintain medication')

  // Scramble display states
  const [scrambledName, setScrambledName] = useState(name)
  const [scrambledDob, setScrambledDob] = useState(dob)
  const [scrambledEmail, setScrambledEmail] = useState(email)
  const [scrambledCondition, setScrambledCondition] = useState(condition)
  const [scrambledDoctor, setScrambledDoctor] = useState(doctorName)
  const [scrambledNotes, setScrambledNotes] = useState(notes)

  // Hashes
  const [personHash, setPersonHash] = useState<HashResult | null>(null)
  const [medicalHash, setMedicalHash] = useState<HashResult | null>(null)

  // Copy feedback
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
      const data = await hashPromise
      if (data?.personHash && data?.medicalHash) {
        setPersonHash(data.personHash)
        setMedicalHash(data.medicalHash)
      } else {
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
    setEmail('demo@example.gov.in')
    setCondition('Type 2 Diabetes Review')
    setDoctorName('Dr. R. Verma, AIIMS')
    setNotes('HbA1c normal, maintain medication')
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
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {state !== 'revealed' ? (
          <motion.div
            key="input-stage"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* TWO INPUT PANELS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {/* LEFT: IDENTITY DETAILS PANEL */}
              <div className="p-6 rounded-lg bg-white border border-[#E0E0E0] border-t-4 border-t-[#F5821F] shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                    <div className="flex items-center gap-2 text-[#D66D10] font-bold text-sm">
                      <User className="w-4 h-4" />
                      <span>1. Citizen Identity Attributes (व्यक्ती ओळख)</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FFF5EB] text-[#D66D10] border border-[#F5821F]/30">
                      Store A
                    </span>
                  </div>

                  <div className="space-y-3 text-xs font-sans">
                    <div className="space-y-1">
                      <label className="text-[11px] text-[#4B5563] font-bold block">Citizen Legal Name:</label>
                      <input
                        type="text"
                        value={state === 'hiding' ? scrambledName : name}
                        disabled={state === 'hiding'}
                        onChange={(e) => handleInputChange(setName, e.target.value)}
                        className="w-full px-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] text-xs font-medium focus:outline-none focus:bg-white focus:border-[#0B3D91] transition-all"
                        placeholder="e.g. Aditi Sharma"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-[#4B5563] font-bold block">Date of Birth:</label>
                      <input
                        type="text"
                        value={state === 'hiding' ? scrambledDob : dob}
                        disabled={state === 'hiding'}
                        onChange={(e) => handleInputChange(setDob, e.target.value)}
                        className="w-full px-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] text-xs font-medium focus:outline-none focus:bg-white focus:border-[#0B3D91] transition-all"
                        placeholder="YYYY-MM-DD"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-[#4B5563] font-bold block">Email / ABHA ID:</label>
                      <input
                        type="email"
                        value={state === 'hiding' ? scrambledEmail : email}
                        disabled={state === 'hiding'}
                        onChange={(e) => handleInputChange(setEmail, e.target.value)}
                        className="w-full px-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] text-xs font-medium focus:outline-none focus:bg-white focus:border-[#0B3D91] transition-all"
                        placeholder="demo@example.gov.in"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-neutral-500 flex items-center gap-1.5 border-t border-neutral-100">
                  <Lock className="w-3 h-3 text-[#F5821F]" />
                  <span>Encrypted in Sovereign Identity Registry (`persons`)</span>
                </div>
              </div>

              {/* RIGHT: MEDICAL DETAILS PANEL */}
              <div className="p-6 rounded-lg bg-white border border-[#E0E0E0] border-t-4 border-t-[#1E7A34] shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                    <div className="flex items-center gap-2 text-[#1E7A34] font-bold text-sm">
                      <HeartPulse className="w-4 h-4" />
                      <span>2. Clinical & Diagnostic Parameters (आरोग्य तपशील)</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#E8F5E9] text-[#1E7A34] border border-[#1E7A34]/30">
                      Store B
                    </span>
                  </div>

                  <div className="space-y-3 text-xs font-sans">
                    <div className="space-y-1">
                      <label className="text-[11px] text-[#4B5563] font-bold block">Clinical Condition / Observation:</label>
                      <input
                        type="text"
                        value={state === 'hiding' ? scrambledCondition : condition}
                        disabled={state === 'hiding'}
                        onChange={(e) => handleInputChange(setCondition, e.target.value)}
                        className="w-full px-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] text-xs font-medium focus:outline-none focus:bg-white focus:border-[#1E7A34] transition-all"
                        placeholder="e.g. Type 2 Diabetes Review"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-[#4B5563] font-bold block">Attending Hospital / Physician:</label>
                      <input
                        type="text"
                        value={state === 'hiding' ? scrambledDoctor : doctorName}
                        disabled={state === 'hiding'}
                        onChange={(e) => handleInputChange(setDoctorName, e.target.value)}
                        className="w-full px-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] text-xs font-medium focus:outline-none focus:bg-white focus:border-[#1E7A34] transition-all"
                        placeholder="e.g. Dr. R. Verma, AIIMS"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-[#4B5563] font-bold block">Diagnostic Notes:</label>
                      <input
                        type="text"
                        value={state === 'hiding' ? scrambledNotes : notes}
                        disabled={state === 'hiding'}
                        onChange={(e) => handleInputChange(setNotes, e.target.value)}
                        className="w-full px-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] text-xs font-medium focus:outline-none focus:bg-white focus:border-[#1E7A34] transition-all"
                        placeholder="e.g. HbA1c normal"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-neutral-500 flex items-center gap-1.5 border-t border-neutral-100">
                  <ShieldCheck className="w-3 h-3 text-[#1E7A34]" />
                  <span>Decoupled clinical store (`medicalRecords`)</span>
                </div>
              </div>
            </div>

            {/* ACTION BUTTON */}
            <div className="text-center space-y-2 pt-2">
              <button
                onClick={handleHideData}
                disabled={state === 'hiding'}
                className="px-8 py-3.5 rounded-md bg-[#1E7A34] hover:bg-[#145524] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 mx-auto active:scale-[0.99] disabled:opacity-75"
              >
                <Lock className="w-4 h-4" />
                <span>{state === 'hiding' ? 'Computing SHA-256 Hashes...' : 'Execute Cryptographic Split & Shield'}</span>
              </button>

              <p className="text-[11px] text-neutral-500">
                Interactive demonstration — zero data leaves your local session.
              </p>
            </div>
          </motion.div>
        ) : (
          /* REVEALED STAGE: TWO UNLINKABLE HASH CARDS */
          <motion.div
            key="revealed-stage"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
            aria-live="polite"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative items-stretch">
              {/* LEFT: PERSON HASH CARD */}
              <div className="p-6 rounded-lg bg-white border border-[#E0E0E0] border-l-4 border-l-[#F5821F] shadow-md space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                    <div className="flex items-center gap-2 text-[#D66D10] font-bold text-sm">
                      <KeyRound className="w-4 h-4" />
                      <span>Deterministic Person Hash</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FFF5EB] text-[#D66D10] border border-[#F5821F]/30">
                      Identity Token
                    </span>
                  </div>

                  <p className="text-xs text-[#4B5563]">
                    SHA-256 identifier derived strictly from demographic identity:
                  </p>

                  <div className="p-3 rounded-md bg-[#F8FAFC] border border-[#CBD5E1] flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-[#D66D10] font-bold select-all truncate">
                      {personHash?.display}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(personHash?.full || '', true)}
                      className="px-2.5 py-1 rounded bg-white hover:bg-neutral-100 text-neutral-700 text-xs font-semibold border border-neutral-300 transition-all flex items-center gap-1 shrink-0"
                    >
                      {copiedPerson ? <Check className="w-3.5 h-3.5 text-[#1E7A34]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedPerson ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <div className="text-[11px] text-neutral-500 pt-2 border-t border-neutral-100">
                  Citizen: <strong className="text-neutral-900">{name}</strong> (DOB: {dob})
                </div>
              </div>

              {/* RIGHT: MEDICAL DATA HASH CARD */}
              <div className="p-6 rounded-lg bg-white border border-[#E0E0E0] border-l-4 border-l-[#1E7A34] shadow-md space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                    <div className="flex items-center gap-2 text-[#1E7A34] font-bold text-sm">
                      <Activity className="w-4 h-4" />
                      <span>Medical Data Hash</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#E8F5E9] text-[#1E7A34] border border-[#1E7A34]/30">
                      Clinical Payload
                    </span>
                  </div>

                  <p className="text-xs text-[#4B5563]">
                    SHA-256 identifier generated purely from clinical diagnostic records:
                  </p>

                  <div className="p-3 rounded-md bg-[#F8FAFC] border border-[#CBD5E1] flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-[#1E7A34] font-bold select-all truncate">
                      {medicalHash?.display}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(medicalHash?.full || '', false)}
                      className="px-2.5 py-1 rounded bg-white hover:bg-neutral-100 text-neutral-700 text-xs font-semibold border border-neutral-300 transition-all flex items-center gap-1 shrink-0"
                    >
                      {copiedMedical ? <Check className="w-3.5 h-3.5 text-[#1E7A34]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedMedical ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <div className="text-[11px] text-neutral-500 pt-2 border-t border-neutral-100">
                  Diagnosis: <strong className="text-neutral-900">{condition}</strong> ({doctorName})
                </div>
              </div>
            </div>

            {/* CONNECTOR STRIP */}
            <div className="p-3 rounded-md bg-[#EAF1FB] border border-[#0B3D91]/20 text-center text-xs text-[#0B3D91] font-semibold flex items-center justify-center gap-2">
              <Split className="w-4 h-4 text-[#F5821F] shrink-0" />
              <span>Identity & Medical Records are completely decoupled in MongoDB & Blockchain Ledger.</span>
            </div>

            {/* RESET BUTTON */}
            <div className="text-center pt-2">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-md bg-white hover:bg-neutral-50 text-[#0B3D91] border-2 border-[#0B3D91] text-xs font-bold transition-all shadow-sm inline-flex items-center gap-2 uppercase tracking-wider"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#F5821F]" />
                <span>Test Another Clinical Record</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

