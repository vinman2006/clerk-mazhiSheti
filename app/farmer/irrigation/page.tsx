'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Droplets, 
  Play, 
  Square, 
  Settings2, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle,
  Clock,
  Cpu,
  Sliders,
  Power
} from 'lucide-react'

export default function IrrigationPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [autoMode, setAutoMode] = useState(true)
  const [minThreshold, setMinThreshold] = useState(35)
  const [maxThreshold, setMaxThreshold] = useState(55)
  const [maxDurationMinutes, setMaxDurationMinutes] = useState(45)
  const [activeZone, setActiveZone] = useState('Field 02 — Automated Micro-Sprinkler')

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold">
            <Droplets className="w-3.5 h-3.5" />
            <span>SMART HYDRAULIC AUTOMATION</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            Automated Sprinkler & Drip Control
          </h1>
          <p className="text-xs sm:text-sm font-sans text-blue-200/70">
            Precision soil-triggered valve orchestration with mandatory hardware interlocks
          </p>
        </div>

        {/* Emergency Killswitch */}
        <button
          onClick={() => {
            setIsRunning(false)
            alert('CRITICAL SAFETY OVERRIDE: Emergency cut-off signal broadcast to all solenoid valves.')
          }}
          className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 self-start sm:self-auto shadow-lg shadow-red-950/40"
        >
          <Power className="w-4 h-4" />
          <span>Emergency System Cutoff</span>
        </button>
      </div>

      {/* Main Valve Status Hero Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border backdrop-blur-2xl shadow-2xl transition-all ${
        isRunning 
          ? 'bg-gradient-to-r from-blue-900/40 via-[#0B152E] to-blue-950/20 border-blue-500/50 shadow-blue-950/50' 
          : 'bg-[#0B152E]/90 border-white/10'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className={`w-3 h-3 rounded-full ${isRunning ? 'bg-blue-400 animate-ping' : 'bg-emerald-400'}`} />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-200">
                Valve Status: {isRunning ? 'IRRIGATING (VALVE OPEN)' : 'STANDBY (AUTOMATION ARMED)'}
              </span>
            </div>
            
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white">
              {activeZone}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-blue-200/70 pt-1">
              <span>Sensor: <strong>MS-SOIL-PROBE-042 (38% Moisture)</strong></span>
              <span>•</span>
              <span>Trigger Band: <strong>{minThreshold}% — {maxThreshold}%</strong></span>
              <span>•</span>
              <span>Safety Timer: <strong>{maxDurationMinutes}m Cutoff</strong></span>
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-6 py-3.5 rounded-xl font-sans font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2.5 shadow-xl ${
                isRunning
                  ? 'bg-red-600 hover:bg-red-500 text-white'
                  : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-blue-950/50'
              }`}
            >
              {isRunning ? (
                <>
                  <Square className="w-4 h-4 fill-current" />
                  <span>Manual Stop Irrigation</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Manual Start Cycle</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Safety Interlocks & Rules Engine Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Threshold Configuration */}
        <div className="p-6 rounded-2xl bg-[#0B152E]/90 border border-white/10 backdrop-blur-xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <Sliders className="w-5 h-5 text-blue-400" />
              <h3 className="font-display font-bold text-lg text-white">Automation Thresholds</h3>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-blue-500/15 text-blue-300 text-xs font-mono font-bold">
              Autonomous
            </span>
          </div>

          <div className="space-y-5 text-xs font-mono">
            {/* Min Threshold */}
            <div className="space-y-2">
              <div className="flex justify-between text-blue-200">
                <span>Start Trigger (Moisture Min):</span>
                <span className="font-bold text-white text-sm">{minThreshold}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="45"
                value={minThreshold}
                onChange={(e) => setMinThreshold(parseInt(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <p className="text-[11px] text-blue-200/50 font-sans">
                If soil moisture drops below this value for &gt;5 consecutive readings, irrigation activates automatically.
              </p>
            </div>

            {/* Max Threshold */}
            <div className="space-y-2">
              <div className="flex justify-between text-blue-200">
                <span>Stop Target (Moisture Max):</span>
                <span className="font-bold text-white text-sm">{maxThreshold}%</span>
              </div>
              <input
                type="range"
                min="45"
                max="75"
                value={maxThreshold}
                onChange={(e) => setMaxThreshold(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <p className="text-[11px] text-blue-200/50 font-sans">
                Valves immediately close once field soil moisture reaches this saturation target.
              </p>
            </div>

            {/* Max Safety Duration */}
            <div className="space-y-2">
              <div className="flex justify-between text-blue-200">
                <span>Hardware Timeout Cutoff:</span>
                <span className="font-bold text-red-400 text-sm">{maxDurationMinutes} Minutes</span>
              </div>
              <input
                type="range"
                min="15"
                max="90"
                step="5"
                value={maxDurationMinutes}
                onChange={(e) => setMaxDurationMinutes(parseInt(e.target.value))}
                className="w-full accent-red-500 cursor-pointer"
              />
              <p className="text-[11px] text-blue-200/50 font-sans">
                Prevents accidental waterlogging or line bursts even in case of sensor communication loss.
              </p>
            </div>
          </div>
        </div>

        {/* Safety Protocol Architecture Card */}
        <div className="p-6 rounded-2xl bg-[#0B152E]/90 border border-white/10 backdrop-blur-xl shadow-xl space-y-5">
          <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
            <ShieldAlert className="w-5 h-5 text-emerald-400" />
            <h3 className="font-display font-bold text-lg text-white">Fail-Safe Protection Architecture</h3>
          </div>

          <div className="space-y-3 font-sans text-xs text-blue-100/80">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <span>Offline Heartbeat Protection</span>
              </div>
              <p className="text-blue-200/70 text-[11px] pl-6 leading-relaxed">
                If the field probe drops connectivity for &gt;180 seconds, active valves safely shut off to prevent unmonitored over-irrigation.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <span>Rain Interlock / Precipitation Sensor</span>
              </div>
              <p className="text-blue-200/70 text-[11px] pl-6 leading-relaxed">
                Baramati weather station link suspends irrigation triggers if active rainfall &gt;2.5 mm/hr is detected.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <span>Cryptographic Controller Verification</span>
              </div>
              <p className="text-blue-200/70 text-[11px] pl-6 leading-relaxed">
                Solenoid command packets are signed with controller device tokens (`MS-SPRINKLER-CTL-108`) to prevent unauthorized actuation.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
