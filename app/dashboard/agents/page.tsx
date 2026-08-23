'use client'

import React, { useState, useRef, useEffect } from 'react'
import { 
  Bot, 
  Send, 
  ShieldCheck, 
  RotateCcw 
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
    <div className="space-y-6 text-[#1A1A1A]">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-lg bg-white border border-[#E0E0E0] border-l-4 border-l-[#0B3D91] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-[#0B3D91]">
              AI Health Proxy Orchestrator (स्वयंचलित आरोग्य सहाय्यक)
            </h1>
            <SimulatedBadge />
          </div>
          <p className="text-xs text-[#4B5563] mt-1">
            Personalized proxy agent for <strong className="text-[#1A1A1A]">{profile.name}</strong> communicating with hospital and government agents under zero-knowledge proofs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded bg-green-100 border border-green-300 text-[#1E7A34] text-xs font-bold shadow-sm">
            Orchestration Active ✓
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CHAT THREAD (LEFT 7 COLS) */}
        <div className="lg:col-span-7 flex flex-col h-[640px] rounded-lg bg-white border border-[#E0E0E0] overflow-hidden shadow-sm">
          {/* Thread Header */}
          <div className="p-4 bg-[#F8FAFC] border-b border-neutral-200 flex items-center justify-between text-xs text-[#4B5563]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1E7A34] animate-pulse"></span>
              <span className="font-bold text-[#0B3D91]">Live Multi-Agent Communication Channel</span>
            </div>
            <button
              onClick={() => setMessages(initialThread)}
              className="text-[11px] text-neutral-500 hover:text-black flex items-center gap-1 font-bold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
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
                    <span className="text-[10px] text-neutral-400">
                      {msg.timestamp}
                    </span>
                  </div>

                  <div
                    className={`p-4 rounded-lg max-w-[85%] text-xs leading-relaxed space-y-2.5 ${
                      isPatient
                        ? 'bg-[#0B3D91] text-white rounded-tr-none shadow-sm'
                        : isPatientAgent
                        ? 'bg-[#F8FAFC] border-l-4 border-l-[#1E7A34] border border-[#CBD5E1] text-[#1A1A1A] rounded-tl-none shadow-sm'
                        : isHospital
                        ? 'bg-[#F8FAFC] border-l-4 border-l-[#0B3D91] border border-[#CBD5E1] text-[#1A1A1A] rounded-tl-none shadow-sm'
                        : 'bg-[#F8FAFC] border-l-4 border-l-[#F5821F] border border-[#CBD5E1] text-[#1A1A1A] rounded-tl-none shadow-sm'
                    }`}
                  >
                    <p>{msg.content}</p>

                    {/* ZK Proof Receipt */}
                    {msg.zkProof && (
                      <div className="p-2.5 rounded bg-white border border-[#CBD5E1] text-[11px] text-[#1E7A34] font-bold flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#1E7A34]" />
                          <span>ZK Proof Verified</span>
                        </div>
                        <span className="text-[10px] text-neutral-500 font-normal">{msg.zkProof.privacyGuarantee || msg.zkProof.claim}</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}

            {isSimulating && (
              <div className="flex items-center gap-2 p-3 rounded bg-amber-50 border border-amber-200 text-[#D66D10] text-xs animate-pulse">
                <Bot className="w-4 h-4 animate-spin" />
                <span>Agents communicating and generating cryptographic proofs...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Prompt Pills */}
          <div className="px-4 py-2 bg-[#F8FAFC] border-t border-neutral-200 flex items-center gap-2 overflow-x-auto">
            {promptSuggestions.map((sug, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(sug)}
                className="px-3 py-1 rounded bg-white hover:bg-neutral-100 border border-[#CBD5E1] text-[#0B3D91] text-[11px] whitespace-nowrap transition-colors shadow-sm font-semibold"
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
            className="p-3 bg-white border-t border-neutral-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask your agent to schedule, verify eligibility, or query records..."
              className="flex-1 px-4 py-2 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#1A1A1A] text-xs focus:outline-none focus:bg-white focus:border-[#0B3D91]"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isSimulating}
              className="p-2.5 rounded bg-[#1E7A34] hover:bg-[#145524] text-white disabled:opacity-40 transition-all font-bold shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* TOPOLOGY VISUALIZER (RIGHT 5 COLS) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-lg bg-white border border-[#E0E0E0] shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h2 className="font-bold text-sm text-[#0B3D91]">
                Live Agent Node Network
              </h2>
              <span className="text-[10px] text-[#1E7A34] font-bold">4 Nodes Connected</span>
            </div>

            <p className="text-xs text-[#4B5563]">
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
