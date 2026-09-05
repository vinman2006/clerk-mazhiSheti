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
  const [showConsentModal, setShowConsentModal] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const [loanScheme, setLoanScheme] = useState('Kisan Credit Card (KCC)')
  const [loanAmount, setLoanAmount] = useState('250000')
  const [loanPurpose, setLoanPurpose] = useState('Purchase of organic manure and certified seeds')

  const [consentBank, setConsentBank] = useState('State Bank of India (Agri Division)')
  const [consentScopes, setConsentScopes] = useState<string[]>(['farm_ownership', 'soil_health'])

  const availableScopes = [
    { id: 'farm_ownership', label: 'Farm Land & GPS Boundaries' },
    { id: 'soil_health', label: 'Soil Health Score & Assay Report' },
    { id: 'crop_history', label: 'Historical Crop Sowing & Yield' },
    { id: 'loan_documents', label: '7/12 & 8-A Revenue Records' },
  ]

  const toggleScope = (scopeId: string) => {
    if (consentScopes.includes(scopeId)) {
      setConsentScopes(consentScopes.filter(s => s !== scopeId))
    } else {
      setConsentScopes([...consentScopes, scopeId])
    }
  }

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
    setToastMessage(`Loan Application #${newL.applicationNo} for ₹${newL.amountRequested.toLocaleString()} submitted successfully!`)
    setTimeout(() => setToastMessage(null), 5000)
  }

  const handleRevokeConsent = (id: string) => {
    setConsents(consents.map((c) => (c.id === id ? { ...c, status: 'REVOKED' } : c)))
    setToastMessage('Consent Revoked: The bank no longer has permission to access your farm records.')
    setTimeout(() => setToastMessage(null), 5000)
  }

  const handleGrantConsent = (e: React.FormEvent) => {
    e.preventDefault()
    const newCs = {
      id: `cs-${Date.now()}`,
      bankName: consentBank,
      purpose: 'Credit Underwriting & Farm Verification',
      scopes: consentScopes,
      status: 'ACTIVE',
      grantedAt: 'Today',
      expiresAt: '1 Year from today',
    }
    setConsents([newCs, ...consents])
    setShowConsentModal(false)
    setToastMessage(`Consent granted to ${consentBank} with ${consentScopes.length} data scopes.`)
    setTimeout(() => setToastMessage(null), 5000)
  }

  return (
    <div className="space-y-8 relative">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-[#0C1A38] border border-blue-500/40 text-blue-200 shadow-2xl flex items-center gap-3 text-xs font-mono animate-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white ml-2">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

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
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-blue-950/50 self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Apply for Agri Credit</span>
        </button>
      </div>

      {/* FARMER CONSENT MANAGER (Section 26 & 64) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0B152E]/90 border border-emerald-500/30 backdrop-blur-2xl shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">Farmer Data Consent Controller</h2>
              <p className="text-xs font-sans text-blue-200/70">Banks cannot see your farm records without explicit permission. You can revoke access at any time.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowConsentModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Grant Bank Access</span>
            </button>
            <span className="hidden sm:flex px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              Zero Data Leak
            </span>
          </div>
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

      {/* Grant Bank Access Consent Modal */}
      {showConsentModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl bg-[#0D1C3D] border border-emerald-500/40 p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-display font-bold text-lg text-white">Grant Bank Data Consent</h3>
              <button onClick={() => setShowConsentModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGrantConsent} className="space-y-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold block">Authorized Financial Institution:</label>
                <select
                  value={consentBank}
                  onChange={(e) => setConsentBank(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#081126] border border-white/10 text-white font-sans text-xs focus:outline-none focus:border-emerald-400"
                >
                  <option value="State Bank of India (Agri Division)">State Bank of India (Agri Division)</option>
                  <option value="Maharashtra State Cooperative Bank (MSCB)">Maharashtra State Cooperative Bank (MSCB)</option>
                  <option value="Bank of Maharashtra (Rural Credit)">Bank of Maharashtra (Rural Credit)</option>
                  <option value="NABARD Refinanced PACS">NABARD Refinanced Primary Agricultural Credit Society</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-slate-300 font-bold block">Granted Cryptographic Scopes:</label>
                <div className="space-y-2">
                  {availableScopes.map((scope) => {
                    const isSelected = consentScopes.includes(scope.id)
                    return (
                      <div
                        key={scope.id}
                        onClick={() => toggleScope(scope.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-emerald-500/20 border-emerald-500/60 text-white font-bold'
                            : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span>{scope.label}</span>
                        <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${
                          isSelected ? 'bg-emerald-500 text-white' : 'border border-white/20'
                        }`}>
                          {isSelected ? '✓' : ''}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 font-sans">
                You maintain sovereign ownership. You can revoke this bank's access instantly at any time.
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowConsentModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 text-xs font-sans"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={consentScopes.length === 0}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-950/50"
                >
                  <span>Authorize Cryptographic Access</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
