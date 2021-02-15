import express from 'express';
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

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

// @desc UPDATE user by id
// @route PUT /api/users/:id
// @access Private & Protected / ADMIN
router.route('/api/users/:id').put(protect, admin, updateUser);

// @desc GET all user by id
// @route GET /api/user/:id
// @access Private & Protected / Admin
router.route('/api/users/:id').get(protect, admin, getUserById);

// @desc GET all users
// @route GET /api/users
// @access Private & Protected / Admin
router.route('/api/users').get(protect, admin, getUsers);

// @desc DELETE a user
// @route DELETE /api/users/:id
// @access Private & Protected / Admin
router.route('/api/users/:id').delete(protect, admin, deleteUser);

export default router;
