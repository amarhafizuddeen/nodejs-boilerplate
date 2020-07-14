/**
|--------------------------------------------------
| Admin Controller
|--------------------------------------------------
*/
const Admin = require('./model')

module.exports = {
  createAdmin: async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).send('Missing required fields')
    }

    if (await Admin.emailExist(email)) {
      return res.status(400).send('Email unavailable')
    }

    const admin = new Admin({ ...req.body, hash: true })
    const result = await admin.save()
    return result.error ? res.status(500).send(result.error) : res.sendStatus(200)
  },
  login: async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).send('Missing required fields')
    }

    const admin = await Admin.findByEmail(email)
    if (!(await admin.comparePassword(password))) {
      return res.status(400).send('Invalid credentials')
    }

    const token = await admin.getToken()

    return res.json({ token })
  },
  viewAdmin: async (req, res) => {
    return res.send(await Admin.view())
  },
  viewAdminById: async (req, res) => {
    return res.send(await Admin.viewById(req.params.id))
  },
  updateAdmin: async (req, res) => {
    if (req.body.email && (await Admin.emailExist(req.body.email, req.params.id))) {
      return res.status(400).send('Email unavailable')
    }

    const result = await Admin.update(req.params.id, req.body)
    return result.error ? res.status(500).send(result.error) : res.sendStatus(200)
  },
  deleteAdmin: async (req, res) => {
    const result = await Admin.delete(req.params.id)
    return result.error ? res.status(500).send(result.error) : res.sendStatus(200)
  },
}
