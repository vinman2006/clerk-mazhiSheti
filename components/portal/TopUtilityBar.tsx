'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Globe, ChevronDown } from 'lucide-react'

export function TopUtilityBar() {
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'small'>('normal')
  const [language, setLanguage] = useState('English')

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (fontSizeLevel === 'large') {
        document.documentElement.style.fontSize = '18px'
      } else if (fontSizeLevel === 'small') {
        document.documentElement.style.fontSize = '14px'
      } else {
        document.documentElement.style.fontSize = '16px'
      }
    }
  }, [fontSizeLevel])

  return (
    <div className="bg-[#0D0D0D] text-white text-[11px] font-sans h-8 px-4 sm:px-8 flex items-center justify-between border-b border-neutral-800 select-none z-50">
      {/* Left content */}
      <div className="flex items-center gap-3 text-neutral-300">
        <span className="font-semibold text-white">Nexora Sovereign Health</span>
        <span className="text-neutral-500">|</span>
        <Link href="/" className="hover:text-portal-orange transition-colors">
          nexora.io
        </Link>
      </div>

      {/* Right content: Accessibility & Language */}
      <div className="flex items-center gap-4 text-neutral-300">
        <a href="#main-content" className="hidden sm:inline hover:text-white transition-colors text-neutral-400">
          Skip to Main Content
        </a>

        {/* Font Scaling */}
        <div className="flex items-center gap-1.5 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800 font-mono text-[10px]">
          <button 
            type="button"
            onClick={() => setFontSizeLevel('large')}
            className={`px-1 rounded hover:text-white transition-all ${fontSizeLevel === 'large' ? 'text-portal-orange font-bold bg-neutral-800' : 'text-neutral-400'}`}
            title="Increase Font Size (18px)"
          >
            A+
          </button>
          <button 
            type="button"
            onClick={() => setFontSizeLevel('normal')}
            className={`px-1 rounded hover:text-white transition-all ${fontSizeLevel === 'normal' ? 'text-white font-bold bg-neutral-800' : 'text-neutral-400'}`}
            title="Default Font Size (16px)"
          >
            A
          </button>
          <button 
            type="button"
            onClick={() => setFontSizeLevel('small')}
            className={`px-1 rounded hover:text-white transition-all ${fontSizeLevel === 'small' ? 'text-portal-orange font-bold bg-neutral-800' : 'text-neutral-400'}`}
            title="Decrease Font Size (14px)"
          >
            A-
          </button>
        </div>

        {/* Language selector */}
        <div className="relative group">
          <div className="flex items-center gap-1 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800 cursor-pointer text-neutral-300 hover:text-white text-[10px]">
            <Globe className="w-3 h-3 text-portal-orange" />
            <span>{language}</span>
            <ChevronDown className="w-3 h-3 text-neutral-500" />
          </div>
          
          <div className="absolute right-0 top-full mt-1 w-32 bg-[#141826] border border-neutral-700 rounded shadow-xl py-1 hidden group-hover:block z-50 text-[11px]">
            {['English', 'मराठी (Marathi)', 'हिंदी (Hindi)'].map((lang) => (
              <button
                type="button"
                key={lang}
                onClick={() => setLanguage(lang.split(' ')[0])}
                className="w-full text-left px-3 py-1 hover:bg-[#1E3A8A] hover:text-white text-neutral-200 transition-colors block text-xs"
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
