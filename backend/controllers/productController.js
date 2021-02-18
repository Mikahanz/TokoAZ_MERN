import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import qs from 'qs';

// @desc Get all Products
// @route Get /api/products?keyword=keyword
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  // page size
  const pageSize = 10;

  // get the page number from the query
  const page = Number(req.query.pageNumber) || 1;

  // search keyword
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  //console.log({ ...keyword });

  // get number of products
  const count = await Product.countDocuments({ ...keyword });

  // get products
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  // return the products with page and pages number
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

// @desc CREATE new review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    // Verify if user already reviewed the product
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.userDecodedToken.id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    // Find the user who submitting the review
    const user = await User.findById(req.userDecodedToken.id).select(
      '-password'
    );

    if (user) {
      // Construct the review
      const review = {
        user: user._id,
        name: user.name,
        rating: Number(rating),
        comment,
      };

      // Add the review to the reviews array
      product.reviews.push(review);

      // Update the numReviews
      product.numReviews = product.reviews.length;

      // Update the rating
      product.rating =
        product.reviews.reduce((currentNum, item) => {
          return item.rating + currentNum;
        }, 0) / product.reviews.length;

      // Save Changes
      await product.save();
      res.status(201).json({ message: 'Review added' });
    }
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
  createProductReview,
};
