const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    static associate (models) {
      Color.hasMany(models.ProductVariant, {foreignKey: 'color_id', as: 'product_variants'})
      Color.hasMany(models.ProductImage, { foreignKey: 'color_id', as: 'colors'})
    }
  }

  Color.init(
    {
      color_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      hex_code: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      timestamps: true, 
      modelName: 'Color',
      tableName: 'colors',
      indexes: [
        {
          unique: true,
          fields: ['name']
        },
        {
          unique: true,
          fields: ['hex_code']
        }
      ]
    }
  )

  return Color;
}