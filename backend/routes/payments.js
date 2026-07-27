const express = require('express');
const pool = require('../config/database');
const { verifyToken } = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Get all payments
router.get('/', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT p.*, b.id as booking_id, c.name as customer_name FROM payments p JOIN bookings b ON p.booking_id = b.id JOIN customers c ON b.customer_id = c.id ORDER BY p.created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get payment by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT p.*, c.name as customer_name FROM payments p JOIN bookings b ON p.booking_id = b.id JOIN customers c ON b.customer_id = c.id WHERE p.id = $1',
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create payment
router.post('/', verifyToken, async (req, res) => {
  try {
    const { booking_id, amount, payment_method, transaction_id } = req.body;
    const result = await pool.query(
      'INSERT INTO payments (id, booking_id, amount, payment_method, transaction_id, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [uuidv4(), booking_id, amount, payment_method, transaction_id, 'completed']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update payment status
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    const result = await pool.query(
      'UPDATE payments SET status=$1, updated_at=NOW() WHERE id=$2 RETURNING *',
      [status, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
