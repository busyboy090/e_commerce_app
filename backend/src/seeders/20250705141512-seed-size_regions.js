'use strict';

const fs = require('fs');
const path =  require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join('src','data','size-regions.json');
    const regions = JSON.parse(fs.readFileSync(filePath, 'utf-8'))['size_regions'];
    await queryInterface.bulkInsert('size_regions',regions, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('size_regions', null, {});
  }
};
