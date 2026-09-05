'use client'

import React from 'react'

export interface MazhiShetiLogoProps {
  className?: string
  iconClassName?: string
  size?: number | string
  variant?: 'symbol' | 'wordmark' | 'compact'
  theme?: 'dark' | 'light' | 'monochrome' | 'auto'
  showText?: boolean
  showBadge?: boolean
  roleLabel?: string
  subtitle?: string
  priority?: boolean
}

/**
 * Option 01 — THE LEAF
 * Production-ready SVG vector reproduction of the two-leaf organic sprout + curved stem.
 * Renders crisply at 16px, 24px, 32px, 48px, 64px, 128px, and 256px+.
 */
export function MazhiShetiIcon({
  size = 28,
  className = '',
  theme = 'auto',
  color,
}: {
  size?: number | string
  className?: string
  theme?: 'dark' | 'light' | 'monochrome' | 'auto'
  color?: string
}) {
  // Determine fill/stroke color based on theme
  let leafColor = color
  if (!leafColor) {
    if (theme === 'monochrome') leafColor = 'currentColor'
    else if (theme === 'light') leafColor = '#15803D' // Deep agricultural green
    else leafColor = '#22C55E' // Vibrant crisp green on dark backgrounds
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 ${className}`}
      aria-hidden="true"
    >
      {/* Left Leaf — smooth organic geometry with pointed tip angled up-left */}
      <path
        d="M31 35 C22 34 10.5 25 12.5 12.5 C19 12 28.5 20.5 31.5 34 Z"
        fill={leafColor}
      />

      {/* Right Leaf — smooth organic geometry with pointed tip angled up-right */}
      <path
        d="M32.5 34 C41.5 33 53.5 24 51.5 11.5 C45 11 35.5 19.5 32 33 Z"
        fill={leafColor}
      />

      {/* Minimal curved stem emerging smoothly between the leaves */}
      <path
        d="M31.5 33.5 C31 41 29 48 30.5 53.5"
        stroke={leafColor}
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * App Icon Variant: Option 01 The Leaf centered on a dark forest-green rounded container.
 */
export function MazhiShetiAppIcon({
  size = 48,
  className = '',
}: {
  size?: number | string
  className?: string
}) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`rounded-2xl bg-[#092817] border border-[#164E2E]/60 shadow-lg flex items-center justify-center p-2 shrink-0 ${className}`}
    >
      <MazhiShetiIcon size="80%" theme="dark" />
    </div>
  )
}

/**
 * Master Mazhi Sheti Logo Component
 * Supports Symbol, Wordmark, and Compact variants with role qualifiers.
 */
export function MazhiShetiLogo({
  className = '',
  iconClassName = '',
  size = 34,
  variant = 'wordmark',
  theme = 'dark',
  showText = true,
  showBadge = false,
  roleLabel,
  subtitle,
}: MazhiShetiLogoProps) {
  // If variant is 'symbol', only render the icon
  if (variant === 'symbol') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`} title="Mazhi Sheti">
        <MazhiShetiIcon size={size} theme={theme} className={iconClassName} />
        <span className="sr-only">Mazhi Sheti</span>
      </div>
    )
  }

  const isLight = theme === 'light'
  const textColor = isLight ? 'text-slate-900' : 'text-white'
  const subtextColor = isLight ? 'text-slate-600' : 'text-blue-200/80'

  return (
    <div
      className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}
      role="img"
      aria-label={roleLabel ? `Mazhi Sheti — ${roleLabel}` : 'Mazhi Sheti'}
    >
      {/* Brand Symbol Container */}
      <div
        style={{ width: size, height: size }}
        className={`rounded-xl flex items-center justify-center p-1.5 shrink-0 transition-transform duration-200 group-hover:scale-105 ${
          isLight
            ? 'bg-emerald-50 border border-emerald-200/80 shadow-sm'
            : 'bg-[#0B1E19]/80 border border-emerald-500/25 shadow-sm'
        }`}
      >
        <MazhiShetiIcon size="100%" theme={theme} className={iconClassName} />
      </div>

      {/* Wordmark and optional Role Qualifier */}
      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-2">
            {/* Primary Wordmark: Mazhi Sheti */}
            <span
              className={`font-display font-extrabold tracking-tight ${textColor}`}
              style={{ fontSize: typeof size === 'number' ? Math.max(16, Math.round(size * 0.52)) : '18px' }}
            >
              Mazhi Sheti
            </span>

            {/* Optional Marathi Localized Badge */}
            {showBadge && (
              <span className="font-sans font-black text-[10px] px-1.5 py-0.5 rounded-md bg-[#F5820D] text-[#140D04] leading-none shadow-sm tracking-wide">
                माझी शेती
              </span>
            )}

            {/* Role Qualifier Tag (e.g. Farmer, Bank, Provider) */}
            {roleLabel && (
              <span className="font-mono font-bold text-[10px] uppercase px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                {roleLabel}
              </span>
            )}
          </div>

          {/* Subtitle / Platform Tagline */}
          {subtitle && (
            <span
              className={`font-sans font-semibold text-[10px] tracking-wider uppercase mt-1 ${subtextColor}`}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
