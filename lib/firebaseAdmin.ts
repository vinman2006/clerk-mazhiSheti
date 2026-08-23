import { initializeApp, getApps, getApp, App, cert } from 'firebase-admin/app'
import { getAuth, Auth } from 'firebase-admin/auth'

let adminApp: App
let adminAuth: Auth

const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'nexora-health'
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL || ''
const rawPrivateKey = process.env.FIREBASE_PRIVATE_KEY || ''
const privateKey = rawPrivateKey.replace(/\\n/g, '\n')

if (!getApps().length) {
  if (clientEmail && privateKey) {
    try {
      adminApp = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      })
    } catch (e) {
      console.warn('Firebase Admin cert init warning, falling back to default:', e)
      adminApp = initializeApp({ projectId })
    }
  } else {
    adminApp = initializeApp({ projectId })
  }
} else {
  adminApp = getApp()
}

adminAuth = getAuth(adminApp)

export { adminApp, adminAuth }
export default adminApp
