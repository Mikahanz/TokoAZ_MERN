import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

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
      required: 'isAdmin is required',
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  // Verify if new password provided
  // In Update User functionality this will not executed
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

// This String 'User' will be the name of the document in mongoDB as 'users'
const User = mongoose.model('User', userSchema);

export default User;
