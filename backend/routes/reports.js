const express = require('express');
const pool = require('../config/database');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Revenue report
router.get('/revenue/total', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT SUM(amount) as total_revenue, COUNT(*) as total_payments FROM payments WHERE status = \'completed\''
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Booking statistics
router.get('/bookings/stats', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT status, COUNT(*) as count FROM bookings GROUP BY status'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Customer statistics
router.get('/customers/stats', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT COUNT(*) as total_customers FROM customers'
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Package performance
router.get('/packages/performance', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT p.name, COUNT(b.id) as bookings, SUM(py.amount) as revenue FROM packages p LEFT JOIN bookings b ON p.id = b.package_id LEFT JOIN payments py ON b.id = py.booking_id GROUP BY p.id, p.name'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
