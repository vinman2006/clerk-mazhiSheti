'use client'

import React from 'react'
import { Bot, Building2, Landmark, User, Microscope } from 'lucide-react'

interface AgentTagProps {
  agent: 'patient' | 'patient_agent' | 'hospital_agent' | 'government_agent' | 'researcher_agent'
  className?: string
  size?: 'sm' | 'md'
}

export function AgentTag({ agent, className = "", size = "md" }: AgentTagProps) {
  const configs = {
    patient: {
      label: 'Patient',
      icon: User,
      bg: 'bg-[#101420]',
      text: 'text-neutral-200',
      border: 'border-neutral-700 border-l-2 border-l-neutral-400',
      dot: 'bg-portal-green'
    },
    patient_agent: {
      label: 'Patient Agent',
      icon: Bot,
      bg: 'bg-[#101420]',
      text: 'text-portal-orange',
      border: 'border-neutral-700 border-l-2 border-l-portal-orange',
      dot: 'bg-portal-orange'
    },
    hospital_agent: {
      label: 'Hospital Agent',
      icon: Building2,
      bg: 'bg-[#101420]',
      text: 'text-blue-300',
      border: 'border-neutral-700 border-l-2 border-l-portal-blue',
      dot: 'bg-blue-400'
    },
    government_agent: {
      label: 'Government Agent',
      icon: Landmark,
      bg: 'bg-[#101420]',
      text: 'text-portal-green',
      border: 'border-neutral-700 border-l-2 border-l-portal-green',
      dot: 'bg-portal-green'
    },
    researcher_agent: {
      label: 'Research Agent',
      icon: Microscope,
      bg: 'bg-[#101420]',
      text: 'text-purple-300',
      border: 'border-neutral-700 border-l-2 border-l-purple-500',
      dot: 'bg-purple-400'
    }
  }

  const current = configs[agent] || configs.patient_agent
  const Icon = current.icon

  const sizeClasses = size === 'sm' 
    ? 'px-2 py-0.5 text-[10px] gap-1' 
    : 'px-2.5 py-1 text-xs gap-1.5'

  return (
    <span className={`inline-flex items-center rounded-md font-mono font-semibold border ${current.bg} ${current.text} ${current.border} ${sizeClasses} shadow-sm ${className}`}>
      <Icon className={size === 'sm' ? "w-3 h-3" : "w-3.5 h-3.5"} />
      <span>{current.label}</span>
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot} ml-0.5`}></span>
    </span>
  )
}
