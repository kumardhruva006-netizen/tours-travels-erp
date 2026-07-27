# Tours & Travels ERP Management System

🌍 **A Complete Web-Based ERP System for Tours and Travel Businesses**

## ✨ Features

✅ **User Authentication** - Secure login/registration with JWT
✅ **Customer Management** - Store and manage customer details
✅ **Tour Package Management** - Create and manage tour packages
✅ **Booking System** - Handle booking requests and confirmations
✅ **Payment Tracking** - Monitor payments and transactions
✅ **Inventory Management** - Track hotels, transport, and guides
✅ **Reports & Analytics** - Revenue, bookings, and performance metrics
✅ **Responsive UI** - Works on desktop, tablet, and mobile
✅ **Role-based Access** - Admin and staff roles
✅ **Real-time Updates** - Live data synchronization

---

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Node.js v14+ ([Download](https://nodejs.org/))
- PostgreSQL 12+ ([Download](https://www.postgresql.org/))
- Git ([Download](https://git-scm.com/))

### Step 1: Clone Repository
```bash
git clone <your-repo-url>
cd tours-travels-erp
```

### Step 2: Setup Database
```bash
# Start PostgreSQL
psql -U postgres

# Create database and tables
\c postgres
\i database/init.sql

# Load sample data (optional)
\i database/sample_data.sql

# Exit
\q
```

### Step 3: Setup Backend
```bash
cd backend

# Copy environment file
cp .env.example .env

# Install dependencies
npm install

# Start server
npm run dev
```

Server running at: `http://localhost:5000` ✅

### Step 4: Setup Frontend (New Terminal)
```bash
cd frontend

# Copy environment file
cp .env.example .env

# Install dependencies
npm install

# Start app
npm start
```

App opens at: `http://localhost:3000` ✅

### Step 5: Login
**Test Credentials:**
- Email: `admin@tourserp.com`
- Password: `password123`

---

## 📋 System Modules

### 1. Dashboard 📊
- Total revenue overview
- Customer statistics
- Booking status breakdown
- Active packages count

### 2. Customers 👥
- Add/Edit/Delete customers
- Store contact information
- Track passport details
- View booking history

### 3. Packages 🎫
- Create tour packages
- Set pricing and duration
- Manage capacity
- Track availability

### 4. Bookings 📅
- Create new bookings
- Track booking status
- Update passenger count
- Cancel if needed

### 5. Payments 💳
- Record payments
- Track payment methods
- Monitor transaction status
- View payment history

### 6. Inventory 📦
- Add hotels
- Register transport
- Add tour guides
- Update availability

### 7. Reports 📈
- Revenue analysis
- Booking statistics
- Customer insights
- Package performance

---

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Ant Design** - Beautiful UI components
- **Chart.js** - Data visualization

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password encryption

### Database
- **PostgreSQL** - Relational database
- **UUID** - Unique identifiers
- **Indexes** - Query optimization

---

## 📚 Documentation

| Document | Purpose |
|----------|----------|
| [SETUP_GUIDE.md](SETUP_GUIDE.md) | Complete setup instructions |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Production deployment guide |
| [API_DOCUMENTATION.md](API_DOCUMENTATION.md) | REST API reference |
| [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) | Project organization |
| [backend/README.md](backend/README.md) | Backend details |
| [frontend/README.md](frontend/README.md) | Frontend details |
| [database/README.md](database/README.md) | Database setup |

---

## 📁 Project Structure

```
tours-travels-erp/
├── backend/              # Node.js API Server
│   ├── config/          # Database configuration
│   ├── middleware/      # Auth middleware
│   ├── routes/          # API endpoints
│   ├── server.js        # Main server file
│   └── package.json     # Dependencies
├── frontend/            # React Application
│   ├── src/
│   │   ├── pages/       # Page components
│   │   ├── components/  # Reusable components
│   │   ├── services/    # API calls
│   │   ├── context/     # State management
│   │   └── App.js       # Main component
│   └── package.json     # Dependencies
├── database/            # Database scripts
│   ├── init.sql         # Schema
│   ├── sample_data.sql  # Test data
│   └── reports.sql      # Report queries
└── docs/               # Documentation
```

---

## 🔐 Security Features

✅ JWT token authentication
✅ Password hashing with bcryptjs
✅ CORS protection
✅ Input validation
✅ SQL injection prevention
✅ Environment variables for secrets
✅ Role-based access control

---

## 📱 API Endpoints

### Authentication
```
POST   /api/auth/register      - Register user
POST   /api/auth/login         - Login user
```

### Resources
```
GET    /api/customers          - List customers
POST   /api/customers          - Add customer
GET    /api/packages           - List packages
POST   /api/packages           - Add package
GET    /api/bookings           - List bookings
POST   /api/bookings           - Add booking
GET    /api/payments           - List payments
POST   /api/payments           - Add payment
GET    /api/inventory          - List inventory
POST   /api/inventory          - Add item
```

### Reports
```
GET    /api/reports/revenue/total           - Total revenue
GET    /api/reports/bookings/stats          - Booking stats
GET    /api/reports/customers/stats         - Customer stats
GET    /api/reports/packages/performance    - Package performance
```

---

## 🚨 Troubleshooting

### Database Connection Error
```bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT 1;"

# Verify credentials in backend/.env
```

### Port Already in Use
```bash
# Find process using port
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill process
kill -9 <PID>  # macOS/Linux
```

### npm Install Fails
```bash
# Clear cache
npm cache clean --force

# Delete and reinstall
rm -rf node_modules package-lock.json
npm install
```

For more troubleshooting, see [SETUP_GUIDE.md](SETUP_GUIDE.md#troubleshooting)

---

## 📊 Database Schema

### Tables
- **users** - Staff and admin accounts
- **customers** - Customer information
- **packages** - Tour packages
- **bookings** - Booking records
- **payments** - Payment transactions
- **inventory** - Hotels, transport, guides

### Relationships
```
Customers → Bookings → Payments
Packages → Bookings → Payments
Inventory (independent)
```

---

## 🎯 Next Steps

1. ✅ **Setup** - Follow Quick Start above
2. 📖 **Learn** - Read [SETUP_GUIDE.md](SETUP_GUIDE.md)
3. 📚 **Understand** - Review [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
4. 🔧 **Customize** - Modify for your business
5. 🚀 **Deploy** - Follow [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 🤝 Contributing

To contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 💬 Support

For issues or questions:
1. Check [SETUP_GUIDE.md](SETUP_GUIDE.md) troubleshooting
2. Review [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
3. Check GitHub issues
4. Contact support

---

## 📞 Contact

- **Email**: support@tourserpmanagement.com
- **Website**: www.tourserpmanagement.com
- **GitHub Issues**: [Report a bug](../../issues)

---

## 🎉 Thank You!

Thank you for using Tours & Travels ERP Management System!

If you found this helpful, please ⭐ star the repository.

**Happy Tours & Travels Management!** 🌍✈️🏨

---

## 📝 Version

**Current Version**: 1.0.0
**Last Updated**: July 27, 2024

---

## 🗺️ Roadmap

### v1.1 (Planned)
- [ ] Email notifications
- [ ] SMS alerts
- [ ] Advanced reporting
- [ ] Multi-currency support
- [ ] Mobile app

### v2.0 (Future)
- [ ] AI-powered recommendations
- [ ] Real-time chat support
- [ ] Integration with payment gateways
- [ ] Multi-branch support
- [ ] Advanced analytics

---

**Made with ❤️ for Travel Agencies Worldwide**
