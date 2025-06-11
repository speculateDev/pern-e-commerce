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
