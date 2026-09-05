'use client'

import React from 'react'
import { Inbox } from '@novu/nextjs'
import { dark } from '@novu/nextjs/themes'
import { useUser } from '@clerk/nextjs'

export interface NotificationInboxProps {
  subscriberId?: string
}

export default function NotificationInbox({ subscriberId: explicitSubscriberId }: NotificationInboxProps) {
  const { user, isLoaded, isSignedIn } = useUser()

  const applicationIdentifier = process.env.NEXT_PUBLIC_NOVU_APPLICATION_IDENTIFIER || 'hC214Re-oCCB'

  if (!isLoaded) {
    return null
  }

  const subscriberId = explicitSubscriberId || (isSignedIn && user ? user.id : null)

  if (!subscriberId) {
    return null
  }

  return (
    <Inbox
      applicationIdentifier={applicationIdentifier}
      subscriberId={subscriberId}
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#F5820D',
          colorPrimaryForeground: '#FFFFFF',
          colorSecondary: '#141826',
          colorSecondaryForeground: '#F4F6FB',
          colorCounter: '#F5820D',
          colorCounterForeground: '#FFFFFF',
          colorBackground: '#0B1736',
          colorRing: '#F5820D',
          colorForeground: '#F4F6FB',
          colorNeutral: '#242A3D',
          colorShadow: 'rgba(0, 0, 0, 0.45)',
          fontSize: '14px',
        },
        elements: {
          bellIcon: {
            color: '#F4F6FB',
          },
        },
      }}
    />
  )
}
