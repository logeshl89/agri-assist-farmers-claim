import mongoose from 'mongoose';

const subsidyClaimSchema = new mongoose.Schema({
  damageReport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DamageReport',
    required: true
  },
  scheme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scheme'
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  processedAt: Date
});

export default mongoose.model('SubsidyClaim', subsidyClaimSchema);