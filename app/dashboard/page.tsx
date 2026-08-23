'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Bot, 
  Calendar, 
  Scale, 
  FileText, 
  Search, 
  Database, 
  ShieldCheck, 
  ArrowRight, 
  Activity, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  ChevronRight,
  User,
  Heart,
  Ticket,
  MapPin,
  AlertTriangle
} from 'lucide-react'
import { useAuth } from '@/lib/authContext'
import { useUserData } from '@/lib/userDataContext'
import { VerifiedBadge } from '@/components/ui/VerifiedBadge'
import { SimulatedBadge } from '@/components/ui/SimulatedBadge'
import { OneAmWalletCard } from '@/components/wallet/OneAmWalletCard'
import { formatTimestamp, truncateHash } from '@/lib/utils'

export default function PatientDashboardPage() {
  const { user } = useAuth()
  const { profile, consents, appointments, records, auditTrail } = useUserData()

  const [activeTokens, setActiveTokens] = useState<any[]>([])
  const [loadingTokens, setLoadingTokens] = useState(true)

  // Fetch active queue tokens from MongoDB
  const fetchTokens = async () => {
    try {
      const res = await fetch('/api/tokens')
      const data = await res.json()
      if (data.success && Array.isArray(data.tokens)) {
        setActiveTokens(data.tokens)
      }
    } catch (err) {
      console.error('Failed to load tokens:', err)
    } finally {
      setLoadingTokens(false)
    }
  }

  useEffect(() => {
    fetchTokens()
    const interval = setInterval(fetchTokens, 5000)
    return () => clearInterval(interval)
  }, [])

  const activeConsentsCount = consents.filter(c => c.status === 'active').length
  const upcomingAppointment = appointments.find(a => a.status !== 'Cancelled') || appointments[0]
  const lastAudit = auditTrail[0]
  const latestToken = activeTokens.find(t => ['QUEUED', 'CALLED', 'IN_PROGRESS'].includes(t.status))

  return (
    <div className="space-y-6">
      {/* GREETING & ENCLAVE STATUS HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-xl bg-[#141826] border-2 border-[#1E3A8A] shadow-xl">
        <div className="flex items-center gap-4">
          <img
            src={profile.avatarUrl || user.avatarUrl}
            alt={profile.name || user.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-portal-orange shadow-md"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display font-black text-2xl text-white">
                Welcome back, {profile.name || user.name}
              </h1>
              <VerifiedBadge entity="DID Identity" did={profile.did || user.did} />
            </div>
            <p className="text-xs font-sans text-neutral-300 mt-1">
              Your sovereign proxy agent is active and protecting your health records.
              {profile.chronicConditions?.length > 0 && (
                <span className="text-portal-orange ml-1 font-semibold">
                  (Monitoring: {profile.chronicConditions.join(', ')})
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/profile"
            className="px-4 py-2 rounded-lg bg-[#101420] border border-neutral-700 hover:border-portal-orange text-portal-orange hover:text-white text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <User className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </Link>
          <SimulatedBadge />
        </div>
      </div>

      {/* ACTIVE DEMO QUEUE TOKEN BANNER IF PRESENT */}
      {latestToken && (
        <div className="p-5 rounded-xl bg-[#141826] border-2 border-amber-500/50 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center text-xl shrink-0">
              🧠
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wide">
                  Active Consultation Queue Token
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-[10px] font-mono text-amber-300 font-bold">
                  {latestToken.status}
                </span>
              </div>
              <h3 className="font-display font-black text-xl text-white mt-0.5">
                Token #{latestToken.tokenNumber} — {latestToken.doctorName}
              </h3>
              <p className="text-xs font-sans text-neutral-300 flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{latestToken.locationName}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/hospital-portal/doctor-demo-tushar"
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs font-mono transition-all shadow-md"
            >
              Open Tushar Portal →
            </Link>
          </div>
        </div>
      )}

      {/* 1AM WALLET & MIDNIGHT BLOCKCHAIN ENCLAVE */}
      <OneAmWalletCard />

      {/* QUICK ACTIONS ROW */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          href="/dashboard/find-care"
          className="p-4 rounded-xl bg-[#141826] border border-neutral-700 border-l-4 border-l-portal-orange hover:border-neutral-600 hover:bg-[#182033] transition-all group flex flex-col justify-between shadow-md"
        >
          <div className="p-2 rounded bg-portal-orange/20 text-portal-orange w-fit mb-2 group-hover:scale-105 transition-transform">
            <Search className="w-4 h-4" />
          </div>
          <div>
            <span className="font-sans font-bold text-xs text-white block">Find Care</span>
            <span className="text-[11px] text-neutral-400 font-sans">Verified doctors & demo tokens</span>
          </div>
        </Link>

        <Link
          href="/dashboard/agents"
          className="p-4 rounded-xl bg-[#141826] border border-neutral-700 border-l-4 border-l-portal-green hover:border-neutral-600 hover:bg-[#182033] transition-all group flex flex-col justify-between shadow-md"
        >
          <div className="p-2 rounded bg-portal-green/20 text-portal-green w-fit mb-2 group-hover:scale-105 transition-transform">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <span className="font-sans font-bold text-xs text-portal-green block">Talk to Nexora</span>
              <span className="w-2 h-2 rounded-full bg-portal-green"></span>
            </div>
            <span className="text-[11px] text-neutral-400 font-sans">Multi-agent AI assistant</span>
          </div>
        </Link>

        <Link
          href="/dashboard/records"
          className="p-4 rounded-xl bg-[#141826] border border-neutral-700 border-l-4 border-l-portal-blue hover:border-neutral-600 hover:bg-[#182033] transition-all group flex flex-col justify-between shadow-md"
        >
          <div className="p-2 rounded bg-blue-500/20 text-blue-300 w-fit mb-2 group-hover:scale-105 transition-transform">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <span className="font-sans font-bold text-xs text-white block">View Records ({records.length})</span>
            <span className="text-[11px] text-neutral-400 font-sans">Encrypted off-chain IPFS</span>
          </div>
        </Link>

        <Link
          href="/dashboard/consent"
          className="p-4 rounded-xl bg-[#141826] border border-neutral-700 border-l-4 border-l-portal-orange hover:border-neutral-600 hover:bg-[#182033] transition-all group flex flex-col justify-between shadow-md"
        >
          <div className="p-2 rounded bg-portal-orange/20 text-portal-orange w-fit mb-2 group-hover:scale-105 transition-transform">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <span className="font-sans font-bold text-xs text-white block">Manage Consent</span>
            <span className="text-[11px] text-neutral-400 font-sans">{activeConsentsCount} active smart contracts</span>
          </div>
        </Link>
      </div>

      {/* THREE MAIN CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CARD 1: UPCOMING APPOINTMENT */}
        <div className="p-5 rounded-xl bg-[#141826] border border-neutral-700 border-l-4 border-l-portal-orange shadow-lg space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-700 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-portal-orange" />
                <h3 className="font-sans font-bold text-sm text-white">
                  Upcoming Appointment
                </h3>
              </div>
              {upcomingAppointment && (
                <span className="px-2 py-0.5 rounded bg-portal-green/20 text-portal-green text-[10px] font-mono font-bold">
                  {upcomingAppointment.status} ✓
                </span>
              )}
            </div>

            {upcomingAppointment ? (
              <div className="p-3.5 rounded-lg bg-[#101420] border border-neutral-700 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-sans font-bold text-xs text-white">
                      {upcomingAppointment.doctor}
                    </h4>
                    <span className="text-[11px] text-portal-orange font-mono font-bold block">
                      {upcomingAppointment.specialty} Specialist
                    </span>
                    <span className="text-[11px] text-neutral-400 font-sans block">
                      {upcomingAppointment.hospital}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-700/60 flex items-center justify-between text-xs font-mono text-neutral-300">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-portal-orange" />
                    <span>{upcomingAppointment.day} at {upcomingAppointment.time}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-neutral-400 font-mono">
                No active appointments scheduled.
              </div>
            )}
          </div>

          <Link
            href="/dashboard/appointments"
            className="w-full py-2.5 rounded-lg bg-[#101420] hover:bg-[#182033] text-portal-orange border border-neutral-700 font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5"
          >
            <span>View All Appointments ({appointments.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* CARD 2: ACTIVE SMART CONSENT CONTRACTS */}
        <div className="p-5 rounded-xl bg-[#141826] border border-neutral-700 border-l-4 border-l-portal-green shadow-lg space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-700 pb-3">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-portal-green" />
                <h3 className="font-sans font-bold text-sm text-white">
                  Active Consent Grants
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-portal-green/20 text-portal-green text-[10px] font-mono font-bold">
                {activeConsentsCount} Active
              </span>
            </div>

            <div className="space-y-2">
              {consents.slice(0, 2).map((consent) => (
                <div key={consent.id} className="p-3 rounded-lg bg-[#101420] border border-neutral-700 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-sans font-bold text-white truncate max-w-[160px]">
                      {consent.entityName}
                    </span>
                    <span className="text-[10px] font-mono text-portal-green font-bold uppercase">
                      Active ✓
                    </span>
                  </div>
                  <span className="text-[10px] text-portal-orange font-mono block truncate">
                    Scope: {consent.dataType}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/dashboard/consent"
            className="w-full py-2.5 rounded-lg bg-[#101420] hover:bg-[#182033] text-portal-green border border-neutral-700 font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5"
          >
            <span>Open Consent Center</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* CARD 3: LATEST IMMUTABLE AUDIT RECEIPT */}
        <div className="p-5 rounded-xl bg-[#141826] border border-neutral-700 border-l-4 border-l-portal-blue shadow-lg space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-700 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-300" />
                <h3 className="font-sans font-bold text-sm text-white">
                  Latest Cryptographic Audit
                </h3>
              </div>
              <span className="text-[10px] font-mono text-portal-green font-bold">
                Synced ✓
              </span>
            </div>

            {lastAudit && (
              <div className="p-3.5 rounded-lg bg-[#101420] border border-neutral-700 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-neutral-400">Accessor Entity:</span>
                  <span className="text-white font-bold truncate max-w-[140px]">{lastAudit.entity}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-neutral-400">Action:</span>
                  <span className="text-portal-orange font-semibold">{lastAudit.action}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-neutral-400">ZK Proof:</span>
                  <span className="text-portal-green font-bold">Verified (Block #{lastAudit.blockNumber})</span>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/dashboard/audit"
            className="w-full py-2.5 rounded-lg bg-[#101420] hover:bg-[#182033] text-blue-300 border border-neutral-700 font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5"
          >
            <span>View Audit Ledger ({auditTrail.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
