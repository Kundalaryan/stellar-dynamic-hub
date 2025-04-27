
const express = require('express');
const { pool } = require('../config/database');
const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM events');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Get a single event by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM events WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// Create a new event
router.post('/', async (req, res) => {
  const { title, date, time, location, description, type, registration } = req.body;
  
  if (!title || !date || !time || !location || !description || !type) {
    return res.status(400).json({ error: 'All fields except registration are required' });
  }
  
  try {
    const [result] = await pool.query(
      'INSERT INTO events (title, date, time, location, description, type, registration) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, date, time, location, description, type, registration || false]
    );
    
    res.status(201).json({
      id: result.insertId,
      title,
      date,
      time,
      location,
      description,
      type,
      registration: registration || false
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Update an event
router.put('/:id', async (req, res) => {
  const { title, date, time, location, description, type, registration } = req.body;
  
  if (!title || !date || !time || !location || !description || !type) {
    return res.status(400).json({ error: 'All fields except registration are required' });
  }
  
  try {
    const [result] = await pool.query(
      'UPDATE events SET title = ?, date = ?, time = ?, location = ?, description = ?, type = ?, registration = ? WHERE id = ?',
      [title, date, time, location, description, type, registration || false, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json({
      id: parseInt(req.params.id),
      title,
      date,
      time,
      location,
      description,
      type,
      registration: registration || false
    });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// Delete an event
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM events WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

module.exports = router;
