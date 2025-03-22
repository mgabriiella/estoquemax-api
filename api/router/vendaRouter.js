import express from 'express';
import {
  getVendas,
  getVendaById,
  createVenda
} from '../controllers/vendaController.js';

const router = express.Router();

router.route('/')
  .get(getVendas)
  .post(createVenda);

router.route('/:id')
  .get(getVendaById);

export default router;