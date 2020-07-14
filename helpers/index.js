const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')[process.env.ENV]

const _ = {}

_.hashPassword = (password) => {
  const saltRounds = 10
  return bcrypt.hashSync(password, saltRounds)
}

_.comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

_.getJWT = (payload) => {
  return jwt.sign(payload, config.PRIVATE_KEY, {
    expiresIn: payload.type === 'admin' ? '12h' : '30d',
  })
}

module.exports = _
