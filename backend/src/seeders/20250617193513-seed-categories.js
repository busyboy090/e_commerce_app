'use strict';

const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join('src','data','categories.json');

    const rawData = fs.readFileSync(filePath);
    const data = JSON.parse(rawData)['categories'];

    const categories = data.map((category) => {
      return {
        name: category.name,
        description: category.description,
        image: category.image
      }
    });
  
    await queryInterface.bulkInsert('categories', categories, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
