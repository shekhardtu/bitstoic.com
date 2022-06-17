const removeKey = [
  { url: 'send-otp', keys: ['isVerified', 'id', '_id', 'otp'] },
  { url: 'verify-otp', keys: ['email', 'phoneNumber'] },
  { url: 'set-password', keys: ['email', 'phoneNumber'] },
  { url: 'sign-up', keys: [] },
];

module.exports = {
  removeKey,
};
