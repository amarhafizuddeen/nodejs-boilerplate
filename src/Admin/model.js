const { comparePassword, hashPassword, getJWT } = require('../../helpers')
const { Admin } = require('../../db/models')
const Op = require('sequelize').Op

class AdminClass {
  constructor({ name = null, email = null, password = null, hash = true }) {
    this.name = name
    this.email = email
    this.password = !password ? null : hash ? hashPassword(password) : password
  }

  async save() {
    try {
      await Admin.create({ ...this })
      return { message: 'Created admin' }
    } catch (error) {
      console.log(error)
      return { error }
    }
  }

  async comparePassword(password) {
    return comparePassword(password, this.password)
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
    })
  }

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
      if (data.password) data.password = hashPassword(data.password)
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

  static async findById(id) {
    const admin = await Admin.findByPk(id)
    const adminObj = new AdminClass({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      password: admin.password,
      hash: false,
    })
    return adminObj
  }

  static async findByEmail(email) {
    const admin = await Admin.findOne({ where: { email }, raw: true })
    const adminObj = new AdminClass({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      password: admin.password,
      hash: false,
    })
    return adminObj
  }
}

module.exports = AdminClass
