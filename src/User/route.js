const router = require('express').Router()
const {
  viewUser,
  viewUserById,
  createUser,
  login,
  updateUser,
  deleteUser,
} = require('./controller')
const path = require('path')
const appPath = path.dirname(require.main.filename)
const { checkUserAuth } = require(appPath + '/middlewares/auth')

router.get('', checkUserAuth, viewUser)
router.get('/:id', checkUserAuth, viewUserById)
router.post('', checkUserAuth, createUser)
router.post('/login', login)
router.put('/:id', checkUserAuth, updateUser)
router.delete('/:id', checkUserAuth, deleteUser)

module.exports = {
  name: 'user',
  router,
}
