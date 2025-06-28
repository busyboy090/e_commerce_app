const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    static associate(models) {
      // Define associations here if needed
      Brand.hasMany(models.Product, {
        foreignKey: "brand_id",
        as: "products",
      });
    }
  }
  
  Brand.init(
    {
      brand_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "Brand",
      tableName: "brands",
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["name"]
        }
      ]
    }
  );
  
  return Brand;
}