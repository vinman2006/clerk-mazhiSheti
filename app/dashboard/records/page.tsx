'use client'

import React, { useState } from 'react'
import { 
  Database, 
  Lock, 
  ShieldCheck, 
  FileText, 
  ExternalLink, 
  Check, 
  Copy, 
  Eye, 
  EyeOff, 
  Plus, 
  X, 
  FileUp 
} from 'lucide-react'
import { useUserData } from '@/lib/userDataContext'
import { SimulatedBadge } from '@/components/ui/SimulatedBadge'
import { truncateHash } from '@/lib/utils'

export default function MedicalRecordsPage() {
  const { records, addRecord, profile } = useUserData()

  const [decryptedId, setDecryptedId] = useState<string | null>(null)
  const [copiedCid, setCopiedCid] = useState<string | null>(null)
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false)

  // Upload Form state
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<'Cardiology' | 'Hematology' | 'Endocrinology' | 'Imaging' | 'Vaccination'>('Cardiology')
  const [hospital, setHospital] = useState('AIIMS Central Hospital')
  const [doctor, setDoctor] = useState('Dr. Sarah Al-Mansoor, MD')
  const [summary, setSummary] = useState('')
  const [isEncrypting, setIsEncrypting] = useState(false)

  const handleCopy = (cid: string) => {
    navigator.clipboard.writeText(cid)
    setCopiedCid(cid)
    setTimeout(() => setCopiedCid(null), 2000)
  }

  const handleUploadRecord = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    setIsEncrypting(true)

    setTimeout(() => {
      const randomCid = `Qm${Array.from({ length: 44 }, () => 'abcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 36)]).join('')}`
      const randomKeyFp = `SHA256:${Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`

      addRecord({
        title,
        category,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        hospital,
        doctor,
        storageType: 'Decentralized Encrypted IPFS (Off-chain)',
        ipfsCid: randomCid,
        encryptionKeyFingerprint: randomKeyFp,
        summary: summary.trim() || `Diagnostic observation recorded for ${profile.name}. Parameters within standard clinical reference bounds.`,
        status: 'Encrypted & Off-Chain'
      })

      setIsEncrypting(false)
      setShowUploadModal(false)
      setTitle('')
      setSummary('')
    }, 1200)
  }

  return (
    <div className="space-y-6 text-[#1A1A1A]">
      {/* HEADER */}
      <div className="p-6 rounded-lg bg-white border border-[#E0E0E0] border-l-4 border-l-[#0B3D91] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-[#0B3D91]">
                Encrypted Health Records (आरोग्य दस्तऐवज व चाचणी अहवाल)
              </h1>
              <SimulatedBadge />
            </div>
            <p className="text-xs text-[#4B5563] mt-1">
              Health records and scans for <strong className="text-[#1A1A1A]">{profile.name}</strong> are encrypted client-side and pinned to decentralized IPFS. Zero raw clinical data on-chain.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2.5 rounded bg-[#1E7A34] hover:bg-[#145524] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Upload Record</span>
            </button>
            <span className="px-3 py-2 rounded bg-green-100 border border-green-300 text-[#1E7A34] text-xs font-bold shadow-sm">
              AES-GCM-256 ✓
            </span>
          </div>
        </div>

        {/* Privacy Framing Banner */}
        <div className="p-3 rounded bg-[#F8FAFC] border border-[#CBD5E1] border-l-4 border-l-[#1E7A34] flex items-center gap-3 text-xs text-[#4B5563]">
          <Lock className="w-4 h-4 text-[#1E7A34] shrink-0" />
          <span>
            Storage Architecture: The blockchain holds only consent access policies and cryptographic hashes. Encrypted payloads reside off-chain.
          </span>
        </div>
      </div>

      {/* RECORDS LIST */}
      <div className="space-y-4">
        {records.map((rec) => {
          const isDecrypted = decryptedId === rec.id

          return (
            <div
              key={rec.id}
              className="p-5 rounded-lg bg-white border border-[#E0E0E0] border-t-4 border-t-[#0B3D91] hover:shadow-md transition-all space-y-4 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded bg-[#FFF5EB] text-[#D66D10] text-[10px] border border-[#F5821F]/40 font-bold">
                      {rec.category}
                    </span>
                    <h3 className="font-bold text-sm text-[#0B3D91]">
                      {rec.title}
                    </h3>
                  </div>
                  <span className="text-xs text-[#4B5563]">
                    {rec.hospital} • {rec.doctor} • {rec.date}
                  </span>
                </div>

                {/* Decrypt Toggle */}
                <button
                  onClick={() => setDecryptedId(isDecrypted ? null : rec.id)}
                  className={`px-3.5 py-2 rounded text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                    isDecrypted
                      ? 'bg-[#1E7A34] hover:bg-[#145524] text-white'
                      : 'bg-white hover:bg-neutral-50 text-[#0B3D91] border border-[#0B3D91]'
                  }`}
                >
                  {isDecrypted ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{isDecrypted ? 'Hide Decrypted View' : 'Decrypt with Local Key'}</span>
                </button>
              </div>

              {/* Cryptographic IPFS Details */}
              <div className="p-3.5 rounded bg-[#F8FAFC] border border-[#CBD5E1] font-mono text-xs space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-neutral-600">
                  <div className="flex items-center gap-2">
                    <span className="text-[#0B3D91] font-bold">IPFS Content Identifier (CID):</span>
                    <span className="text-neutral-900 select-all">{truncateHash(rec.ipfsCid, 12, 10)}</span>
                  </div>

                  <button
                    onClick={() => handleCopy(rec.ipfsCid)}
                    className="flex items-center gap-1 text-[10px] text-[#D66D10] hover:underline font-bold"
                  >
                    {copiedCid === rec.ipfsCid ? <Check className="w-3 h-3 text-[#1E7A34]" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCid === rec.ipfsCid ? 'Copied' : 'Copy CID'}</span>
                  </button>
                </div>

                <div className="flex justify-between text-[11px] text-neutral-600">
                  <span>Enclave Key Fingerprint:</span>
                  <span className="text-neutral-900 font-semibold">{rec.encryptionKeyFingerprint}</span>
                </div>
              </div>

              {/* Decrypted Payload Preview */}
              {isDecrypted && (
                <div className="p-4 rounded bg-emerald-50/40 border border-[#1E7A34]/30 border-l-4 border-l-[#1E7A34] space-y-3 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-[#1E7A34] font-bold border-b border-emerald-100 pb-2">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Decrypted Diagnostic Summary</span>
                    </span>
                    <span className="text-[10px] text-neutral-500">Zero-Knowledge Verification Passed ✓</span>
                  </div>
                  <p className="text-neutral-800 leading-relaxed text-xs pt-1">
                    {rec.summary}
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const payload = {
                          recordId: rec.id,
                          title: rec.title,
                          category: rec.category,
                          ipfsCid: rec.ipfsCid,
                          keyFingerprint: rec.encryptionKeyFingerprint,
                          summary: rec.summary,
                          facility: rec.hospital,
                          doctor: rec.doctor,
                          date: rec.date,
                          custodySignature: `ED25519_SIG_${rec.ipfsCid.slice(0, 16)}`
                        }
                        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
                        const url = URL.createObjectURL(blob)
                        const a = document.createElement('a')
                        a.href = url
                        a.download = `medical-record-${rec.category.toLowerCase()}-${rec.id}.json`
                        a.click()
                        URL.revokeObjectURL(url)
                      }}
                      className="px-3 py-1.5 rounded bg-white hover:bg-neutral-50 border border-[#CBD5E1] text-[#0B3D91] text-[11px] font-bold transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Download Encrypted JSON</span>
                    </button>

                    <a
                      href="/dashboard/audit"
                      className="px-3 py-1.5 rounded bg-white hover:bg-neutral-50 border border-[#CBD5E1] text-[#1E7A34] text-[11px] font-bold transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Verify Hash in Audit Trail</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* UPLOAD NEW ENCRYPTED RECORD MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-white border border-[#E0E0E0] rounded-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div className="flex items-center gap-2 text-[#0B3D91] font-bold text-sm">
                <FileUp className="w-4 h-4 text-[#F5821F]" />
                <span>Upload & Encrypt Medical Record</span>
              </div>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadRecord} className="space-y-4 text-xs font-sans">
              <div className="space-y-1">
                <label className="text-[11px] text-[#1A1A1A] font-bold block">Record Title:</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Holter Monitor 48-Hour ECG Log"
                  className="w-full px-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] focus:outline-none focus:bg-white focus:border-[#0B3D91] text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-[#1A1A1A] font-bold block">Category:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] focus:outline-none focus:bg-white focus:border-[#0B3D91] text-xs"
                  >
                    <option value="Cardiology">Cardiology</option>
                    <option value="Hematology">Hematology (Blood Panels)</option>
                    <option value="Endocrinology">Endocrinology</option>
                    <option value="Imaging">Imaging (MRI / CT / Ultrasound)</option>
                    <option value="Vaccination">Vaccination & Immunization</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-[#1A1A1A] font-bold block">Issuing Hospital:</label>
                  <select
                    value={hospital}
                    onChange={(e) => setHospital(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] focus:outline-none focus:bg-white focus:border-[#0B3D91] text-xs"
                  >
                    <option>AIIMS Central Hospital</option>
                    <option>Apollo Multi-Specialty Centre</option>
                    <option>Fortis Healthcare Hospital</option>
                    <option>District Civil Hospital</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-[#1A1A1A] font-bold block">Diagnostic Observations / Summary:</label>
                <textarea
                  rows={3}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Enter diagnostic report summary or clinical notes..."
                  className="w-full px-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] focus:outline-none focus:bg-white focus:border-[#0B3D91] text-xs"
                />
              </div>

              <div className="p-3 rounded bg-neutral-50 border border-neutral-200 text-[11px] text-neutral-700 space-y-1">
                <div className="text-[#1E7A34] font-bold flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Client-Side Enclave Encryption</span>
                </div>
                <p className="text-[10px] text-neutral-500">
                  Payload will be encrypted with your Ed25519 public key before generating decentralized IPFS hash.
                </p>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded text-xs font-bold text-neutral-500 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isEncrypting}
                  className="px-6 py-2 rounded bg-[#1E7A34] hover:bg-[#145524] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{isEncrypting ? 'Encrypting & Pinning...' : 'Encrypt & Pin to IPFS'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
