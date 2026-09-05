import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { MazhiShetiLogo } from '@/components/ui/MazhiShetiLogo'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070B16] flex flex-col items-center justify-center p-4 text-center">
      <div className="mb-6">
        <MazhiShetiLogo size={56} showText={true} showBadge={true} subtitle="SOVEREIGN AGRI PLATFORM" />
      </div>
      <h2 className="text-3xl font-display font-black text-white mb-2">Page Not Found</h2>
      <p className="text-slate-300 text-sm max-w-md mb-6 font-sans">
        The requested resource or page does not exist on the Mazhi Sheti platform.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>
    </div>
  )
}
