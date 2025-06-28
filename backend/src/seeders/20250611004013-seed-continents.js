'use strict';

const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join('src', 'data','continents.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const continents = JSON.parse(rawData)['continents'];
    await queryInterface.bulkInsert('continents', continents, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('continents', null, {});
  }
};
