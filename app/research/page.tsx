'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Microscope, 
  ShieldCheck, 
  Lock, 
  Database, 
  CheckCircle2, 
  Plus, 
  ArrowLeft, 
  FileText, 
  KeyRound, 
  Download, 
  AlertCircle 
} from 'lucide-react'
import { SimulatedBadge } from '@/components/ui/SimulatedBadge'
import { VerifiedBadge } from '@/components/ui/VerifiedBadge'

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
            <span className="text-xs font-mono font-bold text-purple-300">Researcher Enclave</span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
              Anonymized Research & ZK Cohort Queries
            </h1>
            <SimulatedBadge />
          </div>

          <p className="text-xs font-sans text-neutral-300">
            BioGen Institute • Sovereign research access governed by smart contract consent and differential privacy.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs uppercase tracking-wider font-mono shadow-md transition-all"
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
            className="p-6 rounded-xl bg-[#141826] border border-neutral-700 border-l-4 border-l-purple-500 hover:border-neutral-600 transition-all space-y-4 shadow-lg"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300 text-xs font-mono font-bold border border-purple-500/40">
                    {req.status} ✓
                  </span>
                  <h3 className="font-display font-bold text-base text-white">
                    {req.title}
                  </h3>
                </div>
                <p className="text-xs font-sans text-neutral-300">
                  Scope: {req.scope}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#101420] border border-neutral-700 text-right font-mono text-xs shrink-0">
                <span className="text-neutral-400 block text-[10px]">Approved Cohort:</span>
                <span className="text-purple-300 font-bold">{req.approvedCohortSize.toLocaleString()} Patients</span>
              </div>
            </div>

            {/* Privacy & ZK guarantees */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3.5 rounded-lg bg-[#101420] border border-neutral-700 text-xs font-mono">
              <div className="flex items-center gap-2 text-neutral-300">
                <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Privacy: <strong className="text-white font-sans">{req.anonymizationMethod}</strong></span>
              </div>

              <div className="flex items-center justify-between text-neutral-400">
                <span>Valid Until: <span className="text-white font-semibold">{req.validUntil}</span></span>
                <span>Tx: <span className="text-portal-green font-bold">{req.txProof}</span></span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* REQUEST DATASET MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#141826] border-2 border-[#1E3A8A] rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="font-display font-black text-base text-white">
              Submit Anonymized Cohort Query Request
            </h3>
            <div className="space-y-3 text-xs font-sans">
              <div className="space-y-1">
                <label className="font-mono text-[10px] text-neutral-300 font-bold uppercase">Research Study Title:</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-white text-xs focus:outline-none focus:border-portal-orange"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[10px] text-neutral-300 font-bold uppercase">Requested Data Scope:</label>
                <textarea
                  rows={3}
                  value={newScope}
                  onChange={(e) => setNewScope(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-white text-xs focus:outline-none focus:border-portal-orange"
                />
              </div>

              <div className="p-3.5 rounded-lg bg-[#101420] border border-neutral-700 font-mono text-[10px] text-neutral-400 space-y-1">
                <div className="text-purple-300 font-bold flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>ZK-Differential Privacy Enforced</span>
                </div>
                <p className="text-neutral-300">
                  Cohort requests require zero raw PHI export. Only anonymized aggregations satisfying k-anonymity=50 will be returned.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2.5 rounded-lg text-xs font-mono font-bold text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRequest}
                className="px-5 py-2.5 rounded-lg bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs uppercase tracking-wider font-mono shadow-md transition-all"
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
