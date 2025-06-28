const jwt = require('jsonwebtoken');
require('dotenv').config();


const refreshTokenKey = process.env.REFRESH_TOKEN_SECRET;
const accessTokenKey = process.env.ACCESS_TOKEN_SECRET;
const emailTokenKey = process.env.EMAIL_TOKEN_SECRET;

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, refreshTokenKey, {expiresIn: '7d'})
}

const generateAccessToken = (payload) => {
    return jwt.sign(payload, accessTokenKey, { expiresIn: '1d' })
}

const generateEmailToken = (payload) => {
    return jwt.sign(payload, emailTokenKey, {expiresIn: '24h'})
}

const verifyAccessToken = (token) => {
    return jwt.verify(token, accessTokenKey)
}

const verifyRefreshToken = (token) => {
    return jwt.verify(token, refreshTokenKey)
}

const verifyEmailToken = (token) => {
    return jwt.verify(token, emailTokenKey)
}


module.exports = {
    generateRefreshToken,
    generateAccessToken,
    generateEmailToken,
    verifyAccessToken,
    verifyRefreshToken,
    verifyEmailToken
}