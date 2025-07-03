'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_devices', {
      device_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },

      user_id: {
        type:  Sequelize.INTEGER,
        allowNull: false,
        references: {
          model:  'users',
          key: 'user_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },

      device_type: {
        type: Sequelize.ENUM('mobile','desktop'),
        allowNull: false
      },

      os: {
        type: Sequelize.STRING(50),
        allowNull: false
      },

      browser: {
        type: Sequelize.STRING(50),
        allowNull: false
      },

      user_agent: {
        type: Sequelize.STRING,
        allowNull: false
      },

      ip_address: {
        type: Sequelize.STRING,
        allowNull: false
      },

      location: {
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
    await queryInterface.dropTable('user_devices');
  }
};
