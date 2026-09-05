'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ShoppingBag, 
  Plus, 
  Tag, 
  MapPin, 
  TrendingUp, 
  CheckCircle2, 
  Award,
  Filter,
  X,
  ArrowRight,
  CreditCard
} from 'lucide-react'
import RazorpayCheckoutModal from '@/components/payments/RazorpayCheckoutModal'

export default function MarketplacePage() {
  const [listings, setListings] = useState([
    {
      id: 'm1',
      cropName: 'Pomegranate (Bhagwa Quality)',
      variety: 'Export Grade Grade-A',
      quantityKg: 1500,
      pricePerKg: 135,
      minOrderKg: 50,
      organicCertified: true,
      location: 'Baramati, Pune',
      mandiRefPrice: '₹120/kg APMC',
      farmer: 'Anandarao Patil',
      status: 'ACTIVE',
    },
    {
      id: 'm2',
      cropName: 'Soybean (Organic Transition)',
      variety: 'JS 335 Non-GMO Seed',
      quantityKg: 2800,
      pricePerKg: 58,
      minOrderKg: 100,
      organicCertified: false,
      location: 'Baramati, Pune',
      mandiRefPrice: '₹52/kg APMC',
      farmer: 'Anandarao Patil',
      status: 'ACTIVE',
    },
    {
      id: 'm3',
      cropName: 'Nashik Red Onion (Export Quality)',
      variety: 'Garva Summer Onion',
      quantityKg: 4000,
      pricePerKg: 26,
      minOrderKg: 200,
      organicCertified: false,
      location: 'Baramati, Pune',
      mandiRefPrice: '₹22/kg APMC',
      farmer: 'Anandarao Patil',
      status: 'ACTIVE',
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [newCrop, setNewCrop] = useState('')
  const [newQty, setNewQty] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [isOrganic, setIsOrganic] = useState(false)
  const [checkoutItem, setCheckoutItem] = useState<any>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault()
    const newL = {
      id: `m${Date.now()}`,
      cropName: newCrop || 'Sugarcane Juice Canes',
      variety: 'Fresh Harvest',
      quantityKg: parseFloat(newQty) || 1000,
      pricePerKg: parseFloat(newPrice) || 45,
      minOrderKg: 50,
      organicCertified: isOrganic,
      location: 'Baramati, Pune',
      mandiRefPrice: '₹40/kg APMC',
      farmer: 'Anandarao Patil',
      status: 'ACTIVE',
    }
    setListings([newL, ...listings])
    setShowModal(false)
    setNewCrop('')
    setNewQty('')
    setNewPrice('')
    setToastMessage(`New crop listing for ${newL.cropName} (${newL.quantityKg} kg @ ₹${newL.pricePerKg}/kg) published to marketplace!`)
    setTimeout(() => setToastMessage(null), 5000)
  }

  return (
    <div className="space-y-8 relative">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-[#0C1A38] border border-emerald-500/40 text-emerald-200 shadow-2xl flex items-center gap-3 text-xs font-mono animate-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white ml-2">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-mono font-bold">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>FARM-TO-MARKET TRADING HUB</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            Crop Selling & Mandi Price Benchmarks
          </h1>
          <p className="text-xs sm:text-sm font-sans text-blue-200/70">
            List harvested crops directly to verified bulk buyers with live APMC benchmark prices
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-orange-950/50 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>List Harvest for Sale</span>
        </button>
      </div>

      {/* APMC Mandi Rate Ticker Strip */}
      <div className="p-4 rounded-2xl bg-[#0B152E]/90 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono overflow-x-auto">
        <span className="text-orange-400 font-bold shrink-0">Live APMC Mandi Rates:</span>
        <div className="flex items-center gap-6 text-blue-100 min-w-max">
          <span>Pomegranate: <strong className="text-emerald-400">₹125 - ₹145/kg</strong> (Pune APMC)</span>
          <span>Soybean: <strong className="text-emerald-400">₹5,200/quintal</strong> (Baramati APMC)</span>
          <span>Onion: <strong className="text-emerald-400">₹2,400/quintal</strong> (Lasalgaon APMC)</span>
        </div>
      </div>

      {/* Marketplace Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {listings.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-[#0B152E]/90 border border-white/10 hover:border-orange-500/40 p-6 backdrop-blur-xl shadow-xl transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                {item.organicCertified ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    Certified Organic
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-blue-200 border border-white/10 text-[10px] font-mono font-bold">
                    Clean Conventional
                  </span>
                )}
                <span className="text-emerald-400 font-mono text-xs font-bold">{item.status}</span>
              </div>

              <div>
                <h3 className="font-sans font-bold text-lg text-white">{item.cropName}</h3>
                <span className="text-xs font-mono text-blue-300/70">{item.variety}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-blue-200/60">Available Lot:</span>
                  <span className="text-white font-bold">{item.quantityKg.toLocaleString()} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200/60">Min Order Lot:</span>
                  <span className="text-blue-200">{item.minOrderKg} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200/60">Mandi Benchmark:</span>
                  <span className="text-orange-300">{item.mandiRefPrice}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="font-display font-black text-2xl text-white">₹{item.pricePerKg}</span>
                <span className="text-xs font-mono text-blue-300/60"> / kg</span>
              </div>

              <button
                onClick={() => setCheckoutItem({
                  id: `ord_${item.id}`,
                  listingId: item.id,
                  cropName: item.cropName,
                  amount: item.pricePerKg * item.minOrderKg,
                  quantityKg: item.minOrderKg,
                })}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs transition-all active:scale-95 shadow-md shadow-emerald-500/20"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Buy Lot (₹{(item.pricePerKg * item.minOrderKg).toLocaleString()})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Listing Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl bg-[#0F1C3F] border border-white/10 p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-display font-bold text-lg text-white">List Produce for Sale</h3>
              <button onClick={() => setShowModal(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-blue-200 block">Crop Name & Variety *</label>
                <input
                  type="text"
                  required
                  value={newCrop}
                  onChange={(e) => setNewCrop(e.target.value)}
                  placeholder="e.g. Organic Pomegranate (Bhagwa)"
                  className="w-full px-3 py-2 rounded-xl bg-[#0B152E] border border-white/10 text-white text-sm focus:border-orange-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-blue-200 block">Quantity (Kg) *</label>
                  <input
                    type="number"
                    min="10"
                    required
                    value={newQty}
                    onChange={(e) => setNewQty(e.target.value)}
                    placeholder="e.g. 1000"
                    className="w-full px-3 py-2 rounded-xl bg-[#0B152E] border border-white/10 text-white text-sm focus:border-orange-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-blue-200 block">Expected Price (₹/Kg) *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="e.g. 65"
                    className="w-full px-3 py-2 rounded-xl bg-[#0B152E] border border-white/10 text-white text-sm focus:border-orange-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="organicCheck"
                  checked={isOrganic}
                  onChange={(e) => setIsOrganic(e.target.checked)}
                  className="rounded border-white/20 text-emerald-500 focus:ring-0"
                />
                <label htmlFor="organicCheck" className="text-blue-100 font-sans cursor-pointer">
                  Certified Organic produce (Qualifies for premium buyer matching)
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
                  className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-xs font-sans font-bold uppercase tracking-wider"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Razorpay Checkout Modal */}
      {checkoutItem && (
        <RazorpayCheckoutModal
          isOpen={!!checkoutItem}
          onClose={() => setCheckoutItem(null)}
          orderId={checkoutItem.id}
          orderType="MARKETPLACE_ORDER"
          title="Crop Produce Lot Purchase"
          description={`${checkoutItem.cropName} (${checkoutItem.quantityKg} kg)`}
          displayAmount={checkoutItem.amount}
          onSuccess={(res) => {
            setToastMessage(`Order Placed Successfully! Payment confirmed for ${checkoutItem.cropName} (${checkoutItem.quantityKg} kg).`);
            setCheckoutItem(null);
            setTimeout(() => setToastMessage(null), 5000);
          }}
        />
      )}

    </div>
  )
}
