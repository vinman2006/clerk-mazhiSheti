'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  ShieldCheck, 
  Lock, 
  Plus, 
  ArrowLeft, 
  Download 
} from 'lucide-react'
import { SimulatedBadge } from '@/components/ui/SimulatedBadge'

interface DatasetRequest {
  id: string
  title: string
  scope: string
  anonymizationMethod: string
  approvedCohortSize: number
  validUntil: string
  status: 'Approved' | 'Under Review' | 'Active'
  txProof: string
}

export default function ResearchPortalPage() {
  const [requests, setRequests] = useState<DatasetRequest[]>([
    {
      id: 'dset_req_01',
      title: 'Multicenter Cardiovascular Telemetry & Microvascular Angina Cohort',
      scope: 'De-identified ECG metrics, lipid profiles, and age brackets (50-70)',
      anonymizationMethod: 'k-Anonymity (k=50) + Differential Privacy (ε=0.5)',
      approvedCohortSize: 14200,
      validUntil: 'Nov 30, 2026',
      status: 'Approved',
      txProof: '0x39f0184...b920'
    },
    {
      id: 'dset_req_02',
      title: 'Neuro-Inflammatory Biomarker & Migraine Genomics Study',
      scope: 'Anonymized chromosome 4 & 9 variant frequencies',
      anonymizationMethod: 'Zero-Knowledge Aggregate Queries (ZK-PIR)',
      approvedCohortSize: 8400,
      validUntil: 'Dec 15, 2026',
      status: 'Active',
      txProof: '0x8841029...77a1'
    }
  ])

  const [showModal, setShowModal] = useState(false)
  const [newTitle, setNewTitle] = useState('Type 2 Diabetes Continuous Glucose Response Study')
  const [newScope, setNewScope] = useState('Hourly glucose telemetry logs with masked patient IDs')

  const handleCreateRequest = () => {
    const newReq: DatasetRequest = {
      id: `dset_req_${Date.now()}`,
      title: newTitle,
      scope: newScope,
      anonymizationMethod: 'k-Anonymity (k=50) + Local Enclave Attestation',
      approvedCohortSize: 6200,
      validUntil: 'Jan 31, 2027',
      status: 'Under Review',
      txProof: '0x71a992...c011'
    }
    setRequests([...requests, newReq])
    setShowModal(false)
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
            <span className="text-xs font-bold text-[#7C3AED]">Academic Research Enclave</span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="font-extrabold text-2xl sm:text-3xl text-[#0B3D91]">
              Anonymized Research & ZK Cohort Queries (संशोधन डेटा पोर्टल)
            </h1>
            <SimulatedBadge />
          </div>

          <p className="text-xs text-[#4B5563]">
            National Biomedical Research Consortium • Sovereign research access governed by smart contract consent and differential privacy.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#1E7A34] hover:bg-[#145524] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Request New Dataset Access</span>
        </button>
      </div>

      {/* DATASET REQUESTS LIST */}
      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="p-6 rounded-lg bg-white border border-[#E0E0E0] border-t-4 border-t-[#0B3D91] hover:shadow-md transition-all space-y-4 shadow-sm"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
                    {req.status} ✓
                  </span>
                  <h3 className="font-bold text-base text-[#0B3D91]">
                    {req.title}
                  </h3>
                </div>
                <p className="text-xs text-[#4B5563]">
                  Scope: {req.scope}
                </p>
              </div>

              <div className="p-3 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-right text-xs shrink-0">
                <span className="text-neutral-500 block text-[10px]">Approved Cohort:</span>
                <span className="text-[#0B3D91] font-bold">{req.approvedCohortSize.toLocaleString()} Citizens</span>
              </div>
            </div>

            {/* Privacy & ZK guarantees */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3.5 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-xs">
              <div className="flex items-center gap-2 text-neutral-700">
                <ShieldCheck className="w-4 h-4 text-[#1E7A34] shrink-0" />
                <span>Privacy Standard: <strong className="text-[#1A1A1A]">{req.anonymizationMethod}</strong></span>
              </div>

              <div className="flex items-center justify-between text-neutral-500 font-mono text-[11px]">
                <span>Valid Until: <span className="text-[#1A1A1A] font-semibold">{req.validUntil}</span></span>
                <span>Tx: <span className="text-[#1E7A34] font-bold">{req.txProof}</span></span>
              </div>
            </div>

            {req.status === 'Approved' && (
              <div className="pt-1 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    const header = 'Cohort_ID,Age_Bracket,Gender_Code,Cardiac_Telemetry_Avg_BPM,Systolic_BP,HbA1c_Percentage,Diff_Privacy_Noise_Epsilon\n'
                    const sampleRows = Array.from({ length: 15 }, (_, i) => 
                      `"COHORT_${1000 + i}","55-65","${i % 2 === 0 ? 'F' : 'M'}",${72 + (i % 10)},${120 + (i % 20)},${5.6 + (i * 0.1).toFixed(1)},0.5`
                    ).join('\n')
                    const blob = new Blob([header + sampleRows], { type: 'text/csv' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = `de-identified-cohort-${req.id}.csv`
                    a.click()
                    URL.revokeObjectURL(url)
                  }}
                  className="px-4 py-2 rounded bg-white hover:bg-neutral-50 border border-[#CBD5E1] text-[#0B3D91] text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download De-Identified Dataset (.csv)</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* REQUEST DATASET MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-[#E0E0E0] rounded-lg p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-[#0B3D91]">
              Submit Anonymized Cohort Query Request
            </h3>
            <div className="space-y-3 text-xs font-sans">
              <div className="space-y-1">
                <label className="text-[10px] text-[#1A1A1A] font-bold uppercase block">Research Study Title:</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] text-xs focus:outline-none focus:bg-white focus:border-[#0B3D91]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-[#1A1A1A] font-bold uppercase block">Requested Data Scope:</label>
                <textarea
                  rows={3}
                  value={newScope}
                  onChange={(e) => setNewScope(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] text-xs focus:outline-none focus:bg-white focus:border-[#0B3D91]"
                />
              </div>

              <div className="p-3 rounded bg-purple-50/50 border border-purple-200 text-[10px] text-purple-900 space-y-1">
                <div className="text-purple-700 font-bold flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>ZK-Differential Privacy Enforced</span>
                </div>
                <p className="text-neutral-600">
                  Cohort requests require zero raw clinical data export. Only anonymized aggregations satisfying k-anonymity=50 will be returned.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded text-xs font-bold text-neutral-500 hover:text-neutral-900"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRequest}
                className="px-5 py-2 rounded bg-[#1E7A34] hover:bg-[#145524] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                Submit for Smart Consent Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
