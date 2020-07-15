/**
|--------------------------------------------------
| User Controller
|--------------------------------------------------
*/
const User = require('./model')

module.exports = {
  createUser: async (req, res) => {
    try {
      const { name, email, password } = req.body

      if (!name || !email || !password)
        throw new ValidationError('Missing required fields', 'field error')

      if (await User.emailExist(email))
        throw new DuplicateEmailError('Email unavailable', 'email error')

      const user = new User({ ...req.body, hash: true })
      const result = await user.save()
      return result.error ? res.status(500).send(result.error) : res.sendStatus(200)
    } catch (error) {
      return res.status(400).send(error.message)
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body

      if (!email || !password) throw new ValidationError('Missing required fields', 'field error')

      const user = await User.findByEmail(email)
      if (!user) throw new CredentialError('Invalid credentials', 'email error')
      if (!(await user.comparePassword(password)))
        throw new CredentialError('Invalid credentials', 'wrong password error')

      const token = await user.getToken()

      return res.json({ token })
    } catch (error) {
      return res.status(400).send(error.message)
    }
  },
  viewUser: async (req, res) => {
    return res.send(await User.view())
  },
  viewUserById: async (req, res) => {
    return res.send(await User.viewById(req.params.id))
  },
  updateUser: async (req, res) => {
    if (req.body.email && (await User.emailExist(req.body.email, req.params.id))) {
      return res.status(400).send('Email unavailable')
    }

    const result = await User.update(req.params.id, req.body)
    return result.error ? res.status(500).send(result.error) : res.sendStatus(200)
  },
  deleteUser: async (req, res) => {
    const result = await User.delete(req.params.id)
    return result.error ? res.status(500).send(result.error) : res.sendStatus(200)
  },
}
