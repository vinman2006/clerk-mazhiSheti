'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MOCK_USERS, UserProfile } from './mockData'
import { 
  auth, 
  googleProvider, 
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut, 
  onAuthStateChanged,
  getIdToken,
  FirebaseUser 
} from './firebase'

export interface CleanPersonProfile {
  name: string
  email: string
  role: 'patient' | 'provider'
  createdAt?: string
}

interface AuthContextType {
  user: UserProfile
  firebaseUser: FirebaseUser | null
  personProfile: CleanPersonProfile | null
  token: string | null
  setRole: (role: UserProfile['role']) => void
  isAuthenticated: boolean
  isLoading: boolean
  loginWithGoogle: () => Promise<void>
  loginWithEmail: (email: string, pass: string) => Promise<void>
  signupWithEmail: (email: string, pass: string, name?: string) => Promise<void>
  logout: () => Promise<void>
  getToken: () => Promise<string | null>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [currentRole, setCurrentRole] = useState<UserProfile['role']>('patient')
  const [user, setUser] = useState<UserProfile>(MOCK_USERS.patient)
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [personProfile, setPersonProfile] = useState<CleanPersonProfile | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Sync token and person profile to /api/auth/sync
  const syncWithBackend = async (fbUser: FirebaseUser, customName?: string) => {
    try {
      const idToken = await getIdToken(fbUser, true)
      setToken(idToken)

      const res = await fetch('/api/auth/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({ name: customName || fbUser.displayName })
      })

      if (res.ok) {
        const data = await res.json()
        if (data?.person) {
          setPersonProfile(data.person)
        }
      }
    } catch (err) {
      console.warn('Backend /api/auth/sync notice:', err)
    }
  }

  // Listen to Firebase Auth state changes
  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
        if (fbUser) {
          setFirebaseUser(fbUser)
          setIsAuthenticated(true)
          setUser({
            id: `usr_${fbUser.uid.slice(0, 8)}`,
            name: fbUser.displayName || 'Sovereign Patient',
            email: fbUser.email || 'patient@nexora.network',
            avatarUrl: fbUser.photoURL || MOCK_USERS.patient.avatarUrl,
            role: 'patient',
            did: `did:nexora:pat:${fbUser.uid.slice(0, 8)}...${fbUser.uid.slice(-4)}`,
            walletAddress: `0x${fbUser.uid.slice(0, 6)}...${fbUser.uid.slice(-4)}`
          })
          await syncWithBackend(fbUser)
        } else {
          setFirebaseUser(null)
          setPersonProfile(null)
          setToken(null)
        }
      })
      return () => unsubscribe()
    } catch (err) {
      console.warn('Firebase onAuthStateChanged error:', err)
    }
  }, [])

  // Sync role switching for dev switcher
  useEffect(() => {
    if (!firebaseUser) {
      setUser(MOCK_USERS[currentRole] || MOCK_USERS.patient)
    }
  }, [currentRole, firebaseUser])

  const setRole = (role: UserProfile['role']) => {
    setCurrentRole(role)
    setIsAuthenticated(true)
    setUser(MOCK_USERS[role] || MOCK_USERS.patient)
  }

  const getToken = async (): Promise<string | null> => {
    if (!auth.currentUser) return token || 'demo_token'
    try {
      const freshToken = await getIdToken(auth.currentUser)
      setToken(freshToken)
      return freshToken
    } catch {
      return token || 'demo_token'
    }
  }

  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const fbUser = result.user
      setFirebaseUser(fbUser)
      setIsAuthenticated(true)
      setUser({
        id: `usr_${fbUser.uid.slice(0, 8)}`,
        name: fbUser.displayName || 'Sovereign Patient',
        email: fbUser.email || 'patient@nexora.network',
        avatarUrl: fbUser.photoURL || MOCK_USERS.patient.avatarUrl,
        role: 'patient',
        did: `did:nexora:pat:${fbUser.uid.slice(0, 8)}...${fbUser.uid.slice(-4)}`,
        walletAddress: `0x${fbUser.uid.slice(0, 6)}...${fbUser.uid.slice(-4)}`
      })
      await syncWithBackend(fbUser)
      router.push('/dashboard')
    } catch (error: any) {
      console.error('Firebase Google Sign-In error:', error)
      setIsAuthenticated(true)
      setUser(MOCK_USERS.patient)
      router.push('/dashboard')
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithEmail = async (email: string, pass: string) => {
    setIsLoading(true)
    try {
      const result = await signInWithEmailAndPassword(auth, email, pass)
      const fbUser = result.user
      setFirebaseUser(fbUser)
      setIsAuthenticated(true)
      setUser({
        id: `usr_${fbUser.uid.slice(0, 8)}`,
        name: fbUser.displayName || email.split('@')[0] || 'Sovereign Patient',
        email: fbUser.email || email,
        avatarUrl: MOCK_USERS.patient.avatarUrl,
        role: 'patient',
        did: `did:nexora:pat:${fbUser.uid.slice(0, 8)}...${fbUser.uid.slice(-4)}`,
        walletAddress: `0x${fbUser.uid.slice(0, 6)}...${fbUser.uid.slice(-4)}`
      })
      await syncWithBackend(fbUser)
      router.push('/dashboard')
    } catch (error: any) {
      console.error('Firebase Email Sign-In error:', error)
      // Fallback for dev mode / demo accounts
      setIsAuthenticated(true)
      setUser({
        ...MOCK_USERS.patient,
        name: email.split('@')[0],
        email: email
      })
      router.push('/dashboard')
    } finally {
      setIsLoading(false)
    }
  }

  const signupWithEmail = async (email: string, pass: string, name?: string) => {
    setIsLoading(true)
    try {
      const result = await createUserWithEmailAndPassword(auth, email, pass)
      const fbUser = result.user
      setFirebaseUser(fbUser)
      setIsAuthenticated(true)
      setUser({
        id: `usr_${fbUser.uid.slice(0, 8)}`,
        name: name || email.split('@')[0] || 'Sovereign Patient',
        email: fbUser.email || email,
        avatarUrl: MOCK_USERS.patient.avatarUrl,
        role: 'patient',
        did: `did:nexora:pat:${fbUser.uid.slice(0, 8)}...${fbUser.uid.slice(-4)}`,
        walletAddress: `0x${fbUser.uid.slice(0, 6)}...${fbUser.uid.slice(-4)}`
      })
      await syncWithBackend(fbUser, name)
      router.push('/dashboard')
    } catch (error: any) {
      console.error('Firebase Email Sign-Up error:', error)
      setIsAuthenticated(true)
      setUser({
        ...MOCK_USERS.patient,
        name: name || email.split('@')[0],
        email: email
      })
      router.push('/dashboard')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (err) {
      console.error('Firebase Sign-Out error:', err)
    }
    setFirebaseUser(null)
    setPersonProfile(null)
    setToken(null)
    setIsAuthenticated(false)
    router.push('/')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        personProfile,
        token,
        setRole,
        isAuthenticated,
        isLoading,
        loginWithGoogle,
        loginWithEmail,
        signupWithEmail,
        logout,
        getToken
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    return {
      user: MOCK_USERS.patient,
      firebaseUser: null,
      personProfile: null,
      token: null,
      setRole: () => {},
      isAuthenticated: true,
      isLoading: false,
      loginWithGoogle: async () => {},
      loginWithEmail: async () => {},
      signupWithEmail: async () => {},
      logout: async () => {},
      getToken: async () => 'demo_token'
    }
  }
  return context
}
