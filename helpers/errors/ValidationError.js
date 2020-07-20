class ValidationError extends ControllerError {
  constructor(message, type) {
    super(message, 400)
    this.name = 'ValidationError'
    this.type = type
  }
}

module.exports = ValidationError
