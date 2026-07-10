const express = require('express');
const router = express.Router();
const { createTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// POST /api/tasks — create a new task (protected)
router.post('/', protect, createTask);

module.exports = router;
