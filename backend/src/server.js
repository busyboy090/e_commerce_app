import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';
import sequelize from "./config/db.js";
import productRoutes from './routes/product.js';
import cartRoutes from './routes/cart.js';
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
	methods: ['GET', 'POST', 'PUT', 'DELETER'],
	allowedHeaders: ['Content-type', 'Authorization']
}));
app.use(express.json());
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});