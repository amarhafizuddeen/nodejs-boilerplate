const { comparePassword, hashPassword, getJWT } = require('../../helpers')
const { Admin } = require('../../db/models')
const Op = require('sequelize').Op

class AdminClass {
  constructor({
    id = null,
    firstName = null,
    lastName = null,
    email = null,
    password = null,
    isActive = true,
    type = 'general',
    isHead = false,
    createdAt = null,
    updatedAt = null,
    deletedAt = null,
    hash = true,
  }) {
    // Required
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.password = !password ? null : hash ? hashPassword(password) : password

    // Optional with default values
    id ? (this.id = id) : null
    this.isActive = isActive
    this.type = type
    this.isHead = isHead
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.deletedAt = deletedAt
  }

  async save() {
    try {
      await Admin.create({ ...this })
      return
    } catch (error) {
      return error.errors
    }
  }

  async comparePassword(password) {
    return comparePassword(password, this.password)
  }

  hidePassword() {
    delete this.password
  }

  static async emailExist(email, id = null) {
    const exist = await Admin.count({ where: { email, id: { [Op.not]: id } } })
    return !!exist
  }

  async getToken() {
    return getJWT({
      id: this.id,
      email: this.email,
      type: 'admin',
      role: this.type,
    })
  }

  static async view() {
    return await Admin.findAll({
      where: {
        type: {
          [Op.not]: 'super',
        },
      },
      attributes: {
        exclude: ['password'],
      },
    })
  }

  static async viewById(id) {
    try {
      return await Admin.findByPk(id, {
        attributes: {
          exclude: ['password'],
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  static async update(id, data) {
    try {
      const admin = await this.viewById(id)
      if (data.password) data.password = hashPassword(data.password)
      await admin.update(data, { where: { id } })
      return
    } catch (error) {
      return error.errors
    }
  }

  static async delete(id) {
    return await Admin.destroy({
      where: {
        id,
        type: {
          [Op.not]: 'super',
        },
      },
    })
  }

  static async find(query) {
    const admin = await Admin.findOne({
      where: {
        [Op.or]: {
          email: query,
          id: query,
        },
      },
      raw: true,
    })
    if (!admin) return null

    const adminObj = new AdminClass({
      id: admin.id,
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      password: admin.password,
      isActive: admin.isActive,
      type: admin.type,
      isHead: admin.isHead,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
      deletedAt: admin.deletedAt,
      hash: false,
    })
    return adminObj
  }
}

module.exports = AdminClass
