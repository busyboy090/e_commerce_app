// 'use strict';
const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const colors = [];
    for(let i = 0; i <=30; i++) {
      const name = faker.color.human()
      const hex_code = faker.color.rgb({ format: 'hex', casing: 'lower'})

      // check if the color exist already
      const [color] = await queryInterface.sequelize.query(
        `SELECT color_id FROM colors WHERE name = :name OR hex_code = :hex_code LIMIT 1`,
        {
          replacements: { name, hex_code },
          type: Sequelize.QueryTypes.SELECT
        }
      );


      // create if it does not exist
      if(color) continue;

      colors.push({
        name,
        hex_code,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    await queryInterface.bulkInsert('colors',colors, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('colors', null, {});
  }
};
