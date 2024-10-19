const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadosController.js');

router.get('/', empleadoController.getEmpleados); // Obtener todos los empleados
router.get('/:id', empleadoController.getEmpleado); // Obtener un empleado por ID
router.post('/', empleadoController.createEmpleado); // Crear un nuevo empleado
router.post('/login', empleadoController.LoginEmpleado); // Crear un nuevo empleado
router.put('/:id', empleadoController.updateEmpleado); // Actualizar un empleado existente
router.delete('/:id', empleadoController.deleteEmpleado); // Eliminar un empleado
router.post('/login', empleadoController.LoginEmpleado); // Login de empleado

module.exports = router;
