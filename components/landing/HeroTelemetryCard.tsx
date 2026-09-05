'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { 
  Radio, 
  Droplets, 
  Activity, 
  Cpu, 
  CheckCircle2, 
  ShieldCheck,
  Zap
} from 'lucide-react'

export function HeroTelemetryCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [moisture, setMoisture] = useState(0)
  const [npkScore, setNpkScore] = useState(0)
  const [battery, setBattery] = useState(0)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const prefersReducedMotion = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // 1. One-time metric count-up on viewport entrance (Section 8)
    const targetMoisture = 42
    const targetNpk = 84
    const targetBattery = 98

    if (prefersReducedMotion) {
      setMoisture(targetMoisture)
      setNpkScore(targetNpk)
      setBattery(targetBattery)
      return
    }

    const counterObj = { m: 0, n: 0, b: 0 }
    const countTween = gsap.to(counterObj, {
      m: targetMoisture,
      n: targetNpk,
      b: targetBattery,
      duration: 1.6,
      ease: 'power2.out',
      delay: 0.6,
      onUpdate: () => {
        setMoisture(Math.round(counterObj.m))
        setNpkScore(Math.round(counterObj.n))
        setBattery(Math.round(counterObj.b))
      },
    })

    // 2. Subtle 2-4px ambient floating movement (Section 7)
    // 6.5s duration, yoyo, repeat, easeInOut - feels like a live farming system
    const floatTween = gsap.to(el, {
      y: -3,
      duration: 6.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    return () => {
      countTween.kill()
      floatTween.kill()
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="w-full max-w-4xl mx-auto mt-10 rounded-2xl bg-[#091329]/85 border border-blue-500/25 p-5 sm:p-6 backdrop-blur-xl shadow-2xl shadow-blue-950/40 text-left transition-colors duration-300 hover:border-blue-400/40"
    >
      {/* Top Telemetry Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-white/[0.08] gap-3">
        <div className="flex items-center gap-2.5">
          {/* Subtle slow opacity pulsing status badge (Section 8) */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40 duration-1000" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
          </span>
          <span className="font-mono text-xs font-bold tracking-wider text-emerald-400">
            BARAMATI CLUSTER #04 • LORAWAN GATEWAY ONLINE
          </span>
          <span className="hidden sm:inline-block text-slate-500">|</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-blue-300/80">
            <Radio className="w-3 h-3 text-blue-400" />
            Sub-GHz Telemetry Synced
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-slate-300">
            did:mazhi:farm:mh-12-b7a4
          </span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified
          </span>
        </div>
      </div>

      {/* Grid of 4 Live Telemetry Gauges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1: Root Zone Moisture */}
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-sans">
            <span className="flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-blue-400" />
              Soil Moisture
            </span>
            <span className="text-[10px] font-mono text-blue-400">30cm depth</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-mono font-black text-white">
              {moisture}.4%
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-medium">Optimal</span>
          </div>
          <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
            <div 
              className="bg-blue-400 h-full rounded-full transition-all duration-1000"
              style={{ width: `${moisture}%` }}
            />
          </div>
        </div>

        {/* Metric 2: NPK Biological Health Score */}
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-sans">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              Soil Health Index
            </span>
            <span className="text-[10px] font-mono text-emerald-400">Stage 2</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-mono font-black text-white">
              {npkScore}
            </span>
            <span className="text-xs font-mono text-slate-400">/ 100</span>
            <span className="text-[10px] font-mono text-emerald-400 font-medium">+6 pts</span>
          </div>
          <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-400 h-full rounded-full transition-all duration-1000"
              style={{ width: `${npkScore}%` }}
            />
          </div>
        </div>

        {/* Metric 3: Automated Sprinkler Solenoid Valve */}
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-sans">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-orange-400" />
              Sprinkler Valve
            </span>
            <span className="text-[10px] font-mono text-orange-400">Field 02</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-mono font-bold text-white uppercase">
              Standby
            </span>
            <span className="text-[10px] font-mono text-blue-300">Cut-off 35%</span>
          </div>
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1 pt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            <span>Auto-irrigation primed</span>
          </div>
        </div>

        {/* Metric 4: IoT Solar Battery & Transceiver */}
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-sans">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              Node Power
            </span>
            <span className="text-[10px] font-mono text-purple-400">Solar + Li</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-mono font-black text-white">
              {battery}%
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-medium">Float Charge</span>
          </div>
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1 pt-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Telemetry buffer clear</span>
          </div>
        </div>
      </div>

      {/* Bottom Cryptographic Assurance Strip */}
      <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
        <span className="text-slate-400">
          Current Crop: <strong className="text-white font-medium">Soybean (JS-335) & Sugarcane (Co-86032)</strong>
        </span>
        <span className="text-blue-300/70">
          Consent Protocol: Sovereign Data Boundary Enforced ✓
        </span>
      </div>
    </div>
  )
}
