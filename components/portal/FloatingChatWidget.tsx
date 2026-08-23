'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { MessageSquare, X, Bot, ArrowRight } from 'lucide-react'

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Popover Bubble */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white text-neutral-900 rounded-2xl shadow-portal-elevated border border-neutral-200 p-4 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
            <div className="flex items-center gap-2 text-portal-blue font-bold text-xs">
              <Bot className="w-4 h-4 text-portal-orange" />
              <span>Nexora AI Virtual Assistant</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-neutral-700 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-neutral-600 font-sans leading-relaxed">
            Need help finding a certified physician, verifying your government health scheme eligibility, or registering your account?
          </p>

          <Link
            href="/dashboard/agents"
            onClick={() => setIsOpen(false)}
            className="w-full py-2.5 rounded-lg bg-portal-orange hover:bg-[#e07507] text-white font-bold text-xs font-sans flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <span>Launch Multi-Agent Assistant</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Floating Orange Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-portal-orange hover:bg-[#e07507] text-white shadow-glow-orange flex items-center justify-center transition-all hover:scale-105"
        aria-label="Open Nexora Chat Assistant"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6 fill-current" />}
      </button>
    </div>
  )
}
