'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Landmark, 
  ShieldCheck, 
  Lock, 
  Plus, 
  ArrowLeft, 
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
      maskedCitizenId: 'did:nexora:pat:8f9a...31da (A. Sharma)',
      schemeCode: 'NX-GOV-CARDIO-2026',
      conditionChecked: 'Income < ₹5,00,000 & Maharashtra Resident',
      zkProofHash: 'zkSNARK:0x98f4a...e102',
      timestamp: '10:15:02 AM',
      status: 'VERIFIED_VALID'
    },
    {
      id: 'zk_req_9920',
      maskedCitizenId: 'did:nexora:pat:33c1...88b2 (Anonymous Citizen)',
      schemeCode: 'NX-GOV-METABOLIC-04',
      conditionChecked: 'Biomarker HbA1c > 6.4% Assertion',
      zkProofHash: 'zkSNARK:0x11a00...44b1',
      timestamp: '09:48:19 AM',
      status: 'VERIFIED_VALID'
    },
    {
      id: 'zk_req_9919',
      maskedCitizenId: 'did:nexora:pat:77e2...901f (Anonymous Citizen)',
      schemeCode: 'NX-GOV-PULM-12',
      conditionChecked: 'Nagpur Municipal Zone Residency & Income Bound',
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
    <div className="min-h-screen bg-[#F4F6F9] text-[#1A1A1A] p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-lg bg-white border border-[#E0E0E0] border-l-4 border-l-[#0B3D91] shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="text-xs font-bold text-[#0B3D91] hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Citizen View</span>
            </Link>
            <span className="text-neutral-400">•</span>
            <span className="text-xs font-bold text-[#1E7A34]">Government Directorate Enclave</span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="font-extrabold text-2xl sm:text-3xl text-[#0B3D91]">
              National Health Scheme & Subsidy Gateway (सरकारी अनुदान प्रणाली)
            </h1>
            <SimulatedBadge />
          </div>

          <p className="text-xs text-[#4B5563]">
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
            className="px-4 py-2.5 rounded bg-white hover:bg-neutral-50 border border-[#0B3D91] text-[#0B3D91] text-xs font-bold transition-all shadow-sm"
          >
            <span>Export Subsidy Report</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#1E7A34] hover:bg-[#145524] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Scheme</span>
          </button>
        </div>
      </div>

      {/* ZK ELIGIBILITY VERIFICATION REQUESTS QUEUE */}
      <div className="p-6 rounded-lg bg-white border border-[#E0E0E0] space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-2 text-[#0B3D91] font-bold text-xs">
            <Lock className="w-4 h-4 text-[#F5821F]" />
            <span>Real-Time Zero-Knowledge Eligibility Verification Stream</span>
          </div>
          <span className="text-[10px] text-[#1E7A34] font-bold">Zero Private PHI or Tax Forms Received ✓</span>
        </div>

        <div className="space-y-3">
          {verificationRequests.map((req) => (
            <div
              key={req.id}
              className="p-4 rounded bg-[#F8FAFC] border border-[#CBD5E1] border-l-4 border-l-[#1E7A34] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs shadow-sm"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[#D66D10] font-bold font-mono">{req.schemeCode}</span>
                  <span className="text-neutral-500">• {req.maskedCitizenId}</span>
                </div>
                <div className="text-[11px] text-[#4B5563]">
                  Condition Verified: <strong className="text-[#1A1A1A]">{req.conditionChecked}</strong>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right text-[11px] text-neutral-500 font-mono">
                  <span>Proof: <span className="text-[#1E7A34] font-bold">{req.zkProofHash}</span></span>
                  <span className="block text-[10px]">{req.timestamp}</span>
                </div>

                <div className="px-3 py-1 rounded bg-green-100 text-[#1E7A34] text-xs font-bold border border-green-300 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Valid ✓</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ACTIVE SCHEMES MANAGEMENT */}
      <div className="p-6 rounded-lg bg-white border border-[#E0E0E0] space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <h2 className="font-bold text-base text-[#0B3D91]">
            Active Healthcare Subsidy Programs (सक्रिय आरोग्य योजना)
          </h2>
          <span className="text-xs text-[#D66D10] font-bold">{schemes.length} Schemes Published</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {schemes.map((scheme) => (
            <div key={scheme.id} className="p-5 rounded bg-[#F8FAFC] border border-[#CBD5E1] border-t-4 border-t-[#0B3D91] space-y-3 flex flex-col justify-between shadow-sm">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#D66D10] font-mono">{scheme.code}</span>
                  <span className="px-2 py-0.5 rounded bg-green-100 text-[10px] font-bold text-[#1E7A34] border border-green-200">
                    {scheme.status}
                  </span>
                </div>
                <h3 className="font-bold text-xs text-[#0B3D91]">{scheme.title}</h3>
                <p className="text-[11px] text-[#4B5563]">{scheme.description}</p>
              </div>

              <div className="pt-2 border-t border-neutral-200 text-[10px] text-neutral-500 flex justify-between">
                <span>Beneficiaries:</span>
                <span className="text-[#1E7A34] font-bold">{scheme.enrolledPatientsCount.toLocaleString()} Citizens</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CREATE SCHEME MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-[#E0E0E0] rounded-lg p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-[#0B3D91]">
              Publish New Health Subsidy Scheme
            </h3>
            <div className="space-y-3 text-xs font-sans">
              <div className="space-y-1">
                <label className="text-[10px] text-[#1A1A1A] font-bold uppercase block">Scheme Code:</label>
                <input
                  type="text"
                  value={newSchemeCode}
                  onChange={(e) => setNewSchemeCode(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] font-mono text-xs focus:outline-none focus:bg-white focus:border-[#0B3D91]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-[#1A1A1A] font-bold uppercase block">Scheme Title:</label>
                <input
                  type="text"
                  value={newSchemeTitle}
                  onChange={(e) => setNewSchemeTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] text-xs focus:outline-none focus:bg-white focus:border-[#0B3D91]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded text-xs font-bold text-neutral-500 hover:text-neutral-900"
              >
                Cancel
              </button>
              <button
                onClick={handleAddScheme}
                className="px-5 py-2 rounded bg-[#1E7A34] hover:bg-[#145524] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
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
