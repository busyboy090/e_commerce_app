const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductVariant extends Model {
    static associate(models) {
      // Define associations here if needed
      ProductVariant.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
      ProductVariant.belongsTo(models.Color, { foreignKey: 'color_id', as: 'color' });
      ProductVariant.belongsTo(models.Size, { foreignKey: 'size_id', as: 'size' });
    }
  }

  ProductVariant.init(
    {
      variant_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },

      product_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'products',
          key: 'product_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },

      color_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references:{
          model: 'colors',
          key: 'color_id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },

      size_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references:{
          model: 'sizes',
          key: 'size_id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },

      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },

      discount_percent: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
      },

      discount_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
      },

      stock: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      sku: {
        type: DataTypes.STRING,
        allowNull: false
      },

      image: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: "ProductVariant",
      tableName: "product_variants",
      timestamps: true
    }
  );

  return ProductVariant;
};