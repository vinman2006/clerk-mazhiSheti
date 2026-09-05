import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, 
  Menu, 
  X, 
  LogIn, 
  Settings, 
  Sprout, 
  CloudSun, 
  TrendingUp, 
  ShieldCheck, 
  Droplets,
  Thermometer,
  Wind,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  SlidersHorizontal,
  Volume2,
  Globe,
  Tag,
  Landmark
} from 'lucide-react'
import { FarmerLogo } from '@/components/ui/FarmerLogo'
import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs'
import dynamic from 'next/dynamic'

const NotificationInbox = dynamic(() => import('@/components/ui/NotificationInbox'), { ssr: false })

interface TaskbarProps {
  onSettingsClick?: () => void
}

export function Taskbar({ onSettingsClick }: TaskbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<string>('overview')
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)

  // Active Interactive Modal State
  const [activeModal, setActiveModal] = useState<'crop-advisory' | 'market-rates' | 'weather' | 'schemes' | 'settings' | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<'mr' | 'en'>('mr')
  const [audioAlerts, setAudioAlerts] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    {
      id: 'overview',
      label: 'Overview',
      icon: Sprout,
      badge: 'Live',
    },
    {
      id: 'crop-advisory',
      label: 'Crop Advisory',
      icon: Sprout,
    },
    {
      id: 'market-rates',
      label: 'Mandi Rates',
      icon: TrendingUp,
    },
    {
      id: 'weather',
      label: 'Weather & Soil',
      icon: CloudSun,
    },
    {
      id: 'schemes',
      label: 'Govt Schemes',
      icon: ShieldCheck,
    },
  ]

  const handleNavClick = (id: string) => {
    setActiveTab(id)
    if (id === 'overview') {
      const el = document.getElementById('portals')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else {
      setActiveModal(id as any)
    }
  }

  return (
    <>
      <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 flex flex-col items-center px-3 sm:px-6 pointer-events-none transition-all duration-300">
        {/* Floating Rounded Island Navbar */}
        <div
          className={`pointer-events-auto w-full max-w-6xl rounded-2xl transition-all duration-300 border backdrop-blur-xl shadow-2xl ${
            scrolled
              ? 'bg-[#0B1736]/95 border-orange-500/40 shadow-black/80 py-2 px-3 sm:px-4'
              : 'bg-[#0B1736]/85 border-white/10 hover:border-orange-500/30 shadow-black/50 py-2.5 px-3.5 sm:px-5'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo with agricultural emblem */}
            <Link href="/" className="group shrink-0 relative z-10 flex items-center">
              <FarmerLogo size={34} showText={true} showBadge={true} subtitle="SMART AGRI-TECH PLATFORM" />
            </Link>

            {/* Desktop Navigation Links with Smooth Animated Pill */}
            <nav
              className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]"
              onMouseLeave={() => setHoveredTab(null)}
            >
              {navLinks.map((link) => {
                const isActive = activeTab === link.id
                const isHovered = hoveredTab === link.id

                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    onMouseEnter={() => setHoveredTab(link.id)}
                    className={`relative px-3.5 py-1.5 rounded-lg text-xs font-sans font-medium transition-colors duration-200 flex items-center gap-1.5 select-none ${
                      isActive ? 'text-white font-bold' : 'text-blue-100/75 hover:text-white'
                    }`}
                  >
                    {/* Sliding animated background capsule */}
                    {(isHovered || (isActive && !hoveredTab)) && (
                      <motion.div
                        layoutId="taskbar-hover-pill"
                        className={`absolute inset-0 rounded-lg -z-10 ${
                          isActive
                            ? 'bg-orange-500/20 border border-orange-500/40 shadow-sm shadow-orange-950/30'
                            : 'bg-white/10 border border-white/10'
                        }`}
                        initial={false}
                        transition={{
                          type: 'spring',
                          stiffness: 450,
                          damping: 32,
                        }}
                      />
                    )}

                    <span>{link.label}</span>

                    {link.badge && (
                      <span className="px-1.5 py-0.5 rounded bg-white/10 text-orange-400 border border-white/10 text-[9px] font-mono font-bold tracking-tight">
                        {link.badge}
                      </span>
                    )}

                    {/* Active bottom glow indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="taskbar-active-dot"
                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-2.5 h-0.5 rounded-full bg-orange-400 shadow-[0_0_8px_#F5820D]"
                      />
                    )}
                  </button>
                )
              })}
            </nav>

            {/* Right Actions: Settings Status Pill + Clerk Auth Controls */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Settings Status Pill */}
              <button
                onClick={() => {
                  if (onSettingsClick) onSettingsClick()
                  setActiveModal('settings')
                }}
                type="button"
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-blue-100/80 hover:text-white text-xs font-mono font-semibold transition-all shadow-sm group active:scale-95"
              >
                <Settings className="w-3.5 h-3.5 text-blue-200 group-hover:rotate-45 transition-transform duration-300" />
                <span>Settings</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399] animate-pulse" />
              </button>

              {/* Novu Notification Inbox */}
              <NotificationInbox />

              {/* Proper Role-Based Access Link */}
              <Link
                href="/auth/select"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 text-xs font-mono font-semibold text-blue-100 hover:text-white transition-all shadow-sm group"
                title="Select Role Portal"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>Role Portals</span>
              </Link>

              {/* Clerk Authentication Controls */}
              <Show when="signed-out">
                <Link
                  href="/auth/select"
                  className="relative group inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-sans font-bold uppercase tracking-wider bg-gradient-to-r from-[#F5820D] to-[#E0821F] hover:from-[#FFA726] hover:to-[#F5820D] text-white shadow-md shadow-orange-950/50 border border-orange-400/40 hover:border-orange-300 transition-all duration-200 active:scale-[0.98] overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
                  <LogIn className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  <span>SIGN IN</span>
                  <ArrowRight className="w-3 h-3 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>

                <Link
                  href="/auth/select"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white text-xs font-sans font-bold uppercase tracking-wider transition-all duration-200 shadow-sm"
                >
                  <span>REGISTER</span>
                </Link>
              </Show>

              <Show when="signed-in">
                <div className="flex items-center gap-2 pl-1">
                  <Link
                    href="/farmer/dashboard"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold transition-all shadow-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Farm OS</span>
                  </Link>

                  <UserButton 
                    appearance={{
                      elements: {
                        userButtonAvatarBox: 'w-8 h-8 rounded-xl border border-orange-500/40 shadow-md',
                      }
                    }}
                  />
                </div>
              </Show>

              {/* Mobile Hamburger Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Drawer */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                className="md:hidden overflow-hidden border-t border-white/10 pt-3 mt-2 pb-2 space-y-3"
              >
                <nav className="flex flex-col space-y-1 text-sm font-sans font-medium text-neutral-200">
                  {navLinks.map((link) => {
                    const isActive = activeTab === link.id
                    return (
                      <button
                        key={link.id}
                        onClick={() => {
                          handleNavClick(link.id)
                          setMobileMenuOpen(false)
                        }}
                        className={`p-2 rounded-lg transition-colors flex items-center justify-between text-left ${
                          isActive
                            ? 'bg-orange-500/20 text-orange-400 font-bold border border-orange-500/30'
                            : 'hover:bg-white/5 text-neutral-200'
                        }`}
                      >
                        <span>{link.label}</span>
                        {link.badge && (
                          <span className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono text-orange-400 font-bold">
                            {link.badge}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </nav>

                {/* Mobile Auth Actions */}
                <div className="pt-2 border-t border-white/10 space-y-2">
                  <Show when="signed-out">
                    <Link
                      href="/auth/select"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-2.5 rounded-xl text-center text-xs font-bold bg-gradient-to-r from-[#F5820D] to-[#E0821F] text-white uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-orange-950/40"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>SIGN IN</span>
                    </Link>
                    <Link
                      href="/auth/select"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-2 rounded-xl text-center text-xs font-bold bg-white/[0.08] hover:bg-white/[0.14] text-white uppercase tracking-wider border border-white/10 block"
                    >
                      <span>REGISTER NEW ACCOUNT</span>
                    </Link>
                  </Show>

                  <Show when="signed-in">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.05] border border-white/10">
                      <span className="text-xs text-blue-200">Your Account</span>
                      <UserButton />
                    </div>
                  </Show>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-300">
                  <span>System Status</span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Clerk Auth Active
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ============================================================
          INTERACTIVE NAV MODALS
          ============================================================ */}

      {/* 1. Crop Advisory Modal */}
      {activeModal === 'crop-advisory' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-2xl w-full rounded-3xl bg-[#0B152E] border border-emerald-500/40 p-6 sm:p-8 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200 text-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-black text-xl text-white">Seasonal Crop Advisory (महाराष्ट्र)</h3>
                  <p className="text-xs font-mono text-emerald-400">Scientific agronomy benchmarks for Western Maharashtra</p>
                </div>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              {[
                {
                  crop: 'Soybean (JS 335 / KDS 726)',
                  stage: 'Pod Development (शेंगा भरणे)',
                  advisory: 'Apply 200 L/acre Liquid Jeevamrut via drip. Spray 5% Neem seed kernel extract (NSKE) to prevent spodoptera caterpillar damage.',
                  status: 'Crucial Stage',
                  tagColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                },
                {
                  crop: 'Sugarcane (Co 86032 / VSI 08005)',
                  stage: 'Grand Growth Phase (वाढ अवस्था)',
                  advisory: 'Maintain root-zone moisture between 40-50%. Earthing-up recommended with Trichoderma viride enriched farmyard manure.',
                  status: 'Water Intensive',
                  tagColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                },
                {
                  crop: 'Pomegranate (Bhagwa Super)',
                  stage: 'Hasta Bahar Flowering (हस्त बहार)',
                  advisory: 'Regulate irrigation stress. Apply bio-potash and vermiwash. Strictly inspect for bacterial blight (Telya) symptoms.',
                  status: 'High Export Value',
                  tagColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-base">{item.crop}</h4>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${item.tagColor}`}>
                      {item.status}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-blue-300 block">{item.stage}</span>
                  <p className="text-xs font-sans text-slate-300 leading-relaxed">{item.advisory}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Accredited by MPKV Rahuri & ICAR</span>
              <Link
                href="/farmer/dashboard"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all flex items-center gap-1.5"
              >
                <span>Open in Farm OS</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 2. APMC Mandi Rates Modal */}
      {activeModal === 'market-rates' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-2xl w-full rounded-3xl bg-[#0B152E] border border-orange-500/40 p-6 sm:p-8 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200 text-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-black text-xl text-white">Live APMC Mandi Benchmarks (बाजारभाव)</h3>
                  <p className="text-xs font-mono text-orange-400">Real-time daily trade prices across Maharashtra APMC yards</p>
                </div>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="rounded-2xl border border-white/10 overflow-hidden font-mono text-xs">
              <table className="w-full text-left">
                <thead className="bg-white/[0.04] border-b border-white/10 text-slate-400">
                  <tr>
                    <th className="py-3 px-4 uppercase font-semibold">Commodity (पीक)</th>
                    <th className="py-3 px-4 uppercase font-semibold">APMC Yard</th>
                    <th className="py-3 px-4 uppercase font-semibold">Modal Price</th>
                    <th className="py-3 px-4 uppercase font-semibold text-right">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {[
                    { crop: 'Soybean (सोयाबीन)', yard: 'Baramati APMC', price: '₹5,200 / Q', trend: '+₹80', positive: true },
                    { crop: 'Nashik Red Onion (कांदा)', yard: 'Lasalgaon APMC', price: '₹2,400 / Q', trend: '+₹120', positive: true },
                    { crop: 'Bhagwa Pomegranate (डाळिंब)', yard: 'Pune APMC', price: '₹135 / kg', trend: '+₹15', positive: true },
                    { crop: 'Wheat Sharbati (गहू)', yard: 'Solapur APMC', price: '₹2,850 / Q', trend: 'Stable', positive: true },
                    { crop: 'Sugarcane FRP (ऊस)', yard: 'Baramati Co-op', price: '₹3,400 / Ton', trend: 'Fixed FRP', positive: true },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-bold text-white">{row.crop}</td>
                      <td className="py-3 px-4 text-slate-400">{row.yard}</td>
                      <td className="py-3 px-4 font-black text-emerald-400 text-sm">{row.price}</td>
                      <td className="py-3 px-4 text-right">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                          {row.trend}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Updated: Today, 11:30 AM IST</span>
              <Link
                href="/farmer/marketplace"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold transition-all flex items-center gap-1.5"
              >
                <span>Trade in Marketplace</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 3. Weather & Soil Telemetry Modal */}
      {activeModal === 'weather' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-2xl w-full rounded-3xl bg-[#0B152E] border border-blue-500/40 p-6 sm:p-8 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200 text-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <CloudSun className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-black text-xl text-white">Baramati Agro-Meteorology & Soil</h3>
                  <p className="text-xs font-mono text-blue-400">Micro-climate station & LoRaWAN soil moisture array</p>
                </div>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-slate-400">Air Temperature</span>
                <span className="text-2xl font-black text-white block">28.4°C</span>
                <span className="text-emerald-400 text-[10px]">Optimal for Sowing</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-slate-400">Relative Humidity</span>
                <span className="text-2xl font-black text-blue-300 block">54%</span>
                <span className="text-slate-400 text-[10px]">Dew Point: 18°C</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-slate-400">Avg Soil Moisture</span>
                <span className="text-2xl font-black text-emerald-400 block">42%</span>
                <span className="text-emerald-300 text-[10px]">Target: 35-55%</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-slate-400">Rain Probability</span>
                <span className="text-2xl font-black text-white block">5%</span>
                <span className="text-emerald-400 text-[10px]">Safe for Bio-Spraying</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 text-xs font-sans text-slate-300">
              <span className="font-bold text-white block">5-Day Agro-Meteorological Forecast:</span>
              <p className="leading-relaxed">
                Clear skies with mild easterly breeze (8-12 km/h). Evapotranspiration index projected at 4.2 mm/day. Ideal window for biological Jeevamrut fertigation and light tractor cultivation.
              </p>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Sensor Array MS-042 Online (LoRaWAN)</span>
              <Link
                href="/farmer/soil"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all flex items-center gap-1.5"
              >
                <span>View Soil Assay</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 4. Government Schemes Directory Modal */}
      {activeModal === 'schemes' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-2xl w-full rounded-3xl bg-[#0B152E] border border-amber-500/40 p-6 sm:p-8 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200 text-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-black text-xl text-white">Government Subsidies & Schemes (शासकीय योजना)</h3>
                  <p className="text-xs font-mono text-amber-400">Central & Maharashtra state agricultural benefit programs</p>
                </div>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 font-sans text-xs">
              {[
                {
                  title: 'PM-Kisan Samman Nidhi Yojana',
                  benefit: '₹6,000 / year direct benefit transfer (DBT)',
                  criteria: 'All landholding farmer families with valid Aadhaar & 7/12 land records.',
                  status: 'Active',
                },
                {
                  title: 'Kisan Credit Card (KCC) Subsidized Working Capital',
                  benefit: 'Loan up to ₹3,00,000 at 4.0% effective interest rate',
                  criteria: '3% prompt repayment incentive. No collateral required up to ₹1,60,000.',
                  status: 'Eligible',
                },
                {
                  title: 'Agriculture Infrastructure Fund (AIF)',
                  benefit: '3.0% interest subvention for solar pumps & post-harvest cold storage',
                  criteria: 'Available for individual cultivators, FPOs, and PACS.',
                  status: 'Open',
                },
                {
                  title: 'MahaDBT Nanaji Deshmukh Krishi Sanjeevani (PoCRA)',
                  benefit: 'Up to 75% subsidy on drip irrigation, farm ponds & organic compost units',
                  criteria: 'Farmers in drought-prone villages of Maharashtra.',
                  status: 'Enrolling',
                },
              ].map((s, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-sm">{s.title}</h4>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono text-[10px] font-bold">
                      {s.status}
                    </span>
                  </div>
                  <span className="text-amber-300 font-mono font-bold block">{s.benefit}</span>
                  <p className="text-slate-400 leading-relaxed">{s.criteria}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Integrated with MahaDBT & PM-Kisan Portal</span>
              <Link
                href="/farmer/finance"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold transition-all flex items-center gap-1.5"
              >
                <span>Apply via Consent Manager</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 5. Platform Settings & Preferences Drawer */}
      {activeModal === 'settings' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-3xl bg-[#0B152E] border border-white/20 p-6 sm:p-8 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200 text-slate-100">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-blue-200">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-black text-xl text-white">Platform Settings</h3>
                  <p className="text-xs font-mono text-slate-400">Visual accent, language & notification controls</p>
                </div>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2.5">
                <span className="text-slate-300 font-bold block flex items-center gap-2">
                  <Globe className="w-4 h-4 text-orange-400" />
                  <span>Platform Regional Language (भाषा)</span>
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedLanguage('mr')}
                    className={`py-2 px-3 rounded-xl border text-center transition-all ${
                      selectedLanguage === 'mr'
                        ? 'bg-orange-500/20 border-orange-500 text-orange-300 font-bold'
                        : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    मराठी (महाराष्ट्र)
                  </button>
                  <button
                    onClick={() => setSelectedLanguage('en')}
                    className={`py-2 px-3 rounded-xl border text-center transition-all ${
                      selectedLanguage === 'en'
                        ? 'bg-orange-500/20 border-orange-500 text-orange-300 font-bold'
                        : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    English (Standard)
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2.5">
                <span className="text-slate-300 font-bold block flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
                  <span>Dot-Matrix Canvas Theme</span>
                </span>
                <p className="text-[11px] font-sans text-slate-400">
                  Click the button below to cycle active background particle luminescence.
                </p>
                <button
                  onClick={() => {
                    if (onSettingsClick) onSettingsClick()
                  }}
                  className="w-full py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/10 font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  <span>Cycle Theme Accent Color</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-blue-400" />
                  <span>Soil Moisture Audio Warning Chimes</span>
                </div>
                <button
                  onClick={() => setAudioAlerts(!audioAlerts)}
                  className={`w-11 h-6 rounded-full transition-colors relative p-1 ${
                    audioAlerts ? 'bg-emerald-600' : 'bg-white/10'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white block transition-transform ${
                    audioAlerts ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-xs uppercase transition-all shadow-lg shadow-orange-950/50"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
