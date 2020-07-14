const router = require('express').Router()
const {
  viewAdmin,
  viewAdminById,
  createAdmin,
  login,
  updateAdmin,
  deleteAdmin,
} = require('./controller')
const path = require('path')
const appPath = path.dirname(require.main.filename)
const { checkAdminAuth } = require(appPath + '/middlewares/auth')

router.get('', checkAdminAuth, viewAdmin)
router.get('/:id', checkAdminAuth, viewAdminById)
router.post('', checkAdminAuth, createAdmin)
router.post('/login', login)
router.put('/:id', checkAdminAuth, updateAdmin)
router.delete('/:id', checkAdminAuth, deleteAdmin)

module.exports = {
  name: 'admin',
  router,
}
