'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Landmark, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Plus, 
  ArrowLeft, 
  Users, 
  FileCheck, 
  AlertCircle, 
  Clock, 
  Check 
} from 'lucide-react'
import { MOCK_GOV_SCHEMES, Scheme } from '@/lib/mockData'
import { SimulatedBadge } from '@/components/ui/SimulatedBadge'

interface ZkVerificationRequest {
  id: string
  maskedCitizenId: string
  schemeCode: string
  conditionChecked: string
  zkProofHash: string
  timestamp: string
  status: 'VERIFIED_VALID' | 'PROCESSING'
}

export default function GovernmentPortalPage() {
  const [schemes, setSchemes] = useState<Scheme[]>(MOCK_GOV_SCHEMES)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newSchemeCode, setNewSchemeCode] = useState('NX-GOV-ONCO-2026')
  const [newSchemeTitle, setNewSchemeTitle] = useState('Early Oncology Screening & Genomics Voucher')

  const [verificationRequests] = useState<ZkVerificationRequest[]>([
    {
      id: 'zk_req_9921',
      maskedCitizenId: 'did:nexora:pat:8f9a...31da (Elena R.)',
      schemeCode: 'NX-GOV-CARDIO-2026',
      conditionChecked: 'Income < $65,000 & Metropolis Resident',
      zkProofHash: 'zkSNARK:0x98f4a...e102',
      timestamp: '10:15:02 AM',
      status: 'VERIFIED_VALID'
    },
    {
      id: 'zk_req_9920',
      maskedCitizenId: 'did:nexora:pat:33c1...88b2 (Anonymous)',
      schemeCode: 'NX-GOV-METABOLIC-04',
      conditionChecked: 'Biomarker HbA1c > 6.4% Assertion',
      zkProofHash: 'zkSNARK:0x11a00...44b1',
      timestamp: '09:48:19 AM',
      status: 'VERIFIED_VALID'
    },
    {
      id: 'zk_req_9919',
      maskedCitizenId: 'did:nexora:pat:77e2...901f (Anonymous)',
      schemeCode: 'NX-GOV-PULM-12',
      conditionChecked: 'High-AQI Zone Residency & Income Bound',
      zkProofHash: 'zkSNARK:0x44c92...11d0',
      timestamp: '09:12:44 AM',
      status: 'VERIFIED_VALID'
    }
  ])

  const handleAddScheme = () => {
    const newSch: Scheme = {
      id: `sch_${Date.now()}`,
      code: newSchemeCode,
      title: newSchemeTitle,
      description: 'National precision genomics screening subsidy.',
      coverage: '100% molecular diagnostic coverage',
      eligibilityCriteria: ['Age > 40', 'Family Risk Stratification Assertion'],
      zkProofType: 'ZK-SNARK Clinical Assertion',
      status: 'Active',
      enrolledPatientsCount: 1
    }
    setSchemes([...schemes, newSch])
    setShowAddModal(false)
  }

  return (
    <div className="min-h-screen bg-[#0B0E17] text-white p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-xl bg-[#141826] border-2 border-[#1E3A8A] shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="text-xs font-mono font-bold text-portal-orange hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Patient View</span>
            </Link>
            <span className="text-neutral-500">•</span>
            <span className="text-xs font-mono font-bold text-portal-green">Government Directorate Enclave</span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
              National Health Scheme & Subsidy Gateway
            </h1>
            <SimulatedBadge />
          </div>

          <p className="text-xs font-sans text-neutral-300">
            Administer public healthcare grants. Citizen eligibility is validated instantly using Zero-Knowledge proofs without centralizing citizens' private financial documents.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => {
              const exportData = {
                issuer: 'National Health Directorate ZK Gateway',
                jurisdiction: 'Maharashtra National Health Authority',
                timestamp: new Date().toISOString(),
                activeSchemesCount: schemes.length,
                totalZkProofsProcessed: 48920,
                verificationSuccessRate: '99.8%',
                schemes: schemes.map(s => ({
                  code: s.code,
                  title: s.title,
                  coverage: s.coverage,
                  zkCircuit: s.zkProofType,
                  enrolledPatients: s.enrolledPatientsCount
                }))
              }
              const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'national-health-subsidy-report.json'
              a.click()
              URL.revokeObjectURL(url)
            }}
            className="px-4 py-3 rounded-lg bg-[#101420] hover:bg-[#182033] border border-neutral-700 text-portal-orange font-mono text-xs font-bold transition-all shadow-sm"
          >
            <span>Export Subsidy Report</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md font-mono"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Scheme</span>
          </button>
        </div>
      </div>

      {/* ZK ELIGIBILITY VERIFICATION REQUESTS QUEUE */}
      <div className="p-6 rounded-xl bg-[#141826] border border-neutral-700 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-neutral-700 pb-3">
          <div className="flex items-center gap-2 text-portal-green font-mono font-bold text-xs">
            <Lock className="w-4 h-4" />
            <span>Real-Time Zero-Knowledge Eligibility Verification Stream</span>
          </div>
          <span className="text-[10px] font-mono text-portal-green font-bold">Zero Private PHI or Tax Forms Received ✓</span>
        </div>

        <div className="space-y-3">
          {verificationRequests.map((req) => (
            <div
              key={req.id}
              className="p-4 rounded-lg bg-[#101420] border border-neutral-700 border-l-4 border-l-portal-green flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono shadow-sm"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-portal-orange font-bold">{req.schemeCode}</span>
                  <span className="text-neutral-400">• {req.maskedCitizenId}</span>
                </div>
                <div className="text-[11px] text-neutral-300 font-sans">
                  Condition Verified: <strong className="text-white font-mono">{req.conditionChecked}</strong>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right text-[11px] text-neutral-400">
                  <span>Proof: <span className="text-portal-green font-bold">{req.zkProofHash}</span></span>
                  <span className="block text-[10px]">{req.timestamp}</span>
                </div>

                <div className="px-3 py-1 rounded bg-portal-green/20 text-portal-green text-xs font-bold border border-portal-green/40 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Valid ✓</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ACTIVE SCHEMES MANAGEMENT */}
      <div className="p-6 rounded-xl bg-[#141826] border border-neutral-700 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-neutral-700 pb-3">
          <h2 className="font-display font-black text-base text-white">
            Active Healthcare Subsidy Programs
          </h2>
          <span className="text-xs font-mono text-portal-orange font-bold">{schemes.length} Schemes Published</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {schemes.map((scheme) => (
            <div key={scheme.id} className="p-5 rounded-lg bg-[#101420] border border-neutral-700 border-l-4 border-l-portal-orange space-y-3 flex flex-col justify-between shadow-md">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-portal-orange">{scheme.code}</span>
                  <span className="px-2 py-0.5 rounded bg-portal-green/20 text-[10px] font-mono font-bold text-portal-green border border-portal-green/40">
                    {scheme.status}
                  </span>
                </div>
                <h3 className="font-sans font-bold text-xs text-white">{scheme.title}</h3>
                <p className="text-[11px] font-sans text-neutral-300">{scheme.description}</p>
              </div>

              <div className="pt-2 border-t border-neutral-700/60 text-[10px] font-mono text-neutral-400 flex justify-between">
                <span>Beneficiaries:</span>
                <span className="text-portal-green font-bold">{scheme.enrolledPatientsCount.toLocaleString()} Citizens</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CREATE SCHEME MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#141826] border-2 border-[#1E3A8A] rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="font-display font-black text-base text-white">
              Publish New Health Subsidy Scheme
            </h3>
            <div className="space-y-3 text-xs font-sans">
              <div className="space-y-1">
                <label className="font-mono text-[10px] text-neutral-300 font-bold uppercase">Scheme Code:</label>
                <input
                  type="text"
                  value={newSchemeCode}
                  onChange={(e) => setNewSchemeCode(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-white font-mono text-xs focus:outline-none focus:border-portal-orange"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[10px] text-neutral-300 font-bold uppercase">Scheme Title:</label>
                <input
                  type="text"
                  value={newSchemeTitle}
                  onChange={(e) => setNewSchemeTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-white font-sans text-xs focus:outline-none focus:border-portal-orange"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2.5 rounded-lg text-xs font-mono font-bold text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleAddScheme}
                className="px-5 py-2.5 rounded-lg bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs font-mono uppercase tracking-wider shadow-md transition-all"
              >
                Publish Scheme On-Chain
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
