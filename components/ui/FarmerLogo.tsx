'use client'

import React from 'react'

interface FarmerLogoProps {
  className?: string
  size?: number | string
  showText?: boolean
  showBadge?: boolean
  subtitle?: string
}

export function FarmerLogoIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Sleek Golden Orange Gradient matching UI */}
        <linearGradient id="shetiOrangeGrad" x1="4" y1="4" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFA726" />
          <stop offset="100%" stopColor="#F5820D" />
        </linearGradient>

        <linearGradient id="shetiGreenGrad" x1="12" y1="12" x2="24" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>

      {/* Hexagonal Shield Container */}
      <path
        d="M18 3L30 8.5V18C30 25.5 24.8 31.8 18 34C11.2 31.8 6 25.5 6 18V8.5L18 3Z"
        stroke="url(#shetiOrangeGrad)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#0E172E"
      />

      {/* Sprout / Seedling Geometric Emblem */}
      {/* Central Stem */}
      <path
        d="M18 26V13"
        stroke="url(#shetiOrangeGrad)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Left Leaf Curved */}
      <path
        d="M18 19C14 18.5 11 15 11.5 11C15 11 18 14 18 19Z"
        stroke="url(#shetiGreenGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="rgba(52, 211, 153, 0.18)"
      />

      {/* Right Leaf Curved */}
      <path
        d="M18 16C21.5 15.5 24.5 12.5 24 9C20.5 9 18 12 18 16Z"
        stroke="url(#shetiOrangeGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="rgba(245, 130, 13, 0.2)"
      />

      {/* Modern Center Sensor / Node Dot */}
      <circle
        cx="18"
        cy="26"
        r="1.8"
        fill="#FFA726"
      />
    </svg>
  )
}

export function FarmerLogo({
  className = '',
  size = 38,
  showText = true,
  showBadge = true,
  subtitle = 'SMART AGRI-TECH PLATFORM'
}: FarmerLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon Container */}
      <div 
        style={{ width: size, height: size }}
        className="rounded-xl bg-[#151C30] border border-[#2C3A57] flex items-center justify-center p-1.5 shadow-sm shrink-0 transition-transform duration-200 hover:scale-105"
      >
        <FarmerLogoIcon className="w-full h-full" />
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-xl tracking-tight text-white">
              MAZHI SHETI
            </span>
            {showBadge && (
              <span className="font-sans font-black text-[10px] px-2 py-0.5 rounded-md bg-[#E0821F] text-[#1A1004] leading-none shadow-sm tracking-wide">
                माझी शेती
              </span>
            )}
          </div>
          <span className="font-sans font-bold text-[10px] text-[#7CA3CE] tracking-wider uppercase -mt-0.5">
            {subtitle}
          </span>
        </div>
      )}
    </div>
  )
}
