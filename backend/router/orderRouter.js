import express from 'express';
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc Create new orders
// @route POST /api/orders
// @access Private
router.route('/api/orders').post(protect, addOrderItems);

// @desc GET order by id
// @route GET /api/orders/:id
// @access Private
router.route('/api/orders/:id').get(protect, getOrderById);

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
router.route('/api/orders/:id/pay').put(protect, updateOrderToPaid);

export default router;
