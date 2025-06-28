'use strict';
const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const brands = [];

    for(let i = 0; i <= 10; i++) {
      const name = faker.company.name();

      brands.push({
        name
      })
    }
    await queryInterface.bulkInsert('brands',brands, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('brands', null, {});
  }
};
