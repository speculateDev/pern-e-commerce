import express from 'express';
import helmet from 'helmet';
import { config } from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

import productsRoutes from './routes/product.route.js';
import { sql } from './config/db.js';

config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api/products', productsRoutes);

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
  } catch (error) {
    console.log('Error initializing db', error);
  }
}

app.listen(port, () => {
  console.log(`Listenning on port ${port}`);
});
