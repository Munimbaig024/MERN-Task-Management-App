const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// GET  /api/tasks       — get all tasks with pagination (protected)
router.get('/', protect, getTasks);

// POST /api/tasks       — create a new task (protected)
router.post('/', protect, createTask);

// PUT  /api/tasks/:id   — update a task (protected)
router.put('/:id', protect, updateTask);

module.exports = router;
