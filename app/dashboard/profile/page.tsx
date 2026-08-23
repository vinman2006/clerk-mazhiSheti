'use client'

import React, { useState } from 'react'
import { 
  User, 
  KeyRound, 
  ShieldCheck, 
  Check, 
  Lock, 
  Save, 
  CheckCircle2, 
  Copy, 
  RefreshCw, 
  Shield 
} from 'lucide-react'
import { useUserData } from '@/lib/userDataContext'
import { useWallet } from '@/lib/walletContext'
import { SimulatedBadge } from '@/components/ui/SimulatedBadge'
import { VerifiedBadge } from '@/components/ui/VerifiedBadge'

export default function ProfilePage() {
  const { profile, updateProfile, resetToDefaults } = useUserData()
  const { 
    isConnected, 
    isConnecting, 
    address, 
    shieldedCoinPublicKey, 
    network, 
    connect, 
    disconnect 
  } = useWallet()

  const [name, setName] = useState(profile.name)
  const [dob, setDob] = useState(profile.dob)
  const [gender, setGender] = useState(profile.gender)
  const [bloodGroup, setBloodGroup] = useState(profile.bloodGroup)
  const [district, setDistrict] = useState(profile.district)
  const [emergencyContact, setEmergencyContact] = useState(profile.emergencyContact)
  const [allergies, setAllergies] = useState<string[]>(profile.allergies || [])
  const [conditions, setConditions] = useState<string[]>(profile.chronicConditions || [])
  const [customAllergy, setCustomAllergy] = useState('')
  const [customCondition, setCustomCondition] = useState('')
  
  const [saved, setSaved] = useState(false)
  const [copiedDid, setCopiedDid] = useState(false)
  const [copiedWallet, setCopiedWallet] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile({
      name,
      dob,
      gender,
      bloodGroup,
      district,
      emergencyContact,
      allergies,
      chronicConditions: conditions
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleAddAllergy = () => {
    if (customAllergy.trim() && !allergies.includes(customAllergy.trim())) {
      setAllergies([...allergies, customAllergy.trim()])
      setCustomAllergy('')
    }
  }

  const handleRemoveAllergy = (item: string) => {
    setAllergies(allergies.filter(a => a !== item))
  }

  const handleAddCondition = () => {
    if (customCondition.trim() && !conditions.includes(customCondition.trim())) {
      setConditions([...conditions, customCondition.trim()])
      setCustomCondition('')
    }
  }

  const handleRemoveCondition = (item: string) => {
    setConditions(conditions.filter(c => c !== item))
  }

  const handleCopyDid = () => {
    navigator.clipboard.writeText(profile.did)
    setCopiedDid(true)
    setTimeout(() => setCopiedDid(false), 2000)
  }

  const handleCopyWallet = () => {
    if (address || profile.walletAddress) {
      navigator.clipboard.writeText(address || profile.walletAddress)
      setCopiedWallet(true)
      setTimeout(() => setCopiedWallet(false), 2000)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-[#1A1A1A]">
      {/* HEADER */}
      <div className="p-6 rounded-lg bg-white border border-[#E0E0E0] border-l-4 border-l-[#0B3D91] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-[#0B3D91]">
              Sovereign Health Profile & Key Vault (नागरिक प्रोफाईल व ओळख तिजोरी)
            </h1>
            <SimulatedBadge />
          </div>
          <p className="text-xs text-[#4B5563] mt-1">
            Manage your personal demographic and clinical parameters. Changes are signed client-side and logged on-chain.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <VerifiedBadge entity="W3C DID Verified" did={profile.did} />
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* SECTION 1: IDENTITY & CRYPTOGRAPHIC KEYS */}
        <div className="p-6 rounded-lg bg-white border border-[#E0E0E0] border-t-4 border-t-[#0B3D91] space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <div className="flex items-center gap-2 text-[#0B3D91] font-bold text-xs">
              <KeyRound className="w-4 h-4 text-[#F5821F]" />
              <span>Decentralized Identity & Enclave Keys</span>
            </div>
            <span className="text-[10px] text-[#1E7A34] font-bold">100% Client-Side Custody ✓</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            <div className="space-y-1">
              <label className="text-[11px] text-[#1A1A1A] font-bold block">Decentralized Identifier (DID):</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={profile.did}
                  className="w-full px-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#D66D10] font-mono text-xs focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleCopyDid}
                  className="px-3 py-2 rounded bg-white hover:bg-neutral-50 border border-[#CBD5E1] text-neutral-600 hover:text-black"
                >
                  {copiedDid ? <Check className="w-4 h-4 text-[#1E7A34]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-[#1A1A1A] font-bold block">Enclave Key Fingerprint:</label>
              <input
                type="text"
                readOnly
                value={profile.encryptionKeyFingerprint}
                className="w-full px-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1E7A34] font-mono text-xs focus:outline-none"
              />
            </div>

            {/* 1AM Midnight Wallet Address */}
            <div className="space-y-1 sm:col-span-2 p-3.5 rounded bg-[#F8FAFC] border border-[#CBD5E1]">
              <div className="flex items-center justify-between">
                <label className="text-[11px] text-[#0B3D91] font-bold flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#F5821F]" />
                  <span>1AM Midnight Blockchain Wallet:</span>
                </label>
                <span className="text-[10px] text-[#1E7A34] font-bold">
                  {isConnected ? `Connected (${network} - Localnet)` : 'Not Connected'}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                <input
                  type="text"
                  readOnly
                  value={isConnected ? address || '' : 'No 1AM Wallet connected. Click connect below to link.'}
                  className="w-full px-3 py-2 rounded bg-white border border-[#CBD5E1] text-[#1A1A1A] font-mono text-xs focus:outline-none"
                />
                {isConnected ? (
                  <>
                    <button
                      type="button"
                      onClick={handleCopyWallet}
                      className="px-3 py-2 rounded bg-white border border-[#CBD5E1] text-neutral-600 hover:text-black"
                      title="Copy Address"
                    >
                      {copiedWallet ? <Check className="w-4 h-4 text-[#1E7A34]" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={disconnect}
                      className="px-3 py-2 rounded bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold"
                    >
                      Disconnect
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => connect('localnet')}
                    disabled={isConnecting}
                    className="px-4 py-2 rounded bg-[#F5821F] hover:bg-[#D66D10] text-white text-xs font-bold whitespace-nowrap shadow-sm"
                  >
                    {isConnecting ? 'Connecting...' : 'Connect 1AM (Localnet)'}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                const newDid = `did:nexora:pat:${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 6)}`
                updateProfile({
                  did: newDid,
                  encryptionKeyFingerprint: `SHA256:${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 6)}`
                })
                setSaved(true)
                setTimeout(() => setSaved(false), 2500)
              }}
              className="px-4 py-2 rounded bg-white hover:bg-neutral-50 border border-[#0B3D91] text-[#0B3D91] text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Rotate Enclave Keys & DID</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const backupData = {
                  enclaveVersion: 'Nexora-v1.0.4',
                  did: profile.did,
                  fingerprint: profile.encryptionKeyFingerprint,
                  wallet: address || profile.walletAddress,
                  shieldedCoinPublicKey: shieldedCoinPublicKey || '0x3a9f8c...39b2',
                  network: network,
                  exportDate: new Date().toISOString(),
                  custody: 'Client-Side Self-Sovereign AES-GCM-256'
                }
                const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `nexora-vault-backup-${profile.did.slice(-8)}.json`
                a.click()
                URL.revokeObjectURL(url)
              }}
              className="px-4 py-2 rounded bg-white hover:bg-neutral-50 border border-[#CBD5E1] text-[#1A1A1A] text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Lock className="w-3.5 h-3.5 text-[#1E7A34]" />
              <span>Export Encrypted Vault Backup</span>
            </button>
          </div>
        </div>

        {/* SECTION 2: PERSONAL DEMOGRAPHICS */}
        <div className="p-6 rounded-lg bg-white border border-[#E0E0E0] border-t-4 border-t-[#0B3D91] space-y-4 shadow-sm">
          <div className="border-b border-neutral-100 pb-3 flex items-center justify-between">
            <h2 className="font-bold text-sm text-[#0B3D91]">
              1. Personal Demographics
            </h2>
            <span className="text-[10px] text-neutral-500">Basic Citizen Parameters</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            <div className="space-y-1">
              <label className="text-[11px] text-[#1A1A1A] font-bold block">Full Legal Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] focus:outline-none focus:bg-white focus:border-[#0B3D91] text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-[#1A1A1A] font-bold block">Date of Birth:</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] focus:outline-none focus:bg-white focus:border-[#0B3D91] text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-[#1A1A1A] font-bold block">Biological Gender:</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] focus:outline-none focus:bg-white focus:border-[#0B3D91] text-xs"
              >
                <option>Female</option>
                <option>Male</option>
                <option>Non-Binary / Other</option>
                <option>Prefer not to say</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-[#1A1A1A] font-bold block">Blood Group:</label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] focus:outline-none focus:bg-white focus:border-[#0B3D91] text-xs"
              >
                {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(bg => (
                  <option key={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-[#1A1A1A] font-bold block">Residential Health District:</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] focus:outline-none focus:bg-white focus:border-[#0B3D91] text-xs"
              >
                <option>Nagpur Municipal Corporation (Umred Region)</option>
                <option>Metropolis Medical District (District 4)</option>
                <option>Capital Health Zone (District 1)</option>
                <option>High-Altitude Regional Sector (District 7)</option>
                <option>Suburban Academic Network (District 3)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-[#1A1A1A] font-bold block">Emergency Contact:</label>
              <input
                type="text"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] focus:outline-none focus:bg-white focus:border-[#0B3D91] text-xs"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: MEDICAL ALLERGIES & CHRONIC CONDITIONS */}
        <div className="p-6 rounded-lg bg-white border border-[#E0E0E0] border-t-4 border-t-[#0B3D91] space-y-5 shadow-sm">
          <div className="border-b border-neutral-100 pb-3 flex items-center justify-between">
            <h2 className="font-bold text-sm text-[#0B3D91]">
              2. Clinical Context & Focus Areas
            </h2>
            <span className="text-[10px] text-[#D66D10] font-bold">Informs Local AI Agents</span>
          </div>

          {/* Allergies */}
          <div className="space-y-2 text-xs font-sans">
            <label className="text-[11px] text-[#1A1A1A] font-bold block">Documented Allergies:</label>
            <div className="flex flex-wrap gap-2">
              {allergies.map((alg) => (
                <span
                  key={alg}
                  className="px-3 py-1.5 rounded bg-amber-50 border border-[#F5821F]/40 text-[#D66D10] font-bold flex items-center gap-1.5"
                >
                  <span>{alg}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAllergy(alg)}
                    className="hover:text-red-700 font-bold ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2 pt-1 max-w-sm">
              <input
                type="text"
                value={customAllergy}
                onChange={(e) => setCustomAllergy(e.target.value)}
                placeholder="Add custom allergy..."
                className="px-3 py-1.5 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] text-xs flex-1 focus:outline-none focus:bg-white focus:border-[#0B3D91]"
              />
              <button
                type="button"
                onClick={handleAddAllergy}
                className="px-3 py-1.5 rounded bg-white hover:bg-neutral-50 border border-[#CBD5E1] text-[#0B3D91] font-bold text-xs"
              >
                + Add
              </button>
            </div>
          </div>

          {/* Conditions */}
          <div className="space-y-2 text-xs font-sans pt-2 border-t border-neutral-100">
            <label className="text-[11px] text-[#1A1A1A] font-bold block">Chronic Conditions / Active Diagnoses:</label>
            <div className="flex flex-wrap gap-2">
              {conditions.map((cnd) => (
                <span
                  key={cnd}
                  className="px-3 py-1.5 rounded bg-green-50 border border-green-300 text-[#1E7A34] font-bold flex items-center gap-1.5"
                >
                  <span>{cnd}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCondition(cnd)}
                    className="hover:text-red-700 font-bold ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2 pt-1 max-w-sm">
              <input
                type="text"
                value={customCondition}
                onChange={(e) => setCustomCondition(e.target.value)}
                placeholder="Add custom condition..."
                className="px-3 py-1.5 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] text-xs flex-1 focus:outline-none focus:bg-white focus:border-[#0B3D91]"
              />
              <button
                type="button"
                onClick={handleAddCondition}
                className="px-3 py-1.5 rounded bg-white hover:bg-neutral-50 border border-[#CBD5E1] text-[#1E7A34] font-bold text-xs"
              >
                + Add
              </button>
            </div>
          </div>
        </div>

        {/* SAVE & RESET ACTIONS */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={resetToDefaults}
            className="px-4 py-2.5 rounded text-xs font-bold text-neutral-500 hover:text-red-600 transition-colors"
          >
            Reset to Defaults
          </button>

          <div className="flex items-center gap-3">
            {saved && (
              <span className="text-xs font-bold text-[#1E7A34] flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Profile Updated & Signed On-Chain!</span>
              </span>
            )}
            <button
              type="submit"
              className="px-8 py-3 rounded bg-[#1E7A34] hover:bg-[#145524] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save & Sign Profile</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
