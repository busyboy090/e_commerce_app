'use strict';

const fs = require('fs');
const path = require('path')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join('src','data','states.json');
    const states = JSON.parse(fs.readFileSync(filePath,'utf-8'));

    await queryInterface.bulkInsert('states', states, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('states', null, {});
  }
};
