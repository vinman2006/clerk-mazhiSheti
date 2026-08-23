import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/lib/authContext'
import { UserDataProvider } from '@/lib/userDataContext'
import { DevRoleSwitcher } from '@/components/ui/DevRoleSwitcher'
import { OnboardingModal } from '@/components/onboarding/OnboardingModal'

export const metadata: Metadata = {
  title: 'Nexora — Privacy-First Multi-Agent Healthcare Network',
  description: 'Healthcare access, multi-agent AI orchestration, and cryptographic trust infrastructure powered by decentralized identity, zero-knowledge proofs, and federated learning.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-text-primary min-h-screen antialiased selection:bg-portal-orange/20 selection:text-portal-orange">
        <AuthProvider>
          <UserDataProvider>
            {children}
            <OnboardingModal />
            <DevRoleSwitcher />
          </UserDataProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
