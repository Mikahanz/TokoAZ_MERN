import chalk from 'chalk';

const notFound = (req, res, next) => {
  console.log(chalk.red('Not Found - 404 Error'));
  //no specified rout meaning all server requests will pass through this code! if the code above was not resolved
  const error = new Error(`Not Found ${req.originalUrl}`); //req.originalUrl=> is the url the user entered
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  //this code will be fired off only when error object exists in the app.
  //err- catches errors thrown from anyware in our server or errors from the

  console.log(chalk.redBright(`!!!${err}`));
  //sometimes even errors could have a statuscode of 200 so we need to change them to the 500 server error relm
  //if it's not 200 it will have it's original status code.

  res.status(err.status || 500);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, //the stack of the error object is it's explanation (we will show it only in dev)
  });
  next();
};

export { notFound, errorHandler };
