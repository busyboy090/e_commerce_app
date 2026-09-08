'use strict';

const fs = require('fs');
const { type } = require('os');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const filePath = path.join('src', 'data', 'products.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8')).products;

    const products = [];

    // Insert products
    for (const product of data) {
      products.push({
        name: product.name,
        description: product.description,
        category_id: product.category_id,
        brand_id: product.brand_id,
        type_id: product.type_id,
        vendor_id: product.vendor_id,
        approved_by: product.approved_by,
        is_approved: product.is_approved,
        approved_at: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('products', products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  },
};