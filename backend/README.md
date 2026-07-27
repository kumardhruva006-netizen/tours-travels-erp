# Tours & Travels ERP Backend

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Database
- Install PostgreSQL
- Create database: `tours_travels_erp`
- Run SQL scripts from `database/` folder

### 3. Environment Setup
```bash
cp .env.example .env
# Edit .env with your database credentials
```

### 4. Run Server
```bash
# Development
npm run dev

# Production
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get customer by ID
- `POST /api/customers` - Create customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Packages
- `GET /api/packages` - Get all packages
- `GET /api/packages/:id` - Get package by ID
- `POST /api/packages` - Create package
- `PUT /api/packages/:id` - Update package
- `DELETE /api/packages/:id` - Delete package

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get booking by ID
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking

### Payments
- `GET /api/payments` - Get all payments
- `GET /api/payments/:id` - Get payment by ID
- `POST /api/payments` - Create payment
- `PUT /api/payments/:id` - Update payment

### Inventory
- `GET /api/inventory` - Get all items
- `GET /api/inventory/:id` - Get item by ID
- `POST /api/inventory` - Create item
- `PUT /api/inventory/:id` - Update item

### Reports
- `GET /api/reports/revenue/total` - Total revenue
- `GET /api/reports/bookings/stats` - Booking statistics
- `GET /api/reports/customers/stats` - Customer statistics
- `GET /api/reports/packages/performance` - Package performance
