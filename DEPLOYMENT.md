# Deployment Guide - Tours & Travels ERP

## Production Deployment

### Option 1: Deploy on Heroku

#### Backend Deployment

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Create Heroku app**
   ```bash
   cd backend
   heroku create your-app-name-backend
   ```

3. **Add PostgreSQL addon**
   ```bash
   heroku addons:create heroku-postgresql:hobby-dev -a your-app-name-backend
   ```

4. **Set environment variables**
   ```bash
   heroku config:set JWT_SECRET=your_secret_key -a your-app-name-backend
   heroku config:set NODE_ENV=production -a your-app-name-backend
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

#### Frontend Deployment

1. **Build React app**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy on Netlify**
   - Connect GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `build`
   - Update environment variable with backend URL

### Option 2: Deploy on DigitalOcean

#### Setup VPS

1. **Create Droplet**
   - Ubuntu 22.04 LTS
   - 2GB RAM minimum
   - 50GB storage

2. **SSH into droplet**
   ```bash
   ssh root@your_droplet_ip
   ```

3. **Install dependencies**
   ```bash
   apt update && apt upgrade -y
   apt install nodejs npm postgresql nginx git -y
   ```

4. **Clone repository**
   ```bash
   git clone <your-repo-url>
   cd tours-travels-erp
   ```

5. **Setup database**
   ```bash
   sudo -u postgres psql -f database/init.sql
   ```

6. **Setup backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with production values
   ```

7. **Setup PM2 for background process**
   ```bash
   npm install -g pm2
   pm2 start server.js --name "tours-erp-backend"
   pm2 startup
   pm2 save
   ```

8. **Setup frontend**
   ```bash
   cd ../frontend
   npm install
   npm run build
   ```

9. **Configure Nginx**
   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```

   Add:
   ```nginx
   server {
       listen 80;
       server_name your_domain.com;

       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
       }

       location / {
           root /home/user/tours-travels-erp/frontend/build;
           try_files $uri /index.html;
       }
   }
   ```

10. **Enable SSL with Certbot**
    ```bash
    sudo apt install certbot python3-certbot-nginx
    sudo certbot --nginx -d your_domain.com
    ```

11. **Start Nginx**
    ```bash
    sudo systemctl start nginx
    sudo systemctl enable nginx
    ```

### Option 3: Deploy with Docker

#### Create Dockerfile for Backend

Create `backend/Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

#### Create Dockerfile for Frontend

Create `frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### Create docker-compose.yml

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: tours_travels_erp
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./backend
    environment:
      DB_HOST: postgres
      DB_NAME: tours_travels_erp
      DB_USER: postgres
      DB_PASSWORD: password
      JWT_SECRET: your_secret_key
    ports:
      - "5000:5000"
    depends_on:
      - postgres

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

#### Run with Docker

```bash
docker-compose up -d
```

## Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use strong JWT secret
   - Change default database password

2. **Database Security**
   - Use HTTPS for database connections
   - Restrict database user permissions
   - Regular backups

3. **API Security**
   - Enable CORS carefully
   - Rate limiting
   - Input validation
   - SQL injection prevention (using parameterized queries)

4. **Frontend Security**
   - HTTPS only
   - Content Security Policy
   - Secure cookie settings

## Monitoring

1. **Server Status**
   ```bash
   pm2 status
   pm2 logs tours-erp-backend
   ```

2. **Database Backups**
   ```bash
   pg_dump -U postgres tours_travels_erp > backup.sql
   ```

3. **Log Rotation**
   Configure logrotate for application logs

## Scaling Tips

- Use load balancer (Nginx/HAProxy)
- Database connection pooling
- Caching layer (Redis)
- CDN for static assets
- Horizontal scaling with multiple app instances

---

For more help, refer to framework documentation:
- [Express.js Deployment](https://expressjs.com/en/advanced/best-practice-performance.html)
- [React Production Build](https://reactjs.org/docs/optimizing-performance.html)
- [PostgreSQL Backup](https://www.postgresql.org/docs/current/backup.html)
