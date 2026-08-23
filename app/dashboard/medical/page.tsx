'use client'

import React, { useState, useEffect } from 'react'
import { 
  Database, 
  Plus, 
  Trash2, 
  Building2, 
  User, 
  ShieldCheck, 
  Loader2, 
  Lock 
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
    <div className="space-y-6 text-[#1A1A1A]">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-lg bg-white border border-[#E0E0E0] border-l-4 border-l-[#0B3D91] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-[#0B3D91]">
              Sovereign Clinical Records Store (विभक्त डेटाबेस संरचना)
            </h1>
            <SimulatedBadge />
          </div>
          <p className="text-xs text-[#4B5563] mt-1">
            Linked strictly via server-derived cryptographic <strong className="text-[#D66D10] font-mono">personHash</strong>. No names, emails, or government UIDs stored in this database collection.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#1E7A34] hover:bg-[#145524] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Medical Record</span>
          </button>
        </div>
      </div>

      {/* PRIVACY GUARANTEE BANNER */}
      <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] border-l-4 border-l-[#1E7A34] flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#1E7A34] shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <span className="font-bold text-[#1A1A1A] block">Identity & Medical Data Separation Enforced:</span>
          <p className="text-[#4B5563] leading-relaxed">
            The <code className="font-mono bg-white px-1 py-0.5 rounded border border-neutral-300 text-[#0B3D91]">medicalRecords</code> collection stores strictly clinical diagnoses and dates. It is joined on-demand server-side using your authenticated sovereign session token.
          </p>
        </div>
      </div>

      {/* RECORDS LIST */}
      {isLoading ? (
        <div className="py-16 flex flex-col items-center justify-center space-y-3 text-neutral-500">
          <Loader2 className="w-8 h-8 text-[#0B3D91] animate-spin" />
          <span className="text-xs">Fetching verified medical records from MongoDB...</span>
        </div>
      ) : records.length === 0 ? (
        <div className="p-12 text-center text-xs text-neutral-500 rounded-lg bg-white border border-[#E0E0E0] space-y-3 shadow-sm">
          <Database className="w-8 h-8 text-neutral-400 mx-auto" />
          <p>No medical records on file for your authenticated account.</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded bg-white hover:bg-neutral-50 border border-[#0B3D91] text-[#0B3D91] font-bold text-xs"
          >
            + Create First Record
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {records.map((rec) => (
            <div
              key={rec.id}
              className="p-5 rounded-lg bg-white border border-[#E0E0E0] border-t-4 border-t-[#0B3D91] hover:shadow-md transition-all space-y-3 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded bg-[#FFF5EB] text-[#D66D10] text-[10px] font-bold border border-[#F5821F]/40">
                      Condition
                    </span>
                    <h3 className="font-bold text-sm text-[#0B3D91]">
                      {rec.condition}
                    </h3>
                  </div>

                  {rec.diagnosis && (
                    <p className="text-xs text-[#1A1A1A]">
                      <strong>Diagnosis:</strong> {rec.diagnosis}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-[#1E7A34] font-bold bg-green-50 px-2.5 py-1 rounded border border-green-200">
                    {new Date(rec.recordDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>

                  <button
                    onClick={() => handleDeleteRecord(rec.id)}
                    className="p-1.5 rounded bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-all"
                    title="Delete record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {(rec.doctorName || rec.facility) && (
                <div className="flex items-center gap-4 text-xs text-[#4B5563] pt-1">
                  {rec.doctorName && (
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#0B3D91]" />
                      <span>{rec.doctorName}</span>
                    </span>
                  )}
                  {rec.facility && (
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-[#0B3D91]" />
                      <span>{rec.facility}</span>
                    </span>
                  )}
                </div>
              )}

              {rec.notes && (
                <p className="text-xs text-[#1A1A1A] bg-[#F8FAFC] p-3 rounded border border-[#CBD5E1] leading-relaxed">
                  {rec.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ADD RECORD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-white border border-[#E0E0E0] rounded-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <h2 className="font-bold text-base text-[#0B3D91]">
                Add New Clinical Record
              </h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-neutral-400 hover:text-neutral-700 text-lg"
              >
                ×
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleAddRecord} className="space-y-4 text-xs font-sans">
              <div className="space-y-1">
                <label className="text-[11px] text-[#1A1A1A] font-bold block">Condition / Primary Complaint: *</label>
                <input
                  type="text"
                  required
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  placeholder="e.g. Paroxysmal Atrial Fibrillation"
                  className="w-full px-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] focus:outline-none focus:bg-white focus:border-[#0B3D91] text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-[#1A1A1A] font-bold block">Specific Diagnosis / Assessment:</label>
                <input
                  type="text"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="e.g. Recurrent episodes with elevated resting tachycardia"
                  className="w-full px-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] focus:outline-none focus:bg-white focus:border-[#0B3D91] text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-[#1A1A1A] font-bold block">Attending Doctor:</label>
                  <input
                    type="text"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    placeholder="Dr. R. Verma"
                    className="w-full px-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] focus:outline-none focus:bg-white focus:border-[#0B3D91] text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-[#1A1A1A] font-bold block">Facility / Hospital:</label>
                  <input
                    type="text"
                    value={facility}
                    onChange={(e) => setFacility(e.target.value)}
                    placeholder="AIIMS Central Hospital"
                    className="w-full px-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] focus:outline-none focus:bg-white focus:border-[#0B3D91] text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-[#1A1A1A] font-bold block">Date of Encounter: *</label>
                <input
                  type="date"
                  required
                  value={recordDate}
                  onChange={(e) => setRecordDate(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] focus:outline-none focus:bg-white focus:border-[#0B3D91] text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-[#1A1A1A] font-bold block">Clinical Notes:</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Additional observations, prescribed medications, follow-up..."
                  className="w-full px-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] focus:outline-none focus:bg-white focus:border-[#0B3D91] text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded text-xs font-bold text-neutral-500 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded bg-[#1E7A34] hover:bg-[#145524] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-2"
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
