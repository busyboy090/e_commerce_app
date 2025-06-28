import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const Category = sequelize.define("categories",{
    category_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, 
    tableName: 'categories',
    indexes: [
      {
        unique: true,
        fields: ['name']
      },
    ]
  }
);

export default Category;