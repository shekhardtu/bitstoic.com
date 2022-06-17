const express = require('express');

const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const path = require('path');
const configs = require('config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const { helmet, rateLimiter } = require('./middlewares');
const routes = require('./routes/v1');
// const routesViews = require('./views/routes');

const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');

const app = express();

if (configs.get('env') !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// // set the template engine
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, './views'));

// Have Node serve the files for our built React app

app.use(express.static(path.resolve(__dirname, '../../client/build')));

// set path for static assets
app.use(express.static(path.join(__dirname, './public')));

// set security HTTP headers
app.use(helmet.helmet());
// app.use(csp);
app.use(helmet.csp);

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (configs.get('env') === 'production') {
  app.use('/api/v1/auth', rateLimiter.authLimiter);
}

// v1 api routes
app.use('/api/v1', routes);

// app.use('/', routesViews);

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
