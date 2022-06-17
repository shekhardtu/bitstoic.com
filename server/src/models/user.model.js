const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    identifierId: {
      type: String,
      trim: true,
      sparse: true,
    },
    email: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
      index: {
        unique: true,
        partialFilterExpression: { email: { $type: 'string' } },
      },
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email id');
        }
      },
    },
    phone: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
      index: {
        unique: true,
        partialFilterExpression: { phone: { $type: 'string' } },
      },
      validate(value) {
        if (!validator.isMobilePhone(value)) {
          throw new Error('Invalid phone number');
        }
      },
    },
    password: {
      type: String,
      required: false,
      default: `${Math.random() * 11111}abc`,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isPhoneNumberVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
userSchema.statics.isIdentifierTaken = async (identifier) => {
  const user = await User.findOne({
    $or: [{ email: identifier }, { phone: identifier }],
  });
  return !!Boolean(user);
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
