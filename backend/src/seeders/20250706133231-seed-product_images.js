'use strict';
const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join('src', 'data', 'products.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8')).products;

    const images = [];

    // Insert product images
    for (const product of data) {
      const [productDetails] = await queryInterface.sequelize.query(
        `SELECT product_id FROM products WHERE name = :name AND type_id = :type_id LIMIT 1`,
        {
          replacements: { name: product.name, type_id: product.type_id },
          type: Sequelize.QueryTypes.SELECT,
        }
      );

      if (!productDetails) continue;

      for (const image of product.productImages || []) {
        images.push({
          product_id: productDetails.product_id,
          name: image.name,
          image: image.image,
          main_image: image.main_image,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    await queryInterface.bulkInsert('product_images', images, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_images', null, {});
  }
};
