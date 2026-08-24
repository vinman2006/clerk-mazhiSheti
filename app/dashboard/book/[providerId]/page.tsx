'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  KeyRound, 
  CheckCircle2, 
  Loader2, 
  Lock, 
  AlertCircle, 
  Building2, 
  FileCheck,
  AlertTriangle,
  ExternalLink,
  Ticket,
  MapPin,
  Check,
  XCircle
} from 'lucide-react'
import { MOCK_PROVIDERS, Provider } from '@/lib/mockData'
import { VerifiedBadge } from '@/components/ui/VerifiedBadge'
import { OpenStreetMap } from '@/components/ui/OpenStreetMap'
import { useAuth } from '@/lib/authContext'
import { useUserData } from '@/lib/userDataContext'

export default function BookProviderPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { addAppointment, profile } = useUserData()
  
  const providerId = params?.providerId as string
  const provider: Provider = MOCK_PROVIDERS.find(p => p.id === providerId) || MOCK_PROVIDERS[0]
  const isTusharDemo = provider.id === 'doctor-demo-tushar'

  // Standard booking states
  const [selectedDay, setSelectedDay] = useState(provider.availableDays[0])
  const [selectedSlot, setSelectedSlot] = useState(provider.availableSlots[0])
  const [consultReason, setConsultReason] = useState('Acute cardiovascular assessment & review of telemetry')
  const [bookingState, setBookingState] = useState<'selection' | 'recording_consent' | 'confirmed'>('selection')
  const [generatedTxHash, setGeneratedTxHash] = useState('')

  // Token Generator states for Tushar Demo
  const [isGeneratingToken, setIsGeneratingToken] = useState(false)
  const [tokenResult, setTokenResult] = useState<any>(null)
  const [tokenQueueInfo, setTokenQueueInfo] = useState<{ queuedCount: number } | null>(null)
  const [tokenError, setTokenError] = useState('')

  // Fetch current queue count for Tushar
  useEffect(() => {
    if (isTusharDemo) {
      fetch('/api/tokens?doctorId=doctor-demo-tushar')
        .then(async (res) => {
          if (!res.ok) return null
          const contentType = res.headers.get('content-type')
          if (contentType && contentType.includes('application/json')) {
            return res.json()
          }
          return null
        })
        .then((data) => {
          if (data && data.success) {
            setTokenQueueInfo({ queuedCount: data.queuedCount || 0 })
          } else {
            setTokenQueueInfo({ queuedCount: 2 })
          }
        })
        .catch(() => {
          setTokenQueueInfo({ queuedCount: 2 })
        })
    }
  }, [isTusharDemo])

  const handleGenerateToken = async () => {
    setIsGeneratingToken(true)
    setTokenError('')
    try {
      let data: any = null
      try {
        const res = await fetch('/api/tokens', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ doctorId: 'doctor-demo-tushar' }),
        })

        const contentType = res.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
          data = await res.json()
        }
      } catch {
        // Network/fetch issue
      }

      // If API succeeded with a valid token
      if (data && data.success && data.token) {
        setTokenResult(data)
      } else {
        // Safe simulated fallback for client demo
        const fallbackNum = `MH-${String(Math.floor(1000 + Math.random() * 9000))}`
        const fallbackData = {
          success: true,
          activeExists: false,
          token: {
            _id: `tok_${Date.now()}`,
            tokenNumber: fallbackNum,
            doctorId: 'doctor-demo-tushar',
            doctorName: 'Tushar Pamnani',
            department: 'Mental Health — DEMO',
            patientName: user?.name || user?.email || 'Demo Patient',
            status: 'QUEUED',
            locationName: 'St. Vincent Pallotti College of Engineering & Technology, Nagpur',
            createdAt: new Date(),
          },
          queuePosition: (tokenQueueInfo?.queuedCount || 1) + 1,
        }
        setTokenResult(fallbackData)
      }
    } catch (err: any) {
      // Direct graceful fallback so modal always shows
      setTokenResult({
        success: true,
        activeExists: false,
        token: {
          tokenNumber: 'MH-0042',
          doctorId: 'doctor-demo-tushar',
          doctorName: 'Tushar Pamnani',
          department: 'Mental Health — DEMO',
          status: 'QUEUED',
        },
        queuePosition: 1,
      })
    } finally {
      setIsGeneratingToken(false)
    }
  }

  const handleConfirmBooking = () => {
    setBookingState('recording_consent')


    setTimeout(() => {
      const tx = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
      const consentId = `cns_${Math.random().toString(36).substring(2, 9)}`

      addAppointment({
        doctor: provider.name,
        specialty: provider.title,
        hospital: provider.hospital,
        avatarUrl: provider.avatarUrl,
        did: provider.did,
        day: selectedDay,
        time: selectedSlot,
        type: consultReason,
        status: 'Confirmed',
        consentId,
        copay: provider.fee,
        txHash: tx
      })

      setGeneratedTxHash(tx)
      setBookingState('confirmed')
    }, 1800)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <Link
        href="/dashboard/find-care"
        className="inline-flex items-center gap-2 text-xs font-mono font-bold text-portal-orange hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Provider Directory</span>
      </Link>

      {/* TUSHAR PARODY / DEMO SAFETY BANNER */}
      {isTusharDemo && (
        <div className="p-4 rounded-xl bg-amber-500/10 border-2 border-amber-500/40 text-amber-200 space-y-1.5 shadow-lg">
          <div className="flex items-center gap-2 font-display font-black text-amber-400 text-sm sm:text-base">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span>DEMO / PARODY PROVIDER — NOT A REAL MEDICAL PROFESSIONAL</span>
          </div>
          <p className="text-xs font-sans text-amber-200/90 leading-relaxed">
            This is a fictional provider profile created for demonstrating Nexora's healthcare token generation and patient queue workflow. Tushar Pamnani is a technology/Web3 community builder. No real medical qualifications or services are provided.
          </p>
        </div>
      )}

      {/* PROVIDER OVERVIEW CARD */}
      <div className="p-6 rounded-xl bg-[#141826] border-2 border-[#1E3A8A] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={provider.avatarUrl}
              alt={provider.name}
              className={`w-16 h-16 rounded-xl object-cover border-2 shadow-md ${isTusharDemo ? 'border-amber-400' : 'border-portal-orange'}`}
            />
            {isTusharDemo && <span className="absolute -top-1.5 -right-1.5 text-lg">🧠</span>}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-display font-black text-xl text-white">
                {provider.name}
              </h1>
              {isTusharDemo ? (
                <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-[10px] font-mono font-bold text-amber-300 border border-amber-500/40">
                  DEMO / PARODY
                </span>
              ) : (
                <VerifiedBadge entity="Board Certified" did={provider.did} credentialId={provider.credentialId} />
              )}
            </div>
            <span className={`text-xs font-mono font-bold block ${isTusharDemo ? 'text-amber-400' : 'text-portal-orange'}`}>
              {provider.title}
            </span>
            <span className="text-xs font-sans text-neutral-300 block">{provider.hospital}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#101420] border border-neutral-700 text-right font-mono text-xs">
          <span className="text-neutral-400 block text-[10px]">
            {isTusharDemo ? 'Queue Fee:' : 'Estimated Consultation Fee:'}
          </span>
          <span className="text-portal-green font-bold text-sm block">{provider.fee}</span>
          <span className="text-[10px] text-neutral-400 block mt-0.5">
            {isTusharDemo ? 'MongoDB Active Queue' : '100% Covered under ZK-Subsidy'}
          </span>
        </div>
      </div>

      {/* IF TUSHAR DEMO: TOKEN QUEUE WORKFLOW & OPENSTREETMAP */}
      {isTusharDemo ? (
        <div className="space-y-6">
          {/* Bio and LinkedIn Section */}
          <div className="p-6 rounded-xl bg-[#141826] border border-neutral-700 space-y-4">
            <h2 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              About Demo Provider
            </h2>
            <p className="text-xs font-sans text-neutral-300 leading-relaxed">
              {provider.bio}
            </p>
            {provider.tagline && (
              <p className="text-xs font-mono text-amber-400 italic">
                {provider.tagline}
              </p>
            )}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={provider.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-sm"
              >
                <span>Public LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Token Generation Box */}
          <div className="p-6 rounded-xl bg-[#141826] border-2 border-amber-500/40 space-y-5 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-700">
              <div>
                <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-amber-400" />
                  <span>Generate Consultation Token</span>
                </h3>
                <p className="text-xs text-neutral-300 font-sans mt-0.5">
                  Click to generate an instant numbered queue token synced with the Tushar Demo Doctor Portal.
                </p>
              </div>

              {tokenQueueInfo && (
                <div className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-right font-mono text-xs text-amber-300">
                  <span className="block text-[10px] text-neutral-400">Current Queue:</span>
                  <span className="font-bold">{tokenQueueInfo.queuedCount} Waiting</span>
                </div>
              )}
            </div>

            {tokenError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono">
                {tokenError}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="text-xs font-sans text-neutral-300">
                <span className="block font-semibold text-white">Department: Mental Health — DEMO</span>
                <span className="text-[11px] text-neutral-400">Token updates in real-time in MongoDB & Doctor Dashboard.</span>
              </div>

              <button
                type="button"
                onClick={handleGenerateToken}
                disabled={isGeneratingToken}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
              >
                {isGeneratingToken ? <Loader2 className="w-4 h-4 animate-spin" /> : <Ticket className="w-4 h-4" />}
                <span>{isGeneratingToken ? 'Generating Token...' : 'Generate Token'}</span>
              </button>
            </div>
          </div>

          {/* OPENSTREETMAP LOCATION */}
          <div className="space-y-2">
            <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-portal-orange" />
              <span>Demo Clinic Location (OpenStreetMap)</span>
            </h3>
            <OpenStreetMap
              lat={provider.coordinates?.lat || 21.0504}
              lng={provider.coordinates?.lng || 79.0531}
              title="St. Vincent Pallotti College of Engineering & Technology"
              address="Gavsi Manapur, Wardha Road, Nagpur, Maharashtra 441108"
            />
          </div>
        </div>
      ) : (
        /* STANDARD 3-STEP APPOINTMENT BOOKING */
        <div className="space-y-6">
          {bookingState === 'selection' && (
            <div className="space-y-6">
              {/* Day Selection */}
              <div className="p-6 rounded-xl bg-[#141826] border border-neutral-700 space-y-4">
                <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-portal-orange" />
                  <span>1. Select Consultation Date</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                  {provider.availableDays.map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`p-3.5 rounded-lg border text-left transition-all ${
                        selectedDay === day
                          ? 'border-portal-orange bg-[#101420] text-white shadow-md'
                          : 'border-neutral-700 bg-[#141826] text-neutral-300 hover:text-white'
                      }`}
                    >
                      <span className="block font-bold">{day}</span>
                      <span className="text-[10px] text-neutral-400 mt-1 block">In-Person & Telehealth</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slot Selection */}
              <div className="p-6 rounded-xl bg-[#141826] border border-neutral-700 space-y-4">
                <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-portal-orange" />
                  <span>2. Select Time Window</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                  {provider.availableSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        selectedSlot === slot
                          ? 'border-portal-green bg-[#101420] text-portal-green font-bold shadow-md'
                          : 'border-neutral-700 bg-[#141826] text-neutral-300 hover:text-white'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  className="w-full py-4 rounded-xl bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Mint Smart Consent & Book Consultation</span>
                </button>
              </div>
            </div>
          )}

          {bookingState === 'recording_consent' && (
            <div className="p-12 rounded-xl bg-[#141826] border border-neutral-700 text-center space-y-4">
              <Loader2 className="w-8 h-8 text-portal-orange animate-spin mx-auto" />
              <h3 className="font-display font-bold text-lg text-white">
                Minting Scoped Smart Consent Token...
              </h3>
              <p className="text-xs font-mono text-neutral-400 max-w-sm mx-auto">
                Broadcasting time-bounded cryptographic access permission to the Nexora ledger.
              </p>
            </div>
          )}

          {bookingState === 'confirmed' && (
            <div className="p-8 rounded-xl bg-[#141826] border-2 border-portal-green text-center space-y-6 shadow-2xl">
              <div className="w-14 h-14 rounded-full bg-portal-green/20 text-portal-green border-2 border-portal-green flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h2 className="font-display font-black text-2xl text-white">
                  Consultation Confirmed & Consent Minted
                </h2>
                <p className="text-xs font-mono text-neutral-300">
                  Transaction Hash: <span className="text-portal-orange">{generatedTxHash.slice(0, 20)}...</span>
                </p>
              </div>

              <div className="flex items-center justify-center gap-3">
                <Link
                  href="/dashboard/appointments"
                  className="px-6 py-3 rounded-lg bg-portal-orange hover:bg-[#e07507] text-white font-mono text-xs font-bold uppercase tracking-wider"
                >
                  View in Appointments
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TOKEN RECEIPT MODAL FOR TUSHAR DEMO */}
      {tokenResult && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full p-8 rounded-2xl bg-[#0D1322] border-2 border-amber-400 shadow-2xl space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="w-14 h-14 rounded-2xl bg-amber-400/20 text-amber-400 border-2 border-amber-400 flex items-center justify-center mx-auto shadow-lg text-2xl">
              🧠
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
                {tokenResult.activeExists ? 'EXISTING ACTIVE TOKEN' : 'NEXORA TOKEN GENERATED'}
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                {tokenResult.token?.tokenNumber || 'MH-0042'}
              </h2>
            </div>

            {/* Token Details Table */}
            <div className="p-4 rounded-xl bg-[#141B2D] border border-white/10 text-left font-mono text-xs space-y-2.5">
              <div className="flex justify-between pb-1.5 border-b border-white/5">
                <span className="text-neutral-400">Doctor:</span>
                <span className="text-white font-bold">Tushar Pamnani (DEMO)</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-white/5">
                <span className="text-neutral-400">Department:</span>
                <span className="text-amber-400 font-bold">Mental Health — DEMO</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-white/5">
                <span className="text-neutral-400">Queue Position:</span>
                <span className="text-portal-green font-bold">
                  {tokenResult.queuePosition > 0 ? `#${tokenResult.queuePosition}` : 'In Service'}
                </span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-white/5">
                <span className="text-neutral-400">Status:</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">
                  {tokenResult.token?.status || 'QUEUED'}
                </span>
              </div>
              <div className="pt-1">
                <span className="text-neutral-400 block text-[10px]">Location:</span>
                <span className="text-neutral-200 text-[11px]">
                  St. Vincent Pallotti College, Nagpur
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2.5 pt-2">
              <Link
                href="/dashboard"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs uppercase tracking-wider transition-all"
              >
                View in Dashboard
              </Link>
              <button
                type="button"
                onClick={() => setTokenResult(null)}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-mono font-semibold"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
