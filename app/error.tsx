'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { RotateCcw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application Error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#070A10] text-white flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="max-w-md w-full p-8 rounded-2xl bg-[#0D1322] border border-white/10 shadow-2xl space-y-6">
        <h2 className="text-2xl font-display font-black text-white">Something went wrong</h2>
        <p className="text-xs text-neutral-400 font-mono">
          {error.message || 'An unexpected error occurred while executing the transaction.'}
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 rounded-xl bg-nexora-green-status hover:bg-[#1b8552] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
