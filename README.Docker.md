# Docker Setup for EduTrack

This guide explains how to run the EduTrack application using Docker.

## Prerequisites

- Docker Desktop installed on your machine
- Docker Compose (included with Docker Desktop)

## Quick Start

1. **Clone the repository** (if you haven't already)
   ```bash
   git clone <repository-url>
   cd edutrack
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and update the values, especially:
   - `JWT_SECRET`: Use a strong, random secret key
   - `MYSQL_ROOT_PASSWORD`: Set a secure root password
   - `MYSQL_PASSWORD`: Set a secure user password

3. **Build and start all services**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost
   - Backend API: http://localhost:5000
   - MySQL: localhost:3306

## Docker Commands

### Start services
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### Stop services and remove volumes (⚠️ deletes database data)
```bash
docker-compose down -v
```

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

### Rebuild images (after code changes)
```bash
docker-compose up -d --build
```

### Check service status
```bash
docker-compose ps
```

### Execute commands in containers
```bash
# Access MySQL
docker-compose exec mysql mysql -u root -p

# Access backend shell
docker-compose exec backend sh

# Access frontend shell
docker-compose exec frontend sh
```

## Architecture

The Docker setup consists of three services:

1. **MySQL Database** (`mysql`)
   - Stores all application data
   - Persistent storage using Docker volumes
   - Health checks ensure database is ready before backend starts

2. **Backend API** (`backend`)
   - Node.js Express server
   - Connects to MySQL database
   - Exposes REST API on port 5000

3. **Frontend** (`frontend`)
   - React application built with Vite
   - Served by Nginx
   - Accessible on port 80

## Development Workflow

### For Backend Development
The backend container has volume mounting enabled, so changes to backend files will be reflected in the container. However, you'll need to restart the backend service:

```bash
docker-compose restart backend
```

### For Frontend Development
Since the frontend is built during the Docker image creation, you'll need to rebuild the image after making changes:

```bash
docker-compose up -d --build frontend
```

For active development, it's recommended to run the frontend locally:
```bash
cd frontend
npm install
npm run dev
```

## Troubleshooting

### Backend can't connect to database
- Check if MySQL container is healthy: `docker-compose ps`
- Check database credentials in `.env` file
- View logs: `docker-compose logs mysql`

### Port already in use
If you get port binding errors, edit `docker-compose.yml` to use different ports:
```yaml
ports:
  - "8080:80"  # Frontend on port 8080
  - "5001:5000"  # Backend on port 5001
```

### Container fails to start
- Check logs: `docker-compose logs [service-name]`
- Rebuild images: `docker-compose up -d --build`
- Remove old containers: `docker-compose down` then `docker-compose up -d`

## Production Deployment

For production deployment:

1. Use strong passwords in `.env`
2. Configure proper CORS settings in backend
3. Use a reverse proxy (like Traefik or Nginx) for SSL/TLS
4. Set up proper backup strategies for MySQL volumes
5. Consider using Docker secrets for sensitive data
6. Use specific version tags instead of `latest` for images

## Backup and Restore

### Backup MySQL data
```bash
docker-compose exec mysql mysqldump -u root -p edutrack > backup.sql
```

### Restore MySQL data
```bash
docker-compose exec -T mysql mysql -u root -p edutrack < backup.sql
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [MySQL Docker Image](https://hub.docker.com/_/mysql)
- [Nginx Docker Image](https://hub.docker.com/_/nginx)
