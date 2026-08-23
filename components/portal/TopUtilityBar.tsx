'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Globe, ChevronDown, Accessibility } from 'lucide-react'

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
    <div className="bg-[#0A192F] text-white text-[11px] font-sans h-8 px-4 sm:px-8 flex items-center justify-between border-b border-[#1E293B] select-none z-50">
      {/* Left content: Official Indian Gov identification */}
      <div className="flex items-center gap-3 text-neutral-300">
        <span className="font-semibold text-white tracking-wide flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#F5821F]"></span>
          Government of India | भारत सरकार
        </span>
        <span className="text-neutral-500 hidden sm:inline">|</span>
        <span className="text-neutral-400 hidden sm:inline">
          Ministry of Health & Family Welfare
        </span>
      </div>

      {/* Right content: Accessibility & Language */}
      <div className="flex items-center gap-4 text-neutral-300">
        <a href="#main-content" className="hidden md:inline hover:text-white transition-colors text-neutral-400 text-[10px]">
          Skip to Main Content
        </a>

        {/* Font Scaling */}
        <div className="flex items-center gap-1 bg-[#112240] px-1.5 py-0.5 rounded border border-[#233554] font-sans text-[10px]">
          <button 
            type="button"
            onClick={() => setFontSizeLevel('large')}
            className={`px-1.5 py-0.5 rounded hover:text-white transition-all ${fontSizeLevel === 'large' ? 'text-[#F5821F] font-bold bg-[#0A192F]' : 'text-neutral-300'}`}
            title="Increase Font Size (A+)"
          >
            A+
          </button>
          <button 
            type="button"
            onClick={() => setFontSizeLevel('normal')}
            className={`px-1.5 py-0.5 rounded hover:text-white transition-all ${fontSizeLevel === 'normal' ? 'text-white font-bold bg-[#0A192F]' : 'text-neutral-300'}`}
            title="Default Font Size (A)"
          >
            A
          </button>
          <button 
            type="button"
            onClick={() => setFontSizeLevel('small')}
            className={`px-1.5 py-0.5 rounded hover:text-white transition-all ${fontSizeLevel === 'small' ? 'text-[#F5821F] font-bold bg-[#0A192F]' : 'text-neutral-300'}`}
            title="Decrease Font Size (A-)"
          >
            A-
          </button>
        </div>

        {/* Language selector */}
        <div className="relative group">
          <div className="flex items-center gap-1.5 bg-[#112240] px-2 py-0.5 rounded border border-[#233554] cursor-pointer text-neutral-200 hover:text-white text-[11px]">
            <Globe className="w-3 h-3 text-[#F5821F]" />
            <span>{language}</span>
            <ChevronDown className="w-3 h-3 text-neutral-400" />
          </div>
          
          <div className="absolute right-0 top-full mt-1 w-36 bg-[#FFFFFF] text-[#1A1A1A] border border-[#E0E0E0] rounded shadow-lg py-1 hidden group-hover:block z-50 text-[11px]">
            {['English', 'मराठी (Marathi)', 'हिंदी (Hindi)'].map((lang) => (
              <button
                type="button"
                key={lang}
                onClick={() => setLanguage(lang.split(' ')[0])}
                className="w-full text-left px-3 py-1.5 hover:bg-[#EAF1FB] hover:text-[#0B3D91] text-[#1A1A1A] font-medium transition-colors block text-xs"
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

