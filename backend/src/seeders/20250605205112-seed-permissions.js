'use strict';
const fs = require('fs');
const path = require('path');
const { permission } = require('process');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join('src', 'data','permissions.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(rawData)['permissions'];

    const permissions = data.map((permission) => {
      return {
        name: permission.name,
        description: permission.description,
      }
    })

    await queryInterface.bulkInsert('permissions',permissions, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permissions', null, {});
  }
};
