'use client'

import React, { useRef, useEffect } from 'react'

interface KiloWaveCanvasProps {
  className?: string
}

export function KiloWaveCanvas({ className = '' }: KiloWaveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 200
    }

    const resize = () => {
      const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.targetX = e.clientX - rect.left
      mouse.targetY = e.clientY - rect.top
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Render loop: Generative Stipple Halftone Wave Terrain
    const render = () => {
      time += 0.008
      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08
      mouse.y += (mouse.targetY - mouse.y) * 0.08

      ctx.clearRect(0, 0, width, height)

      const cols = Math.floor(width / 18)
      const rows = Math.floor(height / 18)
      const stepX = width / cols
      const stepY = height / rows

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const posX = x * stepX
          const posY = y * stepY

          // Multi-frequency wave pattern simulating generative stipple topographic flow
          const angle1 = (x * 0.08) + (y * 0.05) + (time * 1.5)
          const angle2 = (x * 0.03) - (y * 0.07) + (time * 0.8)
          const waveVal = Math.sin(angle1) * Math.cos(angle2)

          // Distance from mouse for interactive ripple
          const dx = posX - mouse.x
          const dy = posY - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const mouseEffect = dist < mouse.radius ? (1 - dist / mouse.radius) * 2 : 0

          // Calculate stipple dot radius and alpha
          const normalized = (waveVal + 1) / 2 // 0 to 1
          const intensity = Math.pow(normalized, 1.8) + mouseEffect

          if (intensity > 0.15) {
            const radius = Math.max(0.6, intensity * 2.2)
            
            // Color grading: Crisp monochrome stipple with subtle warm gold/orange and cyan highlights
            if (mouseEffect > 0.3) {
              ctx.fillStyle = `rgba(245, 130, 13, ${Math.min(0.9, mouseEffect * 0.8)})`
            } else if (normalized > 0.75) {
              ctx.fillStyle = `rgba(220, 235, 255, ${Math.min(0.65, intensity * 0.65)})`
            } else if (normalized > 0.5) {
              ctx.fillStyle = `rgba(130, 160, 210, ${Math.min(0.35, intensity * 0.4)})`
            } else {
              ctx.fillStyle = `rgba(70, 95, 140, ${Math.min(0.18, intensity * 0.25)})`
            }

            ctx.beginPath()
            ctx.arc(posX, posY, radius, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  )
}
