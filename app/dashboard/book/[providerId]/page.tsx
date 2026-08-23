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
  FileCheck 
} from 'lucide-react'
import { MOCK_PROVIDERS, Provider } from '@/lib/mockData'
import { VerifiedBadge } from '@/components/ui/VerifiedBadge'
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
    <div className="max-w-4xl mx-auto space-y-6 text-[#1A1A1A]">
      {/* Back Button */}
      <Link
        href="/dashboard/find-care"
        className="inline-flex items-center gap-2 text-xs font-bold text-[#0B3D91] hover:underline"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Doctor Directory (मागे जा)</span>
      </Link>

      {/* PROVIDER OVERVIEW CARD */}
      <div className="p-6 rounded-lg bg-white border border-[#E0E0E0] border-l-4 border-l-[#0B3D91] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-start gap-4">
          <img
            src={provider.avatarUrl}
            alt={provider.name}
            className="w-16 h-16 rounded-lg object-cover border-2 border-[#F5821F] shadow-sm bg-neutral-100"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-bold text-xl text-[#0B3D91]">
                {provider.name}
              </h1>
              <VerifiedBadge entity="Board Certified" did={provider.did} credentialId={provider.credentialId} />
            </div>
            <span className="text-xs font-bold text-[#D66D10] block">{provider.title}</span>
            <span className="text-xs text-[#4B5563] block">{provider.hospital}</span>
          </div>
        </div>

        <div className="p-3.5 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-right text-xs">
          <span className="text-neutral-500 block text-[10px]">Estimated Consultation Fee:</span>
          <span className="text-[#1E7A34] font-bold text-sm block">{provider.fee}</span>
          <span className="text-[10px] text-[#D66D10] font-semibold">Ayushman / Scheme Copay Validated ✓</span>
        </div>
      </div>

      {bookingState === 'selection' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT 2 COLS: SLOT SELECTION */}
          <div className="md:col-span-2 p-6 rounded-lg bg-white border border-[#E0E0E0] space-y-6 shadow-sm">
            {/* Step 1: Select Day */}
            <div className="space-y-2">
              <span className="text-xs text-[#0B3D91] font-bold uppercase tracking-wider block">
                1. Select Available Date (तारीख निवडा)
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {provider.availableDays.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`p-3 rounded border text-xs font-bold transition-all text-center ${
                      selectedDay === day
                        ? 'bg-[#0B3D91] text-white border-[#0B3D91] shadow-sm'
                        : 'bg-[#F8FAFC] border-[#CBD5E1] text-neutral-700 hover:border-neutral-400'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Time Slot */}
            <div className="space-y-2">
              <span className="text-xs text-[#0B3D91] font-bold uppercase tracking-wider block">
                2. Select Time Slot (वेळ निवडा)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {provider.availableSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-3 rounded border text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                      selectedSlot === slot
                        ? 'bg-[#F5821F] text-white border-[#F5821F] shadow-sm'
                        : 'bg-[#F8FAFC] border-[#CBD5E1] text-neutral-700 hover:border-neutral-400'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{slot}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Clinical Reason */}
            <div className="space-y-1">
              <span className="text-xs text-[#0B3D91] font-bold uppercase tracking-wider block">
                3. Clinical Intake Notes / Purpose (तक्रार / कारण)
              </span>
              <input
                type="text"
                value={consultReason}
                onChange={(e) => setConsultReason(e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-[#1A1A1A] focus:outline-none focus:bg-white focus:border-[#0B3D91]"
              />
            </div>
          </div>

          {/* RIGHT COL: CRYPTOGRAPHIC CONSENT EVENT SUMMARY */}
          <div className="p-6 rounded-lg bg-white border border-[#E0E0E0] border-l-4 border-l-[#1E7A34] shadow-sm space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#1E7A34] font-bold text-xs border-b border-neutral-100 pb-3">
                <Lock className="w-4 h-4" />
                <span>Booking = Smart Consent Event</span>
              </div>

              <p className="text-xs text-[#4B5563] leading-relaxed">
                Confirming this appointment automatically mints a 72-hour scoped smart consent contract authorizing {provider.name} to decrypt only your relevant cardiac telemetry during the consultation window.
              </p>

              <div className="space-y-2 p-3.5 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Signer:</span>
                  <span className="text-[#1A1A1A] font-bold">{user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Grantee:</span>
                  <span className="text-[#0B3D91] font-bold">{provider.hospital}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Duration:</span>
                  <span className="text-[#D66D10] font-bold">72 Hours Post-Visit</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Audit Trail:</span>
                  <span className="text-[#1E7A34] font-bold">Auto-Recorded ✓</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleConfirmBooking}
              className="w-full py-3 rounded bg-[#1E7A34] hover:bg-[#145524] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>Confirm & Authorize Visit</span>
            </button>
          </div>
        </div>
      )}

      {/* RECORDING STATE */}
      {bookingState === 'recording_consent' && (
        <div className="p-16 rounded-lg bg-white border border-[#E0E0E0] shadow-md flex flex-col items-center justify-center text-center space-y-4">
          <Loader2 className="w-10 h-10 text-[#0B3D91] animate-spin" />
          <div>
            <h2 className="font-bold text-[#0B3D91] text-base">Creating Cryptographic Consent Record...</h2>
            <p className="text-xs text-neutral-500 mt-1">Generating zero-knowledge presentation & registering appointment to ledger</p>
          </div>
        </div>
      )}

      {/* SUCCESS CONFIRMED STATE */}
      {bookingState === 'confirmed' && (
        <div className="p-8 sm:p-12 rounded-lg bg-white border border-[#E0E0E0] border-t-4 border-t-[#1E7A34] shadow-md space-y-6 text-center">
          <div className="w-14 h-14 rounded-full bg-green-100 text-[#1E7A34] flex items-center justify-center border-2 border-[#1E7A34] mx-auto">
            <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h2 className="font-extrabold text-2xl text-[#0B3D91]">
              Appointment & Consent Confirmed!
            </h2>
            <p className="text-xs text-[#4B5563] leading-relaxed">
              Your consultation with {provider.name} is confirmed for <span className="text-[#1E7A34] font-bold">{selectedDay} at {selectedSlot}</span>. The smart consent record has been logged.
            </p>
          </div>

          {/* Ledger confirmation block */}
          <div className="p-4 rounded bg-[#F8FAFC] border border-[#CBD5E1] border-l-4 border-l-[#1E7A34] max-w-xl mx-auto text-left text-xs space-y-2">
            <div className="flex items-center justify-between text-[#1E7A34] font-bold border-b border-neutral-200 pb-2">
              <span className="flex items-center gap-1.5">
                <FileCheck className="w-4 h-4" />
                <span>On-Chain Receipt Verified</span>
              </span>
              <span>Block #19482013</span>
            </div>
            <div className="flex justify-between text-neutral-600 text-[11px] font-mono">
              <span>Transaction Hash:</span>
              <span className="text-[#D66D10] select-all font-semibold">{generatedTxHash}</span>
            </div>
            <div className="flex justify-between text-neutral-600 text-[11px] font-mono">
              <span>Smart Contract:</span>
              <span className="text-neutral-900">0x8849b...29ef (NexoraConsentManager)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/dashboard/consent"
              className="px-5 py-2.5 rounded bg-white hover:bg-neutral-50 text-[#0B3D91] border border-[#0B3D91] text-xs font-bold transition-all shadow-sm"
            >
              <span>View in Consent Center →</span>
            </Link>
            <Link
              href="/dashboard/appointments"
              className="px-6 py-2.5 rounded bg-[#1E7A34] hover:bg-[#145524] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
            >
              <span>View All Appointments</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
