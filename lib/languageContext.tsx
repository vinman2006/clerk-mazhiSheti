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
  // Navigation
  nav_architecture: {
    en: 'Architecture',
    hi: 'आर्किटेक्चर',
    mr: 'रचना (आर्किटेक्चर)'
  },
  nav_spec: {
    en: 'Spec',
    hi: 'विशिष्टता',
    mr: 'तपशील'
  },
  nav_hospitals: {
    en: 'For Hospitals',
    hi: 'अस्पतालों के लिए',
    mr: 'रुग्णालयांसाठी'
  },
  nav_government: {
    en: 'For Government',
    hi: 'सरकार के लिए',
    mr: 'शासनासाठी'
  },
  nav_research: {
    en: 'Research Portal',
    hi: 'शोध पोर्टल',
    mr: 'संशोधन पोर्टल'
  },
  nav_sign_in: {
    en: 'Sign In',
    hi: 'साइन इन',
    mr: 'साइन इन करा'
  },
  nav_register: {
    en: 'Register',
    hi: 'पंजीकरण',
    mr: 'नोंदणी करा'
  },
  nav_open_app: {
    en: 'Open App',
    hi: 'ऐप खोलें',
    mr: 'ॲप उघडा'
  },

  // Hero Section
  hero_title_line1: {
    en: 'Healthcare access,',
    hi: 'स्वास्थ्य सेवा तक पहुंच,',
    mr: 'आरोग्य सेवेचा लाभ,'
  },
  hero_title_line2: {
    en: 'without giving up your privacy.',
    hi: 'अपनी गोपनीयता खोए बिना।',
    mr: 'तुमची गोपनीयता न गमावता.'
  },
  hero_subtitle: {
    en: 'Nexora is a privacy-first multi-agent healthcare network where patients, hospitals, and government services communicate and collaborate through AI agents while blockchain and zero-knowledge technology protect patient control and trust.',
    hi: 'नेक्सोरा एक गोपनीयता-प्रथम मल्टी-एजेंट स्वास्थ्य नेटवर्क है जहां मरीज, अस्पताल और सरकारी सेवाएं एआई एजेंटों के माध्यम से संवाद और सहयोग करते हैं, जबकि ब्लॉकचेन और ज़ीरो-नॉलेज तकनीक मरीज के नियंत्रण और विश्वास की रक्षा करती है।',
    mr: 'नेक्सोरा हे गोपनीयता-प्रथम मल्टी-एजंट आरोग्य नेटवर्क आहे जिथे रुग्ण, रुग्णालये आणि शासकीय सेवा एआय एजंट्सद्वारे संवाद साधतात, तर ब्लॉकचेन आणि झिरो-नॉलेज तंत्रज्ञान रुग्णांचे नियंत्रण आणि विश्वास सुरक्षित ठेवते.'
  },
  hero_cta_primary: {
    en: 'LAUNCH MULTI-AGENT DEMO',
    hi: 'मल्टी-एजेंट डेमो शुरू करें',
    mr: 'मल्टी-एजंट डेमो सुरू करा'
  },
  hero_cta_secondary: {
    en: 'Technical Architecture',
    hi: 'तकनीकी आर्किटेक्चर',
    mr: 'तांत्रिक रचना (आर्किटेक्चर)'
  },

  // Problem / Paradigm Shift
  paradigm_badge: {
    en: 'Privacy Paradigm Shift',
    hi: 'गोपनीयता प्रतिमान परिवर्तन',
    mr: 'गोपनीयतेचा नवीन दृष्टिकोन'
  },
  paradigm_title: {
    en: 'Why Existing Healthcare AI Breaches Patient Trust',
    hi: 'मौजूदा स्वास्थ्य सेवा एआई मरीज के विश्वास को क्यों तोड़ती है',
    mr: 'सध्याची आरोग्य एआय प्रणाली रुग्णांचा विश्वास का तोडते'
  },
  paradigm_desc: {
    en: 'Traditional healthcare AI hoards sensitive medical records in centralized cloud databases. Nexora flips the paradigm with edge compute and federated learning.',
    hi: 'पारंपरिक स्वास्थ्य सेवा एआई संवेदनशील मेडिकल रिकॉर्ड को केंद्रीकृत क्लाउड डेटाबेस में जमा करती है। नेक्सोरा एज कंप्यूट और फेडरेटेड लर्निंग के साथ इस मॉडल को बदल देता है।',
    mr: 'पारंपारिक आरोग्य एआय संवेदनशील वैद्यकीय माहिती एकाच क्लाउड डेटाबेसमध्ये साठवते. नेक्सोरा एज कॉम्प्युट आणि फेडरेटेड लर्निंगद्वारे या पद्धतीला पूर्णपणे बदलते.'
  },
  old_way_title: {
    en: 'The Old Way (Centralized AI)',
    hi: 'पुराना तरीका (केंद्रीकृत एआई)',
    mr: 'जुनी पद्धत (केंद्रीकृत एआय)'
  },
  old_way_risk: {
    en: 'High Risk',
    hi: 'अत्यधिक जोखिम',
    mr: 'मोठा धोका'
  },
  old_way_hosp_transmit: {
    en: 'Hospitals A, B, C transmit raw patient records',
    hi: 'अस्पताल A, B, C मरीजों के सीधे मेडिकल रिकॉर्ड भेजते हैं',
    mr: 'रुग्णालये A, B, C थेट रुग्णांचे मूळ वैद्यकीय रेकॉर्ड पाठवतात'
  },
  old_way_hosp_desc: {
    en: 'Scans, clinical notes, and genomic sequences uploaded to third-party tech giants.',
    hi: 'स्कैन, क्लिनिकल नोट्स और जीनोमिक डेटा तीसरे पक्ष की कंपनियों को अपलोड किए जाते हैं।',
    mr: 'स्कॅन्स, क्लिनिकल नोट्स आणि जीनोमिक माहिती थेट बाहेरील कंपन्यांना दिली जाते.'
  },
  old_way_honeypot: {
    en: 'Honeypot Centralized Database',
    hi: 'हनीपॉट केंद्रीकृत डेटाबेस',
    mr: 'हनीपॉट केंद्रीकृत डेटाबेस'
  },
  old_way_honeypot_desc: {
    en: 'Vulnerable to ransomware, catastrophic data leaks, and unauthorized commercial exploitation.',
    hi: 'रैनसमवेयर हमलों, डेटा चोरी और अनधिकृत व्यावसायिक उपयोग के लिए अत्यधिक संवेदनशील।',
    mr: 'सायबर हल्ले, डेटा चोरी आणि अनधिकृत व्यावसायिक वापरासाठी अत्यंत असुरक्षित.'
  },
  old_way_footer: {
    en: 'Patients lose all control, ownership, and visibility once uploaded.',
    hi: 'डेटा अपलोड होने के बाद मरीज अपना सारा नियंत्रण और स्वामित्व खो देते हैं।',
    mr: 'एकदा माहिती अपलोड झाल्यावर रुग्णांचे स्वतःच्या डेटावरील सर्व नियंत्रण संपते.'
  },

  nexora_way_title: {
    en: 'The Nexora Way (Federated Learning)',
    hi: 'नेक्सोरा का तरीका (फेडरेटेड लर्निंग)',
    mr: 'नेक्सोराची पद्धत (फेडरेटेड लर्निंग)'
  },
  nexora_way_badge: {
    en: 'Zero Trust ✓',
    hi: 'ज़ीरो ट्रस्ट ✓',
    mr: 'झिरो ट्रस्ट ✓'
  },
  nexora_way_local: {
    en: 'Local On-Premise Training Only',
    hi: 'केवल अस्पताल के अंदर स्थानीय एआई प्रशिक्षण',
    mr: 'फक्त रुग्णालयाच्या अंतर्गत सुरक्षित एआय प्रशिक्षण'
  },
  nexora_way_local_desc: {
    en: 'Each hospital trains AI locally behind its firewall. Raw patient records never leave the hospital premise.',
    hi: 'प्रत्येक अस्पताल अपने फ़ायरवॉल के भीतर स्थानीय स्तर पर एआई को प्रशिक्षित करता है। कच्चे रिकॉर्ड कभी अस्पताल से बाहर नहीं जाते।',
    mr: 'प्रत्येक रुग्णालय स्वतःच्या सुरक्षित फायरवॉलमध्ये एआय प्रशिक्षित करते. मूळ रुग्ण डेटा कधीही रुग्णालयाबाहेर जात नाही.'
  },
  nexora_way_weights: {
    en: 'Encrypted Weight Updates Only',
    hi: 'केवल एन्क्रिप्टेड वेट्स और ग्रेडिएंट्स साझा किए जाते हैं',
    mr: 'फक्त एन्क्रिप्टेड मॉडेल ग्रेडियंट्स सुरक्षितपणे शेअर केले जातात'
  },
  nexora_way_weights_desc: {
    en: 'Only mathematical gradient parameters are shared to improve the global diagnostic model via secure multiparty computation.',
    hi: 'सुरक्षित बहु-पक्षीय गणना द्वारा वैश्विक नैदानिक मॉडल को बेहतर बनाने के लिए केवल गणितीय ग्रेडिएंट साझा किए जाते हैं।',
    mr: 'सुरक्षित मल्टिपार्टी कॉम्प्युटेशनद्वारे जागतिक रोगनिदान मॉडेल सुधारण्यासाठी फक्त गणितीय सूत्रे शेअर केली जातात.'
  },
  nexora_way_footer: {
    en: 'Patient consent cryptographically enforced via smart contracts.',
    hi: 'मरीज की सहमति स्मार्ट अनुबंधों के माध्यम से क्रिप्टोग्राफ़िक रूप से लागू की जाती है।',
    mr: 'रुग्णाची संमती स्मार्ट कॉन्ट्रॅक्ट्सद्वारे कायदेशीर व तांत्रिकदृष्ट्या सुरक्षित ठेवली जाते.'
  },

  // Three Pillars
  pillars_core: {
    en: 'Architecture Core',
    hi: 'आर्किटेक्चर के मूल स्तंभ',
    mr: 'मुख्य आधारस्तंभ'
  },
  pillars_title: {
    en: 'The Three Pillars of Nexora',
    hi: 'नेक्सोरा के तीन मुख्य स्तंभ',
    mr: 'नेक्सोराचे तीन मुख्य आधारस्तंभ'
  },
  pillars_desc: {
    en: 'AI is the interface, not the trust layer. Trust is guaranteed through cryptography.',
    hi: 'एआई सिर्फ इंटरफ़ेस है, विश्वास की परत नहीं। विश्वास क्रिप्टोग्राफी द्वारा सुनिश्चित होता है।',
    mr: 'एआय हा फक्त संवादाचा मार्ग आहे. खरा विश्वास क्रिप्टोग्राफीद्वारे सिद्ध होतो.'
  },
  pillar_1_title: {
    en: '1. Healthcare Access',
    hi: '1. स्वास्थ्य सेवा पहुंच',
    mr: '१. आरोग्य सेवा प्रवेश'
  },
  pillar_1_desc: {
    en: 'Discover and book certified cardiologists, diagnostic labs, and hospitals with verified credentials and transparent pricing.',
    hi: 'सत्यापित साख और पारदर्शी शुल्क के साथ प्रमाणित डॉक्टरों, डायग्नोस्टिक लैब और अस्पतालों को खोजें और बुक करें।',
    mr: 'सत्यापित प्रमाणपत्रे आणि पारदर्शक शुल्कासह प्रमाणित डॉक्टर, प्रयोगशाळा आणि रुग्णालये शोधा व वेळ आरक्षित करा.'
  },
  pillar_2_title: {
    en: '2. Multi-Agent Layer',
    hi: '2. मल्टी-एजेंट लेयर',
    mr: '२. मल्टी-एजंट स्तर'
  },
  pillar_2_desc: {
    en: 'Patient Agent, Hospital Agents, and Government Agents autonomously communicate to route requests, check slots, and verify subsidies.',
    hi: 'मरीज एजेंट, अस्पताल एजेंट और सरकारी एजेंट अनुरोधों को निर्देशित करने, स्लॉट जांचने और सब्सिडी सत्यापित करने के लिए स्वतः संवाद करते हैं।',
    mr: 'रुग्ण एजंट, रुग्णालय एजंट आणि शासकीय एजंट आपोआप संवाद साधून सेवा समन्वयित करतात.'
  },
  pillar_3_title: {
    en: '3. Privacy & Trust Layer',
    hi: '3. गोपनीयता और विश्वास स्तर',
    mr: '३. गोपनीयता व विश्वास स्तर'
  },
  pillar_3_desc: {
    en: 'W3C DIDs, Verifiable Credentials, Smart Consent Contracts, Zero-Knowledge Proofs, and an immutable audit trail guarantee patient sovereignty.',
    hi: 'W3C DIDs, सत्यापन योग्य साख, स्मार्ट सहमति अनुबंध, ज़ीरो-नॉलेज प्रूफ और अपरिवर्तनीय ऑडिट ट्रेल मरीज की संप्रभुता की गारंटी देते हैं।',
    mr: 'W3C DIDs, स्मार्ट संमती कॉन्ट्रॅक्ट्स, झिरो-नॉलेज प्रूक्स आणि अपरिवर्तनीय ऑडिट ट्रेल रुग्णांचे संपूर्ण स्वातंत्र्य सुनिश्चित करतात.'
  },

  // How Consent Works
  consent_protocol_badge: {
    en: 'Cryptographic Protocol',
    hi: 'क्रिप्टोग्राफ़िक प्रोटोकॉल',
    mr: 'क्रिप्टोग्राफिक प्रोटोकॉल'
  },
  consent_how_title: {
    en: 'How Smart Consent Works',
    hi: 'स्मार्ट सहमति कैसे काम करती है',
    mr: 'स्मार्ट संमती कशी कार्य करते'
  },
  consent_how_desc: {
    en: 'Every data access request is gated by an immutable, time-limited smart contract.',
    hi: 'प्रत्येक डेटा एक्सेस अनुरोध एक अपरिवर्तनीय, समय-सीमित स्मार्ट अनुबंध द्वारा नियंत्रित होता है।',
    mr: 'प्रत्येक डेटा प्रवेश एका अपरिवर्तनीय आणि वेळेचे बंधन असलेल्या स्मार्ट कॉन्ट्रॅक्टद्वारे सुरक्षित केला जातो.'
  },
  consent_step1_title: {
    en: 'Patient Grants Consent',
    hi: 'मरीज सहमति देता है',
    mr: 'रुग्ण संमती देतो'
  },
  consent_step1_desc: {
    en: 'Select precise data scope (e.g. cardiac telemetry only) and set time expiry.',
    hi: 'सटीक डेटा दायरा (उदा. केवल हृदय टेलीमेट्री) चुनें और समय सीमा निर्धारित करें।',
    mr: 'विशिष्ट वैद्यकीय व्याप्ती (उदा. फक्त हृदय तपासणी) निवडा आणि कालमर्यादा निश्चित करा.'
  },
  consent_step2_title: {
    en: 'Contract Records Permission',
    hi: 'अनुबंध अनुमति दर्ज करता है',
    mr: 'कॉन्ट्रॅक्ट परवानगी नोंदवते'
  },
  consent_step2_desc: {
    en: 'Smart contract mints an on-chain permission token tied to the provider DID.',
    hi: 'स्मार्ट अनुबंध प्रदाता DID से जुड़ा एक ऑन-चेन अनुमति टोकन जारी करता है।',
    mr: 'स्मार्ट कॉन्ट्रॅक्ट डॉक्टरांच्या DID शी जोडलेला ऑन-चेन परवानगी टोकन तयार करते.'
  },
  consent_step3_title: {
    en: 'Hospital/AI Accesses Record',
    hi: 'अस्पताल/एआई रिकॉर्ड देखता है',
    mr: 'रुग्णालय/एआय रेकॉर्ड तपासते'
  },
  consent_step3_desc: {
    en: 'Off-chain encrypted key is resolved only for approved scope and time duration.',
    hi: 'ऑफ-चेन एन्क्रिप्टेड कुंजी केवल स्वीकृत दायरे और समय अवधि के लिए डिक्रिप्ट होती है।',
    mr: 'ऑफ-चेन एन्क्रिप्टेड माहिती फक्त मंजूर केलेल्या वेळेसाठीच उघडली जाते.'
  },
  consent_step4_title: {
    en: 'Patient Audits Access',
    hi: 'मरीज एक्सेस का ऑडिट करता है',
    mr: 'रुग्ण तपासणीचे ऑडिट करतो'
  },
  consent_step4_desc: {
    en: 'Real-time record logged to the immutable ledger: "Hospital X accessed report at 10:42 AM."',
    hi: 'अपरिवर्तनीय लेज़र में वास्तविक समय का रिकॉर्ड दर्ज होता है: "अस्पताल X ने सुबह 10:42 बजे रिपोर्ट देखी।"',
    mr: 'अपरिवर्तनीय लेजरवर त्वरित नोंद होते: "रुग्णालय X ने सकाळी १०:४२ वाजता रिपोर्ट तपासला."'
  },

  // Ecosystem Stakeholders
  stakeholder_badge: {
    en: 'Ecosystem Interfaces',
    hi: 'पारिस्थितिकी तंत्र इंटरफेस',
    mr: 'आरोग्य व्यवस्था इंटरफेस'
  },
  stakeholder_title: {
    en: 'Built for Every Healthcare Stakeholder',
    hi: 'स्वास्थ्य सेवा के हर भागीदार के लिए निर्मित',
    mr: 'आरोग्य क्षेत्रातील प्रत्येक घटकासाठी सज्ज'
  },
  tab_hospitals: {
    en: 'For Hospitals & Labs',
    hi: 'अस्पतालों और लैब के लिए',
    mr: 'रुग्णालये व प्रयोगशाळांसाठी'
  },
  tab_government: {
    en: 'For Government Schemes',
    hi: 'सरकारी योजनाओं के लिए',
    mr: 'शासकीय योजनांसाठी'
  },
  tab_researchers: {
    en: 'For Researchers',
    hi: 'शोधकर्ताओं के लिए',
    mr: 'संशोधकांसाठी'
  },

  // Footer & Badges
  footer_tagline: {
    en: 'Zero-Trust Multi-Agent Healthcare Infrastructure',
    hi: 'ज़ीरो-ट्रस्ट मल्टी-एजेंट स्वास्थ्य सेवा अवसंरचना',
    mr: 'झिरो-ट्रस्ट मल्टी-एजंट आरोग्य पायाभूत सुविधा'
  },
  footer_copy: {
    en: '© 2026 Nexora. All rights reserved. Zero medical data stored on public blockchain.',
    hi: '© 2026 नेक्सोरा। सर्वाधिकार सुरक्षित। सार्वजनिक ब्लॉकचेन पर कोई मेडिकल डेटा संग्रहीत नहीं होता।',
    mr: '© २०२६ नेक्सोरा. सर्व हक्क राखीव. सार्वजनिक ब्लॉकचेनवर कोणताही वैद्यकीय डेटा साठवला जात नाही.'
  },

  // Language Prompt
  lang_prompt_title: {
    en: 'Language Preference',
    hi: 'भाषा प्राथमिकता',
    mr: 'भाषा निवड'
  },
  lang_prompt_desc: {
    en: 'Would you like to browse Nexora in Hindi (हिन्दी) or Marathi (मराठी)?',
    hi: 'क्या आप नेक्सोरा को हिन्दी या मराठी में देखना चाहते हैं?',
    mr: 'तुम्हाला नेक्सोरा मराठी किंवा हिंदीमध्ये वापरायचे आहे का?'
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
    const saved = localStorage.getItem('nexora_lang') as Language
    if (saved && (saved === 'en' || saved === 'hi' || saved === 'mr')) {
      setLanguageState(saved)
    } else {
      const hasDismissed = localStorage.getItem('nexora_lang_prompt_dismissed')
      if (!hasDismissed) {
        const timer = setTimeout(() => setShowPrompt(true), 1200)
        return () => clearTimeout(timer)
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('nexora_lang', lang)
    setShowPrompt(false)
  }

  const dismissPrompt = () => {
    setShowPrompt(false)
    localStorage.setItem('nexora_lang_prompt_dismissed', 'true')
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
