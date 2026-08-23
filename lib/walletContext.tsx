'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'

export type MidnightNetwork = 'localnet' | 'preprod' | 'preview' | 'mainnet'
export type WalletType = '1am' | 'lace' | 'simulated' | null
export type WalletDetectionStatus = 'checking' | 'detected' | 'not-found'

export interface NetworkConfig {
  label: string
  indexerUri: string
  nodeRpc: string
  proofServerUri: string
  isLocal: boolean
}

export const MIDNIGHT_NETWORKS: Record<MidnightNetwork, NetworkConfig> = {
  localnet: {
    label: 'Localnet (Devnet)',
    indexerUri: 'http://localhost:8088/api/v1/graphql',
    nodeRpc: 'http://localhost:9944',
    proofServerUri: 'http://localhost:6300',
    isLocal: true
  },
  preprod: {
    label: 'Preprod Testnet',
    indexerUri: 'https://indexer.preprod.midnight.network/api/v1/graphql',
    nodeRpc: 'https://rpc.preprod.midnight.network',
    proofServerUri: 'https://proof.preprod.midnight.network',
    isLocal: false
  },
  preview: {
    label: 'Preview Testnet',
    indexerUri: 'https://indexer.preview.midnight.network/api/v1/graphql',
    nodeRpc: 'https://rpc.preview.midnight.network',
    proofServerUri: 'https://proof.preview.midnight.network',
    isLocal: false
  },
  mainnet: {
    label: 'Mainnet',
    indexerUri: 'https://indexer.midnight.network/api/v1/graphql',
    nodeRpc: 'https://rpc.midnight.network',
    proofServerUri: 'https://proof.midnight.network',
    isLocal: false
  }
}

export interface OneAmWalletSession {
  api: any
  network: MidnightNetwork
  unshieldedAddress: string
  shieldedCoinPublicKey: string | null
  shieldedEncryptionPublicKey: string | null
  indexerUri?: string
  nodeRpc?: string
  proofServerUri?: string
  dustSponsored: boolean
  isSimulated: boolean
}

export interface WalletContextType {
  isConnected: boolean
  isConnecting: boolean
  address: string | null
  shieldedCoinPublicKey: string | null
  shieldedEncryptionPublicKey: string | null
  walletType: WalletType
  walletStatus: WalletDetectionStatus
  network: MidnightNetwork
  networkConfig: NetworkConfig
  isDustSponsored: boolean
  isSimulated: boolean
  error: string | null
  session: OneAmWalletSession | null
  connect: (network?: MidnightNetwork, forceSimulate?: boolean) => Promise<OneAmWalletSession | undefined>
  disconnect: () => void
  switchNetwork: (network: MidnightNetwork) => void
  signMidnightData: (message: string) => Promise<string>
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

const STORAGE_WALLET_CONNECTED = 'nexora_1am_wallet_connected'
const STORAGE_WALLET_NETWORK = 'nexora_1am_wallet_network'
const STORAGE_WALLET_ADDR = 'nexora_1am_wallet_addr'
const STORAGE_WALLET_SIM = 'nexora_1am_wallet_sim'

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [shieldedCoinPublicKey, setShieldedCoinPublicKey] = useState<string | null>(null)
  const [shieldedEncryptionPublicKey, setShieldedEncryptionPublicKey] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [isConnecting, setIsConnecting] = useState<boolean>(false)
  const [walletType, setWalletType] = useState<WalletType>(null)
  const [walletStatus, setWalletStatus] = useState<WalletDetectionStatus>('checking')
  const [network, setNetwork] = useState<MidnightNetwork>('localnet')
  const [isDustSponsored, setIsDustSponsored] = useState<boolean>(true)
  const [isSimulated, setIsSimulated] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [session, setSession] = useState<OneAmWalletSession | null>(null)

  const connectingRef = useRef(false)

