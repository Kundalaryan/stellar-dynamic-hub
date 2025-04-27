
const express = require('express');
const { pool } = require('../config/database');
const router = express.Router();

// Get all publications
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM publications ORDER BY year DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching publications:', error);
    res.status(500).json({ error: 'Failed to fetch publications' });
  }
});

// Get a single publication by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM publications WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Publication not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching publication:', error);
    res.status(500).json({ error: 'Failed to fetch publication' });
  }
});

// Create a new publication
router.post('/', async (req, res) => {
  const { title, authors, journal, year, doi } = req.body;
  
  if (!title || !authors || !journal || !year || !doi) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  try {
    const [result] = await pool.query(
      'INSERT INTO publications (title, authors, journal, year, doi) VALUES (?, ?, ?, ?, ?)',
      [title, authors, journal, year, doi]
    );
    
    res.status(201).json({
      id: result.insertId,
      title,
      authors,
      journal,
      year,
      doi
    });
  } catch (error) {
    console.error('Error creating publication:', error);
    res.status(500).json({ error: 'Failed to create publication' });
  }
});

// Update a publication
router.put('/:id', async (req, res) => {
  const { title, authors, journal, year, doi } = req.body;
  
  if (!title || !authors || !journal || !year || !doi) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  try {
    const [result] = await pool.query(
      'UPDATE publications SET title = ?, authors = ?, journal = ?, year = ?, doi = ? WHERE id = ?',
      [title, authors, journal, year, doi, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Publication not found' });
    }
    
    res.json({
      id: parseInt(req.params.id),
      title,
      authors,
      journal,
      year,
      doi
    });
  } catch (error) {
    console.error('Error updating publication:', error);
    res.status(500).json({ error: 'Failed to update publication' });
  }
});

// Delete a publication
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM publications WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Publication not found' });
    }
    
    res.json({ message: 'Publication deleted successfully' });
  } catch (error) {
    console.error('Error deleting publication:', error);
    res.status(500).json({ error: 'Failed to delete publication' });
  }
});

module.exports = router;
