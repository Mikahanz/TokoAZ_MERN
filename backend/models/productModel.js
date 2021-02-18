import mongoose from 'mongoose';
import validator from 'validator';

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: 'UserId is required',
      ref: 'User',
    },
    name: {
      type: String,
      required: 'User Name is required',
    },
    rating: {
      type: Number,
      required: 'Rating is required',
    },
    comment: {
      type: String,
      required: 'Comment is required',
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: 'UserId is required',
      ref: 'User',
    },
    name: {
      type: String,
      required: 'Product Name is required',
      trim: true,
    },
    image: {
      type: String,
      required: 'Image is required',
    },
    brand: {
      type: String,
      required: 'Brand is required',
      trim: true,
    },
    category: {
      type: String,
      required: 'Category is required',
    },
    description: {
      type: String,
      required: 'Description is required',
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: 'Rating is required',
    },
    numReviews: {
      type: Number,
      required: 'Number of review is required',
      default: 0,
    },
    price: {
      type: Number,
      required: 'Number is required',
      default: 0,
    },
    countInStock: {
      type: Number,
      required: 'Number of stock is required',
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// This String 'Product' will be the name of the document in mongoDB as 'products'
const Product = mongoose.model('Product', productSchema);

export default Product;
