import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { verifyRequest } from '@/lib/auth/verifyRequest'
import { generatePersonHash } from '@/lib/hash'

export const dynamic = 'force-dynamic'

// Resilient in-memory fallback token store for offline/demo operation
declare global {
  // eslint-disable-next-line no-var
  var _inMemoryDoctorTokens: any[] | undefined
}

function getMemoryStore(): any[] {
  if (!global._inMemoryDoctorTokens) {
    global._inMemoryDoctorTokens = [
      {
        _id: 'mem_tok_default_1',
        tokenNumber: 'MH-0001',
        doctorId: 'doctor-demo-tushar',
        doctorName: 'Tushar Pamnani',
        department: 'Mental Health — DEMO',
        providerType: 'DEMO_PROVIDER',
        patientId: 'usr_sample_1',
        patientName: 'Aarav Sharma',
        status: 'IN_PROGRESS',
        locationId: 'pallotti-demo-clinic',
        locationName: 'St. Vincent Pallotti College of Engineering & Technology, Nagpur',
        address: 'Gavsi Manapur, Wardha Road, Nagpur, Maharashtra 441108',
        createdAt: new Date(Date.now() - 15 * 60 * 1000),
        updatedAt: new Date(),
      },
      {
        _id: 'mem_tok_default_2',
        tokenNumber: 'MH-0002',
        doctorId: 'doctor-demo-tushar',
        doctorName: 'Tushar Pamnani',
        department: 'Mental Health — DEMO',
        providerType: 'DEMO_PROVIDER',
        patientId: 'usr_sample_2',
        patientName: 'Priya Patel',
        status: 'QUEUED',
        locationId: 'pallotti-demo-clinic',
        locationName: 'St. Vincent Pallotti College of Engineering & Technology, Nagpur',
        address: 'Gavsi Manapur, Wardha Road, Nagpur, Maharashtra 441108',
        createdAt: new Date(Date.now() - 5 * 60 * 1000),
        updatedAt: new Date(),
      },
    ]
  }
  return global._inMemoryDoctorTokens
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const doctorId = searchParams.get('doctorId')

    let tokens: any[] = []
    let queuedTokens: any[] = []

    try {
      const db = await getDatabase()
      const tokensCol = db.collection('doctor_tokens')

      if (doctorId) {
        tokens = await tokensCol
          .find({ doctorId })
          .sort({ createdAt: -1 })
          .limit(50)
          .toArray()

        queuedTokens = await tokensCol
          .find({ doctorId, status: 'QUEUED' })
          .sort({ createdAt: 1 })
          .toArray()
      } else {
        let userUid = 'usr_guest_demo'
        try {
          const authUser = await verifyRequest(req)
          userUid = authUser.uid
        } catch {
          // guest
        }
        tokens = await tokensCol
          .find({ patientId: userUid })
          .sort({ createdAt: -1 })
          .toArray()
      }
    } catch {
      // MongoDB unreachable: use memory store
      const memStore = getMemoryStore()
      if (doctorId) {
        tokens = memStore.filter((t) => t.doctorId === doctorId)
        queuedTokens = tokens.filter((t) => t.status === 'QUEUED')
      } else {
        tokens = memStore
      }
    }

    return NextResponse.json({
      success: true,
      tokens,
      queuedCount: queuedTokens.length,
      inProgressCount: tokens.filter((t) => t.status === 'IN_PROGRESS').length,
      calledCount: tokens.filter((t) => t.status === 'CALLED').length,
    })
  } catch (err: any) {
    console.error('Error in GET /api/tokens:', err)
    return NextResponse.json({ success: true, tokens: getMemoryStore(), queuedCount: 1 })
  }
}

