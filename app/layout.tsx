import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mazhi Sheti — Smart Agriculture Platform',
  description: 'Sovereign agricultural infrastructure with role-based access for farmers, lending institutions, equipment providers, agronomists, and administrators.',
  applicationName: 'Mazhi Sheti',
  icons: {
    icon: '/favicon.svg',
    apple: '/app-icon.svg',
  },
  openGraph: {
    title: 'Mazhi Sheti — Sovereign Agriculture Platform',
    description: 'Intelligent farming advisory, mandi price benchmarks, and secure role-based portals for Indian agriculture.',
    siteName: 'Mazhi Sheti',
  },
}

const CLERK_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  'pk_test_cmVzdGVkLXN0dXJnZW9uLTg3MjQuY2xlcmsuYWNjb3VudHMuZGV2JA';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0B0E17] text-[#F4F6FB] min-h-screen antialiased selection:bg-orange-500/25 selection:text-orange-400 overflow-x-hidden">
        <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}