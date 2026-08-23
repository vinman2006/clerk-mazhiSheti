'use client'

import React, { useState, useEffect } from 'react'
import { 
  Database, 
  Plus, 
  Trash2, 
  Calendar, 
  Building2, 
  User, 
  FileText, 
  ShieldCheck, 
  Loader2, 
  Lock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { useAuth } from '@/lib/authContext'
import { SimulatedBadge } from '@/components/ui/SimulatedBadge'

interface MongoMedicalRecord {
  id: string
  condition: string
  diagnosis?: string
  doctorName?: string
  facility?: string
  recordDate: string
  notes?: string
  createdAt: string
}

export default function MedicalRecordsCleanPage() {
  const { user, getToken } = useAuth()
  const [records, setRecords] = useState<MongoMedicalRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // Form State
  const [condition, setCondition] = useState('')
  const [diagnosis, setDiagnosis] = useState('')
  const [doctorName, setDoctorName] = useState('')
  const [facility, setFacility] = useState('')
  const [recordDate, setRecordDate] = useState(new Date().toISOString().split('T')[0])
  const [notes, setNotes] = useState('')

  const fetchRecords = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const token = await getToken()
      const res = await fetch('/api/medical/records', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.ok) {
        const data = await res.json()
        setRecords(data.records || [])
      }
    } catch (err: any) {
      console.warn('Could not fetch records:', err)
    } finally {
      setIsLoading(false)
    }
  }, [getToken])

  useEffect(() => {
    fetchRecords()
  }, [fetchRecords])

  const handleAddRecord = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!condition.trim() || !recordDate) return

    setIsSubmitting(true)
    setErrorMsg('')
    try {
      const token = await getToken()
      const res = await fetch('/api/medical/records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          condition,
          diagnosis,
          doctorName,
          facility,
          recordDate,
          notes
        })
      })

      if (res.ok) {
        setShowAddModal(false)
        setCondition('')
        setDiagnosis('')
        setDoctorName('')
        setFacility('')
        setNotes('')
        await fetchRecords()
      } else {
        const errData = await res.json()
        setErrorMsg(errData.error || 'Failed to save record')
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error communicating with server')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteRecord = async (id: string) => {
    try {
      const token = await getToken()
      const res = await fetch(`/api/medical/records/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.ok) {
        setRecords(records.filter(r => r.id !== id))
      }
    } catch (err) {
      console.error('Delete error:', err)
    }
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-xl bg-[#141826] border-2 border-[#1E3A8A] shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-black text-2xl text-white">
              Sovereign Clinical Records (Clean Data Layer)
            </h1>
            <SimulatedBadge />
          </div>
          <p className="text-xs font-sans text-neutral-300 mt-1">
            Linked strictly via server-derived cryptographic <strong className="text-portal-orange font-mono">personHash</strong>. No names, emails, or UIDs stored in this collection.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md font-mono"
          >
            <Plus className="w-4 h-4" />
            <span>Add Medical Record</span>
          </button>
        </div>
      </div>

      {/* PRIVACY GUARANTEE BANNER */}
      <div className="p-4 rounded-xl bg-[#101420] border border-neutral-700 border-l-4 border-l-portal-green flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-portal-green shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs font-sans">
          <span className="font-bold text-white block">Identity & Medical Data Separation Enforced:</span>
          <p className="text-neutral-300 leading-relaxed">
            The <code className="font-mono text-portal-orange">medicalRecords</code> collection stores strictly clinical diagnoses and dates. It is joined on-demand server-side using your authenticated session token.
          </p>
        </div>
      </div>

      {/* RECORDS LIST */}
      {isLoading ? (
        <div className="py-16 flex flex-col items-center justify-center space-y-3 font-mono text-neutral-400">
          <Loader2 className="w-8 h-8 text-portal-orange animate-spin" />
          <span className="text-xs">Fetching verified medical records from MongoDB...</span>
        </div>
      ) : records.length === 0 ? (
        <div className="p-12 text-center text-xs font-mono text-neutral-400 rounded-xl bg-[#141826] border border-neutral-700 space-y-3">
          <Database className="w-8 h-8 text-neutral-500 mx-auto" />
          <p>No medical records on file for your authenticated account.</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-md bg-[#101420] hover:bg-[#182033] border border-neutral-700 text-portal-orange font-bold text-xs"
          >
            + Create First Record
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {records.map((rec) => (
            <div
              key={rec.id}
              className="p-5 rounded-xl bg-[#141826] border border-neutral-700 border-l-4 border-l-portal-orange hover:border-neutral-600 transition-all space-y-3 shadow-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded bg-portal-orange/20 text-portal-orange text-[10px] font-mono font-bold border border-portal-orange/40">
                      Condition
                    </span>
                    <h3 className="font-sans font-bold text-sm text-white">
                      {rec.condition}
                    </h3>
                  </div>

                  {rec.diagnosis && (
                    <p className="text-xs font-sans text-neutral-200">
                      <strong>Diagnosis:</strong> {rec.diagnosis}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-portal-green font-bold bg-[#101420] px-2.5 py-1 rounded border border-neutral-700">
                    {new Date(rec.recordDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>

                  <button
                    onClick={() => handleDeleteRecord(rec.id)}
                    className="p-1.5 rounded bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 transition-all"
                    title="Delete record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {(rec.doctorName || rec.facility) && (
                <div className="flex items-center gap-4 text-xs font-sans text-neutral-400 pt-1">
                  {rec.doctorName && (
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-portal-orange" />
                      <span>{rec.doctorName}</span>
                    </span>
                  )}
                  {rec.facility && (
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-portal-orange" />
                      <span>{rec.facility}</span>
                    </span>
                  )}
                </div>
              )}

              {rec.notes && (
                <p className="text-xs font-mono text-neutral-300 bg-[#101420] p-3 rounded-lg border border-neutral-700/60 leading-relaxed">
                  {rec.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ADD RECORD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-[#141826] border-2 border-[#1E3A8A] rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-700 pb-3">
              <h2 className="font-display font-black text-base text-white">
                Add New Clinical Record
              </h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                ×
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-mono">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleAddRecord} className="space-y-4 text-xs font-sans">
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Condition / Primary Complaint: *</label>
                <input
                  type="text"
                  required
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  placeholder="e.g. Paroxysmal Atrial Fibrillation"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-white focus:outline-none focus:border-portal-orange text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Specific Diagnosis / Assessment:</label>
                <input
                  type="text"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="e.g. Recurrent episodes with elevated resting tachycardia"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-white focus:outline-none focus:border-portal-orange text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Attending Doctor:</label>
                  <input
                    type="text"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    placeholder="Dr. Sarah Al-Mansoor"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-white focus:outline-none focus:border-portal-orange text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Facility / Hospital:</label>
                  <input
                    type="text"
                    value={facility}
                    onChange={(e) => setFacility(e.target.value)}
                    placeholder="Apex Heart Institute"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-white focus:outline-none focus:border-portal-orange text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Date of Encounter: *</label>
                <input
                  type="date"
                  required
                  value={recordDate}
                  onChange={(e) => setRecordDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-white focus:outline-none focus:border-portal-orange text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Clinical Notes:</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Additional observations, prescribed medications, follow-up..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-white focus:outline-none focus:border-portal-orange text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-lg text-xs font-mono font-bold text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-lg bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs uppercase tracking-wider font-mono shadow-md transition-all flex items-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Lock className="w-3.5 h-3.5" />}
                  <span>{isSubmitting ? 'Saving Record...' : 'Save to Clean Store'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
