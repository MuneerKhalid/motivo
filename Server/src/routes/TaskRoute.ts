import express from 'express';
import { createTask, getTasks, updateTask, updateTaskStatus, deleteTask } from '../Controller/TaskController';

const router = express.Router();

router.post('/create', createTask);
router.get('/getTasks', getTasks);
router.put('/update/:taskId', updateTask);
router.patch('/updateStatus/:taskId', updateTaskStatus);
router.delete('/delete/:taskId', deleteTask);


export default router;
