import express from 'express';
import { createTask, getTasks, getTaskById, updateTask, deleteTask} from '../Controller/TaskController';
import { protect } from '../middleware/AuthMiddleware';

const router = express.Router();

router.post('/create', protect, createTask);
router.post('/get', protect, getTasks);
router.get('/:taskId', protect, getTaskById);
router.put('/:taskId', protect, updateTask);
router.delete('/:taskId', protect, deleteTask);


export default router;
