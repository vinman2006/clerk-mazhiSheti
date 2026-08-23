import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { verifyRequest } from '@/lib/auth/verifyRequest'
import { generatePersonHash } from '@/lib/hash'
import { ObjectId } from 'mongodb'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const doctorId = searchParams.get('doctorId')

    const db = await getDatabase()
    const tokensCol = db.collection('doctor_tokens')

    // If query by doctorId, return all active/recent queue tokens for doctor dashboard
    if (doctorId) {
      const tokens = await tokensCol
        .find({ doctorId })
        .sort({ createdAt: -1 })
        .limit(50)
        .toArray()

      // Calculate queue positions
      const queuedTokens = await tokensCol
        .find({ doctorId, status: 'QUEUED' })
        .sort({ createdAt: 1 })
        .toArray()

      return NextResponse.json({
        success: true,
        tokens,
        queuedCount: queuedTokens.length,
        inProgressCount: tokens.filter(t => t.status === 'IN_PROGRESS').length,
        calledCount: tokens.filter(t => t.status === 'CALLED').length
      })
    }

    // Otherwise return tokens for the authenticated user
    let userUid = 'usr_guest_demo'
    let userName = 'Demo Patient'
    try {
      const authUser = await verifyRequest(req)
      userUid = authUser.uid
      userName = authUser.name || authUser.email || 'Demo Patient'
    } catch {
      // Allow demo patient access
    }

    const patientTokens = await tokensCol
      .find({ patientId: userUid })
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({
      success: true,
      tokens: patientTokens
    })
  } catch (err: any) {
    console.error('Error in GET /api/tokens:', err)
    return NextResponse.json({ error: err.message || 'Failed to fetch tokens' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { doctorId = 'doctor-demo-tushar' } = body

    let userUid = 'usr_guest_demo'
    let userName = 'Demo Patient'
    try {
      const authUser = await verifyRequest(req)
      userUid = authUser.uid
      userName = authUser.name || authUser.email || 'Demo Patient'
    } catch {
      // Fallback to guest user for seamless demo testing
    }

    const db = await getDatabase()
    const tokensCol = db.collection('doctor_tokens')

    // 1. Check for existing active token
    const existingActive = await tokensCol.findOne({
      patientId: userUid,
      doctorId,
      status: { $in: ['QUEUED', 'CALLED', 'IN_PROGRESS'] }
    })

    if (existingActive) {
      // Calculate queue position
      const aheadCount = await tokensCol.countDocuments({
        doctorId,
        status: 'QUEUED',
        createdAt: { $lt: existingActive.createdAt }
      })

      return NextResponse.json({
        success: true,
        activeExists: true,
        message: `You already have an active token: ${existingActive.tokenNumber}`,
        token: existingActive,
        queuePosition: existingActive.status === 'QUEUED' ? aheadCount + 1 : 0
      })
    }

    // 2. Generate sequential token number for department
    const totalCount = await tokensCol.countDocuments({ doctorId })
    const tokenSeq = totalCount + 1
    const tokenNumber = `MH-${String(tokenSeq).padStart(4, '0')}`

    const now = new Date()
    const newTokenDoc = {
      tokenNumber,
      doctorId,
      doctorName: doctorId === 'doctor-demo-tushar' ? 'Tushar Pamnani' : 'Dr. Medical Provider',
      department: 'Mental Health — DEMO',
      providerType: 'DEMO_PROVIDER',
      patientId: userUid,
      patientName: userName,
      status: 'QUEUED', // QUEUED | CALLED | IN_PROGRESS | COMPLETED | CANCELLED
      locationId: 'pallotti-demo-clinic',
      locationName: 'St. Vincent Pallotti College of Engineering & Technology, Nagpur',
      address: 'Gavsi Manapur, Wardha Road, Nagpur, Maharashtra 441108',
      createdAt: now,
      updatedAt: now
    }

    const result = await tokensCol.insertOne(newTokenDoc)
    const token = { _id: result.insertedId, ...newTokenDoc }

    // Calculate queue position
    const aheadCount = await tokensCol.countDocuments({
      doctorId,
      status: 'QUEUED',
      createdAt: { $lt: now }
    })
    const queuePosition = aheadCount + 1

    // 3. Optional local blockchain audit log (non-blocking)
    try {
      const patientHash = generatePersonHash(userUid)
      fetch('http://127.0.0.1:8000/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'TOKEN_GENERATED',
          from: `did:nexora:pat:${patientHash.slice(0, 16)}`,
          to: 'did:nexora:prov:demo:tushar:9042',
          data: {
            tokenNumber,
            doctorId,
            department: 'Mental Health — DEMO',
            scope: 'mental-health-consultation-queue',
            duration: '24h',
            purpose: 'demo-token-queue'
          }
        })
      }).catch(() => {})
    } catch {
      // Blockchain is optional audit layer
    }

    return NextResponse.json({
      success: true,
      activeExists: false,
      token,
      queuePosition
    }, { status: 201 })
  } catch (err: any) {
    console.error('Error in POST /api/tokens:', err)
    return NextResponse.json({ error: err.message || 'Database connection error. Failed to create token.' }, { status: 500 })
  }
}
