'use client'

import React, { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'
import { RotateCcw, AlertTriangle } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error, {
      tags: { layer: 'global_root_boundary' },
    })
  }, [error])

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#070B16] text-white flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="max-w-md w-full p-8 rounded-3xl bg-[#0B152E]/90 border border-white/10 shadow-2xl space-y-6">
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white">System Encountered a Critical Error</h2>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              We encountered a root level exception. The incident has been forwarded to operational monitoring.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => reset()}
              className="px-5 py-2.5 rounded-xl bg-[#22A567] hover:bg-[#1b8552] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reload Application</span>
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
