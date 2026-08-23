'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { NexoraLogo } from '@/components/ui/NexoraLogo'

export function DigitalIndiaEmblem({ className = 'h-10' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {/* Digital India Stylized SVG Badge */}
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-auto">
        <rect width="120" height="40" rx="4" fill="#FFFFFF" />
        {/* Saffron Arc */}
        <path d="M12 28 C 12 14, 28 14, 28 28" stroke="#F5821F" strokeWidth="3.5" strokeLinecap="round" />
        {/* Blue Inner Circle */}
        <circle cx="20" cy="20" r="4.5" fill="#0B3D91" />
        {/* Green Arc */}
        <path d="M14 30 C 14 36, 26 36, 26 30" stroke="#1E7A34" strokeWidth="2.5" strokeLinecap="round" />
        <text x="36" y="19" fill="#0B3D91" fontSize="11" fontFamily="sans-serif" fontWeight="900">
          Digital India
        </text>
        <text x="36" y="29" fill="#F5821F" fontSize="7.5" fontFamily="sans-serif" fontWeight="700">
          Power To Empower
        </text>
      </svg>
    </div>
  )
}

export function AyushmanBharatEmblem({ className = 'h-10' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <svg viewBox="0 0 110 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-auto">
        <rect width="110" height="40" rx="4" fill="#FFFFFF" />
        {/* Circular Seal */}
        <circle cx="20" cy="20" r="14" fill="#EAF1FB" stroke="#0B3D91" strokeWidth="1.5" />
        <path d="M20 10 L20 30 M10 20 L30 20" stroke="#F5821F" strokeWidth="3" strokeLinecap="round" />
        <circle cx="20" cy="20" r="3" fill="#1E7A34" />
        <text x="38" y="17" fill="#0B3D91" fontSize="9.5" fontFamily="sans-serif" fontWeight="800">
          ABDM
        </text>
        <text x="38" y="27" fill="#1E7A34" fontSize="7" fontFamily="sans-serif" fontWeight="700">
          Ayushman Bharat
        </text>
      </svg>
    </div>
  )
}

export function SwachhBharatEmblem({ className = 'h-10' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <svg viewBox="0 0 95 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        <rect width="95" height="40" rx="4" fill="#FFFFFF" />
        {/* Gandhi Spectacles */}
        <circle cx="16" cy="18" r="8" stroke="#0B3D91" strokeWidth="2" fill="#FFFFFF" />
        <circle cx="34" cy="18" r="8" stroke="#0B3D91" strokeWidth="2" fill="#FFFFFF" />
        <path d="M24 18 L26 18" stroke="#0B3D91" strokeWidth="2" />
        <text x="11" y="21" fill="#1E7A34" fontSize="6.5" fontFamily="sans-serif" fontWeight="bold">स्वच्छ</text>
        <text x="29" y="21" fill="#F5821F" fontSize="6.5" fontFamily="sans-serif" fontWeight="bold">भारत</text>
        <text x="46" y="20" fill="#0B3D91" fontSize="7.5" fontFamily="sans-serif" fontWeight="700">
          एक कदम स्वच्छता
        </text>
        <text x="46" y="28" fill="#1E7A34" fontSize="6.5" fontFamily="sans-serif" fontWeight="600">
          की ओर
        </text>
      </svg>
    </div>
  )
}

export function PortalHeader() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="bg-white text-[#1A1A1A] py-3 px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between border-b border-[#E0E0E0] shadow-sm gap-3">
      {/* Left: National Emblem + Bilingual Title */}
      <Link href="/" className="group hover:opacity-95 transition-opacity">
        <NexoraLogo size={46} showText={true} showBadge={true} subtitle="National Digital Health & Sovereign Portal" />
      </Link>

      {/* Center/Right: Government Mission Emblems (Digital India, ABDM, Swachh Bharat) */}
      <div className="hidden xl:flex items-center gap-3 border-x border-[#E0E0E0] px-4">
        <DigitalIndiaEmblem />
        <AyushmanBharatEmblem />
        <SwachhBharatEmblem />
      </div>

      {/* Right: Search + Login / Register Action Buttons */}
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="relative hidden sm:block w-44 lg:w-56">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search portal services..."
            className="w-full pl-8 pr-3 py-1.5 rounded-md bg-[#F4F6F9] text-[#1A1A1A] text-xs border border-[#CBD5E1] placeholder:text-[#64748B] focus:outline-none focus:bg-white focus:border-[#0B3D91] transition-all"
          />
          <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider text-[#0B3D91] border-2 border-[#0B3D91] hover:bg-[#0B3D91] hover:text-white transition-all shadow-sm"
          >
            LOGIN
          </Link>

          <Link
            href="/register"
            className="px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider text-white bg-[#F5821F] hover:bg-[#D66D10] transition-all shadow-sm"
          >
            REGISTER
          </Link>
        </div>
      </div>
    </div>
  )
}

