const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validateMiddleware');

// GET    /api/tasks       — get all tasks with pagination (protected)
router.get('/', protect, getTasks);

// POST   /api/tasks       — create a new task (protected)
router.post(
  '/',
  protect,
  [
    body('title').trim().notEmpty().withMessage('Task title is required'),
    body('status')
      .optional()
      .isIn(['todo', 'in-progress', 'done'])
      .withMessage('Status must be todo, in-progress, or done'),
    body('dueDate').optional().isISO8601().withMessage('Due date must be a valid date'),
  ],
  validate,
  createTask
);

// PUT    /api/tasks/:id   — update a task (protected)
router.put('/:id', protect, updateTask);

// DELETE /api/tasks/:id   — delete a task (protected)
router.delete('/:id', protect, deleteTask);

module.exports = router;
