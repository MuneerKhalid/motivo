import express from 'express';
import { getAllUsers, getMe, getUserById, updateUser, deleteUser, sendResetPassEmail, resetUserPassword } from '../Controller/UserController';
import { protect } from '../middleware/AuthMiddleware';

const router = express.Router();

router.get('/getUsers', getAllUsers); 
router.get('/signedInUser', protect, getMe);
router.get('/getUserById/:userId', getUserById);
router.put('/updateUserById/:userId', protect, updateUser);
router.delete('/deleteUserById/:userId', protect,  deleteUser);
router.post('/request-password-reset', protect,  sendResetPassEmail);
router.post('/reset-password/:token', protect,  resetUserPassword);

export default router;
