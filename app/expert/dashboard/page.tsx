'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Microscope, 
  CheckCircle2, 
  FlaskConical, 
  Send, 
  Award, 
  ArrowLeft,
  FileText
} from 'lucide-react'
import { FarmerLogo } from '@/components/ui/FarmerLogo'
import { UserButton, useUser } from '@clerk/nextjs'
import { X, Sparkles, AlertCircle } from 'lucide-react'

export default function ExpertDashboardPage() {
  const { user } = useUser()
  const [consultations, setConsultations] = useState([
    {
      id: 'c-01',
      farmerName: 'Anandarao Patil',
      farm: 'Patil Krishi Farm (Field 02 — Soybean & Wheat)',
      question: 'How should I schedule liquid Jeevamrut application to optimize nodulation after chemical urea reduction?',
      soilHealthScore: 84.0,
      ph: 6.85,
      organicCarbon: '0.82%',
      status: 'ANSWERED',
      response: 'Apply 200 L/acre Jeevamrut at 21 days after sowing (vegetative surge). Avoid mixing with any copper-based fungicides.',
    },
    {
      id: 'c-02',
      farmerName: 'Rameshwar Pawar',
      farm: 'Pawar Agro, Daund',
      question: 'Soil report shows high pH (8.2) in canal command black cotton soil. Recommend reclamation strategy.',
      soilHealthScore: 61.0,
      ph: 8.2,
      organicCarbon: '0.51%',
      status: 'PENDING_REVIEW',
      response: '',
    },
  ])

  const [prescribingConsultation, setPrescribingConsultation] = useState<any>(null)
  const [prescriptionText, setPrescriptionText] = useState('')
  const [selectedInputs, setSelectedInputs] = useState<string[]>([])
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const organicInputsOptions = [
    'Agricultural Gypsum (50 kg/acre)',
    'Liquid Jeevamrut (200 L/acre)',
    'Decomposed Farmyard Manure (FYM)',
    'Trichoderma viride Bio-Fungicide',
    'Neem Cake Extract',
    'Green Manuring with Dhaincha (Sesbania)',
  ]

  const toggleInput = (item: string) => {
    if (selectedInputs.includes(item)) {
      setSelectedInputs(selectedInputs.filter(i => i !== item))
    } else {
      setSelectedInputs([...selectedInputs, item])
    }
  }

  const handleOpenPrescribe = (c: any) => {
    setPrescribingConsultation(c)
    setPrescriptionText(
      c.id === 'c-02' 
        ? 'Apply agricultural gypsum at 50 kg/acre with deep irrigation. Incorporate green manuring with Dhaincha (Sesbania) to reduce sodicity and lower soil pH toward 7.2.'
        : ''
    )
    setSelectedInputs(
      c.id === 'c-02'
        ? ['Agricultural Gypsum (50 kg/acre)', 'Green Manuring with Dhaincha (Sesbania)']
        : []
    )
  }

  const handleSubmitPrescription = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prescribingConsultation) return

    const combinedResponse = selectedInputs.length > 0
      ? `${prescriptionText.trim()} Recommended biological inputs: ${selectedInputs.join(', ')}.`
      : prescriptionText.trim()

    setConsultations(
      consultations.map(c => 
        c.id === prescribingConsultation.id
          ? { ...c, status: 'ANSWERED', response: combinedResponse }
          : c
      )
    )

    const targetFarmer = prescribingConsultation.farmerName
    setPrescribingConsultation(null)
    setPrescriptionText('')
    setSelectedInputs([])
    setToastMessage(`Prescription successfully certified and dispatched to ${targetFarmer}.`)
    setTimeout(() => setToastMessage(null), 5000)
  }

  return (
    <div className="min-h-screen bg-[#070B16] text-slate-100 flex flex-col selection:bg-purple-500/25 selection:text-purple-400 relative">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-[#0F1D3F] border border-emerald-500/40 text-emerald-300 shadow-2xl flex items-center gap-3 text-xs font-mono animate-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white ml-2">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-[#0B152E]/90 backdrop-blur-xl border-b border-white/10 px-6 sm:px-10 py-3.5 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-6">
          <Link href="/expert/dashboard" className="flex items-center gap-3">
            <FarmerLogo size={32} showText={true} showBadge={false} subtitle="CERTIFIED AGRONOMY ADVISORY" />
          </Link>
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs font-mono">
            <Microscope className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-purple-200">Expert:</span>
            <span className="font-bold text-white">
              {user?.fullName ? `Dr. ${user.fullName}` : 'Dr. Vikrant Kadam, Ph.D.'} (Soil Science)
            </span>
            <span className="px-2 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold ml-1 text-[10px]">
              VERIFIED
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-sans font-semibold text-blue-100"
          >
            ← Home
          </Link>

          {/* Verified Role Indicator */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-300">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="font-bold">Expert Advisory</span>
          </div>

          <UserButton 
            appearance={{
              elements: {
                userButtonAvatarBox: 'w-8 h-8 rounded-xl border border-purple-500/40 shadow-sm',
              }
            }}
          />
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-8">
        
        {/* KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-5 rounded-2xl bg-[#0B152E]/90 border border-white/10 space-y-1">
            <span className="text-blue-200/60 block">Consultations Resolved</span>
            <span className="font-display font-black text-3xl text-white block">
              {142 + consultations.filter(c => c.status === 'ANSWERED').length - 1}
            </span>
            <span className="text-emerald-400">Zero Yield Casualties</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#0B152E]/90 border border-white/10 space-y-1">
            <span className="text-blue-200/60 block">Inbound Questions</span>
            <span className="font-display font-black text-3xl text-purple-400 block">
              {consultations.filter(c => c.status === 'PENDING_REVIEW').length} Queued
            </span>
            <span className="text-blue-300">Soil Diagnostics</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#0B152E]/90 border border-white/10 space-y-1">
            <span className="text-blue-200/60 block">Organic Plans Audited</span>
            <span className="font-display font-black text-3xl text-white block">28 Farms</span>
            <span className="text-emerald-400">NPOP Compliant</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#0B152E]/90 border border-white/10 space-y-1">
            <span className="text-blue-200/60 block">Accreditation State</span>
            <span className="font-display font-black text-3xl text-emerald-400 block">Active</span>
            <span className="text-blue-200">MPKV Rahuri Verified</span>
          </div>
        </div>

        {/* Consultations List */}
        <div className="p-6 rounded-2xl bg-[#0B152E]/90 border border-white/10 backdrop-blur-xl shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-lg text-white">Farmer Soil & Agronomic Consultations</h2>
            <span className="text-xs font-mono text-purple-300">Certified by Indian Council of Agricultural Research</span>
          </div>

          <div className="space-y-4">
            {consultations.map((c) => (
              <div
                key={c.id}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3 text-xs font-mono"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-bold text-white text-base font-sans block">{c.farmerName}</span>
                    <span className="text-blue-300/70">{c.farm}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-400 font-bold">Soil: {c.soilHealthScore}/100 (pH {c.ph}, OC {c.organicCarbon})</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      c.status === 'ANSWERED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {c.status}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0B142A] border border-white/5 text-blue-100 text-xs font-sans">
                  <strong>Farmer Question:</strong> "{c.question}"
                </div>

                {c.response ? (
                  <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200 text-xs font-sans flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong>Your Verified Prescription:</strong> {c.response}
                    </div>
                  </div>
                ) : (
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => handleOpenPrescribe(c)}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-sans font-bold text-xs uppercase transition-all shadow-md shadow-purple-950/40 flex items-center gap-2 active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                      <span>Prescribe Agronomic Advisory →</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Interactive Prescription Advisory Modal */}
      {prescribingConsultation && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-xl w-full rounded-2xl bg-[#0D193B] border border-purple-500/40 p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="font-display font-bold text-lg text-white">Prescribe Agronomic Advisory</h3>
                <span className="text-xs font-mono text-purple-300">
                  Farmer: {prescribingConsultation.farmerName} • Soil pH: {prescribingConsultation.ph}
                </span>
              </div>
              <button
                onClick={() => setPrescribingConsultation(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-blue-200 font-sans">
              <strong>Question:</strong> "{prescribingConsultation.question}"
            </div>

            <form onSubmit={handleSubmitPrescription} className="space-y-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold block">Scientific Agronomic Advice / Prescription:</label>
                <textarea
                  rows={3}
                  value={prescriptionText}
                  onChange={(e) => setPrescriptionText(e.target.value)}
                  placeholder="Provide precise dosage, soil amendment schedule, and preventive protocol..."
                  required
                  className="w-full p-3 rounded-xl bg-[#081126] border border-white/10 text-white text-xs font-sans focus:outline-none focus:border-purple-400 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-slate-300 font-bold block">Quick-Select Recommended Organic Inputs:</label>
                <div className="flex flex-wrap gap-2">
                  {organicInputsOptions.map((item) => {
                    const isSelected = selectedInputs.includes(item)
                    return (
                      <button
                        type="button"
                        key={item}
                        onClick={() => toggleInput(item)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all border ${
                          isSelected
                            ? 'bg-purple-500/20 text-purple-300 border-purple-500/60 font-bold'
                            : 'bg-white/[0.02] text-slate-400 border-white/10 hover:border-white/20'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '} {item}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setPrescribingConsultation(null)}
                  className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 text-xs font-sans"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-purple-950/50 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Certify & Dispatch Advisory</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
