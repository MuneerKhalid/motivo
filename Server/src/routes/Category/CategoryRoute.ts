import express from 'express';
import { createCategory, getCategoriesBySignedUser, getCategoryByIdSignedUser } from '../../Controller/Category/Category';
import { protect } from '../../middleware/Auth/AuthMiddleware';

const router = express.Router();

router.post('/create', protect, createCategory);
router.post('/get', protect, getCategoriesBySignedUser);
router.post('/get/:userId', protect, getCategoryByIdSignedUser);


export default router;
