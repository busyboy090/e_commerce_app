'use strict';

const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join('src','data','categories.json');
    const categories = JSON.parse(fs.readFileSync(filePath,'utf-8'))['categories'];
    const sizes = [];

    for(const category of categories) {
      for(const type of category.types) {
        // check if the type exist
        const [sizeType] = await queryInterface.sequelize.query(
          `SELECT type_id FROM types WHERE name = :name LIMIT 1`,
          {
            replacements: { name: type.name },
            type: Sequelize.QueryTypes.SELECT
          }
        );

        if(!sizeType) continue;

        // check if the unit exist
        const [unit] = await queryInterface.sequelize.query(
          `SELECT unit_id FROM units WHERE code = :code LIMIT 1`,
          {
            replacements: { code: type.unit ?? '' },
            type: Sequelize.QueryTypes.SELECT
          }
        );

        // check if size region exist
        const [sizeRegion] = await queryInterface.sequelize.query(
          `SELECT size_region_id FROM size_regions WHERE code = :code LIMIT 1`,
          {
            replacements: { code: type?.region ?? '' },
            type: Sequelize.QueryTypes.SELECT
          }
        );

        for(const size of type.sizes) {
          sizes.push({
            name: size,
            type_id: sizeType.type_id,
            size_region_id: sizeRegion?.size_region_id || null,
            unit_id: unit?.unit_id || null
          })
        }
      }
    }
    await queryInterface.bulkInsert('sizes', sizes, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sizes', null, {});
  }
};
