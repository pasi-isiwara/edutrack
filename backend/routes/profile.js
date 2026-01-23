import express from 'express';
import db from '../db.js';

const router = express.Router();

// GET teacher profile
router.get('/teacher/:userId', async (req, res) => {
  const { userId } = req.params;
  
  try {
    const [rows] = await db.query(
      `SELECT id, name, email, phone, bio, qualifications, experience, specialization, role
       FROM users WHERE id = ?`,
      [userId]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE teacher profile
router.put('/teacher/:userId', async (req, res) => {
  const { userId } = req.params;
  const { name, phone, bio, qualifications, experience, specialization } = req.body;
  
  try {
    // Check if user exists
    const [existing] = await db.query(
      'SELECT id FROM users WHERE id = ?',
      [userId]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update profile
    await db.query(
      `UPDATE users 
       SET name = ?, phone = ?, bio = ?, qualifications = ?, experience = ?, specialization = ?
       WHERE id = ?`,
      [name, phone || null, bio || null, qualifications || null, experience || null, specialization || null, userId]
    );
    
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
