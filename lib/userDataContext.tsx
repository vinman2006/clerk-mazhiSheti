'use client'

import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { useAuth } from './authContext'
import { MOCK_RECORDS, MOCK_CONSENTS, MOCK_AUDIT_TRAIL, MedicalRecord, ConsentRecord, AuditEntry } from './mockData'

export interface PatientProfileData {
  name: string
  email: string
  avatarUrl: string
  did: string
  dob: string
  gender: string
  bloodGroup: string
  allergies: string[]
  chronicConditions: string[]
  district: string
  emergencyContact: string
  walletAddress: string
  encryptionKeyFingerprint: string
}

export interface UserAppointment {
  id: string
  doctor: string
  specialty: string
  hospital: string
  avatarUrl: string
  did: string
  day: string
  time: string
  type: string
  status: string
  consentId: string
  copay: string
  txHash: string
}

interface UserDataContextType {
  profile: PatientProfileData
  records: MedicalRecord[]
  appointments: UserAppointment[]
  consents: ConsentRecord[]
  auditTrail: AuditEntry[]
  hasCompletedOnboarding: boolean
  isDbSynced: boolean
  updateProfile: (updated: Partial<PatientProfileData>) => void
  completeOnboarding: (data: Partial<PatientProfileData>) => void
  addRecord: (record: Omit<MedicalRecord, 'id'>) => void
  addAppointment: (appointment: Omit<UserAppointment, 'id'>) => string
  cancelAppointment: (id: string) => void
  grantConsent: (consent: Omit<ConsentRecord, 'id' | 'grantedAt' | 'status' | 'txHash'>) => string
  revokeConsent: (id: string) => void
  addAuditEntry: (entry: Omit<AuditEntry, 'id' | 'timestamp' | 'blockNumber'>) => void
  resetToDefaults: () => void
}

const STORAGE_KEY = 'nexora_patient_state_v1'

const defaultInitialProfile: PatientProfileData = {
  name: 'Elena Rostova',
  email: 'elena.rostova@nexus.id',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  did: 'did:nexora:pat:8f9a2c1b84e031da',
  dob: '1992-04-14',
  gender: 'Female',
  bloodGroup: 'O+',
  allergies: ['Penicillin', 'Sulfa drugs'],
  chronicConditions: ['Mild Arrhythmia', 'Elevated LDL'],
  district: 'Metropolis Medical District (District 4)',
  emergencyContact: '+1 (555) 382-9014',
  walletAddress: '0x71C8...39B2',
  encryptionKeyFingerprint: 'SHA256:4f8a92b...e01c'
}

const defaultInitialAppointments: UserAppointment[] = [
  {
    id: 'apt_01',
    doctor: 'Dr. Sarah Al-Mansoor, MD',
    specialty: 'Cardiology',
    hospital: 'Apex Heart & Vascular Institute',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80',
    did: 'did:nexora:prov:card:91a',
    day: 'Wednesday, Aug 27, 2026',
    time: '09:30 AM',
    type: 'Acute Cardiovascular Evaluation',
    status: 'Confirmed',
    consentId: 'cns_8910a72f',
    copay: '$0.00 (Tier-1 ZK Subsidy Verified)',
    txHash: '0x39f0184...b920'
  },
  {
    id: 'apt_02',
    doctor: 'Dr. Julian Thorne, MD, PhD',
    specialty: 'Neurology',
    hospital: 'City Care Academic Health System',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80',
    did: 'did:nexora:prov:neuro:44b',
    day: 'Monday, Sep 1, 2026',
    time: '01:30 PM',
    type: 'Neuro-Telemetry Follow-up',
    status: 'Scheduled',
    consentId: 'cns_9941b21e',
    copay: '$25.00',
    txHash: '0x8841029...77a1'
  }
]

const UserDataContext = createContext<UserDataContextType | undefined>(undefined)

