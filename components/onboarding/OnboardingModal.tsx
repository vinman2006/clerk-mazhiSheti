'use client'

import React, { useState } from 'react'
import { 
  ShieldCheck, 
  KeyRound, 
  Heart, 
  User, 
  MapPin, 
  Check, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  Building2,
  AlertCircle
} from 'lucide-react'
import { useUserData } from '@/lib/userDataContext'
import { NexoraLogoIcon } from '@/components/ui/NexoraLogo'

export function OnboardingModal() {
  const { profile, hasCompletedOnboarding, completeOnboarding } = useUserData()

  const [step, setStep] = useState<number>(1)
  const [name, setName] = useState(profile.name || '')
  const [dob, setDob] = useState(profile.dob || '1995-06-15')
  const [gender, setGender] = useState(profile.gender || 'Male')
  const [bloodGroup, setBloodGroup] = useState(profile.bloodGroup || 'O+')
  const [district, setDistrict] = useState(profile.district || 'Metropolis Medical District (District 4)')
  const [emergencyContact, setEmergencyContact] = useState(profile.emergencyContact || '+1 (555) 234-5678')
  
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>(profile.allergies || ['Penicillin'])
  const [customAllergy, setCustomAllergy] = useState('')
  
  const [selectedConditions, setSelectedConditions] = useState<string[]>(profile.chronicConditions || ['Mild Arrhythmia'])
  const [customCondition, setCustomCondition] = useState('')

  const availableAllergies = ['Penicillin', 'Sulfa drugs', 'Aspirin', 'Latex', 'Peanuts', 'None']
  const availableConditions = ['Cardiovascular / Arrhythmia', 'Type 2 Diabetes', 'Hypertension', 'Asthma', 'Migraine', 'None']

  if (hasCompletedOnboarding) return null

  const handleToggleAllergy = (item: string) => {
    if (item === 'None') {
      setSelectedAllergies(['None'])
      return
    }
    const filtered = selectedAllergies.filter(a => a !== 'None')
    if (filtered.includes(item)) {
      setSelectedAllergies(filtered.filter(a => a !== item))
    } else {
      setSelectedAllergies([...filtered, item])
    }
  }

  const handleToggleCondition = (item: string) => {
    if (item === 'None') {
      setSelectedConditions(['None'])
      return
    }
    const filtered = selectedConditions.filter(c => c !== 'None')
    if (filtered.includes(item)) {
      setSelectedConditions(filtered.filter(c => c !== item))
    } else {
      setSelectedConditions([...filtered, item])
    }
  }

  const handleFinish = () => {
    const did = profile.did.startsWith('did:nexora') 
      ? profile.did 
      : `did:nexora:pat:${Math.random().toString(36).substring(2, 10)}`

    completeOnboarding({
      name: name.trim() || 'Sovereign Patient',
      dob,
      gender,
      bloodGroup,
      district,
      emergencyContact,
      allergies: selectedAllergies,
      chronicConditions: selectedConditions,
      did
    })
  }

  return (
    <div className="fixed inset-0 z-[100000] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-[#141826] border-2 border-[#1E3A8A] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* TOP BAR */}
        <div className="p-6 bg-gradient-to-r from-[#152A63] to-[#101420] border-b border-neutral-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#101935] border border-portal-orange/50 flex items-center justify-center p-1.5 shadow-md">
              <NexoraLogoIcon className="w-full h-full" />
            </div>
            <div>
              <h2 className="font-display font-black text-lg text-white">
                Sovereign Health Identity Setup
              </h2>
              <span className="text-xs font-mono text-portal-orange font-bold">
                Step {step} of 3 • Client-Side Zero-Knowledge Enrollment
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs text-neutral-400">
            <span className={`w-2.5 h-2.5 rounded-full ${step >= 1 ? 'bg-portal-orange' : 'bg-neutral-700'}`}></span>
            <span className={`w-2.5 h-2.5 rounded-full ${step >= 2 ? 'bg-portal-orange' : 'bg-neutral-700'}`}></span>
            <span className={`w-2.5 h-2.5 rounded-full ${step >= 3 ? 'bg-portal-green' : 'bg-neutral-700'}`}></span>
          </div>
        </div>

        {/* BODY STEPS */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* STEP 1: DEMOGRAPHICS */}
          {step === 1 && (
            <div className="space-y-4 text-xs font-sans">
              <div className="p-3.5 rounded-lg bg-[#101420] border border-neutral-700 border-l-4 border-l-portal-orange flex items-center gap-3 text-neutral-300">
                <Lock className="w-4 h-4 text-portal-orange shrink-0" />
                <span>
                  Welcome to Nexora! Please configure your sovereign health parameters. This data stays encrypted inside your local browser vault.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Full Legal Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-white focus:outline-none focus:border-portal-orange font-sans text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Date of Birth:</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-white focus:outline-none focus:border-portal-orange font-sans text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Biological Gender:</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-white focus:outline-none focus:border-portal-orange font-sans text-xs"
                  >
                    <option>Female</option>
                    <option>Male</option>
                    <option>Non-Binary / Other</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Blood Group:</label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-white focus:outline-none focus:border-portal-orange font-sans text-xs"
                  >
                    {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(bg => (
                      <option key={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-lg bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md font-mono flex items-center gap-2"
                >
                  <span>Proceed to Clinical Context</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CLINICAL CONTEXT & RESIDENCE */}
          {step === 2 && (
            <div className="space-y-5 text-xs font-sans">
              <div className="space-y-2">
                <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Medical Allergies:</label>
                <div className="flex flex-wrap gap-2">
                  {availableAllergies.map(alg => {
                    const isSelected = selectedAllergies.includes(alg)
                    return (
                      <button
                        key={alg}
                        type="button"
                        onClick={() => handleToggleAllergy(alg)}
                        className={`px-3 py-1.5 rounded-md border font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-portal-orange text-white border-portal-orange shadow-sm'
                            : 'bg-[#101420] border-neutral-700 text-neutral-300 hover:border-neutral-500'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        <span>{alg}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Chronic Conditions / Health Focus Areas:</label>
                <div className="flex flex-wrap gap-2">
                  {availableConditions.map(cnd => {
                    const isSelected = selectedConditions.includes(cnd)
                    return (
                      <button
                        key={cnd}
                        type="button"
                        onClick={() => handleToggleCondition(cnd)}
                        className={`px-3 py-1.5 rounded-md border font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-portal-orange text-white border-portal-orange shadow-sm'
                            : 'bg-[#101420] border-neutral-700 text-neutral-300 hover:border-neutral-500'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        <span>{cnd}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Residential Health District:</label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-white focus:outline-none focus:border-portal-orange font-sans text-xs"
                  >
                    <option>Metropolis Medical District (District 4)</option>
                    <option>Capital Health Zone (District 1)</option>
                    <option>High-Altitude Regional Sector (District 7)</option>
                    <option>Suburban Academic Network (District 3)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Emergency Contact:</label>
                  <input
                    type="text"
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-white focus:outline-none focus:border-portal-orange font-sans text-xs"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-lg text-xs font-mono font-bold text-neutral-400 hover:text-white"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-lg bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md font-mono flex items-center gap-2"
                >
                  <span>Proceed to Key Generation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CRYPTOGRAPHIC IDENTITY GENERATION */}
          {step === 3 && (
            <div className="space-y-5 text-xs font-sans">
              <div className="p-4 rounded-xl bg-[#101420] border border-neutral-700 border-l-4 border-l-portal-green space-y-2">
                <div className="flex items-center gap-2 text-portal-green font-mono font-bold text-sm">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Sovereign W3C DID & AES Keypair Derived</span>
                </div>
                <p className="text-neutral-300 text-xs leading-relaxed">
                  Your identity has been anchored with a zero-knowledge commitment. Your private key remains locked in client-side secure enclave memory.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#101420] border border-neutral-700 font-mono text-[11px] space-y-2 text-neutral-300">
                <div className="flex justify-between border-b border-neutral-700 pb-1.5">
                  <span className="text-neutral-400">Authenticated Citizen:</span>
                  <span className="text-white font-bold">{name}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-700 pb-1.5">
                  <span className="text-neutral-400">Decentralized Identifier (DID):</span>
                  <span className="text-portal-orange font-semibold select-all">{profile.did}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-700 pb-1.5">
                  <span className="text-neutral-400">Enclave Key Fingerprint:</span>
                  <span className="text-portal-green font-semibold">SHA256:4f8a92b...e01c</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Storage Architecture:</span>
                  <span className="text-white font-semibold">Decentralized Off-Chain IPFS + ZK Ledger</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-lg text-xs font-mono font-bold text-neutral-400 hover:text-white"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleFinish}
                  className="px-8 py-3.5 rounded-lg bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md font-mono flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Finalize & Enter Sovereign Portal</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
