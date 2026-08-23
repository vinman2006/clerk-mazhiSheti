'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Building2, 
  Cpu, 
  ShieldCheck, 
  Activity, 
  Lock, 
  Play, 
  CheckCircle2, 
  BarChart3, 
  AlertCircle, 
  ArrowLeft, 
  RefreshCw, 
  Sparkles, 
  Info 
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts'
import { FEDERATED_LEARNING_METRICS } from '@/lib/mockData'
import { NodeDiagram } from '@/components/diagrams/NodeDiagram'
import { SimulatedBadge } from '@/components/ui/SimulatedBadge'
import { useAuth } from '@/lib/authContext'

export default function HospitalAiTrainingPage() {
  const { user } = useAuth()
  const [participating, setParticipating] = useState(true)
  const [isTrainingRound, setIsTrainingRound] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [progress, setProgress] = useState(78)

  const handleTriggerTraining = () => {
    setIsTrainingRound(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          setIsTrainingRound(false)
          return 100
        }
        return p + 20
      })
    }, 400)
  }

  return (
    <div className="min-h-screen bg-[#0B0E17] text-white p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-xl bg-[#141826] border-2 border-[#1E3A8A] shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="text-xs font-mono font-bold text-portal-orange hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Patient View</span>
            </Link>
            <span className="text-neutral-500">•</span>
            <span className="text-xs font-mono font-bold text-blue-300">Hospital Admin Enclave</span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
              Federated Learning & Edge AI Node
            </h1>
            <SimulatedBadge />
          </div>

          <p className="text-xs font-sans text-neutral-300">
            City Care & Apex Node #01 • Local Model Training Engine (Zero PHI Exfiltration)
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Participate Toggle */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-[#101420] border border-neutral-700 relative">
            <div className="text-left">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-white">
                <span>Federated Node:</span>
                <span className={participating ? 'text-portal-green' : 'text-red-400'}>
                  {participating ? 'ONLINE ✓' : 'PAUSED'}
                </span>
                <button 
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className="text-neutral-400 hover:text-portal-orange"
                >
                  <Info className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </div>

            <button
              onClick={() => setParticipating(!participating)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                participating ? 'bg-[#2E7D32]' : 'bg-neutral-700'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                participating ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>

            {showTooltip && (
              <div className="absolute right-0 top-full mt-2 w-72 p-3 rounded-lg bg-[#141826] border border-neutral-700 border-l-4 border-l-portal-green text-[11px] font-sans text-neutral-300 shadow-2xl z-50">
                🔒 <strong className="text-white">Privacy Guarantee:</strong> Raw patient data never leaves this hospital firewall. Only mathematical gradient weights are transmitted.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TRAINING STATUS & LOCAL METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#141826] border border-neutral-700 border-l-4 border-l-portal-orange shadow-md">
          <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase block">Current Global Model:</span>
          <span className="font-mono text-lg font-bold text-portal-orange">CardiacEvent-v3.2</span>
          <span className="text-[11px] text-neutral-300 font-sans block mt-1">SMPC Aggregated Tensor</span>
        </div>

        <div className="p-4 rounded-xl bg-[#141826] border border-neutral-700 border-l-4 border-l-portal-green shadow-md">
          <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase block">Global Test Accuracy:</span>
          <span className="font-mono text-lg font-bold text-portal-green">96.7%</span>
          <span className="text-[11px] text-portal-green font-mono font-bold block mt-1">+1.8% over Round #135 ✓</span>
        </div>

        <div className="p-4 rounded-xl bg-[#141826] border border-neutral-700 border-l-4 border-l-portal-blue shadow-md">
          <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase block">Participating Hospitals:</span>
          <span className="font-mono text-lg font-bold text-blue-300">26 Nodes</span>
          <span className="text-[11px] text-neutral-300 font-sans block mt-1">Across 4 health networks</span>
        </div>

        <div className="p-4 rounded-xl bg-[#141826] border border-neutral-700 border-l-4 border-l-purple-500 shadow-md">
          <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase block">Local Loss Value:</span>
          <span className="font-mono text-lg font-bold text-purple-300">0.112</span>
          <span className="text-[11px] text-neutral-300 font-sans block mt-1">Converged at epoch 40</span>
        </div>
      </div>

      {/* RECHARTS ACCURACY GRAPH & LOCAL COMPUTE STATUS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* RECHARTS CHART */}
        <div className="lg:col-span-2 p-6 rounded-xl bg-[#141826] border border-neutral-700 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-700 pb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-portal-orange" />
              <h2 className="font-display font-bold text-sm text-white">
                Federated Model Convergence (Accuracy & Loss)
              </h2>
            </div>
            <span className="text-xs font-mono font-bold text-neutral-400">Rounds #120 - #142</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={FEDERATED_LEARNING_METRICS} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#242A3D" opacity={0.6} />
                <XAxis dataKey="round" stroke="#8B93A8" fontSize={10} tickLine={false} />
                <YAxis domain={[80, 100]} stroke="#8B93A8" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#101420', borderColor: '#1E3A8A', borderRadius: '8px', fontSize: '11px', fontFamily: 'JetBrains Mono' }}
                  itemStyle={{ color: '#F4F6FB' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'JetBrains Mono' }} />
                <Line type="monotone" dataKey="globalAccuracy" name="Global Model Accuracy (%)" stroke="#F5820D" strokeWidth={2.5} dot={{ r: 3, fill: '#F5820D' }} />
                <Line type="monotone" dataKey="localAccuracy" name="Local Hospital Accuracy (%)" stroke="#2E7D32" strokeWidth={2} strokeDasharray="4 4" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* LOCAL NODE COMPUTE CONTROLS */}
        <div className="p-6 rounded-xl bg-[#141826] border border-neutral-700 border-l-4 border-l-portal-green space-y-5 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-portal-green font-mono font-bold text-xs border-b border-neutral-700 pb-3">
              <Cpu className="w-4 h-4" />
              <span>Local Training Worker</span>
            </div>

            <div className="space-y-2.5 text-xs font-sans text-neutral-300">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-neutral-400">Training Round:</span>
                <span className="text-white font-bold">Round #142 (Active)</span>
              </div>
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-neutral-400">Local Records Trained:</span>
                <span className="text-portal-orange font-bold">28,900 Records</span>
              </div>
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-neutral-400">Last Gradient Push:</span>
                <span className="text-neutral-300 font-semibold">2 hours ago</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-[11px] font-mono text-neutral-400">
                <span>Batch Sync Progress:</span>
                <span className="text-portal-green font-bold">{progress}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-[#101420] overflow-hidden border border-neutral-700">
                <div 
                  className="h-full bg-[#2E7D32] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleTriggerTraining}
            disabled={isTrainingRound || !participating}
            className="w-full py-3.5 rounded-lg bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md font-mono flex items-center justify-center gap-2 disabled:opacity-40"
          >
            {isTrainingRound ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isTrainingRound ? 'Computing Local Gradients...' : 'Run Local Training Round'}</span>
          </button>
        </div>
      </div>

      {/* GLOBAL FEDERATED NETWORK TOPOLOGY */}
      <div className="space-y-4">
        <div className="border-b border-neutral-700 pb-3 flex items-center justify-between">
          <h2 className="font-display font-black text-lg text-white">
            Federated Network Topology (Edge Gradient Sync)
          </h2>
          <span className="text-xs font-mono font-bold text-portal-green">Zero Raw Data In Transit ✓</span>
        </div>

        <NodeDiagram mode="federated-learning" />
      </div>
    </div>
  )
}
