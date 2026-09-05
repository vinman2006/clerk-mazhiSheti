'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Wind, 
  CheckCircle2, 
  TrendingUp, 
  HelpCircle, 
  Tractor, 
  ShieldCheck, 
  Layers,
  Sprout
} from 'lucide-react'

export default function NoTillPage() {
  const adoptionPercentage = 40.0 // 5.8 / 14.5 Acres

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <Wind className="w-3.5 h-3.5" />
            <span>CONSERVATION AGRICULTURE</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            Zero-Tillage & Soil Conservation
          </h1>
          <p className="text-xs sm:text-sm font-sans text-blue-200/70">
            Preserving subterranean earthworm tunnels, mycorrhizal fungi networks, and moisture retention
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold flex items-center gap-2 self-start sm:self-auto">
          <span>Farm Adoption: 40% (5.8 of 14.5 Acres)</span>
        </div>
      </div>

      {/* Adoption Progress Visualizer */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0B152E]/90 border border-emerald-500/30 backdrop-blur-2xl shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-lg text-white">No-Till Adoption Curve</h2>
          <span className="font-mono text-xs text-emerald-400 font-bold">Current: 40% Achieved</span>
        </div>

        {/* 5-Step Milestone Bar */}
        <div className="space-y-3">
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full transition-all duration-1000" 
              style={{ width: `${adoptionPercentage}%` }}
            />
          </div>

          <div className="grid grid-cols-5 text-center text-xs font-mono">
            <span className="text-emerald-400 font-bold">0% (Baseline)</span>
            <span className="text-emerald-400 font-bold">25% (Trial)</span>
            <span className="text-emerald-400 font-bold">50% (Expansion)</span>
            <span className="text-neutral-500">75% (Core)</span>
            <span className="text-neutral-500">100% (Full Zero-Till)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/10 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
            <span className="text-blue-300 font-bold block">Field 02 (4.0 Acres — Soybean)</span>
            <p className="text-blue-200/60 font-sans text-[11px]">
              Active No-Till with Happy Seeder direct drilling into sugarcane residue mulch.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
            <span className="text-blue-300 font-bold block">Field 03 (3.5 Acres — Orchard)</span>
            <p className="text-blue-200/60 font-sans text-[11px]">
              Permanent grass cover crop inter-row strip with zero mechanical disturbance.
            </p>
          </div>
        </div>
      </div>

      {/* Educational & Scientific Core Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="p-6 rounded-2xl bg-[#0B152E]/90 border border-white/10 backdrop-blur-xl shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="font-sans font-bold text-base text-white">Tangible Benefits</h3>
          <ul className="text-xs font-sans text-blue-100/70 space-y-2">
            <li>• Saves <strong>₹2,400/acre</strong> in tractor diesel costs per season</li>
            <li>• Conserves <strong>25-30%</strong> more volumetric soil moisture</li>
            <li>• Prevents topsoil erosion during heavy monsoon deluges</li>
            <li>• Multiplies earthworm population by 3.5x over 2 seasons</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-[#0B152E]/90 border border-white/10 backdrop-blur-xl shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center font-bold">
            <Tractor className="w-5 h-5" />
          </div>
          <h3 className="font-sans font-bold text-base text-white">Machinery Requirements</h3>
          <ul className="text-xs font-sans text-blue-100/70 space-y-2">
            <li>• <strong>Happy Seeder / Zero-Till Drill</strong>: Cuts residue and deposits seeds with fertilizer</li>
            <li>• <strong>Straw Management System (SMS)</strong>: Spreads straw evenly across the soil surface</li>
            <li>• Available for rental on Mazhi Sheti Tractor Hub</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-[#0B152E]/90 border border-white/10 backdrop-blur-xl shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center font-bold">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h3 className="font-sans font-bold text-base text-white">Scientific Limitations</h3>
          <ul className="text-xs font-sans text-blue-100/70 space-y-2">
            <li>• Weed competition requires aggressive early cover-crop shading</li>
            <li>• Heavy clay black soils require specialized inverted T-openers</li>
            <li>• Transition period (first 2 years) requires precise biological fertilization</li>
          </ul>
        </div>

      </div>

    </div>
  )
}
