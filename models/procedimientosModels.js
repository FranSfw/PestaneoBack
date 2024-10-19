const pool = require('../configs/db');

// Obtener todos los procedimientos
const getAllProcedimientos = async () => {
  const result = await pool.query('SELECT * FROM procedimientos ORDER BY id ASC');
  return result.rows;
};

// Obtener un procedimiento por ID
const getProcedimientoById = async (id) => {
  const result = await pool.query('SELECT * FROM procedimientos WHERE id = $1', [id]);
  return result.rows[0];
};

// Crear un nuevo procedimiento
const createProcedimiento = async (procedimiento) => {
  const { tipo_procedimiento } = procedimiento;

  const result = await pool.query(
    `INSERT INTO procedimientos (tipo_procedimiento)
     VALUES ($1) RETURNING *`,
    [tipo_procedimiento]
  );

  return result.rows[0];
};

// Actualizar un procedimiento existente
const updateProcedimiento = async (id, procedimiento) => {
  const { tipo_procedimiento } = procedimiento;

  const result = await pool.query(
    `UPDATE procedimientos
     SET tipo_procedimiento = $1
     WHERE id = $2 RETURNING *`,
    [tipo_procedimiento, id]
  );

  return result.rows[0];
};

// Eliminar un procedimiento
const deleteProcedimiento = async (id) => {
  const result = await pool.query('DELETE FROM procedimientos WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  getAllProcedimientos,
  getProcedimientoById,
  createProcedimiento,
  updateProcedimiento,
  deleteProcedimiento,
};
