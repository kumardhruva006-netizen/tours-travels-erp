-- Queries for Reports and Analytics

-- 1. Total Revenue
SELECT 
  SUM(amount) as total_revenue,
  COUNT(*) as total_payments,
  AVG(amount) as average_payment
FROM payments
WHERE status = 'completed';

-- 2. Booking Statistics
SELECT 
  status,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM bookings), 2) as percentage
FROM bookings
GROUP BY status;

-- 3. Package Performance
SELECT 
  p.name,
  p.destination,
  COUNT(b.id) as total_bookings,
  SUM(b.no_of_persons) as total_persons,
  SUM(py.amount) as revenue
FROM packages p
LEFT JOIN bookings b ON p.id = b.package_id
LEFT JOIN payments py ON b.id = py.booking_id AND py.status = 'completed'
GROUP BY p.id, p.name, p.destination
ORDER BY revenue DESC;

-- 4. Customer Booking History
SELECT 
  c.name as customer_name,
  c.email,
  COUNT(b.id) as total_bookings,
  SUM(b.total_cost) as total_spent
FROM customers c
LEFT JOIN bookings b ON c.id = b.customer_id
GROUP BY c.id, c.name, c.email
ORDER BY total_spent DESC;

-- 5. Monthly Revenue
SELECT 
  DATE_TRUNC('month', py.payment_date)::date as month,
  COUNT(*) as payment_count,
  SUM(py.amount) as monthly_revenue
FROM payments py
WHERE py.status = 'completed'
GROUP BY DATE_TRUNC('month', py.payment_date)
ORDER BY month DESC;

-- 6. Inventory Status
SELECT 
  item_type,
  name,
  total_quantity,
  available_quantity,
  (total_quantity - available_quantity) as booked,
  ROUND((available_quantity * 100.0 / total_quantity), 2) as availability_percentage
FROM inventory
ORDER BY availability_percentage ASC;

-- 7. Pending Payments
SELECT 
  py.id,
  c.name as customer_name,
  p.name as package_name,
  py.amount,
  py.payment_method,
  py.payment_date
FROM payments py
JOIN bookings b ON py.booking_id = b.id
JOIN customers c ON b.customer_id = c.id
JOIN packages p ON b.package_id = p.id
WHERE py.status = 'pending'
ORDER BY py.payment_date;
