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

export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const products = JSON.parse(session.metadata.products);

    const response = await createOrder(
      products,
      session.metadata.userId,
      sessionId,
      session.amount_total
    );

    res.status(200).json(response);
  } catch (error) {
    console.error('Error in createOrder: ', error);
    res.status(500).json({
      message: 'Error processing successful checkout',
      error: error.message,
    });
  }
};

const createOrder = async (products, userId, sessionId, totalAmount) => {
  try {
    const orderId = await sql`
        INSERT INTO orders (user_id, total_amount, stripe_session_id)
        VALUES (${userId}, ${totalAmount}, ${sessionId})
        RETURNING id
    `;

    products.forEach(async (product) => {
      await sql`
        INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price)
        VALUES (${orderId[0].id}, ${product.id}, ${product.quantity}, ${product.price}, ${
        product.price * product.quantity
      })
      `;
    });

    return {
      message: 'Payment successful, order created.',
      orderId: orderId[0],
    };
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  }
};
