import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const Brand = sequelize.define("brands",{
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
    timestamps: true, 
    tableName: 'brands',
    indexes: [
      {
        unique: true,
        fields: ['name']
      },
    ]
  }
);

export default Brand;
