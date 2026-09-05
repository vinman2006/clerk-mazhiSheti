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
  tagline: {
    en: 'SOVEREIGN AGRI PLATFORM',
    hi: 'संप्रभु कृषि मंच',
    mr: 'स्वायत्त कृषी व्यासपीठ'
  },
  nav_overview: {
    en: 'Overview',
    hi: 'अवलोकन',
    mr: 'आढावा'
  },
  nav_crop_advisory: {
    en: 'Crop Advisory',
    hi: 'फसल सलाह',
    mr: 'पीक सल्ला'
  },
  nav_market_rates: {
    en: 'Mandi Rates',
    hi: 'मंडी भाव',
    mr: 'बाजार भाव'
  },
  nav_weather: {
    en: 'Weather & Soil',
    hi: 'मौसम एवं मृदा',
    mr: 'हवामान आणि माती'
  },
  nav_schemes: {
    en: 'Govt Schemes',
    hi: 'सरकारी योजनाएं',
    mr: 'शासकीय योजना'
  },
  nav_role_portals: {
    en: 'Role Portals',
    hi: 'रोल पोर्टल',
    mr: 'भूमिका दालन'
  },
  nav_settings: {
    en: 'Settings',
    hi: 'सेटिंग्स',
    mr: 'सेटिंग्ज'
  },
  nav_sign_in: {
    en: 'SIGN IN',
    hi: 'साइन इन',
    mr: 'लॉग इन'
  },
  nav_register: {
    en: 'REGISTER',
    hi: 'पंजीकरण',
    mr: 'नोंदणी'
  },
  nav_farm_os: {
    en: 'Farm OS',
    hi: 'फार्म ओएस',
    mr: 'शेत ओएस'
  },

  // Hero Section
  hero_badge: {
    en: 'SOVEREIGN AGRI INTELLIGENCE',
    hi: 'संप्रभु कृषि बुद्धिमत्ता',
    mr: 'स्वायत्त कृषी बुद्धिमत्ता'
  },
  hero_title_1: {
    en: 'Decentralized',
    hi: 'विकेंद्रीकृत',
    mr: 'विकेंद्रीकृत'
  },
  hero_title_2: {
    en: 'Agronomic Intelligence',
    hi: 'कृषि बुद्धिमत्ता',
    mr: 'कृषी बुद्धिमत्ता'
  },
  hero_subtitle: {
    en: 'Empowering Indian cultivators with direct IoT irrigation control, tamper-evident soil health records, APMC mandi rates, and zero-intermediary machinery hiring.',
    hi: 'भारतीय किसानों को प्रत्यक्ष IoT सिंचाई नियंत्रण, मिट्टी स्वास्थ्य रिकॉर्ड, मंडी भाव और बिना बिचौलियों के कृषि उपकरण उपलब्ध कराना।',
    mr: 'भारतीय शेतकऱ्यांना थेट IoT सिंचन नियंत्रण, माती आरोग्य नोंदी, बाजार भाव आणि मध्यस्थांशिवाय कृषी यंत्रसामग्री भाडेतत्त्वावर उपलब्ध करून देणे.'
  },
  hero_cta_farmer: {
    en: 'Launch Farmer Portal',
    hi: 'किसान पोर्टल खोलें',
    mr: 'शेतकरी पोर्टल उघडा'
  },
  hero_cta_rent: {
    en: 'Rent Equipment (Tractor)',
    hi: 'उपकरण किराए पर लें (ट्रैक्टर)',
    mr: 'यंत्रसामग्री भाड्याने घ्या (ट्रॅक्टर)'
  },

  // Portals
  role_farmer_title: {
    en: 'Farmer Portal',
    hi: 'किसान पोर्टल',
    mr: 'शेतकरी पोर्टल'
  },
  role_farmer_desc: {
    en: 'Mobile authentication, real-time soil telemetry, micro-irrigation controls, 6-stage organic transition, and APMC mandi benchmarks.',
    hi: 'मोबाइल प्रमाणीकरण, रीयल-टाइम मृदा टेलीमेट्री, सूक्ष्म सिंचाई नियंत्रण, 6-चरणीय जैविक परिवर्तन और मंडी भाव।',
    mr: 'मोबाइल प्रमाणीकरण, रिअल-टाइम माती टेलीमेट्री, सूक्ष्म सिंचन नियंत्रण, ६-टप्प्यांचे सेंद्रिय परिवर्तन आणि बाजार भाव.'
  },
  role_bank_title: {
    en: 'Bank & Financial Portal',
    hi: 'बैंक एवं वित्तीय पोर्टल',
    mr: 'बँक व वित्तीय पोर्टल'
  },
  role_bank_desc: {
    en: 'Review Kisan Credit Card (KCC) applications, inspect consent-verified farm land records, and monitor loan disbursements.',
    hi: 'किसान क्रेडिट कार्ड (KCC) आवेदनों की समीक्षा, सहमति-सत्यापित भूमि रिकॉर्ड और ऋण वितरण की निगरानी।',
    mr: 'किसान क्रेडिट कार्ड (KCC) अर्जांचे पुनरावलोकन, संमती-सत्यापित शेतजमीन नोंदी आणि कर्ज वितरणाचे निरीक्षण.'
  },
  role_provider_title: {
    en: 'Machinery Fleet Provider',
    hi: 'कृषि मशीनरी फ्लीट प्रदाता',
    mr: 'यंत्रसामग्री फ्लीट पुरवठादार'
  },
  role_provider_desc: {
    en: 'Manage tractors, rotavators, and laser levelers. Set hourly and acreage rates, dispatch equipment, and manage farmer bookings.',
    hi: 'ट्रैक्टर, रोटावेटर और लेजर लेवलर प्रबंधित करें। प्रति घंटा दर निर्धारित करें और किसानों की बुकिंग प्रबंधित करें।',
    mr: 'ट्रॅक्टर, रोटाव्हेटर आणि लेझर लेव्हलर व्यवस्थापित करा. तासाचे दर ठरवा आणि शेतकऱ्यांचे बुकिंग सांभाळा.'
  },
  role_expert_title: {
    en: 'Agronomist & Expert Network',
    hi: 'कृषि विशेषज्ञ नेटवर्क',
    mr: 'कृषी तज्ञ नेटवर्क'
  },
  role_expert_desc: {
    en: 'Provide certified soil test interpretations, pest diagnostic guidance, and scientifically backed biological transition roadmaps.',
    hi: 'प्रमाणित मृदा परीक्षण विश्लेषण, कीट निदान मार्गदर्शन और वैज्ञानिक जैविक परिवर्तन रोडमैप प्रदान करें।',
    mr: 'प्रमाणित माती चाचणी विश्लेषण, कीड निदान मार्गदर्शन आणि शास्त्रीय सेंद्रिय संक्रमण आराखडे प्रदान करा.'
  },
  role_admin_title: {
    en: 'Platform Governance & Admin',
    hi: 'प्लेटफॉर्म गवर्नेंस एवं एडमिन',
    mr: 'प्लॅटफॉर्म प्रशासन कक्ष'
  },
  role_admin_desc: {
    en: 'Audit log inspection, institutional partner verifications, LoRaWAN IoT gateway monitoring, and user registry administration.',
    hi: 'ऑडिट लॉग निरीक्षण, संस्थागत भागीदार सत्यापन, IoT गेटवे निगरानी और उपयोगकर्ता रजिस्ट्री प्रशासन।',
    mr: 'ऑडिट लॉग तपासणी, संस्थात्मक भागीदार पडताळणी, IoT गेटवे मॉनिटरिंग आणि युझर नोंदणी प्रशासन.'
  },

  // Farmer Portal Nav & Pages
  farmer_command_center: {
    en: 'Command Center',
    hi: 'कमांड सेंटर',
    mr: 'नियंत्रण केंद्र'
  },
  farmer_my_fields: {
    en: 'My Fields',
    hi: 'मेरे खेत',
    mr: 'माझी शेती'
  },
  farmer_soil_health: {
    en: 'Soil Health',
    hi: 'मिट्टी स्वास्थ्य',
    mr: 'माती आरोग्य'
  },
  farmer_irrigation: {
    en: 'Auto Irrigation',
    hi: 'स्वचालित सिंचाई',
    mr: 'स्वयंचलित सिंचन'
  },
  farmer_organic: {
    en: 'Organic Journey',
    hi: 'जैविक यात्रा',
    mr: 'सेंद्रिय प्रवास'
  },
  farmer_tractor_rental: {
    en: 'Tractor Rental',
    hi: 'ट्रैक्टर किराया',
    mr: 'ट्रॅक्टर भाडे'
  },
  farmer_crop_market: {
    en: 'Crop Market',
    hi: 'फसल मंडी',
    mr: 'पीक बाजार'
  },
  farmer_finance: {
    en: 'Finance & Loans',
    hi: 'वित्त एवं ऋण',
    mr: 'वित्त व कर्जे'
  },
  farmer_ai_assistant: {
    en: 'AI Assistant',
    hi: 'एआई सहायक',
    mr: 'एआय सहाय्यक'
  },

  // Equipment & Razorpay
  equipment_available: {
    en: 'Available Tractors & Machinery',
    hi: 'उपलब्ध ट्रैक्टर एवं मशीनरी',
    mr: 'उपलब्ध ट्रॅक्टर आणि यंत्रसामग्री'
  },
  equipment_booking_panel: {
    en: 'Rental Booking Panel',
    hi: 'किराया बुकिंग पैनल',
    mr: 'भाडे बुकिंग पॅनेल'
  },
  equipment_pay_button: {
    en: 'Pay with Razorpay',
    hi: 'रेज़रपे से भुगतान करें',
    mr: 'रेझरपे द्वारे पैसे भरा'
  },
  equipment_booking_confirmed: {
    en: 'Booking Confirmed',
    hi: 'बुकिंग कन्फर्म हुई',
    mr: 'बुकिंग निश्चित झाली'
  },

  // Settings
  settings_title: {
    en: 'Platform Settings',
    hi: 'प्लेटफॉर्म सेटिंग्स',
    mr: 'प्लॅटफॉर्म सेटिंग्ज'
  },
  settings_lang_label: {
    en: 'Platform Regional Language (भाषा)',
    hi: 'प्लेटफॉर्म क्षेत्रीय भाषा (Language)',
    mr: 'प्लॅटफॉर्म प्रादेशिक भाषा (Language)'
  },
  settings_lang_sub: {
    en: 'Choose between English, हिन्दी, or मराठी across the entire platform',
    hi: 'संपूर्ण प्लेटफॉर्म के लिए अंग्रेजी, हिन्दी या मराठी चुनें',
    mr: 'संपूर्ण प्लॅटफॉर्मसाठी इंग्रजी, हिन्दी किंवा मराठी निवडा'
  },
  settings_theme_label: {
    en: 'Dot-Matrix Canvas Theme',
    hi: 'डॉट-मैट्रिक्स कैनवास थीम',
    mr: 'डॉट-मॅट्रिक्स कॅनव्हास थीम'
  },
  settings_audio_label: {
    en: 'Soil Moisture Audio Warning Chimes',
    hi: 'मृदा नमी ऑडियो चेतावनी',
    mr: 'माती ओलावा ऑडिओ चेतावणी'
  },
  settings_done: {
    en: 'Done',
    hi: 'पूर्ण',
    mr: 'झाले'
  },

  // Language Prompt
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
    try {
      const saved = localStorage.getItem('mazhi_sheti_lang') as Language
      if (saved && (saved === 'en' || saved === 'hi' || saved === 'mr')) {
        setLanguageState(saved)
        document.documentElement.lang = saved
      } else {
        const hasDismissed = localStorage.getItem('mazhi_sheti_lang_prompt_dismissed')
        if (!hasDismissed) {
          const timer = setTimeout(() => setShowPrompt(true), 1500)
          return () => clearTimeout(timer)
        }
      }
    } catch {
      // Ignore localStorage exceptions in restrictive contexts
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem('mazhi_sheti_lang', lang)
      localStorage.setItem('mazhi_sheti_lang_prompt_dismissed', 'true')
      document.documentElement.lang = lang
    } catch {
      // Ignore
    }
    setShowPrompt(false)
  }

  const dismissPrompt = () => {
    setShowPrompt(false)
    try {
      localStorage.setItem('mazhi_sheti_lang_prompt_dismissed', 'true')
    } catch {
      // Ignore
    }
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
