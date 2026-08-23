import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { NexoraLogo } from '@/components/ui/NexoraLogo'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col items-center justify-center p-4 text-center text-[#1A1A1A]">
      <div className="mb-6">
        <NexoraLogo size={64} showText={true} showBadge={true} subtitle="Official Citizen Health Portal" />
      </div>
      <h2 className="text-3xl font-extrabold text-[#0B3D91] mb-2">404 - Page Not Found (पृष्ठ सापडले नाही)</h2>
      <p className="text-[#4B5563] text-sm max-w-md mb-6">
        The requested resource or secure record could not be found on the Nexora portal.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#1E7A34] hover:bg-[#145524] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home Portal</span>
      </Link>
    </div>
  )
}
