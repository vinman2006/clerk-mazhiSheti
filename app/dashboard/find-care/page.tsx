'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Search, 
  Star, 
  Building2, 
  ArrowRight, 
  Stethoscope, 
  CheckCircle2 
} from 'lucide-react'
import { MOCK_PROVIDERS, Provider } from '@/lib/mockData'
import { VerifiedBadge } from '@/components/ui/VerifiedBadge'
import { SimulatedBadge } from '@/components/ui/SimulatedBadge'

export default function FindCarePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All')

  const specialties = ['All', 'Cardiology', 'Neurology', 'Endocrinology', 'Pulmonology']

  const filteredProviders = MOCK_PROVIDERS.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.specialty.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSpecialty = selectedSpecialty === 'All' || p.specialty === selectedSpecialty

    return matchesSearch && matchesSpecialty
  })

  return (
    <div className="space-y-6 text-[#1A1A1A]">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-lg bg-white border border-[#E0E0E0] border-l-4 border-l-[#0B3D91] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-[#0B3D91]">
              Find Verified Doctors & Clinics (डॉक्टर व रुग्णालय शोध)
            </h1>
            <SimulatedBadge />
          </div>
          <p className="text-xs text-[#4B5563] mt-1">
            Every provider is cryptographically authenticated via W3C Verifiable Credentials issued by authorized state medical councils.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded bg-green-100 border border-green-300 text-[#1E7A34] text-xs font-bold shadow-sm">
            100% DID Verified Providers ✓
          </span>
        </div>
      </div>

      {/* SEARCH AND SPECIALTY FILTERS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-lg bg-white border border-[#E0E0E0] shadow-sm">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by doctor, specialty, hospital..."
            className="w-full pl-9 pr-3 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-[#1A1A1A] focus:outline-none focus:bg-white focus:border-[#0B3D91]"
          />
        </div>

        {/* Specialty Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-xs">
          {specialties.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-3.5 py-1.5 rounded font-bold whitespace-nowrap transition-all ${
                selectedSpecialty === spec
                  ? 'bg-[#0B3D91] text-white shadow-sm'
                  : 'text-neutral-700 hover:text-black bg-[#F8FAFC] border border-[#CBD5E1]'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* PROVIDER CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProviders.map((provider) => (
          <div
            key={provider.id}
            className="p-5 rounded-lg bg-white border border-[#E0E0E0] border-t-4 border-t-[#0B3D91] hover:shadow-md transition-all flex flex-col justify-between space-y-4 shadow-sm group"
          >
            <div className="space-y-3">
              {/* Doctor Avatar & Basic Info */}
              <div className="flex items-start gap-3.5">
                <img
                  src={provider.avatarUrl}
                  alt={provider.name}
                  className="w-14 h-14 rounded-lg object-cover border-2 border-[#F5821F] bg-neutral-100"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-sm text-[#0B3D91] truncate">
                      {provider.name}
                    </h3>
                    <div className="flex items-center gap-1 text-amber-600 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{provider.rating}</span>
                    </div>
                  </div>

                  <span className="text-xs text-[#D66D10] font-bold block">
                    {provider.title}
                  </span>

                  <div className="flex items-center gap-1.5 text-xs text-[#4B5563] mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-[#0B3D91] shrink-0" />
                    <span className="truncate">{provider.hospital}</span>
                  </div>
                </div>
              </div>

              {/* Verified Credential & DID Pill */}
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <VerifiedBadge
                  entity="Medical Council"
                  did={provider.did}
                  credentialId={provider.credentialId}
                  zkProof={provider.zkProofBadge}
                />
                <span className="px-2 py-0.5 rounded bg-neutral-100 text-[10px] font-bold text-neutral-700 border border-neutral-300">
                  {provider.experienceYears} Years Exp
                </span>
              </div>

              {/* Bio */}
              <p className="text-xs text-[#4B5563] leading-relaxed line-clamp-2">
                {provider.bio}
              </p>

              {/* Fee & Location */}
              <div className="p-3 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-[#4B5563] flex justify-between items-center">
                <span>Consultation Fee: <strong className="text-[#1A1A1A]">{provider.fee}</strong></span>
                <span className="text-[#1E7A34] font-bold">Slots Available ✓</span>
              </div>
            </div>

            {/* Action */}
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-[11px] text-neutral-500 font-mono">
                DID: {provider.did.slice(0, 16)}...
              </span>

              <Link
                href={`/dashboard/book/${provider.id}`}
                className="px-4 py-2 rounded bg-[#1E7A34] hover:bg-[#145524] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>Select & Book Doctor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
