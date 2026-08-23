import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IPerson extends Document {
  firebaseUid: string
  email: string
  name?: string
  role: 'patient' | 'provider'
  personHash: string
  createdAt: Date
  updatedAt: Date
}

const PersonSchema = new Schema<IPerson>(
  {
    firebaseUid: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true },
    name: { type: String },
    role: { type: String, enum: ['patient', 'provider'], default: 'patient' },
    personHash: { type: String, required: true, unique: true, index: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
)

export const Person: Model<IPerson> =
  mongoose.models.Person || mongoose.model<IPerson>('Person', PersonSchema, 'persons')

export default Person
