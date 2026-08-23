'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  AlertTriangle, 
  PhoneCall, 
  Play, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Users, 
  Clock, 
  Ticket, 
  Activity,
  ArrowLeft,
  ExternalLink,
  ShieldAlert
} from 'lucide-react'

interface TokenDoc {
  _id: string
  tokenNumber: string
  doctorId: string
  doctorName: string
  department: string
  patientId: string
  patientName: string
  status: 'QUEUED' | 'CALLED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  locationName: string
  createdAt: string
  updatedAt: string
}

export default function TusharDoctorPortalPage() {
  const [tokens, setTokens] = useState<TokenDoc[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState<string | null>(null)
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date())

  const fetchQueue = async () => {
    try {
      const res = await fetch('/api/tokens?doctorId=doctor-demo-tushar')
      const data = await res.json()
      if (data.success && Array.isArray(data.tokens)) {
        setTokens(data.tokens)
        setLastRefreshed(new Date())
      }
    } catch (err) {
      console.error('Failed to load queue:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchQueue()
    // Auto-poll every 4 seconds to catch new patient tokens in real-time
    const interval = setInterval(fetchQueue, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleUpdateStatus = async (tokenId: string, status: string) => {
    setIsUpdating(tokenId)
    try {
      const res = await fetch(`/api/tokens/${tokenId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      const data = await res.json()
      if (data.success) {
        // Optimistically update
        setTokens(prev => prev.map(t => (t.tokenNumber === tokenId || t._id === tokenId ? { ...t, status: status as any } : t)))
      }
    } catch (err) {
      console.error('Failed to update status:', err)
    } finally {
      setIsUpdating(null)
    }
  }

  const queuedCount = tokens.filter(t => t.status === 'QUEUED').length
  const calledCount = tokens.filter(t => t.status === 'CALLED').length
  const inProgressCount = tokens.filter(t => t.status === 'IN_PROGRESS').length
  const completedCount = tokens.filter(t => t.status === 'COMPLETED').length

  return (
    <div className="min-h-screen bg-[#070A10] text-white p-6 sm:p-10 space-y-8 selection:bg-amber-500/20 selection:text-amber-400 font-sans">
      {/* TOP HEADER & BACK NAVIGATION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="space-y-1">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-neutral-400 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🧠</span>
            <div>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-white flex items-center gap-2">
                <span>Tushar Pamnani</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold border border-amber-500/40">
                  DEMO PROVIDER PORTAL
                </span>
              </h1>
              <p className="text-xs text-neutral-400 font-mono">
                Department: Mental Health — DEMO | Location: St. Vincent Pallotti College, Nagpur
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchQueue}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10 text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Queue</span>
          </button>
          <a
            href="https://www.linkedin.com/in/tushar-pamnani/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            <span>Public LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* PARODY / DEMO SAFETY BANNER */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 text-amber-200 space-y-1 shadow-xl">
        <div className="flex items-center gap-2 font-display font-black text-amber-400 text-sm sm:text-base">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span>DEMO / PARODY PROVIDER — NOT A REAL MEDICAL PROFESSIONAL</span>
        </div>
        <p className="text-xs font-sans text-amber-200/90 leading-relaxed">
          This is an interactive demonstration portal. Tushar Pamnani is a Web3/developer community professional. This profile and queue system exist strictly for demonstrating Nexora's MongoDB queue state synchronization and live status transitions.
        </p>
      </div>

      {/* QUEUE STATS CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0D1322] border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
            <span>WAITING IN QUEUE</span>
            <Ticket className="w-4 h-4 text-amber-400" />
          </div>
          <span className="font-display font-black text-3xl text-amber-400 block">{queuedCount}</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D1322] border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
            <span>PATIENT CALLED</span>
            <PhoneCall className="w-4 h-4 text-blue-400" />
          </div>
          <span className="font-display font-black text-3xl text-blue-400 block">{calledCount}</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D1322] border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
            <span>IN PROGRESS</span>
            <Activity className="w-4 h-4 text-purple-400" />
          </div>
          <span className="font-display font-black text-3xl text-purple-400 block">{inProgressCount}</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D1322] border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
            <span>COMPLETED TODAY</span>
            <CheckCircle2 className="w-4 h-4 text-nexora-green-status" />
          </div>
          <span className="font-display font-black text-3xl text-nexora-green-status block">{completedCount}</span>
        </div>
      </div>

      {/* LIVE PATIENT QUEUE TABLE */}
      <div className="p-6 rounded-2xl bg-[#0D1322] border border-white/10 shadow-2xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Users className="w-5 h-5 text-amber-400" />
            <h2 className="font-display font-bold text-lg text-white">
              Today's Live Patient Queue
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            Auto-syncing with MongoDB • Last: {lastRefreshed.toLocaleTimeString()}
          </span>
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-xs font-mono text-neutral-400">
            Loading queue records from MongoDB...
          </div>
        ) : tokens.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-neutral-400">
              <Ticket className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-white">No patients in the queue yet</p>
            <p className="text-xs font-sans text-neutral-400 max-w-sm mx-auto">
              When a user generates a consultation token for Dr. Tushar Pamnani from Find Care, it will appear here instantly!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-white/10 text-neutral-400 text-[11px] uppercase">
                  <th className="py-3 px-4">Token #</th>
                  <th className="py-3 px-4">Patient Name</th>
                  <th className="py-3 px-4">Time Created</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Queue Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {tokens.map((tok) => {
                  const isQueued = tok.status === 'QUEUED'
                  const isCalled = tok.status === 'CALLED'
                  const isInProg = tok.status === 'IN_PROGRESS'
                  const isDone = tok.status === 'COMPLETED'
                  const isCancelled = tok.status === 'CANCELLED'

                  return (
                    <tr key={tok._id || tok.tokenNumber} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4 font-bold text-amber-400">
                        {tok.tokenNumber}
                      </td>
                      <td className="py-3.5 px-4 text-white font-sans font-semibold">
                        {tok.patientName}
                      </td>
                      <td className="py-3.5 px-4 text-neutral-400 text-[11px]">
                        {new Date(tok.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          isQueued ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                          isCalled ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 animate-pulse' :
                          isInProg ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' :
                          isDone ? 'bg-green-500/20 text-green-300 border border-green-500/40' :
                          'bg-red-500/20 text-red-300 border border-red-500/40'
                        }`}>
                          {tok.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {isQueued && (
                            <button
                              onClick={() => handleUpdateStatus(tok.tokenNumber, 'CALLED')}
                              disabled={isUpdating === tok.tokenNumber}
                              className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] flex items-center gap-1.5 transition-all shadow-sm"
                            >
                              <PhoneCall className="w-3 h-3" />
                              <span>Call Next</span>
                            </button>
                          )}

                          {isCalled && (
                            <button
                              onClick={() => handleUpdateStatus(tok.tokenNumber, 'IN_PROGRESS')}
                              disabled={isUpdating === tok.tokenNumber}
                              className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-[11px] flex items-center gap-1.5 transition-all shadow-sm"
                            >
                              <Play className="w-3 h-3" />
                              <span>Start Session</span>
                            </button>
                          )}

                          {(isCalled || isInProg) && (
                            <button
                              onClick={() => handleUpdateStatus(tok.tokenNumber, 'COMPLETED')}
                              disabled={isUpdating === tok.tokenNumber}
                              className="px-3 py-1 rounded-lg bg-green-600 hover:bg-green-500 text-white font-bold text-[11px] flex items-center gap-1.5 transition-all shadow-sm"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Complete</span>
                            </button>
                          )}

                          {!isDone && !isCancelled && (
                            <button
                              onClick={() => handleUpdateStatus(tok.tokenNumber, 'CANCELLED')}
                              disabled={isUpdating === tok.tokenNumber}
                              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-300 border border-white/10 text-[11px] transition-all"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
