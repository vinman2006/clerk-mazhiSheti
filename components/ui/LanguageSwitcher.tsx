'use client'

import React from 'react'
import { Globe } from 'lucide-react'
import { useLanguage, Language } from '@/lib/languageContext'

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage } = useLanguage()

  const languages: { code: Language; label: string; short: string }[] = [
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'hi', label: 'हिन्दी', short: 'HI' },
    { code: 'mr', label: 'मराठी', short: 'MR' },
  ]

  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md">
      <div className="pl-1.5 pr-0.5 text-neutral-400">
        <Globe className="w-3.5 h-3.5" />
      </div>
      <div className="flex items-center gap-0.5">
        {languages.map((lang) => {
          const isActive = language === lang.code
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLanguage(lang.code)}
              title={lang.label}
              className={`px-2.5 py-1 rounded-full text-[11px] font-sans transition-all duration-200 ${
                isActive
                  ? 'bg-orange-500 text-white font-bold shadow-md shadow-orange-950/40'
                  : 'text-neutral-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {compact ? lang.short : lang.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
