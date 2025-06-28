import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Otp = sequelize.define("otps",{
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    otp_secret_key: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    timestamps: true, 
    tableName: 'otps',
    indexes: [
      {
        unique: true,
        fields: ['user_id']
      },
    ]
  }
);


export default Otp;
