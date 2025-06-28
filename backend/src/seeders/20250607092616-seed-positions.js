'use strict';

const fs = require('fs');
const path = require('path');
const { permission } = require('process');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join('src', 'data','positions.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const positions = JSON.parse(rawData)['positions']
    const insertData = [];
    const levelPermissions = [];

    for(const position of positions) {
      const [department] = await queryInterface.sequelize.query(
        `SELECT department_id FROM departments WHERE name = :name LIMIT 1`,
        {
          replacements: { name: position.department },
          type: Sequelize.QueryTypes.SELECT
        }
      );

      const [level] = await queryInterface.sequelize.query(
        `SELECT level_id FROM levels WHERE code = :code LIMIT 1`,
        {
          replacements: { code: position.level },
          type: Sequelize.QueryTypes.SELECT
        }
      );

      insertData.push({
        title: position.title,
        department_id: department.department_id,
        description: position.description,
        level_id: level.level_id,
        createdAt: new Date(),
        updatedAt: new Date()
      })

      for(const permission of position.permissions) {
        const [permissionResult] = await queryInterface.sequelize.query(
          `SELECT permission_id FROM permissions WHERE name = :name LIMIT 1`,
          {
            replacements: { name: permission },
            type: Sequelize.QueryTypes.SELECT
          }
        );

        if(!permissionResult) continue

        levelPermissions.push({
          level_id: level.level_id,
          permission_id: permissionResult.permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }
    await queryInterface.bulkInsert('positions', insertData, {});
    await queryInterface.bulkInsert('level_permissions', levelPermissions, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('positions', null, {});
    await queryInterface.bulkInsert('level_permissions', null, {});
  }
};
