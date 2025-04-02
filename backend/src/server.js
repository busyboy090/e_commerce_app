import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});