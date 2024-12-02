import express from 'express';
import { auth, checkRole } from '../middleware/auth.js';
import Scheme from '../models/Scheme.js';

const router = express.Router();

// Get all schemes
router.get('/', auth, async (req, res) => {
  try {
    const schemes = await Scheme.find().sort({ createdAt: -1 });
    res.json(schemes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new scheme (admin only)
router.post('/', auth, checkRole(['admin']), async (req, res) => {
  try {
    const scheme = new Scheme(req.body);
    await scheme.save();
    res.status(201).json(scheme);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update scheme (admin only)
router.patch('/:id', auth, checkRole(['admin']), async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found' });
    }

    const updates = Object.keys(req.body);
    updates.forEach(update => scheme[update] = req.body[update]);
    await scheme.save();

    res.json(scheme);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;