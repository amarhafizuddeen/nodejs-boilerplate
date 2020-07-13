const { comparePassword, hashPassword } = require('../../../helpers')
// const { Admin } = require('../../../db/models')
// const Op = require('sequelize').Op

class AdminClass {
  constructor(name = null, email = null, password = null) {
    if (typeof name === 'string') {
      this.name = name
      this.email = email
      this.password = password ? hashPassword(password) : null
    } else {
      Object.keys(name).forEach((key) => {
        this[key] = name[key]
      })
    }
  }

  static async emailExist(email, id = null) {
    const exist = await Admin.count({ where: { email, id: { [Op.not]: id } } })
    return !!exist
  }

  async validate() {
    if (!this.name) return false
    if (!this.email) return false
    if (!this.password) return false
    return true
  }

  async save() {
    try {
      if (!(await this.validate())) return { error: 'Failed to register' }
      if (await this.emailExist(this.email))
        return { error: 'Email is not available' }
      await Admin.create({ ...this })
      return { message: 'Created admin' }
    } catch (error) {
      console.log(error)
      return { error }
    }
  }

  static async findById(id) {}

  static async view() {
    try {
      return await Admin.findAll({
        attributes: {
          exclude: ['password'],
        },
      })
    } catch (error) {
      console.log(error)
    }
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
      if (data.email && (await this.emailExist(data.email, id)))
        return { error: 'Email already exists' }
      await admin.update(data, { where: { id } })
      return { message: 'Updated admin' }
    } catch (error) {
      console.log(error)
      return { error }
    }
  }

  static async delete(id) {
    try {
      return await Admin.delete({ where: { id } })
    } catch (error) {
      return error
    }
  }
}

const admin = new AdminClass()

// module.exports = AdminClass
