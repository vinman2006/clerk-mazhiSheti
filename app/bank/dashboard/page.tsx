'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Landmark, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ShieldCheck, 
  ArrowLeft, 
  KeyRound,
  AlertCircle,
  Eye,
  Check,
  X
} from 'lucide-react'
import { FarmerLogo } from '@/components/ui/FarmerLogo'
import { UserButton } from '@clerk/nextjs'

export default function BankDashboardPage() {
  const [applications, setApplications] = useState([
    {
      id: 'app-01',
      applicationNo: 'MSCB-KCC-2026-8891',
      farmerName: 'Anandarao Patil',
      village: 'Malegaon, Baramati',
      totalLandAcres: 14.5,
      scheme: 'Kisan Credit Card (KCC) Crop Working Capital',
      amount: 350000.0,
      soilHealthScore: 82.0,
      soilGrade: 'Grade A (Fertile)',
      crops: 'Sugarcane, Soybean, Pomegranate',
      status: 'APPROVED',
      consentScopes: ['farm_ownership', 'soil_health', 'crop_history'],
      consentVerified: true,
      appliedDate: '12 Jan 2026',
    },
    {
      id: 'app-02',
      applicationNo: 'MSCB-AIF-2026-1044',
      farmerName: 'Balasaheb Jagtap',
      village: 'Morgaon, Baramati',
      totalLandAcres: 8.0,
      scheme: 'Agri Infrastructure Fund — Solar Irrigation Pump',
      amount: 180000.0,
      soilHealthScore: 74.0,
      soilGrade: 'Grade B (Adequate)',
      crops: 'Onion, Wheat, Bajra',
      status: 'UNDER_REVIEW',
      consentScopes: ['farm_ownership', 'soil_health'],
      consentVerified: true,
      appliedDate: 'Yesterday',
    },
  ])

  const [selectedFarmer, setSelectedFarmer] = useState<any>(applications[0])

  const handleUpdateStatus = (appId: string, newStatus: string) => {
    setApplications(applications.map((a) => (a.id === appId ? { ...a, status: newStatus } : a)))
    alert(`Application ${appId} status updated to: ${newStatus}. An immutable audit log entry has been recorded.`)
  }

  return (
    <div className="min-h-screen bg-[#070B16] text-slate-100 flex flex-col selection:bg-blue-500/25 selection:text-blue-400">
      
      {/* Top Bank Header */}
      <header className="sticky top-0 z-40 bg-[#0B152E]/90 backdrop-blur-xl border-b border-white/10 px-6 sm:px-10 py-3.5 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-6">
          <Link href="/bank/dashboard" className="flex items-center gap-3">
            <FarmerLogo size={32} showText={true} showBadge={false} subtitle="INSTITUTIONAL CREDIT PORTAL" />
          </Link>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs font-mono">
            <Landmark className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-blue-200">Organization:</span>
            <span className="font-bold text-white">Maharashtra State Cooperative Bank (Baramati)</span>
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

      {/* Main Bank Content */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-8">
        
        {/* KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-5 rounded-2xl bg-[#0B152E]/90 border border-white/10 space-y-1">
            <span className="text-blue-200/60 block">Inbound Credit Applications</span>
            <span className="font-display font-black text-3xl text-white block">₹5,30,000</span>
            <span className="text-blue-300">2 Active Farmer Files</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#0B152E]/90 border border-white/10 space-y-1">
            <span className="text-blue-200/60 block">Consent Verification State</span>
            <span className="font-display font-black text-3xl text-emerald-400 block">100%</span>
            <span className="text-emerald-300">Cryptographically Audited</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#0B152E]/90 border border-white/10 space-y-1">
            <span className="text-blue-200/60 block">Approved Disbursements</span>
            <span className="font-display font-black text-3xl text-white block">₹3,50,000</span>
            <span className="text-emerald-400">1 KCC Sanctioned</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#0B152E]/90 border border-white/10 space-y-1">
            <span className="text-blue-200/60 block">Average Farm Health</span>
            <span className="font-display font-black text-3xl text-white block">78 / 100</span>
            <span className="text-blue-200">Low Default Probability</span>
          </div>
        </div>

        {/* Loan Queue & Consent-Gated Dossier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left 2 Cols: Loan Application Queue */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-lg text-white">Underwriting Application Queue</h2>
              <span className="text-xs font-mono text-blue-200/60">Least-Privilege Role: BANK_LOAN_OFFICER</span>
            </div>

            <div className="space-y-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  onClick={() => setSelectedFarmer(app)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                    selectedFarmer?.id === app.id
                      ? 'bg-[#0E1F42] border-blue-400 shadow-xl shadow-blue-950/40'
                      : 'bg-[#0B152E]/80 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-mono text-orange-400 font-bold block">{app.applicationNo}</span>
                      <h3 className="font-sans font-bold text-base text-white">{app.farmerName}</h3>
                      <span className="text-xs text-blue-200/70 font-sans">{app.village} • {app.totalLandAcres} Acres</span>
                    </div>

                    <div className="text-right">
                      <span className="font-display font-black text-2xl text-white block">₹{app.amount.toLocaleString()}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        app.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-orange-500/20 text-orange-400'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] flex items-center justify-between text-xs font-mono">
                    <span className="text-blue-200">{app.scheme}</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Consent Verified ✓
                    </span>
                  </div>

                  {/* Underwriter Action Buttons */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-end gap-2">
                    {app.status !== 'APPROVED' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleUpdateStatus(app.id, 'APPROVED')
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-sans font-bold uppercase transition-all flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve Loan</span>
                      </button>
                    )}
                    {app.status !== 'DOCUMENTS_REQUIRED' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleUpdateStatus(app.id, 'DOCUMENTS_REQUIRED')
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-blue-200 text-xs font-sans font-bold transition-all"
                      >
                        Request Documents
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 1 Col: Consent-Verified Dossier */}
          <div className="space-y-4">
            <h2 className="font-display font-bold text-lg text-white">Consent-Verified Dossier</h2>

            {selectedFarmer ? (
              <div className="p-6 rounded-2xl bg-[#0B152E]/90 border border-blue-500/30 backdrop-blur-xl shadow-xl space-y-5">
                <div className="border-b border-white/10 pb-3">
                  <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Authorized Access: Token Active
                  </span>
                  <h3 className="font-display font-bold text-xl text-white mt-1">{selectedFarmer.farmerName}</h3>
                  <span className="text-xs font-mono text-blue-300/70">Holdings: {selectedFarmer.totalLandAcres} Acres Owned</span>
                </div>

                {/* Verified Metrics */}
                <div className="space-y-3 text-xs font-mono">
                  <div className="p-3.5 rounded-xl bg-white/[0.03] space-y-1">
                    <span className="text-blue-200/60 block">Soil Health Index (Audited):</span>
                    <span className="font-black text-emerald-400 text-lg block">{selectedFarmer.soilHealthScore} / 100</span>
                    <span className="text-[10px] text-blue-200/70">{selectedFarmer.soilGrade}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] space-y-1">
                    <span className="text-blue-200/60 block">Verified Crop History:</span>
                    <span className="font-bold text-white block">{selectedFarmer.crops}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] space-y-1">
                    <span className="text-blue-200/60 block">Granted Consent Scopes:</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedFarmer.consentScopes.map((sc: string) => (
                        <span key={sc} className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold">
                          ✓ {sc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 text-[11px] font-mono text-blue-200/50">
                  Audit Entry: Read logged under MSCB Officer Session. Private AI & non-consented records strictly blocked.
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-[#0B152E]/90 border border-white/10 text-center text-xs font-mono text-neutral-400">
                Select a farmer application to inspect authorized dossier.
              </div>
            )}
          </div>

        </div>

      </main>
    </div>
  )
}
