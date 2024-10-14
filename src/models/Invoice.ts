import mongoose, { Types } from 'mongoose';

import { Type } from './enums/Type';

export interface Invoices extends mongoose.Document {
  amount: string
  date: Date;
  attachment: Types.ObjectId;
  hospitalId: Types.ObjectId;
  currentStage: string;
  hospitalApproved: boolean;
  pmuApproved: boolean;
  iecApproved: boolean;
  operationWingApproved: boolean;
  osApproved: boolean;
  auditApproved: boolean;
  financeApproved: boolean;
  paidApproved: boolean;
  type: string;
  owner: Types.ObjectId
}

/* PetSchema will correspond to a collection in your MongoDB database. */
const InvoiceSchema = new mongoose.Schema<Invoices>({
  amount: {
    type: String,
    required: [true, 'The amount is required.'],
    maxlength: [60, 'Amount cannot be more than 60 characters'],
  },
  date: {
    type: Date,
    required: true,
  },
  attachment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attachment',
    required: true,
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Hospital'
  },
  hospitalApproved: {
    type: Boolean,
    default: false,
  },
  pmuApproved: {
    type: Boolean,
    default: false,
  },
  iecApproved: {
    type: Boolean,
    default: false,
  },
  operationWingApproved: {
    type: Boolean,
    default: false,
  },
  osApproved: {
    type: Boolean,
    default: false,
  },
  auditApproved: {
    type: Boolean,
    default: false,
  },
  financeApproved: {
    type: Boolean,
    default: false,
  },
  paidApproved: {
    type: Boolean,
    default: false,
  },
  currentStage: {
    type: String,
    default: 'SP',
  },
  type: {
    type: String,
    enum: Type,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

export default (mongoose.models.Invoice as mongoose.Model<Invoices>) || mongoose.model<Invoices>('Invoice', InvoiceSchema);
