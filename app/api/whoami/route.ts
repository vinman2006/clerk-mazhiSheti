import { NextRequest, NextResponse } from 'next/server'
import { verifyRequest } from '@/lib/auth/verifyRequest'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const authUser = await verifyRequest(req)
    return NextResponse.json({
      authenticated: true,
      uid: authUser.uid,
      email: authUser.email,
      name: authUser.name
    })
  } catch (err: any) {
    if (err instanceof Response) return err
    return NextResponse.json({ error: err.message || 'Unauthorized' }, { status: 401 })
  }
}
