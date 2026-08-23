import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { resolvePersonHash } from '@/lib/auth/resolvePersonHash'

export async function GET(req: NextRequest) {
  try {
    const personHash = await resolvePersonHash(req)
    const db = await getDatabase()
    const recordsCollection = db.collection('medicalRecords')

    const records = await recordsCollection
      .find({ personHash })
      .sort({ recordDate: -1, createdAt: -1 })
      .toArray()

    // Clean output — hide internal personHash if returning to frontend
    const sanitized = records.map(r => ({
      id: r._id.toString(),
      condition: r.condition,
      diagnosis: r.diagnosis || '',
      doctorName: r.doctorName || '',
      facility: r.facility || '',
      recordDate: r.recordDate,
      notes: r.notes || '',
      createdAt: r.createdAt
    }))

    return NextResponse.json({ success: true, records: sanitized })
  } catch (err: any) {
    if (err instanceof Response) return err
    console.error('Error in GET /api/medical/records:', err)
    return NextResponse.json({ error: err.message || 'Unauthorized' }, { status: 401 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const personHash = await resolvePersonHash(req)
    const body = await req.json()

    const { condition, diagnosis, doctorName, facility, recordDate, notes } = body

    if (!condition || !recordDate) {
      return NextResponse.json(
        { error: 'Both condition and recordDate are required' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const recordsCollection = db.collection('medicalRecords')

    // HARD RULE: Only store medical fields + personHash. Never store name/email/uid!
    const newMedicalRecord = {
      personHash,
      condition: condition.trim(),
      diagnosis: diagnosis ? diagnosis.trim() : '',
      doctorName: doctorName ? doctorName.trim() : '',
      facility: facility ? facility.trim() : '',
      recordDate: new Date(recordDate),
      notes: notes ? notes.trim() : '',
      createdAt: new Date()
    }

    const result = await recordsCollection.insertOne(newMedicalRecord)

    return NextResponse.json({
      success: true,
      recordId: result.insertedId.toString()
    })
  } catch (err: any) {
    if (err instanceof Response) return err
    console.error('Error in POST /api/medical/records:', err)
    return NextResponse.json({ error: err.message || 'Unauthorized' }, { status: 401 })
  }
}
