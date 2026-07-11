const express = require('express');
const router = express.Router();
const { getTasks, createTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// GET  /api/tasks — get all tasks with pagination (protected)
router.get('/', protect, getTasks);

// POST /api/tasks — create a new task (protected)
router.post('/', protect, createTask);

module.exports = router;
