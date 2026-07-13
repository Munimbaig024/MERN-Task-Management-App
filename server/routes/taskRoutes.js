const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// GET    /api/tasks       — get all tasks with pagination (protected)
router.get('/', protect, getTasks);

// POST   /api/tasks       — create a new task (protected)
router.post('/', protect, createTask);

// PUT    /api/tasks/:id   — update a task (protected)
router.put('/:id', protect, updateTask);

// DELETE /api/tasks/:id   — delete a task (protected)
router.delete('/:id', protect, deleteTask);

module.exports = router;
