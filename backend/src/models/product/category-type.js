import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const CategoryType = sequelize.define("category_types",{
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'types',
        key: 'type_id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    category_id : {
      type: DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: 'categories',
        key: 'category_id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  },
  {timestamps: true, tableName: 'category_types'}
);

export default CategoryType;
