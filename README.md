# DekNek3D MERN Assignment

A full-stack MERN application built from scratch for an internship assignment. It includes:

- JWT-based user signup and login
- Protected routes
- MongoDB-backed data storage
- Personal dashboard with CRUD project notes
- Ready-to-deploy frontend and backend structure

## Tech Stack

- Frontend: React + Vite + React Router
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth: JWT + bcryptjs

## Project Structure

```text
.
├── client
└── server
```

## Local Setup

1. Install dependencies:

```bash
npm install
npm install --workspace client
npm install --workspace server
```

2. Create environment files:

`/server/.env`

```env
PORT=5001
MONGODB_URI=mongodb://127.0.0.1:27017/deknek3d
JWT_SECRET=replace-with-a-strong-secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

`/client/.env`

```env
VITE_API_URL=http://localhost:5001/api
```

3. Run the backend:

```bash
npm run dev:server
```

4. Run the frontend in another terminal:

```bash
npm run dev:client
```

## Feature Overview

- Users can create an account and log in securely
- Each user has isolated project notes stored in MongoDB
- Dashboard supports create, update, and delete operations
- Protected API routes use JWT auth middleware
