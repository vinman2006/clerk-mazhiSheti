'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Leaf, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  TrendingUp, 
  Sprout, 
  AlertTriangle,
  Award,
  Calendar,
  HelpCircle
} from 'lucide-react'

export default function OrganicJourneyPage() {
  const [activeStage, setActiveStage] = useState(3)

  const stages = [
    {
      stage: 1,
      title: 'Stage 1: Soil Baseline & Residue Clearance',
      status: 'COMPLETED',
      duration: 'Months 0 - 3',
      description: 'Comprehensive NPK soil profiling across all 4 fields. Measured baseline synthetic chemical residue and established organic carbon target (>0.85%).',
      actionTaken: 'Soil health test completed; baseline OC recorded at 0.68%.',
      metric: 'Baseline Soil Score: 68/100',
    },
    {
      stage: 2,
      title: 'Stage 2: Reduce Chemical Synthetic Dependency (40%)',
      status: 'COMPLETED',
      duration: 'Months 3 - 9',
      description: 'Phased reduction of chemical nitrogen and synthetic organophosphates. Integrated green manuring with Sesbania (Dhaincha) and neem-cake blending.',
      actionTaken: 'Urea application cut from 120 kg/acre to 65 kg/acre on Soybean and Sugarcane.',
      metric: 'Chemical Load: -42% Reduction',
    },
    {
      stage: 3,
      title: 'Stage 3: Soil Biology & Organic Carbon Enrichment',
      status: 'IN_PROGRESS',
      duration: 'Months 9 - 18 (Current)',
      description: 'Application of 5 tons/acre enriched farmyard manure (FYM), liquid Jeevamrut foliar sprays, and vermiculture to re-establish indigenous microbial colonies.',
      actionTaken: 'Applied Jeevamrut batch #04 on Field 02; vermicompost applied around Pomegranate root basins.',
      metric: 'Organic Carbon: 0.82% (Target: 1.0%)',
    },
    {
      stage: 4,
      title: 'Stage 4: Biological Pest & Disease Buffer Systems',
      status: 'PENDING',
      duration: 'Months 18 - 24',
      description: 'Full elimination of synthetic pesticides. Introduction of Trichoderma viride, Pseudomonas fluorescens, light traps, and border marigold trap crops.',
      actionTaken: 'Scheduled for upcoming Kharif cycle.',
      metric: 'Target Zero-Residue Score',
    },
    {
      stage: 5,
      title: 'Stage 5: Conservation Tillage & Crop Diversity Matrix',
      status: 'PENDING',
      duration: 'Months 24 - 30',
      description: 'Transition minimum 75% of acreage to permanent no-till mulch farming. Multi-cropping pulses to fix atmospheric nitrogen without synthetic inputs.',
      actionTaken: 'Preparation of Happy Seeder implement schedules.',
      metric: 'No-Till Acreage: 75% Target',
    },
    {
      stage: 6,
      title: 'Stage 6: Formal Organic Certification (NPOP / PGS-India)',
      status: 'PENDING',
      duration: 'Months 30 - 36',
      description: 'Final accredited third-party chemical residue inspection and official NPOP / PGS-India organic certification issuance for premium market export pricing.',
      actionTaken: 'Documentation dossier prepared for certification body audit.',
      metric: '100% Certified Organic Farm',
    },
  ]

  return (
    <div className="space-y-8">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <Leaf className="w-3.5 h-3.5" />
            <span>REGENERATIVE AGRICULTURE ROADMAP</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            Gradual Organic Transition Engine
          </h1>
          <p className="text-xs sm:text-sm font-sans text-blue-200/70">
            A scientifically paced 6-stage roadmap: reducing chemical dependency while safeguarding crop yields
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold flex items-center gap-2 self-start sm:self-auto">
          <Award className="w-4 h-4" />
          <span>Stage 3 of 6 Active (35% Transition Complete)</span>
        </div>
      </div>

      {/* Measurable Transition Indicators Card */}
      <div className="p-6 rounded-3xl bg-[#0B152E]/90 border border-emerald-500/30 backdrop-blur-2xl shadow-2xl space-y-6">
        <h2 className="font-display font-bold text-lg text-white">Transition Vital Signs & Verification</h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/5 space-y-1.5">
            <span className="text-blue-200/60 block">Soil Organic Matter</span>
            <span className="font-display font-black text-2xl text-emerald-400 block">0.82%</span>
            <span className="text-[11px] text-emerald-300">Target: 1.00%</span>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/5 space-y-1.5">
            <span className="text-blue-200/60 block">Chemical Reduction</span>
            <span className="font-display font-black text-2xl text-blue-400 block">-42%</span>
            <span className="text-[11px] text-blue-300">Goal: -100% by Stage 6</span>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/5 space-y-1.5">
            <span className="text-blue-200/60 block">Bio-Input Adoption</span>
            <span className="font-display font-black text-2xl text-orange-400 block">35%</span>
            <span className="text-[11px] text-orange-300">Jeevamrut & Vermicompost</span>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/5 space-y-1.5">
            <span className="text-blue-200/60 block">No-Till Conservation</span>
            <span className="font-display font-black text-2xl text-emerald-400 block">40%</span>
            <span className="text-[11px] text-emerald-300">5.8 of 14.5 Acres</span>
          </div>
        </div>
      </div>

      {/* 6-Stage Timeline Stepper */}
      <div className="space-y-4">
        {stages.map((st) => {
          const isCurrent = st.stage === activeStage
          const isDone = st.status === 'COMPLETED'

          return (
            <div
              key={st.stage}
              className={`p-6 rounded-2xl border transition-all space-y-3 ${
                isCurrent
                  ? 'bg-[#0E1F42] border-emerald-400 shadow-xl shadow-emerald-950/40'
                  : isDone
                  ? 'bg-[#0B152E]/80 border-emerald-500/20'
                  : 'bg-[#081022]/60 border-white/5 opacity-70'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-bold ${
                    isDone
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400 animate-pulse'
                      : 'bg-white/5 text-neutral-400'
                  }`}>
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : `0${st.stage}`}
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-base text-white">{st.title}</h3>
                    <span className="text-xs font-mono text-blue-300/70">{st.duration}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-auto">
                  <span className="text-xs font-mono text-emerald-400 font-bold">{st.metric}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    isDone
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : isCurrent
                      ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30'
                      : 'bg-white/5 text-neutral-500'
                  }`}>
                    {st.status}
                  </span>
                </div>
              </div>

              <p className="text-xs font-sans text-blue-100/80 leading-relaxed pl-11">
                {st.description}
              </p>

              <div className="pl-11 pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono text-blue-200/60">
                <span>Action: {st.actionTaken}</span>
                {isCurrent && (
                  <span className="text-emerald-400 font-bold">In Active Progress →</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Scientific Humility Footnote */}
      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-blue-200/70 flex items-center gap-2">
        <HelpCircle className="w-4 h-4 text-orange-400 shrink-0" />
        <span>Scientific Principle: Mazhi Sheti transitions are non-dogmatic. Yield stabilization takes priority. Chemical tapering is synchronized with lab soil health audits.</span>
      </div>

    </div>
  )
}
