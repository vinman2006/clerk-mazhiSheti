'use client'

import React from 'react'
import { Globe, X, Check, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/languageContext'

export function LanguagePromptModal() {
  const { language, setLanguage, showPrompt, dismissPrompt } = useLanguage()

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-4 left-3 right-3 sm:left-6 sm:right-auto z-50 max-w-md p-4 sm:p-5 rounded-2xl bg-[#0F172A]/98 border-2 border-nexora-orange-500/80 shadow-2xl backdrop-blur-2xl text-white animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-nexora-orange-500/20 border border-nexora-orange-500/40 text-nexora-orange-400 flex items-center justify-center shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-display font-black text-sm text-white">
              भाषा निवडा / भाषा चुनें (Language)
            </h4>
            <p className="text-xs font-sans text-neutral-300 mt-0.5">
              Switch Nexora interface to Hindi (हिन्दी) or Marathi (मराठी)?
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={dismissPrompt}
          className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-4">
        <button
          type="button"
          onClick={() => setLanguage('hi')}
          className={`py-2 px-3 rounded-xl font-sans font-bold text-xs border transition-all flex items-center justify-center gap-1.5 ${
            language === 'hi'
              ? 'bg-nexora-orange-500 text-black border-nexora-orange-500 shadow-md'
              : 'bg-white/5 hover:bg-white/10 text-white border-white/15'
          }`}
        >
          <span>हिन्दी</span>
        </button>

        <button
          type="button"
          onClick={() => setLanguage('mr')}
          className={`py-2 px-3 rounded-xl font-sans font-bold text-xs border transition-all flex items-center justify-center gap-1.5 ${
            language === 'mr'
              ? 'bg-nexora-orange-500 text-black border-nexora-orange-500 shadow-md'
              : 'bg-white/5 hover:bg-white/10 text-white border-white/15'
          }`}
        >
          <span>मराठी</span>
        </button>

        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`py-2 px-3 rounded-xl font-sans font-bold text-xs border transition-all flex items-center justify-center gap-1.5 ${
            language === 'en'
              ? 'bg-nexora-orange-500 text-black border-nexora-orange-500 shadow-md'
              : 'bg-white/5 hover:bg-white/10 text-white border-white/15'
          }`}
        >
          <span>English</span>
        </button>
      </div>
    </div>
  )
}
