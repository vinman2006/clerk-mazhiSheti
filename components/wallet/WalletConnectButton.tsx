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
  Loader2,
  Lock
} from 'lucide-react'

export function WalletConnectButton() {
  const { 
    isConnected, 
    isConnecting, 
    address, 
    walletType, 
    network, 
    isDustSponsored, 
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
        className="flex items-center gap-2 px-3 py-1.5 rounded bg-amber-50 border border-[#F5821F] text-[#D66D10] text-xs font-bold animate-pulse"
      >
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
        <span>Connecting 1AM (Localnet)...</span>
      </button>
    )
  }

  if (!isConnected) {
    return (
      <button
        onClick={() => connect('localnet')}
        className="flex items-center gap-2 px-3.5 py-1.5 rounded bg-white hover:bg-neutral-50 border border-[#0B3D91] text-[#0B3D91] text-xs font-bold transition-all shadow-sm group"
        title="Connect Midnight 1AM Wallet on Localnet"
      >
        <Shield className="w-3.5 h-3.5 text-[#F5821F]" />
        <span>Connect 1AM</span>
        <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#FFF5EB] text-[#D66D10] font-bold border border-[#F5821F]/30">
          Localnet
        </span>
      </button>
    )
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded bg-white border border-[#CBD5E1] hover:border-[#0B3D91] text-[#1A1A1A] text-xs font-medium transition-all shadow-sm group"
      >
        <div className="w-2 h-2 rounded-full bg-[#1E7A34] animate-pulse"></div>
        <div className="flex items-center gap-1 font-mono text-[11px]">
          <span className="text-[#0B3D91] font-bold">1AM:</span>
          <span className="truncate max-w-[90px] sm:max-w-[120px]">{address}</span>
        </div>
        <span className={`hidden sm:inline px-1.5 py-0.2 rounded text-[9px] font-bold uppercase border ${
          network === 'localnet' 
            ? 'bg-green-100 text-green-800 border-green-300'
            : 'bg-neutral-100 text-neutral-800 border-neutral-300'
        }`}>
          {network}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-700 transition-colors" />
      </button>

      {/* DROPDOWN MENU */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-[#CBD5E1] rounded-lg shadow-xl p-4 z-50 space-y-3 animate-in fade-in zoom-in-95 duration-100 text-xs font-sans text-[#1A1A1A]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#0B3D91]" />
              <span className="font-bold text-[#0B3D91] uppercase text-[11px]">
                {walletType === '1am' ? '1AM Wallet (Midnight)' : walletType === 'lace' ? 'Lace Wallet (Midnight)' : `1AM Enclave (${network})`}
              </span>
            </div>
            {isDustSponsored && (
              <span className="px-1.5 py-0.5 rounded bg-green-100 text-green-800 text-[9px] font-bold border border-green-200">
                Dust-Free ✓
              </span>
            )}
          </div>

          {/* Address & Copy */}
          <div className="p-2.5 rounded bg-[#F8FAFC] border border-[#CBD5E1] space-y-1">
            <span className="text-[10px] text-neutral-500 uppercase font-bold block">Unshielded Address:</span>
            <div className="flex items-center justify-between gap-1 text-[#0B3D91] font-mono text-[11px]">
              <span className="truncate font-semibold">{address}</span>
              <button
                onClick={handleCopy}
                className="p-1 hover:text-neutral-900 text-neutral-500 transition-colors"
                title="Copy Address"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#1E7A34]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Network Selection */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-neutral-500 uppercase font-bold block">Active Midnight Network:</span>
            <div className="grid grid-cols-2 gap-1.5">
              {(['localnet', 'preprod', 'preview', 'mainnet'] as MidnightNetwork[]).map((net) => (
                <button
                  key={net}
                  onClick={() => switchNetwork(net)}
                  className={`px-2 py-1.5 rounded text-[10px] font-bold uppercase transition-all ${
                    network === net
                      ? 'bg-[#0B3D91] text-white shadow-sm font-black'
                      : 'bg-[#F8FAFC] text-neutral-700 hover:bg-neutral-100 border border-[#CBD5E1]'
                  }`}
                >
                  {net}
                </button>
              ))}
            </div>
          </div>

          {/* Features Checklist */}
          <div className="p-2 rounded bg-neutral-50 border border-neutral-200 text-[10px] text-neutral-600 space-y-1">
            <div className="flex items-center gap-1.5 text-[#1E7A34] font-semibold">
              <Sparkles className="w-3 h-3" />
              <span>RPC: {network === 'localnet' ? 'http://localhost:9944' : 'Midnight Cloud RPC'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-700">
              <Lock className="w-3 h-3 text-[#F5821F]" />
              <span>Proof Server: {network === 'localnet' ? 'http://localhost:6300' : 'Remote Prover'}</span>
            </div>
          </div>

          {/* Disconnect CTA */}
          <button
            onClick={() => {
              disconnect()
              setIsOpen(false)
            }}
            className="w-full py-2 rounded bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-[11px] font-bold transition-all flex items-center justify-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Disconnect Wallet</span>
          </button>
        </div>
      )}
    </div>
  )
}

