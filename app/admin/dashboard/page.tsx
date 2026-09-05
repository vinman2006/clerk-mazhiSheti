'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Users, 
  Landmark, 
  Wrench, 
  GraduationCap, 
  Cpu, 
  AlertTriangle, 
  Search, 
  Filter, 
  ArrowLeft,
  Check,
  X,
  RefreshCw,
  Lock,
  Activity,
  FileCheck,
  ShieldCheck,
  Server
} from 'lucide-react'
import { FarmerLogo } from '@/components/ui/FarmerLogo'
import { UserButton } from '@clerk/nextjs'

interface OrganizationItem {
  id: string
  name: string
  type: 'BANK' | 'PROVIDER' | 'EXPERT'
  regNo: string
  contactEmail: string
  appliedDate: string
  status: 'PENDING_VERIFICATION' | 'VERIFIED' | 'SUSPENDED'
  documents: string[]
}

interface AuditEntry {
  id: string
  timestamp: string
  actorName: string
  actorRole: string
  action: string
  resource: string
  details: string
  status: 'SUCCESS' | 'ALERT' | 'INFO'
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'verifications' | 'audit' | 'system'>('verifications')
  const [filterType, setFilterType] = useState<'ALL' | 'BANK' | 'PROVIDER' | 'EXPERT'>('ALL')

  // Verification Queue State
  const [orgs, setOrgs] = useState<OrganizationItem[]>([
    {
      id: 'org-01',
      name: 'Maharashtra State Cooperative Bank (MSCB - Baramati)',
      type: 'BANK',
      regNo: 'RBI-URB-MH-1961-44',
      contactEmail: 'agri.credit@mscbank.com',
      appliedDate: '02 Mar 2026',
      status: 'VERIFIED',
      documents: ['RBI_Banking_License.pdf', 'Branch_Audit_Report_2025.pdf'],
    },
    {
      id: 'org-02',
      name: 'Sahyadri Custom Hiring Center & Tractor Fleet',
      type: 'PROVIDER',
      regNo: 'MH-AGRI-CHC-2023-908',
      contactEmail: 'rentals@sahyadichc.in',
      appliedDate: '04 Mar 2026',
      status: 'PENDING_VERIFICATION',
      documents: ['RTO_Commercial_Tractor_Permits.pdf', 'GST_Registration.pdf'],
    },
    {
      id: 'org-03',
      name: 'Dr. Vasantrao Salunkhe (Soil Health & Regenerative Lead)',
      type: 'EXPERT',
      regNo: 'ICAR-AGRO-CERT-8841',
      contactEmail: 'dr.salunkhe@icar-national.res.in',
      appliedDate: '04 Mar 2026',
      status: 'PENDING_VERIFICATION',
      documents: ['PhD_Soil_Science_MPKV.pdf', 'ICAR_Accreditation_Certificate.pdf'],
    },
    {
      id: 'org-04',
      name: 'Vidarbha Agro-Chemicals & Soil Testing Lab',
      type: 'PROVIDER',
      regNo: 'NABL-LAB-2024-512',
      contactEmail: 'contact@vidarbha-lab.com',
      appliedDate: '01 Mar 2026',
      status: 'VERIFIED',
      documents: ['NABL_ISO17025_Accreditation.pdf'],
    },
  ])

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState<AuditEntry[]>([
    {
      id: 'log-01',
      timestamp: '2 mins ago',
      actorName: 'Ramesh Kulkarni (MSCB)',
      actorRole: 'BANK_LOAN_OFFICER',
      action: 'BANK_DATA_VIEW',
      resource: 'FARMER_DOSSIER #cmf8-patil',
      details: 'Consent verified: scopes [farm_ownership, soil_health]. Application #MSCB-KCC-2026-8891.',
      status: 'SUCCESS',
    },
    {
      id: 'log-02',
      timestamp: '14 mins ago',
      actorName: 'IoT Gateway ESP32-ZONE-02',
      actorRole: 'SYSTEM_DEVICE',
      action: 'IRRIGATION_AUTO_TRIGGER',
      resource: 'SPRINKLER_VALVE #VLV-FLD-02',
      details: 'Triggered 15 min pulse. Moisture 28.5% below minimum safety target 35.0%.',
      status: 'INFO',
    },
    {
      id: 'log-03',
      timestamp: '42 mins ago',
      actorName: 'Anandarao Patil',
      actorRole: 'FARMER',
      action: 'CONSENT_GRANTED',
      resource: 'CONSENT #cns-991',
      details: 'Granted scopes [farm_ownership, soil_health, crop_history] to MSCB.',
      status: 'SUCCESS',
    },
    {
      id: 'log-04',
      timestamp: '1 hour ago',
      actorName: 'System Security Engine',
      actorRole: 'SECURITY_MONITOR',
      action: 'AUTH_RATE_LIMIT_CHECK',
      resource: 'IP 182.74.92.11',
      details: '5 failed login attempts caught on /auth/farmer. IP throttled for 15 minutes.',
      status: 'ALERT',
    },
    {
      id: 'log-05',
      timestamp: '3 hours ago',
      actorName: 'System Admin (You)',
      actorRole: 'SUPER_ADMIN',
      action: 'DATABASE_BACKUP_SNAPSHOT',
      resource: 'SQLite / Prisma db.dev',
      details: 'Automated encrypted WAL snapshot verified. 0 corruption flags.',
      status: 'SUCCESS',
    },
  ])

