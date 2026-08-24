'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, Globe, Sparkles, Check, X, Eye, EyeOff } from 'lucide-react'
import { useLanguage, Language } from '@/lib/languageContext'
import { useSettings } from '@/lib/settingsContext'

export function SettingsMenu({ className = '' }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const { hero3DEnabled, toggleHero3D, setHero3DEnabled } = useSettings()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const languageOptions: { code: Language; label: string; sub: string }[] = [
    { code: 'en', label: 'English', sub: 'Default' },
    { code: 'hi', label: 'हिन्दी', sub: 'Hindi' },
    { code: 'mr', label: 'मराठी', sub: 'Marathi' },
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
        title="Settings & Language"
      >
        <Settings className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-90 text-nexora-orange-400' : 'group-hover:rotate-45'}`} />
        <span className="hidden sm:inline">Settings</span>
      </button>

      {/* Popover Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute right-0 mt-2.5 w-72 sm:w-80 rounded-2xl bg-[#091432]/95 border border-white/15 shadow-2xl backdrop-blur-2xl p-4 z-50 space-y-4 text-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-nexora-orange-400" />
                <span className="font-display font-bold text-xs uppercase tracking-wider text-white">
                  Preferences & Display
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Section 1: Hero 3D Background Entity Toggle */}
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

            {/* Section 2: Language Selection */}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
