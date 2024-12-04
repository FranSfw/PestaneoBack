const express = require("express");
const router = express.Router();
const citasController = require("../controllers/citasController.js");

// Obtener todas las citas
router.get("/", citasController.getCitas);
router.get("/old", citasController.getOldCitas);

// Obtener una cita por ID
router.get("/:id", citasController.getCita);

// Crear una nueva cita
router.post("/", citasController.createCita);
router.post("/last", citasController.getLastCita);

// Actualizar una cita existente
router.put("/:id", citasController.updateCita);

// Eliminar una cita
router.delete("/:id", citasController.deleteCita);

module.exports = router;
