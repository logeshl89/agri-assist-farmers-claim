import express from 'express';
import { auth, checkRole } from '../middleware/auth.js';
import SubsidyClaim from '../models/SubsidyClaim.js';
import DamageReport from '../models/DamageReport.js';
import Farmer from '../models/Farmer.js';

const router = express.Router();

// Create subsidy claim
router.post('/', auth, checkRole(['farmer']), async (req, res) => {
  try {
    const farmer = await Farmer.findOne({ user: req.user.userId });
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer profile not found' });
    }

    const damageReport = await DamageReport.findOne({
      _id: req.body.damageReport,
      farmer: farmer._id
    });

    if (!damageReport) {
      return res.status(404).json({ message: 'Damage report not found' });
    }

    const subsidyClaim = new SubsidyClaim({
      damageReport: damageReport._id,
      scheme: req.body.scheme,
      amount: req.body.amount
    });

    await subsidyClaim.save();
    res.status(201).json(subsidyClaim);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all subsidy claims
router.get('/', auth, async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'farmer') {
      const farmer = await Farmer.findOne({ user: req.user.userId });
      if (!farmer) {
        return res.status(404).json({ message: 'Farmer profile not found' });
      }
      const damageReports = await DamageReport.find({ farmer: farmer._id });
      query.damageReport = { $in: damageReports.map(report => report._id) };
    }

    const subsidyClaims = await SubsidyClaim.find(query)
      .populate('damageReport')
      .populate('scheme')
      .sort({ submittedAt: -1 });
    
    res.json(subsidyClaims);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update subsidy claim status (admin only)
router.patch('/:id/status', auth, checkRole(['admin']), async (req, res) => {
  try {
    const { status } = req.body;
    const subsidyClaim = await SubsidyClaim.findById(req.params.id);
    
    if (!subsidyClaim) {
      return res.status(404).json({ message: 'Subsidy claim not found' });
    }

    subsidyClaim.status = status;
    subsidyClaim.processedAt = status !== 'pending' ? new Date() : null;
    await subsidyClaim.save();
    
    res.json(subsidyClaim);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;