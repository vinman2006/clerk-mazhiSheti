const { MongoClient } = require('mongodb')

const uri = process.env.MONGODB_URI || 'mongodb+srv://vinmanhack_db_user:kzrkK71kV6saAMAx@cluster0.dbnl54b.mongodb.net/nexora_db?retryWrites=true&w=majority'

async function seed() {
  console.log('Connecting to MongoDB...')
  const client = new MongoClient(uri)
  try {
    await client.connect()
    const db = client.db('nexora_db')

    console.log('Seeding demo doctor and sample tokens for Dr. Tushar Pamnani...')
    const tokensCol = db.collection('doctor_tokens')

    const demoTokens = [
      {
        tokenNumber: 'MH-0001',
        doctorId: 'doctor-demo-tushar',
        doctorName: 'Tushar Pamnani',
        department: 'Mental Health — DEMO',
        providerType: 'DEMO_PROVIDER',
        patientId: 'usr_demo_patient_01',
        patientName: 'Demo Patient 01 (Vineet)',
        status: 'CALLED',
        locationId: 'pallotti-demo-clinic',
        locationName: 'St. Vincent Pallotti College of Engineering & Technology, Nagpur',
        createdAt: new Date(Date.now() - 3600000),
        updatedAt: new Date(Date.now() - 1800000)
      },
      {
        tokenNumber: 'MH-0002',
        doctorId: 'doctor-demo-tushar',
        doctorName: 'Tushar Pamnani',
        department: 'Mental Health — DEMO',
        providerType: 'DEMO_PROVIDER',
        patientId: 'usr_demo_patient_02',
        patientName: 'Demo Patient 02 (Rahul)',
        status: 'QUEUED',
        locationId: 'pallotti-demo-clinic',
        locationName: 'St. Vincent Pallotti College of Engineering & Technology, Nagpur',
        createdAt: new Date(Date.now() - 2400000),
        updatedAt: new Date(Date.now() - 2400000)
      },
      {
        tokenNumber: 'MH-0003',
        doctorId: 'doctor-demo-tushar',
        doctorName: 'Tushar Pamnani',
        department: 'Mental Health — DEMO',
        providerType: 'DEMO_PROVIDER',
        patientId: 'usr_demo_patient_03',
        patientName: 'Demo Patient 03 (Ananya)',
        status: 'QUEUED',
        locationId: 'pallotti-demo-clinic',
        locationName: 'St. Vincent Pallotti College of Engineering & Technology, Nagpur',
        createdAt: new Date(Date.now() - 1200000),
        updatedAt: new Date(Date.now() - 1200000)
      }
    ]

    for (const tok of demoTokens) {
      await tokensCol.updateOne(
        { tokenNumber: tok.tokenNumber },
        { $set: tok },
        { upsert: true }
      )
    }

    console.log('✓ Successfully seeded demo tokens in MongoDB collection "doctor_tokens"!')
  } catch (err) {
    console.error('Error seeding demo tokens:', err)
  } finally {
    await client.close()
  }
}

seed()
