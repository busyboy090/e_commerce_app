'use strict';

const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  // Read the JSON file containing the units data
    const unitsFilePath = path.join('src','data','units.json');
    const rawData = fs.readFileSync(unitsFilePath, 'utf8');

    const unitsData = JSON.parse(rawData)['units'];
    const units = unitsData.map((unit) => {
      return {
        name: unit.name,
        symbol: unit.symbol,
        code: unit.code
      };
    });
    await queryInterface.bulkInsert('units', units, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('units', null, {});
  }
};
