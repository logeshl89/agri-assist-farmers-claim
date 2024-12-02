import express from 'express';
import { auth, checkRole } from '../middleware/auth.js';
import Farmer from '../models/Farmer.js';

const router = express.Router();

// Get farmer profile
router.get('/profile', auth, checkRole(['farmer']), async (req, res) => {
  try {
    const farmer = await Farmer.findOne({ user: req.user.userId }).populate('user', '-password');
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer profile not found' });
    }
    res.json(farmer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create farmer profile
router.post('/', auth, checkRole(['farmer']), async (req, res) => {
  try {
    const { address, farmSize, primaryCrop, location } = req.body;
    
    const existingFarmer = await Farmer.findOne({ user: req.user.userId });
    if (existingFarmer) {
      return res.status(400).json({ message: 'Farmer profile already exists' });
    }

    const farmer = new Farmer({
      user: req.user.userId,
      address,
      farmSize,
      primaryCrop,
      location
    });

    await farmer.save();
    res.status(201).json(farmer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update farmer profile
router.patch('/:id', auth, checkRole(['farmer']), async (req, res) => {
  try {
    const farmer = await Farmer.findOne({ _id: req.params.id, user: req.user.userId });
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    const updates = Object.keys(req.body);
    updates.forEach(update => farmer[update] = req.body[update]);
    await farmer.save();

    res.json(farmer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;