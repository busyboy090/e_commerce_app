'use strict';

const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join('src', 'data','regions.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const regions = JSON.parse(rawData);
    await queryInterface.bulkInsert('regions', regions, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('regions', null, {});
  }
};
