'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sprout, 
  MapPin, 
  Layers, 
  Droplets, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  ShieldCheck
} from 'lucide-react'
import { FarmerLogo } from '@/components/ui/FarmerLogo'
import dynamic from 'next/dynamic'

const DotGrid = dynamic(() => import('@/components/ui/DotGrid'), { ssr: false })

export default function FarmerOnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Identity & Location
    name: 'Anandarao Patil',
    phone: '9822012345',
    email: '',
    state: 'Maharashtra',
    district: 'Pune',
    taluka: 'Baramati',
    village: 'Malegaon Budruk',
    pincode: '413115',

    // Step 2: Farm & Land
    totalLandAcres: 12.5,
    ownershipType: 'OWNED' as 'OWNED' | 'LEASED' | 'SHARECROPPER',
    experienceYears: 15,
    initialFarmName: 'Patil Krishi Farm',

    // Step 3: Farming & Sustainability
    farmingMethod: 'TRANSITIONAL' as 'CONVENTIONAL' | 'TRANSITIONAL' | 'ORGANIC' | 'NO_TILL',
    irrigationType: 'DRIP' as 'DRIP' | 'SPRINKLER' | 'CANAL' | 'BOREWELL' | 'RAINFED',
  })

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/onboarding/farmer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const json = await res.json()
      if (!res.ok) {
        throw new Error(json.error || 'Failed to complete onboarding. Please check your inputs.')
      }

      // Success -> Redirect to farmer dashboard
      router.push('/farmer/dashboard')
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-slate-100 flex flex-col relative overflow-hidden selection:bg-emerald-500/25 selection:text-emerald-400">
      {/* Background Dot Grid */}
      <div className="absolute inset-0 z-0 opacity-70 pointer-events-none">
        <DotGrid 
          dotSize={3.5}
          gap={24}
          baseColor="#1A365D"
          activeColor="#22C55E"
          proximity={160}
          shockRadius={260}
          shockStrength={5}
          returnDuration={1.2}
        />
      </div>

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-emerald-600/15 via-blue-500/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 py-5 px-6 sm:px-12 border-b border-white/10 bg-[#0B1736]/70 backdrop-blur-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FarmerLogo size={36} showText={true} showBadge={true} subtitle="FARM PROFILE SETUP" />
        </div>

        {/* Step Indicator Badges */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-blue-200/70 hidden sm:inline">Progress:</span>
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`px-3 py-1 rounded-lg border font-bold transition-all ${
                step === s
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400 shadow-md shadow-emerald-950/40'
                  : step > s
                  ? 'bg-white/10 border-white/20 text-white'
                  : 'bg-white/[0.03] border-white/5 text-neutral-500'
              }`}
            >
              Step {s}
            </div>
          ))}
        </div>
      </header>

      {/* Main Form Container */}
      <main className="relative z-10 flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-10 flex flex-col justify-center">
        <div className="rounded-3xl bg-[#0B152E]/90 border border-white/10 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl space-y-8">
          
          {/* Header Title */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PROGRESSIVE ONBOARDING</span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
              {step === 1 && 'Personal Identity & Farm Location'}
              {step === 2 && 'Land Ownership & Farm Geometry'}
              {step === 3 && 'Agricultural Methods & Sustainability'}
            </h1>
            <p className="text-xs sm:text-sm font-sans text-blue-100/75">
              {step === 1 && 'Enter your verified contact details and the primary revenue location of your agricultural holding.'}
              {step === 2 && 'Define your acreage and tenure to configure your spatial field hierarchy and crop cycles.'}
              {step === 3 && 'Share your current chemical vs organic practices to generate your customized 6-stage transition roadmap.'}
            </p>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-mono flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {/* STEP 1: IDENTITY & LOCATION */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-blue-200">Farmer Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0F1C3F] border border-white/10 text-white text-sm focus:border-emerald-400 focus:outline-none"
                        placeholder="e.g. Anandarao Patil"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-blue-200">10-Digit Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0F1C3F] border border-white/10 text-white text-sm focus:border-emerald-400 focus:outline-none"
                        placeholder="e.g. 9822012345"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-blue-200">State *</label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => handleChange('state', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#0F1C3F] border border-white/10 text-white text-sm focus:border-emerald-400 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-blue-200">District *</label>
                      <input
                        type="text"
                        required
                        value={formData.district}
                        onChange={(e) => handleChange('district', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#0F1C3F] border border-white/10 text-white text-sm focus:border-emerald-400 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-blue-200">Taluka *</label>
                      <input
                        type="text"
                        required
                        value={formData.taluka}
                        onChange={(e) => handleChange('taluka', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#0F1C3F] border border-white/10 text-white text-sm focus:border-emerald-400 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-blue-200">Village *</label>
                      <input
                        type="text"
                        required
                        value={formData.village}
                        onChange={(e) => handleChange('village', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#0F1C3F] border border-white/10 text-white text-sm focus:border-emerald-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-blue-200">Pincode (Optional)</label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => handleChange('pincode', e.target.value)}
                      className="w-full sm:w-1/2 px-4 py-2.5 rounded-xl bg-[#0F1C3F] border border-white/10 text-white text-sm focus:border-emerald-400 focus:outline-none"
                      placeholder="e.g. 413115"
                    />
                  </div>
                </motion.div>
              )}

              {/* STEP 2: FARM & LAND */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-blue-200">Primary Farm Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.initialFarmName}
                      onChange={(e) => handleChange('initialFarmName', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0F1C3F] border border-white/10 text-white text-sm focus:border-emerald-400 focus:outline-none"
                      placeholder="e.g. Patil Krishi Farm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-blue-200">Total Land (Acres) *</label>
                      <input
                        type="number"
                        step="0.5"
                        min="0.5"
                        required
                        value={formData.totalLandAcres}
                        onChange={(e) => handleChange('totalLandAcres', parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0F1C3F] border border-white/10 text-white text-sm focus:border-emerald-400 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-blue-200">Ownership Type *</label>
                      <select
                        value={formData.ownershipType}
                        onChange={(e) => handleChange('ownershipType', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0F1C3F] border border-white/10 text-white text-sm focus:border-emerald-400 focus:outline-none"
                      >
                        <option value="OWNED">Self Owned</option>
                        <option value="LEASED">Leased / Rented</option>
                        <option value="SHARECROPPER">Sharecropper</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-blue-200">Farming Experience (Years) *</label>
                      <input
                        type="number"
                        min="0"
                        required
                        value={formData.experienceYears}
                        onChange={(e) => handleChange('experienceYears', parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0F1C3F] border border-white/10 text-white text-sm focus:border-emerald-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: FARMING METHOD & SUSTAINABILITY */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-blue-200 block">Current Farming Practice *</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: 'CONVENTIONAL', label: 'Conventional / Chemical Heavy', desc: 'Standard synthetic NPK and chemical crop protection.' },
                        { id: 'TRANSITIONAL', label: 'Transitional / Low-Chemical', desc: 'Actively reducing chemicals and testing bio-fertilizers.' },
                        { id: 'NO_TILL', label: 'Reduced Tillage / Zero-Till', desc: 'Direct seeding with crop stubble residue protection.' },
                        { id: 'ORGANIC', label: 'Fully Organic / Natural Farming', desc: '100% certified or non-chemical bio-inputs only.' },
                      ].map((m) => (
                        <div
                          key={m.id}
                          onClick={() => handleChange('farmingMethod', m.id)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                            formData.farmingMethod === m.id
                              ? 'bg-emerald-500/15 border-emerald-400 text-white'
                              : 'bg-[#0F1C3F] border-white/10 text-neutral-300 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold font-sans">{m.label}</span>
                            {formData.farmingMethod === m.id && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                          </div>
                          <p className="text-[11px] text-blue-200/60 mt-1 font-sans">{m.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-mono text-blue-200 block">Primary Irrigation Facility *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {[
                        { id: 'DRIP', label: 'Drip System' },
                        { id: 'SPRINKLER', label: 'Sprinkler' },
                        { id: 'CANAL', label: 'Canal Water' },
                        { id: 'BOREWELL', label: 'Borewell / Well' },
                        { id: 'RAINFED', label: 'Rainfed Only' },
                      ].map((irr) => (
                        <button
                          key={irr.id}
                          type="button"
                          onClick={() => handleChange('irrigationType', irr.id)}
                          className={`py-2 px-2.5 rounded-xl text-xs font-mono font-bold border transition-all ${
                            formData.irrigationType === irr.id
                              ? 'bg-orange-500/20 border-orange-400 text-orange-400'
                              : 'bg-[#0F1C3F] border-white/10 text-neutral-400 hover:text-white'
                          }`}
                        >
                          {irr.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form Controls */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => (s - 1) as any)}
                  className="px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-sans text-xs font-bold transition-all flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => (s + 1) as any)}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-emerald-950/40"
                >
                  <span>Continue to Step {step + 1}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-sans font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-xl shadow-emerald-950/50 disabled:opacity-50"
                >
                  <span>{loading ? 'Configuring Farm OS...' : 'Complete & Open My Farm →'}</span>
                </button>
              )}
            </div>
          </form>

        </div>
      </main>
    </div>
  )
}
