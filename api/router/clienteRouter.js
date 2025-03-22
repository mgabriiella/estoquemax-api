import express from 'express';
import {
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente
} from '../controllers/clienteController.js';

const router = express.Router();

router.route('/')
  .get(getClientes)
  .post(createCliente);

router.route('/:id')
  .get(getClienteById)
  .put(updateCliente)
  .delete(deleteCliente);

export default router;