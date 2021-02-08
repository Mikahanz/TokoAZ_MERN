import express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';
import connectDB from './config/db.js';
import productsRouter from './router/productsRouter.js';
import userRouter from './router/userRouter.js';
import orderRouter from './router/orderRouter.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const clog = console.log;

// -----------------------------------------------------------------------
// This allows us to use environment variables
dotenv.config();

// Connect to MongoDB using Mongoose
connectDB();

// Create App express
const app = express();

// This will allow accept json data in the body from the request
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Product Routes
app.use(productsRouter);

// User Routes
app.use(userRouter);

// Order Routes
app.use(orderRouter);

// todo END POINTS Error Handling vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

// * 404 error creator: this will call the error handling middleware below ###
app.use(notFound);

// * ### error handling middleware
app.use(errorHandler);

// todo END POINTS Error Handling ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// -----------------------------------------------------------------------
const port = process.env.PORT || 5000;

app.listen(
  port,
  clog(
    chalk.magenta.underline(
      `Server Running On Port ${port}, in ${process.env.NODE_ENV} mode.`
    )
  )
);
