'use client'

import React, { useState } from 'react'
import { ShieldCheck, CheckCircle2, Lock } from 'lucide-react'

interface VerifiedBadgeProps {
  entity?: string
  did?: string
  credentialId?: string
  zkProof?: string
  className?: string
  showDetails?: boolean
}

export function VerifiedBadge({
  entity = "Credential",
  did = "did:nexora:vc:verified",
  credentialId,
  zkProof,
  className = "",
  showDetails = false
}: VerifiedBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="relative inline-block">
      <span 
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-[#152A63] text-white border border-portal-orange/40 hover:border-portal-orange transition-all cursor-pointer shadow-sm ${className}`}
      >
        <ShieldCheck className="w-3.5 h-3.5 text-portal-green" />
        <span className="font-sans font-medium text-neutral-100">{entity} Verified</span>
        {zkProof && (
          <span className="ml-0.5 px-1.5 py-0.2 rounded bg-portal-orange text-[9px] font-mono font-bold text-white">
            ZK
          </span>
        )}
      </span>

      {showTooltip && (
        <div className="absolute z-50 left-0 bottom-full mb-2 w-72 p-3 bg-[#101420] text-neutral-200 text-xs rounded-lg border border-neutral-700 border-l-4 border-l-portal-green shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-1.5 text-portal-green font-bold mb-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Decentralized Identity (DID) Verified</span>
          </div>
          <p className="text-neutral-300 text-[11px] leading-relaxed mb-2 font-sans">
            Cryptographically signed with a W3C Verifiable Credential from the authorized regulatory authority.
          </p>
          <div className="space-y-1 font-mono text-[10px] bg-[#141826] p-2 rounded border border-neutral-700">
            <div className="text-neutral-400 flex justify-between">
              <span>DID:</span>
              <span className="text-neutral-200">{did.slice(0, 16)}...</span>
            </div>
            {credentialId && (
              <div className="text-neutral-400 flex justify-between">
                <span>VC ID:</span>
                <span className="text-portal-orange font-semibold">{credentialId.slice(0, 18)}...</span>
              </div>
            )}
            {zkProof && (
              <div className="text-neutral-400 flex justify-between">
                <span>Proof:</span>
                <span className="text-portal-green font-semibold">{zkProof}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
