import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getDatabase } from '@/lib/mongodb'
import { resolvePersonHash } from '@/lib/auth/resolvePersonHash'

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const personHash = await resolvePersonHash(req)
    const recordId = params.id

    if (!ObjectId.isValid(recordId)) {
      return NextResponse.json({ error: 'Invalid record ID' }, { status: 400 })
    }

    const db = await getDatabase()
    const recordsCollection = db.collection('medicalRecords')

    const record = await recordsCollection.findOne({ _id: new ObjectId(recordId) })

    if (!record) {
      return NextResponse.json({ error: 'Medical record not found' }, { status: 404 })
    }

    // Security check: confirm owner personHash matches
    if (record.personHash !== personHash) {
      return NextResponse.json({ error: 'Forbidden: Access denied' }, { status: 403 })
    }

    return NextResponse.json({
      success: true,
      record: {
        id: record._id.toString(),
        condition: record.condition,
        diagnosis: record.diagnosis || '',
        doctorName: record.doctorName || '',
        facility: record.facility || '',
        recordDate: record.recordDate,
        notes: record.notes || '',
        createdAt: record.createdAt
      }
    })
  } catch (err: any) {
    if (err instanceof Response) return err
    console.error('Error in GET /api/medical/records/[id]:', err)
    return NextResponse.json({ error: err.message || 'Unauthorized' }, { status: 401 })
  }
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const personHash = await resolvePersonHash(req)
    const recordId = params.id

    if (!ObjectId.isValid(recordId)) {
      return NextResponse.json({ error: 'Invalid record ID' }, { status: 400 })
    }

    const body = await req.json()
    const db = await getDatabase()
    const recordsCollection = db.collection('medicalRecords')

    const record = await recordsCollection.findOne({ _id: new ObjectId(recordId) })

    if (!record) {
      return NextResponse.json({ error: 'Medical record not found' }, { status: 404 })
    }

    if (record.personHash !== personHash) {
      return NextResponse.json({ error: 'Forbidden: Access denied' }, { status: 403 })
    }

    const updateFields: any = {}
    if (body.condition) updateFields.condition = body.condition.trim()
    if (body.diagnosis !== undefined) updateFields.diagnosis = body.diagnosis.trim()
    if (body.doctorName !== undefined) updateFields.doctorName = body.doctorName.trim()
    if (body.facility !== undefined) updateFields.facility = body.facility.trim()
    if (body.recordDate) updateFields.recordDate = new Date(body.recordDate)
    if (body.notes !== undefined) updateFields.notes = body.notes.trim()
    updateFields.updatedAt = new Date()

    await recordsCollection.updateOne(
      { _id: new ObjectId(recordId) },
      { $set: updateFields }
    )

    return NextResponse.json({ success: true })
  } catch (err: any) {
    if (err instanceof Response) return err
    console.error('Error in PATCH /api/medical/records/[id]:', err)
    return NextResponse.json({ error: err.message || 'Unauthorized' }, { status: 401 })
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const personHash = await resolvePersonHash(req)
    const recordId = params.id

    if (!ObjectId.isValid(recordId)) {
      return NextResponse.json({ error: 'Invalid record ID' }, { status: 400 })
    }

    const db = await getDatabase()
    const recordsCollection = db.collection('medicalRecords')

    const record = await recordsCollection.findOne({ _id: new ObjectId(recordId) })

    if (!record) {
      return NextResponse.json({ error: 'Medical record not found' }, { status: 404 })
    }

    if (record.personHash !== personHash) {
      return NextResponse.json({ error: 'Forbidden: Access denied' }, { status: 403 })
    }

    await recordsCollection.deleteOne({ _id: new ObjectId(recordId) })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    if (err instanceof Response) return err
    console.error('Error in DELETE /api/medical/records/[id]:', err)
    return NextResponse.json({ error: err.message || 'Unauthorized' }, { status: 401 })
  }
}
