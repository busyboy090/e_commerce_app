const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes/index.js');
const errorHandler = require('./middlewares/error.middleware.js');
const deleteExpiredRecords = require('../src/jobs/deleteExpiredRecords.js');
const userAgent = require('express-useragent')

deleteExpiredRecords();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
	origin: "http://localhost:5173",
    credentials: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-type', 'Authorization']
}));
app.use(userAgent.express());
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
