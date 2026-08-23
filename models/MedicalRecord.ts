import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IMedicalRecord extends Document {
  personHash: string
  condition: string
  diagnosis?: string
  doctorName?: string
  facility?: string
  recordDate: Date
  notes?: string
  createdAt: Date
}

const MedicalRecordSchema = new Schema<IMedicalRecord>(
  {
    personHash: { type: String, required: true, index: true },
    condition: { type: String, required: true },
    diagnosis: { type: String },
    doctorName: { type: String },
    facility: { type: String },
    recordDate: { type: Date, required: true },
    notes: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
)

export const MedicalRecord: Model<IMedicalRecord> =
  mongoose.models.MedicalRecord ||
  mongoose.model<IMedicalRecord>('MedicalRecord', MedicalRecordSchema, 'medicalRecords')

export default MedicalRecord
