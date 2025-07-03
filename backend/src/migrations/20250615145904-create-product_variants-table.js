'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('product_variants', {
      variant_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      product_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'products',
          key: 'product_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },

      color_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references:{
          model: 'colors',
          key: 'color_id'
        },
        onDelete: 'CASCADE',
        onUpdate:'CASCADE'
      },

      image_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'product_images',
          key: 'product_image_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },

      size_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references:{
          model: 'sizes',
          key: 'size_id'
        },
        onDelete: 'CASCADE',
        onUpdate:'CASCADE'
      },

      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },

      discount_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },

      discount_percent: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: true
      },

      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      sku: {
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
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('product_variants');
  }
};
