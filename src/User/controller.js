/**
|--------------------------------------------------
| User Controller
|--------------------------------------------------
*/
const User = require('./model')

module.exports = {
  registerUser: async (req, res, next) => {
    try {
      const user = new User({ ...req.body })
      const errors = await user.save()
      if (errors) throw new DatabaseError(errors, 'database validation error')
      return res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body

      if (!email || !password) throw new ValidationError('Missing required fields', 'field error')

      const user = await User.find(email)
      if (!user) throw new CredentialError('Invalid credentials', 'email error')
      if (!(await user.comparePassword(password)))
        throw new CredentialError('Invalid credentials', 'wrong password error')

      const token = await user.getToken()

      return res.json({ token })
    } catch (error) {
      next(error)
    }
  },
  viewUser: async (req, res, next) => {
    return res.send(await User.view())
  },
  viewUserById: async (req, res, next) => {
    const user = await User.find(req.params.id)
    if (!user) return res.sendStatus(404)
    user.hidePassword()
    return res.send(user)
  },
  aboutme: async (req, res) => {
    const user = await User.find(req.decoded.id)
    if (!user) return res.sendStatus(404)
    user.hidePassword()
    return res.send(user)
  },
  updateProfile: async (req, res, next) => {
    try {
      const errors = await User.update(req.decoded.id, req.body)
      if (errors) throw new DatabaseError(errors, 'database validation error')
      return res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const errors = await User.update(req.params.id, req.body)
      if (errors) throw new DatabaseError(errors, 'database validation error')
      return res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  },
  deleteUser: async (req, res, next) => {
    const deleted = await User.delete(req.params.id)
    if (!deleted) return res.sendStatus(404)
    return res.sendStatus(200)
  },
}
