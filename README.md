# TaskFlow — MERN Task Management App

> A full-stack task management application built with MongoDB, Express, React, and Node.js.
> Users can register, log in, and manage personal tasks with statuses, due dates, filtering, and sorting — all wrapped in a polished dark UI.

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![License: MIT](https://img.shields.io/badge/License-MIT-6366f1.svg)](LICENSE)

---

## ✨ Features

- 🔐 **JWT Authentication** — Register, login, and secure protected routes
- ✅ **Full Task CRUD** — Create, read, update, and delete personal tasks
- 🔍 **Filter by Status** — Instantly filter tasks by To Do / In Progress / Done
- ↕️ **Sort Tasks** — Sort by newest, oldest, due date ascending/descending
- 📄 **Pagination** — Server-side pagination (10 tasks per page)
- ⚡ **Real-time Feedback** — Animated skeleton loaders + contextual toast notifications
- 🎨 **Dark UI Design System** — Custom CSS with gradient accents, glassmorphism modals, micro-animations
- 🧪 **Unit Tests** — Jest test suite for auth controller (no DB required)

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 (Vite), React Router v6, Axios, react-hot-toast |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (jsonwebtoken), bcryptjs |
| Validation | express-validator |
| Testing | Jest, Supertest |
| Deployment | Render.com (render.yaml blueprint) |

---

## 📁 Project Structure

```
taskflow/
├── package.json             ← Root monorepo scripts (dev, install:all, build, test)
├── render.yaml              ← Render.com deployment blueprint
├── .gitignore
├── server/
│   ├── server.js            ← Express entry point with env-aware CORS
│   ├── jest.config.js       ← Jest configuration
│   ├── .env.example         ← Environment variable template
│   ├── config/
│   │   └── db.js            ← Mongoose connection
│   ├── controllers/
│   │   ├── authController.js   ← registerUser, loginUser
│   │   └── taskController.js   ← getTasks (filter/sort/paginate), CRUD
│   ├── middleware/
│   │   ├── authMiddleware.js   ← JWT protect()
│   │   ├── errorMiddleware.js  ← notFound + errorHandler
│   │   └── validateMiddleware.js ← express-validator result handler
│   ├── models/
│   │   ├── User.js          ← name, email, password (bcrypt), matchPassword()
│   │   └── Task.js          ← title, description, status, dueDate, user ref
│   ├── routes/
│   │   ├── authRoutes.js    ← POST /register, /login
│   │   └── taskRoutes.js    ← GET/POST /tasks, PUT/DELETE /tasks/:id
│   ├── tests/
│   │   └── authController.test.js ← 8 unit tests (mocked, no DB)
│   └── utils/
│       └── generateToken.js ← generateToken, verifyToken
└── client/
    ├── package.json
    ├── vite.config.js       ← port 3000, proxy /api → localhost:5000
    ├── .env.example
    ├── index.html           ← SEO meta tags
    └── src/
        ├── main.jsx         ← ReactDOM.createRoot, AuthProvider, Toaster
        ├── App.jsx          ← BrowserRouter, Routes
        ├── index.css        ← ~750 lines: complete dark design system
        ├── api/
        │   └── axiosInstance.js ← baseURL /api, Bearer token interceptor
        ├── context/
        │   └── AuthContext.jsx  ← createContext, login(), logout(), useAuth()
        ├── components/
        │   ├── Navbar.jsx
        │   ├── ProtectedRoute.jsx
        │   ├── TaskList.jsx     ← Filter bar, skeleton loader, pagination
        │   ├── TaskItem.jsx     ← Task card with overdue highlight
        │   ├── TaskForm.jsx     ← Create/edit modal with spinner
        │   └── DeleteModal.jsx  ← Confirm delete with spinner
        └── pages/
            ├── Login.jsx
            ├── Register.jsx
            └── Dashboard.jsx
```

---

## 🚀 Getting Started (Local Development)

### Prerequisites

- Node.js v18+
- npm v9+
- A MongoDB Atlas cluster (free tier is sufficient) or local MongoDB

### 1. Clone the repo

```bash
git clone https://github.com/Munimbaig024/MERN-Task-Management-App.git
cd MERN-Task-Management-App
```

### 2. Install all dependencies

```bash
npm run install:all
```

> This runs `npm install` inside both `/server` and `/client`.

### 3. Configure environment variables

```bash
cp server/.env.example server/.env
```

Edit `server/.env` and fill in your values:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/taskflow
JWT_SECRET=generate_a_long_random_string_here
CLIENT_ORIGIN=http://localhost:3000
```

> **Tip:** Generate a secure JWT secret with:
> ```bash
> node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
> ```

### 4. Start development servers

```bash
npm run dev
```

This uses `concurrently` to start both:
- **Backend** → `http://localhost:5000`
- **Frontend** → `http://localhost:3000`

The Vite dev proxy forwards all `/api` requests to `localhost:5000` automatically — no CORS issues in development.

---

## 📡 API Reference

All task routes require the `Authorization: Bearer <token>` header.

### Auth

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | `{ name, email, password }` | Register new user, returns JWT |
| `POST` | `/api/auth/login` | `{ email, password }` | Login, returns JWT |

### Tasks

| Method | Endpoint | Query Params | Description |
|--------|----------|--------------|-------------|
| `GET` | `/api/tasks` | `page`, `limit`, `status`, `sortBy` | Get paginated + filtered tasks |
| `POST` | `/api/tasks` | — | Create a new task |
| `PUT` | `/api/tasks/:id` | — | Update a task (owner only) |
| `DELETE` | `/api/tasks/:id` | — | Delete a task (owner only) |

**`GET /api/tasks` query params:**

| Param | Values | Default |
|-------|--------|---------|
| `page` | `1`, `2`, ... | `1` |
| `limit` | any integer | `10` |
| `status` | `todo` \| `in-progress` \| `done` \| `all` | all |
| `sortBy` | `createdAt_desc` \| `createdAt_asc` \| `dueDate_asc` \| `dueDate_desc` | `createdAt_desc` |

---

## 🧪 Running Tests

```bash
npm test
```

Runs the Jest unit test suite in `/server/tests/`. All tests use mocks — no database connection required.

**Test coverage:**

| Controller | Scenario | Status |
|---|---|---|
| `registerUser` | Duplicate email → 400 | ✅ |
| `registerUser` | Valid registration → 201 + token | ✅ |
| `registerUser` | Invalid user data → 400 | ✅ |
| `registerUser` | DB error → 500 | ✅ |
| `loginUser` | User not found → 401 | ✅ |
| `loginUser` | Wrong password → 401 | ✅ |
| `loginUser` | Valid login → 200 + token | ✅ |
| `loginUser` | DB error → 500 | ✅ |

---

## ☁️ Deployment (Render.com)

This project includes a [`render.yaml`](./render.yaml) Blueprint that provisions both services automatically.

### Steps

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → **New** → **Blueprint**
3. Connect your GitHub repo — Render will detect `render.yaml`
4. Add the secret environment variables in the Render dashboard:
   - `MONGO_URI` — your MongoDB Atlas connection string
   - `JWT_SECRET` — your secret key
   - `CLIENT_ORIGIN` — the deployed frontend URL (e.g. `https://taskflow-client.onrender.com`)
5. Deploy — Render builds and deploys both the API and static site

> **Free tier note:** Render free services spin down after 15 min of inactivity. The first request after a spin-down may take ~30 seconds to cold-start.

---

## ✅ Build Checklist

### Phase 1 — Backend Foundation
- [x] Repo init, README, .gitignore, folder structure
- [x] Express server with core middleware
- [x] MongoDB connection via Mongoose
- [x] User model with bcrypt password hashing
- [x] Task model with User relation
- [x] JWT auth utility functions
- [x] Register endpoint (`POST /api/auth/register`)
- [x] Login endpoint (`POST /api/auth/login`)
- [x] Auth middleware for protected routes

### Phase 2 — Backend Features
- [x] Create task route (`POST /api/tasks`)
- [x] Get all tasks with pagination (`GET /api/tasks`)
- [x] Update task route (`PUT /api/tasks/:id`)
- [x] Delete task route (`DELETE /api/tasks/:id`)
- [x] Centralized error handling middleware
- [x] Input validation with express-validator

### Phase 3 — Frontend Foundation
- [x] React app scaffold with Vite
- [x] React Router v6 and page skeletons
- [x] AuthContext with token persistence
- [x] Login page UI and form handling
- [x] Register page UI and form handling
- [x] Dashboard layout and protected route wrapper

### Phase 4 — Frontend Features
- [x] Task list component with pagination
- [x] Task create/edit modal form
- [x] Task delete with confirm modal
- [x] Axios instance with JWT interceptor
- [x] Dark design system (vanilla CSS, ~750 lines)
- [x] Task filtering by status (All / To Do / In Progress / Done)
- [x] Task sorting (newest, oldest, due date asc/desc)
- [x] Animated skeleton loaders
- [x] Contextual toast notifications (themed to dark UI)

### Phase 5 — Polish & Production
- [x] Unit tests for auth controller (Jest, no DB required)
- [x] Environment config templates (`.env.example`)
- [x] Production-ready CORS with `CLIENT_ORIGIN` env var
- [x] Render.com deployment blueprint (`render.yaml`)
- [x] Root monorepo scripts (`npm run dev`, `install:all`, `build`, `test`)
- [x] Finalized README with setup, API reference, and deployment guide

---

## 📄 License

MIT © 2026 [Munim Baig](https://github.com/Munimbaig024)
