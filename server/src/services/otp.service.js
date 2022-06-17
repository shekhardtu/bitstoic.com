const otpGenerator = require('otp-generator');

const validate = require('validator');
const smsService = require('./sms.service');
const emailService = require('./email.service');
/**
 * Create a identifier or Check if exist.
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const create = (length) =>
  otpGenerator.generate(length, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });

const sendOtp = (user) => {
  const isCommunicationTypeEmail = validate.isEmail(user.identifier);
  if (isCommunicationTypeEmail) {
    return emailService.sendOtpEmail(user.identifier, user.otp);
  }
  return smsService.sendOtpSms(user.identifier, user.otp);
};
module.exports = {
  sendOtp,
  create,
};