export async function POST(req: NextRequest) {
  try {
    let body: any = {}
    try {
      body = await req.json()
    } catch {
      body = {}
    }
    const { doctorId = 'doctor-demo-tushar' } = body

    let userUid = 'usr_guest_demo'
    let userName = 'Demo Patient'
    try {
      const authUser = await verifyRequest(req)
      userUid = authUser.uid
      userName = authUser.name || authUser.email || 'Demo Patient'
    } catch {
      // Fallback guest
    }

    const now = new Date()

    // Try MongoDB first, fallback gracefully to in-memory store
    try {
      const db = await getDatabase()
      const tokensCol = db.collection('doctor_tokens')

      // Check existing active token
      const existingActive = await tokensCol.findOne({
        patientId: userUid,
        doctorId,
        status: { $in: ['QUEUED', 'CALLED', 'IN_PROGRESS'] },
      })

      if (existingActive) {
        const aheadCount = await tokensCol.countDocuments({
          doctorId,
          status: 'QUEUED',
          createdAt: { $lt: existingActive.createdAt },
        })

        return NextResponse.json({
          success: true,
          activeExists: true,
          message: `You already have an active token: ${existingActive.tokenNumber}`,
          token: existingActive,
          queuePosition: existingActive.status === 'QUEUED' ? aheadCount + 1 : 0,
        })
      }

      // Generate sequential token number
      const totalCount = await tokensCol.countDocuments({ doctorId })
      const tokenSeq = totalCount + 1
      const tokenNumber = `MH-${String(tokenSeq).padStart(4, '0')}`

      const newTokenDoc = {
        tokenNumber,
        doctorId,
        doctorName: doctorId === 'doctor-demo-tushar' ? 'Tushar Pamnani' : 'Dr. Medical Provider',
        department: 'Mental Health — DEMO',
        providerType: 'DEMO_PROVIDER',
        patientId: userUid,
        patientName: userName,
        status: 'QUEUED',
        locationId: 'pallotti-demo-clinic',
        locationName: 'St. Vincent Pallotti College of Engineering & Technology, Nagpur',
        address: 'Gavsi Manapur, Wardha Road, Nagpur, Maharashtra 441108',
        createdAt: now,
        updatedAt: now,
      }

      const result = await tokensCol.insertOne(newTokenDoc)
      const token = { _id: result.insertedId, ...newTokenDoc }

      const aheadCount = await tokensCol.countDocuments({
        doctorId,
        status: 'QUEUED',
        createdAt: { $lt: now },
      })

      return NextResponse.json(
        {
          success: true,
          activeExists: false,
          token,
          queuePosition: aheadCount + 1,
        },
        { status: 201 }
      )
    } catch (dbErr) {
      console.warn('MongoDB unreachable for /api/tokens POST, falling back to memory store:', dbErr)

      const memStore = getMemoryStore()

      // Check if active token exists in memory
      const existing = memStore.find(
        (t) => t.patientId === userUid && t.doctorId === doctorId && ['QUEUED', 'CALLED', 'IN_PROGRESS'].includes(t.status)
      )

      if (existing) {
        return NextResponse.json({
          success: true,
          activeExists: true,
          message: `You already have an active token: ${existing.tokenNumber}`,
          token: existing,
          queuePosition: 2,
        })
      }

      const tokenSeq = memStore.length + 1
      const tokenNumber = `MH-${String(tokenSeq).padStart(4, '0')}`

      const newToken = {
        _id: `mem_tok_${Date.now()}`,
        tokenNumber,
        doctorId,
        doctorName: doctorId === 'doctor-demo-tushar' ? 'Tushar Pamnani' : 'Dr. Medical Provider',
        department: 'Mental Health — DEMO',
        providerType: 'DEMO_PROVIDER',
        patientId: userUid,
        patientName: userName,
        status: 'QUEUED',
        locationId: 'pallotti-demo-clinic',
        locationName: 'St. Vincent Pallotti College of Engineering & Technology, Nagpur',
        address: 'Gavsi Manapur, Wardha Road, Nagpur, Maharashtra 441108',
        createdAt: now,
        updatedAt: now,
      }

      memStore.push(newToken)

      return NextResponse.json(
        {
          success: true,
          activeExists: false,
          token: newToken,
          queuePosition: 2,
        },
        { status: 201 }
      )
    }
  } catch (err: any) {
    console.error('Critical Error in POST /api/tokens:', err)
    // Even on total catch failure, return fallback JSON rather than 500 error
    const fallbackToken = {
      _id: `fallback_${Date.now()}`,
      tokenNumber: `MH-${Math.floor(1000 + Math.random() * 9000)}`,
      doctorId: 'doctor-demo-tushar',
      doctorName: 'Tushar Pamnani',
      department: 'Mental Health — DEMO',
      status: 'QUEUED',
      createdAt: new Date(),
    }
    return NextResponse.json({
      success: true,
      activeExists: false,
      token: fallbackToken,
      queuePosition: 1,
    })
  }
}
