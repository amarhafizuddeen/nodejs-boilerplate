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
  aboutme,
  createAdmin,
  login,
  updateAdmin,
  deleteAdmin,
  createSuperAdmin,
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
router.get('', checkAdminAuth(['general']), viewAdmin)

/**
 * @swagger
 * path:
 *  /admin/aboutme:
 *    get:
 *      summary: View admin's own profile
 *      tags: [Admins]
 *      security:
 *        - bearerAuth: []
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
router.get('/aboutme', checkAdminAuth(['general']), aboutme)

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
router.get('/:id', checkAdminAuth(['general']), viewAdminById)

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
router.post('', checkAdminAuth(['super']), createAdmin)

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
 *              firstName: James
 *              lastName: Doe
 *              email: jamesdoe@mail.com
 *              password: newpassword
 *              type: general
 *              isHead: false
 *      responses:
 *        "200":
 *          description: Update successful
 */
router.put('/:id', checkAdminAuth(['super']), updateAdmin)

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
 *        "404":
 *          description: Admin with the id provided does not exist
 */
router.delete('/:id', checkAdminAuth(['super']), deleteAdmin)

// TODO: Remove this
/**
 * @swagger
 * path:
 *  /admin/super:
 *    post:
 *      summary: Create a super admin
 *      tags: [Admins]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Admin'
 *            example:
 *              firstName: Super
 *              lastName: Admin
 *              email: admin@mail.com
 *              password: admin123
 *      responses:
 *        "200":
 *          description: Super Admin created successfully
 */
router.post('/super', createSuperAdmin)

module.exports = {
  name: 'admin',
  router,
}
