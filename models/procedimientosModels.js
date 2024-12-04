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
  try {
    const { tipo_procedimiento } = procedimiento;

    if (!tipo_procedimiento) {
      throw new Error("Faltan datos requeridos: tipo_procedimiento");
    }
    const result = await pool.query(
      `INSERT INTO procedimientos (tipo_procedimiento)
       VALUES (?)`,
      [tipo_procedimiento]
    );

    return "Procedimiento creado exitosamente";
  } catch (error) {
    console.error("Error al crear procedimiento:", error);
    throw error;
  }
};

// Actualizar un procedimiento existente
const updateProcedimiento = async (procedimiento) => {
  try {
    const { id, tipo_procedimiento } = procedimiento;
    if (!id || !tipo_procedimiento) {
      throw new Error("Faltan datos requeridos: id o tipo_procedimiento");
    }

    const result = await pool.query(
      `UPDATE procedimientos
       SET tipo_procedimiento = ?
       WHERE id = ?`,
      [tipo_procedimiento, id]
    );
    if (result.affectedRows === 0) {
      return "No se encontró ningún procedimiento con el ID proporcionado.";
    }

    return "Procedimiento actualizado exitosamente";
  } catch (error) {
    console.error("Error al actualizar procedimiento:", error.message);
    throw new Error("Hubo un problema al actualizar el procedimiento.");
  }
};

// Eliminar un procedimiento
const deleteProcedimiento = async (id) => {
  const result = await pool.query("DELETE FROM procedimientos WHERE id = ?", [
    id,
  ]);
  if (result.affectedRows === 0) {
    throw new Error("Procedimiento no encontrado o ya fue eliminado.");
  }
  return "Procedimiento eliminado exitosamente";
};

module.exports = {
  getAllProcedimientos,
  getProcedimientoById,
  createProcedimiento,
  updateProcedimiento,
  deleteProcedimiento,
};
