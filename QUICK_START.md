# Quick Reference Guide

## 🚀 Quick Commands

### Database
```bash
# Start PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE tours_travels_erp;

# Load schema
\i database/init.sql

# Load sample data
\i database/sample_data.sql

# List tables
\dt
```

### Backend
```bash
cd backend

# Install
npm install

# Develop
npm run dev

# Start
npm start

# Check health
curl http://localhost:5000/api/health
```

### Frontend
```bash
cd frontend

# Install
npm install

# Start
npm start

# Build
npm run build

# Test
npm test
```

---

## 🔑 Test Credentials

```
Email: admin@tourserp.com
Password: password123
Role: admin
```

---

## 🌐 URLs

```
Frontend:    http://localhost:3000
Backend:     http://localhost:5000
API:         http://localhost:5000/api
Database:    localhost:5432
```

---

## 📖 Important Files

```
backend/.env              - Backend config
frontend/.env             - Frontend config
database/init.sql         - Database schema
database/sample_data.sql  - Test data
SETUP_GUIDE.md           - Full setup
API_DOCUMENTATION.md     - API reference
```

---

## ✅ Checklist

- [ ] Node.js installed
- [ ] PostgreSQL installed
- [ ] Repository cloned
- [ ] Database created
- [ ] Backend running
- [ ] Frontend running
- [ ] Login successful
- [ ] All modules working

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Can't connect to DB | Check PostgreSQL is running, verify credentials |
| Port already in use | Change port in .env or kill existing process |
| npm install fails | Run `npm cache clean --force` |
| Login fails | Check database has users table and sample data |
| API returns 404 | Verify backend is running on port 5000 |

---

## 📱 API Usage Examples

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@tourserp.com",
    "password": "password123"
  }'
```

### Get Customers
```bash
curl -X GET http://localhost:5000/api/customers \
  -H "Authorization: Bearer <token>"
```

### Create Customer
```bash
curl -X POST http://localhost:5000/api/customers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "city": "New York",
    "country": "USA"
  }'
```

---

## 🎯 Module Workflow

```
1. Login
   ↓
2. View Dashboard
   ↓
3. Add Customer
   ↓
4. Create Package
   ↓
5. Create Booking
   ↓
6. Record Payment
   ↓
7. View Reports
```

---

## 📞 Getting Help

1. Read SETUP_GUIDE.md
2. Check API_DOCUMENTATION.md
3. Review PROJECT_STRUCTURE.md
4. Search GitHub issues
5. Contact support

---

**Created with ❤️ for Travel Industry**
