import crypto from 'crypto'

export function generatePersonHash(firebaseUid: string): string {
  const salt = process.env.PERSON_HASH_SALT || 'c89f41b9a8e032d8471e95b02acdf1774b39e2a0f81d4e73b2819c904e578a1b'
  if (!salt) {
    throw new Error('PERSON_HASH_SALT not set')
  }
  return crypto
    .createHash('sha256')
    .update(firebaseUid + salt)
    .digest('hex')
}
