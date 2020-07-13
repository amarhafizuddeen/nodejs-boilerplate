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
