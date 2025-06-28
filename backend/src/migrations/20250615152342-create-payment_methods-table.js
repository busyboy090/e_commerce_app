'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('payment_methods', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      name: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },

      country_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        refrences: {
          model: 'countries',
          key: 'country_id'
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      bank_name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      account_number: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      account_name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('payment_methods');
  }
};
