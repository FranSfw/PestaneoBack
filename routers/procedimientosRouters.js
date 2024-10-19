const express = require('express');
const router = express.Router();
const procedimientoController = require('../controllers/procedimientosController.js');

router.get('/', procedimientoController.getProcedimientos); // Obtener todos los procedimientos
router.get('/:id', procedimientoController.getProcedimiento); // Obtener un procedimiento por ID
router.post('/', procedimientoController.createProcedimiento); // Crear un nuevo procedimiento
router.put('/:id', procedimientoController.updateProcedimiento); // Actualizar un procedimiento existente
router.delete('/:id', procedimientoController.deleteProcedimiento); // Eliminar un procedimiento

module.exports = router;
