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

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await sql`SELECT * FROM products WHERE id = ${id}`;

    res.status(200).json({
      success: true,
      data: product[0],
    });
  } catch (error) {
    console.error('Error in getProduct: ', error);
    res.status(500).json({ success: false, message: 'Internal server error' + error.message });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, image, category } = req.body;

  if (!name || !price || !image || !category) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const newProduct =
      await sql`INSERT INTO products (name, price, image, category) VALUES(${name}, ${price}, ${image}, ${
        category.charAt(0).toUpperCase() + category.slice(1)
      }) RETURNING *`;

    return res.status(200).json({
      success: true,
      data: newProduct[0],
    });
  } catch (error) {
    console.error('Error in createProduct: ', error);
    res.status(500).json({ success: false, message: 'Internal server error' + error.message });
  }
};
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image, category } = req.body;
  try {
    const updatedProduct =
      await sql`UPDATE products SET name = ${name}, price = ${price}, image = ${image}, category = ${
        category.charAt(0).toUpperCase() + category.slice(1)
      } WHERE id = ${id} RETURNING *;`;

    if (updatedProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({ success: true, data: updatedProduct[0] });
  } catch (error) {
    console.error('Error in updateProduct: ', error);
    res.status(500).json({ success: false, message: 'Internal server error' + error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await sql`DELETE FROM products WHERE id = ${id} RETURNING *;`;

    if (deletedProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      data: deletedProduct[0],
    });
  } catch (error) {
    console.error('Error in deleteProduct: ', error);
    res.status(500).json({ success: false, message: 'Internal server error' + error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const featured = await sql`
      SELECT * FROM products 
      ORDER BY RANDOM()
      LIMIT 6
      `;

    if (!featured) {
      return res.status(404).json({
        message: 'No featured product found',
      });
    }

    res.status(200).json(featured);
  } catch (error) {
    console.error('Error in getFeaturedProducts: ', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};
