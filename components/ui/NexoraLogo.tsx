'use client'

import React from 'react'

interface NexoraLogoProps {
  className?: string
  size?: number | string
  showText?: boolean
  showBadge?: boolean
  subtitle?: string
  lightMode?: boolean
}

export function StateEmblemOfIndia({ className = 'w-9 h-11' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Ashoka Lion Capital Stylized Vector */}
      <path
        d="M50 12 C42 12 36 18 36 26 C36 34 42 40 50 40 C58 40 64 34 64 26 C64 18 58 12 50 12 Z"
        fill="#0B3D91"
      />
      {/* Side Lions */}
      <path
        d="M28 22 C22 22 18 28 18 36 C18 42 22 48 28 48 C32 48 35 45 36 41 C33 37 31 31 33 25 C31 23 30 22 28 22 Z"
        fill="#0B3D91"
        opacity="0.85"
      />
      <path
        d="M72 22 C78 22 82 28 82 36 C82 42 78 48 72 48 C68 48 65 45 64 41 C67 37 69 31 67 25 C69 23 70 22 72 22 Z"
        fill="#0B3D91"
        opacity="0.85"
      />
      {/* Abacus Base Platform */}
      <path
        d="M16 52 L84 52 L80 62 L20 62 Z"
        fill="#0B3D91"
      />
      {/* Ashoka Chakra Wheel */}
      <circle cx="50" cy="57" r="4.5" stroke="#F5821F" strokeWidth="1.5" fill="#FFFFFF" />
      {/* Bull & Horse accents */}
      <circle cx="28" cy="57" r="2.5" fill="#FFFFFF" opacity="0.9" />
      <circle cx="72" cy="57" r="2.5" fill="#FFFFFF" opacity="0.9" />
      {/* Bell Capital / Lotus Base */}
      <path
        d="M24 64 C24 74 36 82 50 82 C64 82 76 74 76 64 Z"
        fill="#0B3D91"
      />
      {/* Satyameva Jayate Banner */}
      <path
        d="M12 90 Q50 96 88 90 L84 99 Q50 105 16 99 Z"
        fill="#0B3D91"
      />
      <text
        x="50"
        y="97"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="5"
        fontFamily="sans-serif"
        fontWeight="bold"
      >
        सत्यमेव जयते
      </text>
    </svg>
  )
}

export function NexoraLogoIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Shield in Navy */}
      <path
        d="M18 3L30 7.5V17C30 24.5 24.8 30.8 18 33C11.2 30.8 6 24.5 6 17V7.5L18 3Z"
        fill="#0B3D91"
        stroke="#F5821F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Medical Cross in White */}
      <rect x="15" y="10" width="6" height="14" rx="1.5" fill="#FFFFFF" />
      <rect x="11" y="14" width="14" height="6" rx="1.5" fill="#FFFFFF" />
      {/* Ashoka Chakra Accent in Center */}
      <circle cx="18" cy="17" r="2.2" fill="#0B3D91" />
      <circle cx="18" cy="17" r="1" fill="#F5821F" />
    </svg>
  )
}

export function NexoraLogo({
  className = '',
  size = 44,
  showText = true,
  showBadge = true,
  subtitle = 'National Sovereign Health Portal',
  lightMode = true
}: NexoraLogoProps) {
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {/* State Emblem */}
      <div className="shrink-0 flex items-center justify-center">
        <StateEmblemOfIndia className="w-10 h-12" />
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2">
            <span className="font-sans font-extrabold text-2xl tracking-tight text-[#0B3D91] leading-none">
              नेक्सोरा <span className="text-[#F5821F] font-black">NEXORA</span>
            </span>
            {showBadge && (
              <span className="font-sans font-bold text-[10px] px-2 py-0.5 rounded bg-[#FFF5EB] text-[#D66D10] border border-[#F5821F]/40 leading-none">
                भारत सरकार
              </span>
            )}
          </div>
          <span className="font-sans font-semibold text-[11px] text-[#4B5563] tracking-wide mt-1">
            {subtitle} • <span className="text-[#0B3D91] font-bold">Government of India</span>
          </span>
        </div>
      )}
    </div>
  )
}

