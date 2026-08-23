import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { NexoraLogo } from '@/components/ui/NexoraLogo'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0D1B4C] flex flex-col items-center justify-center p-4 text-center">
      <div className="mb-6">
        <NexoraLogo size={64} showText={true} showBadge={true} subtitle="Zero-Trust Sovereign Network" />
      </div>
      <h2 className="text-3xl font-display font-black text-white mb-2">Page Not Found</h2>
      <p className="text-neutral-300 text-sm max-w-md mb-6 font-sans">
        The requested resource or secure record could not be found on the Nexora ledger.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-portal-orange hover:bg-[#e07507] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>
    </div>
  )
}
