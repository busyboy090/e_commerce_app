import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const ProductSize = sequelize.define("product_sizes",{
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    size_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'sizes',
            key: 'size_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    product_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'products',
            key: 'product_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
  },
  {timestamps: true, tableName: 'product_sizes'}
);

export default ProductSize;
