import {DataTypes} from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('users', {
        id: {
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
            unique: true,
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
    }, {timestamps: true, tableName: 'users'}
)

export default User;
