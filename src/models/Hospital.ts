import mongoose, { Types } from 'mongoose';

export interface Hospitals extends mongoose.Document {
  name: string
  addedBy: Types.ObjectId
}

/* PetSchema will correspond to a collection in your MongoDB database. */
const HospitalSchema = new mongoose.Schema<Hospitals>({
  name: {
    type: String,
    required: [true, 'The name is required.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

export default (mongoose.models.Hospital as mongoose.Model<Hospitals>) || mongoose.model<Hospitals>('Hospital', HospitalSchema);
