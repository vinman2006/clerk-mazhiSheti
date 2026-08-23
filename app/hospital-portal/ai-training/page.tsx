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
    <div className="min-h-screen bg-[#F4F6F9] text-[#1A1A1A] p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-lg bg-white border border-[#E0E0E0] border-l-4 border-l-[#0B3D91] shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="text-xs font-bold text-[#0B3D91] hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Citizen View</span>
            </Link>
            <span className="text-neutral-400">•</span>
            <span className="text-xs font-bold text-[#0B3D91]">Hospital Admin Enclave</span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="font-extrabold text-2xl sm:text-3xl text-[#0B3D91]">
              Federated Clinical AI & Edge Learning Node (विकेंद्रित संशोधन नोड)
            </h1>
            <SimulatedBadge />
          </div>

          <p className="text-xs text-[#4B5563]">
            AIIMS & Apex Node #01 • Local Model Training Engine (Zero PHI Exfiltration)
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => {
              const weightsMeta = {
                modelArchitecture: 'DenseNet-121-CardiacEvent',
                modelVersion: '3.2.0',
                trainingProtocol: 'Federated Averaging (FedAvg) + ZK-SMPC',
                roundNumber: 142,
                convergedAccuracy: 0.967,
                loss: 0.112,
                participatingNodes: 26,
                aggregationProof: '0xzk_fedavg_grad_agg_9941a8b',
                exportedAt: new Date().toISOString()
              }
              const blob = new Blob([JSON.stringify(weightsMeta, null, 2)], { type: 'application/json' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'cardiac-event-v3.2-global-weights.json'
              a.click()
              URL.revokeObjectURL(url)
            }}
            className="px-3.5 py-2 rounded bg-white hover:bg-neutral-50 border border-[#CBD5E1] text-[#0B3D91] text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F5821F]" />
            <span>Export Model Weights</span>
          </button>

          {/* Participate Toggle */}
          <div className="flex items-center gap-3 p-2.5 rounded bg-[#F8FAFC] border border-[#CBD5E1] relative">
            <div className="text-left">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1A1A1A]">
                <span>Federated Node:</span>
                <span className={participating ? 'text-[#1E7A34]' : 'text-red-600'}>
                  {participating ? 'ONLINE ✓' : 'PAUSED'}
                </span>
                <button 
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className="text-neutral-400 hover:text-[#0B3D91]"
                >
                  <Info className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </div>

            <button
              onClick={() => setParticipating(!participating)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                participating ? 'bg-[#1E7A34]' : 'bg-neutral-400'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                participating ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>

            {showTooltip && (
              <div className="absolute right-0 top-full mt-2 w-72 p-3 rounded bg-white border border-[#CBD5E1] border-l-4 border-l-[#1E7A34] text-[11px] text-[#4B5563] shadow-xl z-50">
                🔒 <strong className="text-[#1A1A1A]">Privacy Guarantee:</strong> Raw patient data never leaves this hospital firewall. Only mathematical gradient weights are transmitted.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TRAINING STATUS & LOCAL METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-white border border-[#E0E0E0] border-t-4 border-t-[#0B3D91] shadow-sm">
          <span className="text-[10px] text-neutral-500 font-bold uppercase block">Current Global Model:</span>
          <span className="text-lg font-bold text-[#0B3D91]">CardiacEvent-v3.2</span>
          <span className="text-[11px] text-[#4B5563] block mt-1">SMPC Aggregated Tensor</span>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#E0E0E0] border-t-4 border-t-[#1E7A34] shadow-sm">
          <span className="text-[10px] text-neutral-500 font-bold uppercase block">Global Test Accuracy:</span>
          <span className="text-lg font-bold text-[#1E7A34]">96.7%</span>
          <span className="text-[11px] text-[#1E7A34] font-bold block mt-1">+1.8% over Round #135 ✓</span>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#E0E0E0] border-t-4 border-t-[#F5821F] shadow-sm">
          <span className="text-[10px] text-neutral-500 font-bold uppercase block">Participating Hospitals:</span>
          <span className="text-lg font-bold text-[#D66D10]">26 Nodes</span>
          <span className="text-[11px] text-[#4B5563] block mt-1">Across 4 health networks</span>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#E0E0E0] border-t-4 border-t-purple-600 shadow-sm">
          <span className="text-[10px] text-neutral-500 font-bold uppercase block">Local Loss Value:</span>
          <span className="text-lg font-bold text-purple-700">0.112</span>
          <span className="text-[11px] text-[#4B5563] block mt-1">Converged at epoch 40</span>
        </div>
      </div>

      {/* RECHARTS ACCURACY GRAPH & LOCAL COMPUTE STATUS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* RECHARTS CHART */}
        <div className="lg:col-span-2 p-6 rounded-lg bg-white border border-[#E0E0E0] space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#0B3D91]" />
              <h2 className="font-bold text-sm text-[#0B3D91]">
                Federated Model Convergence (Accuracy & Loss)
              </h2>
            </div>
            <span className="text-xs font-bold text-neutral-500">Rounds #120 - #142</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={FEDERATED_LEARNING_METRICS} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" opacity={0.8} />
                <XAxis dataKey="round" stroke="#64748B" fontSize={10} tickLine={false} />
                <YAxis domain={[80, 100]} stroke="#64748B" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#CBD5E1', borderRadius: '6px', fontSize: '11px', color: '#1A1A1A' }}
                  itemStyle={{ color: '#1A1A1A' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line type="monotone" dataKey="globalAccuracy" name="Global Model Accuracy (%)" stroke="#F5821F" strokeWidth={2.5} dot={{ r: 3, fill: '#F5821F' }} />
                <Line type="monotone" dataKey="localAccuracy" name="Local Hospital Accuracy (%)" stroke="#1E7A34" strokeWidth={2} strokeDasharray="4 4" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* LOCAL NODE COMPUTE CONTROLS */}
        <div className="p-6 rounded-lg bg-white border border-[#E0E0E0] border-l-4 border-l-[#1E7A34] space-y-5 flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#1E7A34] font-bold text-xs border-b border-neutral-100 pb-3">
              <Cpu className="w-4 h-4" />
              <span>Local Training Worker</span>
            </div>

            <div className="space-y-2.5 text-xs text-[#4B5563]">
              <div className="flex justify-between">
                <span className="text-neutral-500">Training Round:</span>
                <span className="text-[#1A1A1A] font-bold">Round #142 (Active)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Local Records Trained:</span>
                <span className="text-[#D66D10] font-bold">28,900 Records</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Last Gradient Push:</span>
                <span className="text-neutral-700 font-semibold">2 hours ago</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-[11px] text-neutral-500">
                <span>Batch Sync Progress:</span>
                <span className="text-[#1E7A34] font-bold">{progress}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-neutral-100 overflow-hidden border border-neutral-200">
                <div 
                  className="h-full bg-[#1E7A34] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleTriggerTraining}
            disabled={isTrainingRound || !participating}
            className="w-full py-3 rounded bg-[#1E7A34] hover:bg-[#145524] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-40"
          >
            {isTrainingRound ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isTrainingRound ? 'Computing Local Gradients...' : 'Run Local Training Round'}</span>
          </button>
        </div>
      </div>

      {/* GLOBAL FEDERATED NETWORK TOPOLOGY */}
      <div className="space-y-4">
        <div className="border-b border-neutral-200 pb-3 flex items-center justify-between">
          <h2 className="font-bold text-lg text-[#0B3D91]">
            Federated Network Topology (Edge Gradient Sync)
          </h2>
          <span className="text-xs font-bold text-[#1E7A34]">Zero Raw Data In Transit ✓</span>
        </div>

        <NodeDiagram mode="federated-learning" />
      </div>
    </div>
  )
}
