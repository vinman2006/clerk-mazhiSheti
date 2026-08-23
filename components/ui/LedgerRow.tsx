'use client'

import React, { useState } from 'react'
import { Copy, Check, ChevronDown, ChevronUp, ShieldCheck, ExternalLink, Database, Key } from 'lucide-react'
import { truncateHash, formatTimestamp } from '@/lib/utils'

interface LedgerRowProps {
  id: string
  timestamp: string
  entity: string
  entityDid: string
  action: string
  purpose: string
  dataAccessed: string
  txHash: string
  blockNumber: number
  zkVerified?: boolean
  isEven?: boolean
}

export function LedgerRow({
  id,
  timestamp,
  entity,
  entityDid,
  action,
  purpose,
  dataAccessed,
  txHash,
  blockNumber,
  zkVerified = false,
  isEven = false
}: LedgerRowProps) {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(txHash)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`border-b border-neutral-700/60 transition-colors ${isEven ? 'bg-[#141826]' : 'bg-[#101420]'} hover:bg-[#1a2236]`}>
      <div 
        onClick={() => setExpanded(!expanded)}
        className="px-4 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer text-sm font-mono select-none"
      >
        {/* Left: Time and Entity */}
        <div className="flex items-center gap-3 min-w-[240px]">
          <span className="text-neutral-400 text-xs whitespace-nowrap">
            {formatTimestamp(timestamp)}
          </span>
          <div className="flex items-center gap-1.5 font-sans font-bold text-white truncate">
            <span>{entity}</span>
            {zkVerified && (
              <span className="px-1.5 py-0.2 rounded bg-portal-orange/20 text-portal-orange text-[10px] font-mono border border-portal-orange/40 font-bold">
                ZK
              </span>
            )}
          </div>
        </div>

        {/* Center: Action and Purpose */}
        <div className="flex-1 min-w-[200px] text-xs font-sans">
          <span className="text-portal-orange font-bold mr-2 font-mono">[{action}]</span>
          <span className="text-neutral-300 line-clamp-1">{purpose}</span>
        </div>

        {/* Right: Block & TX Hash */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-neutral-400">
            <span>Block:</span>
            <span className="text-neutral-200 font-mono font-semibold">#{blockNumber}</span>
          </div>

          <div 
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0D1B4C] border border-portal-orange/40 hover:border-portal-orange text-xs text-portal-orange-light hover:text-white transition-all shadow-sm"
            title="Click to copy full transaction hash"
          >
            <span className="font-mono text-[11px] font-semibold">{truncateHash(txHash, 6, 4)}</span>
            {copied ? <Check className="w-3 h-3 text-portal-green" /> : <Copy className="w-3 h-3" />}
          </div>

          <button className="text-neutral-400 hover:text-white transition-colors p-1">
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded view */}
      {expanded && (
        <div className="px-5 py-4 bg-[#0D1B4C] border-t border-neutral-700/60 text-xs font-mono space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 bg-[#101420] p-3.5 rounded-lg border-l-4 border-l-portal-blue border border-neutral-700">
              <div className="flex items-center gap-1.5 text-blue-300 font-bold mb-1">
                <Database className="w-3.5 h-3.5" />
                <span>Cryptographic Off-Chain Reference</span>
              </div>
              <p className="text-neutral-300 font-sans text-xs">{dataAccessed}</p>
              <div className="text-[11px] text-neutral-400 pt-1 flex justify-between">
                <span>Storage Type:</span>
                <span className="text-portal-green font-semibold">Decentralized IPFS (Zero Raw Medical Data On-Chain)</span>
              </div>
            </div>

            <div className="space-y-1.5 bg-[#101420] p-3.5 rounded-lg border-l-4 border-l-portal-orange border border-neutral-700">
              <div className="flex items-center gap-1.5 text-portal-orange font-bold mb-1">
                <Key className="w-3.5 h-3.5" />
                <span>Identity & Verification Proof</span>
              </div>
              <div className="text-neutral-400 text-[11px] flex justify-between">
                <span>Entity DID:</span>
                <span className="text-neutral-200 font-semibold">{entityDid}</span>
              </div>
              <div className="text-neutral-400 text-[11px] flex justify-between">
                <span>Smart Contract:</span>
                <span className="text-neutral-200">0x8849b...29ef (NexoraConsentManager)</span>
              </div>
              <div className="text-neutral-400 text-[11px] flex justify-between">
                <span>Consensus Status:</span>
                <span className="text-portal-green font-bold">Immutable Finality (L1 Verified)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-2 border-t border-neutral-700/60">
            <span>Transaction ID: <span className="text-neutral-200 select-all font-mono">{txHash}</span></span>
            <span className="text-portal-green font-bold">Audit Proof Status: VALID ✓</span>
          </div>
        </div>
      )}
    </div>
  )
}
