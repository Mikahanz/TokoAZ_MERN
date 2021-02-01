import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: 'Name is required',
      trim: true,
    },
    email: {
      type: String,
      required: 'Email is required',
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        const isValid = validator.isEmail(value);

        if (!isValid) {
          throw new Error('Email is invalid');
        }
      },
    },
    password: {
      type: String,
      required: 'Password is required',
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      required: 'Admin is required',
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// This String 'User' will be the name of the document in mongoDB as 'users'
const User = mongoose.model('User', userSchema);

export default User;
