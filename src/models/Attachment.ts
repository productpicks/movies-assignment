import mongoose, { Types } from 'mongoose'

export interface Attachments extends mongoose.Document {
  filepath: string
  mimetype: string
  mtime: string
  newFilename: string;
  originalFilename: string;
  size: number;
  owner: Types.ObjectId;
}

/* PetSchema will correspond to a collection in your MongoDB database. */
const AttachmentSchema = new mongoose.Schema<Attachments>({
  filepath: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  mtime: {
    type: String,
    required: true,
  },
  newFilename: {
    type: String,
    required: true,
  },
  originalFilename: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoice'
  }
}, {
  timestamps: true
});

export default (mongoose.models.Attachment as mongoose.Model<Attachments>) || mongoose.model<Attachments>('Attachment', AttachmentSchema);
