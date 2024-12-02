import mongoose from 'mongoose';

const farmerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  address: {
    type: String,
    required: true
  },
  farmSize: {
    type: Number,
    required: true
  },
  primaryCrop: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

farmerSchema.index({ location: '2dsphere' });

export default mongoose.model('Farmer', farmerSchema);