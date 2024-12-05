import express from 'express';
import { createTask, getTasks, getTaskById, updateTask, deleteTask, getAllTasks, getTaskByIdTest} from '../Controller/TaskController';
import { protect } from '../middleware/AuthMiddleware';

const router = express.Router();

router.post('/create', protect, createTask);
router.get('/getTasks', protect, getTasks);
router.get('/getTaskById/:taskId', protect, getTaskById);
router.put('/update/:taskId', protect, updateTask);
router.delete('/delete/:taskId', protect, deleteTask);
router.get('/getAllTasks', getAllTasks);
router.get('/getAllTasksById/:taskId', getTaskByIdTest);


export default router;
