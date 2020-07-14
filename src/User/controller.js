/**
|--------------------------------------------------
| User Controller
|--------------------------------------------------
*/
const User = require('./model')

module.exports = {
  createUser: async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).send('Missing required fields')
    }

    if (await User.emailExist(email)) {
      return res.status(400).send('Email unavailable')
    }

    const user = new User({ ...req.body, hash: true })
    const result = await user.save()
    return result.error ? res.status(500).send(result.error) : res.sendStatus(200)
  },
  login: async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).send('Missing required fields')
    }

    const user = await User.findByEmail(email)
    if (!(await user.comparePassword(password))) {
      return res.status(400).send('Invalid credentials')
    }

    const token = await user.getToken()

    return res.json({ token })
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
