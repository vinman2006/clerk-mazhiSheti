import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'success',
    message: 'Google OAuth backend endpoint stub. For demo, user is authenticated via useAuth() context.',
    redirectUrl: '/dashboard'
  })
}
