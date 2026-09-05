'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Layers, 
  Plus, 
  Sprout, 
  Droplets, 
  CheckCircle2, 
  Wind, 
  MapPin, 
  Activity,
  Calendar,
  X
} from 'lucide-react'

export default function FieldsPage() {
  const [fields, setFields] = useState([
    {
      id: 'f1',
      name: 'Field 01 — Sugarcane North Plot',
      areaAcres: 5.0,
      soilType: 'Black Cotton Soil',
      currentCrop: 'Sugarcane',
      variety: 'Co 86032 (Nira)',
      sowingDate: '15 Jan 2026',
      harvestDate: '15 Jan 2027',
      isNoTill: false,
      irrigationZone: 'Zone A (Drip)',
      moisture: '44%',
      ph: 6.8,
      status: 'ACTIVE',
    },
    {
      id: 'f2',
      name: 'Field 02 — Soybean & Wheat Rotation',
      areaAcres: 4.0,
      soilType: 'Black Cotton Soil',
      currentCrop: 'Soybean',
      variety: 'JS 335 Non-GMO',
      sowingDate: '20 Jun 2026',
      harvestDate: '10 Oct 2026',
      isNoTill: true,
      irrigationZone: 'Zone B (Sprinkler)',
      moisture: '38%',
      ph: 6.85,
      status: 'ACTIVE',
    },
    {
      id: 'f3',
      name: 'Field 03 — Organic Pomegranate Orchard',
      areaAcres: 3.5,
      soilType: 'Red Loam',
      currentCrop: 'Pomegranate',
      variety: 'Bhagwa Super',
      sowingDate: 'Perennial (Yr 3)',
      harvestDate: 'Nov 2026',
      isNoTill: true,
      irrigationZone: 'Zone C (Micro-Drip)',
      moisture: '41%',
      ph: 7.1,
      status: 'ACTIVE',
    },
    {
      id: 'f4',
      name: 'Field 04 — Pulses & Vegetables',
      areaAcres: 2.0,
      soilType: 'Alluvial',
      currentCrop: 'Chickpea & Onion',
      variety: 'Digvijay Gram',
      sowingDate: '10 Nov 2026',
      harvestDate: 'Feb 2027',
      isNoTill: false,
      irrigationZone: 'Zone D (Furrow/Drip)',
      moisture: '46%',
      ph: 6.7,
      status: 'ACTIVE',
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [newFieldName, setNewFieldName] = useState('')
  const [newFieldAcres, setNewFieldAcres] = useState('2.5')
  const [newCrop, setNewCrop] = useState('Wheat')
  const [newSoil, setNewSoil] = useState('Black Cotton Soil')
  const [isNoTill, setIsNoTill] = useState(false)

  const handleAddField = (e: React.FormEvent) => {
    e.preventDefault()
    const newField = {
      id: `f${Date.now()}`,
      name: newFieldName || `Field 0${fields.length + 1}`,
      areaAcres: parseFloat(newFieldAcres) || 2.0,
      soilType: newSoil,
      currentCrop: newCrop,
      variety: 'High-Yield Local',
      sowingDate: 'Current Season',
      harvestDate: 'Next Quarter',
      isNoTill,
      irrigationZone: `Zone ${String.fromCharCode(65 + fields.length)}`,
      moisture: '40%',
      ph: 6.8,
      status: 'ACTIVE',
    }
    setFields([...fields, newField])
    setShowModal(false)
    setNewFieldName('')
  }

  const totalAcres = fields.reduce((sum, f) => sum + f.areaAcres, 0)
  const noTillAcres = fields.filter((f) => f.isNoTill).reduce((sum, f) => sum + f.areaAcres, 0)

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <Layers className="w-3.5 h-3.5" />
            <span>FARM GEOMETRY & FIELDS</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            Active Field Management
          </h1>
          <p className="text-xs sm:text-sm font-sans text-blue-200/70">
            {totalAcres.toFixed(1)} total acres divided into {fields.length} operational zones ({noTillAcres.toFixed(1)} acres in regenerative no-till)
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-emerald-950/50 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Field</span>
        </button>
      </div>

      {/* Field Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((f) => (
          <div
            key={f.id}
            className="rounded-2xl bg-[#0B152E]/90 border border-white/10 hover:border-emerald-500/40 p-6 backdrop-blur-xl shadow-xl transition-all space-y-4 relative group"
          >
            {/* Title & Status */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-sans font-bold text-base text-white">{f.name}</h3>
                <span className="text-xs font-mono text-blue-300/70">{f.irrigationZone}</span>
              </div>
              <div className="flex items-center gap-2">
                {f.isNoTill && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1">
                    <Wind className="w-3 h-3" />
                    No-Till
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-[10px] font-mono font-bold">
                  {f.areaAcres} Acres
                </span>
              </div>
            </div>

            {/* Crop Info */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-blue-200/60">Current Crop:</span>
                <span className="font-bold text-white">{f.currentCrop} ({f.variety})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200/60">Soil Classification:</span>
                <span className="text-blue-200">{f.soilType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200/60">Sowing / Cycle:</span>
                <span className="text-blue-200">{f.sowingDate} → {f.harvestDate}</span>
              </div>
            </div>

            {/* Telemetry Snapshot */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-blue-300">
                <Droplets className="w-3.5 h-3.5 text-blue-400" />
                <span>Moisture: <strong>{f.moisture}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-300">
                <Sprout className="w-3.5 h-3.5 text-emerald-400" />
                <span>Soil pH: <strong>{f.ph}</strong></span>
              </div>
              <span className="text-emerald-400 font-bold">Active ✓</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Adding Field */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl bg-[#0F1C3F] border border-white/10 p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-display font-bold text-lg text-white">Add Field Zone</h3>
              <button onClick={() => setShowModal(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddField} className="space-y-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-blue-200 block">Field Name *</label>
                <input
                  type="text"
                  required
                  value={newFieldName}
                  onChange={(e) => setNewFieldName(e.target.value)}
                  placeholder="e.g. Field 05 — East Plot"
                  className="w-full px-3 py-2 rounded-xl bg-[#0B152E] border border-white/10 text-white text-sm focus:border-emerald-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-blue-200 block">Area (Acres) *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newFieldAcres}
                    onChange={(e) => setNewFieldAcres(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0B152E] border border-white/10 text-white text-sm focus:border-emerald-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-blue-200 block">Current Crop *</label>
                  <input
                    type="text"
                    required
                    value={newCrop}
                    onChange={(e) => setNewCrop(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0B152E] border border-white/10 text-white text-sm focus:border-emerald-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-blue-200 block">Soil Type *</label>
                <select
                  value={newSoil}
                  onChange={(e) => setNewSoil(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0B152E] border border-white/10 text-white text-sm focus:border-emerald-400 focus:outline-none"
                >
                  <option value="Black Cotton Soil">Black Cotton Soil (Heavy clay)</option>
                  <option value="Red Loam">Red Loam Soil</option>
                  <option value="Alluvial">Alluvial Soil</option>
                  <option value="Sandy Loam">Sandy Loam</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="noTillCheck"
                  checked={isNoTill}
                  onChange={(e) => setIsNoTill(e.target.checked)}
                  className="rounded border-white/20 text-emerald-500 focus:ring-0"
                />
                <label htmlFor="noTillCheck" className="text-blue-100 font-sans cursor-pointer">
                  Adopt No-Till / Zero-Till conservation on this field
                </label>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/[0.05] text-neutral-300 text-xs font-sans font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-sans font-bold"
                >
                  Save Field
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
