const { BAD_REQUEST, getStatusText } = require('http-status-codes');

class ValidationError extends Error {
  constructor(message, details) {
    super();
    this.status = BAD_REQUEST;
    this.text = `${getStatusText(this.status)}: ${message}`;
    this.details = details;
  }
}

module.exports = { ValidationError };
