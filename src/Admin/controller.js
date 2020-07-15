/**
|--------------------------------------------------
| Admin Controller
|--------------------------------------------------
*/
const Admin = require('./model')

module.exports = {
  createAdmin: async (req, res) => {
    try {
      const { name, email, password } = req.body

      if (!name || !email || !password)
        throw new ValidationError('Missing required fields', 'field error')
      if (await Admin.emailExist(email))
        throw new DuplicateEmailError('Email unavailable', 'email error')

      const admin = new Admin({ ...req.body, hash: true })
      const result = await admin.save()
      return result.error ? res.status(500).send(result.error) : res.sendStatus(200)
    } catch (error) {
      return res.status(400).send(error.message)
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body

      if (!email || !password) throw new ValidationError('Missing required fields', 'field error')

      const admin = await Admin.find(email)
      if (!admin) throw new CredentialError('Invalid credentials', 'email error')
      if (!(await admin.comparePassword(password)))
        throw new CredentialError('Invalid credentials', 'wrong password error')

      const token = await admin.getToken()

      return res.json({ token })
    } catch (error) {
      return res.status(400).send(error.message)
    }
  },
  viewAdmin: async (req, res) => {
    return res.send(await Admin.view())
  },
  viewAdminById: async (req, res) => {
    const admin = await Admin.find(req.params.id)
    admin.hidePassword()
    return res.send(admin)
  },
  updateAdmin: async (req, res) => {
    try {
      if (req.body.email && (await Admin.emailExist(req.body.email, req.params.id)))
        throw new DuplicateEmailError('Email unavailable', 'email error')

      const result = await Admin.update(req.params.id, req.body)
      return result.error ? res.status(500).send(result.error) : res.sendStatus(200)
    } catch (error) {
      return res.status(400).send(error.message)
    }
  },
  deleteAdmin: async (req, res) => {
    const result = await Admin.delete(req.params.id)
    return result.error ? res.status(500).send(result.error) : res.sendStatus(200)
  },
}
