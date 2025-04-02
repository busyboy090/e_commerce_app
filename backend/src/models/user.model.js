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
        otp: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        email_verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {timestamps: true}
)

// sync with the database
const syncDatabase = async () => {
    try {
        await sequelize.sync();
        console.log('Database & tables created!');
    } catch (err) {
        console.error('Error syncing database:', err)
    }
}

syncDatabase()

export default User;
