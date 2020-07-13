const bcrypt = require('bcryptjs')

const _ = {}

_.hashPassword = (password) => {
  const saltRounds = 10
  return bcrypt.hashSync(password, saltRounds)
}

_.comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

_.getJWT = (userType, payload) => {
  return jwt.sign(payload, config.private_key)
}

module.exports = _
