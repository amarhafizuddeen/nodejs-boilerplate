const { hashPassword } = require('../../../helpers')
const { User } = require('../../../db/models')
const Op = require('sequelize').Op

class UserClass {
  constructor({ name = null, email = null, password = null }) {
    this.name = name
    this.email = email
    this.password = password ? hashPassword(password) : null
  }

  print() {
    console.log(this.name, this.email, this.password)
  }

  static async emailExist(email, id = null) {
    const exist = await User.count({ where: { email, id: { [Op.not]: id } } })
    return !!exist
  }

  async validate() {
    if (!this.name) return false
    if (!this.email || (await this.emailExist(this.email))) return false
    if (!this.password) return false
    return true
  }

  async save() {
    try {
      if (!(await this.validate())) return { error: 'Failed to register' }
      const user = await User.create({ ...this })
      this.id = user.id
      return { message: 'Created user' }
    } catch (error) {
      console.log(error)
      return { error }
    }
  }

  static async view() {
    try {
      return await User.findAll({
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
      return await User.findByPk(id, {
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
      const user = await this.viewById(id)
      if (data.email && (await this.emailExist(data.email, id)))
        return { error: 'Email already exists' }
      await user.update(data, { where: { id } })
      return { message: 'Updated user' }
    } catch (error) {
      console.log(error)
      return { error }
    }
  }

  static async delete(id) {
    try {
      return await User.delete({ where: { id } })
    } catch (error) {
      return error
    }
  }
}

module.exports = UserClass
