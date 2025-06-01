import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const FlashSale = sequelize.define("flash_sales",{
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'products',
        key: 'product_id'
      },
     onUpdate: 'CASCADE',
     onDelete: 'CASCADE'
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  {timestamps: true, tableName: 'flash_sales'}
);


export default FlashSale;