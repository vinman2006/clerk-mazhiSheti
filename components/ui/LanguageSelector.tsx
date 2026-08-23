'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { useLanguage, Language } from '@/lib/languageContext'

export function LanguageSelector({ className = '' }: { className?: string }) {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const options: { code: Language; label: string; script: string }[] = [
    { code: 'en', label: 'English', script: 'EN' },
    { code: 'hi', label: 'हिन्दी', script: 'Hindi' },
    { code: 'mr', label: 'मराठी', script: 'Marathi' }
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

  const currentOption = options.find(o => o.code === language) || options[0]

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F172A]/80 hover:bg-[#1E293B] border border-white/15 text-xs font-mono font-bold text-white transition-all shadow-sm hover:border-nexora-orange-500/50"
      >
        <Globe className="w-3.5 h-3.5 text-nexora-orange-400" />
        <span>{currentOption.label}</span>
        <ChevronDown className={`w-3 h-3 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 p-1.5 rounded-xl bg-[#0F172A] border border-white/15 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150">
          {options.map((opt) => {
            const isSelected = opt.code === language
            return (
              <button
                key={opt.code}
                type="button"
                onClick={() => {
                  setLanguage(opt.code)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-sans font-bold flex items-center justify-between transition-all ${
                  isSelected
                    ? 'bg-nexora-orange-500 text-black shadow-sm'
                    : 'text-neutral-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
