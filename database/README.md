# Database Setup

## PostgreSQL Installation

### Windows
1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Run the installer
3. Remember the password you set for postgres user
4. Keep default port 5432

### macOS
```bash
brew install postgresql@15
brew services start postgresql@15
```

### Linux (Ubuntu)
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

## Database Setup

### 1. Connect to PostgreSQL
```bash
psql -U postgres
```

### 2. Create Database and Tables
```bash
psql -U postgres -f database/init.sql
```

### 3. (Optional) Load Sample Data
```bash
psql -U postgres -d tours_travels_erp -f database/sample_data.sql
```

### 4. Update Backend .env
Edit `backend/.env`:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tours_travels_erp
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key_here
```

## Database Tables Overview

| Table | Purpose |
|-------|----------|
| users | Store staff and admin accounts |
| customers | Store customer information |
| packages | Store tour packages |
| bookings | Store booking records |
| payments | Store payment transactions |
| inventory | Store hotels, transport, guides |

## Common Commands

```bash
# Connect to database
psql -U postgres -d tours_travels_erp

# List all tables
\dt

# View table structure
\d table_name

# Run SQL file
psql -U postgres -d tours_travels_erp -f file.sql
```
