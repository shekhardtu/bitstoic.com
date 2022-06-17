const subjectMail = 'OTP: For Reset Password';
const appName = process.env.APP_NAME;

const message = (otp) => {
  return (
    `Dear User, \n\n` +
    'OTP for Reset Password is : \n\n' +
    `${otp}\n\n` +
    'This is a auto-generated email. Please do not reply to this email.\n\n' +
    'Regards\n' +
    `${appName}\n\n`
  );
};

module.exports = { subjectMail, message };
