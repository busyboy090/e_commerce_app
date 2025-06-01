import {DataTypes} from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('users', {
        user_id: {
            type: DataTypes.INTEGER, 
            autoIncrement: true,
            primaryKey: true,
        },

        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false
        },

        password: {
            type: DataTypes.STRING, 
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email_verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        timestamps: true, 
        tableName: 'users',
        indexes: [
            {
                unique: true,
                fields: ['email']
            },
            {
                unique: true,
                fields: ['phone']
            }
        ]
    }
)

export default User;
