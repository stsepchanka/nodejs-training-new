const { getStatusText, UNAUTHORIZED } = require('http-status-codes');

class UnauthorizedError extends Error {
  constructor(message, details) {
    super();
    this.status = UNAUTHORIZED;
    this.text = `${getStatusText(this.status)}: ${message}`;
    this.details = details;
  }
}

module.exports = { UnauthorizedError };
