const express = require('express');
const identifierRoute = require('./identifier.route');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const subscriptionRoute = require('./subscription.route');
const docsRoute = require('./docs.route');
const config = require('config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/identifier',
    route: identifierRoute,
  },
  {
    path: '/subscription',
    route: subscriptionRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
