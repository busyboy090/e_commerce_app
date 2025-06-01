import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const Product = sequelize.define("products",{
    product_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories',
        key: 'category_id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      allowNull: false,
    },
    brand_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'brands',
        key: 'brand_id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      allowNull: false,
    },
    type_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'types',
        key: 'type_id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      allowNull: false,
    }
  },
  {
    timestamps: true, 
    tableName: 'products',
    indexes: [
      {
        unique: true,
        fields: ['name']
      }
    ] 
  }
);

export default Product;
