'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bot, 
  Send, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  Building2, 
  Landmark, 
  User, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  KeyRound,
  RotateCcw,
  Zap,
  Heart
} from 'lucide-react'
import { useAuth } from '@/lib/authContext'
import { useUserData } from '@/lib/userDataContext'
import { AgentChatMessage } from '@/lib/mockData'
import { AgentTag } from '@/components/ui/AgentTag'
import { NodeDiagram } from '@/components/diagrams/NodeDiagram'
import { SimulatedBadge } from '@/components/ui/SimulatedBadge'

export default function MultiAgentChatPage() {
  const { user } = useAuth()
  const { profile } = useUserData()

  const initialThread: AgentChatMessage[] = [
    {
      id: 'msg_01',
      sender: 'patient_agent',
      agentName: 'Patient Proxy Agent (Orchestrator)',
      agentRole: 'Personal Health Enclave',
      avatarType: 'patient_agent',
      timestamp: '09:00 AM',
      content: `Hello ${profile.name || 'Citizen'}. I have initialized your sovereign health enclave. Your profile indicates: ${profile.chronicConditions?.length ? profile.chronicConditions.join(', ') : 'standard health profile'} in ${profile.district || 'Metropolis Medical District'}. How can I assist your care coordination today?`,
      activeRoutingNodes: ['patient', 'patient_agent']
    },
    {
      id: 'msg_02',
      sender: 'hospital_agent',
      agentName: 'Apex Heart Hospital Agent',
      agentRole: 'Provider Node',
      avatarType: 'hospital_agent',
      timestamp: '09:01 AM',
      content: `Encrypted telemetry pipeline active. Active smart consent contracts verified with zero raw data exposure.`,
      activeRoutingNodes: ['patient_agent', 'hospital_agent']
    }
  ]

  const [messages, setMessages] = useState<AgentChatMessage[]>(initialThread)
  const [inputVal, setInputVal] = useState('')
  const [isSimulating, setIsSimulating] = useState(false)
  const [activeRoutingNodes, setActiveRoutingNodes] = useState<string[]>([
    'patient', 'patient_agent', 'hospital_agent', 'government_agent', 'blockchain'
  ])

  const chatBottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isSimulating])

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputVal
    if (!text.trim() || isSimulating) return

    const userMsg: AgentChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'patient',
      agentName: profile.name || user.name,
      agentRole: 'Patient',
      avatarType: 'patient',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: text
    }

    setMessages(prev => [...prev, userMsg])
    setInputVal('')
    setIsSimulating(true)

    // Dynamic multi-agent reply simulation
    setActiveRoutingNodes(['patient', 'patient_agent'])

    setTimeout(() => {
      // Step 1: Patient Agent Routing
      const agentReply1: AgentChatMessage = {
        id: `agent_p_${Date.now()}`,
        sender: 'patient_agent',
        agentName: 'Patient Proxy Agent (Orchestrator)',
        agentRole: 'Patient Proxy',
        avatarType: 'patient_agent',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: `Evaluating clinical query for ${profile.name} (Allergies: ${profile.allergies?.join(', ') || 'None'}). Negotiating encrypted consent and routing to provider agent in ${profile.district}...`,
        activeRoutingNodes: ['patient_agent', 'hospital_agent']
      }
      setMessages(prev => [...prev, agentReply1])
      setActiveRoutingNodes(['patient_agent', 'hospital_agent', 'government_agent'])

      setTimeout(() => {
        // Step 2: Response with ZK proof check
        const agentReply2: AgentChatMessage = {
          id: `agent_h_${Date.now()}`,
          sender: 'hospital_agent',
          agentName: 'Apex Heart Hospital Agent',
          agentRole: 'Provider Node',
          avatarType: 'hospital_agent',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          content: `Inquiry acknowledged. Verified with on-chain DID and clinical records for ${profile.name}. All relevant guidelines have been reviewed with 0 raw data leak.`,
          activeRoutingNodes: ['hospital_agent', 'blockchain'],
          zkProof: {
            verified: true,
            claim: 'Citizen Eligibility & Consent Protocol',
            statement: 'Citizen eligibility and consent valid',
            proofHash: '0x39a1f...98b2',
            privacyGuarantee: 'Zero-Knowledge Groth16 (No PHI leak)'
          }
        }
        setMessages(prev => [...prev, agentReply2])
        setIsSimulating(false)
        setActiveRoutingNodes(['patient', 'patient_agent', 'hospital_agent', 'government_agent', 'blockchain'])
      }, 1400)
    }, 1000)
  }

  const promptSuggestions = [
    `Find specialists for ${profile.chronicConditions?.[0] || 'cardiology'} in my district`,
    'Check my ZK government healthcare subsidy eligibility',
    'Review active consent grants and encrypt my telemetry'
  ]

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-xl bg-[#141826] border-2 border-[#1E3A8A] shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-black text-2xl text-white">
              Multi-Agent Orchestrator
            </h1>
            <SimulatedBadge />
          </div>
          <p className="text-xs font-sans text-neutral-300 mt-1">
            Personalized proxy agent for <strong className="text-white">{profile.name}</strong> communicating with hospital and government agents under zero-knowledge proofs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-md bg-[#101420] border-2 border-portal-green text-portal-green font-mono text-xs font-bold shadow-sm">
            Orchestration Active ✓
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CHAT THREAD (LEFT 7 COLS) */}
        <div className="lg:col-span-7 flex flex-col h-[640px] rounded-xl bg-[#141826] border-2 border-[#1E3A8A] overflow-hidden shadow-2xl">
          {/* Thread Header */}
          <div className="p-4 bg-[#101420] border-b border-neutral-700 flex items-center justify-between font-mono text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-portal-green animate-pulse"></span>
              <span className="font-bold text-white">Live Multi-Agent Channel</span>
            </div>
            <button
              onClick={() => setMessages(initialThread)}
              className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1 font-bold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs">
            {messages.map((msg) => {
              const isPatient = msg.sender === 'patient'
              const isPatientAgent = msg.sender === 'patient_agent'
              const isHospital = msg.sender === 'hospital_agent'
              const isGov = msg.sender === 'government_agent'

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col space-y-1.5 ${isPatient ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-2">
                    <AgentTag agent={(msg.sender as any) || 'patient_agent'} />
                    <span className="font-mono text-[10px] text-neutral-400">
                      {msg.timestamp}
                    </span>
                  </div>

                  <div
                    className={`p-4 rounded-xl max-w-[85%] text-xs leading-relaxed space-y-2.5 ${
                      isPatient
                        ? 'bg-portal-blue text-white rounded-tr-none shadow-md'
                        : isPatientAgent
                        ? 'bg-[#101420] border-l-4 border-l-portal-green border border-neutral-700 text-white rounded-tl-none shadow-md'
                        : isHospital
                        ? 'bg-[#101420] border-l-4 border-l-blue-400 border border-neutral-700 text-white rounded-tl-none shadow-md'
                        : 'bg-[#101420] border-l-4 border-l-portal-orange border border-neutral-700 text-white rounded-tl-none shadow-md'
                    }`}
                  >
                    <p>{msg.content}</p>

                    {/* ZK Proof Receipt */}
                    {msg.zkProof && (
                      <div className="p-2.5 rounded bg-black/40 border border-neutral-700 font-mono text-[11px] text-portal-green flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>ZK Proof Verified</span>
                        </div>
                        <span className="text-[10px] text-neutral-400">{msg.zkProof.privacyGuarantee || msg.zkProof.claim}</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}

            {isSimulating && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-[#101420] border border-neutral-700 text-portal-orange font-mono text-xs animate-pulse">
                <Bot className="w-4 h-4 animate-spin" />
                <span>Agents communicating and generating cryptographic proofs...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Prompt Pills */}
          <div className="px-4 py-2 bg-[#101420] border-t border-neutral-700/60 flex items-center gap-2 overflow-x-auto">
            {promptSuggestions.map((sug, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(sug)}
                className="px-3 py-1 rounded-full bg-[#141826] hover:bg-[#182033] border border-neutral-700 text-neutral-300 hover:text-white text-[11px] font-sans whitespace-nowrap transition-colors"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="p-3 bg-[#101420] border-t border-neutral-700 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask your agent to schedule, verify eligibility, or query records..."
              className="flex-1 px-4 py-2.5 rounded-lg bg-[#141826] border border-neutral-700 text-white text-xs focus:outline-none focus:border-portal-orange font-sans placeholder:text-neutral-500"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isSimulating}
              className="p-2.5 rounded-lg bg-[#2E7D32] hover:bg-[#256629] text-white disabled:opacity-40 transition-all font-bold shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* TOPOLOGY VISUALIZER (RIGHT 5 COLS) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-xl bg-[#141826] border-2 border-[#1E3A8A] shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-700 pb-3">
              <h2 className="font-display font-black text-sm text-white">
                Live Agent Node Network
              </h2>
              <span className="text-[10px] font-mono text-portal-green font-bold">4 Nodes Connected</span>
            </div>

            <p className="text-xs font-sans text-neutral-300">
              Visual representation of active cryptographic routes during your conversation with Nexora agents.
            </p>

            <div className="pt-2">
              <NodeDiagram mode="agent-routing" activeNodes={activeRoutingNodes} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
