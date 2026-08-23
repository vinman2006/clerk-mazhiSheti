'use client'

import React, { useState } from 'react'
import { 
  Search, 
  ShieldCheck, 
  Download 
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
    <div className="space-y-6 text-[#1A1A1A]">
      {/* HEADER & SOURCE MATERIAL QUOTE */}
      <div className="p-6 rounded-lg bg-white border border-[#E0E0E0] border-l-4 border-l-[#0B3D91] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-[#0B3D91]">
                Immutable Cryptographic Audit Ledger (सार्वजनिक लेखापरीक्षण नोंदवही)
              </h1>
              <SimulatedBadge />
            </div>
            <p className="text-xs text-[#4B5563] mt-1">
              Every data access, zero-knowledge verification, and consent grant for <strong className="text-[#1A1A1A]">{profile.name}</strong> is permanently logged on-chain.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => {
                const header = 'Timestamp,Entity,EntityDID,Action,Purpose,DataAccessed,TxHash,BlockNumber,ZKVerified\n'
                const rows = filteredEntries.map(e => 
                  `"${e.timestamp}","${e.entity}","${e.entityDid}","${e.action}","${e.purpose}","${e.dataAccessed}","${e.txHash}","${e.blockNumber}","${e.zkVerified}"`
                ).join('\n')
                const blob = new Blob([header + rows], { type: 'text/csv' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `nexora-audit-ledger-${new Date().toISOString().split('T')[0]}.csv`
                a.click()
                URL.revokeObjectURL(url)
              }}
              className="px-3.5 py-1.5 rounded bg-white hover:bg-neutral-50 border border-[#0B3D91] text-[#0B3D91] text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Audit CSV</span>
            </button>
            <span className="px-3.5 py-1.5 rounded bg-green-100 border border-green-300 text-[#1E7A34] text-xs font-bold shadow-sm">
              Ledger State: SYNCED ✓ ({auditTrail.length} Entries)
            </span>
          </div>
        </div>

        {/* Source Material Callout Banner */}
        <div className="p-3 rounded bg-[#F8FAFC] border border-[#CBD5E1] border-l-4 border-l-[#1E7A34] flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#1E7A34] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-xs text-[#1A1A1A] block">
              Citizen Visibility Guarantee:
            </span>
            <p className="text-xs text-[#4B5563] italic">
              "Citizens have unconditional visibility into precisely who accessed their records, at what exact second, for what clinical purpose, and under which cryptographic consent contract."
            </p>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH TOOLBAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-lg bg-white border border-[#E0E0E0] shadow-sm">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search entity, action, hash..."
            className="w-full pl-9 pr-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-[#1A1A1A] focus:outline-none focus:bg-white focus:border-[#0B3D91]"
          />
        </div>

        {/* Action Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-xs">
          {(['all', 'access', 'verify', 'train', 'grant', 'revoke'] as const).map((act) => (
            <button
              key={act}
              onClick={() => setActionFilter(act)}
              className={`px-3 py-1.5 rounded capitalize whitespace-nowrap font-bold transition-all ${
                actionFilter === act
                  ? 'bg-[#0B3D91] text-white shadow-sm'
                  : 'bg-[#F8FAFC] text-neutral-700 hover:text-black border border-[#CBD5E1]'
              }`}
            >
              {act}
            </button>
          ))}
        </div>
      </div>

      {/* AUDIT LEDGER TABLE */}
      <div className="rounded-lg bg-white border border-[#E0E0E0] overflow-hidden shadow-sm">
        <div className="px-5 py-3.5 border-b border-neutral-200 bg-[#F8FAFC] flex items-center justify-between text-xs text-[#4B5563] font-bold">
          <span>Timestamp & Entity</span>
          <span className="hidden md:inline">Action & Purpose Scope</span>
          <span>Transaction Verification</span>
        </div>

        <div className="divide-y divide-neutral-100">
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
            <div className="p-8 text-center text-xs text-neutral-500">
              No matching audit entries found for "{searchTerm}".
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
