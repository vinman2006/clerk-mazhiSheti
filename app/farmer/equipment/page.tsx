'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Tractor, 
  Clock, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Calendar, 
  ArrowRight, 
  ShieldCheck,
  Wrench,
  X
} from 'lucide-react'

export default function EquipmentRentalPage() {
  const [equipmentList] = useState([
    {
      id: 'eq1',
      name: 'Mahindra 575 DI Bhoomiputra Tractor',
      category: 'TRACTOR',
      makeModel: 'Mahindra 575 DI (47 HP)',
      horsepower: 47,
      hourlyRate: 650.0,
      dailyRate: 4800.0,
      location: 'Baramati MIDC (4.2 km away)',
      contactPhone: '9822455667',
      status: 'AVAILABLE',
      implements: 'MB Plough, Heavy Rotavator included',
    },
    {
      id: 'eq2',
      name: 'John Deere 5050D 4WD Heavy Duty',
      category: 'TRACTOR',
      makeModel: 'John Deere 5050D (50 HP)',
      horsepower: 50,
      hourlyRate: 850.0,
      dailyRate: 6200.0,
      location: 'Daund Phata, Baramati (6.8 km away)',
      contactPhone: '9822112233',
      status: 'AVAILABLE',
      implements: 'Laser Land Leveler, Subsoiler',
    },
    {
      id: 'eq3',
      name: 'Happy Seeder Zero-Till Planter Implement',
      category: 'NO_TILL_PLANTER',
      makeModel: 'Shaktiman 9-Tyne No-Till Seeder',
      horsepower: 45,
      hourlyRate: 500.0,
      dailyRate: 3600.0,
      location: 'Baramati MIDC (4.2 km away)',
      contactPhone: '9822455667',
      status: 'AVAILABLE',
      implements: 'Direct seeding into standing residue mulch',
    },
    {
      id: 'eq4',
      name: 'Pujita Self-Propelled Multi-Crop Harvester',
      category: 'HARVESTER',
      makeModel: 'Preet 987 Track Harvester',
      horsepower: 75,
      hourlyRate: 1800.0,
      dailyRate: 14000.0,
      location: 'Phaltan Rd (9.5 km away)',
      contactPhone: '9822334455',
      status: 'AVAILABLE',
      implements: 'Grain loss & cleaner attachments',
    },
  ])

  const [activeBookings, setActiveBookings] = useState([
    {
      id: 'bk-1042',
      equipment: 'Happy Seeder Zero-Till Planter',
      date: 'Tomorrow, 08:00 AM - 04:00 PM',
      hours: 8,
      amount: 4000.0,
      field: 'Field 02 (Soybean & Wheat Rotation)',
      status: 'ACCEPTED',
      providerContact: '9822455667',
    },
  ])

  const [selectedEquipment, setSelectedEquipment] = useState<any>(null)
  const [hours, setHours] = useState('6')
  const [bookingDate, setBookingDate] = useState('2026-09-08')

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault()
    const newBk = {
      id: `bk-${Date.now()}`,
      equipment: selectedEquipment.name,
      date: `${bookingDate} (Requested)`,
      hours: parseInt(hours) || 6,
      amount: (selectedEquipment.hourlyRate || 600) * (parseInt(hours) || 6),
      field: 'Field 01 — Sugarcane Plot',
      status: 'PENDING',
      providerContact: selectedEquipment.contactPhone,
    }
    setActiveBookings([newBk, ...activeBookings])
    setSelectedEquipment(null)
    alert('Booking Request Sent to Provider! The fleet manager will verify machinery availability and confirm dispatch.')
  }

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-mono font-bold">
            <Tractor className="w-3.5 h-3.5" />
            <span>AGRI-MACHINERY & TRACTOR HUB</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            Agricultural Equipment Rental
          </h1>
          <p className="text-xs sm:text-sm font-sans text-blue-200/70">
            Book verified local tractors, no-till planters, and harvesters with transparent hourly pricing
          </p>
        </div>
      </div>

      {/* Active Bookings Tracker */}
      {activeBookings.length > 0 && (
        <div className="p-6 rounded-2xl bg-[#0B152E]/90 border border-orange-500/30 backdrop-blur-xl shadow-xl space-y-4">
          <h2 className="font-display font-bold text-base text-white">Your Machinery Bookings</h2>
          <div className="space-y-3">
            {activeBookings.map((bk) => (
              <div
                key={bk.id}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono"
              >
                <div>
                  <span className="font-bold text-white block text-sm font-sans">{bk.equipment}</span>
                  <span className="text-blue-200/60">{bk.date} • {bk.field}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-white font-bold block">₹{bk.amount.toLocaleString()} ({bk.hours}h)</span>
                    <span className="text-blue-300/60 text-[10px]">Ph: {bk.providerContact}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    bk.status === 'ACCEPTED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    {bk.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Equipment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {equipmentList.map((eq) => (
          <div
            key={eq.id}
            className="rounded-2xl bg-[#0B152E]/90 border border-white/10 hover:border-orange-500/40 p-6 backdrop-blur-xl shadow-xl transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/5 text-orange-300 border border-white/10">
                  {eq.category}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold">
                  {eq.status}
                </span>
              </div>

              <div>
                <h3 className="font-sans font-bold text-lg text-white">{eq.name}</h3>
                <span className="text-xs font-mono text-blue-300/70">{eq.makeModel}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-blue-200/60">Location:</span>
                  <span className="text-white">{eq.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200/60">Attachments:</span>
                  <span className="text-emerald-400 font-bold">{eq.implements}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="font-display font-black text-2xl text-white">₹{eq.hourlyRate}</span>
                <span className="text-xs font-mono text-blue-300/60"> / hour</span>
              </div>

              <button
                onClick={() => setSelectedEquipment(eq)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-orange-950/40 flex items-center gap-2"
              >
                <span>Request Booking</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedEquipment && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl bg-[#0F1C3F] border border-white/10 p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-display font-bold text-lg text-white">Book Machinery</h3>
              <button onClick={() => setSelectedEquipment(null)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBooking} className="space-y-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5 space-y-1">
                <span className="font-bold text-white block text-sm font-sans">{selectedEquipment.name}</span>
                <span className="text-emerald-400">Rate: ₹{selectedEquipment.hourlyRate}/hr</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-blue-200 block">Rental Date *</label>
                <input
                  type="date"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0B152E] border border-white/10 text-white text-sm focus:border-orange-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-blue-200 block">Required Operating Hours *</label>
                <input
                  type="number"
                  min="2"
                  max="24"
                  required
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0B152E] border border-white/10 text-white text-sm focus:border-orange-400 focus:outline-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#0B152E] border border-white/10 flex justify-between font-bold">
                <span className="text-blue-200">Total Estimated Amount:</span>
                <span className="text-white text-sm">₹{(selectedEquipment.hourlyRate * (parseInt(hours) || 6)).toLocaleString()}</span>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedEquipment(null)}
                  className="px-4 py-2 rounded-xl bg-white/[0.05] text-neutral-300 text-xs font-sans font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-xs font-sans font-bold uppercase tracking-wider"
                >
                  Confirm Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
