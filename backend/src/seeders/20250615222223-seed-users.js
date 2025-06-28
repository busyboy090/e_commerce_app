'use strict';
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [];

    // 🔍 Get country by name
    const [countryResult] = await queryInterface.sequelize.query(
      `SELECT country_id FROM countries WHERE name = 'Nigeria' LIMIT 1`,
      {
        type: Sequelize.QueryTypes.SELECT
      }
    );

    const password = await bcrypt.hash('busayo12', 10);

    users.push({
      first_name: 'Busayo',
      last_name: 'Ale',
      email: 'busayojosiah@gmail.com',
      password,
      picture: faker.image.avatar(),
      is_email_verified: true,
      role: 'admin',
      country_id: countryResult.country_id,
      status: 'active'
    })

    await queryInterface.bulkInsert('users',users, {});
    await queryInterface.bulkInsert('admin_profiles',[
      {
        user_id: 1,
        created_by: 1,
        approved: true,
        approved_by: 1,
        department_id: 1,
        position_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('admin_profiles', null, {});
  }
};
