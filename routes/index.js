const express = require('express')
const fs = require('fs')
const router = express.Router()

const srcDir = __dirname + '/../src/'
function checkFolder(folder) {
  fs.readdirSync(folder).forEach((file) => {
    let routeFile = folder + '/' + file
    if (fs.lstatSync(routeFile).isDirectory()) {
      checkFolder(routeFile)
    } else {
      if (file === 'route.js') {
        const route = require(routeFile)
        router.use(`/${route.name}`, route.router)
      }
    }
  })
}
checkFolder(srcDir)
fs.readdirSync(srcDir).forEach((folder) => {
  const routeFile = `../src/${folder}/route.js`

  if (fs.existsSync(__dirname + '/' + routeFile)) {
    const route = require(routeFile)
    router.use(`/${route.name}`, route.router)
  }
})

router.get('/', (req, res) => {
  return res.send(
    'API server is up and running! Head over to <a href="/docs">the API docs</a> to learn more.'
  )
})

module.exports = router
router.use(require('./swagger'))