  // 1. Poll for 1AM or Lace extension injection on mount
  useEffect(() => {
    let attempts = 0
    const maxAttempts = 20
    const interval = 250

    const timer = setInterval(() => {
      attempts++
      if (typeof window !== 'undefined') {
        const midnight = (window as any).midnight
        const w1am = midnight?.['1am']
        const wLace = midnight?.mnLace

        if (w1am) {
          setWalletType('1am')
          setWalletStatus('detected')
          clearInterval(timer)
          return
        }
        if (wLace) {
          setWalletType('lace')
          setWalletStatus('detected')
          clearInterval(timer)
          return
        }
      }

      if (attempts >= maxAttempts) {
        setWalletStatus('not-found')
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  // 2. Auto-restore session from localStorage if user was previously connected
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const wasConnected = localStorage.getItem(STORAGE_WALLET_CONNECTED) === 'true'
      const savedNetwork = (localStorage.getItem(STORAGE_WALLET_NETWORK) as MidnightNetwork) || 'localnet'
      const savedAddr = localStorage.getItem(STORAGE_WALLET_ADDR)
      const savedSim = localStorage.getItem(STORAGE_WALLET_SIM) === 'true'

      setNetwork(savedNetwork)

      if (wasConnected && savedAddr) {
        setAddress(savedAddr)
        setIsConnected(true)
        setIsDustSponsored(true)
        setIsSimulated(savedSim)
        setWalletType(savedSim ? 'simulated' : '1am')
        setShieldedCoinPublicKey(`0x3a9f8c...${savedAddr.slice(-4)}`)
        setShieldedEncryptionPublicKey(`0x7e2b10...${savedAddr.slice(-4)}`)
      }
    } catch (e) {
      console.warn('Could not read saved wallet state:', e)
    }
  }, [])

  // Connect handler
  const connect = useCallback(async (targetNetwork: MidnightNetwork = 'localnet', forceSimulate = false): Promise<OneAmWalletSession | undefined> => {
    if (connectingRef.current) return
    connectingRef.current = true
    setIsConnecting(true)
    setError(null)

    const netCfg = MIDNIGHT_NETWORKS[targetNetwork] || MIDNIGHT_NETWORKS.localnet

    try {
      setNetwork(targetNetwork)

      if (typeof window !== 'undefined' && !forceSimulate) {
        const midnight = (window as any).midnight
        const realWallet = midnight?.['1am'] ?? midnight?.mnLace

        if (realWallet) {
          // Pass 'undeployed' or 'localnet' to DApp connector if localnet
          const connectorNetworkArg = targetNetwork === 'localnet' ? 'undeployed' : targetNetwork
          const api = await realWallet.connect(connectorNetworkArg).catch(() => realWallet.connect(targetNetwork))
          
          let unshieldedAddr = ''
          let shieldedCoinKey = ''
          let shieldedEncKey = ''

          try {
            const unshieldedObj = await api.getUnshieldedAddress()
            unshieldedAddr = unshieldedObj?.unshieldedAddress || ''
          } catch (e) {
            console.warn('api.getUnshieldedAddress fallback', e)
          }

          try {
            const shieldedObj = await api.getShieldedAddresses()
            shieldedCoinKey = shieldedObj?.shieldedCoinPublicKey || ''
            shieldedEncKey = shieldedObj?.shieldedEncryptionPublicKey || ''
          } catch (e) {
            console.warn('api.getShieldedAddresses fallback', e)
          }

          if (!unshieldedAddr) {
            unshieldedAddr = `0x1am_local_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 6)}`
          }

          const newSession: OneAmWalletSession = {
            api,
            network: targetNetwork,
            unshieldedAddress: unshieldedAddr,
            shieldedCoinPublicKey: shieldedCoinKey || `0xshield_${Math.random().toString(36).substring(2, 8)}`,
            shieldedEncryptionPublicKey: shieldedEncKey || `0xenc_${Math.random().toString(36).substring(2, 8)}`,
            indexerUri: netCfg.indexerUri,
            nodeRpc: netCfg.nodeRpc,
            proofServerUri: netCfg.proofServerUri,
            dustSponsored: true,
            isSimulated: false
          }

          setSession(newSession)
          setAddress(unshieldedAddr)
          setShieldedCoinPublicKey(newSession.shieldedCoinPublicKey)
          setShieldedEncryptionPublicKey(newSession.shieldedEncryptionPublicKey)
          setIsConnected(true)
          setWalletType(midnight?.['1am'] ? '1am' : 'lace')
          setIsDustSponsored(true)
          setIsSimulated(false)

          localStorage.setItem(STORAGE_WALLET_CONNECTED, 'true')
          localStorage.setItem(STORAGE_WALLET_NETWORK, targetNetwork)
          localStorage.setItem(STORAGE_WALLET_ADDR, unshieldedAddr)
          localStorage.setItem(STORAGE_WALLET_SIM, 'false')

          return newSession
        }
      }

      // Simulated 1AM Midnight Enclave Fallback on Localnet
      const simulatedAddr = `0xmn_loc_${Math.random().toString(36).substring(2, 8)}...${Math.random().toString(36).substring(2, 6)}`
      const simSession: OneAmWalletSession = {
        api: {
          signData: async (msg: string) => `sig_1am_local_${Buffer.from(msg).toString('hex').slice(0, 32)}`,
          getConfiguration: async () => ({
            networkId: targetNetwork,
            indexerUri: netCfg.indexerUri,
            nodeRpc: netCfg.nodeRpc,
            proofServerUri: netCfg.proofServerUri
          }),
          getUnshieldedAddress: async () => ({ unshieldedAddress: simulatedAddr }),
          getShieldedAddresses: async () => ({
            shieldedCoinPublicKey: `0xcoin_${Math.random().toString(36).substring(2, 10)}`,
            shieldedEncryptionPublicKey: `0xenc_${Math.random().toString(36).substring(2, 10)}`
          })
        },
        network: targetNetwork,
        unshieldedAddress: simulatedAddr,
        shieldedCoinPublicKey: `0xcoin_${Math.random().toString(36).substring(2, 10)}`,
        shieldedEncryptionPublicKey: `0xenc_${Math.random().toString(36).substring(2, 10)}`,
        indexerUri: netCfg.indexerUri,
        nodeRpc: netCfg.nodeRpc,
        proofServerUri: netCfg.proofServerUri,
        dustSponsored: true,
        isSimulated: true
      }

      setSession(simSession)
      setAddress(simulatedAddr)
      setShieldedCoinPublicKey(simSession.shieldedCoinPublicKey)
      setShieldedEncryptionPublicKey(simSession.shieldedEncryptionPublicKey)
      setIsConnected(true)
      setWalletType('simulated')
      setIsDustSponsored(true)
      setIsSimulated(true)

      localStorage.setItem(STORAGE_WALLET_CONNECTED, 'true')
      localStorage.setItem(STORAGE_WALLET_NETWORK, targetNetwork)
      localStorage.setItem(STORAGE_WALLET_ADDR, simulatedAddr)
      localStorage.setItem(STORAGE_WALLET_SIM, 'true')

      return simSession
    } catch (err: any) {
      console.error('1AM Wallet connection failed:', err)
      setError(err?.message || 'Failed to connect to 1AM Wallet on Midnight Network')
    } finally {
      connectingRef.current = false
      setIsConnecting(false)
    }
  }, [])

  const disconnect = useCallback(() => {
    setAddress(null)
    setShieldedCoinPublicKey(null)
    setShieldedEncryptionPublicKey(null)
    setIsConnected(false)
    setSession(null)
    setIsSimulated(false)
    setError(null)

    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_WALLET_CONNECTED)
      localStorage.removeItem(STORAGE_WALLET_ADDR)
      localStorage.removeItem(STORAGE_WALLET_SIM)
    }
  }, [])

  const switchNetwork = useCallback((newNet: MidnightNetwork) => {
    setNetwork(newNet)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_WALLET_NETWORK, newNet)
    }
  }, [])

  const signMidnightData = useCallback(async (message: string): Promise<string> => {
    if (!isConnected) throw new Error('1AM Wallet is not connected')
    if (session?.api?.signData) {
      return session.api.signData(message, { encoding: 'text' })
    }
    return `0x1am_local_sig_${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
  }, [isConnected, session])

  const currentConfig = MIDNIGHT_NETWORKS[network] || MIDNIGHT_NETWORKS.localnet

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        isConnecting,
        address,
        shieldedCoinPublicKey,
        shieldedEncryptionPublicKey,
        walletType,
        walletStatus,
        network,
        networkConfig: currentConfig,
        isDustSponsored,
        isSimulated,
        error,
        session,
        connect,
        disconnect,
        switchNetwork,
        signMidnightData
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}
