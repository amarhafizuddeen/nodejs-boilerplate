const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const config = require('./config')[process.env.ENV]
const routes = require('./routes')
require('./helpers/errors')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('common'))
app.use(routes)
app.use(require('./helpers/express-error'))

app.listen(config.PORT, () => {
  console.log('Server started on port :', config.PORT)
})
