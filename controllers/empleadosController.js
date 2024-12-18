// import bcrypt from 'bcrypt';
// const bcrypt = require('bcrypt');
const Empleado = require("../models/empleadosModels");

// Obtener todos los empleados
const getEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.getAllEmpleados();
    res.status(200).json({ empleados: empleados });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los empleados",
      error: error.message,
    });
  }
};

const LoginEmpleado = async (req, res) => {
  const { email, password } = req.body;
  // const hashed_pwd = bcrypt.hash(password, 10);
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios." });
  }
  try {
    const empleado = await Empleado.loginEmployees(email, hashed_pwd);
    if (!empleado.success) {
      return res
        .status(404)
        .json({ message: `Contraseña o correo incorrectos` });
    }

    res.status(200).json({ empleado: empleado });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el empleado", error: error.message });
  }
};

// Obtener un empleado por ID
const getEmpleado = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const empleado = await Empleado.getEmpleadoById(id);
    if (!empleado) {
      return res
        .status(404)
        .json({ message: `Empleado con ID ${id} no encontrado` });
    }
    res.status(200).json(empleado);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el empleado", error: error.message });
  }
};

// Crear un nuevo empleado
const createEmpleado = async (req, res) => {
  const empleado = req.body;
  try {
    const newEmpleado = await Empleado.createEmpleado(empleado);
    res.status(201).json({ empleado: newEmpleado });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el empleado", error: error.message });
  }
};

// Actualizar un empleado existente
const updateEmpleado = async (req, res) => {
  const id = parseInt(req.params.id);
  const empleado = req.body;
  empleado.id = id;
  try {
    const updatedEmpleado = await Empleado.updateEmpleado(empleado);
    if (updatedEmpleado.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: `Empleado con ID ${id} no encontrado` });
    }
    res.status(200).json(updatedEmpleado);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el empleado",
      error: error.message,
    });
  }
};

// Eliminar un empleado
const deleteEmpleado = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedEmpleado = await Empleado.deleteEmpleado(id);
    res.status(200).json({ message: deletedEmpleado });
  } catch (error) {
    if (error.message === `Empleado con ID ${id} no encontrado`) {
      return res.status(404).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Error al eliminar el empleado", error: error.message });
  }
};

module.exports = {
  getEmpleados,
  getEmpleado,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
  LoginEmpleado,
};
