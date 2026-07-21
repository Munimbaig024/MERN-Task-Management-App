# TaskFlow — MERN Task Management App

A full-stack task management application built with MongoDB, Express, React, and Node.js. Users can register, log in, and manage personal tasks with statuses, due dates, and filtering.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), React Router, Tailwind CSS, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT, bcrypt |
| Validation | express-validator |
| Testing | Jest, Supertest |

---

## Project Structure

```
taskflow/
├── server/
│   ├── config/         # DB connection
│   ├── controllers/    # Route logic
│   ├── middleware/     # Auth middleware
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express routers
│   ├── utils/          # JWT helpers
│   ├── tests/          # Jest + Supertest
│   └── server.js       # Entry point
├── client/             # React app (Vite)
├── .gitignore
└── README.md
```

---

## API Endpoints

| Method | Route | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login, returns JWT | No |
| GET | `/api/tasks` | Get all tasks for user | Yes |
| POST | `/api/tasks` | Create a new task | Yes |
| PUT | `/api/tasks/:id` | Update a task | Yes |
| DELETE | `/api/tasks/:id` | Delete a task | Yes |

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in `/server` (see `.env.example`):

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

```bash
npm run dev
```

---

## Build Progress

### ✅ Phase 1 — Backend Foundation (Complete)
- [x] Repo init, README, .gitignore, folder structure
- [x] Express server with core middleware
- [x] MongoDB connection via Mongoose
- [x] User model with bcrypt password hashing
- [x] Task model with User relation
- [x] JWT auth utility functions
- [x] Register endpoint (`POST /api/auth/register`)
- [x] Login endpoint (`POST /api/auth/login`)
- [x] Auth middleware for protected routes

### ✅ Phase 2 — Backend Features (Complete)
- [x] Create task route (`POST /api/tasks`)
- [x] Get all tasks with pagination (`GET /api/tasks?page=1&limit=10`)
- [x] Update task route (`PUT /api/tasks/:id`)
- [x] Delete task route (`DELETE /api/tasks/:id`)
- [x] Centralized error handling middleware
- [x] Input validation with express-validator

### ✅ Phase 3 — Frontend Foundation (Complete)
- [x] React app scaffold with Vite
- [x] React Router and page skeletons
- [x] AuthContext and token storage
- [x] Login page UI and form handling
- [x] Register page UI and form handling
- [x] Dashboard layout and protected route wrapper

### 🔜 Phase 4 — Frontend Features
- [ ] Task list component
- [ ] Task create/edit form component
- [ ] Task delete with confirm modal
- [ ] Connect frontend to backend via axios instance
- [ ] Tailwind setup and theme pass
- [ ] Loading states and toast notifications
- [ ] Task filtering and sorting by status/due date

### 🔜 Phase 5 — Polish & Testing

---

## License

MIT
