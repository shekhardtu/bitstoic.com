const Joi = require('joi');

const identifier = {
  body: Joi.object().keys({
    identifier: Joi.string().required(),
  }),
};
const verifyOtp = {
  body: Joi.object().keys({
    identifier: Joi.string().required(),
    otp: Joi.string()
      .length(4)
      .pattern(/^[0-9]+$/)
      .required(),
  }),
};

module.exports = {
  identifier,
  verifyOtp,
};
