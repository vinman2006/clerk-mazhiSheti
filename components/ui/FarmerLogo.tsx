'use client'

import React from 'react'
import { MazhiShetiLogo, MazhiShetiIcon, MazhiShetiAppIcon, MazhiShetiLogoProps } from './MazhiShetiLogo'

export { MazhiShetiLogo, MazhiShetiIcon, MazhiShetiAppIcon }

export interface FarmerLogoProps {
  className?: string
  iconClassName?: string
  size?: number | string
  showText?: boolean
  showBadge?: boolean
  roleLabel?: string
  subtitle?: string
  theme?: 'dark' | 'light' | 'monochrome' | 'auto'
}

/**
 * Option 01 — THE LEAF Icon
 * Backwards compatible export for legacy FarmerLogoIcon references.
 */
export function FarmerLogoIcon({
  className = 'w-6 h-6',
  size,
  color,
}: {
  className?: string
  size?: number | string
  color?: string
}) {
  return <MazhiShetiIcon className={className} size={size || '100%'} color={color} />
}

/**
 * Master Mazhi Sheti Logo
 * Backwards-compatible component for FarmerLogo references across all portals.
 */
export function FarmerLogo({
  className = '',
  iconClassName = '',
  size = 36,
  showText = true,
  showBadge = true,
  roleLabel,
  subtitle = 'SMART AGRI-TECH PLATFORM',
  theme = 'dark',
}: FarmerLogoProps) {
  return (
    <MazhiShetiLogo
      className={className}
      iconClassName={iconClassName}
      size={size}
      showText={showText}
      showBadge={showBadge}
      roleLabel={roleLabel}
      subtitle={subtitle}
      theme={theme}
    />
  )
}
