import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config({ path: '../../.env' });

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

export const setCookies = (res, token) => {
  res.cookie('jwt', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: true,
    secure: process.env.NODE_ENV === 'production',
  });
};
