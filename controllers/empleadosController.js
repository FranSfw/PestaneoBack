// import bcrypt from 'bcrypt';
const bcrypt = require('bcrypt');


const Empleado = require('../models/empleadosModels');

// Obtener todos los empleados
const getEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.getAllEmpleados();
    res.status(200).json(empleados);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los empleados', error: error.message });
  }
};

const LoginEmpleado = async (req, res) => {
    const { email, password } = req.body;
    const hashed_pwd = bcrypt.hash(password, 10);
    if (!email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }
    try {
      const empleado = await Empleado.loginEmployees(email, hashed_pwd);
      if (!empleado) {
        return res.status(404).json({ message: `Empleado no encontrado` });
      }

      res.status(200).json(empleado);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el empleado', error: error.message });
    }

}






// Obtener un empleado por ID
const getEmpleado = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const empleado = await Empleado.getEmpleadoById(id);
    if (!empleado) {
      return res.status(404).json({ message: `Empleado con ID ${id} no encontrado` });
    }
    res.status(200).json(empleado);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el empleado', error: error.message });
  }
};

// Crear un nuevo empleado
const createEmpleado = async (req, res) => {
  const { nombre, apellido } = req.body;
  try {
    const newEmpleado = await Empleado.createEmpleado({ nombre, apellido });
    res.status(201).json(newEmpleado);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el empleado', error: error.message });
  }
};

// Actualizar un empleado existente
const updateEmpleado = async (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, apellido } = req.body;
  try {
    const existingEmpleado = await Empleado.getEmpleadoById(id);
    if (!existingEmpleado) {
      return res.status(404).json({ message: `Empleado con ID ${id} no encontrado` });
    }
    const updatedEmpleado = await Empleado.updateEmpleado(id, { nombre, apellido });
    res.status(200).json(updatedEmpleado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el empleado', error: error.message });
  }
};

// Eliminar un empleado
const deleteEmpleado = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedEmpleado = await Empleado.deleteEmpleado(id);
    if (!deletedEmpleado) {
      return res.status(404).json({ message: `Empleado con ID ${id} no encontrado` });
    }
    res.status(200).json({ message: 'Empleado eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el empleado', error: error.message });
  }
};

module.exports = {
  getEmpleados,
  getEmpleado,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
  LoginEmpleado
};
