import {DataTypes} from 'sequelize';
import sequelize from '../config/db.js';

const Cart = sequelize.define('carts', {
        cart_id: {
            type: DataTypes.INTEGER, 
            autoIncrement: true,
            primaryKey: true,
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
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: true, 
        tableName: 'carts',
    }
)

export default Cart;
