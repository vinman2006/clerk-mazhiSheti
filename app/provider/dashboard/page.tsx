'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Tractor, 
  Calendar, 
  Clock, 
  Check, 
  X, 
  ArrowLeft, 
  Plus,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react'
import { FarmerLogo } from '@/components/ui/FarmerLogo'
import { UserButton, useUser } from '@clerk/nextjs'
import { Wrench, Tag } from 'lucide-react'

export default function ProviderDashboardPage() {
  const { user } = useUser()
  const [fleet, setFleet] = useState([
    {
      id: 'eq-1',
      name: 'Mahindra 575 DI Bhoomiputra',
      horsepower: 47,
      status: 'AVAILABLE',
      hourlyRate: 650,
      bookingsCount: 14,
      implements: 'MB Plough & Heavy Rotavator',
    },
    {
      id: 'eq-2',
      name: 'Happy Seeder Zero-Till Planter',
      horsepower: 45,
      status: 'BOOKED',
      hourlyRate: 500,
      bookingsCount: 22,
      implements: '9-Tyne Direct Seeding Rig',
    },
    {
      id: 'eq-3',
      name: 'John Deere 5050D 4WD',
      horsepower: 50,
      status: 'AVAILABLE',
      hourlyRate: 850,
      bookingsCount: 8,
      implements: 'Laser Land Leveler Attachment',
    },
  ])

  const [bookingRequests, setBookingRequests] = useState([
    {
      id: 'req-01',
      farmerName: 'Anandarao Patil',
      village: 'Malegaon, Baramati (4.2 km)',
      equipment: 'Happy Seeder Zero-Till Planter Implement',
      hours: 8,
      amount: 4000,
      date: 'Tomorrow, 08:00 AM',
      status: 'ACCEPTED',
    },
    {
      id: 'req-02',
      farmerName: 'Sanjay Shinde',
      village: 'Songaon, Baramati (7.1 km)',
      equipment: 'Mahindra 575 DI (MB Ploughing)',
      hours: 6,
      amount: 3900,
      date: '10 Sep 2026',
      status: 'PENDING',
    },
  ])

  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newName, setNewName] = useState('')
  const [newHP, setNewHP] = useState('45')
  const [newRate, setNewRate] = useState('600')
  const [newImplements, setNewImplements] = useState('Rotavator & Cultivator')

  const handleAction = (id: string, newStatus: string) => {
    const booking = bookingRequests.find(b => b.id === id)
    setBookingRequests(bookingRequests.map((b) => (b.id === id ? { ...b, status: newStatus } : b)))
    setToastMessage(`Booking #${id} for ${booking?.farmerName || 'Farmer'} marked as ${newStatus}.`)
    setTimeout(() => setToastMessage(null), 4000)
  }

  const handleToggleFleetStatus = (eqId: string) => {
    setFleet(
      fleet.map(eq => {
        if (eq.id !== eqId) return eq
        const nextStatus = eq.status === 'AVAILABLE' ? 'MAINTENANCE' : 'AVAILABLE'
        setToastMessage(`${eq.name} status updated to: ${nextStatus}.`)
        setTimeout(() => setToastMessage(null), 4000)
        return { ...eq, status: nextStatus }
      })
    )
  }

  const handleAddEquipment = (e: React.FormEvent) => {
    e.preventDefault()
    const newEq = {
      id: `eq-${Date.now()}`,
      name: newName || 'Swaraj 744 FE Tractor',
      horsepower: parseInt(newHP) || 48,
      status: 'AVAILABLE',
      hourlyRate: parseFloat(newRate) || 600,
      bookingsCount: 0,
      implements: newImplements || 'Standard Implements',
    }
    setFleet([...fleet, newEq])
    setShowAddModal(false)
    setNewName('')
    setToastMessage(`New equipment ${newEq.name} registered and listed in fleet!`)
    setTimeout(() => setToastMessage(null), 4000)
  }

  return (
    <div className="min-h-screen bg-[#070B16] text-slate-100 flex flex-col selection:bg-orange-500/25 selection:text-orange-400 relative">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-[#0E1A33] border border-orange-500/40 text-orange-200 shadow-2xl flex items-center gap-3 text-xs font-mono animate-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white ml-2">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-[#0B152E]/90 backdrop-blur-xl border-b border-white/10 px-6 sm:px-10 py-3.5 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-6">
          <Link href="/provider/dashboard" className="flex items-center gap-3">
            <FarmerLogo size={32} showText={true} showBadge={false} subtitle="EQUIPMENT & MACHINERY FLEET" />
          </Link>
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs font-mono">
            <Tractor className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-orange-200">Manager:</span>
            <span className="font-bold text-white">
              {user?.fullName || 'Vikram Patil'} (Baramati Fleet Hub)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-sans font-semibold text-blue-100"
          >
            ← Home
          </Link>

          {/* Verified Role Indicator */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-xs font-mono text-orange-300">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span className="font-bold">Fleet Provider</span>
          </div>

          <UserButton 
            appearance={{
              elements: {
                userButtonAvatarBox: 'w-8 h-8 rounded-xl border border-orange-500/40 shadow-sm',
              }
            }}
          />
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-8">
        
        {/* KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-5 rounded-2xl bg-[#0B152E]/90 border border-white/10 space-y-1">
            <span className="text-blue-200/60 block">Fleet Machines</span>
            <span className="font-display font-black text-3xl text-white block">{fleet.length} Machines</span>
            <span className="text-emerald-400">{fleet.filter(f => f.status === 'AVAILABLE').length} Available Now</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#0B152E]/90 border border-white/10 space-y-1">
            <span className="text-blue-200/60 block">Active Bookings</span>
            <span className="font-display font-black text-3xl text-orange-400 block">{bookingRequests.length} Requests</span>
            <span className="text-blue-300">₹{bookingRequests.reduce((acc, b) => acc + b.amount, 0).toLocaleString()} Pipeline</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#0B152E]/90 border border-white/10 space-y-1">
            <span className="text-blue-200/60 block">Completed Acres</span>
            <span className="font-display font-black text-3xl text-white block">142.5</span>
            <span className="text-emerald-400">Zero-Till Promoted</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#0B152E]/90 border border-white/10 space-y-1">
            <span className="text-blue-200/60 block">Farmer Rating</span>
            <span className="font-display font-black text-3xl text-emerald-400 block">4.9 ★</span>
            <span className="text-blue-200">38 Reviews</span>
          </div>
        </div>

        {/* Fleet Machinery Inventory with Working Action Controls */}
        <div className="p-6 rounded-2xl bg-[#0B152E]/90 border border-white/10 backdrop-blur-xl shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <h2 className="font-display font-bold text-lg text-white">Your Machinery Inventory & Dispatch</h2>
              <p className="text-xs font-sans text-blue-200/70">Manage equipment status, rates, and operational readiness</p>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-orange-950/50 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Register New Machine</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fleet.map((eq) => (
              <div
                key={eq.id}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-orange-500/30 transition-all space-y-3.5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-white/10 text-orange-300">
                      {eq.horsepower} HP
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      eq.status === 'AVAILABLE' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      eq.status === 'BOOKED' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                      'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}>
                      {eq.status}
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-base text-white">{eq.name}</h3>
                  <p className="text-xs text-blue-300/70 font-mono">{eq.implements}</p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="font-display font-black text-xl text-white">₹{eq.hourlyRate}</span>
                    <span className="text-[10px] font-mono text-blue-300/60"> / hour</span>
                  </div>

                  <button
                    onClick={() => handleToggleFleetStatus(eq.id)}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-xs font-mono font-bold text-blue-200 transition-all border border-white/10 flex items-center gap-1.5"
                    title="Toggle Machine Status"
                  >
                    <Wrench className="w-3.5 h-3.5 text-orange-400" />
                    <span>{eq.status === 'AVAILABLE' ? 'Set Maintenance' : 'Set Available'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inbound Booking Requests */}
        <div className="p-6 rounded-2xl bg-[#0B152E]/90 border border-white/10 backdrop-blur-xl shadow-xl space-y-5">
          <h2 className="font-display font-bold text-lg text-white">Inbound Farmer Rental Requests</h2>

          <div className="space-y-3">
            {bookingRequests.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono"
              >
                <div>
                  <span className="font-bold text-white block text-sm font-sans">{b.farmerName}</span>
                  <span className="text-blue-200/60">{b.village} • {b.equipment}</span>
                  <span className="text-orange-400 block mt-0.5">{b.date} ({b.hours} hours required)</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-display font-bold text-xl text-white">₹{b.amount.toLocaleString()}</span>
                  
                  {b.status === 'PENDING' ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAction(b.id, 'ACCEPTED')}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all flex items-center gap-1 shadow-md shadow-emerald-950/40"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Accept</span>
                      </button>
                      <button
                        onClick={() => handleAction(b.id, 'REJECTED')}
                        className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold transition-all flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Decline</span>
                      </button>
                    </div>
                  ) : (
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      b.status === 'ACCEPTED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {b.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Add Machinery Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl bg-[#0E1A33] border border-orange-500/40 p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-display font-bold text-lg text-white">Register Fleet Machinery</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEquipment} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">Tractor / Machinery Name:</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Swaraj 744 FE 4WD"
                  required
                  className="w-full p-2.5 rounded-xl bg-[#081126] border border-white/10 text-white font-sans text-xs focus:outline-none focus:border-orange-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Horsepower (HP):</label>
                  <input
                    type="number"
                    value={newHP}
                    onChange={(e) => setNewHP(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl bg-[#081126] border border-white/10 text-white font-sans text-xs focus:outline-none focus:border-orange-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Hourly Rate (₹):</label>
                  <input
                    type="number"
                    value={newRate}
                    onChange={(e) => setNewRate(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl bg-[#081126] border border-white/10 text-white font-sans text-xs focus:outline-none focus:border-orange-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">Included Attachments / Implements:</label>
                <input
                  type="text"
                  value={newImplements}
                  onChange={(e) => setNewImplements(e.target.value)}
                  placeholder="e.g. Rotavator, MB Plough, Laser Leveler"
                  className="w-full p-2.5 rounded-xl bg-[#081126] border border-white/10 text-white font-sans text-xs focus:outline-none focus:border-orange-400"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 text-xs font-sans"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-orange-950/50"
                >
                  <span>Save Machine to Fleet</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
