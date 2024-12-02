import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  eligibility: {
    type: String,
    required: true
  },
  benefits: {
    type: String,
    required: true
  },
  applicationProcess: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Scheme', schemeSchema);