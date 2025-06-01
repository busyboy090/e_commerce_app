import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const Type = sequelize.define("types",{
    type_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  {
    timestamps: true, 
    tableName: 'types',
    indexes: [
      {
        unique: true,
        fields: ['type']
      },
    ]
  }
);

export default Type;
