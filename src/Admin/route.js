/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: Admin management
 */

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

/**
 * @swagger
 * path:
 *  /admin:
 *    get:
 *      summary: Get all admins
 *      tags: [Admins]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        "200":
 *          description: An array of admin objects
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Admin'
 */
router.get('', checkAdminAuth, viewAdmin)

/**
 * @swagger
 * path:
 *  /admin/{adminId}:
 *    get:
 *      summary: Get an admin by id
 *      tags: [Admins]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: adminId
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the admin
 *      responses:
 *        "200":
 *          description: An admin object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Admin'
 *        "404":
 *          description: Admin with the id provided does not exist
 */
router.get('/:id', checkAdminAuth, viewAdminById)

/**
 * @swagger
 * path:
 *  /admin/:
 *    post:
 *      summary: Create a new admin
 *      tags: [Admins]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Admin'
 *      responses:
 *        "200":
 *          description: Admin created successfully
 */
router.post('', checkAdminAuth, createAdmin)

/**
 * @swagger
 * path:
 *  /admin/login:
 *    post:
 *      summary: Admin login
 *      tags: [Admins]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Admin'
 *            example:
 *              email: admin@mail.com
 *              password: "12345678"
 *      responses:
 *        "200":
 *          description: A JWT token
 */
router.post('/login', login)

/**
 * @swagger
 * path:
 *  /admin/{adminId}:
 *    put:
 *      summary: Update Admin
 *      tags: [Admins]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: adminId
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the admin
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Admin'
 *            example:
 *              name: New Name
 *              email: new@mail.com
 *              password: newpassword
 *      responses:
 *        "200":
 *          description: Update successful
 */
router.put('/:id', checkAdminAuth, updateAdmin)

/**
 * @swagger
 * path:
 *  /admin/{adminId}:
 *    delete:
 *      summary: Delete Admin
 *      tags: [Admins]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: adminId
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the admin
 *      responses:
 *        "200":
 *          description: Deletion successful
 */
router.delete('/:id', checkAdminAuth, deleteAdmin)

module.exports = {
  name: 'admin',
  router,
}
