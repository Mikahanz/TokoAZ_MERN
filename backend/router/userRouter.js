import express from 'express';
import {
  authUser,
  getUserProfile,
  registerUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc POST Register a New User
// @route POST /api/users
// @access Public
router.route('/api/users').post(registerUser);

// @desc POST Login & Autheticate User
// @route POST /api/users/login
// @access Public
router.route('/api/users/login').post(authUser);

// @desc GET user profile
// @route GET /api/users/profile
// @access Private
router.route('/api/users/profile').get(protect, getUserProfile);

export default router;
