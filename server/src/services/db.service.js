const mongoose = require('mongoose');
const config = require('config');
const logger = require('../config/logger');

const db = async () =>
  await mongoose.connect(encodeURI(config.mongoose.url), config.mongoose.options).then(() => {
    logger.info('Connected to MongoDB');
  });

module.exports = {
  db,
};
