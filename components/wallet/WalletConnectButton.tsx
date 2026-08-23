'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useWallet, MidnightNetwork } from '@/lib/walletContext'
import { 
  Shield, 
  ChevronDown, 
  LogOut, 
  Copy, 
  Check, 
  Sparkles, 
  ExternalLink, 
  Radio, 
  Loader2,
  Lock,
  Key
} from 'lucide-react'

export function WalletConnectButton() {
  const { 
    isConnected, 
    isConnecting, 
    address, 
    walletType, 
    walletStatus, 
    network, 
    isDustSponsored, 
    isSimulated,
    connect, 
    disconnect, 
    switchNetwork 
  } = useWallet()

  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (isConnecting) {
    return (
      <button 
        disabled
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#1E3A8A]/50 border border-portal-orange/40 text-portal-orange text-xs font-mono font-bold animate-pulse shadow-md"
      >
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
        <span>Connecting 1AM...</span>
      </button>
    )
  }

  if (!isConnected) {
    return (
      <button
        onClick={() => connect('preprod')}
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#152A63] to-[#1E3A8A] hover:from-[#1E3A8A] hover:to-portal-orange/80 border border-portal-orange text-white text-xs font-mono font-bold transition-all shadow-md group hover:scale-[1.02]"
        title="Connect Midnight 1AM Wallet for Dust-Free ZK Proof Transactions"
      >
        <Shield className="w-3.5 h-3.5 text-portal-orange group-hover:rotate-12 transition-transform" />
        <span>Connect 1AM Wallet</span>
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-portal-orange/20 text-portal-orange font-bold">
          0 Gas
        </span>
      </button>
    )
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#101420] border border-portal-orange/60 hover:border-portal-orange text-white text-xs font-mono transition-all shadow-md group"
      >
        <div className="w-2 h-2 rounded-full bg-portal-green animate-pulse"></div>
        <div className="flex items-center gap-1">
          <span className="text-portal-orange font-bold">1AM:</span>
          <span className="truncate max-w-[90px] sm:max-w-[120px]">{address}</span>
        </div>
        <span className="hidden sm:inline px-1.5 py-0.2 rounded bg-portal-green/20 text-portal-green text-[9px] font-bold uppercase">
          {network}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors" />
      </button>

      {/* DROPDOWN MENU */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-[#141826] border-2 border-portal-orange/40 rounded-xl shadow-2xl p-4 z-50 space-y-3 animate-in fade-in zoom-in-95 duration-100 text-xs font-mono">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-700 pb-2">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-portal-orange" />
              <span className="font-bold text-white uppercase text-[11px]">
                {walletType === '1am' ? '1AM Wallet (Midnight)' : walletType === 'lace' ? 'Lace Wallet (Midnight)' : '1AM Enclave (Preprod)'}
              </span>
            </div>
            {isDustSponsored && (
              <span className="px-1.5 py-0.5 rounded bg-portal-green/20 text-portal-green text-[9px] font-bold">
                Dust-Free ✓
              </span>
            )}
          </div>

          {/* Address & Copy */}
          <div className="p-2.5 rounded-lg bg-[#101420] border border-neutral-700 space-y-1">
            <span className="text-[10px] text-neutral-400 uppercase font-bold block">Unshielded Address:</span>
            <div className="flex items-center justify-between gap-1 text-portal-orange text-[11px]">
              <span className="truncate font-semibold">{address}</span>
              <button
                onClick={handleCopy}
                className="p-1 hover:text-white text-neutral-400 transition-colors"
                title="Copy Address"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-portal-green" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Network Selection */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-neutral-400 uppercase font-bold block">Active Midnight Network:</span>
            <div className="grid grid-cols-3 gap-1.5">
              {(['preprod', 'preview', 'mainnet'] as MidnightNetwork[]).map((net) => (
                <button
                  key={net}
                  onClick={() => switchNetwork(net)}
                  className={`px-2 py-1.5 rounded text-[10px] font-bold uppercase transition-all ${
                    network === net
                      ? 'bg-portal-orange text-white shadow-sm'
                      : 'bg-[#101420] text-neutral-300 hover:text-white border border-neutral-700'
                  }`}
                >
                  {net}
                </button>
              ))}
            </div>
          </div>

          {/* Features Checklist */}
          <div className="p-2 rounded bg-[#101420]/80 border border-neutral-800 text-[10px] text-neutral-300 space-y-1">
            <div className="flex items-center gap-1.5 text-portal-green">
              <Sparkles className="w-3 h-3" />
              <span>Zero-Gas Sponsored via ProofStation</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-300">
              <Lock className="w-3 h-3 text-portal-orange" />
              <span>Client-Side ZK Prover Ready</span>
            </div>
          </div>

          {/* Disconnect CTA */}
          <button
            onClick={() => {
              disconnect()
              setIsOpen(false)
            }}
            className="w-full py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-[11px] font-bold transition-all flex items-center justify-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Disconnect Wallet</span>
          </button>
        </div>
      )}
    </div>
  )
}
