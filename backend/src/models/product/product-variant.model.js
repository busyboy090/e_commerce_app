import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const ProductVariant = sequelize.define("product_variants",{
    variant_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
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
      allowNull: false,
      references:{
        model: 'colors',
        key: 'color_id'
      },
      onDelete: 'CASCADE',
      onUpdate:'CASCADE'
    },
    size_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'sizes',
        key: 'size_id'
      },
      onDelete: 'CASCADE',
      onUpdate:'CASCADE'
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {timestamps: true, tableName: 'product-variants'}
);

export default ProductVariant;