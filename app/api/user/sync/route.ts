import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, did, profile, records, appointments, consents, auditTrail } = body

    if (!email && !did) {
      return NextResponse.json({ error: 'Email or DID is required' }, { status: 400 })
    }

    const db = await getDatabase()
    const usersCollection = db.collection('users')

    const filter = email ? { email } : { did }
    const updateDoc = {
      $set: {
        ...(profile && { profile }),
        ...(records && { records }),
        ...(appointments && { appointments }),
        ...(consents && { consents }),
        ...(auditTrail && { auditTrail }),
        updatedAt: new Date()
      },
      $setOnInsert: {
        createdAt: new Date(),
        email: email || '',
        did: did || ''
      }
    }

    const result = await usersCollection.updateOne(filter, updateDoc, { upsert: true })

    return NextResponse.json({ 
      success: true, 
      matchedCount: result.matchedCount,
      upsertedId: result.upsertedId 
    })
  } catch (error: any) {
    console.error('Error syncing user to MongoDB:', error)
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    const did = searchParams.get('did')

    if (!email && !did) {
      return NextResponse.json({ error: 'Email or DID query param required' }, { status: 400 })
    }

    const db = await getDatabase()
    const usersCollection = db.collection('users')

    const filter = email ? { email } : { did }
    const userDoc = await usersCollection.findOne(filter)

    if (!userDoc) {
      return NextResponse.json({ exists: false }, { status: 404 })
    }

    return NextResponse.json({ exists: true, data: userDoc })
  } catch (error: any) {
    console.error('Error fetching user from MongoDB:', error)
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}
