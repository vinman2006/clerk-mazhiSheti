'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Sprout, 
  Landmark, 
  Tractor, 
  Microscope, 
  ShieldAlert, 
  ArrowRight, 
  CheckCircle2,
  Lock
} from 'lucide-react'
import { MazhiShetiLogo } from '@/components/ui/MazhiShetiLogo'
import { useUser, UserButton } from '@clerk/nextjs'
import dynamic from 'next/dynamic'

const DotGrid = dynamic(() => import('@/components/ui/DotGrid'), { ssr: false })

export default function AuthSelectPage() {
  const { user, isSignedIn } = useUser()
  const roles = [
    {
      id: 'farmer',
      title: 'Farmer / शेतकरी',
      subtitle: 'Individual Cultivator & Farm Owner',
      description: 'Access your fields, real-time soil health, automated irrigation, equipment bookings, and transition plans.',
      icon: Sprout,
      color: 'from-emerald-500/20 to-emerald-700/10',
      borderColor: 'border-emerald-500/40 hover:border-emerald-400',
      badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      badge: 'Primary Account',
      href: '/auth/farmer',
      ctaText: 'Continue as Farmer',
    },
    {
      id: 'bank',
      title: 'Bank & Financial Institution',
      subtitle: 'Credit Officers & Branch Managers',
      description: 'Review Kisan Credit Card & agricultural loan requests, inspect consent-verified farm ownership, and track disbursements.',
      icon: Landmark,
      color: 'from-blue-600/20 to-indigo-900/10',
      borderColor: 'border-blue-500/40 hover:border-blue-400',
      badgeColor: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
      badge: 'Institutional Portal',
      href: '/auth/bank',
      ctaText: 'Institutional Sign In',
    },
    {
      id: 'provider',
      title: 'Machinery & Equipment Provider',
      subtitle: 'Tractor Fleet Owners & Agritech Services',
      description: 'Manage tractors, harvesters, seeders, set hourly/daily rental rates, and receive verified farmer bookings.',
      icon: Tractor,
      color: 'from-orange-500/20 to-amber-700/10',
      borderColor: 'border-orange-500/40 hover:border-orange-400',
      badgeColor: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
      badge: 'Business Fleet',
      href: '/auth/provider',
      ctaText: 'Provider Sign In',
    },
    {
      id: 'expert',
      title: 'Agronomist & Agriculture Expert',
      subtitle: 'Soil Scientists & Crop Consultants',
      description: 'Provide verified soil test interpretations, pest advisory, and biological organic transition roadmaps.',
      icon: Microscope,
      color: 'from-purple-500/20 to-indigo-900/10',
      borderColor: 'border-purple-500/40 hover:border-purple-400',
      badgeColor: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
      badge: 'Certified Advisory',
      href: '/auth/expert',
      ctaText: 'Expert Sign In',
    },
    {
      id: 'admin',
      title: 'Platform Administration',
      subtitle: 'Security, Compliance & Registry',
      description: 'Manage platform users, verify banking institutions, inspect system audit logs, and monitor IoT device gateways.',
      icon: ShieldAlert,
      color: 'from-red-500/20 to-zinc-900/10',
      borderColor: 'border-red-500/40 hover:border-red-400',
      badgeColor: 'bg-red-500/15 text-red-400 border-red-500/30',
      badge: 'Restricted Access',
      href: '/auth/admin',
      ctaText: 'Admin Gateway',
    },
  ]

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-slate-100 flex flex-col relative overflow-hidden selection:bg-orange-500/25 selection:text-orange-400">
      {/* Background DotGrid */}
      <div className="absolute inset-0 z-0 opacity-90">
        <DotGrid 
          dotSize={3.5}
          gap={24}
          baseColor="#2A4880"
          activeColor="#F5820D"
          proximity={180}
          shockRadius={320}
          shockStrength={10}
          returnDuration={1.2}
        />
      </div>

      {/* Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-600/15 via-blue-500/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 py-6 px-6 sm:px-12 border-b border-white/10 bg-[#0B1736]/70 backdrop-blur-xl flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <MazhiShetiLogo size={36} showText={true} showBadge={false} subtitle="SOVEREIGN AGRI PLATFORM" />
        </Link>

        <div className="flex items-center gap-3 text-xs font-mono text-blue-200">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Clerk Identity Protected
          </span>
          <Link
            href="/"
            className="px-3.5 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white transition-all text-xs font-sans font-semibold"
          >
            ← Back to Home
          </Link>
          {isSignedIn && <UserButton />}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-12 flex flex-col justify-center space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-mono font-bold tracking-wide">
            ENTERPRISE IDENTITY SYSTEM
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-white">
            Choose Your Gateway
          </h1>
          <p className="font-sans text-sm sm:text-base text-blue-100/80 leading-relaxed">
            Mazhi Sheti provides tailored authentication environments for farmers, financial partners, equipment providers, and agricultural experts.
          </p>
        </div>

        {/* Active Clerk Session Banner */}
        {isSignedIn && user && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-blue-500/10 to-transparent border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-xl shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400">
                {user.firstName ? user.firstName[0] : 'U'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-400">ACTIVE CLERK SESSION</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-sm font-sans text-white font-medium">
                  Authenticated as <span className="font-bold text-emerald-300">{user.fullName || user.firstName}</span> ({user.primaryEmailAddress?.emailAddress})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/farmer/dashboard"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5"
              >
                <span>Launch Farmer OS →</span>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role, idx) => {
            const Icon = role.icon
            return (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className={`group relative rounded-2xl bg-[#0B152E]/80 border ${role.borderColor} p-6 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 hover:-translate-y-1`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${role.badgeColor}`}>
                      {role.badge}
                    </span>
                  </div>

                  <div>
                    <h2 className="font-display font-bold text-lg text-white group-hover:text-orange-400 transition-colors">
                      {role.title}
                    </h2>
                    <p className="text-xs font-mono text-blue-300/80 mt-0.5">
                      {role.subtitle}
                    </p>
                  </div>

                  <p className="text-xs font-sans text-blue-100/70 leading-relaxed">
                    {role.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <Link
                    href={role.href}
                    className="w-full py-2.5 rounded-xl bg-white/[0.06] hover:bg-orange-500 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 border border-white/10 group-hover:border-orange-400 group-hover:shadow-lg group-hover:shadow-orange-950/50"
                  >
                    <span>{role.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href={
                      role.id === 'farmer' ? '/farmer/dashboard' :
                      role.id === 'bank' ? '/bank/dashboard' :
                      role.id === 'provider' ? '/provider/dashboard' :
                      role.id === 'expert' ? '/expert/dashboard' : '/admin/dashboard'
                    }
                    className="w-full py-1.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.08] text-blue-200/60 hover:text-white text-[11px] font-mono font-medium transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Instant Pitch Demo</span>
                    <span>→</span>
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Security Trust Footnote */}
        <div className="pt-4 text-center text-xs font-mono text-blue-200/60 flex items-center justify-center gap-2">
          <Lock className="w-3.5 h-3.5 text-orange-400" />
          <span>Role-based access control with audited tenant isolation & data ownership boundaries</span>
        </div>
      </main>
    </div>
  )
}
