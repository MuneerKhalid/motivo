import express from 'express';
import { registerUser, loginUser, getMe } from '../../Controller/Auth/AuthController';
import { protect } from '../../middleware/Auth/AuthMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/me", protect, getMe);


export default router;
