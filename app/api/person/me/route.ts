import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { verifyRequest } from '@/lib/auth/verifyRequest'
import { generatePersonHash } from '@/lib/hash'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const authUser = await verifyRequest(req)
    const { uid, email, name: tokenName } = authUser

    const db = await getDatabase()
    const personsCollection = db.collection('persons')

    let person = await personsCollection.findOne({ firebaseUid: uid })

    if (!person) {
      const personHash = generatePersonHash(uid)
      const newPersonDoc = {
        firebaseUid: uid,
        email: email || '',
        name: tokenName || 'Sovereign Patient',
        role: 'patient',
        personHash,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      const result = await personsCollection.insertOne(newPersonDoc)
      person = { _id: result.insertedId, ...newPersonDoc }
    }

    // Clean profile returned to client — no firebaseUid, no personHash!
    return NextResponse.json({
      success: true,
      person: {
        name: person.name || 'Sovereign Patient',
        email: person.email,
        role: person.role || 'patient',
        createdAt: person.createdAt,
        updatedAt: person.updatedAt
      }
    })
  } catch (err: any) {
    if (err instanceof Response) return err
    console.error('Error in GET /api/person/me:', err)
    return NextResponse.json({ error: err.message || 'Unauthorized' }, { status: 401 })
  }
}