  const handleUpdateOrgStatus = (id: string, newStatus: 'VERIFIED' | 'SUSPENDED') => {
    setOrgs(orgs.map((o) => (o.id === id ? { ...o, status: newStatus } : o)))
    // Add an audit log entry for this action
    const newLog: AuditEntry = {
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      actorName: 'Super Administrator',
      actorRole: 'SUPER_ADMIN',
      action: newStatus === 'VERIFIED' ? 'ORGANIZATION_VERIFIED' : 'ORGANIZATION_SUSPENDED',
      resource: `ORG #${id}`,
      details: `Administrator updated status of organization to ${newStatus}.`,
      status: newStatus === 'VERIFIED' ? 'SUCCESS' : 'ALERT',
    }
    setAuditLogs([newLog, ...auditLogs])
  }

  const filteredOrgs = orgs.filter((o) => (filterType === 'ALL' ? true : o.type === filterType))

  return (
    <div className="min-h-screen bg-[#070B16] text-slate-100 flex flex-col selection:bg-rose-500/25 selection:text-rose-400">
      
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#0B152E]/95 backdrop-blur-xl border-b border-rose-500/20 px-6 sm:px-10 py-3.5 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <FarmerLogo className="w-8 h-8 group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-sm text-white tracking-wider uppercase">Mazhi Sheti</span>
                <span className="px-2 py-0.5 rounded bg-rose-950/80 border border-rose-500/40 text-rose-400 text-[10px] font-mono font-bold tracking-widest uppercase">
                  ROOT ADMIN
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Unified Agricultural Security & Governance Console</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/farmer/dashboard"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-xs font-mono transition-colors border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Farmer OS View</span>
          </Link>
          <div className="h-6 w-px bg-white/10" />
          <UserButton />
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Title & System Vital Statistics */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span>Platform Governance Center</span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Cluster Healthy
              </span>
            </h1>
            <p className="text-sm text-blue-200/70 mt-1 font-sans">
              Real-time oversight over 1,420 registered farmers, institutional bank charters, IoT sensor telemetry, and access consent audits.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Refreshing live metrics and audit telemetry stream...')}
              className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 text-xs font-mono border border-white/10 flex items-center gap-2 transition-all active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5 text-rose-400" />
              <span>Refresh Stream</span>
            </button>
          </div>
        </div>

        {/* Vital KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-2xl bg-[#0C152E]/90 border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-mono uppercase">Registered Farmers</span>
              <Users className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white font-mono">1,428</div>
            <div className="text-[10px] text-emerald-400 font-mono">+34 this week</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0C152E]/90 border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-mono uppercase">Bank Institutions</span>
              <Landmark className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-white font-mono">6</div>
            <div className="text-[10px] text-blue-400 font-mono">2 pending audit</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0C152E]/90 border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-mono uppercase">Machinery Fleets</span>
              <Wrench className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-white font-mono">18</div>
            <div className="text-[10px] text-slate-400 font-mono">82 tractors registered</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0C152E]/90 border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-mono uppercase">Agronomists</span>
              <GraduationCap className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-black text-white font-mono">12</div>
            <div className="text-[10px] text-indigo-400 font-mono">ICAR & MPKV certified</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0C152E]/90 border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-mono uppercase">Active IoT Nodes</span>
              <Cpu className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-black text-white font-mono">254</div>
            <div className="text-[10px] text-cyan-400 font-mono">99.8% ingestion uptime</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0C152E]/90 border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-mono uppercase">Audit Events Today</span>
              <ShieldCheck className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-black text-white font-mono">4,192</div>
            <div className="text-[10px] text-rose-400 font-mono">100% consent logged</div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('verifications')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              activeTab === 'verifications'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'text-slate-400 hover:text-white bg-white/[0.02]'
            }`}
          >
            <FileCheck className="w-4 h-4 text-rose-400" />
            <span>Institution Verifications ({orgs.filter(o => o.status === 'PENDING_VERIFICATION').length} Pending)</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              activeTab === 'audit'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'text-slate-400 hover:text-white bg-white/[0.02]'
            }`}
          >
            <Activity className="w-4 h-4 text-rose-400" />
            <span>Live Audit Log Stream ({auditLogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('system')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              activeTab === 'system'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'text-slate-400 hover:text-white bg-white/[0.02]'
            }`}
          >
            <Server className="w-4 h-4 text-rose-400" />
            <span>System Infrastructure Health</span>
          </button>
        </div>

        {/* TAB 1: INSTITUTION VERIFICATIONS */}
        {activeTab === 'verifications' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {(['ALL', 'BANK', 'PROVIDER', 'EXPERT'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilterType(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                      filterType === t
                        ? 'bg-white/10 text-white font-bold border border-white/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="text-xs font-mono text-slate-400">
                Least-privilege rule: Unverified institutions cannot view farmer records or list services.
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredOrgs.map((org) => (
                <div
                  key={org.id}
                  className="p-5 sm:p-6 rounded-2xl bg-[#0B152E]/80 border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                        org.type === 'BANK' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                        org.type === 'PROVIDER' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      }`}>
                        {org.type}
                      </span>
                      <h3 className="text-base font-bold text-white tracking-wide">{org.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        org.status === 'VERIFIED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        org.status === 'PENDING_VERIFICATION' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {org.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-1 sm:gap-x-6 text-xs font-mono text-slate-300">
                      <div><span className="text-slate-500">Charter/Reg No:</span> {org.regNo}</div>
                      <div><span className="text-slate-500">Official Email:</span> {org.contactEmail}</div>
                      <div><span className="text-slate-500">Application Date:</span> {org.appliedDate}</div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-xs font-mono text-slate-400">Attached Documents:</span>
                      {org.documents.map((doc, idx) => (
                        <span key={idx} className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-blue-300 border border-white/5">
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {org.status !== 'VERIFIED' && (
                      <button
                        onClick={() => handleUpdateOrgStatus(org.id, 'VERIFIED')}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-950/40"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve Charter</span>
                      </button>
                    )}
                    {org.status !== 'SUSPENDED' && (
                      <button
                        onClick={() => handleUpdateOrgStatus(org.id, 'SUSPENDED')}
                        className="px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-mono font-bold transition-all flex items-center gap-1.5"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Suspend Access</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: LIVE AUDIT LOG STREAM */}
        {activeTab === 'audit' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Immutable Tamper-Evident Access Log • All Bank Views & IoT Commands Recorded</span>
              </div>
              <span className="text-xs font-mono text-slate-400">Retention: 7 Years (RBI/Agri Compliance)</span>
            </div>

            <div className="rounded-2xl bg-[#0B152E]/90 border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-white/[0.03] border-b border-white/10 text-slate-400">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold uppercase">Timestamp</th>
                      <th className="py-3.5 px-4 font-semibold uppercase">Actor & Role</th>
                      <th className="py-3.5 px-4 font-semibold uppercase">Action</th>
                      <th className="py-3.5 px-4 font-semibold uppercase">Target Resource</th>
                      <th className="py-3.5 px-4 font-semibold uppercase">Sanitized Audit Details</th>
                      <th className="py-3.5 px-4 font-semibold uppercase text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-200">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="font-bold text-white">{log.actorName}</div>
                          <div className="text-[10px] text-slate-400">{log.actorRole}</div>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded bg-white/[0.06] text-blue-300 font-semibold">
                            {log.action}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap text-slate-300">{log.resource}</td>
                        <td className="py-3.5 px-4 text-slate-300 max-w-md truncate font-sans text-xs">{log.details}</td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            log.status === 'SUCCESS' ? 'bg-emerald-500/20 text-emerald-400' :
                            log.status === 'ALERT' ? 'bg-rose-500/20 text-rose-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SYSTEM INFRASTRUCTURE HEALTH */}
        {activeTab === 'system' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0B152E]/80 border border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Database Engine</h3>
                  <p className="text-xs font-mono text-slate-400">SQLite / Prisma Client v5.22.0</p>
                </div>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Connection Pool:</span>
                  <span className="text-emerald-400 font-bold">12 Active / 0 Wait</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Storage Size:</span>
                  <span className="text-slate-200">14.2 MB (WAL Active)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Latency:</span>
                  <span className="text-emerald-400">0.8 ms (Local SSD)</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0B152E]/80 border border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Identity & Authentication</h3>
                  <p className="text-xs font-mono text-slate-400">Clerk v3.3.0 Engine</p>
                </div>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">App ID:</span>
                  <span className="text-slate-200">app_3Id9wbp9v...</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Webhook Signature:</span>
                  <span className="text-emerald-400 font-bold">Verified & Active</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">MFA Enforced:</span>
                  <span className="text-blue-400">Bank & Admin Roles</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0B152E]/80 border border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">IoT Ingestion Pipeline</h3>
                  <p className="text-xs font-mono text-slate-400">LoRaWAN + 4G Gateway Hub</p>
                </div>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Reading Ingestion:</span>
                  <span className="text-emerald-400 font-bold">128 packets/min</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Safety Interlock:</span>
                  <span className="text-emerald-400">Armed (15 min cutoff)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Offline Nodes:</span>
                  <span className="text-slate-200">0 of 6 connected</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}
