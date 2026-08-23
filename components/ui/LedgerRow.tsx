'use client'

import React, { useState } from 'react'
import { Copy, Check, ChevronDown, ChevronUp, Database, Key } from 'lucide-react'
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
    <div className={`border-b border-[#E0E0E0] transition-colors ${isEven ? 'bg-white' : 'bg-[#F8FAFC]'} hover:bg-neutral-100`}>
      <div 
        onClick={() => setExpanded(!expanded)}
        className="px-4 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer text-xs font-sans select-none"
      >
        {/* Left: Time and Entity */}
        <div className="flex items-center gap-3 min-w-[240px]">
          <span className="text-neutral-500 text-[11px] whitespace-nowrap">
            {formatTimestamp(timestamp)}
          </span>
          <div className="flex items-center gap-1.5 font-bold text-[#0B3D91] truncate">
            <span>{entity}</span>
            {zkVerified && (
              <span className="px-1.5 py-0.2 rounded bg-amber-100 text-[#D66D10] text-[10px] font-bold border border-amber-300">
                ZK
              </span>
            )}
          </div>
        </div>

        {/* Center: Action and Purpose */}
        <div className="flex-1 min-w-[200px] text-xs">
          <span className="text-[#D66D10] font-bold mr-2">[{action}]</span>
          <span className="text-[#4B5563] line-clamp-1">{purpose}</span>
        </div>

        {/* Right: Block & TX Hash */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-neutral-500">
            <span>Block:</span>
            <span className="text-[#1A1A1A] font-mono font-semibold">#{blockNumber}</span>
          </div>

          <div 
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-[#CBD5E1] hover:border-[#0B3D91] text-xs text-[#0B3D91] transition-all shadow-sm"
            title="Click to copy full transaction hash"
          >
            <span className="font-mono text-[11px] font-semibold">{truncateHash(txHash, 6, 4)}</span>
            {copied ? <Check className="w-3 h-3 text-[#1E7A34]" /> : <Copy className="w-3 h-3" />}
          </div>

          <button className="text-neutral-400 hover:text-neutral-700 transition-colors p-1">
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded view */}
      {expanded && (
        <div className="px-5 py-4 bg-[#F4F6F9] border-t border-[#E0E0E0] text-xs space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 bg-white p-3.5 rounded border-l-4 border-l-[#0B3D91] border border-[#CBD5E1]">
              <div className="flex items-center gap-1.5 text-[#0B3D91] font-bold mb-1">
                <Database className="w-3.5 h-3.5" />
                <span>Cryptographic Off-Chain Reference</span>
              </div>
              <p className="text-[#4B5563] text-xs">{dataAccessed}</p>
              <div className="text-[11px] text-neutral-500 pt-1 flex justify-between">
                <span>Storage Type:</span>
                <span className="text-[#1E7A34] font-semibold">Decentralized IPFS (Zero Raw Medical Data On-Chain)</span>
              </div>
            </div>

            <div className="space-y-1.5 bg-white p-3.5 rounded border-l-4 border-l-[#F5821F] border border-[#CBD5E1]">
              <div className="flex items-center gap-1.5 text-[#D66D10] font-bold mb-1">
                <Key className="w-3.5 h-3.5" />
                <span>Identity & Verification Proof</span>
              </div>
              <div className="text-neutral-500 text-[11px] flex justify-between">
                <span>Entity DID:</span>
                <span className="text-[#1A1A1A] font-semibold">{entityDid}</span>
              </div>
              <div className="text-neutral-500 text-[11px] flex justify-between">
                <span>Smart Contract:</span>
                <span className="text-neutral-800">0x8849b...29ef (NexoraConsentManager)</span>
              </div>
              <div className="text-neutral-500 text-[11px] flex justify-between">
                <span>Consensus Status:</span>
                <span className="text-[#1E7A34] font-bold">Immutable Finality (L1 Verified)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-2 border-t border-[#E0E0E0]">
            <span>Transaction ID: <span className="text-neutral-900 select-all font-mono">{txHash}</span></span>
            <span className="text-[#1E7A34] font-bold">Audit Proof Status: VALID ✓</span>
          </div>
        </div>
      )}
    </div>
  )
}

