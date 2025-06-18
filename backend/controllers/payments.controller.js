import { sql } from '../config/db.js';
import { stripe } from '../lib/stripe.js';

export const createCheckoutSession = async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        message: 'Invalid products data',
      });
    }

    let totalAmount = 0;

    const lineItems = products.map((product) => {
      const amount = Math.round(product.price * 100); // cents
      totalAmount += amount * product.quantity;

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            ...(product.image && { images: [product.image] }),
          },
          unit_amount: amount,
        },
        quantity: product.quantity || 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/purchase-success`,
      cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
      metadata: {
        userId: req.user.id.toString(),
        products: JSON.stringify(
          products.map((p) => ({
            id: p.id,
            quantity: p.quantity,
            price: p.price,
          }))
        ),
      },
    });

    res.status(200).json({
      id: session.id,
      totalAmount: totalAmount / 100,
    });
  } catch (error) {
    console.error('Error in createCheckoutSession: ', error.message);
    res.status(500).json({
      message: 'error processing checkout',
      error: error.message,
    });
  }
};
