'use client'

import React, { useState, useEffect } from 'react'
import { 
  Tractor, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Calendar, 
  ArrowRight, 
  ShieldCheck,
  X,
  CreditCard,
  Loader2,
  Clock,
  Sparkles
} from 'lucide-react'
import RazorpayCheckoutModal from '@/components/payments/RazorpayCheckoutModal'

interface EquipmentItem {
  id: string
  name: string
  category: string
  makeModel: string
  horsepower: number | null
  hourlyRate: number
  dailyRate: number
  location: string
  status: string
  contactPhone: string
  imageUrl?: string
}

interface BookingItem {
  id: string
  equipmentId: string
  equipment?: {
    name: string
    dailyRate: number
  }
  startDate: string
  endDate: string
  totalHours: number
  totalAmount: number
  status: string
  deliveryAddress: string
  createdAt: string
}

export default function EquipmentRentalPage() {
  const [equipmentList, setEquipmentList] = useState<EquipmentItem[]>([
    {
      id: 'eq-mahindra-575',
      name: 'Mahindra Tractor',
      category: 'TRACTOR',
      makeModel: 'Mahindra 575 DI Bhoomiputra (47 HP)',
      horsepower: 47,
      hourlyRate: 350.0,
      dailyRate: 2500.0,
      location: 'Baramati MIDC (4.2 km away)',
      contactPhone: '9822455667',
      status: 'AVAILABLE',
      imageUrl: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'eq-john-deere-5050',
      name: 'John Deere Tractor',
      category: 'TRACTOR',
      makeModel: 'John Deere 5050D Heavy Duty (50 HP)',
      horsepower: 50,
      hourlyRate: 450.0,
      dailyRate: 3200.0,
      location: 'Daund Phata, Baramati (6.8 km away)',
      contactPhone: '9822112233',
      status: 'AVAILABLE',
      imageUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'eq-sonalika-745',
      name: 'Sonalika Tractor',
      category: 'TRACTOR',
      makeModel: 'Sonalika Sikander RX 47 (50 HP)',
      horsepower: 50,
      hourlyRate: 400.0,
      dailyRate: 2800.0,
      location: 'Indapur Rd, Baramati (5.1 km away)',
      contactPhone: '9822998877',
      status: 'AVAILABLE',
      imageUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?q=80&w=800&auto=format&fit=crop',
    },
  ])

  const [bookings, setBookings] = useState<BookingItem[]>([])
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentItem | null>(equipmentList[0])
  const [rentalDate, setRentalDate] = useState('2026-09-06')
  const [durationDays, setDurationDays] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [activePaymentModal, setActivePaymentModal] = useState<{
    orderId: string
    title: string
    displayAmount: number
  } | null>(null)

  // Fetch live equipment and existing bookings from Neon PostgreSQL
  const loadData = async () => {
    try {
      const res = await fetch('/api/equipment')
      if (res.ok) {
        const data = await res.json()
        if (data.equipment && data.equipment.length > 0) {
          setEquipmentList(data.equipment)
          // Keep current selection or select first
          if (!selectedEquipment) {
            setSelectedEquipment(data.equipment[0])
          }
        }
        if (data.bookings) {
          setBookings(data.bookings)
        }
      }
    } catch (err) {
      console.warn('Could not load equipment from server, using pre-populated catalog.', err)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // Calculate authoritative total
  const totalAmount = (selectedEquipment?.dailyRate || 2500) * durationDays

  // Format display date
  const formatDisplayDate = (dateString: string) => {
    try {
      const d = new Date(dateString)
      return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    } catch {
      return dateString
    }
  }

  // Handle Create Booking & Open Razorpay
  const handleProceedToPayment = async () => {
    if (!selectedEquipment) return
    setIsSubmitting(true)
    setToastMessage(null)

    try {
      // 1. Create EquipmentBooking in Neon PostgreSQL
      const res = await fetch('/api/equipment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          equipmentId: selectedEquipment.id,
          rentalDate,
          durationDays,
        }),
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.message || data.error || 'Failed to reserve tractor.')
      }

      const booking = data.booking

      // 2. Open Razorpay Checkout Modal
      setActivePaymentModal({
        orderId: booking.id,
        title: `${selectedEquipment.name} Rental (${durationDays} Day)`,
        displayAmount: booking.totalAmount,
      })
    } catch (err: any) {
      setToastMessage(`Error: ${err.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // On payment success: refresh bookings and notify
  const handlePaymentSuccess = async (verifyResult: any) => {
    setToastMessage(`✓ Tractor booking confirmed! ${selectedEquipment?.name} reserved for ${formatDisplayDate(rentalDate)}.`)
    await loadData()
  }

  const handlePaymentFailure = (error: any) => {
    setToastMessage('Payment was cancelled or failed. Your booking has not been confirmed.')
  }

  return (
    <div className="space-y-8 relative pb-16">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-[#0B1736] border border-emerald-500/40 text-emerald-200 shadow-2xl flex items-center gap-3 text-xs font-mono animate-in slide-in-from-top duration-300 max-w-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="flex-1">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white ml-2">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <Tractor className="w-3.5 h-3.5" />
            <span>PRIMARY CULTIVATOR MACHINERY ACCESS</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            Rent Equipment — Tractor Rental
          </h1>
          <p className="text-xs sm:text-sm font-sans text-blue-200/70">
            Instant agricultural machinery hire powered by Neon PostgreSQL, Razorpay payments, and Novu notifications
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-blue-200 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Razorpay Test Mode</span>
          </span>
        </div>
      </div>

      {/* Main Grid: Available Tractors + Booking Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: 2-3 Realistic Tractor Cards (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-lg text-white">Available Tractors & Machinery</h2>
            <span className="text-xs font-mono text-neutral-400">Select one tractor to book</span>
          </div>

          <div className="space-y-4">
            {equipmentList.slice(0, 3).map((tractor) => {
              const isSelected = selectedEquipment?.id === tractor.id
              return (
                <div
                  key={tractor.id}
                  onClick={() => setSelectedEquipment(tractor)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-200 border ${
                    isSelected
                      ? 'bg-[#0F1C3F] border-emerald-500/70 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/50'
                      : 'bg-[#0B152E]/90 border-white/10 hover:border-white/25 hover:bg-[#0E1B3A]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                        isSelected 
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' 
                          : 'bg-white/5 border-white/10 text-neutral-400'
                      }`}>
                        <Tractor className="w-6 h-6" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-display font-bold text-base text-white">{tractor.name}</h3>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold">
                            {tractor.status}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-300 font-sans">{tractor.makeModel}</p>
                        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono text-neutral-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-neutral-500" />
                            {tractor.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-neutral-500" />
                            {tractor.contactPhone}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xl font-bold font-mono text-emerald-400 block">
                        ₹{tractor.dailyRate.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] font-mono text-neutral-400">/day</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-400">Power: {tractor.horsepower || 47} HP</span>
                    <button
                      type="button"
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        isSelected 
                          ? 'bg-emerald-500 text-neutral-950 font-bold' 
                          : 'bg-white/5 text-neutral-300 hover:text-white'
                      }`}
                    >
                      {isSelected ? '✓ Selected' : 'Select Tractor'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Simple Rental Booking Panel (5 cols) */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl bg-[#0B152E]/95 border border-emerald-500/40 p-6 backdrop-blur-2xl shadow-2xl space-y-6 sticky top-24">
            
            <div className="space-y-1 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Rental Booking Panel
                </span>
              </div>
              <h2 className="font-display font-bold text-xl text-white">
                Reserve Equipment
              </h2>
            </div>

            {selectedEquipment ? (
              <div className="space-y-5">
                
                {/* Equipment Summary */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-neutral-400">Equipment:</span>
                    <span className="font-bold text-white text-sm">{selectedEquipment.name}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-neutral-400">Base Rate:</span>
                    <span className="text-emerald-400 font-bold">₹{selectedEquipment.dailyRate.toLocaleString('en-IN')}/day</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-neutral-400">Availability:</span>
                    <span className="text-emerald-400 font-bold">Available</span>
                  </div>
                </div>

                {/* Rental Date Input */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-neutral-300 block flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Rental Date:</span>
                  </label>
                  <input
                    type="date"
                    value={rentalDate}
                    onChange={(e) => setRentalDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#070B14] border border-white/10 text-white font-mono text-xs focus:border-emerald-400 focus:outline-none transition-colors"
                  />
                  <p className="text-[11px] font-mono text-neutral-400">
                    Selected: {formatDisplayDate(rentalDate)}
                  </p>
                </div>

                {/* Duration Input */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-neutral-300 block flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Duration:</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((days) => (
                      <button
                        key={days}
                        type="button"
                        onClick={() => setDurationDays(days)}
                        className={`py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                          durationDays === days
                            ? 'bg-emerald-500 text-neutral-950 border-emerald-400 shadow-md'
                            : 'bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        {days} {days === 1 ? 'Day' : 'Days'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Total Authoritative Amount */}
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-mono text-emerald-300 uppercase block font-bold">
                      Authoritative Total
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">
                      {durationDays} Day(s) × ₹{selectedEquipment.dailyRate.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-display font-black text-3xl text-emerald-400 font-mono">
                      ₹{totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  type="button"
                  onClick={handleProceedToPayment}
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-neutral-950 font-sans font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/20 active:scale-[0.98] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-neutral-950" />
                      <span>Reserving in Neon PostgreSQL...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>Pay ₹{totalAmount.toLocaleString('en-IN')}</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>

                <p className="text-[11px] font-mono text-neutral-400 text-center flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Real Razorpay Checkout in Test Mode • Zero real money</span>
                </p>

              </div>
            ) : (
              <div className="py-12 text-center text-neutral-400 text-xs font-mono">
                Please select a tractor from the left to configure rental.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Your Machinery Bookings Section (PostgreSQL Record) */}
      <div className="mt-12 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="space-y-0.5">
            <h2 className="font-display font-bold text-xl text-white">Your Machinery Bookings</h2>
            <p className="text-xs text-neutral-400 font-mono">
              Persisted in Neon PostgreSQL with authoritative payment verification
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-mono text-blue-200 border border-white/10">
            {bookings.length} Bookings
          </span>
        </div>

        {bookings.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#0B152E]/70 border border-white/10 text-center space-y-2">
            <Tractor className="w-8 h-8 text-neutral-500 mx-auto" />
            <p className="text-sm text-neutral-300 font-medium">No bookings placed yet</p>
            <p className="text-xs text-neutral-500 font-mono">
              Select one of the tractors above and complete a test payment to see it here as CONFIRMED.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookings.map((bk) => {
              const isConfirmed = bk.status === 'CONFIRMED' || bk.status === 'ACCEPTED'
              return (
                <div
                  key={bk.id}
                  className="p-5 rounded-2xl bg-[#0B152E]/90 border border-white/10 shadow-lg flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-base text-white">
                        {bk.equipment?.name || 'Tractor Rental'}
                      </h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1 border ${
                        isConfirmed
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                      }`}>
                        {isConfirmed && <CheckCircle2 className="w-3 h-3" />}
                        {isConfirmed ? 'CONFIRMED' : bk.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1 text-neutral-300">
                      <div>
                        <span className="text-neutral-500 block text-[10px]">Rental Date</span>
                        <span>{formatDisplayDate(bk.startDate)}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block text-[10px]">Duration</span>
                        <span>{Math.round(bk.totalHours / 8)} Day ({bk.totalHours} hrs)</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="text-neutral-500 text-[10px] block">Total Amount</span>
                      <span className="text-emerald-400 font-bold text-sm">
                        ₹{bk.totalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-neutral-500 text-[10px] block">Booking ID</span>
                      <span className="text-neutral-300 font-mono text-[11px]">{bk.id.slice(-8)}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Razorpay Checkout Modal Integration */}
      {activePaymentModal && (
        <RazorpayCheckoutModal
          isOpen={true}
          onClose={() => setActivePaymentModal(null)}
          orderId={activePaymentModal.orderId}
          orderType="EQUIPMENT_BOOKING"
          title={activePaymentModal.title}
          description="Authoritative Tractor Hire Settlement"
          displayAmount={activePaymentModal.displayAmount}
          onSuccess={handlePaymentSuccess}
          onFailure={handlePaymentFailure}
        />
      )}

    </div>
  )
}
