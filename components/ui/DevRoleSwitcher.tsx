'use client'

import React, { useState } from 'react'
import { useAuth } from '@/lib/authContext'
import { UserCheck, Shield, Building2, Landmark, Microscope, Sparkles, ChevronDown } from 'lucide-react'
import { UserProfile } from '@/lib/mockData'
import Link from 'next/link'

export function DevRoleSwitcher() {
  const { user, setRole } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const roles: { role: UserProfile['role']; label: string; desc: string; icon: React.ElementType; link: string }[] = [
    {
      role: 'patient',
      label: 'Patient (Elena / Demo)',
      desc: 'Find care, consent, agent chat, audit trail',
      icon: UserCheck,
      link: '/dashboard'
    },
    {
      role: 'hospital_admin',
      label: 'Dr. Tushar Pamnani (Demo Doctor)',
      desc: 'Live patient queue, call next, complete token',
      icon: Building2,
      link: '/hospital-portal/doctor-demo-tushar'
    },
    {
      role: 'hospital_admin',
      label: 'Hospital Admin (Dr. Vance)',
      desc: 'Local AI training, node controls, federated learning',
      icon: Building2,
      link: '/hospital-portal/ai-training'
    },
    {
      role: 'government_official',
      label: 'Gov Official (Sophia Chen)',
      desc: 'Scheme management, ZK eligibility queue',
      icon: Landmark,
      link: '/gov-portal'
    },
    {
      role: 'researcher',
      label: 'Researcher (Dr. Patel)',
      desc: 'Anonymized dataset queries, ZK research access',
      icon: Microscope,
      link: '/research'
    }
  ]

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-md bg-[#101420] border-2 border-portal-orange text-white text-xs font-mono shadow-xl hover:bg-[#152A63] transition-all group backdrop-blur-md"
        >
          <div className="w-2 h-2 rounded-full bg-portal-green"></div>
          <span className="text-neutral-400">Demo Role:</span>
          <span className="text-portal-orange font-bold capitalize">{user.role.replace('_', ' ')}</span>
          <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 bottom-full mb-2 w-80 p-3.5 bg-[#101420] border-2 border-[#1E3A8A] rounded-xl shadow-2xl backdrop-blur-xl text-xs space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-700">
              <span className="font-mono text-[11px] text-neutral-300 font-bold uppercase tracking-wider">
                Simulated Persona Switcher
              </span>
              <span className="px-2 py-0.5 rounded bg-portal-orange text-white text-[10px] font-mono font-bold">
                Dev Tool
              </span>
            </div>

            <div className="space-y-2">
              {roles.map((item) => {
                const Icon = item.icon
                const isActive = user.role === item.role
                return (
                  <button
                    key={item.role}
                    onClick={() => {
                      setRole(item.role)
                      setIsOpen(false)
                    }}
                    className={`w-full text-left p-3 rounded-lg border transition-all flex items-start gap-2.5 ${
                      isActive 
                        ? 'bg-[#1a233a] border-l-4 border-l-portal-orange border-neutral-600 text-white shadow-md' 
                        : 'bg-[#141826] border-neutral-700/80 hover:border-neutral-600 hover:bg-[#182033] text-neutral-300'
                    }`}
                  >
                    <div className={`p-1.5 rounded-md mt-0.5 ${isActive ? 'bg-portal-orange/20 text-portal-orange' : 'bg-[#101420] text-neutral-400'}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-sans font-bold text-xs text-white">{item.label}</span>
                        {isActive && <span className="text-[10px] font-mono font-bold text-portal-green">ACTIVE ✓</span>}
                      </div>
                      <p className="text-[11px] text-neutral-400 font-sans mt-0.5 leading-tight">{item.desc}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <Link 
                          href={item.link} 
                          onClick={(e) => { e.stopPropagation(); setRole(item.role); setIsOpen(false) }}
                          className="text-[10px] font-mono font-bold text-portal-orange hover:underline"
                        >
                          Go to view →
                        </Link>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
