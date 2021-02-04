import express from 'express';
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js';

const router = express.Router();

// @desc Get all Products
// @route Get /api/products
// @access Public
router.route('/api/products').get(getProducts);

// @desc Get Product by Id
// @route Get /api/products/:id
// @access Public
router.route('/api/products/:id').get(getProductById);

export default router;
