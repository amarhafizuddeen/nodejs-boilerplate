/**
|--------------------------------------------------
| Admin Controller
|--------------------------------------------------
*/
const Admin = require('./model')

module.exports = {
  create: async (req, res) => {
    const admin = new Admin(req.body)
    const result = await admin.save()
    return result.error
      ? res.status(500).send(result.error)
      : res.sendStatus(200)
  },
  login: async (req, res) => {
    const { email, password } = req.body
    const admin = await Admin.findByEmail(email)
  },
  view: async (req, res) => {
    return res.send(await Admin.view())
  },
  viewById: async (req, res) => {
    return res.send(await Admin.viewById(req.params.id))
  },
  update: async (req, res) => {
    const admin = await Admin.findById(req.params.id)
    admin.update(req.body)
    const result = await Admin.update(req.params.id, req.body)
    return result.error
      ? res.status(500).send(result.error)
      : res.sendStatus(200)
  },
  delete: async (req, res) => {
    const result = await Admin.delete(req.params.id)
    return result.error
      ? res.status(500).send(result.error)
      : res.sendStatus(200)
  },
}
