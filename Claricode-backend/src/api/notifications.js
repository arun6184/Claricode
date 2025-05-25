import express from 'express';
import notificationController from '../controllers/notificationController.js';
import { authMiddleware } from '../services/authService.js';

const router = express.Router();

// Apply auth middleware to all notification routes
router.use(authMiddleware);

// POST /api/notifications/send
router.post('/send', notificationController.sendNotification);

export default router;
