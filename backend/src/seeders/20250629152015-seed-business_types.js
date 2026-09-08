'use strict';

const fs = require('fs');
const path =  require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join('src', 'data','business_types.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const businessTypes = JSON.parse(rawData)['business_types'].map((type) => {
      return {
        name: type.name,
        description: type.description,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
    await queryInterface.bulkInsert('business_types',businessTypes, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('business_types', null, {});
  }
};
