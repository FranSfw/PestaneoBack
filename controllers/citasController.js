const Cita = require('../models/citasModels');

// Obtener todas las citas
const getCitas = async (req, res) => {
  try {
    const citas = await Cita.getAllCitas();
    res.status(200).json({ citas: citas });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las citas', error: error.message });
  }
};

// Obtener una cita por ID
const getCita = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const cita = await Cita.getCitasById(id);
    if (!cita) {
      return res.status(404).json({ message: `Cita con ID ${id} no encontrada` });
    }
    res.status(200).json(cita);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la cita', error: error.message });
  }
};

// Crear una nueva cita
const createCita = async (req, res) => {
  const { fecha, hora, cliente_id, procedimiento_id, empleado_id } = req.body;
  try {
    const newCita = await Cita.createCitas({ fecha, hora, cliente_id, procedimiento_id, empleado_id });
    res.status(201).json(newCita);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la cita', error: error.message });
  }
};

// Actualizar una cita existente
const updateCita = async (req, res) => {
  const id = parseInt(req.params.id);
  const { fecha, hora, cliente_id, procedimiento_id, empleado_id } = req.body;
  try {
    const existingCita = await Cita.getCitaById(id);
    if (!existingCita) {
      return res.status(404).json({ message: `Cita con ID ${id} no encontrada` });
    }
    const updatedCita = await Cita.updateCita(id, { fecha, hora, cliente_id, procedimiento_id, empleado_id });
    res.status(200).json(updatedCita);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la cita', error: error.message });
  }
};

// Eliminar una cita
const deleteCita = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedCita = await Cita.deleteCita(id);
    if (!deletedCita) {
      return res.status(404).json({ message: `Cita con ID ${id} no encontrada` });
    }
    res.status(200).json({ message: 'Cita eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la cita', error: error.message });
  }
};

module.exports = {
  getCitas,
  getCita,
  createCita,
  updateCita,
  deleteCita,
};
