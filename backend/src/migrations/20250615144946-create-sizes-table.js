'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sizes', {
      size_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'types',
          key: 'type_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },

      size_region_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'size_regions',
          key: 'size_region_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },

      unit_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'units',
          key: 'unit_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('sizes');
  }
};
