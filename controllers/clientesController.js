const Cliente = require("../models/clientesModels");

// Obtener todos los clientes
const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.getAllClientes();
    res.status(200).json({ clientes: clientes });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los clientes", error: error.message });
  }
};

// Obtener un cliente por ID
const getCliente = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const cliente = await Cliente.getClienteById(id);
    if (!cliente) {
      return res
        .status(404)
        .json({ message: `Cliente con ID ${id} no encontrado` });
    }
    res.status(200).json({ cliente: cliente });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el cliente", error: error.message });
  }
};
const getClienteTel = async (req, res) => {
  const tel = req.body.telefono;
  try {
    const cliente = await Cliente.getClienteByTel(tel);
    if (!cliente) {
      return res
        .status(404)
        .json({ message: `Cliente con ID ${id} no encontrado` });
    }
    res.status(200).json(cliente);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el cliente", error: error.message });
  }
};

// Crear un nuevo cliente
const createCliente = async (req, res) => {
  const cliente = req.body;
  try {
    const newCliente = await Cliente.createCliente(cliente);
    res.status(201).json({ cliente: newCliente });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el cliente", error: error.message });
  }
};

// Actualizar un cliente existente
const updateCliente = async (req, res) => {
  const id = parseInt(req.params.id);
  const cliente = req.body;
  cliente.id = id;
  try {
    const updatedCliente = await Cliente.updateCliente(cliente);
    if (!updatedCliente) {
      return res
        .status(404)
        .json({ message: `Cliente con ID ${id} no encontrado` });
    }
    res.status(200).json(updatedCliente);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el cliente",
      error: error.message,
    });
  }
};

// Eliminar un cliente
const deleteCliente = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedCliente = await Cliente.deleteClienteById(id);
    if (!deletedCliente) {
      return res
        .status(404)
        .json({ message: `Cliente con ID ${id} no encontrado` });
    }
    res.status(200).json({ message: "Cliente eliminado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el cliente", error: error.message });
  }
};

module.exports = {
  getClientes,
  getCliente,
  createCliente,
  updateCliente,
  getClienteTel,
  // updateClienteByTel,
  deleteCliente,
  // deleteClienteByTel
};
