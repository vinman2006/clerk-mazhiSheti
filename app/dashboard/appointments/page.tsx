'use client'

import React from 'react'
import Link from 'next/link'
import { Calendar, Clock, Building2, ShieldCheck, ArrowRight, CheckCircle2, User, Ban } from 'lucide-react'
import { useUserData } from '@/lib/userDataContext'
import { VerifiedBadge } from '@/components/ui/VerifiedBadge'
import { SimulatedBadge } from '@/components/ui/SimulatedBadge'

export default function AppointmentsPage() {
  const { appointments, cancelAppointment, profile } = useUserData()

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
                  <button
                    onClick={() => cancelAppointment(apt.id)}
                    className="p-2.5 rounded-lg bg-red-500/15 hover:bg-red-500 text-red-300 hover:text-white border border-red-500/30 text-xs font-mono font-bold transition-all flex items-center gap-1"
                    title="Cancel Appointment & Revoke Consent"
                  >
                    <Ban className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
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
    </div>
  )
}
