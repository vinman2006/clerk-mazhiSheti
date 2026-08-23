import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const db = await getDatabase()
    const tokensCol = db.collection('doctor_tokens')

    let query: any = { tokenNumber: id }
    if (ObjectId.isValid(id)) {
      query = { $or: [{ _id: new ObjectId(id) }, { tokenNumber: id }] }
    }

    const token = await tokensCol.findOne(query)
    if (!token) {
      return NextResponse.json({ error: 'Token not found' }, { status: 404 })
    }

    // Calculate queue position if status is QUEUED
    let queuePosition = 0
    if (token.status === 'QUEUED') {
      const aheadCount = await tokensCol.countDocuments({
        doctorId: token.doctorId,
        status: 'QUEUED',
        createdAt: { $lt: token.createdAt }
      })
      queuePosition = aheadCount + 1
    }

    return NextResponse.json({
      success: true,
      token,
      queuePosition
    })
  } catch (err: any) {
    console.error('Error in GET /api/tokens/[id]:', err)
    return NextResponse.json({ error: err.message || 'Failed to fetch token' }, { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await req.json()
    const { status } = body

    const validStatuses = ['QUEUED', 'CALLED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` }, { status: 400 })
    }

    const db = await getDatabase()
    const tokensCol = db.collection('doctor_tokens')

    let query: any = { tokenNumber: id }
    if (ObjectId.isValid(id)) {
      query = { $or: [{ _id: new ObjectId(id) }, { tokenNumber: id }] }
    }

    const now = new Date()
    const result = await tokensCol.findOneAndUpdate(
      query,
      { $set: { status, updatedAt: now } },
      { returnDocument: 'after' }
    )

    if (!result) {
      return NextResponse.json({ error: 'Token not found to update' }, { status: 404 })
    }

    // Optional blockchain status audit
    try {
      fetch('http://127.0.0.1:8000/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: `TOKEN_${status}`,
          from: 'did:nexora:prov:demo:tushar:9042',
          to: `did:nexora:pat:${String(result.patientId).slice(0, 16)}`,
          data: {
            tokenNumber: result.tokenNumber,
            doctorId: result.doctorId,
            status,
            updatedAt: now.toISOString()
          }
        })
      }).catch(() => {})
    } catch {
      // Optional audit layer
    }

    return NextResponse.json({
      success: true,
      token: result
    })
  } catch (err: any) {
    console.error('Error in PATCH /api/tokens/[id]:', err)
    return NextResponse.json({ error: err.message || 'Failed to update token status' }, { status: 500 })
  }
}