export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const { firebaseUser } = useAuth()

  const [profile, setProfile] = useState<PatientProfileData>(defaultInitialProfile)
  const [records, setRecords] = useState<MedicalRecord[]>(MOCK_RECORDS)
  const [appointments, setAppointments] = useState<UserAppointment[]>(defaultInitialAppointments)
  const [consents, setConsents] = useState<ConsentRecord[]>(MOCK_CONSENTS)
  const [auditTrail, setAuditTrail] = useState<AuditEntry[]>(MOCK_AUDIT_TRAIL)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(true)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [isDbSynced, setIsDbSynced] = useState<boolean>(false)
  
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Load from localStorage on mount and check MongoDB for existing cloud profile
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.profile) setProfile(parsed.profile)
        if (parsed.records) setRecords(parsed.records)
        if (parsed.appointments) setAppointments(parsed.appointments)
        if (parsed.consents) setConsents(parsed.consents)
        if (parsed.auditTrail) setAuditTrail(parsed.auditTrail)
        if (typeof parsed.hasCompletedOnboarding === 'boolean') {
          setHasCompletedOnboarding(parsed.hasCompletedOnboarding)
        }
      }
    } catch (err) {
      console.warn('Could not load user data from localStorage:', err)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Auto-sync with Firebase Google user profile
  useEffect(() => {
    if (firebaseUser) {
      const userEmail = firebaseUser.email || ''
      const userDid = `did:nexora:pat:${firebaseUser.uid.slice(0, 8)}...${firebaseUser.uid.slice(-4)}`

      // Check MongoDB for saved profile first
      fetch(`/api/user/sync?email=${encodeURIComponent(userEmail)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.exists && data?.data?.profile) {
            setProfile(data.data.profile)
            if (data.data.records) setRecords(data.data.records)
            if (data.data.appointments) setAppointments(data.data.appointments)
            if (data.data.consents) setConsents(data.data.consents)
            if (data.data.auditTrail) setAuditTrail(data.data.auditTrail)
            setHasCompletedOnboarding(true)
            setIsDbSynced(true)
          } else {
            // New user setup
            setProfile((prev) => {
              if (prev.name === defaultInitialProfile.name) {
                setHasCompletedOnboarding(false)
              }
              return {
                ...prev,
                name: firebaseUser.displayName || prev.name,
                email: userEmail || prev.email,
                avatarUrl: firebaseUser.photoURL || prev.avatarUrl,
                did: userDid,
                walletAddress: `0x${firebaseUser.uid.slice(0, 6)}...${firebaseUser.uid.slice(-4)}`
              }
            })
          }
        })
        .catch((err) => {
          console.warn('MongoDB initial user lookup notice:', err)
        })
    }
  }, [firebaseUser])

  // Sync to MongoDB & LocalStorage whenever state changes
  useEffect(() => {
    if (!isLoaded) return

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          profile,
          records,
          appointments,
          consents,
          auditTrail,
          hasCompletedOnboarding
        })
      )
    } catch (err) {
      console.warn('Could not save user data to localStorage:', err)
    }

    // Debounced MongoDB sync
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current)
    syncTimeoutRef.current = setTimeout(() => {
      fetch('/api/user/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: profile.email,
          did: profile.did,
          profile,
          records,
          appointments,
          consents,
          auditTrail
        })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) setIsDbSynced(true)
        })
        .catch((err) => {
          console.warn('MongoDB background sync notice:', err)
        })
    }, 1000)

    return () => {
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current)
    }
  }, [profile, records, appointments, consents, auditTrail, hasCompletedOnboarding, isLoaded])

  const updateProfile = (updated: Partial<PatientProfileData>) => {
    setProfile((prev) => ({ ...prev, ...updated }))
    addAuditEntry({
      entity: 'Patient Sovereign Enclave',
      entityDid: profile.did,
      action: 'Updated Sovereign Health Profile',
      actionType: 'access',
      purpose: 'Patient profile calibration',
      dataAccessed: 'Health profile parameters',
      zkVerified: true,
      txHash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
    })
  }

  const completeOnboarding = (data: Partial<PatientProfileData>) => {
    const updatedProfile = { ...profile, ...data }
    setProfile(updatedProfile)
    setHasCompletedOnboarding(true)

    addAuditEntry({
      entity: 'Nexora Identity Registry',
      entityDid: data.did || profile.did,
      action: 'Minted Sovereign W3C Decentralized Identifier',
      actionType: 'verify',
      purpose: 'Initial cryptographic identity attestation',
      dataAccessed: 'Zero-Knowledge Identity Commitment',
      zkVerified: true,
      txHash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
    })
  }

  const addRecord = (newRec: Omit<MedicalRecord, 'id'>) => {
    const id = `rec_${Date.now()}`
    const record: MedicalRecord = { id, ...newRec }
    setRecords((prev) => [record, ...prev])

    // Save to MongoDB collection
    fetch('/api/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userDid: profile.did, record })
    }).catch((e) => console.warn('MongoDB record save notice:', e))

    addAuditEntry({
      entity: record.hospital || 'Patient Local Enclave',
      entityDid: profile.did,
      action: `Encrypted Record Ingested: ${record.title}`,
      actionType: 'access',
      purpose: 'Off-chain IPFS encrypted medical scan deposit',
      dataAccessed: record.category,
      zkVerified: true,
      txHash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
    })
  }

  const addAppointment = (newApt: Omit<UserAppointment, 'id'>) => {
    const id = `apt_${Date.now()}`
    const apt: UserAppointment = { id, ...newApt }
    setAppointments((prev) => [apt, ...prev])

    // Save to MongoDB collection
    fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userDid: profile.did, appointment: apt })
    }).catch((e) => console.warn('MongoDB appointment save notice:', e))

    addAuditEntry({
      entity: apt.hospital,
      entityDid: apt.did,
      action: `Booked Consultation with ${apt.doctor}`,
      actionType: 'grant',
      purpose: `${apt.type} with smart consent token ${apt.consentId}`,
      dataAccessed: 'Authorized Clinical Telemetry',
      zkVerified: true,
      txHash: apt.txHash
    })
    return id
  }

  const cancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Cancelled' } : a))
    )

    // Update in MongoDB
    fetch('/api/appointments', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: 'Cancelled' })
    }).catch((e) => console.warn('MongoDB appointment update notice:', e))

    addAuditEntry({
      entity: 'Patient Intent Router',
      entityDid: profile.did,
      action: `Cancelled Appointment #${id}`,
      actionType: 'revoke',
      purpose: 'Patient revoked consultation slot and invalidated smart consent token',
      dataAccessed: 'None',
      zkVerified: true,
      txHash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
    })
  }

  const grantConsent = (consentData: Omit<ConsentRecord, 'id' | 'grantedAt' | 'status' | 'txHash'>) => {
    const id = `cns_${Math.random().toString(36).substring(2, 9)}`
    const txHash = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
    const newConsent: ConsentRecord = {
      id,
      ...consentData,
      grantedAt: new Date().toISOString(),
      status: 'active',
      txHash
    }
    setConsents((prev) => [newConsent, ...prev])

    // Save to MongoDB
    fetch('/api/consents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userDid: profile.did, consent: newConsent })
    }).catch((e) => console.warn('MongoDB consent save notice:', e))

    addAuditEntry({
      entity: newConsent.entityName,
      entityDid: newConsent.entityDid,
      action: `Granted Scoped Smart Consent to ${newConsent.entityName}`,
      actionType: 'grant',
      purpose: newConsent.purpose,
      dataAccessed: newConsent.dataType,
      zkVerified: true,
      txHash
    })
    return id
  }

  const revokeConsent = (id: string) => {
    setConsents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'revoked' as const } : c))
    )

    // Update in MongoDB
    fetch('/api/consents', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: 'revoked' })
    }).catch((e) => console.warn('MongoDB consent revoke notice:', e))

    addAuditEntry({
      entity: 'Patient Key Manager',
      entityDid: profile.did,
      action: `Revoked Smart Consent Contract #${id}`,
      actionType: 'revoke',
      purpose: 'Instant on-chain access key revocation broadcast to consensus network',
      dataAccessed: 'All Scopes Revoked',
      zkVerified: true,
      txHash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
    })
  }

  const addAuditEntry = (entryData: Omit<AuditEntry, 'id' | 'timestamp' | 'blockNumber'>) => {
    const now = new Date()
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    const newEntry: AuditEntry = {
      id: `aud_${Date.now()}`,
      timestamp: timeString,
      blockNumber: Math.floor(19482000 + Math.random() * 500),
      ...entryData
    }
    setAuditTrail((prev) => [newEntry, ...prev])
  }

  const resetToDefaults = () => {
    setProfile(defaultInitialProfile)
    setRecords(MOCK_RECORDS)
    setAppointments(defaultInitialAppointments)
    setConsents(MOCK_CONSENTS)
    setAuditTrail(MOCK_AUDIT_TRAIL)
    setHasCompletedOnboarding(true)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <UserDataContext.Provider
      value={{
        profile,
        records,
        appointments,
        consents,
        auditTrail,
        hasCompletedOnboarding,
        isDbSynced,
        updateProfile,
        completeOnboarding,
        addRecord,
        addAppointment,
        cancelAppointment,
        grantConsent,
        revokeConsent,
        addAuditEntry,
        resetToDefaults
      }}
    >
      {children}
    </UserDataContext.Provider>
  )
}

export function useUserData() {
  const context = useContext(UserDataContext)
  if (!context) {
    throw new Error('useUserData must be used within a UserDataProvider')
  }
  return context
}
