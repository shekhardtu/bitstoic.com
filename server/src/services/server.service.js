const config = require('config');
const { once } = require('events');
const app = require('../app');
const logger = require('../config/logger');

const connect = async () => {
  const server = app.listen(config.port, () => {
    logger.info(`Listening at http://localhost:${config.port} Env: ${config.env}`);
  });
  await once(server, 'listening');
  return server;
};

module.exports = {
  connect,
};
