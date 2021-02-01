import express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';
import connectDB from './config/db.js';
import productsRouter from './router/productsRouter.js';
import { stringify } from 'querystring';
const clog = console.log;

// -----------------------------------------------------------------------
dotenv.config();

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Product Routes
app.use(productsRouter);

// ! Error Handling --------------------------------------------------

// 404 error creator:
app.use((req, res, next) => {
  console.log(chalk.red('Not Found - 404 Error'));
  //no specified rout meaning all server requests will pass through this code! if the code above was not resolved
  const error = new Error(`Not Found ${req.originalUrl}`); //req.originalUrl=> is the url the user entered
  res.status(404);
  next(error);
});

//error handling middleware:
app.use((err, req, res, next) => {
  //this code will be fired off only when error object exists in the app.
  //err- catches errors thrown from anyware in our server or errors from the

  console.log(chalk.redBright('Error middleware on'));
  //sometimes even errors could have a statuscode of 200 so we need to change them to the 500 server error relm
  //if it's not 200 it will have it's original status code.

  res.status(err.status || 500); //const ststusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, //the stack of the error object is it's explanation (we will show it only in dev)
  });
  next();
});

// ! Error Handling --------------------------------------------------

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
