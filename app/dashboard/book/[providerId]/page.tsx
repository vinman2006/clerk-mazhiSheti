'use client'

import React, { useState } from 'react'
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
  FileCheck 
} from 'lucide-react'
import { MOCK_PROVIDERS, Provider } from '@/lib/mockData'
import { VerifiedBadge } from '@/components/ui/VerifiedBadge'
import { SimulatedBadge } from '@/components/ui/SimulatedBadge'
import { useAuth } from '@/lib/authContext'
import { useUserData } from '@/lib/userDataContext'

export default function BookProviderPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { addAppointment, profile } = useUserData()
  
  const providerId = params?.providerId as string
  const provider: Provider = MOCK_PROVIDERS.find(p => p.id === providerId) || MOCK_PROVIDERS[0]

  const [selectedDay, setSelectedDay] = useState(provider.availableDays[0])
  const [selectedSlot, setSelectedSlot] = useState(provider.availableSlots[0])
  const [consultReason, setConsultReason] = useState('Acute cardiovascular assessment & review of telemetry')
  const [bookingState, setBookingState] = useState<'selection' | 'recording_consent' | 'confirmed'>('selection')
  const [generatedTxHash, setGeneratedTxHash] = useState('')

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

      {/* PROVIDER OVERVIEW CARD */}
      <div className="p-6 rounded-xl bg-[#141826] border-2 border-[#1E3A8A] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-start gap-4">
          <img
            src={provider.avatarUrl}
            alt={provider.name}
            className="w-16 h-16 rounded-xl object-cover border-2 border-portal-orange shadow-md"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-display font-black text-xl text-white">
                {provider.name}
              </h1>
              <VerifiedBadge entity="Board Certified" did={provider.did} credentialId={provider.credentialId} />
            </div>
            <span className="text-xs font-mono font-bold text-portal-orange block">{provider.title}</span>
            <span className="text-xs font-sans text-neutral-300 block">{provider.hospital}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#101420] border border-neutral-700 text-right font-mono text-xs">
          <span className="text-neutral-400 block text-[10px]">Estimated Consultation Fee:</span>
          <span className="text-portal-green font-bold text-sm block">{provider.fee}</span>
          <span className="text-[10px] text-portal-orange font-semibold">Scheme Copay Validated ✓</span>
        </div>
      </div>

      {bookingState === 'selection' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT 2 COLS: SLOT SELECTION */}
          <div className="md:col-span-2 p-6 rounded-xl bg-[#141826] border border-neutral-700 space-y-6 shadow-lg">
            {/* Step 1: Select Day */}
            <div className="space-y-3">
              <span className="font-mono text-xs text-portal-orange font-bold uppercase tracking-wider block">
                1. Select Available Date
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {provider.availableDays.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`p-3 rounded-lg border text-xs font-mono font-bold transition-all text-center ${
                      selectedDay === day
                        ? 'bg-portal-orange text-white border-portal-orange shadow-md'
                        : 'bg-[#101420] border-neutral-700 text-neutral-300 hover:border-neutral-600'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Time Slot */}
            <div className="space-y-3">
              <span className="font-mono text-xs text-portal-orange font-bold uppercase tracking-wider block">
                2. Select Evaluation Slot
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {provider.availableSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-3 rounded-lg border text-xs font-mono font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                      selectedSlot === slot
                        ? 'bg-portal-orange text-white border-portal-orange shadow-md'
                        : 'bg-[#101420] border-neutral-700 text-neutral-300 hover:border-neutral-600'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{slot}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Clinical Reason */}
            <div className="space-y-2">
              <span className="font-mono text-xs text-portal-orange font-bold uppercase tracking-wider block">
                3. Clinical Intake Notes / Purpose
              </span>
              <input
                type="text"
                value={consultReason}
                onChange={(e) => setConsultReason(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-xs text-white focus:outline-none focus:border-portal-orange font-sans"
              />
            </div>
          </div>

          {/* RIGHT COL: CRYPTOGRAPHIC CONSENT EVENT SUMMARY */}
          <div className="p-6 rounded-xl bg-[#141826] border border-neutral-700 border-l-4 border-l-portal-green shadow-xl space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-portal-green font-mono font-bold text-xs border-b border-neutral-700 pb-3">
                <Lock className="w-4 h-4" />
                <span>Booking = Smart Consent Event</span>
              </div>

              <p className="text-xs font-sans text-neutral-300 leading-relaxed">
                Confirming this appointment automatically mints a 72-hour scoped smart consent contract authorizing Dr. Al-Mansoor to decrypt only your relevant cardiac telemetry during the consultation window.
              </p>

              <div className="space-y-2 p-3.5 rounded-lg bg-[#101420] border border-neutral-700 font-mono text-[11px] text-neutral-400">
                <div className="flex justify-between">
                  <span>Signer:</span>
                  <span className="text-white font-semibold">{user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Grantee:</span>
                  <span className="text-blue-300 font-semibold">Apex Heart (DID)</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="text-portal-orange font-bold">72 Hours Post-Visit</span>
                </div>
                <div className="flex justify-between">
                  <span>Audit Trail:</span>
                  <span className="text-portal-green font-bold">Auto-Recorded ✓</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleConfirmBooking}
              className="w-full py-3.5 rounded-lg bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md font-mono flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>Confirm & Mint Consent</span>
            </button>
          </div>
        </div>
      )}

      {/* RECORDING STATE */}
      {bookingState === 'recording_consent' && (
        <div className="p-16 rounded-xl bg-[#141826] border-2 border-[#1E3A8A] shadow-2xl flex flex-col items-center justify-center text-center space-y-4 font-mono">
          <Loader2 className="w-10 h-10 text-portal-orange animate-spin" />
          <div>
            <h2 className="font-bold text-white text-base">Creating On-Chain Consent Record...</h2>
            <p className="text-xs text-neutral-400 mt-1">Generating zero-knowledge presentation & registering slot to smart contract</p>
          </div>
        </div>
      )}

      {/* SUCCESS CONFIRMED STATE */}
      {bookingState === 'confirmed' && (
        <div className="p-8 sm:p-12 rounded-xl bg-[#141826] border-2 border-portal-green shadow-2xl space-y-6 text-center">
          <div className="w-14 h-14 rounded-full bg-portal-green/20 text-portal-green flex items-center justify-center border-2 border-portal-green mx-auto">
            <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h2 className="font-display font-black text-2xl text-white">
              Appointment & Consent Confirmed!
            </h2>
            <p className="text-xs font-sans text-neutral-300 leading-relaxed">
              Your consultation with {provider.name} is confirmed for <span className="text-portal-green font-bold">{selectedDay} at {selectedSlot}</span>. The smart consent token has been broadcast to the network.
            </p>
          </div>

          {/* Monospace Ledger confirmation block */}
          <div className="p-4 rounded-lg bg-[#101420] border border-neutral-700 border-l-4 border-l-portal-green max-w-xl mx-auto text-left font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-portal-green font-bold border-b border-neutral-700 pb-2">
              <span className="flex items-center gap-1.5">
                <FileCheck className="w-4 h-4" />
                <span>On-Chain Receipt Verified</span>
              </span>
              <span>Block #19482013</span>
            </div>
            <div className="flex justify-between text-neutral-400 text-[11px]">
              <span>Transaction Hash:</span>
              <span className="text-portal-orange select-all font-semibold">{generatedTxHash}</span>
            </div>
            <div className="flex justify-between text-neutral-400 text-[11px]">
              <span>Smart Contract:</span>
              <span className="text-neutral-200">0x8849b...29ef (NexoraConsentManager)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/dashboard/consent"
              className="px-5 py-2.5 rounded-lg bg-[#101420] hover:bg-[#182033] text-portal-orange border border-neutral-700 font-mono text-xs font-bold transition-all shadow-sm"
            >
              <span>View in Consent Center →</span>
            </Link>
            <Link
              href="/dashboard/appointments"
              className="px-6 py-2.5 rounded-lg bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md font-mono"
            >
              <span>View All Appointments</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
