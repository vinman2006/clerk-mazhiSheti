'use client'

import React, { useState } from 'react'
import { 
  FileText, 
  Search, 
  Filter, 
  ShieldCheck, 
  Lock, 
  Database, 
  ExternalLink, 
  Download, 
  Calendar, 
  Layers 
} from 'lucide-react'
import { useUserData } from '@/lib/userDataContext'
import { LedgerRow } from '@/components/ui/LedgerRow'
import { SimulatedBadge } from '@/components/ui/SimulatedBadge'

export default function AuditTrailPage() {
  const { auditTrail, profile } = useUserData()
  const [searchTerm, setSearchTerm] = useState('')
  const [actionFilter, setActionFilter] = useState<'all' | 'access' | 'verify' | 'train' | 'grant' | 'revoke'>('all')

  const filteredEntries = auditTrail.filter(entry => {
    const matchesSearch = 
      entry.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.txHash.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesAction = actionFilter === 'all' || entry.actionType === actionFilter

    return matchesSearch && matchesAction
  })

  return (
    <div className="space-y-6">
      {/* HEADER & SOURCE MATERIAL QUOTE */}
      <div className="p-6 rounded-xl bg-[#141826] border-2 border-[#1E3A8A] shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-black text-2xl text-white">
                Immutable Cryptographic Audit Trail
              </h1>
              <SimulatedBadge />
            </div>
            <p className="text-xs font-sans text-neutral-300 mt-1">
              Every data access, zero-knowledge verification, and consent grant for <strong className="text-white">{profile.name}</strong> is permanently logged on-chain.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-md bg-[#101420] border-2 border-portal-green text-portal-green font-mono text-xs font-bold shadow-sm">
              Ledger State: SYNCED ✓ ({auditTrail.length} Entries)
            </span>
          </div>
        </div>

        {/* Source Material Callout Banner */}
        <div className="p-4 rounded-lg bg-[#101420] border border-neutral-700 border-l-4 border-l-portal-green flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-portal-green shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-sans font-bold text-xs text-white block">
              Patient Visibility Guarantee:
            </span>
            <p className="text-xs text-neutral-300 font-sans italic">
              "Patients have unconditional visibility into precisely who accessed their records, at what exact second, for what clinical purpose, and under which cryptographic consent contract."
            </p>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH TOOLBAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-[#141826] border border-neutral-700">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search entity, action, hash..."
            className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-xs text-white focus:outline-none focus:border-portal-orange font-sans placeholder:text-neutral-500"
          />
        </div>

        {/* Action Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto font-mono text-xs">
          {(['all', 'access', 'verify', 'train', 'grant', 'revoke'] as const).map((act) => (
            <button
              key={act}
              onClick={() => setActionFilter(act)}
              className={`px-3 py-1.5 rounded-md capitalize whitespace-nowrap font-bold transition-all ${
                actionFilter === act
                  ? 'bg-portal-orange text-white shadow-sm'
                  : 'bg-[#101420] text-neutral-400 hover:text-white border border-neutral-700'
              }`}
            >
              {act}
            </button>
          ))}
        </div>
      </div>

      {/* AUDIT LEDGER TABLE */}
      <div className="rounded-xl bg-[#141826] border-2 border-[#1E3A8A] overflow-hidden shadow-2xl">
        <div className="px-5 py-3.5 border-b border-neutral-700 bg-[#101420] flex items-center justify-between font-mono text-xs text-neutral-300 font-bold">
          <span>Timestamp & Entity</span>
          <span className="hidden md:inline">Action & Purpose Scope</span>
          <span>Transaction Verification</span>
        </div>

        <div className="divide-y divide-neutral-700">
          {filteredEntries.map((entry, idx) => (
            <LedgerRow
              key={entry.id}
              id={entry.id}
              timestamp={entry.timestamp}
              entity={entry.entity}
              entityDid={entry.entityDid}
              action={entry.action}
              purpose={entry.purpose}
              dataAccessed={entry.dataAccessed}
              txHash={entry.txHash}
              blockNumber={entry.blockNumber}
              zkVerified={entry.zkVerified}
              isEven={idx % 2 === 0}
            />
          ))}

          {filteredEntries.length === 0 && (
            <div className="p-8 text-center text-xs font-mono text-neutral-400">
              No matching audit entries found for "{searchTerm}".
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
