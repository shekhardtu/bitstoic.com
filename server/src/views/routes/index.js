const express = require('express');

const router = express.Router();
// const baseUrl = 'https://bitstoic.herokuapp.com';
const baseUrl = 'http://localhost:3000';
const appId = '1';
const { identifier: identifierService } = require('../common/service-client');

const menuItems = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Contact Us', 'contact'],
  ['Identifier', 'identifier'],
  ['Login', 'login'],
];
/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { page: 'Home', menuId: 'home', menuItems });
});
/* GET home page. */
router.get('/home', function (req, res) {
  res.render('index', { page: 'Home', menuId: 'home', menuItems });
});

router.get('/about', function (req, res) {
  res.render('about', { page: 'About Us', menuId: 'about', menuItems });
});

router.get('/contact', function (req, res) {
  res.render('contact', { page: 'Contact Us', menuId: 'contact', menuItems });
});

router.get('/identifier', function (req, res) {
  res.render('identifier', { page: 'identifier', menuId: 'identifier', menuItems });
});

router.post('/challenge', async (req, res) => {
  var { identifier, otp, from } = req.body;

  debugger;

  const params = {
    baseUrl,
    appId,
  };
  const payload = { identifier };

  try {
    if (from == 'verifyOtp') {
      const { data } = await identifierService.verifyOtp(params, payload);
      res.render('challenge', { page: 'challenge', menuId: 'challenge', from, menuItems, data });
    } else if (from == 'sendOtp') {
      const { data } = await identifierService.createOtp(params, payload);
      res.render('challenge', { page: 'challenge', menuId: 'challenge', to: 'verifyOtp', menuItems, data });
    }
  } catch (error) {
    res.writeHead(301, { Location: '/login' }).end();
  }

  // call axios api
  // if correct land on challenge page;
});

router.get('/login', function (req, res) {
  res.render('login', { page: 'login', menuId: 'login', menuItems });
});

router.post('/login', function (req, res) {
  res.render('identifier', { page: 'login', menuId: 'login', menuItems });
});

module.exports = router;
