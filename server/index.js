import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import farmerRoutes from './routes/farmers.js';
import damageRoutes from './routes/damages.js';
import schemeRoutes from './routes/schemes.js';
import subsidyRoutes from './routes/subsidies.js';
import contactRoutes from './routes/contact.js';
import droneReportRoutes from './routes/droneReports.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/farmers', farmerRoutes);
app.use('/api/damages', damageRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/subsidies', subsidyRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/drone-reports', droneReportRoutes);

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/agri-assist')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});