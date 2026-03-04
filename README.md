Project Name

This project contains a Node.js API (NestJS) and a Worker (Express) that communicate via Redis queues, with PostgreSQL as the database. The project is fully containerized using Docker and Docker Compose.

Features

REST API for managing campaigns, events, and users.

Background worker processes jobs from a Redis queue.

PostgreSQL database with migrations.

Redis for queue management and rate limiting.

Dockerized environment for development and production.

Prerequisites

Docker
 installed

Docker Compose
 installed

Node.js (for local development, optional if running fully in Docker)

Environment Variables

Create a .env file in the root directory:

# PostgreSQL
DB_HOST=postgres
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=3600s

Note: Inside Docker, the DB_HOST and REDIS_HOST should match the service names in docker-compose.yml.

Docker Setup

Build and run all containers:

docker compose up --build

Stop all containers:

docker compose down

Rebuild after changes:

docker compose up --build
Service Ports
Service	Container Port	Host Port
API	5010	5011
Worker	-	-
PostgreSQL	5432	5433
Redis	6379	6380
Database Migrations

Run migrations:

docker compose exec api_service npm run typeorm migration:run

Revert last migration:

docker compose exec api_service npm run typeorm migration:revert
Running Locally Without Docker

Install dependencies:

npm install

Start API:

npm run start:dev

Start Worker:

cd worker
npm install
npm start
Notes

Queue: The worker listens to Redis queues to process events asynchronously.

Database connections: API and Worker use Docker service names (postgres, redis) to connect.

JWT: API uses the JWT_SECRET for authentication.