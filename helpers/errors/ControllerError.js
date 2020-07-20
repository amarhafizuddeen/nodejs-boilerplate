class ControllerError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.name = 'ControllerError'
    this.statusCode = statusCode
  }
}

module.exports = ControllerError
