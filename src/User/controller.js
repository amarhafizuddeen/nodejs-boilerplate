/**
|--------------------------------------------------
| User Controller
|--------------------------------------------------
*/
const User = require('./model')

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const { name, email, password } = req.body

      if (!name || !email || !password)
        throw new ValidationError('Missing required fields', 'field error')

      if (await User.emailExist(email))
        throw new DuplicateEmailError('Email unavailable', 'email error')

      const user = new User({ ...req.body, hash: true })
      await user.save()
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
  updateUser: async (req, res, next) => {
    if (req.body.email && (await User.emailExist(req.body.email, req.params.id))) {
      return res.status(400).send('Email unavailable')
    }

    await User.update(req.params.id, req.body)
    return res.sendStatus(200)
  },
  deleteUser: async (req, res, next) => {
    await User.delete(req.params.id)
    return res.sendStatus(200)
  },
}
