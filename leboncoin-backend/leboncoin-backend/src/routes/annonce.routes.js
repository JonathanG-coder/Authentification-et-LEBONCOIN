import express from 'express';
import { getAnnonces, createAnnonce, updateAnnonceById, getAnnonceById } from '../controllers/annonce.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();

router.get('/', getAnnonces);
router.get('/:id', getAnnonceById);
router.post('/', authMiddleware, upload.array('image', 10), createAnnonce);
router.put('/:id', authMiddleware, upload.array('image', 10), updateAnnonceById);

export default router;
