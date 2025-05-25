import express from 'express';

import authRoutes from './api/auth.js';
import userRoutes from './api/users.js';
import repoRoutes from './api/repo.js';
import queryRoutes from './api/query.js';
import notificationRoutes from './api/notifications.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/repo', repoRoutes);
router.use('/query', queryRoutes);
router.use('/notifications', notificationRoutes);

export default router;
