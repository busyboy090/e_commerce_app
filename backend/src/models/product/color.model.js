import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const Color = sequelize.define("colors",{
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
      allowNull: true,
    }
  },
  {
    timestamps: true, 
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
);


export default Color;