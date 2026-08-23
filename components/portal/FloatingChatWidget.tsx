'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { MessageSquare, X, Bot, ArrowRight, Send, Loader2, Sparkles, ShieldCheck } from 'lucide-react'

interface Message {
  id: string
  sender: 'user' | 'agent'
  text: string
  time: string
}

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'agent',
      text: 'Namaste! I am your Nexora AI Health Assistant. How can I assist you today with doctor appointments, ZK subsidies, or encrypted health records?',
      time: 'Just now'
    }
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickPrompts = [
    'How do ZK health subsidies work?',
    'Find a cardiologist',
    'How do I encrypt my medical scans?'
  ]

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input
    if (!query.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Intelligent context response generator
    setTimeout(() => {
      let reply = "I can help with that! You can manage this directly in your Nexora Sovereign Patient Dashboard."
      const lower = query.toLowerCase()

      if (lower.includes('zk') || lower.includes('subsid') || lower.includes('scheme') || lower.includes('cardio')) {
        reply = "Zero-Knowledge subsidies verify your eligibility (e.g. age, district, income brackets) cryptographically without exposing your private financial or tax records on-chain. Check out our 'Gov Health Schemes' tab to generate a proof!"
      } else if (lower.includes('doctor') || lower.includes('cardio') || lower.includes('neuro') || lower.includes('book') || lower.includes('find')) {
        reply = "We have verified specialists available including Dr. Sarah Al-Mansoor (Cardiology) and Dr. Julian Thorne (Neurology). You can book a direct consultation with time-scoped smart consent in the 'Find Care' section."
      } else if (lower.includes('encrypt') || lower.includes('scan') || lower.includes('record') || lower.includes('ipfs')) {
        reply = "All diagnostic scans are encrypted client-side using AES-GCM-256 before being pinned to decentralized IPFS. Only parties holding an active smart consent token can decrypt the payload."
      } else if (lower.includes('consent') || lower.includes('revoke')) {
        reply = "Your smart consent contracts are 100% sovereign. You can grant temporary access tokens (24h to 30d) and revoke them on-chain with a single click at any time."
      }

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'agent',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
      setIsTyping(false)
    }, 650)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Popover Bubble */}
      {isOpen && (
        <div className="mb-3 w-88 sm:w-96 bg-[#141826] text-white rounded-2xl shadow-2xl border-2 border-[#1E3A8A] overflow-hidden flex flex-col h-[460px] animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-[#152A63] to-[#101420] border-b border-neutral-700 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-portal-orange/20 border border-portal-orange/40 flex items-center justify-center text-portal-orange">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <span className="font-display font-black text-xs block text-white">Nexora AI Health Assistant</span>
                <span className="text-[10px] font-mono text-portal-green flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-portal-green animate-pulse"></span>
                  Active Sovereign Enclave
                </span>
              </div>
            </div>
            <button 
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white p-1 rounded hover:bg-white/10"
              aria-label="Close Chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs font-sans">
            {messages.map(m => (
              <div 
                key={m.id} 
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3 rounded-xl leading-relaxed shadow-md ${
                    m.sender === 'user' 
                      ? 'bg-portal-orange text-white rounded-tr-none' 
                      : 'bg-[#101420] text-neutral-200 border border-neutral-700 rounded-tl-none'
                  }`}
                >
                  <p>{m.text}</p>
                  <span className="block text-[9px] opacity-70 mt-1 font-mono text-right">
                    {m.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-portal-orange font-mono text-[11px] p-2 bg-[#101420] rounded-lg border border-neutral-700 w-fit">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Agent analyzing query...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-[#101420] border-t border-neutral-800 flex items-center gap-1.5 overflow-x-auto text-[10px] font-mono">
            {quickPrompts.map(p => (
              <button
                type="button"
                key={p}
                onClick={() => handleSend(p)}
                className="whitespace-nowrap px-2 py-1 rounded bg-[#182033] hover:bg-portal-orange hover:text-white text-neutral-300 border border-neutral-700 transition-all"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-[#0D1B4C] border-t border-neutral-700 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about health, doctors, ZK..."
              className="flex-1 px-3 py-2 rounded-lg bg-[#101420] border border-neutral-700 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-portal-orange"
            />
            <button
              type="button"
              onClick={() => handleSend()}
              className="p-2 rounded-lg bg-portal-orange hover:bg-[#e07507] text-white transition-all shadow-md shrink-0"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Orange Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-portal-orange hover:bg-[#e07507] text-white shadow-glow-orange flex items-center justify-center transition-all hover:scale-105"
        aria-label="Open Nexora Chat Assistant"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6 fill-current" />}
      </button>
    </div>
  )
}
