class CredentialError extends Error {
  constructor(message, type) {
    super(message)
    this.name = 'CredentialError'
    this.type = type
  }
}

module.exports = CredentialError
