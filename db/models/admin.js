/**
 * @swagger
 *  components:
 *    schemas:
 *      Admin:
 *        type: object
 *        required:
 *          - firstName
 *          - lastName
 *          - email
 *          - password
 *        properties:
 *          firstName:
 *            type: string
 *          lastName:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the admin, needs to be unique.
 *          password:
 *            type: string
 *          type:
 *            type: string
 *            description: The admin type (finance, sales or general(default))
 *          isHead:
 *            type: boolean
 *            description: Is the admin the head of sales or finance? Default to false
 *        example:
 *           firstName: John
 *           lastName: Smith
 *           email: johnsmith@email.com
 *           password: supersafepassword
 *           type: finance
 *           isHead: true
 */
'use strict'
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    'Admin',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      type: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'general',
      },
      isHead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
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
