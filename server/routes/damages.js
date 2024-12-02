import express from 'express';
import multer from 'multer';
import DamageReport from '../models/DamageReport.js';
import  {auth} from '../middleware/auth.js';
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage });

// Public endpoint to check damage report status by ID
router.get('/status/:id', async (req, res) => {
  try {
    const report = await DamageReport.findById(req.params.id)
        .select('id status createdAt cropType estimatedDamage');

    if (!report) {
      return res.status(404).json({ message: 'Damage report not found' });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Protected routes below
router.use(auth);

// Create damage report
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const { cropType, damageType, description, location } = req.body;
    const images = req.files.map(file => ({
      url: `uploads/${file.filename}`
    }));

    const damageReport = new DamageReport({
      farmer: req.user.id,
      cropType,
      damageType,
      description,
      location: JSON.parse(location),
      images
    });

    await damageReport.save();
    res.status(201).json(damageReport);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all damage reports
router.get('/', async (req, res) => {
  try {
    const reports = await DamageReport.find()
        .populate('farmer')
        .sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update damage report status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const report = await DamageReport.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
    );

    if (!report) {
      return res.status(404).json({ message: 'Damage report not found' });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;