'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Sprout, 
  Droplets, 
  Layers, 
  Activity, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Play, 
  Square, 
  Tractor, 
  Bot, 
  TrendingUp, 
  ShieldCheck,
  Cpu,
  Clock,
  ExternalLink
} from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { X } from 'lucide-react'

export default function FarmerDashboardPage() {
  const { user } = useUser()
  const [irrigationRunning, setIrrigationRunning] = useState(false)
  const [emergencyModal, setEmergencyModal] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  return (
    <div className="space-y-8 relative">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-[#1A0C16] border border-red-500/40 text-red-200 shadow-2xl flex items-center gap-3 text-xs font-mono animate-in slide-in-from-top duration-300">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white ml-2">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Emergency Stop Dialog */}
      {emergencyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl bg-[#1A0E18] border border-red-500/50 p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 text-center">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
              <Square className="w-6 h-6 fill-current" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">Emergency Cutoff Active</h3>
            <p className="text-xs text-red-200/80 font-sans leading-relaxed">
              Hardware killswitch command transmitted to all LoRaWAN & 4G solenoid valve controllers. Pressure bled off and pumps powered down.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setEmergencyModal(false)}
                className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold uppercase transition-all"
              >
                Acknowledge & Reset Interlock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Authenticated Clerk User Greeting Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#0B1736]/90 via-[#0E204E]/80 to-[#0B152E]/90 border border-emerald-500/30 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 p-0.5 shadow-lg shadow-emerald-950/50 shrink-0">
            <div className="w-full h-full rounded-[14px] bg-[#0A0F1E] flex items-center justify-center font-display font-black text-2xl text-emerald-400">
              {user?.firstName ? user.firstName[0] : 'आ'}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">
                Namaskar, {user?.fullName || user?.firstName || 'Anandarao Patil'}!
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                CLERK VERIFIED FARMER
              </span>
            </div>
            <p className="text-xs font-sans text-blue-100/80">
              Baramati Agronomic Cluster • Live IoT telemetry active • 4 Soil sensors online • 6-Stage organic transition Phase 2
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
          <Link
            href="/farmer/irrigation"
            className="px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>Auto Irrigation</span>
          </Link>
          <Link
            href="/farmer/equipment"
            className="px-3.5 py-2 rounded-xl bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/30 text-orange-300 text-xs font-mono font-bold transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <Tractor className="w-3.5 h-3.5" />
            <span>Rent Tractor</span>
          </Link>
        </div>
      </div>
      
      {/* Real-time Status Alert Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-transparent border border-orange-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-md shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 shrink-0 animate-pulse">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase text-orange-400">Action Recommended</span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-blue-200">Field 02</span>
            </div>
            <p className="text-sm font-sans text-white font-medium">
              Soil moisture in <span className="text-orange-300 font-bold">Soybean & Wheat No-Till</span> is at 38% (Configured minimum threshold: 35%).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setIrrigationRunning(!irrigationRunning)}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md ${
              irrigationRunning
                ? 'bg-red-600 hover:bg-red-500 text-white animate-pulse'
                : 'bg-orange-500 hover:bg-orange-400 text-white'
            }`}
          >
            {irrigationRunning ? (
              <>
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Stop Sprinkler (Running 14m)</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Trigger Sprinklers (Safe Mode)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main KPI Stat Matrix (Nexora High-Tech Aesthetic) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Soil Health Metric */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0B152E]/90 border border-white/10 hover:border-emerald-500/40 transition-all shadow-xl space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-blue-300/80 uppercase">Soil Health Index</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[11px] font-mono font-bold border border-emerald-500/30">
              Grade A (Optimal)
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-black text-4xl sm:text-5xl text-white">82</span>
            <span className="text-sm font-mono text-blue-300/60">/ 100</span>
          </div>
          <div className="text-xs text-blue-200/70 font-sans flex items-center gap-1.5 pt-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>+6.4% improvement since organic compost mulching</span>
          </div>
        </div>

        {/* Moisture Level Metric */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0B152E]/90 border border-white/10 hover:border-blue-500/40 transition-all shadow-xl space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-blue-300/80 uppercase">Average Moisture</span>
            <span className="px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 text-[11px] font-mono font-bold border border-blue-500/30">
              Target 35 - 55%
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-black text-4xl sm:text-5xl text-white">42%</span>
            <span className="text-sm font-mono text-blue-300/60">Volumetric</span>
          </div>
          <div className="text-xs text-blue-200/70 font-sans flex items-center gap-1.5 pt-1">
            <Droplets className="w-3.5 h-3.5 text-blue-400" />
            <span>Probe MS-042 reporting normal black soil retention</span>
          </div>
        </div>

        {/* Land & Fields Metric */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0B152E]/90 border border-white/10 hover:border-orange-500/40 transition-all shadow-xl space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-blue-300/80 uppercase">Active Cultivation</span>
            <span className="px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 text-[11px] font-mono font-bold border border-orange-500/30">
              4 Fields
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-black text-4xl sm:text-5xl text-white">14.5</span>
            <span className="text-sm font-mono text-blue-300/60">Acres Total</span>
          </div>
          <div className="text-xs text-blue-200/70 font-sans flex items-center gap-1.5 pt-1">
            <Layers className="w-3.5 h-3.5 text-orange-400" />
            <span>Sugarcane, Soybean, Pomegranate, Onion</span>
          </div>
        </div>

        {/* Organic Journey Metric */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0B152E]/90 border border-white/10 hover:border-emerald-500/40 transition-all shadow-xl space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-blue-300/80 uppercase">Organic Transition</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[11px] font-mono font-bold border border-emerald-500/30">
              Stage 3 / 6
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-black text-4xl sm:text-5xl text-white">35%</span>
            <span className="text-sm font-mono text-blue-300/60">Bio-Inputs</span>
          </div>
          <div className="text-xs text-blue-200/70 font-sans flex items-center gap-1.5 pt-1">
            <Sprout className="w-3.5 h-3.5 text-emerald-400" />
            <span>Chemical nitrogen reduced by 40%</span>
          </div>
        </div>

      </div>

      {/* Field & IoT Operations Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Live Field Matrix & Operations */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-[#0B152E]/90 border border-white/10 backdrop-blur-xl shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="font-display font-bold text-lg text-white">Fields Status Matrix</h2>
                <p className="text-xs font-sans text-blue-200/70">Continuous telemetry across active farm zones</p>
              </div>
              <Link
                href="/farmer/fields"
                className="text-xs font-mono font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1"
              >
                <span>Manage Fields</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'Field 01 — Sugarcane Plot', acres: '5.0 Acres', crop: 'Sugarcane Co 86032', moisture: '44%', soil: 'Black Cotton', status: 'Optimal' },
                { name: 'Field 02 — Soybean No-Till', acres: '4.0 Acres', crop: 'Soybean JS 335', moisture: '38%', soil: 'Black Cotton', status: 'Needs Water' },
                { name: 'Field 03 — Organic Pomegranate', acres: '3.5 Acres', crop: 'Bhagwa Super', moisture: '41%', soil: 'Red Loam', status: 'Organic Stage 4' },
                { name: 'Field 04 — Pulses & Vegetables', acres: '2.0 Acres', crop: 'Gram & Onion', moisture: '46%', soil: 'Alluvial', status: 'Active' },
              ].map((f, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2.5 hover:border-white/20 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="font-sans font-bold text-sm text-white">{f.name}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      f.status === 'Needs Water' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {f.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs font-mono text-blue-200/70">
                    <span>{f.crop}</span>
                    <span className="font-bold text-white">{f.acres}</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono text-blue-200/70 pt-1 border-t border-white/5">
                    <span>Moisture: <strong className="text-blue-300">{f.moisture}</strong></span>
                    <span>Soil: {f.soil}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Operational Shortcuts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-sans">
            <Link
              href="/farmer/soil"
              className="p-4 rounded-xl bg-[#0B152E]/90 border border-white/10 hover:border-emerald-400 transition-all text-center space-y-2 group shadow-md"
            >
              <div className="w-9 h-9 mx-auto rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="block font-bold text-white">Soil Intelligence</span>
              <span className="block text-[10px] text-blue-300/60 font-mono">NPK & pH Analysis</span>
            </Link>

            <Link
              href="/farmer/equipment"
              className="p-4 rounded-xl bg-[#0B152E]/90 border border-white/10 hover:border-orange-400 transition-all text-center space-y-2 group shadow-md"
            >
              <div className="w-9 h-9 mx-auto rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Tractor className="w-5 h-5" />
              </div>
              <span className="block font-bold text-white">Rent Tractor</span>
              <span className="block text-[10px] text-blue-300/60 font-mono">Book Local Fleet</span>
            </Link>

            <Link
              href="/farmer/finance"
              className="p-4 rounded-xl bg-[#0B152E]/90 border border-white/10 hover:border-blue-400 transition-all text-center space-y-2 group shadow-md"
            >
              <div className="w-9 h-9 mx-auto rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="block font-bold text-white">Loan & Consent</span>
              <span className="block text-[10px] text-blue-300/60 font-mono">Manage Bank Scope</span>
            </Link>

            <Link
              href="/farmer/assistant"
              className="p-4 rounded-xl bg-[#0B152E]/90 border border-white/10 hover:border-purple-400 transition-all text-center space-y-2 group shadow-md"
            >
              <div className="w-9 h-9 mx-auto rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Bot className="w-5 h-5" />
              </div>
              <span className="block font-bold text-white">AI Farming Guide</span>
              <span className="block text-[10px] text-blue-300/60 font-mono">Farm Contextualized</span>
            </Link>
          </div>
        </div>

        {/* Right 1 Column: Connected Devices & Auto Irrigation State */}
        <div className="space-y-6">
          {/* Smart Device & Valve Status */}
          <div className="p-6 rounded-2xl bg-[#0B152E]/90 border border-white/10 backdrop-blur-xl shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-display font-bold text-base text-white">Connected IoT Devices</h3>
                <p className="text-xs font-mono text-emerald-400">2 Devices Online • Gateways OK</p>
              </div>
              <Cpu className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Soil Multi-Probe #01</span>
                  <span className="text-[10px] text-blue-300/60">Code: MS-SOIL-PROBE-042</span>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 font-bold block">Online ✓</span>
                  <span className="text-[10px] text-blue-300/60">Bat: 96%</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Sprinkler Valve Node #02</span>
                  <span className="text-[10px] text-blue-300/60">Code: MS-SPRINKLER-CTL-108</span>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 font-bold block">{irrigationRunning ? 'Active Valve' : 'Idle / Primed'}</span>
                  <span className="text-[10px] text-blue-300/60">Bat: 98%</span>
                </div>
              </div>
            </div>

            {/* Emergency Killswitch */}
            <div className="pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setIrrigationRunning(false)
                  setEmergencyModal(true)
                  setToastMessage('CRITICAL SAFETY OVERRIDE: Solenoid irrigation valves commanded to IMMEDIATE EMERGENCY SHUTOFF.')
                  setTimeout(() => setToastMessage(null), 5000)
                }}
                className="w-full py-2.5 rounded-xl bg-red-500/15 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Emergency System Stop (Killswitch)</span>
              </button>
            </div>
          </div>

          {/* Active Bank Consent Summary */}
          <div className="p-6 rounded-2xl bg-[#0B152E]/90 border border-blue-500/20 backdrop-blur-xl shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-blue-300 font-bold uppercase">Active Data Consent</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                Controlled
              </span>
            </div>
            <p className="text-xs font-sans text-blue-100/80 leading-relaxed">
              <strong>Maharashtra State Cooperative Bank</strong> has read-only access to verify farm acreage and soil health score for your active KCC loan.
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono">
              <span className="text-blue-300/60">3 Scopes Granted</span>
              <Link href="/farmer/finance" className="text-orange-400 hover:text-orange-300 font-bold">
                Manage Access →
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
