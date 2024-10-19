const pool = require('../configs/db');

// Obtener todos los clientes
const getAllClientes = async () => {
  console.log('modelo');
  const result = await pool.query('SELECT * FROM clientes ORDER BY id ASC');
  return result.rows;
};

// Obtener un cliente por ID
const getClienteById = async (id) => {
  const result = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
  return result.rows[0];
};

const getClienteByTel = async (tel) => {
  const result = await pool.query('SELECT * FROM clientes WHERE telefono = $1', [tel]);
  return result.rows[0];
};

// Crear un nuevo cliente
const createCliente = async (cliente) => {
  const { nombre, apellido, domicilio, telefono, email, fecha_nacimiento, medicamentos, alergias, sensibilidad_productos, dermatitis, infeccion_ojos, dolencia_ojos, latex, fecha_ultimo_procedimiento, ultimo_procedimiento } = cliente;

  const result = await pool.query(
    `INSERT INTO clientes (nombre, apellido, domicilio, telefono, email, fecha_nacimiento, medicamentos, alergias, sensibilidad_productos, dermatitis, infeccion_ojos, dolencia_ojos, latex, fecha_ultimo_procedimiento, ultimo_procedimiento)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
    [nombre, apellido, domicilio, telefono, email, fecha_nacimiento, medicamentos, alergias, sensibilidad_productos, dermatitis, infeccion_ojos, dolencia_ojos, latex, fecha_ultimo_procedimiento, ultimo_procedimiento]
  );

  return result.rows[0];
};

// Actualizar un cliente existente
const updateCliente = async (id, cliente) => {
  const { nombre, apellido, domicilio, telefono, email, fecha_nacimiento, medicamentos, alergias, sensibilidad_productos, dermatitis, infeccion_ojos, dolencia_ojos, latex, fecha_ultimo_procedimiento, ultimo_procedimiento } = cliente;

  const result = await pool.query(
    `UPDATE clientes
     SET nombre = $1, apellido = $2, domicilio = $3, telefono = $4, email = $5, fecha_nacimiento = $6, medicamentos = $7, alergias = $8, sensibilidad_productos = $9, dermatitis = $10, infeccion_ojos = $11, dolencia_ojos = $12, latex = $13, fecha_ultimo_procedimiento = $14, ultimo_procedimiento = $15
     WHERE id = $16 RETURNING *`,
    [nombre, apellido, domicilio, telefono, email, fecha_nacimiento, medicamentos, alergias, sensibilidad_productos, dermatitis, infeccion_ojos, dolencia_ojos, latex, fecha_ultimo_procedimiento, ultimo_procedimiento, id]
  );

  return result.rows[0];
};

const updateClienteByTel = async (tel, cliente) => {
  const { nombre, apellido, domicilio, telefono, email, fecha_nacimiento, medicamentos, alergias, sensibilidad_productos, dermatitis, infeccion_ojos, dolencia_ojos, latex, fecha_ultimo_procedimiento, ultimo_procedimiento } = cliente;

  const result = await pool.query(
    `UPDATE clientes
     SET nombre = $1, apellido = $2, domicilio = $3, telefono = $4, email = $5, fecha_nacimiento = $6, medicamentos = $7, alergias = $8, sensibilidad_productos = $9, dermatitis = $10, infeccion_ojos = $11, dolencia_ojos = $12, latex = $13, fecha_ultimo_procedimiento = $14, ultimo_procedimiento = $15
     WHERE telefono = $16 RETURNING *`,
    [nombre, apellido, domicilio, telefono, email, fecha_nacimiento, medicamentos, alergias, sensibilidad_productos, dermatitis, infeccion_ojos, dolencia_ojos, latex, fecha_ultimo_procedimiento, ultimo_procedimiento, tel]
  );

  return result.rows[0];
};

// Eliminar un cliente
const deleteClienteById = async (id) => {
  const result = await pool.query('DELETE FROM clientes WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

const deleteClienteByTel = async (tel) => {
  const result = await pool.query('DELETE FROM clientes WHERE telefono = $1 RETURNING *', [tel]);
  return result.rows[0];
};


module.exports = {
  test,
  getAllClientes,
  getClienteById,
  getClienteByTel,
  createCliente,
  updateCliente,
  deleteClienteById,
  deleteClienteByTel
};
