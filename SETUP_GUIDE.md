# Complete Setup Guide - Tours & Travels ERP System

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Database Setup](#database-setup)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Running the Application](#running-the-application)
6. [Testing the Application](#testing-the-application)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have installed:

### Required Software
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)
- **npm** (comes with Node.js)
- **Any Code Editor** (VS Code recommended)

### Verify Installation
```bash
node --version
npm --version
psql --version
git --version
```

---

## Database Setup

### Step 1: Start PostgreSQL Service

**Windows:**
- PostgreSQL service should start automatically after installation
- Or start it from Services app

**macOS:**
```bash
brew services start postgresql@15
```

**Linux:**
```bash
sudo systemctl start postgresql
```

### Step 2: Create Database and Tables

```bash
# Open PostgreSQL terminal
psql -U postgres

# Enter your postgres password when prompted
```

Then run the SQL commands:

```sql
CREATE DATABASE tours_travels_erp;
\c tours_travels_erp
```

Copy all SQL from `database/init.sql` and paste into psql terminal.

### Step 3: Load Sample Data (Optional)

```bash
psql -U postgres -d tours_travels_erp -f database/sample_data.sql
```

### Step 4: Verify Database

```bash
psql -U postgres -d tours_travels_erp
\dt  # List all tables
\q  # Quit
```

You should see:
- users
- customers
- packages
- bookings
- payments
- inventory

---

## Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- express
- pg (PostgreSQL driver)
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- and more...

### Step 3: Create Environment File

```bash
cp .env.example .env
```

### Step 4: Edit .env File

Open `backend/.env` and update:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tours_travels_erp
DB_USER=postgres
DB_PASSWORD=your_postgres_password

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_12345
JWT_EXPIRE=7d

# API Configuration
API_URL=http://localhost:5000
CLIENT_URL=http://localhost:3000
```

### Step 5: Start Backend Server

```bash
# Development mode with auto-reload
npm run dev

# OR Production mode
npm start
```

**Expected Output:**
```
✅ Connected to PostgreSQL Database
🚀 Server running on port 5000
```

### Step 6: Test Backend API

Open your browser and visit:
```
http://localhost:5000/api/health
```

You should see:
```json
{
  "status": "Server is running",
  "timestamp": "2024-07-27T..."
}
```

---

## Frontend Setup

### Step 1: Navigate to Frontend Directory

```bash
cd frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- react
- react-router-dom
- axios
- antd (Ant Design UI library)
- chart.js
- and more...

### Step 3: Create Environment File

```bash
cp .env.example .env
```

### Step 4: Edit .env File

Open `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 5: Start Frontend Development Server

```bash
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view tours-travels-erp-frontend in the browser.

Local:            http://localhost:3000
```

Browser should automatically open at `http://localhost:3000`

---

## Running the Application

### Step 1: Ensure Database is Running

```bash
# Test connection
psql -U postgres -d tours_travels_erp -c "SELECT 1;"
```

### Step 2: Start Backend (Terminal 1)

```bash
cd backend
npm run dev
```

Wait for:
```
✅ Connected to PostgreSQL Database
🚀 Server running on port 5000
```

### Step 3: Start Frontend (Terminal 2)

```bash
cd frontend
npm start
```

Wait for browser to open at `http://localhost:3000`

### Step 4: Login

**Test Credentials** (if you loaded sample data):
- Email: `admin@tourserp.com`
- Password: `password123`

(Note: Passwords in sample data need to be properly hashed - use test credentials)

---

## Testing the Application

### Test Each Module

#### 1. Dashboard
- View total revenue
- View customer count
- View booking statistics

#### 2. Customers
- ✅ Add new customer
- ✅ Edit customer details
- ✅ View all customers
- ✅ Delete customer

#### 3. Packages
- ✅ Create tour package
- ✅ Update package info
- ✅ View all packages
- ✅ Delete package

#### 4. Bookings
- ✅ Create new booking
- ✅ Update booking status
- ✅ View all bookings
- ✅ Cancel booking

#### 5. Payments
- ✅ Record payment
- ✅ View payment history
- ✅ Track payment status

#### 6. Inventory
- ✅ Add inventory items
- ✅ Update quantity
- ✅ View availability

---

## Troubleshooting

### Issue 1: "Cannot connect to database"

**Solution:**
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql  # Linux
brew services list  # macOS

# Verify database credentials in .env
# Check if database exists
psql -U postgres -l
```

### Issue 2: "npm install fails"

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue 3: "Port 5000 is already in use"

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows

# Or change port in backend/.env
PORT=5001
```

### Issue 4: "Port 3000 is already in use"

**Solution:**
```bash
# Kill process using port 3000
lsof -i :3000  # macOS/Linux

# Or set different port
PORT=3001 npm start
```

### Issue 5: "JWT token expired"

**Solution:**
- Log out and log back in
- Check JWT_EXPIRE in backend/.env

### Issue 6: CORS Error

**Solution:**
Verify in `backend/server.js`:
```javascript
app.use(cors());
```

And `.env` has correct URLs:
```env
CLIENT_URL=http://localhost:3000
```

---

## API Endpoints Reference

### Authentication
```
POST /api/auth/register
POST /api/auth/login
```

### Customers
```
GET    /api/customers
GET    /api/customers/:id
POST   /api/customers
PUT    /api/customers/:id
DELETE /api/customers/:id
```

### Packages
```
GET    /api/packages
GET    /api/packages/:id
POST   /api/packages
PUT    /api/packages/:id
DELETE /api/packages/:id
```

### Bookings
```
GET    /api/bookings
GET    /api/bookings/:id
POST   /api/bookings
PUT    /api/bookings/:id
DELETE /api/bookings/:id
```

### Payments
```
GET    /api/payments
GET    /api/payments/:id
POST   /api/payments
PUT    /api/payments/:id
```

### Inventory
```
GET    /api/inventory
GET    /api/inventory/:id
POST   /api/inventory
PUT    /api/inventory/:id
```

### Reports
```
GET /api/reports/revenue/total
GET /api/reports/bookings/stats
GET /api/reports/customers/stats
GET /api/reports/packages/performance
```

---

## Next Steps

✅ Application is now running!

You can:
- 📊 View dashboard with statistics
- 👥 Manage customers
- 🎒 Create tour packages
- 📅 Handle bookings
- 💰 Track payments
- 📦 Manage inventory
- 📈 Generate reports

### To Deploy (Production)

See `DEPLOYMENT.md` for production setup instructions.

---

## Support

For issues or questions:
1. Check troubleshooting section above
2. Review API documentation in each module's README
3. Check browser console for errors
4. Check server logs in terminal

**Happy Tours & Travels Management!** 🌍✈️
