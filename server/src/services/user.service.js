const httpStatus = require('http-status');

const validator = require('validator');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  const isIdentifierTaken = await User.isIdentifierTaken(userBody.identifier);

  const isEmail = validator.isEmail(userBody.identifier);

  if (isIdentifierTaken) {
    if (isEmail) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email Id is  already taken');
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Phone number is  already taken');
    }
  }

  if (isEmail) {
    userBody.email = userBody.identifier;
  } else {
    userBody.phone = userBody.identifier;
  }

  return User.create(userBody);
};

function createUserBody(body) {
  const isEmail = validator.isEmail(body.email);

  return {
    [isEmail && 'isEmailVerified']: validator.isEmail(body.email),
    [!isEmail && 'isPhoneNumberVerified']: isEmail ? undefined : validator.isMobilePhone(body?.phone),
  };
}

function createUserBodyByIdentifier(body) {
  const isEmail = validator.isEmail(body.identifier);
  return {
    identifierId: body._id,
    [isEmail && 'email']: body.identifier,
    [!isEmail && 'phone']: body.identifier,
    [isEmail && 'isEmailVerified']: validator.isEmail(body.identifier),
    [!isEmail && 'isPhoneNumberVerified']: validator.isMobilePhone(body.identifier),
  };
}

/**
 * Create a user with identifier
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createIdentifierUser = async (identifierBody) => {
  const userBody = createUserBodyByIdentifier(identifierBody);
  const user = await User.create(userBody);
  return { doc: user, status: !!user };
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserByIdentifier = async (identifier) => {
  const user = await User.findOne({
    $or: [{ email: identifier }, { phone: identifier }],
  });
  return {
    doc: user,
    status: !!user,
  };
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const isValidRole = async (expectedType, userId) => {
  const user = await getUserById(userId);

  if (user.role !== expectedType) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  // if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }

  Object.assign(user, updateBody);
  const userBody = createUserBody(user);

  Object.assign(user, userBody);

  await user.save();
  return { doc: user._doc, resp: user };
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserPasswordAndRole = async (userId, updateBody) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  getUserByIdentifier,
  createIdentifierUser,
  isValidRole,
  updateUserPasswordAndRole,
};
