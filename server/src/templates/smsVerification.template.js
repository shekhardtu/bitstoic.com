const appName = process.env.APP_NAME;

const message = (otp) => {
  return (
    `Dear User,\n` +
    `${otp} is your otp for Phone Number Verfication. Please enter the OTP to verify your phone number.\n` +
    `Regards\n` +
    `${appName}`
  );
};

module.exports = message;
