'use client'

import React from 'react'
import { MazhiShetiLogo, MazhiShetiIcon, MazhiShetiLogoProps } from './MazhiShetiLogo'

export { MazhiShetiLogo, MazhiShetiIcon }

export interface NexoraLogoProps {
  className?: string
  size?: number | string
  showText?: boolean
  showBadge?: boolean
  subtitle?: string
}

export function NexoraLogoIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return <MazhiShetiIcon className={className} size="100%" />
}

export function NexoraLogo({
  className = '',
  size = 38,
  showText = true,
  showBadge = true,
  subtitle = 'SMART AGRI-TECH PLATFORM'
}: NexoraLogoProps) {
  return (
    <MazhiShetiLogo
      className={className}
      size={size}
      showText={showText}
      showBadge={showBadge}
      subtitle={subtitle}
    />
  )
}
