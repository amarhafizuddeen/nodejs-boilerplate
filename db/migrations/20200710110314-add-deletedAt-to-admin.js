'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Admins', 'deletedAt', {
      type: Sequelize.DATE,
      defaultValue: null,
      after: 'updatedAt',
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Admins', 'deletedAt')
  },
}
