'use strict';
const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const countriesPath = path.join('src', 'data', 'countries.json');
    const regionsPath = path.join('src', 'data', 'countries_with_regions.json');

    const countriesData = JSON.parse(fs.readFileSync(countriesPath, 'utf-8')).countries;
    const regionsData = JSON.parse(fs.readFileSync(regionsPath, 'utf-8')).country_regions;

    const insertData = [];

    for (const country of countriesData) {
      // 🔍 Get currency by code (safer than name)
      const [currencyResult] = await queryInterface.sequelize.query(
        `SELECT currency_id FROM currencies WHERE code = :code LIMIT 1`,
        {
          replacements: { code: country.currency_code },
          type: Sequelize.QueryTypes.SELECT
        }
      );

      if (!currencyResult) continue;

      // 🔍 Get region for country
      const regionMatch = regionsData.find((r) => r.name === country.name);
      if (!regionMatch || !regionMatch.region) continue;

      const [regionResult] = await queryInterface.sequelize.query(
        `SELECT region_id FROM regions WHERE name = :name LIMIT 1`,
        {
          replacements: { name: regionMatch.region },
          type: Sequelize.QueryTypes.SELECT
        }
      );

      if (!regionResult) continue;

      // 🔍 Check if country already exists
      const countyResult = await queryInterface.sequelize.query(
        `SELECT country_id FROM countries WHERE name = :name LIMIT 1`,
        {
          replacements: { name: country.name },
          type: Sequelize.QueryTypes.SELECT
        }
      );

      if (countyResult.length > 0) continue;

      //Push new country
      insertData.push({
        name: country.name,
        code: country.code,
        currency_id: currencyResult.currency_id,
        region_id: regionResult.region_id,
        phone_code: country.phone_code,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    if (insertData.length > 0) {
      await queryInterface.bulkInsert('countries', insertData, {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('countries', null, {});
  }
};