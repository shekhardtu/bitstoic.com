const app = require('./app');
const { dbService, emailService } = require('../src/services/');
const config = require('config');

const logger = require('./config/logger');
const port = process.env.PORT || config.get('port');
let server;

dbService.db();
// emailService.connect();
server = app.listen(port, () => {
  logger.info(`Listening at http://localhost:${port}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
