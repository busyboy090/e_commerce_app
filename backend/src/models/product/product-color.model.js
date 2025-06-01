import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const ProductColor = sequelize.define("product_colors",{
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
    color_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'colors',
        key: 'color_id'
      },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {timestamps: true, tableName: 'product_colors'}
);


export default ProductColor;