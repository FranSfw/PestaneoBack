const pool = require("../configs/db");

// Obtener todos los clientes
const getAllClientes = async () => {
  const result = await pool.query("SELECT * FROM clientes ORDER BY id ASC");
  return result;
};

// Obtener un cliente por ID
const getClienteById = async (id) => {
  const result = await pool.query("SELECT * FROM clientes WHERE id = ?", [id]);
  return result[0];
};

const getClienteByTel = async (tel) => {
  tel = "%" + tel + "%";
  const result = await pool.query(
    "SELECT * FROM clientes WHERE telefono LIKE ?",
    [tel]
  );
  return result[0];
};

// Crear un nuevo cliente
const createCliente = async (cliente) => {
  const {
    nombre,
    apellido,
    domicilio,
    telefono,
    email,
    fecha_nacimiento,
    medicamentos,
    alergias,
    sensibilidad_productos,
    dermatitis,
    infeccion_ojos,
    dolencia_ojos,
    latex,
    fecha_ultimo_procedimiento,
    ultimo_procedimiento,
  } = cliente;

  const result = await pool.query(
    `INSERT INTO clientes (nombre, apellido, domicilio, telefono, email, fecha_nacimiento, medicamentos, alergias, sensibilidad_productos, dermatitis, infeccion_ojos, dolencia_ojos, latex, fecha_ultimo_procedimiento, ultimo_procedimiento)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`,
    [
      nombre,
      apellido,
      domicilio,
      telefono,
      email,
      fecha_nacimiento,
      medicamentos,
      alergias,
      sensibilidad_productos,
      dermatitis,
      infeccion_ojos,
      dolencia_ojos,
      latex,
      fecha_ultimo_procedimiento,
      ultimo_procedimiento,
    ]
  );

  return result[0];
};

// Actualizar un cliente existente
const updateCliente = async (id, cliente) => {
  const {
    nombre,
    apellido,
    domicilio,
    telefono,
    email,
    fecha_nacimiento,
    medicamentos,
    alergias,
    sensibilidad_productos,
    dermatitis,
    infeccion_ojos,
    dolencia_ojos,
    latex,
    fecha_ultimo_procedimiento,
    ultimo_procedimiento,
  } = cliente;

  const result = await pool.query(
    `UPDATE clientes
     SET nombre = ?, apellido = ?, domicilio = ?, telefono = ?, email = ?, fecha_nacimiento = ?, medicamentos = ?, alergias = ?, sensibilidad_productos = ?, dermatitis = ?, infeccion_ojos = ?, dolencia_ojos = ?, latex = ?, fecha_ultimo_procedimiento = ?, ultimo_procedimiento = ?
     WHERE id = ? RETURNING *`,
    [
      nombre,
      apellido,
      domicilio,
      telefono,
      email,
      fecha_nacimiento,
      medicamentos,
      alergias,
      sensibilidad_productos,
      dermatitis,
      infeccion_ojos,
      dolencia_ojos,
      latex,
      fecha_ultimo_procedimiento,
      ultimo_procedimiento,
      id,
    ]
  );

  return result[0];
};

const updateClienteByTel = async (tel, cliente) => {
  const {
    nombre,
    apellido,
    domicilio,
    telefono,
    email,
    fecha_nacimiento,
    medicamentos,
    alergias,
    sensibilidad_productos,
    dermatitis,
    infeccion_ojos,
    dolencia_ojos,
    latex,
    fecha_ultimo_procedimiento,
    ultimo_procedimiento,
  } = cliente;

  const result = await pool.query(
    `UPDATE clientes
     SET nombre = ?, apellido = ?, domicilio = ?, telefono = ?, email = ?, fecha_nacimiento = ?, medicamentos = ?, alergias = ?, sensibilidad_productos = ?, dermatitis = ?, infeccion_ojos = ?, dolencia_ojos = ?, latex = ?, fecha_ultimo_procedimiento = ?, ultimo_procedimiento = ?
     WHERE telefono = ? RETURNING *`,
    [
      nombre,
      apellido,
      domicilio,
      telefono,
      email,
      fecha_nacimiento,
      medicamentos,
      alergias,
      sensibilidad_productos,
      dermatitis,
      infeccion_ojos,
      dolencia_ojos,
      latex,
      fecha_ultimo_procedimiento,
      ultimo_procedimiento,
      tel,
    ]
  );

  return result[0];
};

// Eliminar un cliente
const deleteClienteById = async (id) => {
  const result = await pool.query(
    "DELETE FROM clientes WHERE id = ? RETURNING *",
    [id]
  );
  return result[0];
};

const deleteClienteByTel = async (tel) => {
  const result = await pool.query(
    "DELETE FROM clientes WHERE telefono = ? RETURNING *",
    [tel]
  );
  return result[0];
};

module.exports = {
  getAllClientes,
  getClienteById,
  getClienteByTel,
  createCliente,
  updateCliente,
  deleteClienteById,
  deleteClienteByTel,
};
