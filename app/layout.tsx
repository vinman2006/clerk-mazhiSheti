import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mazhi Sheti — Smart Agriculture Platform',
  description: 'Intelligent farming advisory, mandi price trends, and farmer network with modern interactive technology.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0B0E17] text-[#F4F6FB] min-h-screen antialiased selection:bg-orange-500/25 selection:text-orange-400 overflow-x-hidden">
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}