'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface SettingsContextType {
  hero3DEnabled: boolean
  setHero3DEnabled: (enabled: boolean) => void
  toggleHero3D: () => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [hero3DEnabled, setHero3DEnabledState] = useState<boolean>(true)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('nexora_hero_3d_enabled')
      if (saved !== null) {
        setHero3DEnabledState(saved === 'true')
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [])

  const setHero3DEnabled = (enabled: boolean) => {
    setHero3DEnabledState(enabled)
    try {
      localStorage.setItem('nexora_hero_3d_enabled', String(enabled))
    } catch {
      // Ignore
    }
  }

  const toggleHero3D = () => {
    setHero3DEnabled(!hero3DEnabled)
  }

  return (
    <SettingsContext.Provider
      value={{
        hero3DEnabled,
        setHero3DEnabled,
        toggleHero3D,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}
