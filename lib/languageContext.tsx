'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'en' | 'hi' | 'mr'

export interface TranslationDictionary {
  [key: string]: {
    en: string
    hi: string
    mr: string
  }
}

export const TRANSLATIONS: TranslationDictionary = {
  // Navigation & Brand
  platform_name: {
    en: 'Mazhi Sheti',
    hi: 'माझी शेती',
    mr: 'माझी शेती'
  },
  nav_farm: {
    en: 'Farm Management',
    hi: 'कृषि प्रबंधन',
    mr: 'शेत व्यवस्थापन'
  },
  nav_crops: {
    en: 'Crops & Soil',
    hi: 'फसल एवं मृदा',
    mr: 'पिके आणि माती'
  },
  nav_mandi: {
    en: 'Mandi Rates',
    hi: 'मंडी भाव',
    mr: 'बाजार भाव'
  },
  nav_weather: {
    en: 'Weather & Irrigation',
    hi: 'मौसम एवं सिंचाई',
    mr: 'हवामान आणि सिंचन'
  },
  nav_schemes: {
    en: 'Government Schemes',
    hi: 'सरकारी योजनाएं',
    mr: 'शासकीय योजना'
  },
  nav_sign_in: {
    en: 'Sign In',
    hi: 'साइन इन',
    mr: 'साइन इन करा'
  },
  lang_prompt_title: {
    en: 'भाषा निवडा / भाषा चुनें (Language)',
    hi: 'भाषा निवडा / भाषा चुनें (Language)',
    mr: 'भाषा निवडा / भाषा चुनें (Language)'
  },
  lang_prompt_desc: {
    en: 'Switch Mazhi Sheti interface to Hindi (हिन्दी) or Marathi (मराठी)?',
    hi: 'क्या आप माझी शेती को हिन्दी या मराठी में देखना चाहते हैं?',
    mr: 'तुम्हाला माझी शेती मराठी किंवा हिंदीमध्ये वापरायचे आहे का?'
  }
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  showPrompt: boolean
  dismissPrompt: () => void
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
  showPrompt: false,
  dismissPrompt: () => {}
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('mazhi_sheti_lang') as Language
    if (saved && (saved === 'en' || saved === 'hi' || saved === 'mr')) {
      setLanguageState(saved)
    } else {
      const hasDismissed = localStorage.getItem('mazhi_sheti_lang_prompt_dismissed')
      if (!hasDismissed) {
        const timer = setTimeout(() => setShowPrompt(true), 1200)
        return () => clearTimeout(timer)
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('mazhi_sheti_lang', lang)
    setShowPrompt(false)
  }

  const dismissPrompt = () => {
    setShowPrompt(false)
    localStorage.setItem('mazhi_sheti_lang_prompt_dismissed', 'true')
  }

  const t = (key: string): string => {
    if (TRANSLATIONS[key] && TRANSLATIONS[key][language]) {
      return TRANSLATIONS[key][language]
    }
    return TRANSLATIONS[key]?.en || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, showPrompt, dismissPrompt }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
