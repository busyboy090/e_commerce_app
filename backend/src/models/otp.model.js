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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {timestamps: true, tableName: 'otps'}
);

console.log(Otp)

export default Otp;
