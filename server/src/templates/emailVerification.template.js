const subjectMail = 'OTP: For Email Verification';
const appName = process.env.APP_NAME;

const message = (otp) => {
  return (
    `Dear User, \n\n` +
    'OTP for your email verification is : \n\n' +
    `${otp}\n\n` +
    'This is a auto-generated email. Please do not reply to this email.\n\n' +
    'Regards\n' +
    `${appName}\n\n`
  );
};

module.exports = {
  subjectMail,
  message,
};
