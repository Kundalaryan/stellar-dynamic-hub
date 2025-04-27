
const express = require('express');
const { pool } = require('../config/database');
const router = express.Router();

// Get all team members
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM team_members');
    
    // Format the response to match the frontend structure
    const members = rows.map(member => ({
      id: member.id,
      name: member.name,
      role: member.role,
      bio: member.bio,
      image: member.image,
      social: {
        linkedin: member.linkedin || '#',
        twitter: member.twitter || '#',
        github: member.github || '#'
      }
    }));
    
    res.json(members);
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
});

// Get a single team member by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM team_members WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    const member = rows[0];
    res.json({
      id: member.id,
      name: member.name,
      role: member.role,
      bio: member.bio,
      image: member.image,
      social: {
        linkedin: member.linkedin || '#',
        twitter: member.twitter || '#',
        github: member.github || '#'
      }
    });
  } catch (error) {
    console.error('Error fetching team member:', error);
    res.status(500).json({ error: 'Failed to fetch team member' });
  }
});

// Create a new team member
router.post('/', async (req, res) => {
  const { name, role, bio, image, social } = req.body;
  
  if (!name || !role || !bio) {
    return res.status(400).json({ error: 'Name, role, and bio are required' });
  }
  
  try {
    const [result] = await pool.query(
      'INSERT INTO team_members (name, role, bio, image, linkedin, twitter, github) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        name, 
        role, 
        bio, 
        image || null, 
        social?.linkedin || '#', 
        social?.twitter || '#', 
        social?.github || '#'
      ]
    );
    
    res.status(201).json({
      id: result.insertId,
      name,
      role,
      bio,
      image,
      social: {
        linkedin: social?.linkedin || '#',
        twitter: social?.twitter || '#',
        github: social?.github || '#'
      }
    });
  } catch (error) {
    console.error('Error creating team member:', error);
    res.status(500).json({ error: 'Failed to create team member' });
  }
});

// Update a team member
router.put('/:id', async (req, res) => {
  const { name, role, bio, image, social } = req.body;
  
  if (!name || !role || !bio) {
    return res.status(400).json({ error: 'Name, role, and bio are required' });
  }
  
  try {
    const [result] = await pool.query(
      'UPDATE team_members SET name = ?, role = ?, bio = ?, image = ?, linkedin = ?, twitter = ?, github = ? WHERE id = ?',
      [
        name, 
        role, 
        bio, 
        image || null, 
        social?.linkedin || '#', 
        social?.twitter || '#', 
        social?.github || '#',
        req.params.id
      ]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    res.json({
      id: parseInt(req.params.id),
      name,
      role,
      bio,
      image,
      social: {
        linkedin: social?.linkedin || '#',
        twitter: social?.twitter || '#',
        github: social?.github || '#'
      }
    });
  } catch (error) {
    console.error('Error updating team member:', error);
    res.status(500).json({ error: 'Failed to update team member' });
  }
});

// Delete a team member
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM team_members WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({ error: 'Failed to delete team member' });
  }
});

module.exports = router;
