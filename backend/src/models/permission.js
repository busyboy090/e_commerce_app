const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      Permission.hasMany(models.LevelPermission, { foreignKey: 'permission_id', as: 'levels'});
      Permission.hasMany(models.UserPermission, { foreignKey: 'permission_id', as: 'user'})
    }
  }

  Permission.init(
    {
      permission_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: "Permission",
      tableName: "permissions",
      timestamps: true,
    }
  );

  return Permission;
};
