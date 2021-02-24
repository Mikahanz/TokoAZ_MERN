import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';
import morgan from 'morgan';
import connectDB from './config/db.js';
import productsRouter from './router/productsRouter.js';
import userRouter from './router/userRouter.js';
import orderRouter from './router/orderRouter.js';
import uploadRouter from './router/uploadRouter.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const clog = console.log;

// -----------------------------------------------------------------------
// This allows us to use environment variables
dotenv.config();

// Connect to MongoDB using Mongoose
connectDB();

// Create App express
const app = express();

// HTTP Request Logger (morgan) - ONLY in Development Mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// This will allow accept json data in the body from the request
app.use(express.json());

// Product Routes
app.use(productsRouter);

// User Routes
app.use(userRouter);

// Order Routes
app.use(orderRouter);

// Get Paypal Client Id
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// Image Upload Router
app.use(uploadRouter);

// Make uploads folder accessible by the browser by making it static
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// * FOR PRODUCTION ----------------------------
if (process.env.NODE_ENV === 'production') {
  //  Setup static asset for production
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  // route for anything other than the routes above
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}
// * FOR PRODUCTION -----------------------------

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
