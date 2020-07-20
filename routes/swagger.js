/**
|--------------------------------------------------
| Swagger set up
|--------------------------------------------------
*/
const express = require('express')
const router = express.Router()
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const models = ['./db/models/admin.js', './db/models/user.js']

const routes = ['./src/Admin/route.js', './src/User/route.js']

const apis = [...routes, ...models]

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'NodeJS Boilerplate API Doc',
      version: '1.0.0',
      description: 'A boilerplate for NodeJS projects with enhanced folder structure',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
      contact: {
        name: 'Amar Hafizuddeen',
        url: 'https://www.linkedin.com/in/amar-hafizuddeen/',
        email: 'amarhafizuddeen@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis,
}

const specs = swaggerJsdoc(options)

router.use('/docs', swaggerUi.serve)
router.get(
  '/docs',
  swaggerUi.setup(specs, {
    explorer: true,
  })
)

module.exports = router
