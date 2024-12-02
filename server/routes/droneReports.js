import express from 'express';
import multer from 'multer';
import { auth, checkRole } from '../middleware/auth.js';
import DroneReport from '../models/DroneReport.js';
import DamageReport from '../models/DamageReport.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: 'uploads/drone-reports/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage });

// Create drone report
router.post('/', auth, checkRole(['admin']), upload.array('images', 10), async (req, res) => {
  try {
    const { damageReportId, flightData, analysis } = req.body;

    const damageReport = await DamageReport.findById(damageReportId);
    if (!damageReport) {
      return res.status(404).json({ message: 'Damage report not found' });
    }

    const images = req.files.map(file => ({
      url: `uploads/drone-reports/${file.filename}`,
      type: file.fieldname.includes('thermal') ? 'thermal' : 
            file.fieldname.includes('multi') ? 'multispectral' : 'rgb',
      timestamp: new Date()
    }));

    const droneReport = new DroneReport({
      damageReport: damageReportId,
      flightData: JSON.parse(flightData),
      images,
      analysis: JSON.parse(analysis),
      reportUrl: `reports/drone-${damageReportId}.pdf`
    });

    await droneReport.save();
    
    // Update damage report status
    damageReport.status = 'review';
    await damageReport.save();

    res.status(201).json(droneReport);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get drone report by damage report ID
router.get('/damage/:damageReportId', auth, async (req, res) => {
  try {
    const droneReport = await DroneReport.findOne({ damageReport: req.params.damageReportId });
    if (!droneReport) {
      return res.status(404).json({ message: 'Drone report not found' });
    }
    res.json(droneReport);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Download drone report PDF
router.get('/:id/download', auth, async (req, res) => {
  try {
    const droneReport = await DroneReport.findById(req.params.id);
    if (!droneReport) {
      return res.status(404).json({ message: 'Drone report not found' });
    }

    // TODO: Generate PDF report
    res.download(droneReport.reportUrl);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;