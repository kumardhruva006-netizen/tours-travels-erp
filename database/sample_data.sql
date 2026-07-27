-- Sample Data for Testing

-- Insert Sample Users
INSERT INTO users (name, email, password, phone, role) VALUES
('Admin User', 'admin@tourserp.com', '$2a$10$X5WZS5q8Rm0qCb.7E1q4e.Jz3xWZZZZZZZZZZZZZZZZZZZZZZZZZ', '1234567890', 'admin'),
('John Staff', 'john@tourserp.com', '$2a$10$X5WZS5q8Rm0qCb.7E1q4e.Jz3xWZZZZZZZZZZZZZZZZZZZZZZZZZ', '9876543210', 'staff');

-- Insert Sample Customers
INSERT INTO customers (name, email, phone, address, city, country, passport_number) VALUES
('Rajesh Kumar', 'rajesh@email.com', '9876543210', '123 Main St', 'Delhi', 'India', 'A12345678'),
('Priya Singh', 'priya@email.com', '8765432109', '456 Oak Ave', 'Mumbai', 'India', 'B87654321'),
('Amit Patel', 'amit@email.com', '7654321098', '789 Pine Rd', 'Bangalore', 'India', 'C11223344');

-- Insert Sample Packages
INSERT INTO packages (name, description, destination, days, price, capacity, start_date, end_date) VALUES
('Taj Mahal Tour', 'Experience the beauty of Taj Mahal', 'Agra', 3, 15000.00, 20, '2024-08-01', '2024-08-03'),
('Goa Beach Vacation', 'Relax on the beaches of Goa', 'Goa', 5, 25000.00, 30, '2024-08-15', '2024-08-19'),
('Himalayas Adventure', 'Trek and explore the mighty Himalayas', 'Himachal Pradesh', 7, 40000.00, 15, '2024-09-01', '2024-09-07');

-- Insert Sample Bookings
INSERT INTO bookings (customer_id, package_id, no_of_persons, booking_date, status, total_cost) VALUES
((SELECT id FROM customers WHERE name='Rajesh Kumar'), (SELECT id FROM packages WHERE name='Taj Mahal Tour'), 2, '2024-07-20', 'confirmed', 30000.00),
((SELECT id FROM customers WHERE name='Priya Singh'), (SELECT id FROM packages WHERE name='Goa Beach Vacation'), 3, '2024-07-25', 'pending', 75000.00),
((SELECT id FROM customers WHERE name='Amit Patel'), (SELECT id FROM packages WHERE name='Himalayas Adventure'), 1, '2024-07-22', 'confirmed', 40000.00);

-- Insert Sample Payments
INSERT INTO payments (booking_id, amount, payment_method, transaction_id, status) VALUES
((SELECT id FROM bookings LIMIT 1), 30000.00, 'credit_card', 'TXN123456', 'completed'),
((SELECT id FROM bookings LIMIT 1 OFFSET 1), 37500.00, 'bank_transfer', 'TXN123457', 'pending'),
((SELECT id FROM bookings LIMIT 1 OFFSET 2), 40000.00, 'debit_card', 'TXN123458', 'completed');

-- Insert Sample Inventory
INSERT INTO inventory (item_type, name, location, total_quantity, available_quantity, cost_price) VALUES
('hotel', 'Taj View Hotel', 'Agra', 50, 35, 5000.00),
('transport', 'AC Coach - Delhi to Agra', 'Delhi', 10, 8, 2000.00),
('guide', 'Expert Tour Guide - Hindi', 'Agra', 20, 15, 1500.00),
('hotel', 'Beach Resort Goa', 'Goa', 100, 75, 8000.00),
('transport', 'Tempo Traveller', 'Goa', 15, 12, 3000.00);
