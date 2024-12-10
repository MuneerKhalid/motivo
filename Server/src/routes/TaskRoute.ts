import express from 'express';
import { createTask, getTasks, getTaskById, updateTask, updateTaskStatus, deleteTask, getAllTasks, getTaskByIdTest} from '../Controller/TaskController';

const router = express.Router();

router.post('/create', createTask);
router.get('/getTasks', getTasks);
router.get('/getTaskById/:taskId', getTaskById);
router.put('/update/:taskId', updateTask);
router.patch('/updateStatus/:taskId', updateTaskStatus);
router.delete('/delete/:taskId', deleteTask);
router.get('/getAllTasks', getAllTasks);
router.get('/getAllTasksById/:taskId', getTaskByIdTest);


export default router;
