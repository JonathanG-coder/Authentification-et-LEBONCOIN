import express from 'express';
import { createCategory, getCategories } from '../controllers/category.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
 

const router = express.Router();

router.post('/',authMiddleware, createCategory)
router.get('/', getCategories)

export default router;
