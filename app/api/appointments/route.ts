import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userDid, appointment } = body

    if (!userDid || !appointment) {
      return NextResponse.json({ error: 'userDid and appointment are required' }, { status: 400 })
    }

    const db = await getDatabase()
    const appointmentsCollection = db.collection('appointments')

    const newAppointment = {
      ...appointment,
      userDid,
      createdAt: new Date()
    }

    const result = await appointmentsCollection.insertOne(newAppointment)

    return NextResponse.json({ success: true, insertedId: result.insertedId })
  } catch (error: any) {
    console.error('Error saving appointment to MongoDB:', error)
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
    const appointmentsCollection = db.collection('appointments')

    await appointmentsCollection.updateOne(
      { id },
      { $set: { status, updatedAt: new Date() } }
    )

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error updating appointment in MongoDB:', error)
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userDid = searchParams.get('userDid')

    const db = await getDatabase()
    const appointmentsCollection = db.collection('appointments')

    const filter = userDid ? { userDid } : {}
    const appointments = await appointmentsCollection.find(filter).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({ success: true, appointments })
  } catch (error: any) {
    console.error('Error fetching appointments from MongoDB:', error)
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}
