'use client'

import React, { useState } from 'react'
import { 
  Database, 
  Lock, 
  ShieldCheck, 
  FileText, 
  Key, 
  ExternalLink, 
  Check, 
  Copy, 
  Eye, 
  EyeOff, 
  Sparkles,
  Plus,
  Upload,
  X,
  CheckCircle2,
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
  const [hospital, setHospital] = useState('Apex Heart & Vascular Institute')
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
    <div className="space-y-6">
      {/* HEADER */}
      <div className="p-6 rounded-xl bg-[#141826] border-2 border-[#1E3A8A] shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-black text-2xl text-white">
                Off-Chain Encrypted Medical Records
              </h1>
              <SimulatedBadge />
            </div>
            <p className="text-xs font-sans text-neutral-300 mt-1">
              Health records and scans for <strong className="text-white">{profile.name}</strong> are encrypted client-side and pinned to decentralized IPFS. Zero raw PHI on-chain.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2.5 rounded-lg bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md font-mono flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Upload Record</span>
            </button>
            <span className="px-3 py-2 rounded-md bg-[#101420] border-2 border-portal-green text-portal-green font-mono text-xs font-bold shadow-sm">
              AES-GCM-256 ✓
            </span>
          </div>
        </div>

        {/* Privacy Framing Banner */}
        <div className="p-4 rounded-lg bg-[#101420] border border-neutral-700 border-l-4 border-l-portal-green flex items-center gap-3 text-xs font-mono text-neutral-300">
          <Lock className="w-4 h-4 text-portal-green shrink-0" />
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
              className="p-5 rounded-xl bg-[#141826] border border-neutral-700 border-l-4 border-l-portal-orange hover:border-neutral-600 transition-all space-y-4 shadow-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded bg-portal-orange/20 text-portal-orange text-[10px] font-mono border border-portal-orange/40 font-bold">
                      {rec.category}
                    </span>
                    <h3 className="font-sans font-bold text-sm text-white">
                      {rec.title}
                    </h3>
                  </div>
                  <span className="text-xs font-sans text-neutral-300">
                    {rec.hospital} • {rec.doctor} • {rec.date}
                  </span>
                </div>

                {/* Decrypt Toggle */}
                <button
                  onClick={() => setDecryptedId(isDecrypted ? null : rec.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                    isDecrypted
                      ? 'bg-[#2E7D32] hover:bg-[#256629] text-white'
                      : 'bg-[#101420] hover:bg-[#182033] text-portal-orange border border-neutral-700'
                  }`}
                >
                  {isDecrypted ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{isDecrypted ? 'Hide Decrypted View' : 'Decrypt with Local Key'}</span>
                </button>
              </div>

              {/* Cryptographic IPFS Details */}
              <div className="p-3.5 rounded-lg bg-[#101420] border border-neutral-700 font-mono text-xs space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-neutral-400">
                  <div className="flex items-center gap-2">
                    <span className="text-portal-orange font-bold">IPFS Content Identifier (CID):</span>
                    <span className="text-neutral-200 select-all">{truncateHash(rec.ipfsCid, 12, 10)}</span>
                  </div>

                  <button
                    onClick={() => handleCopy(rec.ipfsCid)}
                    className="flex items-center gap-1 text-[10px] text-portal-orange hover:underline font-bold"
                  >
                    {copiedCid === rec.ipfsCid ? <Check className="w-3 h-3 text-portal-green" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCid === rec.ipfsCid ? 'Copied' : 'Copy CID'}</span>
                  </button>
                </div>

                <div className="flex justify-between text-[11px] text-neutral-400">
                  <span>Enclave Key Fingerprint:</span>
                  <span className="text-white font-semibold">{rec.encryptionKeyFingerprint}</span>
                </div>
              </div>

              {/* Decrypted Payload Preview */}
              {isDecrypted && (
                <div className="p-4 rounded-lg bg-[#101420] border border-neutral-700 border-l-4 border-l-portal-green space-y-2 text-xs font-sans animate-in fade-in duration-200">
                  <div className="flex items-center justify-between font-mono text-[11px] text-portal-green font-bold border-b border-neutral-700 pb-2">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Decrypted Diagnostic Summary</span>
                    </span>
                    <span className="text-[10px] text-neutral-400">Zero-Knowledge Verification Passed ✓</span>
                  </div>
                  <p className="text-neutral-200 leading-relaxed font-mono text-xs pt-1">
                    {rec.summary}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* UPLOAD NEW ENCRYPTED RECORD MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-[#141826] border-2 border-[#1E3A8A] rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-700 pb-3">
              <div className="flex items-center gap-2 text-portal-orange font-mono font-bold text-sm">
                <FileUp className="w-4 h-4" />
                <span>Upload & Encrypt Medical Record</span>
              </div>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadRecord} className="space-y-4 text-xs font-sans">
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Record Title:</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Holter Monitor 48-Hour ECG Log"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-white focus:outline-none focus:border-portal-orange text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Category:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-white focus:outline-none focus:border-portal-orange text-xs"
                  >
                    <option value="Cardiology">Cardiology</option>
                    <option value="Hematology">Hematology (Blood Panels)</option>
                    <option value="Endocrinology">Endocrinology</option>
                    <option value="Imaging">Imaging (MRI / CT / Ultrasound)</option>
                    <option value="Vaccination">Vaccination & Immunization</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Issuing Hospital:</label>
                  <select
                    value={hospital}
                    onChange={(e) => setHospital(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-white focus:outline-none focus:border-portal-orange text-xs"
                  >
                    <option>Apex Heart & Vascular Institute</option>
                    <option>City Care Academic Health System</option>
                    <option>Metropolitan General Hospital</option>
                    <option>OmniDiagnostics Central Lab</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Diagnostic Observations / Summary:</label>
                <textarea
                  rows={3}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Enter diagnostic report summary or clinical notes..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-white focus:outline-none focus:border-portal-orange text-xs"
                />
              </div>

              <div className="p-3.5 rounded-lg bg-[#101420] border border-neutral-700 font-mono text-[11px] text-neutral-300 space-y-1">
                <div className="text-portal-green font-bold flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Client-Side Enclave Encryption</span>
                </div>
                <p className="text-[10px] text-neutral-400">
                  Payload will be encrypted with your Ed25519 public key before generating decentralized IPFS hash.
                </p>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2.5 rounded-lg text-xs font-mono font-bold text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isEncrypting}
                  className="px-6 py-2.5 rounded-lg bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs uppercase tracking-wider font-mono shadow-md transition-all flex items-center gap-2"
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
