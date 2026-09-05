'use client'

import React, { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface SmoothScrollProps {
  children: React.ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Respect accessibility: if prefers-reduced-motion, use native browser scroll
    const prefersReducedMotion = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) return

    // Initialize Lenis with calm agricultural momentum
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easeOut
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      infinite: false,
    })

    lenisRef.current = lenis

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Wire Lenis into GSAP RAF ticker for frame-perfect 60Hz synchronization
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateTicker)
    gsap.ticker.lagSmoothing(0)

    // Handle internal anchor links smoothly
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a')
      if (!target) return

      const href = target.getAttribute('href')
      if (href && href.startsWith('#') && href.length > 1) {
        const elem = document.querySelector(href)
        if (elem) {
          e.preventDefault()
          lenis.scrollTo(elem as HTMLElement, { offset: -60, duration: 1.0 })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      gsap.ticker.remove(updateTicker)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}

export default SmoothScroll
