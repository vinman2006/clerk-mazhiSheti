'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { 
  Building2, 
  ShieldCheck, 
  MapPin, 
  Cpu, 
  Star, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Lock, 
  Calendar 
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { MOCK_PROVIDERS } from '@/lib/mockData'
import { VerifiedBadge } from '@/components/ui/VerifiedBadge'
import { SimulatedBadge } from '@/components/ui/SimulatedBadge'

export default function PublicHospitalProfilePage() {
  const params = useParams()
  const hospitalName = 'Apex Heart & Vascular Institute'

  const hospitalDoctors = MOCK_PROVIDERS.filter(p => p.hospital.includes('Apex') || p.specialty === 'Cardiology')

  return (
    <div className="min-h-screen bg-[#0B0E17] text-white flex flex-col selection:bg-portal-orange/20 selection:text-portal-orange">
      <Navbar />

      <main className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 flex-1">
        {/* Back Link */}
        <Link
          href="/dashboard/find-care"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-portal-orange hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Provider Directory</span>
        </Link>

        {/* HERO BANNER */}
        <div className="p-6 sm:p-8 rounded-xl bg-[#141826] border-2 border-[#1E3A8A] shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
                  {hospitalName}
                </h1>
                <VerifiedBadge entity="Hospital Legal Entity" did="did:nexora:org:apex-heart:8812" />
                <SimulatedBadge />
              </div>

              <div className="flex items-center gap-2 text-xs text-neutral-300 font-sans">
                <MapPin className="w-3.5 h-3.5 text-portal-orange shrink-0" />
                <span>Metropolis Medical District, Sector 4 • DID: did:nexora:org:apex-heart:8812</span>
              </div>

              <p className="text-xs sm:text-sm font-sans text-neutral-300 max-w-2xl leading-relaxed pt-2">
                Tertiary cardiovascular medical center pioneering non-invasive diagnostics, robotic cardiac intervention, and privacy-preserving federated AI telemetry modeling.
              </p>
            </div>

            {/* AI Node Status Pill */}
            <div className="p-4 rounded-lg bg-[#101420] border border-neutral-700 border-l-4 border-l-portal-blue space-y-2 font-mono text-xs text-right shrink-0">
              <div className="flex items-center justify-end gap-2 text-blue-300 font-bold">
                <Cpu className="w-4 h-4" />
                <span>Federated AI Node Active</span>
              </div>
              <span className="text-[11px] text-neutral-400 block">Model Round: #142 (Sync Valid)</span>
              <span className="text-[10px] text-portal-green font-bold block">Zero PHI Transmission Guarantee ✓</span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-neutral-700 font-mono text-xs">
            <div className="p-3.5 rounded-lg bg-[#101420] border border-neutral-700">
              <span className="text-neutral-400 text-[10px] block font-bold">Verified Physicians:</span>
              <span className="font-bold text-portal-orange text-base">42 Specialists</span>
            </div>
            <div className="p-3.5 rounded-lg bg-[#101420] border border-neutral-700">
              <span className="text-neutral-400 text-[10px] block font-bold">Emergency Slots:</span>
              <span className="font-bold text-portal-green text-base">Available Today ✓</span>
            </div>
            <div className="p-3.5 rounded-lg bg-[#101420] border border-neutral-700">
              <span className="text-neutral-400 text-[10px] block font-bold">Government Scheme:</span>
              <span className="font-bold text-white text-base">Tier-1 Copay</span>
            </div>
            <div className="p-3.5 rounded-lg bg-[#101420] border border-neutral-700">
              <span className="text-neutral-400 text-[10px] block font-bold">Consent Protocol:</span>
              <span className="font-bold text-portal-orange text-base">Smart Contract</span>
            </div>
          </div>
        </div>

        {/* AFFILIATED VERIFIED DOCTORS */}
        <div className="space-y-4">
          <div className="border-b border-neutral-700 pb-3 flex items-center justify-between">
            <h2 className="font-display font-black text-xl text-white">
              Verified Physicians at this Center
            </h2>
            <span className="text-xs font-mono text-portal-green font-bold">W3C Credential Backed ✓</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {hospitalDoctors.map((doc) => (
              <div
                key={doc.id}
                className="p-5 rounded-xl bg-[#141826] border border-neutral-700 border-l-4 border-l-portal-orange hover:border-neutral-600 transition-all flex flex-col justify-between space-y-4 shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-3.5">
                    <img
                      src={doc.avatarUrl}
                      alt={doc.name}
                      className="w-14 h-14 rounded-lg object-cover border-2 border-portal-orange shadow-md"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-bold text-sm text-white truncate">
                          {doc.name}
                        </h3>
                        <div className="flex items-center gap-1 text-amber-400 text-xs font-mono font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{doc.rating}</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-portal-orange block">{doc.title}</span>
                      <span className="text-[11px] font-sans text-neutral-300 block">{doc.specialty}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <VerifiedBadge entity="Board Lic." did={doc.did} credentialId={doc.credentialId} />
                    <span className="px-2 py-0.5 rounded bg-[#101420] text-[10px] font-mono font-bold text-neutral-300 border border-neutral-700">
                      {doc.experienceYears} Yrs Exp
                    </span>
                  </div>

                  <p className="text-xs font-sans text-neutral-300 line-clamp-2">
                    {doc.bio}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-700/60 flex items-center justify-between">
                  <span className="font-mono text-xs text-white font-bold">{doc.fee}</span>
                  <Link
                    href={`/dashboard/book/${doc.id}`}
                    className="px-5 py-2.5 rounded-lg bg-[#2E7D32] hover:bg-[#256629] text-white font-bold font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md"
                  >
                    <span>Book Evaluation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
