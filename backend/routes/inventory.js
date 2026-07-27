const express = require('express');
const pool = require('../config/database');
const { verifyToken } = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Get all inventory items
router.get('/', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inventory ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get inventory by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inventory WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create inventory item
router.post('/', verifyToken, async (req, res) => {
  try {
    const { item_type, name, location, total_quantity, available_quantity, cost_price } = req.body;
    const result = await pool.query(
      'INSERT INTO inventory (id, item_type, name, location, total_quantity, available_quantity, cost_price) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [uuidv4(), item_type, name, location, total_quantity, available_quantity, cost_price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update inventory item
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { available_quantity } = req.body;
    const result = await pool.query(
      'UPDATE inventory SET available_quantity=$1, updated_at=NOW() WHERE id=$2 RETURNING *',
      [available_quantity, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
