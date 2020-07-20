class CredentialError extends ControllerError {
  constructor(message, type) {
    super(message, 401)
    this.name = 'CredentialError'
    this.type = type
  }
}

module.exports = CredentialError
