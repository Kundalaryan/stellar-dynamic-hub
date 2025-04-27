
const express = require('express');
const { pool } = require('../config/database');
const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM projects');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get a single project by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Create a new project
router.post('/', async (req, res) => {
  const { title, description, category, image, link } = req.body;
  
  if (!title || !description || !category) {
    return res.status(400).json({ error: 'Title, description, and category are required' });
  }
  
  try {
    const [result] = await pool.query(
      'INSERT INTO projects (title, description, category, image, link) VALUES (?, ?, ?, ?, ?)',
      [title, description, category, image || null, link || null]
    );
    
    res.status(201).json({
      id: result.insertId,
      title,
      description,
      category,
      image,
      link
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Update a project
router.put('/:id', async (req, res) => {
  const { title, description, category, image, link } = req.body;
  
  if (!title || !description || !category) {
    return res.status(400).json({ error: 'Title, description, and category are required' });
  }
  
  try {
    const [result] = await pool.query(
      'UPDATE projects SET title = ?, description = ?, category = ?, image = ?, link = ? WHERE id = ?',
      [title, description, category, image || null, link || null, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json({
      id: parseInt(req.params.id),
      title,
      description,
      category,
      image,
      link
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete a project
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

module.exports = router;
