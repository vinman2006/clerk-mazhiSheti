'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Building2, 
  ArrowRight, 
  Sparkles, 
  Lock 
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
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-xl bg-[#141826] border-2 border-[#1E3A8A] shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-black text-2xl text-white">
              Find Verified Doctors & Clinics
            </h1>
            <SimulatedBadge />
          </div>
          <p className="text-xs font-sans text-neutral-300 mt-1">
            Every provider is cryptographically authenticated via W3C Verifiable Credentials issued by authorized medical licensing boards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-md bg-[#101420] border-2 border-portal-green text-portal-green font-mono text-xs font-bold shadow-sm">
            100% DID Verified Providers ✓
          </span>
        </div>
      </div>

      {/* SEARCH AND SPECIALTY FILTERS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#141826] border border-neutral-700">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by doctor, specialty, hospital..."
            className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#101420] border border-neutral-700 text-xs text-white focus:outline-none focus:border-portal-orange font-sans placeholder:text-neutral-500"
          />
        </div>

        {/* Specialty Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto font-mono text-xs">
          {specialties.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-3.5 py-1.5 rounded-md font-bold whitespace-nowrap transition-all ${
                selectedSpecialty === spec
                  ? 'bg-portal-orange text-white shadow-sm'
                  : 'text-neutral-300 hover:text-white bg-[#101420] border border-neutral-700'
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
            className="p-5 rounded-xl bg-[#141826] border border-neutral-700 border-l-4 border-l-portal-orange hover:border-neutral-600 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
          >
            <div className="space-y-3">
              {/* Doctor Avatar & Basic Info */}
              <div className="flex items-start gap-3.5">
                <img
                  src={provider.avatarUrl}
                  alt={provider.name}
                  className="w-14 h-14 rounded-lg object-cover border-2 border-portal-orange"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display font-bold text-sm text-white truncate">
                      {provider.name}
                    </h3>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-mono font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{provider.rating}</span>
                    </div>
                  </div>

                  <span className="text-xs text-portal-orange font-mono font-bold block">
                    {provider.title}
                  </span>

                  <div className="flex items-center gap-1.5 text-xs text-neutral-300 font-sans mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                    <span className="truncate">{provider.hospital}</span>
                  </div>
                </div>
              </div>

              {/* Verified Credential & DID Pill */}
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <VerifiedBadge
                  entity="Medical Board"
                  did={provider.did}
                  credentialId={provider.credentialId}
                  zkProof={provider.zkProofBadge}
                />
                <span className="px-2 py-0.5 rounded bg-[#101420] text-[10px] font-mono font-bold text-neutral-300 border border-neutral-700">
                  {provider.experienceYears} Years Exp
                </span>
              </div>

              {/* Bio */}
              <p className="text-xs text-neutral-300 font-sans leading-relaxed line-clamp-2">
                {provider.bio}
              </p>

              {/* Fee & Location */}
              <div className="p-3 rounded-lg bg-[#101420] border border-neutral-700 text-xs font-mono text-neutral-300 flex justify-between items-center">
                <span>Fee: <span className="text-white font-bold">{provider.fee}</span></span>
                <span className="text-portal-green font-bold">Slots Available This Week ✓</span>
              </div>
            </div>

            {/* Action */}
            <div className="pt-2 border-t border-neutral-700/60 flex items-center justify-between">
              <span className="font-mono text-[11px] text-neutral-400">
                DID: {provider.did.slice(0, 16)}...
              </span>

              <Link
                href={`/dashboard/book/${provider.id}`}
                className="px-4 py-2 rounded-lg bg-[#2E7D32] hover:bg-[#256629] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5"
              >
                <span>Select & Authorize</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
