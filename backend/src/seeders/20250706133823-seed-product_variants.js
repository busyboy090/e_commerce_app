'use strict';

const fs = require('fs');
const path = require('path')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join('src', 'data', 'products.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8')).products;

    const productVariants = []
    // Insert product variants
    for (const product of data) {
      const [productDetails] = await queryInterface.sequelize.query(
        `SELECT product_id FROM products WHERE name = :name AND type_id = :type_id LIMIT 1`,
        {
          replacements: { name: product.name, type_id: product.type_id },
          type: Sequelize.QueryTypes.SELECT,
        }
      );

      if (!productDetails) continue;

      for (const variant of product.productVariants || []) {
        // Get image ID if exists
        const [image] = await queryInterface.sequelize.query(
          `SELECT image_id FROM product_images WHERE image = :image LIMIT 1`,
          {
            replacements: { image: variant.image },
            type: Sequelize.QueryTypes.SELECT,
          }
        );

        productVariants.push({
          product_id: productDetails.product_id,
          color_id: variant.color_id || null,
          image_id: image?.image_id || null,
          size_id: variant.size_id,
          stock: variant.stock,
          sku: variant.sku,
          discount_price: variant.discount_price,
          discount_percent: variant.discount_percent,
          price: product.price,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    await queryInterface.bulkInsert('product_variants', productVariants, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_variants', null, {});
  }
};
