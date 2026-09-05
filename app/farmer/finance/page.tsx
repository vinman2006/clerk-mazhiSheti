'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Landmark, 
  ShieldCheck, 
  Plus, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  X, 
  Clock, 
  HelpCircle,
  Eye,
  KeyRound
} from 'lucide-react'

export default function FarmerFinancePage() {
  const [loans, setLoans] = useState([
    {
      id: 'l1',
      applicationNo: 'MSCB-KCC-2026-8891',
      bankName: 'Maharashtra State Cooperative Bank (Baramati Branch)',
      schemeName: 'Kisan Credit Card (KCC) Crop Working Capital',
      amountRequested: 350000.0,
      tenureMonths: 36,
      status: 'APPROVED',
      appliedDate: '12 Jan 2026',
      notes: 'Sanctioned at 4.0% subsidized interest with prompt repayment incentive.',
    },
    {
      id: 'l2',
      applicationNo: 'SBI-AGRI-INFRA-2026-041',
      bankName: 'State Bank of India (Agri Division)',
      schemeName: 'Agri Infrastructure Fund — Solar Irrigation Pump',
      amountRequested: 180000.0,
      tenureMonths: 60,
      status: 'UNDER_REVIEW',
      appliedDate: '28 Aug 2026',
      notes: 'Farm GPS coordinates & 14.5 acre land records verification in progress.',
    },
  ])

  const [consents, setConsents] = useState([
    {
      id: 'cs-01',
      bankName: 'Maharashtra State Cooperative Bank',
      purpose: 'Credit Underwriting & Farm Verification',
      scopes: ['farm_ownership', 'soil_health', 'crop_history'],
      status: 'ACTIVE',
      grantedAt: '12 Jan 2026',
      expiresAt: '12 Jan 2027',
    },
  ])

  const [showLoanModal, setShowLoanModal] = useState(false)
  const [loanScheme, setLoanScheme] = useState('Kisan Credit Card (KCC)')
  const [loanAmount, setLoanAmount] = useState('250000')
  const [loanPurpose, setLoanPurpose] = useState('Purchase of organic manure and certified seeds')

  const handleApplyLoan = (e: React.FormEvent) => {
    e.preventDefault()
    const newL = {
      id: `l-${Date.now()}`,
      applicationNo: `MSCB-KCC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      bankName: 'Maharashtra State Cooperative Bank',
      schemeName: loanScheme,
      amountRequested: parseFloat(loanAmount) || 200000,
      tenureMonths: 36,
      status: 'SUBMITTED',
      appliedDate: 'Today',
      notes: 'Application queued for loan officer review.',
    }
    setLoans([newL, ...loans])
    setShowLoanModal(false)
    alert('Loan Application Submitted! The bank officer will review your application along with your consent-authorized farm dossier.')
  }

  const handleRevokeConsent = (id: string) => {
    setConsents(consents.map((c) => (c.id === id ? { ...c, status: 'REVOKED' } : c)))
    alert('Consent Revoked: The bank no longer has permission to access your farm records.')
  }

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold">
            <Landmark className="w-3.5 h-3.5" />
            <span>FINANCIAL SERVICES & CONSENT BOUNDARIES</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            Farm Credit & Bank Access Manager
          </h1>
          <p className="text-xs sm:text-sm font-sans text-blue-200/70">
            Access subsidized credit while maintaining complete cryptographic ownership over your farm records
          </p>
        </div>

        <button
          onClick={() => setShowLoanModal(true)}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-blue-950/50 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Apply for Agri Credit</span>
        </button>
      </div>

      {/* FARMER CONSENT MANAGER (Section 26 & 64) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0B152E]/90 border border-emerald-500/30 backdrop-blur-2xl shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">Farmer Data Consent Controller</h2>
              <p className="text-xs font-sans text-blue-200/70">Banks cannot see your farm records without explicit permission. You can revoke access at any time.</p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            Zero Data Leak Protocol
          </span>
        </div>

        <div className="space-y-4">
          {consents.map((cs) => (
            <div
              key={cs.id}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4 text-xs font-mono"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-white text-sm font-sans block">{cs.bankName}</span>
                  <span className="text-blue-300/70">Purpose: {cs.purpose}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    cs.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {cs.status}
                  </span>
                  {cs.status === 'ACTIVE' && (
                    <button
                      onClick={() => handleRevokeConsent(cs.id)}
                      className="px-3 py-1 rounded-lg bg-red-500/15 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 transition-all font-bold"
                    >
                      Revoke Access
                    </button>
                  )}
                </div>
              </div>

              {/* Scopes Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/5">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Farm Ownership (14.5A)</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Soil Health Score (82)</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Crop History (Sugarcane/Soy)</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-500 line-through">
                  <X className="w-3.5 h-3.5 text-red-400" />
                  <span>Private AI Discussions</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Loan Applications State Machine */}
      <div className="space-y-4">
        <h2 className="font-display font-bold text-lg text-white">Active Loan Applications</h2>
        
        <div className="space-y-4">
          {loans.map((loan) => (
            <div
              key={loan.id}
              className="p-6 rounded-2xl bg-[#0B152E]/90 border border-white/10 hover:border-blue-500/40 p-6 backdrop-blur-xl shadow-xl transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div>
                  <span className="text-xs font-mono text-orange-400 font-bold block">{loan.applicationNo}</span>
                  <h3 className="font-sans font-bold text-base text-white">{loan.schemeName}</h3>
                </div>
                <div className="flex items-center gap-3 self-start sm:self-auto">
                  <span className="font-display font-black text-2xl text-white">₹{loan.amountRequested.toLocaleString()}</span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
                    loan.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    {loan.status}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-blue-200/70">
                <span>Institution: <strong className="text-white">{loan.bankName}</strong></span>
                <span>Tenure: {loan.tenureMonths} Months</span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] text-xs font-sans text-blue-100/80">
                <strong>Officer Notes:</strong> {loan.notes}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Application Modal */}
      {showLoanModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl bg-[#0F1C3F] border border-white/10 p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-display font-bold text-lg text-white">Apply for Agricultural Credit</h3>
              <button onClick={() => setShowLoanModal(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplyLoan} className="space-y-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-blue-200 block">Select Scheme *</label>
                <select
                  value={loanScheme}
                  onChange={(e) => setLoanScheme(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0B152E] border border-white/10 text-white text-sm focus:border-blue-400 focus:outline-none"
                >
                  <option value="Kisan Credit Card (KCC) Working Capital">Kisan Credit Card (KCC) Crop Working Capital</option>
                  <option value="Agri Infrastructure Fund (AIF) Solar & Drip">Agri Infrastructure Fund (AIF) Solar & Drip</option>
                  <option value="Organic Transition Incentive Subsidy">Organic Transition Incentive Loan</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-blue-200 block">Required Amount (₹) *</label>
                <input
                  type="number"
                  min="20000"
                  step="10000"
                  required
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0B152E] border border-white/10 text-white text-sm focus:border-blue-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-blue-200 block">Purpose & Crop Details *</label>
                <textarea
                  rows={3}
                  required
                  value={loanPurpose}
                  onChange={(e) => setLoanPurpose(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0B152E] border border-white/10 text-white text-sm focus:border-blue-400 focus:outline-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[11px] text-blue-200 font-sans">
                Submitting creates an auditable access consent for Maharashtra State Cooperative Bank to review your 14.5A title & soil health score.
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowLoanModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/[0.05] text-neutral-300 text-xs font-sans font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-sans font-bold uppercase tracking-wider"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
