const { comparePassword, hashPassword, getJWT } = require('../../helpers')
const { User } = require('../../db/models')
const Op = require('sequelize').Op

class UserClass {
  constructor({ name = null, email = null, password = null, hash = true }) {
    this.name = name
    this.email = email
    this.password = !password ? null : hash ? hashPassword(password) : password
  }

  async save() {
    try {
      await User.create({ ...this })
      return { message: 'Created user' }
    } catch (error) {
      console.log(error)
      return { error }
    }
  }

  async comparePassword(password) {
    return comparePassword(password, this.password)
  }

  static async emailExist(email, id = null) {
    const exist = await User.count({ where: { email, id: { [Op.not]: id } } })
    return !!exist
  }

  async getToken() {
    return getJWT({
      id: this.id,
      email: this.email,
      type: 'user',
    })
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
      if (data.password) data.password = hashPassword(data.password)
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

  static async find(query) {
    const user = await User.findOne({
      where: {
        [Op.or]: {
          email: query,
          id: query,
        },
      },
      raw: true,
    })
    if (!user) return null

    const userObj = new UserClass({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      hash: false,
    })
    return userObj
  }
}

module.exports = UserClass
