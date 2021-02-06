import express from 'express';
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc Register a New User
// @route POST /api/users
// @access Public
router.route('/api/users').post(registerUser);

// @desc Login & Autheticate User
// @route POST /api/users/login
// @access Public
router.route('/api/users/login').post(authUser);

// @desc GET user profile
// @route GET /api/users/profile
// @access Private & Protected
router.route('/api/users/profile').get(protect, getUserProfile);

// @desc UPDATE user profile
// @route PUT /api/users/profile
// @access Private & Protected
router.route('/api/users/profile').put(protect, updateUserProfile);

export default router;
