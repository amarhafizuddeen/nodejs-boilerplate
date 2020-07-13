const router = require('express').Router()
const controller = require('./controller')

router.get('', controller.view)
router.get('/:id', controller.viewById)
router.post('', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

module.exports = {
  name: 'v1/user',
  router,
}
