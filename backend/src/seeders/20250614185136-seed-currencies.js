'use strict';

const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const filePath = path.join('src', 'data', 'countries.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const countries = JSON.parse(rawData)['countries'];

    const uniqueCurrencies = new Map();

    for (const country of countries) {
      if (!uniqueCurrencies.has(country.currency)) {
        uniqueCurrencies.set(country.currency, {
          code: country.currency_code,
          name: country.currency,
          symbol: country.currency_symbol,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    await queryInterface.bulkInsert('currencies', Array.from(uniqueCurrencies.values()), {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('currencies', null, {});
  }
};