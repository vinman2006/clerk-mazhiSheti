'use client'

import React, { useState } from 'react'
import { 
  Scale, 
  Plus, 
  ShieldCheck, 
  Lock, 
  Ban, 
  Check, 
  Copy, 
  Clock, 
  KeyRound, 
  FileText, 
  X, 
  CheckCircle2, 
  Loader2,
  AlertCircle
} from 'lucide-react'
import { ConsentRecord } from '@/lib/mockData'
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
    <div className="space-y-6">
      {/* HEADER WITH GRANT BUTTON */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-xl bg-[#141826] border-2 border-[#1E3A8A] shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-black text-2xl text-white">
              Smart Consent Management Center
            </h1>
            <SimulatedBadge />
          </div>
          <p className="text-xs font-sans text-neutral-300 mt-1">
            Grant, scope, and immediately revoke data access authorizations for <strong className="text-white">{profile.name}</strong>. Enforced on-chain.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md font-mono"
        >
          <Plus className="w-4 h-4" />
          <span>Grant New Consent</span>
        </button>
      </div>

      {/* FILTER TABS */}
      <div className="flex items-center gap-2 border-b border-neutral-700 pb-3">
        {(['all', 'active', 'expired', 'revoked'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold capitalize transition-all ${
              filter === tab
                ? 'bg-portal-orange text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-[#141826]'
            }`}
          >
            {tab} ({tab === 'all' ? consents.length : consents.filter(c => c.status === tab).length})
          </button>
        ))}
      </div>

      {/* CONSENT GRANTS LEDGER LIST */}
      <div className="rounded-xl bg-[#141826] border-2 border-[#1E3A8A] overflow-hidden shadow-xl">
        <div className="p-4 border-b border-neutral-700 bg-[#101420] flex items-center justify-between font-mono text-xs text-neutral-400 font-bold">
          <span className="text-white">Active Smart Consent Contracts ({filteredConsents.length})</span>
          <span className="text-portal-orange">Zero-Knowledge Scoped ✓</span>
        </div>

        <div className="divide-y divide-neutral-700">
          {filteredConsents.map((consent) => (
            <div key={consent.id} className="p-5 hover:bg-[#182033] transition-colors space-y-3">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                {/* Entity & Badge */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-sans font-bold text-sm text-white">
                      {consent.entityName}
                    </span>
                    <VerifiedBadge entity="Provider DID" did={consent.entityDid} />
                    <ConsentPill status={consent.status} />
                  </div>
                  <div className="font-mono text-[11px] text-neutral-400">
                    DID: {consent.entityDid} • Contract: {consent.contractAddress || '0x8849b...29ef'}
                  </div>
                </div>

                {/* Revoke / Actions */}
                <div className="flex items-center gap-3">
                  <div className="text-right font-mono text-xs">
                    <span className="text-neutral-400 block text-[10px]">Valid Until:</span>
                    <span className="text-white font-bold">{formatTimestamp(consent.validUntil)}</span>
                  </div>

                  {consent.status === 'active' && (
                    <button
                      onClick={() => revokeConsent(consent.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white border border-red-500/40 text-xs font-mono font-bold transition-all flex items-center gap-1.5"
                    >
                      <Ban className="w-3.5 h-3.5" />
                      <span>Revoke Access</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Data Scope & Purpose */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-[#101420] p-3.5 rounded-lg border-l-4 border-l-portal-orange border border-neutral-700">
                <div>
                  <span className="font-mono text-neutral-400 text-[10px] uppercase block font-bold">Authorized Data Scope:</span>
                  <span className="text-portal-orange-light font-sans font-bold">{consent.dataType}</span>
                </div>
                <div>
                  <span className="font-mono text-neutral-400 text-[10px] uppercase block font-bold">Purpose of Processing:</span>
                  <span className="text-neutral-200 font-sans">{consent.purpose}</span>
                </div>
              </div>

              {/* Transaction Hash */}
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-1">
                <span>TX: <span className="text-neutral-300 font-semibold">{truncateHash(consent.txHash, 12, 8)}</span></span>
                <span className="text-portal-green font-bold">Granted: {formatTimestamp(consent.grantedAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GRANT NEW CONSENT MODAL WITH CRYPTO TRANSACTION SIGNING */}
      {showModal && (
        <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-[#141826] border-2 border-[#1E3A8A] rounded-2xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-neutral-700 pb-3">
              <div className="flex items-center gap-2 text-portal-orange font-mono font-bold text-sm">
                <KeyRound className="w-4 h-4" />
                <span>Issue Cryptographic Consent Grant</span>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="text-neutral-400 hover:text-white p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {signingStep === 'form' && (
              <div className="space-y-4 text-xs font-sans">
                {/* Select Entity */}
                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Recipient Entity / Provider:</label>
                  <select
                    value={targetEntity}
                    onChange={(e) => setTargetEntity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-white focus:outline-none focus:border-portal-orange font-sans"
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
                  <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Select Permitted Data Selectors:</label>
                  <div className="space-y-1.5">
                    {availableScopes.map((scope) => {
                      const isChecked = selectedScopes.includes(scope)
                      return (
                        <div
                          key={scope}
                          onClick={() => handleToggleScope(scope)}
                          className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                            isChecked
                              ? 'bg-[#101420] border-l-4 border-l-portal-orange border-neutral-700 text-white font-bold'
                              : 'bg-[#101420]/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                          }`}
                        >
                          <span>{scope}</span>
                          <div className={`w-4 h-4 rounded flex items-center justify-center border ${isChecked ? 'bg-portal-orange border-portal-orange text-white' : 'border-neutral-600'}`}>
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Purpose */}
                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Purpose Specification:</label>
                  <input
                    type="text"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-white focus:outline-none focus:border-portal-orange font-sans"
                  />
                </div>

                {/* Expiry */}
                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Time Duration / Expiry:</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['24 Hours', '72 Hours', '30 Days', '1 Year'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setExpiryOption(opt)}
                        className={`py-2 rounded-lg font-mono text-xs border font-bold transition-all ${
                          expiryOption === opt
                            ? 'bg-portal-orange text-white border-portal-orange shadow-sm'
                            : 'bg-[#101420] border-neutral-700 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Monospace crypto signing preview */}
                <div className="p-4 rounded-lg bg-[#101420] border border-neutral-700 font-mono text-[11px] text-neutral-300 space-y-1.5">
                  <div className="text-portal-orange font-bold mb-1 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Transaction Payload Preview</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Signer Citizen:</span>
                    <span className="text-white font-bold">{profile.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Signer DID:</span>
                    <span className="text-neutral-200">{profile.did.slice(0, 20)}...</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contract Method:</span>
                    <span className="text-white font-bold">grantScopedAccess(bytes32, uint64)</span>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    onClick={handleGrantConsent}
                    disabled={selectedScopes.length === 0}
                    className="w-full py-3.5 rounded-lg bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md font-mono flex items-center justify-center gap-2 disabled:opacity-40"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>Sign & Record Smart Contract</span>
                  </button>
                </div>
              </div>
            )}

            {signingStep === 'signing' && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 font-mono">
                <Loader2 className="w-8 h-8 text-portal-orange animate-spin" />
                <div>
                  <h3 className="font-bold text-white text-sm">Recording to ledger...</h3>
                  <p className="text-xs text-neutral-400 mt-1">Generating Ed25519 signature & consensus broadcast</p>
                </div>
              </div>
            )}

            {signingStep === 'confirmed' && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 font-mono">
                <div className="w-12 h-12 rounded-full bg-portal-green/20 text-portal-green flex items-center justify-center border-2 border-portal-green">
                  <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
                </div>
                <h3 className="font-bold text-white text-sm">Consent Smart Contract Minted!</h3>
                <p className="text-xs text-portal-green font-bold">Transaction state updated on-chain.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
