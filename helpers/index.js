const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')[process.env.ENV]
const ADMIN_ROLES = ['general', 'super', 'finance', 'sales']

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
    expiresIn: ADMIN_ROLES.includes(payload.type) ? '12h' : '30d',
  })
}

module.exports = _
