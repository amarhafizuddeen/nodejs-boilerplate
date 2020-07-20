/**
 * @swagger
 *  components:
 *    schemas:
 *      Admin:
 *        type: object
 *        required:
 *          - name
 *          - email
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the admin, needs to be unique.
 *          password:
 *            type: string
 *        example:
 *           name: Alexander
 *           email: fake@email.com
 *           password: supersafepassword
 */
'use strict'
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    'Admin',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      paranoid: true,
    }
  )
  Admin.associate = function (models) {
    // associations can be defined here
  }
  return Admin
}
