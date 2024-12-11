// routes/ClienteRoutes.js
const express = require('express');
const router = express.Router();
const ClienteController = require('../controllers/clientesController');

// Rutas para CRUD de usuarios
router.get('/', ClienteController.getClientes);
router.get('/:id', ClienteController.getClienteTel);
// router.get('/:id', ClienteController.getClienteById);
router.post('/create', ClienteController.createCliente);
router.put('/:id', ClienteController.updateCliente);
// router.put('/:id', ClienteController.updateClienteByTel);
// router.delete('/:id', ClienteController.deleteClienteByTel);
router.delete('/:id', ClienteController.deleteCliente);

module.exports = router;