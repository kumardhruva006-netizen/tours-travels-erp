# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All endpoints except `/auth/login` and `/auth/register` require JWT token in header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User
```
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "role": "staff"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "staff"
  }
}
```

### Login
```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "staff"
  }
}
```

---

## Customers Endpoints

### Get All Customers
```
GET /customers
```

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Rajesh Kumar",
    "email": "rajesh@email.com",
    "phone": "9876543210",
    "address": "123 Main St",
    "city": "Delhi",
    "country": "India",
    "passport_number": "A12345678",
    "created_at": "2024-07-27T..."
  }
]
```

### Get Customer by ID
```
GET /customers/:id
```

### Create Customer
```
POST /customers
```

**Request Body:**
```json
{
  "name": "Priya Singh",
  "email": "priya@email.com",
  "phone": "8765432109",
  "address": "456 Oak Ave",
  "city": "Mumbai",
  "country": "India",
  "passport_number": "B87654321"
}
```

### Update Customer
```
PUT /customers/:id
```

### Delete Customer
```
DELETE /customers/:id
```

---

## Packages Endpoints

### Get All Packages
```
GET /packages
```

### Get Package by ID
```
GET /packages/:id
```

### Create Package
```
POST /packages
```

**Request Body:**
```json
{
  "name": "Taj Mahal Tour",
  "description": "Experience the beauty of Taj Mahal",
  "destination": "Agra",
  "days": 3,
  "price": 15000,
  "capacity": 20,
  "start_date": "2024-08-01",
  "end_date": "2024-08-03"
}
```

### Update Package
```
PUT /packages/:id
```

### Delete Package
```
DELETE /packages/:id
```

---

## Bookings Endpoints

### Get All Bookings
```
GET /bookings
```

**Response includes:**
- customer_name
- package_name
- no_of_persons
- status

### Get Booking by ID
```
GET /bookings/:id
```

### Create Booking
```
POST /bookings
```

**Request Body:**
```json
{
  "customer_id": "uuid",
  "package_id": "uuid",
  "no_of_persons": 2,
  "booking_date": "2024-07-27",
  "status": "pending"
}
```

### Update Booking
```
PUT /bookings/:id
```

**Request Body:**
```json
{
  "no_of_persons": 3,
  "status": "confirmed"
}
```

Status values: `pending`, `confirmed`, `completed`, `cancelled`

### Delete Booking
```
DELETE /bookings/:id
```

---

## Payments Endpoints

### Get All Payments
```
GET /payments
```

### Get Payment by ID
```
GET /payments/:id
```

### Create Payment
```
POST /payments
```

**Request Body:**
```json
{
  "booking_id": "uuid",
  "amount": 30000,
  "payment_method": "credit_card",
  "transaction_id": "TXN123456"
}
```

Payment methods: `credit_card`, `debit_card`, `bank_transfer`, `cash`

### Update Payment Status
```
PUT /payments/:id
```

**Request Body:**
```json
{
  "status": "completed"
}
```

Status values: `pending`, `completed`, `failed`

---

## Inventory Endpoints

### Get All Inventory Items
```
GET /inventory
```

### Get Inventory Item by ID
```
GET /inventory/:id
```

### Create Inventory Item
```
POST /inventory
```

**Request Body:**
```json
{
  "item_type": "hotel",
  "name": "Taj View Hotel",
  "location": "Agra",
  "total_quantity": 50,
  "available_quantity": 35,
  "cost_price": 5000
}
```

Item types: `hotel`, `transport`, `guide`

### Update Inventory Item
```
PUT /inventory/:id
```

**Request Body:**
```json
{
  "available_quantity": 30
}
```

---

## Reports Endpoints

### Get Total Revenue
```
GET /reports/revenue/total
```

**Response:**
```json
{
  "total_revenue": 150000,
  "total_payments": 5
}
```

### Get Booking Statistics
```
GET /reports/bookings/stats
```

**Response:**
```json
[
  {
    "status": "pending",
    "count": 3
  },
  {
    "status": "confirmed",
    "count": 5
  }
]
```

### Get Customer Statistics
```
GET /reports/customers/stats
```

**Response:**
```json
{
  "total_customers": 25
}
```

### Get Package Performance
```
GET /reports/packages/performance
```

**Response:**
```json
[
  {
    "name": "Taj Mahal Tour",
    "bookings": 10,
    "revenue": 150000
  }
]
```

---

## Error Responses

### 401 Unauthorized
```json
{
  "error": "Invalid token"
}
```

### 403 Forbidden
```json
{
  "error": "No token provided"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Server Error
```json
{
  "error": "Something went wrong!",
  "message": "error message details"
}
```

---

## Testing with Postman

1. Import collection from `/postman/collection.json` (if available)
2. Set environment variable `base_url` = `http://localhost:5000/api`
3. Set environment variable `token` = token received from login
4. Test each endpoint

---

For more details, check individual module documentation.
