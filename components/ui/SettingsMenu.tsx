'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Settings,
  Globe,
  Sparkles,
  Check,
  X,
  UserCheck,
  Building2,
  Landmark,
  Microscope,
  Stethoscope,
  ChevronRight,
  Shield,
  Layers,
} from 'lucide-react'
import { useLanguage, Language } from '@/lib/languageContext'
import { useSettings } from '@/lib/settingsContext'
import { useAuth } from '@/lib/authContext'
import { UserProfile } from '@/lib/mockData'

export function SettingsMenu({ className = '' }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'personas' | 'display'>('personas')
  const { language, setLanguage, t } = useLanguage()
  const { hero3DEnabled, toggleHero3D } = useSettings()
  const { user, setRole } = useAuth()
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const languageOptions: { code: Language; label: string; sub: string }[] = [
    { code: 'en', label: 'English', sub: 'Default' },
    { code: 'hi', label: 'हिन्दी', sub: 'Hindi' },
    { code: 'mr', label: 'मराठी', sub: 'Marathi' },
  ]

  const demoPersonas: {
    id: string
    role: UserProfile['role']
    name: string
    title: string
    desc: string
    icon: React.ElementType
    link: string
    badge: string
    color: string
  }[] = [
    {
      id: 'patient-elena',
      role: 'patient',
      name: 'Elena Rostova',
      title: 'Sovereign Patient',
      desc: 'Find care, consent manager, agent chat, audit trail',
      icon: UserCheck,
      link: '/dashboard',
      badge: 'Patient Enclave',
      color: 'from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/40',
    },
    {
      id: 'doctor-tushar',
      role: 'hospital_admin',
      name: 'Tushar Pamnani',
      title: 'Demo Doctor / Clinic Portal',
      desc: 'Live patient queue, call next, complete token',
      icon: Stethoscope,
      link: '/hospital-portal/doctor-demo-tushar',
      badge: 'Doctor Queue',
      color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/40',
    },
    {
      id: 'admin-vance',
      role: 'hospital_admin',
      name: 'Dr. Marcus Vance',
      title: 'Chief of Informatics',
      desc: 'Local AI training, node controls, federated learning',
      icon: Building2,
      link: '/hospital-portal/ai-training',
      badge: 'Hospital Admin',
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/40',
    },
    {
      id: 'gov-sophia',
      role: 'government_official',
      name: 'Sophia Chen',
      title: 'Dir. National Health Access',
      desc: 'Scheme management, ZK eligibility proof queue',
      icon: Landmark,
      link: '/gov-portal',
      badge: 'Gov Agency',
      color: 'from-purple-500/20 to-violet-500/20 text-purple-400 border-purple-500/40',
    },
    {
      id: 'res-patel',
      role: 'researcher',
      name: 'Dr. Ananya Patel',
      title: 'Lead Epidemiologist',
      desc: 'Anonymized dataset queries, ZK research access',
      icon: Microscope,
      link: '/research',
      badge: 'Researcher',
      color: 'from-teal-500/20 to-emerald-500/20 text-teal-400 border-teal-500/40',
    },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectPersona = (persona: typeof demoPersonas[0]) => {
    setRole(persona.role)
    setIsOpen(false)
    router.push(persona.link)
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Settings Toggle Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`group inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl text-xs font-mono font-bold transition-all duration-200 border shadow-sm ${
          isOpen
            ? 'bg-nexora-orange-500/20 border-nexora-orange-500 text-nexora-orange-400 shadow-orange-950/30'
            : 'bg-[#0F172A]/80 hover:bg-[#1E293B] border-white/15 text-neutral-200 hover:text-white hover:border-nexora-orange-500/40'
        }`}
        aria-label="Settings"
        title="Settings, Demo Roles & Language"
      >
        <Settings className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-90 text-nexora-orange-400' : 'group-hover:rotate-45'}`} />
        <span className="hidden sm:inline">Settings</span>
        {user?.role && (
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" title={`Logged in as: ${user.name}`} />
        )}
      </button>

      {/* Popover Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute right-0 mt-2.5 w-[330px] sm:w-[380px] rounded-2xl bg-[#08122B]/98 border border-white/15 shadow-2xl backdrop-blur-2xl p-4 z-50 space-y-3.5 text-white max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-nexora-orange-500/20 text-nexora-orange-400 border border-nexora-orange-500/30">
                  <Settings className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-display font-black text-xs uppercase tracking-wider text-white block">
                    Settings & Quick Access
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 block">
                    Active: <span className="text-nexora-orange-400 font-bold">{user?.name || 'Guest'}</span>
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Navigation Tabs inside Settings */}
            <div className="flex rounded-xl bg-white/[0.04] p-1 border border-white/10 text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveTab('personas')}
                className={`flex-1 py-1.5 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'personas'
                    ? 'bg-nexora-orange-500 text-black shadow-md'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Demo Roles (1-Click)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('display')}
                className={`flex-1 py-1.5 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'display'
                    ? 'bg-nexora-orange-500 text-black shadow-md'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Display & Language</span>
              </button>
            </div>

            {/* TAB 1: DEMO PERSONA 1-CLICK LOGIN SWITCHER */}
            {activeTab === 'personas' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 px-1">
                  <span>Switch identity & open dashboard:</span>
                  <span className="text-emerald-400 font-bold">Zero Setup Required</span>
                </div>

                <div className="space-y-1.5">
                  {demoPersonas.map((persona) => {
                    const Icon = persona.icon
                    const isCurrent = user?.name?.includes(persona.name) || user?.role === persona.role

                    return (
                      <button
                        key={persona.id}
                        type="button"
                        onClick={() => handleSelectPersona(persona)}
                        className={`w-full text-left p-2.5 sm:p-3 rounded-xl border transition-all flex items-start gap-3 group relative overflow-hidden ${
                          isCurrent
                            ? 'bg-[#102454] border-nexora-orange-500 shadow-md shadow-orange-950/30'
                            : 'bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.06]'
                        }`}
                      >
                        <div
                          className={`p-2 rounded-xl border shrink-0 bg-gradient-to-br ${persona.color} group-hover:scale-105 transition-transform`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-display font-bold text-xs text-white truncate group-hover:text-nexora-orange-300 transition-colors">
                              {persona.name}
                            </span>
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-white/10 text-neutral-300 shrink-0">
                              {persona.badge}
                            </span>
                          </div>

                          <div className="text-[10px] font-mono text-nexora-orange-400/90 font-medium truncate">
                            {persona.title}
                          </div>

                          <p className="text-[11px] font-sans text-neutral-400 line-clamp-1 mt-0.5">
                            {persona.desc}
                          </p>
                        </div>

                        <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 mt-2" />
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: DISPLAY & LANGUAGE SETTINGS */}
            {activeTab === 'display' && (
              <div className="space-y-3.5 animate-in fade-in duration-150">
                {/* Hero 3D Background Entity Toggle */}
                <div className="space-y-2 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-nexora-orange-400" />
                      <span className="text-xs font-sans font-bold text-white">Hero 3D Animation</span>
                    </div>

                    {/* Switch Toggle */}
                    <button
                      type="button"
                      onClick={toggleHero3D}
                      className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
                        hero3DEnabled ? 'bg-nexora-orange-500' : 'bg-neutral-700'
                      }`}
                      role="switch"
                      aria-checked={hero3DEnabled}
                    >
                      <motion.span
                        className="block w-4 h-4 rounded-full bg-white shadow-md transform"
                        animate={{ x: hero3DEnabled ? 22 : 4 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>

                  <p className="text-[11px] font-sans text-neutral-400 leading-relaxed">
                    {hero3DEnabled
                      ? '3D cryptographic particle mesh active behind dot matrix'
                      : 'Disabled for a minimal, clean dot matrix background'}
                  </p>

                  <div className="pt-1 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-neutral-500">Visual Mode:</span>
                    <span className={`font-bold ${hero3DEnabled ? 'text-nexora-orange-400' : 'text-neutral-400'}`}>
                      {hero3DEnabled ? 'Interactive 3D Active' : 'Clean Dot Matrix Only'}
                    </span>
                  </div>
                </div>

                {/* Language Selection */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-sans font-bold text-neutral-300 px-1">
                    <Globe className="w-3.5 h-3.5 text-blue-400" />
                    <span>Select Language</span>
                  </div>

                  <div className="grid grid-cols-1 gap-1.5">
                    {languageOptions.map((opt) => {
                      const isSelected = opt.code === language
                      return (
                        <button
                          key={opt.code}
                          type="button"
                          onClick={() => setLanguage(opt.code)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-sans font-medium flex items-center justify-between transition-all border ${
                            isSelected
                              ? 'bg-nexora-orange-500/20 border-nexora-orange-500/60 text-white font-bold shadow-sm'
                              : 'bg-white/[0.02] border-white/5 text-neutral-300 hover:text-white hover:bg-white/[0.06]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{opt.label}</span>
                            <span className="text-[10px] font-mono text-neutral-400">({opt.sub})</span>
                          </div>
                          {isSelected && (
                            <div className="w-4 h-4 rounded-full bg-nexora-orange-500 text-black flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
