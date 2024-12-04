const express = require('express');
const { getTasks, createTask, updateTask, deleteTask } = require('../controller/Tasks/TaskController');

const router = express.Router();

// Define routes
router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
