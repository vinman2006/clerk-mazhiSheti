'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Bot, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle, 
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sprout,
  Droplets
} from 'lucide-react'

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Namaskar Anandarao! I am your Mazhi Sheti AI Farming Assistant. I have authorized access to your farm's live context: Patil Krishi Farm (14.5 Acres, 4 Fields in Baramati, Pune). Your soil health score is currently 82/100, and Field 02 moisture is at 38%. How can I assist your farming operations today?",
      timestamp: '10:45 AM',
    },
  ])

  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userText = input
    const userMsg = {
      role: 'user',
      content: userText,
      timestamp: 'Just now',
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      let reply = "Based on your farm's live black cotton soil profile (pH 6.85, OC 0.82%), your current transition stage (Stage 3) recommends continuing organic carbon enrichment. For Field 02, soil moisture is at 38%, which is slightly below the 45% target for optimal soybean nodulation. Triggering your automated micro-sprinkler for 25 minutes will restore optimal root zone hydration without waterlogging."

      if (userText.toLowerCase().includes('urea') || userText.toLowerCase().includes('chemical')) {
        reply = "In your Stage 2 and 3 transition plan, chemical urea was successfully reduced by 40%. To replace synthetic nitrogen without losing crop vigor, apply 200 liters of enriched Jeevamrut per acre via drip fertigation, alongside seed treatment with Rhizobium culture. Note: High-impact chemical adjustments should always be verified with a certified agronomist."
      } else if (userText.toLowerCase().includes('moisture') || userText.toLowerCase().includes('water')) {
        reply = "Field 02 probe (MS-SOIL-PROBE-042) indicates 38% moisture. Since the soil is heavy clay black cotton, it has high water retention. Your auto-sprinkler threshold is configured for 35% minimum, meaning automated irrigation will trigger safely if dry conditions persist today."
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: reply,
          timestamp: 'Just now',
        },
      ])
      setIsTyping(false)
    }, 1200)
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 text-xs font-mono font-bold">
            <Bot className="w-3.5 h-3.5" />
            <span>CONTEXT-AWARE FARM INTELLIGENCE</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            AI Farming Assistant
          </h1>
          <p className="text-xs sm:text-sm font-sans text-blue-200/70">
            Authorized with real-time telemetry from your 4 fields, soil health scores, and 6-stage organic plan
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Safety Interlocks Active</span>
        </div>
      </div>

      {/* Suggested Inquiries */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {[
          'Which field needs immediate moisture attention?',
          'How can I replace synthetic urea in Field 02?',
          'What are the milestones for Organic Stage 4?',
        ].map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => setInput(prompt)}
            className="p-3 rounded-xl bg-[#0B152E]/90 border border-white/10 hover:border-purple-400/50 text-left text-xs font-sans text-blue-200 hover:text-white transition-all shadow-sm"
          >
            "{prompt}"
          </button>
        ))}
      </div>

      {/* Chat Thread Container */}
      <div className="rounded-3xl bg-[#0B152E]/90 border border-white/10 p-6 backdrop-blur-2xl shadow-2xl space-y-4 min-h-[460px] flex flex-col justify-between">
        
        <div className="space-y-4 overflow-y-auto max-h-[440px] pr-2">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-4 rounded-2xl max-w-xl text-xs sm:text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-sans'
                    : 'bg-white/[0.04] border border-white/10 text-blue-100 font-sans'
                }`}
              >
                {m.content}
                <span className="block text-[10px] text-blue-200/50 font-mono mt-2 text-right">
                  {m.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 pl-11">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span>Analyzing field telemetry & agronomic database...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="pt-3 border-t border-white/10 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your farm assistant about soil health, fertilizer rates, irrigation, or pest buffers..."
            className="flex-1 px-4 py-3 rounded-xl bg-[#081022] border border-white/10 text-white text-xs sm:text-sm focus:border-purple-400 focus:outline-none"
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-purple-950/50"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Ask Assistant</span>
          </button>
        </form>

      </div>

      {/* Safety Notice */}
      <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] font-mono text-blue-200/60 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-orange-400 shrink-0" />
        <span>Safety Advisory: This AI assistant uses authorized farm data and agricultural research. It does not replace on-site plant pathology or authorized agronomist inspections.</span>
      </div>

    </div>
  )
}
