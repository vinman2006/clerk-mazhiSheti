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
import PitchRoleSwitcher from '@/components/ui/PitchRoleSwitcher'

export default function ProviderDashboardPage() {
  const { user } = useUser()
  const [fleet] = useState([
    {
      id: 'eq-1',
      name: 'Mahindra 575 DI Bhoomiputra',
      horsepower: 47,
      status: 'AVAILABLE',
      hourlyRate: 650,
      bookingsCount: 14,
    },
    {
      id: 'eq-2',
      name: 'Happy Seeder Zero-Till Planter',
      horsepower: 45,
      status: 'BOOKED',
      hourlyRate: 500,
      bookingsCount: 22,
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

  const handleAction = (id: string, newStatus: string) => {
    setBookingRequests(bookingRequests.map((b) => (b.id === id ? { ...b, status: newStatus } : b)))
  }

  return (
    <div className="min-h-screen bg-[#070B16] text-slate-100 flex flex-col selection:bg-orange-500/25 selection:text-orange-400">
      
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

          {/* Pitch Role Switcher */}
          <PitchRoleSwitcher currentRole="provider" />

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
            <span className="font-display font-black text-3xl text-white block">2 Tractors</span>
            <span className="text-emerald-400">All Maintained</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#0B152E]/90 border border-white/10 space-y-1">
            <span className="text-blue-200/60 block">Active Bookings</span>
            <span className="font-display font-black text-3xl text-orange-400 block">2 Requests</span>
            <span className="text-blue-300">₹7,900 Pipeline</span>
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
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Accept</span>
                      </button>
                      <button
                        onClick={() => handleAction(b.id, 'REJECTED')}
                        className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold transition-all flex items-center gap-1"
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
    </div>
  )
}
