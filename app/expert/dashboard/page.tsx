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
import { UserButton } from '@clerk/nextjs'

export default function ExpertDashboardPage() {
  const [consultations] = useState([
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

  return (
    <div className="min-h-screen bg-[#070B16] text-slate-100 flex flex-col selection:bg-purple-500/25 selection:text-purple-400">
      
      <header className="sticky top-0 z-40 bg-[#0B152E]/90 backdrop-blur-xl border-b border-white/10 px-6 sm:px-10 py-3.5 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-6">
          <Link href="/expert/dashboard" className="flex items-center gap-3">
            <FarmerLogo size={32} showText={true} showBadge={false} subtitle="CERTIFIED AGRONOMY ADVISORY" />
          </Link>
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs font-mono">
            <Microscope className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-purple-200">Expert:</span>
            <span className="font-bold text-white">Dr. Vikrant Kadam, Ph.D. (Soil Science)</span>
            <span className="px-2 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold ml-1 text-[10px]">
              VERIFIED
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-sans font-semibold text-blue-100"
          >
            ← Portal Home
          </Link>
          <UserButton />
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-8">
        
        {/* KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-5 rounded-2xl bg-[#0B152E]/90 border border-white/10 space-y-1">
            <span className="text-blue-200/60 block">Consultations Resolved</span>
            <span className="font-display font-black text-3xl text-white block">142</span>
            <span className="text-emerald-400">Zero Yield Casualties</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#0B152E]/90 border border-white/10 space-y-1">
            <span className="text-blue-200/60 block">Inbound Questions</span>
            <span className="font-display font-black text-3xl text-purple-400 block">2 Queued</span>
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
          <h2 className="font-display font-bold text-lg text-white">Farmer Soil & Agronomic Consultations</h2>

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
                  <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200 text-xs font-sans">
                    <strong>Your Verified Prescription:</strong> {c.response}
                  </div>
                ) : (
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => alert('Consultation modal: Prescribe verified organic soil amendments.')}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-sans font-bold text-xs uppercase"
                    >
                      Prescribe Agronomic Advisory →
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  )
}
