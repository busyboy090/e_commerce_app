'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('countries', {
      country_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      currency_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'currencies',
          key: 'currency_id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },

      sub_region_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'sub_regions',
          key: 'sub_region_id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },

      phone_code: {
        type: Sequelize.STRING,
        allowNull: false,
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
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('countries');
  }
};
