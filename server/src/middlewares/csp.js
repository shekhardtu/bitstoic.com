const helmet = require('helmet');
const crypto = require('crypto');

const cspNonce = crypto.randomBytes(16).toString('hex');

const csp = helmet.contentSecurityPolicy({
  useDefaults: false,
  directives: {
    defaultSrc: ["'self'"],
    scriptSrcElem: ["'self'", 'maxcdn.bootstrapcdn.com', `nonce-${cspNonce}`],
    objectSrc: ["'none'"],
    fontSrc: ['maxcdn.bootstrapcdn.com'],
    imgSrc: ["'self'", 'data:'],
    styleSrc: ["'self'", "'unsafe-inline'", 'maxcdn.bootstrapcdn.com'],
    upgradeInsecureRequests: [],
  },
});

module.exports = {
  helmet,
  csp,
};
