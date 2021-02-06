import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import chalk from 'chalk';

// Protect protected routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      console.log(
        chalk.bold.magenta(
          `Requester Authorization Header: ${req.header('Authorization')}`
        )
      );
      // Get only the token w/out The 'Bearer '
      token = req.header('Authorization').replace('Bearer ', '');

      // Verify token & decoded the token to an object
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log(
        chalk.greenBright(`Token Request ID: ${decoded.id} verified`)
      );

      // Assign 'req.userDecodedToken' with decoded object;
      req.userDecodedToken = decoded;

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, Token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not Authorized, No Token Provided By The Request');
  }
});

export { protect };
