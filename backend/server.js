import express from 'express';
import helmet from 'helmet';
import { config } from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { sql } from './config/db.js';
// import { aj } from './lib/arcjet.js';

import productsRoutes from './routes/product.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan('dev'));

// Apply arcjet rate-limit to all routes
// app.use(async (req, res, next) => {
//   try {
//     console.log('request headers: ', req.headers);
//     const decision = await aj.protect(req, {
//       requested: 1, // each req consumes one token
//     });

//     console.log(decision);

//     if (decision.isDenied) {
//       if (decision.reason.isRateLimit()) {
//         res.status(429).json({
//           error: 'Too many requests',
//         });
//       } else if (decision.reason.isBot()) {
//         res.status(403).json({ error: 'Bot access denied' });
//       } else {
//         res.status(403).json({ error: 'Forbidden' });
//       }
//       return;
//     }

//     next();
//   } catch (error) {
//     console.log('Arcjet error: ', error);
//     next(error);
//   }
// });

app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);

async function initDB() {
  try {
    await sql`
        CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            image VARCHAR(255) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `;

    await sql`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            role VARCHAR(50) NOT NULL DEFAULT 'user'
        )
<<<<<<< Updated upstream
=======
        `;

    await sql`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            role VARCHAR(50) NOT NULL DEFAULT 'user',
            cartItems JSONB DEFAULT '[]'
        )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS orders (
       id SERIAL PRIMARY KEY,
       user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
       order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       total_amount DECIMAL(10, 2),
       stripe_session_id VARCHAR(255)
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS order_items(
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id),
        product_id INTEGER REFERENCES products(id),
        quantity INTEGER NOT NULL,
        unit_price DECIMAL(10, 2),
        total_price DECIMAL(10, 2)
      )
>>>>>>> Stashed changes
    `;

    console.log('DB init');
  } catch (error) {
    console.log('Error initializing db', error);
  }
}

initDB().then(() => {
  app.listen(port, () => {
    console.log(`Listenning on port ${port}`);
  });
});
