import express from 'express';
import { getAllUsers, getMe, getUserById, updateUser, deleteUser } from '../Controller/UserController';
import { protect } from '../middleware/AuthMiddleware';

const router = express.Router();

router.get('/getUsers', getAllUsers); 
router.get('/signedInUser', protect, getMe);
router.get('/getUserById/:userId', getUserById);
router.put('/updateUserById/:userId', protect, updateUser);
router.delete('/deleteUserById/:userId', protect,  deleteUser);

export default router;
