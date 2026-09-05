'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Sprout, 
  FlaskConical, 
  TrendingUp, 
  FileText, 
  CheckCircle2, 
  Plus, 
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  Droplets,
  Activity
} from 'lucide-react'

export default function SoilHealthPage() {
  const [activeField, setActiveField] = useState('Field 02 — Soybean & Wheat Rotation')

  const soilMetrics = {
    healthScore: 84.0,
    ph: 6.85,
    phStatus: 'Optimal (Neutral)',
    nitrogen: 228.0, // kg/ha
    nitrogenStatus: 'Medium (Adequate for Legumes)',
    phosphorus: 21.0, // kg/ha
    phosphorusStatus: 'High (Good Root Development)',
    potassium: 210.0, // kg/ha
    potassiumStatus: 'High (Disease Resistance)',
    organicCarbon: 0.82, // %
    organicCarbonStatus: 'Improving (+0.14% in 12 mo)',
    conductivity: 0.38, // dS/m
    conductivityStatus: 'Normal (Non-saline)',
    moisture: 42.0,
    temp: 24.2,
  }

  return (
    <div className="space-y-8">
      
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>SOIL INTELLIGENCE & FERTILITY</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            Precision Soil Health Analytics
          </h1>
          <p className="text-xs sm:text-sm font-sans text-blue-200/70">
            Real-time IoT probes cross-referenced with accredited government lab soil tests
          </p>
        </div>

        {/* Field Selector */}
        <select
          value={activeField}
          onChange={(e) => setActiveField(e.target.value)}
          className="px-4 py-2 rounded-xl bg-[#0B152E] border border-white/10 text-white text-xs font-mono font-bold focus:border-emerald-400 focus:outline-none"
        >
          <option value="Field 01 — Sugarcane North Plot">Field 01 — Sugarcane Plot (Black Cotton)</option>
          <option value="Field 02 — Soybean & Wheat Rotation">Field 02 — Soybean No-Till (Black Cotton)</option>
          <option value="Field 03 — Organic Pomegranate Orchard">Field 03 — Pomegranate Orchard (Red Loam)</option>
          <option value="Field 04 — Pulses & Vegetables">Field 04 — Pulses & Vegetables (Alluvial)</option>
        </select>
      </div>

      {/* Main Score Hero Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0B152E]/90 border border-emerald-500/30 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          
          <div className="space-y-3">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block">
              Zone Index: {activeField.split('—')[0]}
            </span>
            <div className="flex items-baseline gap-3">
              <span className="font-display font-black text-5xl sm:text-6xl text-white">84</span>
              <span className="text-lg font-mono text-blue-300/60">/ 100</span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                Fertile & Biologically Active
              </span>
            </div>
            <p className="text-xs font-sans text-blue-100/80 leading-relaxed">
              Based on biological carbon accumulation, microbial respiration, and balanced macro-nutrient availability.
            </p>
          </div>

          {/* Quick Gauge Triad */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/5 space-y-1">
              <span className="text-blue-200/60 text-[10px] block">Soil Reaction (pH)</span>
              <span className="font-bold text-white text-lg block">{soilMetrics.ph}</span>
              <span className="text-[10px] text-emerald-400">{soilMetrics.phStatus}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/5 space-y-1">
              <span className="text-blue-200/60 text-[10px] block">Organic Carbon (OC)</span>
              <span className="font-bold text-emerald-400 text-lg block">{soilMetrics.organicCarbon}%</span>
              <span className="text-[10px] text-emerald-300">{soilMetrics.organicCarbonStatus}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/5 space-y-1">
              <span className="text-blue-200/60 text-[10px] block">Conductivity (EC)</span>
              <span className="font-bold text-white text-lg block">{soilMetrics.conductivity}</span>
              <span className="text-[10px] text-blue-300">{soilMetrics.conductivityStatus}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/5 space-y-1">
              <span className="text-blue-200/60 text-[10px] block">Live Volumetric Moisture</span>
              <span className="font-bold text-blue-400 text-lg block">{soilMetrics.moisture}%</span>
              <span className="text-[10px] text-blue-200">Temp: {soilMetrics.temp}°C</span>
            </div>
          </div>

        </div>
      </div>

      {/* N-P-K Macronutrient Breakdown */}
      <div className="p-6 rounded-2xl bg-[#0B152E]/90 border border-white/10 backdrop-blur-xl shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="font-display font-bold text-lg text-white">N-P-K Macro Nutrient Availability</h3>
            <p className="text-xs font-sans text-blue-200/70">Measured in kg/hectare against Maharashtra state agricultural university standards</p>
          </div>
          <span className="px-3 py-1 rounded-md bg-white/[0.05] text-blue-200 text-xs font-mono">
            ICAR Standards
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Nitrogen */}
          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-blue-300">NITROGEN (Available N)</span>
              <span className="px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 text-[10px] font-mono font-bold">Medium</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-black text-3xl text-white">{soilMetrics.nitrogen}</span>
              <span className="text-xs font-mono text-blue-300/60">kg/ha</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
              <div className="bg-blue-400 h-full rounded-full" style={{ width: '62%' }} />
            </div>
            <p className="text-[11px] font-sans text-blue-200/60">
              Optimal for legume nodulation. Avoid excess chemical urea.
            </p>
          </div>

          {/* Phosphorus */}
          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-orange-300">PHOSPHORUS (Available P2O5)</span>
              <span className="px-2 py-0.5 rounded bg-orange-500/15 text-orange-400 text-[10px] font-mono font-bold">Sufficient</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-black text-3xl text-white">{soilMetrics.phosphorus}</span>
              <span className="text-xs font-mono text-blue-300/60">kg/ha</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
              <div className="bg-orange-400 h-full rounded-full" style={{ width: '75%' }} />
            </div>
            <p className="text-[11px] font-sans text-blue-200/60">
              High phosphate levels promote rapid initial root establishment.
            </p>
          </div>

          {/* Potassium */}
          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-emerald-300">POTASSIUM (Available K2O)</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-bold">High</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-black text-3xl text-white">{soilMetrics.potassium}</span>
              <span className="text-xs font-mono text-blue-300/60">kg/ha</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: '85%' }} />
            </div>
            <p className="text-[11px] font-sans text-blue-200/60">
              Abundant natural black soil potassium provides superior drought tolerance.
            </p>
          </div>
        </div>
      </div>

      {/* Scientific Action Advisory Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-blue-500/10 to-transparent border border-emerald-500/30 backdrop-blur-xl shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase">
          <ShieldCheck className="w-4 h-4" />
          <span>Automated Agronomic Advisory (Field 02)</span>
        </div>
        <p className="text-sm font-sans text-white leading-relaxed">
          <strong>Key Finding:</strong> Your organic carbon is currently <strong>0.82%</strong>, up from 0.68% last season. The combination of no-till stubble retention and green manuring has accelerated fungal biomass. 
        </p>
        <p className="text-xs font-sans text-blue-100/80 leading-relaxed">
          <strong>Recommendation:</strong> Inoculate with <em>Phosphate Solubilizing Bacteria (PSB)</em> alongside 2 tons/acre vermicompost before the Rabi sowing cycle. Avoid heavy rotary tillage to prevent disturbing earthworm channels.
        </p>
        <div className="pt-2 text-[11px] font-mono text-blue-300/60 flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Consult with a verified agricultural expert before implementing commercial chemical adjustments.</span>
        </div>
      </div>

    </div>
  )
}
