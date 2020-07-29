/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

const router = require('express').Router()
const {
  aboutme,
  viewUser,
  viewUserById,
  registerUser,
  login,
  updateProfile,
  updateUser,
  deleteUser,
} = require('./controller')
const path = require('path')
const appPath = path.dirname(require.main.filename)
const { checkAdminAuth, checkUserAuth } = require(appPath + '/middlewares/auth')

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
 *  /user/aboutme:
 *    get:
 *      summary: View user's own profile
 *      tags: [Users]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        "200":
 *          description: An user object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        "404":
 *          description: User with the id provided does not exist
 */
router.get('/aboutme', checkUserAuth, aboutme)

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
 *      summary: User registration
 *      tags: [Users]
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
router.post('', registerUser)

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
 *              email: johnsmith@email.com
 *              password: supersafepassword
 *      responses:
 *        "200":
 *          description: A JWT token
 */
router.post('/login', login)

/**
 * @swagger
 * path:
 *  /user/profile:
 *    put:
 *      summary: Update User Profile
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
 *          description: Update successful
 */
router.put('/profile', checkUserAuth, updateProfile)

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
 *      responses:
 *        "200":
 *          description: Update successful
 */
router.put('/:id', checkAdminAuth(['general']), updateUser)

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
router.delete('/:id', checkAdminAuth(['super']), deleteUser)

module.exports = {
  name: 'user',
  router,
}
