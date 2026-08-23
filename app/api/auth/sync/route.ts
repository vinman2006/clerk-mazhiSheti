import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { verifyRequest } from '@/lib/auth/verifyRequest'
import { generatePersonHash } from '@/lib/hash'

export async function POST(req: NextRequest) {
  try {
    const authUser = await verifyRequest(req)
    const { uid, email, name: tokenName } = authUser

    let bodyName = ''
    try {
      const body = await req.json()
      if (body?.name) bodyName = body.name
    } catch (_) {}

    const db = await getDatabase()
    const personsCollection = db.collection('persons')

    let person = await personsCollection.findOne({ firebaseUid: uid })

    if (!person) {
      const personHash = generatePersonHash(uid)
      const newPersonDoc = {
        firebaseUid: uid,
        email: email || '',
        name: bodyName || tokenName || 'Sovereign Patient',
        role: 'patient',
        personHash,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const result = await personsCollection.insertOne(newPersonDoc)
      person = { _id: result.insertedId, ...newPersonDoc }
    } else {
      await personsCollection.updateOne(
        { firebaseUid: uid },
        { 
          $set: { 
            updatedAt: new Date(),
            ...(bodyName && { name: bodyName })
          } 
        }
      )
    }

    // Sanitize response — client NEVER receives firebaseUid or personHash
    const cleanProfile = {
      email: person.email,
      name: person.name,
      role: person.role,
      createdAt: person.createdAt,
      updatedAt: person.updatedAt
    }

    return NextResponse.json({
      success: true,
      person: cleanProfile
    })
  } catch (err: any) {
    if (err instanceof Response) return err
    console.error('Error in /api/auth/sync:', err)
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 })
  }
}
