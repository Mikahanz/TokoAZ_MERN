import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import chalk from 'chalk';

// @desc Get all Products
// @route Get /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

// @desc Get Product by Id
// @route Get /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'product not found!' });
  }
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/ Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product Removed' });
  } else {
    res.status(404).json({ message: 'product not found!' });
  }
});

// @desc Create a product
// @route POST /api/products
// @access Private/ Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product({
    user: req.userDecodedToken.id, // 'req.userDecodedToken' object is from middleware 'protect'
    name: 'Sample Name',
    price: 0,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 1,
    numReviews: 2,
    description: 'Sample Description',
    rating: 4,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc UPDATE a product
// @route PUT /api/products/:id
// @access Private/ Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;
    product.description = description || product.description;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product Not Found');
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
