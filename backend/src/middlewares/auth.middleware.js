import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};