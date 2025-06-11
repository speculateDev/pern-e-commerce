import { sql } from '../config/db.js';
import bcrypt from 'bcryptjs';
import { generateToken, setCookies } from '../utils/helpers.js';
import validator from 'validator';

export const signup = async (req, res) => {
  let user;

  try {
    const { username, email, password } = req.body;

    // Check empty fields
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Check password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
    }

    // Check email
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Email',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user =
      await sql`INSERT INTO users (username, email, password) VALUES(${username}, ${email}, ${hashedPassword}) RETURNING *`;

    user = user[0];

    const token = generateToken(user.id);
    setCookies(res, token);

    user.password = null;

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error in signupController: ', error);
    res.status(500).json({ success: false, message: 'Internal server error' + error.message });
  }
};

export const login = async (req, res) => {
  let user;

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    user = await sql`SELECT * FROM users WHERE email = ${email}`;

    user = user[0];

    const isCorrectPass = await bcrypt.compare(password, user.password);

    if (!user || !isCorrectPass) {
      return res.status(404).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(user.id);
    setCookies(res, token);

    user.password = null;

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Error in loginController: ', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie('jwt');
    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.log('Error in logout controller: ', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getMe = (req, res) => {
  res.send({
    success: true,
    user: req.user,
  });
};
