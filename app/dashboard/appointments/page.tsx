'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Calendar, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Ban, 
  Video, 
  Download, 
  Mic, 
  MicOff, 
  Camera, 
  CameraOff, 
  PhoneOff 
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
    <div className="space-y-6 text-[#1A1A1A]">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-lg bg-white border border-[#E0E0E0] border-l-4 border-l-[#0B3D91] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-[#0B3D91]">
              Clinical Consultations & Appointments (वैद्यकीय भेटी व सल्लामसलत)
            </h1>
            <SimulatedBadge />
          </div>
          <p className="text-xs text-[#4B5563] mt-1">
            Appointments booked for <strong className="text-[#1A1A1A]">{profile.name}</strong> automatically synchronize with smart consent contracts and zero-knowledge subsidy claims.
          </p>
        </div>

        <Link
          href="/dashboard/find-care"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#1E7A34] hover:bg-[#145524] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
        >
          <span>Book New Doctor</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* APPOINTMENT LIST */}
      <div className="space-y-4">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className={`p-6 rounded-lg bg-white border transition-all space-y-4 shadow-sm ${
              apt.status === 'Cancelled'
                ? 'border-neutral-200 opacity-60 border-l-4 border-l-red-500'
                : 'border-[#E0E0E0] border-t-4 border-t-[#0B3D91] hover:shadow-md'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <img
                  src={apt.avatarUrl}
                  alt={apt.doctor}
                  className="w-14 h-14 rounded-lg object-cover border-2 border-[#F5821F] shadow-sm bg-neutral-100"
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-base text-[#0B3D91]">
                      {apt.doctor}
                    </h3>
                    <VerifiedBadge entity={apt.specialty} did={apt.did} />
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${
                      apt.status === 'Cancelled'
                        ? 'bg-red-50 text-red-600 border-red-200'
                        : 'bg-green-50 text-[#1E7A34] border-green-200'
                    }`}>
                      {apt.status} {apt.status !== 'Cancelled' && '✓'}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#D66D10] block">{apt.specialty} Specialist</span>
                  <span className="text-xs text-[#4B5563] block">{apt.hospital}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-right text-xs">
                  <span className="text-neutral-500 block text-[10px]">Session Copay:</span>
                  <span className="text-[#1E7A34] font-bold">{apt.copay}</span>
                </div>

                {apt.status !== 'Cancelled' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveCallDoctor(apt.doctor)}
                      className="px-3.5 py-2.5 rounded bg-[#F5821F] hover:bg-[#D66D10] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                      title="Join Encrypted Tele-Consult"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Join Call</span>
                    </button>

                    <button
                      onClick={() => downloadReceipt(apt)}
                      className="p-2.5 rounded bg-white hover:bg-neutral-50 text-neutral-700 border border-[#CBD5E1] text-xs font-bold transition-all shadow-sm"
                      title="Download Booking Receipt"
                    >
                      <Download className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => cancelAppointment(apt.id)}
                      className="p-2.5 rounded bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold transition-all flex items-center gap-1"
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-xs">
              <div className="flex items-center gap-2 text-[#1A1A1A] font-medium">
                <Calendar className="w-4 h-4 text-[#F5821F] shrink-0" />
                <span>{apt.day}</span>
              </div>

              <div className="flex items-center gap-2 text-[#1A1A1A] font-medium">
                <Clock className="w-4 h-4 text-[#F5821F] shrink-0" />
                <span>{apt.time}</span>
              </div>

              <div className="flex items-center gap-2 text-neutral-600">
                <ShieldCheck className="w-4 h-4 text-[#1E7A34] shrink-0" />
                <span>Consent: <span className="text-[#D66D10] font-semibold">{apt.consentId}</span></span>
              </div>
            </div>
          </div>
        ))}

        {appointments.length === 0 && (
          <div className="p-12 text-center text-xs text-neutral-500 rounded-lg bg-white border border-[#E0E0E0]">
            No clinical appointments on record. Use the button above to book a doctor.
          </div>
        )}
      </div>

      {/* TELE-HEALTH VIDEO CONSULTATION MODAL */}
      {activeCallDoctor && (
        <div className="fixed inset-0 z-[100000] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white border border-[#E0E0E0] rounded-lg overflow-hidden shadow-2xl space-y-4">
            <div className="p-4 bg-[#0B3D91] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                <span className="font-bold text-sm">
                  Encrypted Tele-Health Room • {activeCallDoctor}
                </span>
              </div>
              <span className="text-[10px] text-white font-bold border border-white/40 bg-white/10 px-2 py-0.5 rounded">
                P2P WebRTC E2EE
              </span>
            </div>

            {/* Video Canvas Simulation */}
            <div className="p-6 space-y-6">
              <div className="relative aspect-video w-full bg-neutral-900 rounded-lg border border-neutral-700 flex items-center justify-center overflow-hidden">
                {isCamOn ? (
                  <div className="text-center space-y-2 text-white">
                    <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-[#F5821F] mx-auto flex items-center justify-center text-[#F5821F] font-bold text-2xl">
                      {activeCallDoctor.split(' ')[1]?.[0] || 'D'}
                    </div>
                    <span className="font-bold text-sm block">
                      Connected with {activeCallDoctor}
                    </span>
                    <span className="text-xs text-green-400">
                      Latency: 18ms • Frame Rate: 60fps • 256-bit AES
                    </span>
                  </div>
                ) : (
                  <div className="text-neutral-400 text-xs">
                    Camera Turned Off
                  </div>
                )}

                {/* Self View PIP */}
                <div className="absolute bottom-3 right-3 w-32 h-24 bg-neutral-800 border-2 border-[#F5821F] rounded flex items-center justify-center shadow-lg">
                  <span className="text-[10px] text-neutral-300 font-bold">You (Citizen)</span>
                </div>
              </div>

              {/* Call Controls */}
              <div className="flex items-center justify-center gap-4 pt-2">
                <button
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`p-3.5 rounded-full border transition-all ${
                    isMicOn ? 'bg-neutral-100 text-neutral-800 border-neutral-300 hover:bg-neutral-200' : 'bg-red-600 text-white border-red-700'
                  }`}
                  title={isMicOn ? 'Mute Mic' : 'Unmute Mic'}
                >
                  {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => setIsCamOn(!isCamOn)}
                  className={`p-3.5 rounded-full border transition-all ${
                    isCamOn ? 'bg-neutral-100 text-neutral-800 border-neutral-300 hover:bg-neutral-200' : 'bg-red-600 text-white border-red-700'
                  }`}
                  title={isCamOn ? 'Turn Off Camera' : 'Turn On Camera'}
                >
                  {isCamOn ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => setActiveCallDoctor(null)}
                  className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm"
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
