import mongoose from 'mongoose';

const droneReportSchema = new mongoose.Schema({
  damageReport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DamageReport',
    required: true
  },
  flightData: {
    date: Date,
    duration: Number,
    altitude: Number,
    coverage: Number
  },
  images: [{
    url: String,
    type: {
      type: String,
      enum: ['rgb', 'multispectral', 'thermal'],
      default: 'rgb'
    },
    timestamp: Date
  }],
  analysis: {
    affectedArea: Number,
    damagePercentage: Number,
    cropHealth: {
      type: String,
      enum: ['good', 'moderate', 'poor']
    },
    recommendations: [String]
  },
  reportUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('DroneReport', droneReportSchema);