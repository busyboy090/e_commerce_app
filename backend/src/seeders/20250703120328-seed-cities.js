'use strict';

const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join('src', 'data', 'cities.json');
    const cities = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    await queryInterface.bulkInsert('cities', cities, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cities', null, {})
  }
};
