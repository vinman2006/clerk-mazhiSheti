import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userDid, consent } = body

    if (!userDid || !consent) {
      return NextResponse.json({ error: 'userDid and consent are required' }, { status: 400 })
    }

    const db = await getDatabase()
    const consentsCollection = db.collection('consents')

    const newConsent = {
      ...consent,
      userDid,
      createdAt: new Date()
    }

    const result = await consentsCollection.insertOne(newConsent)

    return NextResponse.json({ success: true, insertedId: result.insertedId })
  } catch (error: any) {
    console.error('Error saving consent to MongoDB:', error)
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json({ error: 'id and status are required' }, { status: 400 })
    }

    const db = await getDatabase()
    const consentsCollection = db.collection('consents')

    await consentsCollection.updateOne(
      { id },
      { $set: { status, revokedAt: new Date(), updatedAt: new Date() } }
    )

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error revoking consent in MongoDB:', error)
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userDid = searchParams.get('userDid')

    const db = await getDatabase()
    const consentsCollection = db.collection('consents')

    const filter = userDid ? { userDid } : {}
    const consents = await consentsCollection.find(filter).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({ success: true, consents })
  } catch (error: any) {
    console.error('Error fetching consents from MongoDB:', error)
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}
