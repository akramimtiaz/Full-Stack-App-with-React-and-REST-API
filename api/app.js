'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const usersRouter = require('./routes/api/users');
const coursesRouter = require('./routes/api/courses');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

//Require DB
const { sequelize } = require('./db');

//Testing the Database Connection
sequelize
  .authenticate()
  .then(() => console.log('authentication successful - connected to database'))
  .catch(err => console.log('an error occurred - failed to connect to database - ', err));


// create the Express app
const app = express();

// setup morgan which gives us http request logging
app.use(morgan('dev'));
app.use(express.json());


// TODO setup your api routes here
app.use('/api/users', usersRouter);
app.use('/api/courses', coursesRouter);

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
