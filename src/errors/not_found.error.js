const { NOT_FOUND, getStatusText } = require('http-status-codes');

class NotFoundError extends Error {
  constructor(message) {
    super();
    this.status = NOT_FOUND;
    this.text = `${getStatusText(this.status)}: ${message}`;
  }
}

module.exports = { NotFoundError };
