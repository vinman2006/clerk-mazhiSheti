'use client'

import React, { useState } from 'react'
import { 
  User, 
  KeyRound, 
  ShieldCheck, 
  Heart, 
  MapPin, 
  Check, 
  Lock, 
  Save, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  RefreshCw,
  Shield,
  Zap,
  Sparkles
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
    isDustSponsored, 
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
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* HEADER */}
      <div className="p-6 rounded-xl bg-[#141826] border-2 border-[#1E3A8A] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-black text-2xl text-white">
              Sovereign Health Profile & Key Vault
            </h1>
            <SimulatedBadge />
          </div>
          <p className="text-xs font-sans text-neutral-300 mt-1">
            Manage your personal demographic and clinical parameters. Changes are signed client-side and logged on-chain.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <VerifiedBadge entity="W3C DID Verified" did={profile.did} />
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* SECTION 1: IDENTITY & CRYPTOGRAPHIC KEYS */}
        <div className="p-6 rounded-xl bg-[#141826] border border-neutral-700 space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-neutral-700 pb-3">
            <div className="flex items-center gap-2 text-portal-orange font-mono font-bold text-xs">
              <KeyRound className="w-4 h-4" />
              <span>Decentralized Identity & Enclave Keys</span>
            </div>
            <span className="text-[10px] font-mono text-portal-green font-bold">100% Client-Side Custody ✓</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            <div className="space-y-1.5">
              <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Decentralized Identifier (DID):</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={profile.did}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-portal-orange font-mono text-xs focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleCopyDid}
                  className="px-3 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-neutral-300 hover:text-white"
                >
                  {copiedDid ? <Check className="w-4 h-4 text-portal-green" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Enclave Key Fingerprint:</label>
              <input
                type="text"
                readOnly
                value={profile.encryptionKeyFingerprint}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-portal-green font-mono text-xs focus:outline-none"
              />
            </div>

            {/* 1AM Midnight Wallet Address */}
            <div className="space-y-1.5 sm:col-span-2 p-3.5 rounded-lg bg-[#101420] border border-portal-orange/40">
              <div className="flex items-center justify-between">
                <label className="font-mono text-[11px] text-portal-orange font-bold uppercase flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  <span>1AM Midnight Blockchain Wallet:</span>
                </label>
                <span className="text-[10px] font-mono text-portal-green font-bold">
                  {isConnected ? `Connected (${network} - Dust-Free)` : 'Not Connected'}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  readOnly
                  value={isConnected ? address || '' : 'No 1AM Wallet connected. Click connect below to link.'}
                  className="w-full px-3.5 py-2 rounded bg-[#141826] border border-neutral-700 text-white font-mono text-xs focus:outline-none"
                />
                {isConnected ? (
                  <>
                    <button
                      type="button"
                      onClick={handleCopyWallet}
                      className="px-3 py-2 rounded bg-[#141826] border border-neutral-700 text-neutral-300 hover:text-white"
                      title="Copy Address"
                    >
                      {copiedWallet ? <Check className="w-4 h-4 text-portal-green" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={disconnect}
                      className="px-3 py-2 rounded bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-mono font-bold"
                    >
                      Disconnect
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => connect('preprod')}
                    disabled={isConnecting}
                    className="px-4 py-2 rounded bg-portal-orange hover:bg-[#e07507] text-white text-xs font-mono font-bold whitespace-nowrap shadow-sm"
                  >
                    {isConnecting ? 'Connecting...' : 'Connect 1AM'}
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
              className="px-4 py-2 rounded-lg bg-[#101420] hover:bg-[#182033] border border-neutral-700 text-portal-orange text-xs font-mono font-bold transition-all flex items-center gap-1.5"
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
              className="px-4 py-2 rounded-lg bg-[#101420] hover:bg-[#182033] border border-neutral-700 text-neutral-200 hover:text-white text-xs font-mono font-bold transition-all flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-portal-green" />
              <span>Export Encrypted Vault Backup</span>
            </button>
          </div>
        </div>

        {/* SECTION 2: PERSONAL DEMOGRAPHICS */}
        <div className="p-6 rounded-xl bg-[#141826] border border-neutral-700 space-y-4 shadow-lg">
          <div className="border-b border-neutral-700 pb-3 flex items-center justify-between">
            <h2 className="font-display font-black text-sm text-white">
              1. Personal Demographics
            </h2>
            <span className="text-[10px] font-mono text-neutral-400">Basic Sovereign Parameters</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            <div className="space-y-1.5">
              <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Full Legal Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-white focus:outline-none focus:border-portal-orange text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Date of Birth:</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-white focus:outline-none focus:border-portal-orange text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Biological Gender:</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-white focus:outline-none focus:border-portal-orange text-xs"
              >
                <option>Female</option>
                <option>Male</option>
                <option>Non-Binary / Other</option>
                <option>Prefer not to say</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Blood Group:</label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-white focus:outline-none focus:border-portal-orange text-xs"
              >
                {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(bg => (
                  <option key={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Residential Health District:</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-white focus:outline-none focus:border-portal-orange text-xs"
              >
                <option>Metropolis Medical District (District 4)</option>
                <option>Capital Health Zone (District 1)</option>
                <option>High-Altitude Regional Sector (District 7)</option>
                <option>Suburban Academic Network (District 3)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Emergency Contact:</label>
              <input
                type="text"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-white focus:outline-none focus:border-portal-orange text-xs"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: MEDICAL ALLERGIES & CHRONIC CONDITIONS */}
        <div className="p-6 rounded-xl bg-[#141826] border border-neutral-700 space-y-5 shadow-lg">
          <div className="border-b border-neutral-700 pb-3 flex items-center justify-between">
            <h2 className="font-display font-black text-sm text-white">
              2. Clinical Context & Focus Areas
            </h2>
            <span className="text-[10px] font-mono text-portal-orange font-bold">Informs Local AI Agents</span>
          </div>

          {/* Allergies */}
          <div className="space-y-2 text-xs font-sans">
            <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Documented Allergies:</label>
            <div className="flex flex-wrap gap-2">
              {allergies.map((alg) => (
                <span
                  key={alg}
                  className="px-3 py-1.5 rounded-md bg-portal-orange/20 border border-portal-orange/40 text-portal-orange font-mono font-bold flex items-center gap-1.5"
                >
                  <span>{alg}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAllergy(alg)}
                    className="hover:text-white font-bold ml-1"
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
                className="px-3 py-1.5 rounded-md bg-[#101420] border border-neutral-700 text-white text-xs flex-1 focus:outline-none focus:border-portal-orange"
              />
              <button
                type="button"
                onClick={handleAddAllergy}
                className="px-3 py-1.5 rounded-md bg-[#101420] hover:bg-[#182033] border border-neutral-700 text-portal-orange font-mono font-bold text-xs"
              >
                + Add
              </button>
            </div>
          </div>

          {/* Conditions */}
          <div className="space-y-2 text-xs font-sans pt-2 border-t border-neutral-700/60">
            <label className="font-mono text-[11px] text-neutral-300 font-bold uppercase">Chronic Conditions / Active Diagnoses:</label>
            <div className="flex flex-wrap gap-2">
              {conditions.map((cnd) => (
                <span
                  key={cnd}
                  className="px-3 py-1.5 rounded-md bg-portal-green/20 border border-portal-green/40 text-portal-green font-mono font-bold flex items-center gap-1.5"
                >
                  <span>{cnd}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCondition(cnd)}
                    className="hover:text-white font-bold ml-1"
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
                className="px-3 py-1.5 rounded-md bg-[#101420] border border-neutral-700 text-white text-xs flex-1 focus:outline-none focus:border-portal-orange"
              />
              <button
                type="button"
                onClick={handleAddCondition}
                className="px-3 py-1.5 rounded-md bg-[#101420] hover:bg-[#182033] border border-neutral-700 text-portal-green font-mono font-bold text-xs"
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
            className="px-4 py-2.5 rounded-lg text-xs font-mono font-bold text-neutral-400 hover:text-red-400 transition-colors"
          >
            Reset to Defaults
          </button>

          <div className="flex items-center gap-3">
            {saved && (
              <span className="text-xs font-mono font-bold text-portal-green flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Profile Updated & Signed On-Chain!</span>
              </span>
            )}
            <button
              type="submit"
              className="px-8 py-3.5 rounded-lg bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md font-mono flex items-center gap-2"
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
