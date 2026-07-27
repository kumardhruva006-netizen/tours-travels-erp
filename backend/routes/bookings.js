const express = require('express');
const pool = require('../config/database');
const { verifyToken } = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Get all bookings
router.get('/', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT b.*, c.name as customer_name, p.name as package_name FROM bookings b JOIN customers c ON b.customer_id = c.id JOIN packages p ON b.package_id = p.id ORDER BY b.created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get booking by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT b.*, c.name as customer_name, p.name as package_name FROM bookings b JOIN customers c ON b.customer_id = c.id JOIN packages p ON b.package_id = p.id WHERE b.id = $1',
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create booking
router.post('/', verifyToken, async (req, res) => {
  try {
    const { customer_id, package_id, no_of_persons, booking_date, status } = req.body;
    const result = await pool.query(
      'INSERT INTO bookings (id, customer_id, package_id, no_of_persons, booking_date, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [uuidv4(), customer_id, package_id, no_of_persons, booking_date, status || 'pending']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update booking
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { no_of_persons, status } = req.body;
    const result = await pool.query(
      'UPDATE bookings SET no_of_persons=$1, status=$2, updated_at=NOW() WHERE id=$3 RETURNING *',
      [no_of_persons, status, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete booking
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM bookings WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
