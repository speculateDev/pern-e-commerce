import { sql } from '../config/db.js';

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(403).json({
        message: 'Please log in',
      });
    }

    if (!productId) {
      return res.status(400).json({
        message: 'Invalid input',
      });
    }

    let cartItems = user.cartitems;
    const existingItem = cartItems.find((item) => item.productId === productId);

    if (existingItem) {
      existingItem.quantity = Number(existingItem.quantity) + 1;
    } else
      cartItems.push({
        productId,
        quantity: 1,
      });

    let updatedUser = await sql`
      UPDATE users
      SET cartitems = ${JSON.stringify(cartItems)}
      WHERE id = ${user.id} RETURNING *;
    `;

    updatedUser[0].password = null;

    res.status(200).json(updatedUser[0].cartitems);
  } catch (error) {
    console.error('Error in addToCart: ', error);
    res.status(500).json({
      message: 'Server errors',
      error: error.message,
    });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(403).json({
        message: 'Please log in',
      });
    }

    let cartItems = user.cartitems;
    const existingItem = cartItems.find((item) => item.productId === +productId);

    if (existingItem) {
      if (+quantity === 0) {
        cartItems = cartItems.filter((item) => item.productId !== productId);

        const updatedUser = await sql`
      UPDATE users
      SET cartitems = ${JSON.stringify(cartItems)}
      WHERE id = ${user.id} RETURNING *;
    `;

        return res.json(updatedUser[0].cartitems);
      }

      existingItem.quantity = +quantity;
      const updatedUser = await sql`
        UPDATE users
        SET cartitems = ${JSON.stringify(cartItems)}
        WHERE id = ${user.id} RETURNING *;
      `;

      updatedUser[0].password = null;
      res.json(updatedUser[0].cartitems);
    } else {
      res.status(404).json({
        message: 'Product not found',
      });
    }
  } catch (error) {
    console.error('Error in updateQuantity: ', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};
