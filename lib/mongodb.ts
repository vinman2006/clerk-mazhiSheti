import { MongoClient, Db } from 'mongodb'

const uri = process.env.MONGODB_URI || 'mongodb+srv://vinmanhack_db_user:kzrkK71kV6saAMAx@cluster0.dbnl54b.mongodb.net/nexora_db?retryWrites=true&w=majority'

let client: MongoClient | null = null
let clientPromise: Promise<MongoClient> | null = null

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

export async function getMongoClient(): Promise<MongoClient> {
  if (clientPromise) {
    return clientPromise
  }

  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri)
      global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
    return clientPromise
  }

  client = new MongoClient(uri)
  clientPromise = client.connect()
  return clientPromise
}

export async function getDatabase(dbName?: string): Promise<Db> {
  const clientInstance = await getMongoClient()
  return clientInstance.db(dbName || process.env.MONGODB_DB || 'nexora_db')
}

export default getMongoClient
