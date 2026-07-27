const express = require('express');
const pool = require('../config/database');
const { verifyToken } = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Get all packages
router.get('/', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM packages ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get package by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM packages WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create package
router.post('/', verifyToken, async (req, res) => {
  try {
    const { name, description, destination, days, price, capacity, start_date, end_date } = req.body;
    const result = await pool.query(
      'INSERT INTO packages (id, name, description, destination, days, price, capacity, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [uuidv4(), name, description, destination, days, price, capacity, start_date, end_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update package
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { name, description, destination, days, price, capacity, start_date, end_date } = req.body;
    const result = await pool.query(
      'UPDATE packages SET name=$1, description=$2, destination=$3, days=$4, price=$5, capacity=$6, start_date=$7, end_date=$8, updated_at=NOW() WHERE id=$9 RETURNING *',
      [name, description, destination, days, price, capacity, start_date, end_date, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete package
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM packages WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json({ message: 'Package deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
