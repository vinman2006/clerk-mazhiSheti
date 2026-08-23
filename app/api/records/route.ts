import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userDid, record } = body

    if (!userDid || !record) {
      return NextResponse.json({ error: 'userDid and record are required' }, { status: 400 })
    }

    const db = await getDatabase()
    const recordsCollection = db.collection('medical_records')

    const newRecord = {
      ...record,
      userDid,
      createdAt: new Date()
    }

    const result = await recordsCollection.insertOne(newRecord)

    return NextResponse.json({ success: true, insertedId: result.insertedId })
  } catch (error: any) {
    console.error('Error saving record to MongoDB:', error)
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userDid = searchParams.get('userDid')

    const db = await getDatabase()
    const recordsCollection = db.collection('medical_records')

    const filter = userDid ? { userDid } : {}
    const records = await recordsCollection.find(filter).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({ success: true, records })
  } catch (error: any) {
    console.error('Error fetching records from MongoDB:', error)
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}
