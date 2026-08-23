'use client'

import React, { useState } from 'react'
import { 
  Landmark, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  FileCheck, 
  AlertCircle 
} from 'lucide-react'
import { MOCK_GOV_SCHEMES, Scheme } from '@/lib/mockData'
import { useUserData } from '@/lib/userDataContext'
import { SimulatedBadge } from '@/components/ui/SimulatedBadge'

export default function PatientSchemesPage() {
  const { profile, addAuditEntry } = useUserData()
  const [schemes] = useState<Scheme[]>(MOCK_GOV_SCHEMES)
  const [appliedScheme, setAppliedScheme] = useState<string | null>('sch_cardio_2026')
  const [applyingId, setApplyingId] = useState<string | null>(null)

  const handleApply = (id: string) => {
    const target = schemes.find(s => s.id === id)
    setApplyingId(id)

    setTimeout(() => {
      setAppliedScheme(id)
      setApplyingId(null)

      addAuditEntry({
        entity: 'National Health Directorate ZK Verifier',
        entityDid: 'did:nexora:gov:national-access:44f2',
        action: `Verified ZK Eligibility for ${target?.title || 'Gov Scheme'}`,
        actionType: 'verify',
        purpose: 'Automated subsidy enrollment under Zero-Knowledge Proof',
        dataAccessed: 'ZK Predicate (Age ≥ 18 & District Valid)',
        zkVerified: true,
        txHash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
      })
    }, 1200)
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="p-6 rounded-xl bg-[#141826] border-2 border-[#1E3A8A] shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-black text-2xl text-white">
                Government Healthcare Schemes & Subsidies
              </h1>
              <SimulatedBadge />
            </div>
            <p className="text-xs font-sans text-neutral-300 mt-1">
              Apply for health coverage for <strong className="text-white">{profile.name}</strong> ({profile.district}). Verified via zero-knowledge proofs without exposing financial tax records.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-md bg-[#101420] border-2 border-portal-green text-portal-green font-mono text-xs font-bold shadow-sm">
              Zero-Knowledge Eligibility ✓
            </span>
          </div>
        </div>
      </div>

      {/* SCHEMES GRID */}
      <div className="space-y-4">
        {schemes.map((scheme) => {
          const isEnrolled = appliedScheme === scheme.id
          const isApplying = applyingId === scheme.id

          return (
            <div
              key={scheme.id}
              className={`p-6 rounded-xl bg-[#141826] border border-neutral-700 border-l-4 ${
                isEnrolled ? 'border-l-portal-green shadow-xl' : 'border-l-portal-orange hover:border-neutral-600'
              } transition-all space-y-4 shadow-lg`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded bg-portal-orange/20 text-portal-orange text-xs font-mono font-bold border border-portal-orange/40">
                      {scheme.code}
                    </span>
                    <h3 className="font-display font-bold text-base text-white">
                      {scheme.title}
                    </h3>
                  </div>
                  <p className="text-xs font-sans text-neutral-300 leading-relaxed">
                    {scheme.description}
                  </p>
                </div>

                {isEnrolled ? (
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-portal-green/20 text-portal-green border-2 border-portal-green text-xs font-mono font-bold shrink-0 shadow-sm">
                      <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                      <span>ZK Verified & Enrolled ✓</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const cert = {
                          schemeId: scheme.id,
                          schemeCode: scheme.code,
                          schemeTitle: scheme.title,
                          beneficiaryName: profile.name,
                          beneficiaryDid: profile.did,
                          district: profile.district,
                          zkProofSystem: scheme.zkProofType,
                          zkSnarkVerificationHash: `0xzk_${scheme.id.slice(-6)}_${profile.did.slice(-8)}`,
                          coverageBenefit: scheme.coverage,
                          issuedAt: new Date().toISOString(),
                          issuerAuthority: 'National Health Directorate ZK Gateway'
                        }
                        const blob = new Blob([JSON.stringify(cert, null, 2)], { type: 'application/json' })
                        const url = URL.createObjectURL(blob)
                        const a = document.createElement('a')
                        a.href = url
                        a.download = `zk-subsidy-proof-${scheme.code.toLowerCase()}.json`
                        a.click()
                        URL.revokeObjectURL(url)
                      }}
                      className="px-3 py-2 rounded-lg bg-[#101420] hover:bg-[#182033] border border-neutral-700 text-portal-orange text-xs font-mono font-bold transition-all shadow-sm flex items-center gap-1.5"
                    >
                      <span>Proof Receipt</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleApply(scheme.id)}
                    disabled={isApplying}
                    className="px-5 py-2.5 rounded-lg bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs uppercase tracking-wider transition-all font-mono shrink-0 shadow-md disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>{isApplying ? 'Generating ZK Proof...' : 'Verify Eligibility via ZK'}</span>
                  </button>
                )}
              </div>

              {/* Coverage & Criteria */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-lg bg-[#101420] border border-neutral-700 font-mono text-xs">
                <div>
                  <span className="text-neutral-400 text-[10px] uppercase block font-bold">Coverage Scope:</span>
                  <span className="text-portal-green font-bold">{scheme.coverage}</span>
                </div>
                <div>
                  <span className="text-neutral-400 text-[10px] uppercase block font-bold">Zero-Knowledge Circuit:</span>
                  <span className="text-portal-orange font-bold">{scheme.zkProofType}</span>
                </div>
                <div>
                  <span className="text-neutral-400 text-[10px] uppercase block font-bold">Target Criteria:</span>
                  <span className="text-neutral-200">{scheme.eligibilityCriteria.join(', ')}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
