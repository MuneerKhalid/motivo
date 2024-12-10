import express from 'express';
import { createCategory, getCategoriesBySignedUser, getCategoryByIdSignedUser, getAllCategories, updateCategory, deleteCategory, getCategorieById } from '../Controller/CategoryController';

const router = express.Router();

router.post('/create', createCategory);
router.get('/currentUser', getCategoriesBySignedUser);
router.get('/currentUser/:categoryId', getCategoryByIdSignedUser);
router.get('/getAll', getAllCategories);
router.put('/update/:categoryId', updateCategory);
router.delete('/delete/:categoryId', deleteCategory);
router.get('/getById/:categoryId', getCategorieById);



export default router;
