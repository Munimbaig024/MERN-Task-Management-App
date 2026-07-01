# TaskFlow — MERN Task Management App
### System Design & Architecture Document

---

## 1. Overview

TaskFlow is a full-stack task management application built with MongoDB, Express, React, and Node.js (MERN). Users can register, log in, and manage personal tasks with statuses, due dates, and filtering.

**Core goals:**
- Secure user authentication (JWT-based)
- Full CRUD on tasks, scoped per user
- Clean, responsive UI
- Production-ready structure (validation, error handling, tests)

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), React Router, Tailwind CSS, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (JSON Web Tokens), bcrypt |
| Validation | express-validator |
| Testing | Jest, Supertest |
| Notifications | react-hot-toast (or similar) |

---

## 3. Folder Structure

```
taskflow/
├── server/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── tests/
│   │   └── task.test.js
│   ├── server.js
│   └── .env
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosInstance.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── components/
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## 4. Data Models

### User
```js
{
  name: String,
  email: { type: String, unique: true },
  password: String, // hashed
  createdAt: Date
}
```

### Task
```js
{
  user: { type: ObjectId, ref: 'User' },
  title: String,
  description: String,
  status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
  dueDate: Date,
  createdAt: Date
}
```

---

## 5. API Endpoints

| Method | Route | Description | Protected |
|---|---|---|---|
| POST | /api/auth/register | Register a new user | No |
| POST | /api/auth/login | Login, returns JWT | No |
| GET | /api/tasks | Get all tasks for logged-in user | Yes |
| POST | /api/tasks | Create a new task | Yes |
| PUT | /api/tasks/:id | Update a task | Yes |
| DELETE | /api/tasks/:id | Delete a task | Yes |

---

## 6. Auth Flow

1. User registers → password hashed with bcrypt → stored in MongoDB
2. User logs in → credentials verified → JWT issued
3. JWT stored client-side (localStorage or httpOnly cookie)
4. Protected routes check `Authorization: Bearer <token>` header via middleware
5. Middleware decodes JWT, attaches `req.user`, allows request through

---

## 7. Frontend Flow

1. `AuthContext` manages login state + token globally
2. `ProtectedRoute` wrapper redirects unauthenticated users to `/login`
3. `Dashboard` fetches tasks on mount via Axios instance (with token interceptor)
4. `TaskForm` handles create/edit; `TaskList` renders tasks with filter/sort controls
5. Toast notifications confirm actions (create/update/delete/errors)

---

## 8. Build Roadmap (30-Day Plan)

| Phase | Days | Focus |
|---|---|---|
| Phase 1 — Backend Foundation | 1–9 | Project setup, DB connection, models, auth |
| Phase 2 — Backend Features | 10–15 | Task CRUD, error handling, validation |
| Phase 3 — Frontend Foundation | 16–21 | React setup, routing, auth pages, layout |
| Phase 4 — Frontend Features | 22–28 | Task components, API integration, styling, filters |
| Phase 5 — Polish & Testing | 29–30 | Tests, deployment config, docs |

---

## 9. Deployment Notes

- Backend: deploy to Render/Railway with MongoDB Atlas connection string in env vars
- Frontend: deploy to Vercel/Netlify, point Axios baseURL to backend URL
- Set `CORS` origin explicitly to frontend domain in production

---

## 10. Future Enhancements (Not in initial 30-day scope)

- Task categories/tags
- Team/shared task boards
- Email reminders for due dates
- Dark mode
