/**
|--------------------------------------------------
| Auth Middleware
|--------------------------------------------------
*/
const jwt = require('jsonwebtoken')
const config = require('../config')[process.env.ENV]
const Admin = require('../src/Admin/model')
const User = require('../src/User/model')

const verifyJWT = async (token) => {
  return jwt.verify(token, config.PRIVATE_KEY, async (err, decoded) => {
    if (err) throw new Error(err)
    return decoded
  })
}

const checkAuth = async (req, type = null) => {
  let token = req.headers['authorization']
  if (!token) throw new Error('Missing Token')
  token = token.replace('Bearer ', '')

  const verified = await verifyJWT(token)
  if (verified.error) throw new Error('Invalid Token')
  if (type && verified.type !== type) throw new Error('Invalid Auth Level')

  return verified
}

module.exports = {
  checkGeneralAuth: async (req, res, next) => {
    try {
      req.decoded = await checkAuth(req)
      req.admin = await Admin.findById(req.decoded.id)
      next()
    } catch (error) {
      console.log(error)
      return res.status(403).send(error.message)
    }
  },
  checkAdminAuth: async (req, res, next) => {
    try {
      req.decoded = await checkAuth(req, 'admin')
      req.admin = await Admin.find(req.decoded.id)
      next()
    } catch (error) {
      console.log(error)
      return res.status(403).send(error.message)
    }
  },
  checkUserAuth: async (req, res, next) => {
    try {
      req.decoded = await checkAuth(req, 'user')
      req.admin = await User.find(req.decoded.id)
      next()
    } catch (error) {
      console.log(error)
      return res.status(403).send(error.message)
    }
  },
}
