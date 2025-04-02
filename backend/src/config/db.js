import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.MYSQL_DB,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        logging: false, // Disable logging queries in the console
    }
);

try {
    await sequelize.authenticate();
    console.log('Mysql Connected');
} catch (err) {
    console.error('Mysql Connection Error:', err);
}

export default sequelize;