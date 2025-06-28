'use strict';

const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const filePath = path.join('src', 'data','countries_regions_continents.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const countries = JSON.parse(rawData)['countries_regions_continents'];
    
    const regions = []
    
    for(const country of countries) {
      const [continentResult] = await queryInterface.sequelize.query(
        `SELECT continent_id FROM continents WHERE name = :name LIMIT 1`,
        {
          replacements: { name: country.continent.name },
          type: Sequelize.QueryTypes.SELECT
        }
      );

      if(!continentResult) continue;
      
      const regionExisting = regions.find(r => r.name === country.region.name)

      if(!regionExisting) {
        regions.push({
          name: country.region.name,
          code: country.region.code,
          continent_id: continentResult.continent_id,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
    }
    await queryInterface.bulkInsert('regions', regions, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('regions', null, {});
  }
};