import { sql } from '../config/db.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await sql`SELECT * from products ORDER BY created_at DESC`;

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Error in getAllProducts: ', error);
    res.status(500).json({ success: false, message: 'Internal server error' + error.message });
  }
};

export const getProduct = async (req, res) => {};

export const createProduct = async (req, res) => {};
export const updateProduct = async (req, res) => {};
