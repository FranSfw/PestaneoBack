const pool = require("../configs/db");

// Obtener todos los procedimientos
const getAllProcedimientos = async () => {
  const result = await pool.query(
    "SELECT * FROM procedimientos ORDER BY id ASC"
  );
  return result;
};

// Obtener un procedimiento por ID
const getProcedimientoById = async (id) => {
  const result = await pool.query("SELECT * FROM procedimientos WHERE id = ?", [
    id,
  ]);
  return result;
};

// Crear un nuevo procedimiento
const createProcedimiento = async (procedimiento) => {
  const { tipo_procedimiento } = procedimiento;

  const result = await pool.query(
    `INSERT INTO procedimientos (tipo_procedimiento)
     VALUES (?) RETURNING *`,
    [tipo_procedimiento]
  );

  return result[0];
};

// Actualizar un procedimiento existente
const updateProcedimiento = async (id, procedimiento) => {
  const { tipo_procedimiento } = procedimiento;

  const result = await pool.query(
    `UPDATE procedimientos
     SET tipo_procedimiento = ?
     WHERE id = ? RETURNING *`,
    [tipo_procedimiento, id]
  );

  return result;
};

// Eliminar un procedimiento
const deleteProcedimiento = async (id) => {
  const result = await pool.query(
    "DELETE FROM procedimientos WHERE id = ? RETURNING *",
    [id]
  );
  return result;
};

module.exports = {
  getAllProcedimientos,
  getProcedimientoById,
  createProcedimiento,
  updateProcedimiento,
  deleteProcedimiento,
};
