const axios = require('axios');

// const axios = AxiosInstance;
const versionV1 = 'V1';

const createOtp = (params, payload) => {
  const { appId, baseUrl } = params;
  return axios.post(`${baseUrl}/${versionV1}/identifier/send-otp`, payload);
};

const verifyOtp = (params, payload) => {
  const { appId, baseUrl } = params;
  return axios.post(`${baseUrl}/${versionV1}/identifier/verify-otp`, payload);
};

module.exports = {
  createOtp,
  verifyOtp,
};
