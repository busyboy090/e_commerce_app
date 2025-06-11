import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import sequelize from "./config/db.js";
import routes from './routes/index.js';
import './models/index.js'
import './models/product/index.js'

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

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

// Middleware
app.use(cors({
	origin: "http://localhost:5173",
    credentials: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(routes);

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});