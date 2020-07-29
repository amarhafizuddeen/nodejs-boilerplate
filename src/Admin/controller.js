/**
|--------------------------------------------------
| Admin Controller
|--------------------------------------------------
*/
const Admin = require('./model')

module.exports = {
  createAdmin: async (req, res, next) => {
    try {
      const admin = new Admin({ ...req.body })
      const errors = await admin.save()
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
  viewAdmin: async (req, res) => {
    return res.send(await Admin.view())
  },
  viewAdminById: async (req, res) => {
    const admin = await Admin.find(req.params.id)
    if (!admin) return res.sendStatus(404)
    admin.hidePassword()
    return res.send(admin)
  },
  aboutme: async (req, res) => {
    const admin = await Admin.find(req.decoded.id)
    if (!admin) return res.sendStatus(404)
    admin.hidePassword()
    return res.send(admin)
  },
  updateAdmin: async (req, res, next) => {
    try {
      const errors = await Admin.update(req.params.id, req.body)
      if (errors) throw new DatabaseError(errors, 'database validation error')
      return res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  },
  deleteAdmin: async (req, res) => {
    const deleted = await Admin.delete(req.params.id)
    if (!deleted) return res.sendStatus(404)
    return res.sendStatus(200)
  },
  // TODO: REMOVE THIS
  createSuperAdmin: async (req, res, next) => {
    try {
      const admin = new Admin({ ...req.body, type: 'super' })
      const errors = await admin.save()
      if (errors) throw new DatabaseError(errors, 'database validation error')
      return res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  },
}
