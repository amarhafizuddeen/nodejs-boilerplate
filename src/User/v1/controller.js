/**
|--------------------------------------------------
| User Controller
|--------------------------------------------------
*/
const User = require('./model')

module.exports = {
  create: async (req, res) => {
    const user = new User(req.body)
    const result = await user.save()
    return result.error
      ? res.status(500).send(result.error)
      : res.sendStatus(200)
  },
  view: async (req, res) => {
    return res.send(await User.view())
  },
  viewById: async (req, res) => {
    return res.send(await User.viewById(req.params.id))
  },
  update: async (req, res) => {
    const result = await User.update(req.params.id, req.body)
    return result.error
      ? res.status(500).send(result.error)
      : res.sendStatus(200)
  },
  delete: async (req, res) => {
    const result = await User.delete(req.params.id)
    return result.error
      ? res.status(500).send(result.error)
      : res.sendStatus(200)
  },
}
