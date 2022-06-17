const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService, identifierService } = require('../services');
const {
  ROLE: { role },
} = require('../config');
const identifierController = require('./identifier.controller');

const signUp = catchAsync(async (req, res, next) => {
  req.body.role = role.VERIFIED_USER;
  const user = await identifierService.getIdentifier(req.body.identifier);

  if (!user.isVerified) {
    return identifierController.sendOtp(req, res, next);
  }
  const newUser = await userService.createUser(req.body);
  identifierController.sendOtp(req, res, next);
});

const setPassword = catchAsync(async (req, res) => {
  req.body.role = role.VERIFIED_USER;
  const user = await userService.updateUserPasswordAndRole(req.body.userId, req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.OK).send({ user, tokens });
});

const signIn = catchAsync(async (req, res) => {
  const { identifier, password } = req.body;
  const user = await authService.loginUserWithIdentifierAndPassword(identifier, password);
  const tokens = await tokenService.generateAuthTokens(user.doc);
  res.send({ user: user.doc, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  signUp,
  signIn,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  setPassword,
};
