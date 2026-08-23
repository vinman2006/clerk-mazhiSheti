import { NextRequest } from 'next/server'
import { verifyRequest } from './verifyRequest'
import { getDatabase } from '@/lib/mongodb'
import { generatePersonHash } from '@/lib/hash'

export async function resolvePersonHash(req: NextRequest): Promise<string> {
  // 1. Verify token to get uid
  const authUser = await verifyRequest(req)
  const { uid, email, name } = authUser

  // 2. Look up persons collection by firebaseUid
  const db = await getDatabase()
  const personsCollection = db.collection('persons')
  let person = await personsCollection.findOne({ firebaseUid: uid })

  // If person not found, auto-provision person record with derived personHash
  if (!person) {
    const personHash = generatePersonHash(uid)
    const newPersonDoc = {
      firebaseUid: uid,
      email: email || '',
      name: name || 'Sovereign Patient',
      role: 'patient',
      personHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    await personsCollection.insertOne(newPersonDoc)
    return personHash
  }

  // 3. Return personHash
  return person.personHash as string
}
