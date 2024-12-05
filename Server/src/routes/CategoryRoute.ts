import express from 'express';
import { createCategory, getCategoriesBySignedUser, getCategoryByIdSignedUser, getAllCategories, updateCategory, deleteCategory, getCategorieById } from '../Controller/CategoryController';
import { protect } from '../middleware/AuthMiddleware';

const router = express.Router();

router.post('/create', protect, createCategory);
router.get('/currentUser', protect, getCategoriesBySignedUser);
router.get('/currentUser/:categoryId', protect, getCategoryByIdSignedUser);
router.get('/getAll', getAllCategories);
router.put('/update/:categoryId', protect, updateCategory);
router.delete('/delete/:categoryId', protect, deleteCategory);
router.get('/getById/:categoryId', getCategorieById);



export default router;
