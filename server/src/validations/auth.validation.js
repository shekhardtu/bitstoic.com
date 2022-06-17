const Joi = require('joi');
const { password, objectId, isValidEmailOrPhoneNumber } = require('./custom.validation');

const identifier = {
  body: Joi.object().keys({
    identifier: Joi.string().required(),
  }),
};

const signUp = {
  body: Joi.object().keys({
    identifier: Joi.string().required().custom(isValidEmailOrPhoneNumber),
    password: Joi.string().required().custom(password),
    fullName: Joi.string().required(),
  }),
};

const setPassword = {
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
    fullName: Joi.string(),
    userId: Joi.string().custom(objectId),
  }),
};

const signIn = {
  body: Joi.object().keys({
    identifier: Joi.string().required().custom(isValidEmailOrPhoneNumber),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  identifier,
  signIn,
  signUp,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
  setPassword,
};
