const { getStatusText, FORBIDDEN } = require('http-status-codes');

class ForbiddenError extends Error {
  constructor(message, details) {
    super();
    this.status = FORBIDDEN;
    this.text = `${getStatusText(this.status)}: ${message}`;
    this.details = details;
  }
}

module.exports = { ForbiddenError };
