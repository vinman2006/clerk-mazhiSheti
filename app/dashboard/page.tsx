'use client'

import React from 'react'
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
  CheckCircle2, 
  Lock, 
  User, 
  Sparkles 
} from 'lucide-react'
import { useAuth } from '@/lib/authContext'
import { useUserData } from '@/lib/userDataContext'
import { VerifiedBadge } from '@/components/ui/VerifiedBadge'
import { SimulatedBadge } from '@/components/ui/SimulatedBadge'
import { OneAmWalletCard } from '@/components/wallet/OneAmWalletCard'

export default function PatientDashboardPage() {
  const { user } = useAuth()
  const { profile, consents, appointments, records, auditTrail } = useUserData()

  const activeConsentsCount = consents.filter(c => c.status === 'active').length
  const upcomingAppointment = appointments.find(a => a.status !== 'Cancelled') || appointments[0]
  const lastAudit = auditTrail[0]

  return (
    <div className="space-y-6 text-[#1A1A1A]">
      {/* GREETING & CITIZEN ENCLAVE STATUS HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-lg bg-white border border-[#E0E0E0] border-l-4 border-l-[#0B3D91] shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src={profile.avatarUrl || user.avatarUrl}
            alt={profile.name || user.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-[#F5821F] shadow-sm bg-white"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-extrabold text-[#0B3D91]">
                Welcome, {profile.name || user.name}
              </h1>
              <VerifiedBadge entity="Citizen Identity" did={profile.did || user.did} />
            </div>
            <p className="text-xs text-[#4B5563] mt-1">
              Your sovereign proxy agent is active and protecting your clinical records.
              {profile.chronicConditions?.length > 0 && (
                <span className="text-[#D66D10] ml-1 font-semibold">
                  (Monitoring: {profile.chronicConditions.join(', ')})
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/profile"
            className="px-4 py-2 rounded bg-white hover:bg-neutral-50 border border-[#0B3D91] text-[#0B3D91] text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm uppercase tracking-wider"
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile Vault</span>
          </Link>
          <SimulatedBadge />
        </div>
      </div>

      {/* 1AM WALLET & MIDNIGHT BLOCKCHAIN ENCLAVE */}
      <OneAmWalletCard />

      {/* QUICK ACTIONS ROW */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link
          href="/dashboard/find-care"
          className="p-4 rounded-lg bg-white border border-[#E0E0E0] border-t-4 border-t-[#0B3D91] hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="p-2 rounded bg-blue-50 text-[#0B3D91] w-fit mb-2 group-hover:scale-105 transition-transform">
            <Search className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-xs text-[#0B3D91] block">Book Doctor</span>
            <span className="text-[11px] text-[#4B5563]">AIIMS & verified clinics</span>
          </div>
        </Link>

        <Link
          href="/dashboard/agents"
          className="p-4 rounded-lg bg-white border border-[#E0E0E0] border-t-4 border-t-[#1E7A34] hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="p-2 rounded bg-green-50 text-[#1E7A34] w-fit mb-2 group-hover:scale-105 transition-transform">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#1E7A34] block">AI Health Proxy</span>
              <span className="w-2 h-2 rounded-full bg-[#1E7A34] animate-pulse"></span>
            </div>
            <span className="text-[11px] text-[#4B5563]">Multi-agent assistance</span>
          </div>
        </Link>

        <Link
          href="/dashboard/records"
          className="p-4 rounded-lg bg-white border border-[#E0E0E0] border-t-4 border-t-[#7C3AED] hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="p-2 rounded bg-purple-50 text-[#7C3AED] w-fit mb-2 group-hover:scale-105 transition-transform">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-xs text-[#7C3AED] block">Health Records ({records.length})</span>
            <span className="text-[11px] text-[#4B5563]">Encrypted off-chain store</span>
          </div>
        </Link>

        <Link
          href="/dashboard/consent"
          className="p-4 rounded-lg bg-white border border-[#E0E0E0] border-t-4 border-t-[#F5821F] hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="p-2 rounded bg-amber-50 text-[#F5821F] w-fit mb-2 group-hover:scale-105 transition-transform">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-xs text-[#D66D10] block">Smart Consent</span>
            <span className="text-[11px] text-[#4B5563]">{activeConsentsCount} active grants</span>
          </div>
        </Link>
      </div>

      {/* THREE MAIN CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CARD 1: UPCOMING APPOINTMENT */}
        <div className="p-5 rounded-lg bg-white border border-[#E0E0E0] border-l-4 border-l-[#F5821F] shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#F5821F]" />
                <h3 className="font-bold text-sm text-[#0B3D91]">
                  Upcoming Consultation
                </h3>
              </div>
              {upcomingAppointment && (
                <span className="px-2 py-0.5 rounded bg-green-100 text-green-800 text-[10px] font-bold">
                  {upcomingAppointment.status} ✓
                </span>
              )}
            </div>

            {upcomingAppointment ? (
              <div className="p-3.5 rounded bg-[#F8FAFC] border border-[#CBD5E1] space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-[#1A1A1A]">
                      {upcomingAppointment.doctor}
                    </h4>
                    <span className="text-[11px] text-[#D66D10] font-bold block">
                      {upcomingAppointment.specialty} Specialist
                    </span>
                    <span className="text-[11px] text-neutral-500 block">
                      {upcomingAppointment.hospital}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-700">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#F5821F]" />
                    <span>{upcomingAppointment.day} at {upcomingAppointment.time}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-neutral-400">
                No active appointments scheduled.
              </div>
            )}
          </div>

          <Link
            href="/dashboard/appointments"
            className="w-full py-2.5 rounded bg-[#F8FAFC] hover:bg-neutral-100 text-[#0B3D91] border border-[#CBD5E1] text-xs font-bold transition-all flex items-center justify-center gap-1.5 uppercase tracking-wider"
          >
            <span>View All Consultations ({appointments.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* CARD 2: ACTIVE SMART CONSENT CONTRACTS */}
        <div className="p-5 rounded-lg bg-white border border-[#E0E0E0] border-l-4 border-l-[#1E7A34] shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#1E7A34]" />
                <h3 className="font-bold text-sm text-[#0B3D91]">
                  Active Consent Grants
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-green-100 text-green-800 text-[10px] font-bold">
                {activeConsentsCount} Active
              </span>
            </div>

            <div className="space-y-2">
              {consents.slice(0, 2).map((consent) => (
                <div key={consent.id} className="p-3 rounded bg-[#F8FAFC] border border-[#CBD5E1] space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#1A1A1A] truncate max-w-[160px]">
                      {consent.entityName}
                    </span>
                    <span className="text-[10px] text-[#1E7A34] font-bold uppercase">
                      Active ✓
                    </span>
                  </div>
                  <span className="text-[10px] text-[#D66D10] block truncate">
                    Scope: {consent.dataType}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/dashboard/consent"
            className="w-full py-2.5 rounded bg-[#F8FAFC] hover:bg-neutral-100 text-[#1E7A34] border border-[#CBD5E1] text-xs font-bold transition-all flex items-center justify-center gap-1.5 uppercase tracking-wider"
          >
            <span>Open Consent Center</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* CARD 3: LATEST IMMUTABLE AUDIT RECEIPT */}
        <div className="p-5 rounded-lg bg-white border border-[#E0E0E0] border-l-4 border-l-[#0B3D91] shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0B3D91]" />
                <h3 className="font-bold text-sm text-[#0B3D91]">
                  Latest Cryptographic Audit
                </h3>
              </div>
              <span className="text-[10px] text-[#1E7A34] font-bold">
                Synced ✓
              </span>
            </div>

            {lastAudit && (
              <div className="p-3.5 rounded bg-[#F8FAFC] border border-[#CBD5E1] space-y-2 text-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-neutral-500">Accessor Entity:</span>
                  <span className="text-[#1A1A1A] font-bold truncate max-w-[140px]">{lastAudit.entity}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-neutral-500">Action:</span>
                  <span className="text-[#D66D10] font-semibold">{lastAudit.action}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-neutral-500">Proof:</span>
                  <span className="text-[#1E7A34] font-bold">Verified (Block #{lastAudit.blockNumber})</span>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/dashboard/audit"
            className="w-full py-2.5 rounded bg-[#F8FAFC] hover:bg-neutral-100 text-[#0B3D91] border border-[#CBD5E1] text-xs font-bold transition-all flex items-center justify-center gap-1.5 uppercase tracking-wider"
          >
            <span>View Audit Ledger ({auditTrail.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

