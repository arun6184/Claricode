// src/api/users.js
import express from 'express';
import { signup, login, getProfile, updateRole } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', getProfile);
router.put('/role', updateRole);

export default router;
