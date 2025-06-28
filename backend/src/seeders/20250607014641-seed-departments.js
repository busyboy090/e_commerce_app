'use strict';

const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join('src', 'data','departments.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const departments = JSON.parse(rawData)['departments'];
    await queryInterface.bulkInsert('departments', departments, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('departments', null, {});
  }
};
