# Project Structure

```
tours-travels-erp/
│
├── backend/                          # Node.js + Express API
│   ├── config/
│   │   └── database.js              # PostgreSQL connection
│   ├── middleware/
│   │   └── auth.js                  # JWT authentication
│   ├── routes/
│   │   ├── auth.js                  # Authentication endpoints
│   │   ├── customers.js             # Customer management
│   │   ├── packages.js              # Package management
│   │   ├── bookings.js              # Booking management
│   │   ├── payments.js              # Payment tracking
│   │   ├── inventory.js             # Inventory management
│   │   └── reports.js               # Reports & analytics
│   ├── server.js                    # Main server file
│   ├── package.json                 # Dependencies
│   ├── .env.example                 # Environment template
│   └── README.md                    # Backend documentation
│
├── frontend/                         # React Application
│   ├── public/
│   │   └── index.html               # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   └── PrivateRoute.js      # Protected routes
│   │   ├── context/
│   │   │   └── AuthContext.js       # Auth state management
│   │   ├── pages/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.js         # Login page
│   │   │   │   └── Auth.css         # Auth styles
│   │   │   ├── Layout/
│   │   │   │   └── MainLayout.js    # Main layout
│   │   │   ├── Dashboard.js         # Dashboard
│   │   │   ├── Customers.js         # Customers page
│   │   │   ├── Packages.js          # Packages page
│   │   │   ├── Bookings.js          # Bookings page
│   │   │   ├── Payments.js          # Payments page
│   │   │   └── Inventory.js         # Inventory page
│   │   ├── services/
│   │   │   ├── api.js               # Axios instance
│   │   │   └── index.js             # API service functions
│   │   ├── App.js                   # Main app component
│   │   ├── App.css                  # Global styles
│   │   └── index.js                 # React entry point
│   ├── package.json                 # Dependencies
│   ├── .env.example                 # Environment template
│   └── README.md                    # Frontend documentation
│
├── database/                         # Database scripts
│   ├── init.sql                     # Schema creation
│   ├── sample_data.sql              # Sample data
│   ├── reports.sql                  # Report queries
│   └── README.md                    # Database documentation
│
├── SETUP_GUIDE.md                   # Complete setup instructions
├── DEPLOYMENT.md                    # Production deployment
├── API_DOCUMENTATION.md             # API reference
├── PROJECT_STRUCTURE.md             # This file
└── README.md                        # Project overview
```

## File Descriptions

### Backend

| File | Purpose |
|------|----------|
| server.js | Express app initialization and route setup |
| config/database.js | PostgreSQL connection pool |
| middleware/auth.js | JWT verification middleware |
| routes/*.js | API endpoint handlers |
| package.json | Node.js dependencies |
| .env | Environment configuration |

### Frontend

| File | Purpose |
|------|----------|
| App.js | Main React component and routing |
| index.js | React DOM rendering |
| context/AuthContext.js | Global authentication state |
| services/api.js | Axios HTTP client |
| services/index.js | API service functions |
| pages/*.js | Page components |
| components/PrivateRoute.js | Protected route wrapper |

### Database

| File | Purpose |
|------|----------|
| init.sql | Create all tables and indexes |
| sample_data.sql | Insert test data |
| reports.sql | Predefined report queries |

## Data Flow

```
Frontend (React)
    ↓
HTTP Request (Axios)
    ↓
Backend (Express)
    ↓
Middleware (Auth Check)
    ↓
Route Handler
    ↓
Database (PostgreSQL)
    ↓
Response (JSON)
    ↓
Frontend State Update
    ↓
UI Re-render
```

## Technology Stack

### Frontend
- **React 18** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Ant Design** - UI components
- **Chart.js** - Charts and graphs

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Database
- **PostgreSQL 12+** - Relational database
- **UUID** - Unique identifiers
- **Indexes** - Query optimization

## Module Dependencies

```
Auth ← Users
  ↓
Customers ← Customers
  ↓
Packages ← Packages
  ↓
Bookings ← Bookings, Customers, Packages
  ↓
Payments ← Payments, Bookings, Customers
  ↓
Inventory ← Inventory
  ↓
Reports ← All modules
```

## API Request Flow

1. Frontend sends HTTP request with JWT token
2. Express middleware verifies token
3. Route handler processes request
4. Database query executed
5. Response sent back to frontend
6. Frontend updates state and re-renders

## State Management

### Frontend
- **React Context** - Authentication state
- **Component State** - Local component data
- **localStorage** - Persist JWT token

### Backend
- No session/state management (stateless REST API)
- JWT token for authentication
- Database for persistent data

## Error Handling

### Frontend
- Try-catch blocks
- Error messages displayed to user
- Network error handling
- Form validation

### Backend
- Express error middleware
- Database error handling
- Validation of inputs
- Consistent error responses

## Security Features

1. **JWT Authentication** - Token-based auth
2. **Password Hashing** - bcryptjs for passwords
3. **CORS** - Cross-origin request handling
4. **Input Validation** - Server-side validation
5. **SQL Injection Prevention** - Parameterized queries
6. **Environment Variables** - Secure credentials

## Scalability

- Modular route structure
- Service layer architecture
- Database indexing
- Connection pooling
- Ready for horizontal scaling

---

For detailed information, refer to individual README files in each directory.
