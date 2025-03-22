import express from 'express';
import {
  getProdutos,
  getProdutoById,
  createProduto,
  updateProduto,
  deleteProduto
} from '../controllers/produtoController.js';

const router = express.Router();

router.route('/')
  .get(getProdutos)
  .post(createProduto);

router.route('/:id')
  .get(getProdutoById)
  .put(updateProduto)
  .delete(deleteProduto);

export default router;