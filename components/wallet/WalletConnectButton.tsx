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
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-nexora-bg-elevated border border-nexora-orange-500/40 text-nexora-orange-400 text-xs font-mono font-bold animate-pulse shadow-md"
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
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-nexora-bg-elevated hover:bg-nexora-bg-elevated-2 border border-nexora-border-strong hover:border-nexora-orange-500 text-nexora-text-primary text-xs font-mono font-bold transition-all shadow-md group hover:scale-[1.02]"
        title="Connect Midnight 1AM Wallet on Localnet (Undeployed Docker Stack / Local Devnet)"
      >
        <Shield className="w-3.5 h-3.5 text-nexora-orange-400 group-hover:rotate-12 transition-transform" />
        <span>Connect 1AM Wallet</span>
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[rgba(224,130,31,0.12)] text-nexora-orange-400 font-bold border border-nexora-orange-500/30">
          Localnet
        </span>
      </button>
    )
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-nexora-bg-elevated border border-nexora-border-strong hover:border-nexora-steel-400 text-nexora-text-primary text-xs font-mono transition-all shadow-md group"
      >
        <div className="w-2 h-2 rounded-full bg-nexora-green-status animate-pulse"></div>
        <div className="flex items-center gap-1">
          <span className="text-nexora-orange-400 font-bold">1AM:</span>
          <span className="truncate max-w-[90px] sm:max-w-[120px]">{address}</span>
        </div>
        <span className={`hidden sm:inline px-1.5 py-0.2 rounded text-[9px] font-bold uppercase border ${
          network === 'localnet' 
            ? 'bg-nexora-green-status/15 text-nexora-green-status border-nexora-green-status/30'
            : 'bg-nexora-steel-700/40 text-nexora-steel-300 border-nexora-steel-500/40'
        }`}>
          {network}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-nexora-text-muted group-hover:text-white transition-colors" />
      </button>

      {/* DROPDOWN MENU */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-nexora-bg-elevated border border-nexora-border-strong rounded-xl shadow-2xl p-4 z-50 space-y-3 animate-in fade-in zoom-in-95 duration-100 text-xs font-mono">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-nexora-border-subtle pb-2">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-nexora-orange-400" />
              <span className="font-bold text-nexora-text-primary uppercase text-[11px]">
                {walletType === '1am' ? '1AM Wallet (Midnight)' : walletType === 'lace' ? 'Lace Wallet (Midnight)' : `1AM Enclave (${network})`}
              </span>
            </div>
            {isDustSponsored && (
              <span className="px-1.5 py-0.5 rounded bg-nexora-green-status/15 text-nexora-green-status text-[9px] font-bold border border-nexora-green-status/30">
                Dust-Free ✓
              </span>
            )}
          </div>

          {/* Address & Copy */}
          <div className="p-2.5 rounded-lg bg-nexora-bg-elevated-2 border border-nexora-border-subtle space-y-1">
            <span className="text-[10px] text-nexora-text-muted uppercase font-bold block">Unshielded Address:</span>
            <div className="flex items-center justify-between gap-1 text-nexora-orange-400 text-[11px]">
              <span className="truncate font-semibold">{address}</span>
              <button
                onClick={handleCopy}
                className="p-1 hover:text-white text-nexora-text-muted transition-colors"
                title="Copy Address"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-nexora-green-status" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Network Selection */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-nexora-text-muted uppercase font-bold block">Active Midnight Network:</span>
            <div className="grid grid-cols-2 gap-1.5">
              {(['localnet', 'preprod', 'preview', 'mainnet'] as MidnightNetwork[]).map((net) => (
                <button
                  key={net}
                  onClick={() => switchNetwork(net)}
                  className={`px-2 py-1.5 rounded text-[10px] font-bold uppercase transition-all ${
                    network === net
                      ? 'bg-nexora-orange-500 text-nexora-text-on-orange shadow-sm font-black'
                      : 'bg-nexora-bg-elevated-2 text-nexora-text-secondary hover:text-white border border-nexora-border-subtle'
                  }`}
                >
                  {net}
                </button>
              ))}
            </div>
          </div>

          {/* Features Checklist */}
          <div className="p-2 rounded bg-nexora-bg-surface/80 border border-nexora-border-subtle text-[10px] text-nexora-text-secondary space-y-1">
            <div className="flex items-center gap-1.5 text-nexora-green-status">
              <Sparkles className="w-3 h-3" />
              <span>RPC: {network === 'localnet' ? 'http://localhost:9944' : 'Midnight Cloud RPC'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-nexora-steel-300">
              <Lock className="w-3 h-3 text-nexora-orange-400" />
              <span>Proof Server: {network === 'localnet' ? 'http://localhost:6300' : 'Remote Prover'}</span>
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
