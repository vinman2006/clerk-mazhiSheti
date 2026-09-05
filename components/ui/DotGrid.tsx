'use client'

import React, { useRef, useEffect, useMemo } from 'react'

export interface DotGridProps {
  dotSize?: number
  gap?: number
  baseColor?: string
  activeColor?: string
  proximity?: number
  speedTrigger?: number
  shockRadius?: number
  shockStrength?: number
  maxSpeed?: number
  resistance?: number
  returnDuration?: number
  className?: string
  style?: React.CSSProperties
}

// ============================================================
// CENTRALIZED CONFIGURATION FOR CALM SOVEREIGN AGRI GRID
// Strictly adhering to 80% stable, 20% moving philosophy
// ============================================================
const DOT_CONFIG = {
  MAX_DISPLACEMENT: 3.5,        // Strict 2-4px maximum displacement (no violent kicks)
  INTERACTION_RADIUS: 160,      // Soft magnetic influence radius (120-180px)
  POINTER_EASE: 0.1,            // Smooth mouse target interpolation
  RETURN_SPEED: 0.06,           // Gentle, calm return to rest position (no snapping)
  AMBIENT_SPEED: 0.0006,        // Slow, organic field breathing
  AMBIENT_AMPLITUDE: 0.3,       // Subtle <0.5px wave displacement
  BASE_OPACITY: 0.32,           // Calm technological baseline presence
  ACTIVE_OPACITY_BOOST: 0.38,   // Gentle luminescence under magnetic field
}

interface DotNode {
  baseX: number
  baseY: number
  offsetX: number
  offsetY: number
  targetOffsetX: number
  targetOffsetY: number
  alpha: number
  targetAlpha: number
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '')
  const m = clean.match(/.{1,2}/g)
  if (!m || m.length < 3) return { r: 34, g: 66, b: 117 }
  return {
    r: parseInt(m[0], 16),
    g: parseInt(m[1], 16),
    b: parseInt(m[2], 16),
  }
}

