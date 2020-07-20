class DuplicateEmailError extends ControllerError {
  constructor(message, type) {
    super(message, 400)
    this.name = 'DuplicateEmailError'
    this.type = type
  }
}

module.exports = DuplicateEmailError
