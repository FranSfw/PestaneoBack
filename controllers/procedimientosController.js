const Procedimiento = require("../models/procedimientosModels");

// Obtener todos los procedimientos
const getProcedimientos = async (req, res) => {
  try {
    const procedimientos = await Procedimiento.getAllProcedimientos();
    res.status(200).json({ procedimientos: procedimientos });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los procedimientos",
      error: error.message,
    });
  }
};

// Obtener un procedimiento por ID
const getProcedimiento = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const procedimiento = await Procedimiento.getProcedimientoById(id);
    if (!procedimiento) {
      return res
        .status(404)
        .json({ message: `Procedimiento con ID ${id} no encontrado` });
    }
    res.status(200).json({ procedimiento: procedimiento });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el procedimiento",
      error: error.message,
    });
  }
};

// Crear un nuevo procedimiento
const createProcedimiento = async (req, res) => {
  const procedimiento = req.body;
  try {
    const newProcedimiento = await Procedimiento.createProcedimiento(
      procedimiento
    );
    res.status(201).json({ message: newProcedimiento });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el procedimiento",
      error: error.message,
    });
  }
};

// Actualizar un procedimiento existente
const updateProcedimiento = async (req, res) => {
  const id = parseInt(req.params.id);
  const procedimiento = req.body;
  procedimiento.id = id;
  try {
    const updatedProcedimiento = await Procedimiento.updateProcedimiento(
      procedimiento
    );
    res.status(200).json({ updatedProcedimiento: updatedProcedimiento });
  } catch (error) {
    if (error.message.contains("Faltan")) {
      res.status(400).json({
        message: error.message,
      });
    }
    if (
      error.message ===
      "No se encontró ningún procedimiento con el ID proporcionado."
    ) {
      res.status(404).json({ message: error.message });
    }
    res.status(500).json({
      message: "Error al actualizar el procedimiento",
      error: error.message,
    });
  }
};

// Eliminar un procedimiento
const deleteProcedimiento = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedProcedimiento = await Procedimiento.deleteProcedimiento(id);
    res.status(200).json({ message: deletedProcedimiento });
  } catch (error) {
    if (error.message === "Procedimiento no encontrado o ya fue eliminado.") {
      res.status(404).json({ message: error.message });
    }
    res.status(500).json({
      message: "Error al eliminar el procedimiento",
      error: error.message,
    });
  }
};

module.exports = {
  getProcedimientos,
  getProcedimiento,
  createProcedimiento,
  updateProcedimiento,
  deleteProcedimiento,
};
