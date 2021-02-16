import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import chalk from 'chalk';

// @desc Register a New User
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

// @desc Login user & get token
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
    throw new Error('Invalid email or password');
  }
});

// @desc GET user profile
// @route GET /api/users/profile
// @access Private & Protected
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
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc UPDATE user profile
// @route PUT /api/users/profile
// @access Private & Protected
const updateUserProfile = asyncHandler(async (req, res) => {
  // Get user and update user
  const user = await User.findById(req.userDecodedToken.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found and update failed');
  }
});

// @desc GET all users
// @route GET /api/users
// @access Private & Protected / Admin
const getUsers = asyncHandler(async (req, res) => {
  // Get user (w/out the password)
  const users = await User.find({}).select('-password');

  res.json(users);
});

// @desc DELETE a user
// @route DELETE /api/users/:id
// @access Private & Protected / Admin
const deleteUser = asyncHandler(async (req, res) => {
  // Get user by id
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc GET user by Id
// @route GET /api/users/:id
// @access Private & Protected / Admin
const getUserById = asyncHandler(async (req, res) => {
  // Get user (w/out the password)
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});

// @desc UPDATE a User
// @route PUT /api/users/:id
// @access Private & Protected / Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    (user.name = req.body.name || user.name),
      (user.email = req.body.email || user.email),
      (user.isAdmin =
        req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin);

    const theUpdatedUser = await user.save();

    res.json({
      _id: theUpdatedUser._id,
      name: theUpdatedUser.name,
      email: theUpdatedUser.email,
      isAdmin: theUpdatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
