const Task = require('../models/Task');

// @desc    Get all tasks for logged-in user (with pagination, filtering, sorting)
// @route   GET /api/tasks?page=1&limit=10&status=todo&sortBy=dueDate_asc
// @access  Private
const getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter query
    const filter = { user: req.user._id };
    if (req.query.status && req.query.status !== 'all') {
      filter.status = req.query.status;
    }

    // Build sort options
    let sortOptions = { createdAt: -1 }; // default: newest first
    if (req.query.sortBy === 'dueDate_asc') {
      sortOptions = { dueDate: 1, createdAt: -1 };
    } else if (req.query.sortBy === 'dueDate_desc') {
      sortOptions = { dueDate: -1, createdAt: -1 };
    } else if (req.query.sortBy === 'createdAt_asc') {
      sortOptions = { createdAt: 1 };
    }

    const total = await Task.countDocuments(filter);

    const tasks = await Task.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    res.json({
      tasks,
      page,
      totalPages: Math.ceil(total / limit),
      totalTasks: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;

  try {
    if (!title) {
      return res.status(400).json({ message: 'Task title is required' });
    }

    const task = await Task.create({
      user: req.user._id,
      title,
      description: description || '',
      status: status || 'todo',
      dueDate: dueDate || null,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;

  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Make sure the task belongs to the logged-in user
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this task' });
    }

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;
    task.dueDate = dueDate ?? task.dueDate;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Make sure the task belongs to the logged-in user
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this task' });
    }

    await task.deleteOne();
    res.json({ message: 'Task removed', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };



