// ============================================================
// DEMO ONLY — NO DATABASE WRITE
// Public unauthenticated endpoint for the interactive Hash Split Demo.
// Computes live SHA-256 hashes using DEMO_HASH_SALT.
// Zero imports of Mongoose/Person/MedicalRecord models — nothing is persisted.
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

// Basic in-memory rate limiting for public endpoint (60 requests per minute per IP)
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 60

  const record = rateLimitMap.get(ip)
  if (!record || record.expiresAt < now) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + windowMs })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count += 1
  return true
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'anonymous_client'
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment before trying again.' },
        { status: 429 }
      )
    }

    const body = await req.json().catch(() => ({}))
    const identity = body.identity || {
      name: 'Aditi Sharma',
      dob: '1998-04-12',
      email: 'demo@example.com'
    }
    const medical = body.medical || {
      condition: 'Seasonal allergy',
      doctorName: 'Dr. R. Verma',
      notes: 'Mild, recurring'
    }

    // Isolated demo salt (never use production PERSON_HASH_SALT for public demo)
    const DEMO_HASH_SALT = process.env.DEMO_HASH_SALT || 'nexora_public_demo_salt_hash_split_2026'

    // Compute deterministic SHA-256 hashes
    const personRaw = crypto
      .createHash('sha256')
      .update(JSON.stringify(identity) + DEMO_HASH_SALT)
      .digest('hex')

    const medicalRaw = crypto
      .createHash('sha256')
      .update(JSON.stringify(medical) + DEMO_HASH_SALT)
      .digest('hex')

    const personHashFull = `0x${personRaw}`
    const medicalHashFull = `0x${medicalRaw}`

    const formatDisplay = (h: string) => `0x${h.slice(2, 18)}...${h.slice(-4)}`

    return NextResponse.json({
      success: true,
      demo: true,
      personHash: {
        full: personHashFull,
        display: formatDisplay(personHashFull)
      },
      medicalHash: {
        full: medicalHashFull,
        display: formatDisplay(medicalHashFull)
      }
    })
  } catch (error) {
    console.error('Demo hash endpoint error:', error)
    return NextResponse.json(
      { error: 'Failed to compute demo hashes' },
      { status: 500 }
    )
  }
}
