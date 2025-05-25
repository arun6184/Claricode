import express from 'express';
import upload from '../middlewares/uploadMiddleware.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import repoController from '../controllers/repoController.js';

const router = express.Router();

router.post('/upload', authMiddleware, upload.single('file'), repoController.uploadCodebase);

export default router;
