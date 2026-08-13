# TULISAN - Sticky Notes

TULISAN is a simple full-stack sticky notes application where users can
register, login, and manage their personal notes.

Each user can only access their own notes.

## Tech Stack

### Frontend

-   React
-   Vite
-   React Router
-   Tailwind CSS
-   React Icons

### Backend

-   Node.js
-   Express.js
-   PostgreSQL
-   JWT
-   bcrypt
-   Swagger

### Infrastructure

-   Docker
-   Docker Compose

## Features

### Authentication

-   Register
-   Login
-   JWT Authentication
-   Protected Routes
-   Password Hashing with bcrypt

### Notes

-   Create Note
-   Get User Notes
-   Get Note by ID
-   Update Note
-   Delete Note
-   User note ownership

## Project Structure

``` text
tulisan/
├── backend/
│   ├── data/
│   │   ├── users.json
│   │   └── notes.json
│   ├── migrations/
│   │   ├── 000001_create_users_table.up.sql
│   │   └── 000002_create_notes_table.up.sql
│   ├── src/
│   │   ├── controllers/
│   │   ├── lib/
│   │   ├── middlewares/
│   │   ├── models/
│   │   └── routes/
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   ├── Dockerfile
│   └── package.json
│
├── .env
├── docker-compose.yml
├── package.json
└── README.md
```

## Database

The application uses PostgreSQL with two main tables.

### Users

``` text
users
├── id
├── name
├── email
├── password
├── created_at
└── updated_at
```

### Notes

``` text
notes
├── id
├── title
├── content
├── user_id
├── created_at
└── updated_at
```

Relationship:

``` text
users
  │
  │ 1
  │
  │ N
  ▼
notes
```

Each note belongs to one user through `user_id`.

## Environment Variables

Create a `.env` file in the project root:

``` env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=tulisan_notes

DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=tulisan_notes

JWT_KEY=your_secret_key
```

> Do not commit `.env` to the repository.

## Running with Docker

Make sure Docker and Docker Compose are installed.

Build the application:

``` bash
docker compose build
```

Start all services:

``` bash
docker compose up -d
```

Check running containers:

``` bash
docker compose ps
```

The application will be available at:

-   Frontend: `http://localhost:5173`
-   Backend: `http://localhost:8080`
-   Swagger: `http://localhost:8080/api-docs`

Stop the application:

``` bash
docker compose down
```

The PostgreSQL data is stored in a Docker volume, so running
`docker compose down` does not remove the database data.

To remove the PostgreSQL volume as well:

``` bash
docker compose down -v
```

> Use `docker compose down -v` carefully because it removes the
> PostgreSQL volume.

## Running Without Docker

### Backend

``` bash
cd backend
npm install
npm run dev
```

### Frontend

Open another terminal:

``` bash
cd frontend
npm install
npm run dev
```

For local development without Docker, use:

``` env
DB_HOST=localhost
DB_PORT=5432
```

## API Endpoints

### Authentication

  Method   Endpoint           Description
  -------- ------------------ ---------------------
  POST     `/auth/register`   Register a new user
  POST     `/auth/login`      Login user

### Notes

All note endpoints require:

``` text
Authorization: Bearer <token>
```

  Method   Endpoint       Description
  -------- -------------- --------------------------
  GET      `/notes`       Get current user's notes
  POST     `/notes`       Create a note
  GET      `/notes/:id`   Get note by ID
  PUT      `/notes/:id`   Update note
  DELETE   `/notes/:id`   Delete note

## Authentication Flow

Register:

``` text
Register
   ↓
Password hashed with bcrypt
   ↓
User stored in PostgreSQL
```

Login:

``` text
Login
  ↓
Find user
  ↓
Compare password
  ↓
Generate JWT
  ↓
Return token
```

Protected request:

``` text
Frontend
   ↓
Authorization: Bearer <token>
   ↓
Auth Middleware
   ↓
Verify JWT
   ↓
req.user
   ↓
Controller
   ↓
PostgreSQL
```

## Note Ownership

Notes are associated with users through `user_id`.

When retrieving notes:

``` sql
SELECT *
FROM notes
WHERE user_id = $1
ORDER BY id ASC;
```

This ensures users only receive their own notes.

The backend also checks ownership before allowing a user to update or
delete a note.

## Docker Architecture

``` text
                    Docker Compose
                         │
          ┌──────────────┼──────────────┐
          │              │              │
          ▼              ▼              ▼
      Frontend        Backend       PostgreSQL
       :5173           :8080           :5432
          │              │
          │              │
          └─────────────►│
                         │
                         ▼
                     Database
```

Networks:

``` text
public
├── frontend
└── backend

isolated
├── backend
└── postgres
```

The frontend cannot directly access PostgreSQL.

``` text
Frontend ──────► Backend ──────► PostgreSQL
   ❌                ✅              ✅
direct DB access
```


