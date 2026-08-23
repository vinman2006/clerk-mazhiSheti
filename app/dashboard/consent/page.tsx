'use client'

import React, { useState } from 'react'
import { 
  Scale, 
  Plus, 
  ShieldCheck, 
  Lock, 
  Ban, 
  Check, 
  Clock, 
  KeyRound, 
  FileText, 
  X, 
  CheckCircle2, 
  Loader2 
} from 'lucide-react'
import { useUserData } from '@/lib/userDataContext'
import { ConsentPill } from '@/components/ui/ConsentPill'
import { VerifiedBadge } from '@/components/ui/VerifiedBadge'
import { SimulatedBadge } from '@/components/ui/SimulatedBadge'
import { formatTimestamp, truncateHash } from '@/lib/utils'
import { useAuth } from '@/lib/authContext'

export default function ConsentManagementPage() {
  const { user } = useAuth()
  const { consents, grantConsent, revokeConsent, profile } = useUserData()

  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState<'all' | 'active' | 'expired' | 'revoked'>('all')

  // Form states
  const [targetEntity, setTargetEntity] = useState('Apex Heart & Vascular Institute')
  const [selectedScopes, setSelectedScopes] = useState<string[]>(['Current Cardiology Telemetry', 'Echocardiogram Scans'])
  const [purpose, setPurpose] = useState('Outpatient diagnostic evaluation and clinical consultation')
  const [expiryOption, setExpiryOption] = useState('72 Hours')
  const [signingStep, setSigningStep] = useState<'form' | 'signing' | 'confirmed'>('form')

  const availableScopes = [
    'Current Cardiology Telemetry',
    'Echocardiogram Scans',
    'Laboratory Blood Panels (CBC / Lipids)',
    'Genomic Allele Variants (Anonymized)',
    'Historical Imaging Archive'
  ]

  const handleToggleScope = (scope: string) => {
    if (selectedScopes.includes(scope)) {
      setSelectedScopes(selectedScopes.filter(s => s !== scope))
    } else {
      setSelectedScopes([...selectedScopes, scope])
    }
  }

  const handleGrantConsent = () => {
    setSigningStep('signing')

    setTimeout(() => {
      grantConsent({
        entityName: targetEntity,
        entityType: 'hospital',
        entityDid: `did:nexora:org:${targetEntity.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        dataType: selectedScopes.join(', '),
        dataScope: selectedScopes,
        purpose: purpose,
        validUntil: new Date(Date.now() + 72 * 3600 * 1000).toISOString(),
        contractAddress: '0x8849b...29ef'
      })

      setSigningStep('confirmed')

      setTimeout(() => {
        setShowModal(false)
        setSigningStep('form')
      }, 1200)
    }, 1500)
  }

  const filteredConsents = consents.filter(c => {
    if (filter === 'all') return true
    return c.status === filter
  })

  return (
    <div className="space-y-6 text-[#1A1A1A]">
      {/* HEADER WITH GRANT BUTTON */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-lg bg-white border border-[#E0E0E0] border-l-4 border-l-[#F5821F] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-[#0B3D91]">
              Smart Consent Management Center (संमती व्यवस्थापन केंद्र)
            </h1>
            <SimulatedBadge />
          </div>
          <p className="text-xs text-[#4B5563] mt-1">
            Grant, scope, and immediately revoke data access authorizations for <strong className="text-[#1A1A1A]">{profile.name}</strong>. Enforced cryptographically.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#1E7A34] hover:bg-[#145524] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Grant New Consent</span>
        </button>
      </div>

      {/* FILTER TABS */}
      <div className="flex items-center gap-2 border-b border-[#E0E0E0] pb-3">
        {(['all', 'active', 'expired', 'revoked'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3.5 py-1.5 rounded text-xs font-bold capitalize transition-all ${
              filter === tab
                ? 'bg-[#0B3D91] text-white shadow-sm'
                : 'text-[#4B5563] hover:text-[#1A1A1A] bg-white border border-[#CBD5E1]'
            }`}
          >
            {tab} ({tab === 'all' ? consents.length : consents.filter(c => c.status === tab).length})
          </button>
        ))}
      </div>

      {/* CONSENT GRANTS LEDGER LIST */}
      <div className="rounded-lg bg-white border border-[#E0E0E0] overflow-hidden shadow-sm">
        <div className="p-4 border-b border-neutral-200 bg-[#F8FAFC] flex items-center justify-between text-xs text-[#4B5563] font-bold">
          <span className="text-[#0B3D91] uppercase">Active Smart Consent Contracts ({filteredConsents.length})</span>
          <span className="text-[#1E7A34]">Zero-Knowledge Scoped ✓</span>
        </div>

        <div className="divide-y divide-neutral-100">
          {filteredConsents.map((consent) => (
            <div key={consent.id} className="p-5 hover:bg-neutral-50 transition-colors space-y-3">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                {/* Entity & Badge */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-bold text-sm text-[#0B3D91]">
                      {consent.entityName}
                    </span>
                    <VerifiedBadge entity="Provider DID" did={consent.entityDid} />
                    <ConsentPill status={consent.status} />
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono">
                    DID: {consent.entityDid} • Contract: {consent.contractAddress || '0x8849b...29ef'}
                  </div>
                </div>

                {/* Revoke / Actions */}
                <div className="flex items-center gap-3">
                  <div className="text-right text-xs">
                    <span className="text-neutral-500 block text-[10px]">Valid Until:</span>
                    <span className="text-[#1A1A1A] font-bold">{formatTimestamp(consent.validUntil)}</span>
                  </div>

                  {consent.status === 'active' && (
                    <button
                      onClick={() => revokeConsent(consent.id)}
                      className="px-3.5 py-1.5 rounded bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      <Ban className="w-3.5 h-3.5" />
                      <span>Revoke Access</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Data Scope & Purpose */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-[#F8FAFC] p-3.5 rounded border border-[#CBD5E1]">
                <div>
                  <span className="text-neutral-500 text-[10px] uppercase block font-bold">Authorized Data Scope:</span>
                  <span className="text-[#D66D10] font-bold">{consent.dataType}</span>
                </div>
                <div>
                  <span className="text-neutral-500 text-[10px] uppercase block font-bold">Purpose of Processing:</span>
                  <span className="text-[#1A1A1A]">{consent.purpose}</span>
                </div>
              </div>

              {/* Transaction Hash */}
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 pt-1">
                <span>TX: <span className="text-neutral-900 font-semibold">{truncateHash(consent.txHash, 12, 8)}</span></span>
                <span className="text-[#1E7A34] font-bold">Granted: {formatTimestamp(consent.grantedAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GRANT NEW CONSENT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-white border border-[#E0E0E0] rounded-lg p-6 shadow-2xl space-y-5">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div className="flex items-center gap-2 text-[#0B3D91] font-bold text-sm">
                <KeyRound className="w-4 h-4 text-[#F5821F]" />
                <span>Issue Cryptographic Consent Grant</span>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="text-neutral-400 hover:text-neutral-700 p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {signingStep === 'form' && (
              <div className="space-y-4 text-xs font-sans">
                {/* Select Entity */}
                <div className="space-y-1">
                  <label className="text-[11px] text-[#1A1A1A] font-bold block">Recipient Entity / Provider:</label>
                  <select
                    value={targetEntity}
                    onChange={(e) => setTargetEntity(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] focus:outline-none focus:bg-white focus:border-[#0B3D91]"
                  >
                    <option>Apex Heart & Vascular Institute</option>
                    <option>City Care Academic Health System</option>
                    <option>National Health Directorate (Scheme Gateway)</option>
                    <option>BioGen Epidemiological Research Consortium</option>
                    <option>OmniDiagnostics Lab Network</option>
                  </select>
                </div>

                {/* Select Data Scope */}
                <div className="space-y-2">
                  <label className="text-[11px] text-[#1A1A1A] font-bold block">Select Permitted Data Selectors:</label>
                  <div className="space-y-1.5">
                    {availableScopes.map((scope) => {
                      const isChecked = selectedScopes.includes(scope)
                      return (
                        <div
                          key={scope}
                          onClick={() => handleToggleScope(scope)}
                          className={`p-3 rounded border cursor-pointer transition-all flex items-center justify-between ${
                            isChecked
                              ? 'bg-amber-50/50 border-[#F5821F] text-[#0B3D91] font-bold'
                              : 'bg-[#F8FAFC] border-[#CBD5E1] text-neutral-600 hover:border-neutral-400'
                          }`}
                        >
                          <span>{scope}</span>
                          <div className={`w-4 h-4 rounded flex items-center justify-center border ${isChecked ? 'bg-[#F5821F] border-[#F5821F] text-white' : 'border-neutral-400 bg-white'}`}>
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Purpose */}
                <div className="space-y-1">
                  <label className="text-[11px] text-[#1A1A1A] font-bold block">Purpose Specification:</label>
                  <input
                    type="text"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] focus:outline-none focus:bg-white focus:border-[#0B3D91]"
                  />
                </div>

                {/* Expiry */}
                <div className="space-y-1">
                  <label className="text-[11px] text-[#1A1A1A] font-bold block">Time Duration / Expiry:</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['24 Hours', '72 Hours', '30 Days', '1 Year'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setExpiryOption(opt)}
                        className={`py-2 rounded text-xs border font-bold transition-all ${
                          expiryOption === opt
                            ? 'bg-[#0B3D91] text-white border-[#0B3D91] shadow-sm'
                            : 'bg-[#F8FAFC] border-[#CBD5E1] text-neutral-600 hover:bg-neutral-100'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    onClick={handleGrantConsent}
                    disabled={selectedScopes.length === 0}
                    className="w-full py-3 rounded bg-[#1E7A34] hover:bg-[#145524] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-40"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>Sign & Record Smart Consent</span>
                  </button>
                </div>
              </div>
            )}

            {signingStep === 'signing' && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <Loader2 className="w-8 h-8 text-[#0B3D91] animate-spin" />
                <div>
                  <h3 className="font-bold text-[#0B3D91] text-sm">Recording to ledger...</h3>
                  <p className="text-xs text-neutral-500 mt-1">Generating Ed25519 signature & smart contract state commit</p>
                </div>
              </div>
            )}

            {signingStep === 'confirmed' && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-green-100 text-[#1E7A34] flex items-center justify-center border-2 border-[#1E7A34]">
                  <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
                </div>
                <h3 className="font-bold text-[#0B3D91] text-sm">Consent Smart Contract Minted!</h3>
                <p className="text-xs text-[#1E7A34] font-bold">Transaction state recorded securely.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
