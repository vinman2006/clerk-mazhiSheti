import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/lib/authContext'
import { UserDataProvider } from '@/lib/userDataContext'
import { WalletProvider } from '@/lib/walletContext'
import { LanguageProvider } from '@/lib/languageContext'
import { SettingsProvider } from '@/lib/settingsContext'
import { DevRoleSwitcher } from '@/components/ui/DevRoleSwitcher'
import { OnboardingModal } from '@/components/onboarding/OnboardingModal'
import { LanguagePromptModal } from '@/components/ui/LanguagePromptModal'
import { SmoothScroll } from '@/components/ui/SmoothScroll'

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
        <SmoothScroll>
          <SettingsProvider>
            <LanguageProvider>
              <AuthProvider>
                <UserDataProvider>
                  <WalletProvider>
                    {children}
                    <OnboardingModal />
                    <DevRoleSwitcher />
                    <LanguagePromptModal />
                  </WalletProvider>
                </UserDataProvider>
              </AuthProvider>
            </LanguageProvider>
          </SettingsProvider>
        </SmoothScroll>
      </body>
    </html>
  )
}

