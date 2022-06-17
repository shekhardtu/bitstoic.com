const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const identifierSchema = mongoose.Schema(
  {
    identifier: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!(validator.isMobilePhone(value) || validator.isEmail(value))) {
          throw new Error('Invalid identifier');
        }
      },
    },
    otp: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      validate(value) {
        if (!validator.isLength(value, { min: 4, max: undefined })) {
          throw new Error('Invalid otp length');
        }
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
      trim: true,
    },
    identifierId: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
identifierSchema.plugin(toJSON);
identifierSchema.plugin(paginate);

/**
 * Check if identifier is taken
 * @param {string} email - The user's email or phoneNumber
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
identifierSchema.statics.isIdentifierExist = async function (identifier, excludeUserId) {
  const user = await this.findOne({ identifier, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * @typedef Identifier
 */
const Identifier = mongoose.model('Identifier', identifierSchema);

module.exports = Identifier;
