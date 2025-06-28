'use strict';

const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join('src', 'data', 'types.json');
    const rawData = fs.readFileSync(filePath);

    const data = JSON.parse(rawData)['types'];

    const types = [];

    for(const type of data) {
      const [category] = await queryInterface.sequelize.query(
        `SELECT category_id FROM categories WHERE name = :name LIMIT 1`,
        {
          replacements: { name: type.category },
          type: Sequelize.QueryTypes.SELECT
        }
      );

      if(!category) continue;
      
      types.push({
        category_id: category.category_id,
        name: type.type,
        description: type.type_description,
      })
    };

    await queryInterface.bulkInsert('types', types, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('types', null, {});
  }
};
