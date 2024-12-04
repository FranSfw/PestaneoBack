const Cita = require("../models/citasModels");

// Obtener todas las citas
const getCitas = async (req, res) => {
  try {
    const citas = await Cita.getAllCitas();
    res.status(200).json({ citas: citas });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las citas", error: error.message });
  }
};
const getOldCitas = async (req, res) => {
  try {
    const citas = await Cita.getAllOldCitas();
    res.status(200).json({ citas: citas });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener las previas citas",
        error: error.message,
      });
  }
};

// Obtener una cita por ID
const getCita = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const cita = await Cita.getCitasById(id);
    if (!cita) {
      return res
        .status(404)
        .json({ message: `Cita con ID ${id} no encontrada` });
    }
    res.status(200).json({ cita: cita });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener la cita", error: error.message });
  }
};
const getLastCita = async (req, res) => {
  const cliente = req.body;
  try {
    const cita = await Cita.getCitasHistory(cliente);
    if (!cita) {
      return res
        .status(404)
        .json({ message: `Citas para cliente ${cliente.id} no encontradas` });
    }
    res.status(200).json({ cita: cita });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener la cita", error: error.message });
  }
};
const getCitaByPhone = async (req, res) => {
  const info = req.body;
  try {
    const cita = await Cita.getCitasByTel(info);
    if (!cita) {
      return res
        .status(404)
        .json({ message: `Cita con telefono ${info.telefono} no encontrada` });
    }
    res.status(200).json({ cita: cita });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener la cita", error: error.message });
  }
};

// Crear una nueva cita
const createCita = async (req, res) => {
  const cita = req.body;
  try {
    const newCita = await Cita.createCitas(cita);
    res.status(201).json({ message: newCita });
  } catch (error) {
    if (
      error.message ===
      "El empleado o usuario ya tiene una cita programada en ese horario"
    ) {
      res.status(400).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Error al crear la cita", error: error.message });
  }
};

// Actualizar una cita existente
const updateCita = async (req, res) => {
  const id = parseInt(req.params.id);
  const cita = req.body;
  cita.id = id;
  try {
    const updatedCita = await Cita.updateCitas(cita);
    res.status(200).json({ message: updatedCita });
  } catch (error) {
    if (
      error.message ===
      "El empleado o usuario ya tiene una cita programada en ese horario"
    ) {
      res.status(400).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Error al actualizar la cita", error: error.message });
  }
};

// Eliminar una cita
const deleteCita = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedCita = await Cita.deleteCitas(id);
    res.status(200).json({ message: deletedCita });
  } catch (error) {
    if (error.message === "Cita no encontrada o ya fue eliminado.") {
      res.status(404).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Error al eliminar la cita", error: error.message });
  }
};

module.exports = {
  getCitas,
  getCita,
  createCita,
  updateCita,
  deleteCita,
  getCitaByPhone,
  getLastCita,
  getOldCitas,
};
