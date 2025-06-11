import express from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from '../controllers/product.controller.js';
import { isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', isAdmin, createProduct);
router.get('/:id', getProduct);
router.put('/:id', isAdmin, updateProduct);
router.delete('/:id', isAdmin, deleteProduct);

export default router;
