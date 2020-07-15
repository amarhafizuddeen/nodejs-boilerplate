class DuplicateEmailError extends Error {
  constructor(message, type) {
    super(message)
    this.name = 'DuplicateEmailError'
    this.type = type
  }
}

module.exports = DuplicateEmailError
