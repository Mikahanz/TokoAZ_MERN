import express from 'express';
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc Get all Products
// @route Get /api/products
// @access Public
router.route('/api/products').get(getProducts);

// @desc GET top rated products
// @route GET /api/products/top
// @access Public
router.route('/api/products/top').get(getTopProducts);

// @desc Get Product by Id
// @route Get /api/products/:id
// @access Public
router.route('/api/products/:id').get(getProductById);

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/ Admin
router.route('/api/products/:id').delete(protect, admin, deleteProduct);

// @desc Create a product
// @route POST /api/products
// @access Private/ Admin
router.route('/api/products').post(protect, admin, createProduct);

// @desc UPDATE a product
// @route PUT /api/products/:id
// @access Private/ Admin
router.route('/api/products/:id').put(protect, admin, updateProduct);

// @desc CREATE new review
// @route POST /api/products/:id/reviews
// @access Private
router.route('/api/products/:id/reviews').post(protect, createProductReview);

export default router;
