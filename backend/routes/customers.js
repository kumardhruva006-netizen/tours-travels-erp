const express = require('express');
const pool = require('../config/database');
const { verifyToken } = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Get all customers
router.get('/', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get customer by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create customer
router.post('/', verifyToken, async (req, res) => {
  try {
    const { name, email, phone, address, city, country, passport_number } = req.body;
    const result = await pool.query(
      'INSERT INTO customers (id, name, email, phone, address, city, country, passport_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [uuidv4(), name, email, phone, address, city, country, passport_number]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update customer
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { name, email, phone, address, city, country, passport_number } = req.body;
    const result = await pool.query(
      'UPDATE customers SET name=$1, email=$2, phone=$3, address=$4, city=$5, country=$6, passport_number=$7, updated_at=NOW() WHERE id=$8 RETURNING *',
      [name, email, phone, address, city, country, passport_number, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete customer
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM customers WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json({ message: 'Customer deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
