'use strict';

const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const filePath = path.join('src', 'data','sub-regions.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const sub_regions = JSON.parse(rawData);
    
    await queryInterface.bulkInsert('sub_regions', sub_regions, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sub_regions', null, {});
  }
};