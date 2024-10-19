const Cliente = require('../models/clientesModels');

// Obtener todos los clientes
const getClientes = async (req, res) => {
  try {
    console.log('get clientes');
    const clientes = await Cliente.getAllClientes();
    console.log(`clientes ${clientes}`);
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los clientes', error: error.message });
  }
};

// Obtener un cliente por ID
const getCliente = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const cliente = await Cliente.getClienteById(id);
    if (!cliente) {
      return res.status(404).json({ message: `Cliente con ID ${id} no encontrado` });
    }
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el cliente', error: error.message });
  }
};

// Crear un nuevo cliente
const createCliente = async (req, res) => {
  const { nombre, apellido, domicilio, telefono, email, fecha_nacimiento, medicamentos, alergias, sensibilidad_productos, dermatitis, infeccion_ojos, dolencia_ojos, latex, fecha_ultimo_procedimiento, ultimo_procedimiento } = req.body;
  try {
    const newCliente = await Cliente.createCliente({ nombre, apellido, domicilio, telefono, email, fecha_nacimiento, medicamentos, alergias, sensibilidad_productos, dermatitis, infeccion_ojos, dolencia_ojos, latex, fecha_ultimo_procedimiento, ultimo_procedimiento });
    res.status(201).json(newCliente);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el cliente', error: error.message });
  }
};

// Actualizar un cliente existente
const updateCliente = async (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, apellido, domicilio, telefono, email, fecha_nacimiento, medicamentos, alergias, sensibilidad_productos, dermatitis, infeccion_ojos, dolencia_ojos, latex, fecha_ultimo_procedimiento, ultimo_procedimiento } = req.body;
  try {
    const existingCliente = await Cliente.getClienteById(id);
    if (!existingCliente) {
      return res.status(404).json({ message: `Cliente con ID ${id} no encontrado` });
    }
    const updatedCliente = await Cliente.updateCliente(id, { nombre, apellido, domicilio, telefono, email, fecha_nacimiento, medicamentos, alergias, sensibilidad_productos, dermatitis, infeccion_ojos, dolencia_ojos, latex, fecha_ultimo_procedimiento, ultimo_procedimiento });
    res.status(200).json(updatedCliente);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el cliente', error: error.message });
  }
};

// Eliminar un cliente
const deleteCliente = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedCliente = await Cliente.deleteCliente(id);
    if (!deletedCliente) {
      return res.status(404).json({ message: `Cliente con ID ${id} no encontrado` });
    }
    res.status(200).json({ message: 'Cliente eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el cliente', error: error.message });
  }
};


module.exports = {
  getClientes,
  getCliente,
  createCliente,
  updateCliente,
  // updateClienteByTel,
  deleteCliente,
  // deleteClienteByTel
};
