'use strict';

const fs = require('fs');
const path =  require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join('src', 'data','levels.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const levels = JSON.parse(rawData)['levels'];
    await queryInterface.bulkInsert('levels', levels, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('levels', null, {});
  }
};
