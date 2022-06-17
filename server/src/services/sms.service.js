const config = require('config');
const accountSid = config.phone.sms.accountSid;
const authToken = config.phone.sms.authToken;
const client = require('twilio')(accountSid, authToken);

const { smsVerificationTemplate } = require('../templates');

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendSms = (phone, text) => {
  return client.messages
    .create({
      body: `${text}`,
      from: config.phone.sms.from,
      to: `${phone}`,
    })
    .then((message) => message.sid);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendOtpSms = async (to, otp) => {
  const body = smsVerificationTemplate(otp);
  await sendSms(to, body);
};

module.exports = {
  sendOtpSms,
};
