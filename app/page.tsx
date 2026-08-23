'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Stethoscope,
  KeyRound,
  FileText,
  Landmark,
  PhoneCall,
  Bot,
  ShieldCheck,
  Cpu,
  Microscope,
  Wallet,
  Database,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Mail,
  Phone,
  Search,
  ChevronRight,
  Sparkles,
  Lock,
  Building2,
  FileCheck
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HashSplitDemo } from '@/components/landing/HashSplitDemo'
import { StateEmblemOfIndia } from '@/components/ui/NexoraLogo'

export default function LandingPage() {
  const services = [
    {
      id: 'find-care',
      titleEn: 'Doctor & Hospital Booking',
      titleHi: 'वैद्यकीय सल्ला व अपॉइंटमेंट',
      desc: 'Book verified consultations with board-certified specialists across AIIMS, Apollo, and district hospitals without disclosing unshielded identity.',
      icon: Stethoscope,
      color: 'border-t-[#0B3D91]',
      iconBg: 'bg-blue-50 text-[#0B3D91]',
      btnColor: 'text-[#0B3D91]',
      href: '/dashboard/find-care'
    },
    {
      id: 'consent',
      titleEn: 'Smart Consent Center',
      titleHi: 'संमती व्यवस्थापन केंद्र',
      desc: 'Issue cryptographically signed, time-bound consent contracts. Grant or revoke record access in real-time with zero data exposure.',
      icon: KeyRound,
      color: 'border-t-[#F5821F]',
      iconBg: 'bg-amber-50 text-[#F5821F]',
      btnColor: 'text-[#F5821F]',
      href: '/dashboard/consent'
    },
    {
      id: 'records',
      titleEn: 'Encrypted Health Records',
      titleHi: 'आरोग्य नोंदी व चाचणी अहवाल',
      desc: 'Access client-side AES-256 encrypted clinical summaries, lab reports, and diagnostic scans linked only via cryptographic hash.',
      icon: FileText,
      color: 'border-t-[#1E7A34]',
      iconBg: 'bg-green-50 text-[#1E7A34]',
      btnColor: 'text-[#1E7A34]',
      href: '/dashboard/records'
    },
    {
      id: 'schemes',
      titleEn: 'Government Health Subsidies',
      titleHi: 'सरकारी आरोग्य योजना व अनुदान',
      desc: 'Apply for Ayushman Bharat and central health welfare grants using Zero-Knowledge proofs without uploading raw tax documents.',
      icon: Landmark,
      color: 'border-t-[#7C3AED]',
      iconBg: 'bg-purple-50 text-[#7C3AED]',
      btnColor: 'text-[#7C3AED]',
      href: '/dashboard/schemes'
    },
    {
      id: 'telehealth',
      titleEn: 'Emergency Tele-Consultation',
      titleHi: 'आपत्कालीन ई-सल्ला कक्ष',
      desc: 'Connect to 24x7 encrypted WebRTC tele-health rooms with government-certified duty medical officers and emergency triage teams.',
      icon: PhoneCall,
      color: 'border-t-[#DC2626]',
      iconBg: 'bg-red-50 text-[#DC2626]',
      btnColor: 'text-[#DC2626]',
      href: '/dashboard/appointments'
    },
    {
      id: 'agents',
      titleEn: 'Multi-Agent AI Orchestrator',
      titleHi: 'कृत्रिम बुद्धिमत्ता समन्वयक',
      desc: 'Interactive tripartite AI coordination between Patient Proxy, Hospital Node, and Government Agent with verifiable proof receipts.',
      icon: Bot,
      color: 'border-t-[#0D9488]',
      iconBg: 'bg-teal-50 text-[#0D9488]',
      btnColor: 'text-[#0D9488]',
      href: '/dashboard/agents'
    },
    {
      id: 'audit',
      titleEn: 'Cryptographic Audit Ledger',
      titleHi: 'सार्वजनिक लेखापरीक्षण नोंदवही',
      desc: 'Inspect tamper-evident SHA-256 block logs of every clinical access event, consent state transition, and provider query.',
      icon: ShieldCheck,
      color: 'border-t-[#475569]',
      iconBg: 'bg-slate-50 text-[#475569]',
      btnColor: 'text-[#475569]',
      href: '/dashboard/audit'
    },
    {
      id: 'hospital-ai',
      titleEn: 'Hospital Federated Learning',
      titleHi: 'रुग्णालय एज एआय प्रशिक्षण',
      desc: 'Train diagnostic AI models on-premise behind hospital firewalls. Aggregate model weights globally without transferring patient data.',
      icon: Cpu,
      color: 'border-t-[#4338CA]',
      iconBg: 'bg-indigo-50 text-[#4338CA]',
      btnColor: 'text-[#4338CA]',
      href: '/hospital-portal/ai-training'
    },
    {
      id: 'research',
      titleEn: 'National Health Intelligence',
      titleHi: 'वैद्यकीय संशोधन व सांख्यिकी',
      desc: 'Access verified epidemiological trends and anonymized public health statistics for research institutions and policy makers.',
      icon: Microscope,
      color: 'border-t-[#0284C7]',
      iconBg: 'bg-sky-50 text-[#0284C7]',
      btnColor: 'text-[#0284C7]',
      href: '/research'
    },
    {
      id: 'wallet',
      titleEn: 'Midnight 1AM Enclave',
      titleHi: 'स्थानिक ब्लॉकचेन पाकीट',
      desc: 'Execute dust-free transactions and generate client-side Groth16 zero-knowledge proofs over the localnet blockchain network.',
      icon: Wallet,
      color: 'border-t-[#EA580C]',
      iconBg: 'bg-orange-50 text-[#EA580C]',
      btnColor: 'text-[#EA580C]',
      href: '/dashboard/profile'
    },
    {
      id: 'clean-store',
      titleEn: 'Clean Data Store (MongoDB)',
      titleHi: 'विभक्त डेटाबेस संरचना',
      desc: 'MongoDB separation ensuring personal identities and medical diagnoses are decoupled and linked strictly by server-derived personHash.',
      icon: Database,
      color: 'border-t-[#059669]',
      iconBg: 'bg-emerald-50 text-[#059669]',
      btnColor: 'text-[#059669]',
      href: '/dashboard/medical'
    },
    {
      id: 'architecture',
      titleEn: 'Technical Architecture & Spec',
      titleHi: 'तांत्रिक तपशील व सुरक्षा नियमावली',
      desc: 'Read the official technical whitepaper covering W3C DIDs, ZK circuits, zero raw data leakage guarantees, and consensus models.',
      icon: Layers,
      color: 'border-t-[#2563EB]',
      iconBg: 'bg-blue-50 text-[#2563EB]',
      btnColor: 'text-[#2563EB]',
      href: '/architecture'
    }
  ]

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-[#1A1A1A] flex flex-col font-sans antialiased">
      <Navbar />

      {/* 1. OFFICIAL PAGE TITLE BANNER (Forest Green / Indian Gov Style) */}
      <section className="bg-[#124E2A] text-white border-b-4 border-[#F5821F] shadow-sm relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black/20 text-[#FFF5EB] border border-white/20 text-xs font-semibold">
                <StateEmblemOfIndia className="w-4 h-5 inline-block" />
                <span>Ministry of Health & Family Welfare • Government of India</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Our Services <br />
                <span className="text-[#FDBA74] text-2xl sm:text-3xl font-bold">
                  नागरिक सेवा | Citizen Healthcare Services
                </span>
              </h1>

              <p className="text-emerald-100 text-sm sm:text-base leading-relaxed font-normal">
                Access all national sovereign healthcare services online. From confidential doctor bookings to cryptographic smart consents, all services are available 24/7 for citizens of India.
              </p>

              {/* Tricolor Indicator */}
              <div className="w-36 h-1.5 rounded-full overflow-hidden flex mx-auto lg:mx-0">
                <div className="w-1/3 bg-[#F5821F]"></div>
                <div className="w-1/3 bg-white"></div>
                <div className="w-1/3 bg-[#1E7A34]"></div>
              </div>
            </div>

            {/* Right Card: Helpline & Quick Portal Access */}
            <div className="w-full lg:w-96 bg-white text-[#1A1A1A] rounded-lg p-6 shadow-lg border border-neutral-200 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0B3D91]">
                  National Toll-Free Helpline
                </span>
                <span className="px-2 py-0.5 rounded bg-green-100 text-green-800 text-[10px] font-bold">
                  24x7 Active
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-2xl font-black text-[#0B3D91] flex items-center gap-2">
                  <Phone className="w-6 h-6 text-[#F5821F]" />
                  <span>1800-11-2026</span>
                </div>
                <p className="text-[11px] text-neutral-500">
                  Emergency Medical Support & Portal Assistance
                </p>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <Link
                  href="/dashboard/find-care"
                  className="flex-1 py-2.5 px-3 rounded bg-[#F5821F] hover:bg-[#D66D10] text-white text-xs font-bold text-center uppercase tracking-wider transition-colors shadow-sm"
                >
                  Book Doctor
                </Link>
                <Link
                  href="/dashboard/consent"
                  className="flex-1 py-2.5 px-3 rounded bg-[#0B3D91] hover:bg-[#07265E] text-white text-xs font-bold text-center uppercase tracking-wider transition-colors shadow-sm"
                >
                  Smart Consent
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VISION & MISSION SECTION (Matching Reference Screenshot) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Our Vision Card */}
          <div className="bg-white rounded-lg border border-[#E0E0E0] shadow-sm overflow-hidden flex flex-col">
            <div className="bg-[#F5821F] text-white px-5 py-3 font-bold text-sm tracking-wide flex items-center justify-between">
              <span>Our Vision (आमचे उद्दिष्ट)</span>
              <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded">Strategic Goal</span>
            </div>
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#0B3D91]">
                  Universal Digital Health Sovereignty for Every Citizen
                </h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  To provide a secure, inclusive, and privacy-preserving national healthcare ecosystem where every patient owns and controls their medical data without risk of unauthorized surveillance or commercial exploitation.
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-[#1A1A1A] font-medium pt-2 border-t border-neutral-100">
                <li className="flex items-center gap-2 text-neutral-700">
                  <span className="text-[#F5821F] font-bold">★</span> 100% Cryptographic Patient Ownership
                </li>
                <li className="flex items-center gap-2 text-neutral-700">
                  <span className="text-[#F5821F] font-bold">★</span> Zero Personal Health Info (PHI) Stored On-Chain
                </li>
              </ul>
            </div>
          </div>

          {/* Our Mission Card */}
          <div className="bg-white rounded-lg border border-[#E0E0E0] shadow-sm overflow-hidden flex flex-col">
            <div className="bg-[#1E7A34] text-white px-5 py-3 font-bold text-sm tracking-wide flex items-center justify-between">
              <span>Our Mission (आमचे ध्येय)</span>
              <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded">Core Commitments</span>
            </div>
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#1E7A34]">
                  Zero-Knowledge Collaboration Between Citizens, Hospitals & Government
                </h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  To deploy state-of-the-art Zero-Knowledge Proofs, Federated AI algorithms, and W3C Verifiable Credentials that empower hospitals to collaborate while protecting individual human privacy.
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-[#1A1A1A] font-medium pt-2 border-t border-neutral-100">
                <li className="flex items-center gap-2 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1E7A34]" /> Real-time 1-Click Consent Revocation
                </li>
                <li className="flex items-center gap-2 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1E7A34]" /> Tamper-evident Audit Ledger with SHA-256 Validation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN SERVICES & QUICK ACCESS LAYOUT (Matching Reference Screenshot) */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-8 py-6 w-full space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* LEFT SIDEBAR: QUICK ACCESS & GUIDELINES */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Access Card */}
            <div className="bg-white rounded-lg border border-[#E0E0E0] shadow-sm overflow-hidden">
              <div className="bg-[#0B3D91] text-white px-4 py-3 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F5821F]" />
                <span>Quick Access</span>
              </div>
              <div className="divide-y divide-neutral-100 text-xs">
                <Link
                  href="/dashboard/find-care"
                  className="flex items-center justify-between px-4 py-3 text-neutral-800 hover:bg-[#EAF1FB] hover:text-[#0B3D91] font-semibold transition-colors group"
                >
                  <span>Book Doctor Online</span>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/dashboard/consent"
                  className="flex items-center justify-between px-4 py-3 text-neutral-800 hover:bg-[#EAF1FB] hover:text-[#0B3D91] font-semibold transition-colors group"
                >
                  <span>Track Smart Consent</span>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/dashboard/records"
                  className="flex items-center justify-between px-4 py-3 text-neutral-800 hover:bg-[#EAF1FB] hover:text-[#0B3D91] font-semibold transition-colors group"
                >
                  <span>Download Health Records</span>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/dashboard/schemes"
                  className="flex items-center justify-between px-4 py-3 text-neutral-800 hover:bg-[#EAF1FB] hover:text-[#0B3D91] font-semibold transition-colors group"
                >
                  <span>Apply for Health Scheme</span>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/dashboard/audit"
                  className="flex items-center justify-between px-4 py-3 text-neutral-800 hover:bg-[#EAF1FB] hover:text-[#0B3D91] font-semibold transition-colors group"
                >
                  <span>RTI & Audit Logs</span>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/dashboard/agents"
                  className="flex items-center justify-between px-4 py-3 text-neutral-800 hover:bg-[#EAF1FB] hover:text-[#0B3D91] font-semibold transition-colors group"
                >
                  <span>AI Consultation Agent</span>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Guidelines Card */}
            <div className="bg-white rounded-lg border border-[#E0E0E0] shadow-sm overflow-hidden">
              <div className="bg-[#F5821F] text-white px-4 py-3 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                <FileCheck className="w-4 h-4" />
                <span>Citizen Guidelines</span>
              </div>
              <div className="p-4 space-y-3 text-xs text-[#4B5563]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E7A34] shrink-0 mt-0.5" />
                  <span>Keep your Aadhaar / Sovereign DID ready for verified authentication.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E7A34] shrink-0 mt-0.5" />
                  <span>All medical records are stored strictly off-chain under client-side encryption.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E7A34] shrink-0 mt-0.5" />
                  <span>Track status using your unique 16-character Transaction Hash.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E7A34] shrink-0 mt-0.5" />
                  <span>For urgent matters, reach the 24x7 helpline at <strong>1800-11-2026</strong>.</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT GRID: 12 CITIZEN HEALTHCARE SERVICES */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-[#0B3D91] text-white px-5 py-3 rounded-t-lg font-bold text-sm tracking-wide flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#F5821F]" />
                <span>All Sovereign Healthcare Services (सर्व नागरिक सेवा)</span>
              </div>
              <span className="text-xs text-neutral-200 font-normal">
                12 Services Available
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {services.map((s) => {
                const IconComponent = s.icon
                return (
                  <div
                    key={s.id}
                    className={`bg-white rounded-lg border border-[#E0E0E0] border-t-4 ${s.color} p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group`}
                  >
                    <div className="space-y-3">
                      {/* Icon + English/Devanagari Header */}
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg ${s.iconBg} flex items-center justify-center shrink-0`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[#0B3D91] leading-snug group-hover:text-[#F5821F] transition-colors">
                            {s.titleEn}
                          </h4>
                          <span className="text-[11px] text-neutral-500 font-medium block mt-0.5">
                            {s.titleHi}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-[#4B5563] leading-relaxed line-clamp-3">
                        {s.desc}
                      </p>
                    </div>

                    <Link
                      href={s.href}
                      className={`inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider ${s.btnColor} hover:underline pt-2 border-t border-neutral-100`}
                    >
                      <span>ACCESS SERVICE</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE HASH SPLIT & VERIFICATION TOOL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full">
        <div className="bg-white rounded-lg border border-[#E0E0E0] shadow-sm p-6 sm:p-8 space-y-6">
          <div className="border-b border-neutral-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-[#F5821F] uppercase tracking-wider">
                Cryptographic Trust Engine
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#0B3D91] mt-0.5">
                Identity & Medical Record Cryptographic Split Visualizer
              </h2>
            </div>
            <span className="px-3 py-1 rounded bg-[#EAF1FB] text-[#0B3D91] text-xs font-bold border border-[#0B3D91]/20 self-start sm:self-auto">
              Live SHA-256 Engine
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed max-w-4xl">
            In compliance with national data protection guidelines, Nexora generates a deterministic <code className="bg-neutral-100 px-1 py-0.5 rounded text-neutral-900 font-mono">personHash</code>. Your legal identity and medical records reside in separate encrypted stores and cannot be linked without your explicit cryptographic smart consent.
          </p>

          <HashSplitDemo />
        </div>
      </section>

      {/* 5. NEED HELP? CONTACT OUR HELPDESK BANNER (Matching Reference Screenshot) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full">
        <div className="bg-white rounded-lg border-2 border-[#0B3D91] p-6 sm:p-8 shadow-md">
          <div className="text-center sm:text-left space-y-1 mb-6">
            <h3 className="text-xl font-black text-[#0B3D91] flex items-center justify-center sm:justify-start gap-2">
              <PhoneCall className="w-5 h-5 text-[#F5821F]" />
              <span>Need Help? Contact Our Citizen Helpdesk</span>
            </h3>
            <p className="text-xs text-neutral-500 font-medium">
              मदत हवी आहे? आमच्या राष्ट्रीय हेल्पडेस्कशी त्वरित संपर्क साधा
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Helpline Box */}
            <div className="p-4 rounded-lg bg-[#EAF1FB] border border-[#CBD5E1] text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#0B3D91] font-bold">
                <Phone className="w-3.5 h-3.5" />
                <span>Toll-Free Helpline</span>
              </div>
              <div className="text-xl font-black text-[#0B3D91]">
                1800-11-2026
              </div>
              <span className="text-[10px] text-neutral-500 block">24x7 Citizen Support</span>
            </div>

            {/* Email Support Box */}
            <div className="p-4 rounded-lg bg-[#FFF5EB] border border-[#FDBA74] text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#D66D10] font-bold">
                <Mail className="w-3.5 h-3.5" />
                <span>Email Support</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-[#D66D10] truncate">
                helpdesk@nexora.gov.in
              </div>
              <span className="text-[10px] text-neutral-500 block">Guaranteed response within 24 hours</span>
            </div>

            {/* Office Hours Box */}
            <div className="p-4 rounded-lg bg-[#E8F5E9] border border-[#A7F3D0] text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#1E7A34] font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>Working Hours</span>
              </div>
              <div className="text-base font-bold text-[#1E7A34]">
                Mon - Sat
              </div>
              <span className="text-[10px] text-neutral-500 block">9:00 AM - 6:00 PM IST</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
