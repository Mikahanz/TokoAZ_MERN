import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import chalk from 'chalk';

const router = express.Router();

// @desc Get all Products
// @route Get /api/products
// @access Public
router.get(
  '/api/products',
  asyncHandler(async (req, res) => {
    const products = await Product.find({});

    res.json(products);
  })
);

// @desc Get Product by Id
// @route Get /api/products/:id
// @access Public
router.get(
  '/api/products/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'product not found!' });
    }
  })
);

export default router;
