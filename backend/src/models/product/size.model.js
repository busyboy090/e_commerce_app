import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const Size = sequelize.define("sizes",{
    size_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false,
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
    }
  },
  {
    timestamps: true, 
    tableName: 'sizes',
    indexes: [
      {
        unique: true,
        fields: ['size']
      },
    ]
  }
);

export default Size;
