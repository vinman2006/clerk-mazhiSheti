'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Calendar, 
  Clock, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  User, 
  Ban, 
  Video, 
  Download, 
  X, 
  Mic, 
  MicOff, 
  Camera, 
  CameraOff, 
  PhoneOff,
  Sparkles,
  Lock
} from 'lucide-react'
import { useUserData } from '@/lib/userDataContext'
import { VerifiedBadge } from '@/components/ui/VerifiedBadge'
import { SimulatedBadge } from '@/components/ui/SimulatedBadge'

export default function AppointmentsPage() {
  const { appointments, cancelAppointment, profile } = useUserData()
  const [activeCallDoctor, setActiveCallDoctor] = useState<string | null>(null)
  const [isMicOn, setIsMicOn] = useState(true)
  const [isCamOn, setIsCamOn] = useState(true)

  const downloadReceipt = (apt: any) => {
    const receiptData = {
      hospital: apt.hospital,
      doctor: apt.doctor,
      specialty: apt.specialty,
      patientName: profile.name,
      patientDid: profile.did,
      day: apt.day,
      time: apt.time,
      type: apt.type,
      copay: apt.copay,
      consentContractId: apt.consentId,
      transactionHash: apt.txHash,
      cryptographicSignature: `ZK_TX_${apt.id}_VERIFIED`
    }
    const blob = new Blob([JSON.stringify(receiptData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `nexora-appointment-receipt-${apt.id}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-xl bg-[#141826] border-2 border-[#1E3A8A] shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-black text-2xl text-white">
              Your Clinical Appointments
            </h1>
            <SimulatedBadge />
          </div>
          <p className="text-xs font-sans text-neutral-300 mt-1">
            Appointments booked for <strong className="text-white">{profile.name}</strong> automatically synchronize with smart consent contracts and zero-knowledge subsidy claims.
          </p>
        </div>

        <Link
          href="/dashboard/find-care"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md font-mono"
        >
          <span>Book New Provider</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* APPOINTMENT LIST */}
      <div className="space-y-4">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className={`p-6 rounded-xl bg-[#141826] border transition-all space-y-4 shadow-lg ${
              apt.status === 'Cancelled'
                ? 'border-neutral-800 opacity-60 border-l-4 border-l-red-500'
                : 'border-neutral-700 border-l-4 border-l-portal-orange hover:border-neutral-600'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <img
                  src={apt.avatarUrl}
                  alt={apt.doctor}
                  className="w-14 h-14 rounded-lg object-cover border-2 border-portal-orange shadow-md"
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-display font-bold text-base text-white">
                      {apt.doctor}
                    </h3>
                    <VerifiedBadge entity={apt.specialty} did={apt.did} />
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold border ${
                      apt.status === 'Cancelled'
                        ? 'bg-red-500/20 text-red-400 border-red-500/40'
                        : 'bg-portal-green/20 text-portal-green border-portal-green/40'
                    }`}>
                      {apt.status} {apt.status !== 'Cancelled' && '✓'}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-portal-orange block">{apt.specialty} Specialist</span>
                  <span className="text-xs font-sans text-neutral-300 block">{apt.hospital}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-[#101420] border border-neutral-700 text-right font-mono text-xs">
                  <span className="text-neutral-400 block text-[10px]">Session Copay:</span>
                  <span className="text-portal-green font-bold">{apt.copay}</span>
                </div>

                {apt.status !== 'Cancelled' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveCallDoctor(apt.doctor)}
                      className="px-3.5 py-2.5 rounded-lg bg-portal-orange hover:bg-[#e07507] text-white text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-sm"
                      title="Join Encrypted Tele-Consult"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Join Call</span>
                    </button>

                    <button
                      onClick={() => downloadReceipt(apt)}
                      className="p-2.5 rounded-lg bg-[#101420] hover:bg-[#182033] text-neutral-200 hover:text-white border border-neutral-700 text-xs font-mono font-bold transition-all"
                      title="Download Booking Receipt"
                    >
                      <Download className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => cancelAppointment(apt.id)}
                      className="p-2.5 rounded-lg bg-red-500/15 hover:bg-red-500 text-red-300 hover:text-white border border-red-500/30 text-xs font-mono font-bold transition-all flex items-center gap-1"
                      title="Cancel Appointment & Revoke Consent"
                    >
                      <Ban className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Date, Time and Consent details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-lg bg-[#101420] border border-neutral-700 font-mono text-xs">
              <div className="flex items-center gap-2 text-white font-medium">
                <Calendar className="w-4 h-4 text-portal-orange shrink-0" />
                <span>{apt.day}</span>
              </div>

              <div className="flex items-center gap-2 text-white font-medium">
                <Clock className="w-4 h-4 text-portal-orange shrink-0" />
                <span>{apt.time}</span>
              </div>

              <div className="flex items-center gap-2 text-neutral-300">
                <ShieldCheck className="w-4 h-4 text-portal-green shrink-0" />
                <span>Consent: <span className="text-portal-orange font-semibold">{apt.consentId}</span></span>
              </div>
            </div>
          </div>
        ))}

        {appointments.length === 0 && (
          <div className="p-12 text-center text-xs font-mono text-neutral-400 rounded-xl bg-[#141826] border border-neutral-700">
            No clinical appointments on record. Use the button above to book a doctor.
          </div>
        )}
      </div>

      {/* TELE-HEALTH VIDEO CONSULTATION MODAL */}
      {activeCallDoctor && (
        <div className="fixed inset-0 z-[100000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#141826] border-2 border-[#1E3A8A] rounded-2xl overflow-hidden shadow-2xl space-y-4">
            <div className="p-4 bg-gradient-to-r from-[#152A63] to-[#101420] border-b border-neutral-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-portal-green animate-pulse"></div>
                <span className="font-display font-black text-sm text-white">
                  Encrypted Tele-Health Room • {activeCallDoctor}
                </span>
              </div>
              <span className="text-[10px] font-mono text-portal-orange font-bold border border-portal-orange/40 bg-portal-orange/20 px-2 py-0.5 rounded">
                P2P WebRTC E2EE
              </span>
            </div>

            {/* Video Canvas Simulation */}
            <div className="p-6 space-y-6">
              <div className="relative aspect-video w-full bg-[#0B0E17] rounded-xl border border-neutral-800 flex items-center justify-center overflow-hidden">
                {isCamOn ? (
                  <div className="text-center space-y-2">
                    <div className="w-20 h-20 rounded-full bg-portal-orange/20 border-2 border-portal-orange mx-auto flex items-center justify-center text-portal-orange font-display font-black text-2xl">
                      {activeCallDoctor.split(' ')[1]?.[0] || 'D'}
                    </div>
                    <span className="font-sans font-bold text-sm text-white block">
                      Connected with {activeCallDoctor}
                    </span>
                    <span className="text-xs font-mono text-portal-green">
                      Latency: 18ms • Frame Rate: 60fps • 256-bit AES
                    </span>
                  </div>
                ) : (
                  <div className="text-neutral-500 font-mono text-xs">
                    Camera Turned Off
                  </div>
                )}

                {/* Self View PIP */}
                <div className="absolute bottom-3 right-3 w-32 h-24 bg-[#141826] border-2 border-portal-orange rounded-lg overflow-hidden flex items-center justify-center shadow-lg">
                  <span className="text-[10px] font-mono text-neutral-300 font-bold">You (Self)</span>
                </div>
              </div>

              {/* Call Controls */}
              <div className="flex items-center justify-center gap-4 pt-2">
                <button
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`p-3.5 rounded-full border transition-all ${
                    isMicOn ? 'bg-[#101420] text-white border-neutral-700 hover:bg-[#182033]' : 'bg-red-500 text-white border-red-600'
                  }`}
                  title={isMicOn ? 'Mute Mic' : 'Unmute Mic'}
                >
                  {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => setIsCamOn(!isCamOn)}
                  className={`p-3.5 rounded-full border transition-all ${
                    isCamOn ? 'bg-[#101420] text-white border-neutral-700 hover:bg-[#182033]' : 'bg-red-500 text-white border-red-600'
                  }`}
                  title={isCamOn ? 'Turn Off Camera' : 'Turn On Camera'}
                >
                  {isCamOn ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => setActiveCallDoctor(null)}
                  className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider font-mono flex items-center gap-2 shadow-lg"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>Leave Consultation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
