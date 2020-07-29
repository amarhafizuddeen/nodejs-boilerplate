class DatabaseError extends Error {
  constructor(errors, type) {
    super('Bad Params')
    this.name = 'DatabaseError'
    this.type = type
    this.errors = errors
    this.statusCode = 400
  }
}

module.exports = DatabaseError
