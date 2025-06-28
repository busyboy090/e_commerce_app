import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const BrandCategory = sequelize.define("brand_categories",{
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'brands',
        key: 'brand_id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'category_id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  },
  {timestamps: true, tableName: 'brand_categories'}
);

export default BrandCategory;