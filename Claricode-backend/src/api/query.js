import express from 'express';
import queryController from '../controllers/queryController.js';
import { authMiddleware } from '../services/authService.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/ask', queryController.handleQuery);

export default router;
