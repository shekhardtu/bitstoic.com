const httpStatus = require('http-status');
const configs = require('config');

const catchAsync = require('../utils/catchAsync');
const { identifierService, otpService, userService, tokenService } = require('../services');
const cryptoController = require('./crypto.controller');

const { APP } = require('../config/');

const app = configs.get('app');
const isDev = configs.get('NODE_ENV') == 'development';
const isProd = configs.get('NODE_ENV') == 'production';
const encrypter = new cryptoController.Encrypter(app.secret);

// TODO:: Move to utility
const sanitizeObject = (obj, reqUrl) => {
  // It removes the unnecessary keys
  if (isDev) return obj;

  const { keys } = APP.removeKey.find((item) => reqUrl.includes(item.url));
  if (Array.isArray(keys)) {
    /* eslint-disable no-param-reassign */
    keys.forEach((item) => (obj[item] = undefined));
    return obj;
  }
  return obj;
};

// TODO:: Added otp create timestamp
const sendOtp = catchAsync(async (req, res) => {
  const otp = { otp: await otpService.create(4) };
  Object.assign(req.body, otp);
  let user = await identifierService.findIdentifierAndUpdateOtp(req.body);
  isProd && (await otpService.sendOtp(user));

  const identifier = encrypter.encrypt(user.id);

  user.identifier = identifier;
  user = sanitizeObject(user, req.url);
  return res.status(httpStatus.OK).send({ user });
});

const verifyOtp = catchAsync(async (req, res) => {
  req.body.id = encrypter.dencrypt(req.body.identifier);
  // const validIdentifier = await identifierService.isValidIdentifier(req.body);
  let { status: isValidOtp, doc } = await identifierService.isValidOtp(req.body);
  ({ status: markVerfied, doc } = await identifierService.markIdentifierVerfied(doc));

  isProd && (await identifierService.removeOtp(doc));

  ({ doc: user, status } = await userService.getUserByIdentifier(doc.identifier));
  if (status && user.role === 'verifiedUser') {
    user.identifierId = doc._id;

    ({ doc: user, resp } = await userService.updateUserById(user._id, user));
    const tokens = await tokenService.generateAuthTokens(resp);
    isDev ? res.status(httpStatus.OK).send({ user: user, tokens }) : res.status(httpStatus.OK).send({ tokens });
  } else if (user?.role === 'user') {
    user = sanitizeObject(user, req.url);
    res.status(httpStatus.OK).send({ user: user });
  } else {
    req.body = await userService.createIdentifierUser(doc);
    ({ doc: user } = req.body);
    user = sanitizeObject(user, req.url);
    res.status(httpStatus.OK).send({ user });
  }
});

module.exports = {
  sendOtp,
  verifyOtp,
};
