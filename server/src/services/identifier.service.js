const httpStatus = require('http-status');
const { Identifier } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a identifier or Check if exist.
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const findIdentifierAndUpdateOtp = async (identifierBody) => {
  if (await Identifier.isIdentifierExist(identifierBody.identifier)) {
    return Identifier.findOneAndUpdate({ identifier: identifierBody.identifier }, identifierBody, {
      returnDocument: 'after',
    });
  }
  return Identifier.create(identifierBody);
};

/**
 * Create a identifier or Check if exist.
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const markIdentifierVerfied = async (identifierBody) => {
  const identifier = await Identifier.findOneAndUpdate(
    { _id: identifierBody._id },
    { isVerified: true },
    {
      new: true,
    }
  );
  return {
    doc: identifier._doc,
    status: !!identifier,
  };
};

const getIdentifier = async function (identifier, excludeUserId) {
  const user = await Identifier.findOne({ identifier, _id: { $ne: excludeUserId } });
  return user;
};

/**
 * Create a identifier or Check if exist.
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const isValidIdentifier = async (identifierBody) => {
  return Identifier.isIdentifierExist(identifierBody.identifier);
};

/**
 * Create a identifier or Check if exist.
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const removeOtp = async (identifierBody) => {
  return Identifier.findOneAndUpdate(
    { identifier: identifierBody.identifier, otp: identifierBody.otp },
    { $unset: { otp: 1 } },
    {
      new: true,
    }
  );
};

/**
 * Create a identifier or Check if exist.
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const isValidOtp = async (identifierBody) => {
  const identifier = await Identifier.findOne({ _id: identifierBody.id, otp: identifierBody.otp });
  if (!identifier) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return {
    doc: identifier._doc,
    status: !!identifier,
  };
};

module.exports = {
  getIdentifier,
  findIdentifierAndUpdateOtp,
  isValidIdentifier,
  isValidOtp,
  removeOtp,
  markIdentifierVerfied,
};
