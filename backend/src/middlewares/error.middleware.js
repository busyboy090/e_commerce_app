const AppError = require('../utils/appError.js')

module.exports = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const isOperational = err.isOperational || false;

    const message = isOperational ? err.message : 'Something went wrong. Please try again Later.';

    console.log(err)
    res.status(statusCode).json({ error: message });
}