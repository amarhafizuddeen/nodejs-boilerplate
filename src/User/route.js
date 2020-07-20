/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

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
const { checkAdminAuth } = require(appPath + '/middlewares/auth')

/**
 * @swagger
 * path:
 *  /user:
 *    get:
 *      summary: Get all users
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: An array of user objects
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.get('', viewUser)

/**
 * @swagger
 * path:
 *  /user/{userId}:
 *    get:
 *      summary: Get a user by id
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the user
 *      responses:
 *        "200":
 *          description: An user object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        "404":
 *          description: Admin with the id provided does not exist
 */
router.get('/:id', viewUserById)

/**
 * @swagger
 * path:
 *  /user/:
 *    post:
 *      summary: Create a new user
 *      tags: [Users]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.post('', checkAdminAuth, createUser)

/**
 * @swagger
 * path:
 *  /user/login:
 *    post:
 *      summary: User login
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *            example:
 *              email: user@mail.com
 *              password: "12345678"
 *      responses:
 *        "200":
 *          description: A JWT token
 */
router.post('/login', login)

/**
 * @swagger
 * path:
 *  /user/{userId}:
 *    put:
 *      summary: Update User
 *      tags: [Users]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *            example:
 *              name: New Name
 *              email: new@mail.com
 *              password: newpassword
 *      responses:
 *        "200":
 *          description: Update successful
 */
router.put('/:id', checkAdminAuth, updateUser)

/**
 * @swagger
 * path:
 *  /user/{userId}:
 *    delete:
 *      summary: Delete User
 *      tags: [Users]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the user
 *      responses:
 *        "200":
 *          description: Deletion successful
 */
router.delete('/:id', checkAdminAuth, deleteUser)

module.exports = {
  name: 'user',
  router,
}
