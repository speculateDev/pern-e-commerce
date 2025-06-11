import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { sql } from '../config/db.js';

config();

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized - No token provided',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized - Invalid token',
      });
    }

    const currentUser = await sql`SELECT * FROM users WHERE id = ${decoded.id}`;
    req.user = currentUser[0];

    next();
  } catch (error) {
    console.error('Error in authMiddleware: ', error);

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized - No token provided',
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized - No token provided',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded?.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized - Invalid token',
      });
    }

    const currentUser = await sql`SELECT * FROM users WHERE id = ${decoded.id} LIMIT 1;`;

    if (currentUser[0].role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized - You must be an admin',
      });
    }

    next();
  } catch (error) {
    console.error('Error in isAdmin: ', error);
    res.status(500).json({
      success: false,
    });
  }
};
