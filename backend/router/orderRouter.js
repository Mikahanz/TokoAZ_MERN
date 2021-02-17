import express from 'express';
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc Create new orders
// @route POST /api/orders
// @access Private
router.route('/api/orders').post(protect, addOrderItems);

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private
router.route('/api/orders/myorders').get(protect, getMyOrders);

// @desc Get all orders
// @route GET /api/orders
// @access Private / Admin
router.route('/api/orders').get(protect, admin, getOrders);

// @desc GET order by id
// @route GET /api/orders/:id
// @access Private
router.route('/api/orders/:id').get(protect, getOrderById);

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
router.route('/api/orders/:id/pay').put(protect, updateOrderToPaid);

// @desc Update order to delivered
// @route PUT /api/orders/:id/deliver
// @access Private / Admin
router
  .route('/api/orders/:id/deliver')
  .put(protect, admin, updateOrderToDelivered);

export default router;
