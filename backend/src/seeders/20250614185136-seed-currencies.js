'use strict';

const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const filePath = path.join('src', 'data', 'currencies.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const currencies = JSON.parse(rawData);

    await queryInterface.bulkInsert('currencies', currencies, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('currencies', null, {});
  }
};