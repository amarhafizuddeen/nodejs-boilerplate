/**
|--------------------------------------------------
| Admin Controller
|--------------------------------------------------
*/
const Admin = require('./model')

module.exports = {
  createAdmin: async (req, res, next) => {
    try {
      const { name, email, password } = req.body

      if (!name || !email || !password)
        throw new ValidationError('Missing required fields', 'field error')
      if (await Admin.emailExist(email))
        throw new DuplicateEmailError('Email unavailable', 'email error')

      const admin = new Admin({ ...req.body, hash: true })
      await admin.save()
      return res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  },
  login: async (req, res, next) => {
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
      next(error)
    }
  },
  viewAdmin: async (req, res, next) => {
    return res.send(await Admin.view())
  },
  viewAdminById: async (req, res, next) => {
    const admin = await Admin.find(req.params.id)
    if (!admin) return res.sendStatus(404)
    admin.hidePassword()
    return res.send(admin)
  },
  updateAdmin: async (req, res, next) => {
    try {
      if (req.body.email && (await Admin.emailExist(req.body.email, req.params.id)))
        throw new DuplicateEmailError('Email unavailable', 'email error')

      await Admin.update(req.params.id, req.body)
      return res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  },
  deleteAdmin: async (req, res, next) => {
    await Admin.delete(req.params.id)
    return res.sendStatus(200)
  },
}
