'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', { 
      user_id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate : {
          isEmail: true
        }
      },

      password: {
        type: Sequelize.STRING, 
        allowNull: true,
      },

      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      googleLogin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      totp_secret: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      totp_iv: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      is_2fa_enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },

      picture: {
        type: Sequelize.STRING,
        allowNull: true
      },

      is_email_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      country_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'countries',
          key: 'country_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      role: {
        type: Sequelize.ENUM('admin','customer','vendor'),
        allowNull: false,
        defaultValue: 'customer'
      },

      status: {
        type: Sequelize.ENUM('active', 'suspended'),
        allowNull: false,
        defaultValue: 'active'
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
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
