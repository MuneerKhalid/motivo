import express from 'express';
import { getAllUsers, getMe, getUserById, updateUser, deleteUser, sendResetPassEmail, resetUserPassword } from '../Controller/UserController';

const router = express.Router();

router.get('/getUsers', getAllUsers); 
router.get('/signedInUser', getMe);
router.get('/getUserById/:userId', getUserById);
router.put('/updateUserById/:userId', updateUser);
router.delete('/deleteUserById/:userId',  deleteUser);
router.post('/request-password-reset',  sendResetPassEmail);
router.post('/reset-password/:token',  resetUserPassword);

export default router;
