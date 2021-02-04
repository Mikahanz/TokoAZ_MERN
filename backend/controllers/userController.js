import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import chalk from 'chalk';

// @desc POST Register a New User
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //   console.log(chalk.cyanBright(`email: ${email}, password: ${password}`));
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error(`User with email "${email}" already exists`);
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid User Data');
  }
});

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //   console.log(chalk.cyanBright(`email: ${email}, password: ${password}`));
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid Password or Email');
  }
});

// @desc GET user profile
// @route GET /api/users/profile
// @access Public
const getUserProfile = asyncHandler(async (req, res) => {
  //console.log(chalk.yellowBright(req.userDecodedToken.id));

  // Get user (w/out the password)
  const user = await User.findById(req.userDecodedToken.id).select('-password'); // 'req.userDecodedToken' object is from middleware 'protect'
  // console.log(chalk.yellowBright(user));

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('User Not Found');
  }
});

export { authUser, getUserProfile, registerUser };
