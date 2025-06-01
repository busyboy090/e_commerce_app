import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const BestSellingProduct = sequelize.define("best_selling_products",{
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.UUID,
      references: {
        model: 'products',
        key: 'product_id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      allowNull: false,
      unique: true,
    }
  },
  {timestamps: true, tableName: 'best_selling_products'}
);

export default BestSellingProduct;