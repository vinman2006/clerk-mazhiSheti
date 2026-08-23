'use client'

import React from 'react'

interface NexoraLogoProps {
  className?: string
  size?: number | string
  showText?: boolean
  showBadge?: boolean
  subtitle?: string
}

export function NexoraLogoIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Sleek Minimalist Gradient: Pure Institutional Orange */}
        <linearGradient id="nexoraMinimalGrad" x1="4" y1="4" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFA726" />
          <stop offset="100%" stopColor="#F5820D" />
        </linearGradient>

        <linearGradient id="nexoraBlueAccent" x1="12" y1="12" x2="24" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>

      {/* 1. Sleek Minimalist Outer Shield Contour */}
      <path
        d="M18 3L30 7.5V17C30 24.5 24.8 30.8 18 33C11.2 30.8 6 24.5 6 17V7.5L18 3Z"
        stroke="url(#nexoraMinimalGrad)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#0E162B"
      />

      {/* 2. Pure Geometric "N" Nexus + Healthcare Cross Mark */}
      {/* Left Stem */}
      <path
        d="M13 12V24"
        stroke="url(#nexoraMinimalGrad)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Dynamic Diagonal */}
      <path
        d="M13 13.5L23 22.5"
        stroke="url(#nexoraMinimalGrad)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Right Stem */}
      <path
        d="M23 12V24"
        stroke="url(#nexoraMinimalGrad)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Central ZK Verification Dot */}
      <circle
        cx="18"
        cy="18"
        r="2"
        fill="#FFFFFF"
      />
    </svg>
  )
}

export function NexoraLogo({
  className = '',
  size = 38,
  showText = true,
  showBadge = true,
  subtitle = 'ZERO-TRUST HEALTH NET'
}: NexoraLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Clean Minimalist Icon Container */}
      <div 
        style={{ width: size, height: size }}
        className="rounded-xl bg-nexora-bg-elevated border border-nexora-border-strong flex items-center justify-center p-1.5 shadow-sm shrink-0 transition-transform duration-200 hover:scale-105"
      >
        <NexoraLogoIcon className="w-full h-full" />
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-xl tracking-tight text-nexora-text-primary">
              NEXORA
            </span>
            {showBadge && (
              <span className="font-sans font-bold text-[10px] px-1.5 py-0.5 rounded bg-[rgba(224,130,31,0.12)] text-nexora-orange-400 border border-nexora-orange-500/30 leading-none shadow-sm">
                नेक्सोरा
              </span>
            )}
          </div>
          <span className="font-sans font-bold text-[10px] text-nexora-text-muted tracking-wider uppercase -mt-0.5">
            {subtitle}
          </span>
        </div>
      )}
    </div>
  )
}
