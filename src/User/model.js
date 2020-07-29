const { comparePassword, hashPassword, getJWT } = require('../../helpers')
const { User } = require('../../db/models')
const Op = require('sequelize').Op

class UserClass {
  constructor({
    id = null,
    firstName = null,
    lastName = null,
    username = null,
    email = null,
    password = null,
    phoneNumber = null,
    createdAt = null,
    updatedAt = null,
    deletedAt = null,
    hash = true,
  }) {
    // Required
    this.firstName = firstName
    this.lastName = lastName
    this.username = username
    this.email = email
    this.password = !password ? null : hash ? hashPassword(password) : password

    // Optional with default values
    id ? (this.id = id) : null
    this.phoneNumber = phoneNumber
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.deletedAt = deletedAt
  }

  async save() {
    try {
      await User.create({ ...this })
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
    return await User.findAll({
      attributes: {
        exclude: ['password'],
      },
    })
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
      return
    } catch (error) {
      return error.errors
    }
  }

  static async delete(id) {
    return await User.destroy({ where: { id } })
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
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: user.password,
      phoneNumber: user.phoneNumber,
      points: user.points,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
      hash: false,
    })
    return userObj
  }
}

module.exports = UserClass