export const DotGrid: React.FC<DotGridProps> = ({
  dotSize = 5,
  gap = 26,
  baseColor = '#224275',
  activeColor = '#F5820D',
  className = '',
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<DotNode[]>([])

  // State held strictly in refs to prevent React re-renders during 60FPS loop
  const pointerRef = useRef({
    targetX: -9999,
    targetY: -9999,
    currX: -9999,
    currY: -9999,
    isActive: false,
  })

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor])
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor])

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    let animationFrameId: number
    let isTouchDevice = false
    let prefersReducedMotion = false

    // 1. Check client capabilities & accessibility
    if (typeof window !== 'undefined') {
      isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }

    // 2. Build Grid Nodes based on container dimensions
    const setupGrid = () => {
      if (!container || !canvas) return
      const rect = container.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      if (width === 0 || height === 0) return

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.scale(dpr, dpr)
      }

      const cell = dotSize + gap
      const cols = Math.floor((width + gap) / cell)
      const rows = Math.floor((height + gap) / cell)

      const gridW = cell * cols - gap
      const gridH = cell * rows - gap
      const startX = (width - gridW) / 2 + dotSize / 2
      const startY = (height - gridH) / 2 + dotSize / 2

      const newDots: DotNode[] = []
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          newDots.push({
            baseX: startX + x * cell,
            baseY: startY + y * cell,
            offsetX: 0,
            offsetY: 0,
            targetOffsetX: 0,
            targetOffsetY: 0,
            alpha: DOT_CONFIG.BASE_OPACITY,
            targetAlpha: DOT_CONFIG.BASE_OPACITY,
          })
        }
      }
      dotsRef.current = newDots
    }

    setupGrid()

    // 3. Pointer event listeners (GPU-efficient, outside React render tree)
    const handlePointerMove = (e: MouseEvent) => {
      if (isTouchDevice || prefersReducedMotion) return
      const rect = container.getBoundingClientRect()
      // Check if mouse is near or inside container
      if (
        e.clientX >= rect.left - 50 &&
        e.clientX <= rect.right + 50 &&
        e.clientY >= rect.top - 50 &&
        e.clientY <= rect.bottom + 50
      ) {
        pointerRef.current.targetX = e.clientX - rect.left
        pointerRef.current.targetY = e.clientY - rect.top
        pointerRef.current.isActive = true
      } else {
        pointerRef.current.isActive = false
      }
    }

    const handlePointerLeave = () => {
      pointerRef.current.isActive = false
    }

    window.addEventListener('mousemove', handlePointerMove, { passive: true })
    document.addEventListener('mouseleave', handlePointerLeave)

    // 4. Resize handling
    let resizeObserver: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => setupGrid())
      resizeObserver.observe(container)
    } else {
      window.addEventListener('resize', setupGrid)
    }

    // 5. Calm 60FPS Render & Physics Loop
    const radSq = DOT_CONFIG.INTERACTION_RADIUS * DOT_CONFIG.INTERACTION_RADIUS

    const renderLoop = (timestamp: number) => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const width = container.clientWidth
      const height = container.clientHeight
      ctx.clearRect(0, 0, width, height)

      const ptr = pointerRef.current

      // Interpolate smoothed pointer position
      if (ptr.isActive) {
        ptr.currX += (ptr.targetX - ptr.currX) * DOT_CONFIG.POINTER_EASE
        ptr.currY += (ptr.targetY - ptr.currY) * DOT_CONFIG.POINTER_EASE
      } else {
        // Drift away off-canvas when inactive so dots smoothly return to rest
        ptr.currX += (-9999 - ptr.currX) * 0.05
        ptr.currY += (-9999 - ptr.currY) * 0.05
      }

      const dots = dotsRef.current
      const dotRadius = dotSize / 2
      const timeAmbient = timestamp * DOT_CONFIG.AMBIENT_SPEED

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i]

        // Compute distance from smoothed pointer
        const dx = dot.baseX - ptr.currX
        const dy = dot.baseY - ptr.currY
        const distSq = dx * dx + dy * dy

        if (ptr.isActive && distSq < radSq) {
          const dist = Math.sqrt(distSq)
          const norm = dist / DOT_CONFIG.INTERACTION_RADIUS // 0 to 1
          // Smooth cosine magnetic falloff (1 at center, 0 at radius, with zero derivative at edge)
          const influence = Math.pow(Math.cos(norm * Math.PI * 0.5), 2)
          const displacement = DOT_CONFIG.MAX_DISPLACEMENT * influence

          const angle = Math.atan2(dy, dx)
          dot.targetOffsetX = Math.cos(angle) * displacement
          dot.targetOffsetY = Math.sin(angle) * displacement
          dot.targetAlpha = DOT_CONFIG.BASE_OPACITY + DOT_CONFIG.ACTIVE_OPACITY_BOOST * influence
        } else {
          // Neutral resting state
          dot.targetOffsetX = 0
          dot.targetOffsetY = 0
          dot.targetAlpha = DOT_CONFIG.BASE_OPACITY
        }

        // Add subtle ambient breathing unless reduced motion
        if (!prefersReducedMotion) {
          const wave = Math.sin(timeAmbient + dot.baseX * 0.008 + dot.baseY * 0.008) * DOT_CONFIG.AMBIENT_AMPLITUDE
          dot.targetOffsetY += wave
        }

        // Smoothly lerp towards target offset (slow, calm return)
        dot.offsetX += (dot.targetOffsetX - dot.offsetX) * DOT_CONFIG.RETURN_SPEED
        dot.offsetY += (dot.targetOffsetY - dot.offsetY) * DOT_CONFIG.RETURN_SPEED
        dot.alpha += (dot.targetAlpha - dot.alpha) * 0.08

        // Draw dot at computed position
        const posX = dot.baseX + dot.offsetX
        const posY = dot.baseY + dot.offsetY

        // Interpolate color gently
        const colorT = Math.max(0, Math.min(1, (dot.alpha - DOT_CONFIG.BASE_OPACITY) / DOT_CONFIG.ACTIVE_OPACITY_BOOST))
        const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * colorT)
        const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * colorT)
        const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * colorT)

        ctx.beginPath()
        ctx.arc(posX, posY, dotRadius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${dot.alpha})`
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(renderLoop)
    }

    animationFrameId = requestAnimationFrame(renderLoop)

    // 6. Complete lifecycle cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handlePointerMove)
      document.removeEventListener('mouseleave', handlePointerLeave)
      if (resizeObserver) {
        resizeObserver.disconnect()
      } else {
        window.removeEventListener('resize', setupGrid)
      }
    }
  }, [dotSize, gap, baseRgb, activeRgb])

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden pointer-events-none ${className}`} style={style}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  )
}

export default DotGrid
