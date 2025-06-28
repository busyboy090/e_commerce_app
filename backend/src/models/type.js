const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    static associate(models) {
      // Define associations here if needed
      Type.belongsTo(models.Category, { foreignKey: 'type_id', as: 'types' });
      Type.hasMany(models.Product, { foreignKey: 'type_id', as: 'productTypes' });
      Type.hasMany(models.Size, { foreignKey: 'type_id', as: 'sizeTypes'});
    }
  }

  Type.init(
    {
      type_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false
      },

      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Type",
      tableName: "types",
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["type"]
        }
      ]
    }
  );

  return Type;
}