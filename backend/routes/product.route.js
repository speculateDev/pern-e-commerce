import express from 'express';
import { createProduct, getAllProducts } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', createProduct);
router.get('/:id', async (req, res) => {});

export default router;
