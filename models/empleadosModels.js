const pool = require("../configs/db");

// Obtener todos los empleados
const getAllEmpleados = async () => {
  const result = await pool.query(
    "SELECT id, nombre, apellido,email FROM empleados ORDER BY id ASC"
  );
  return result;
};

const loginEmployees = async (email, password) => {
  const result = await pool.query(
    "SELECT id, nombre, apellido, email FROM empleado WHERE email=? AND password=?",
    [email, password]
  );
  return result.length > 0 ? { success: true } : { success: false };
};

// Obtener un empleado por ID
const getEmpleadoById = async (id) => {
  const result = await pool.query("SELECT * FROM empleados WHERE id = ?", [id]);
  return result[0];
};

// Crear un nuevo empleado
const createEmpleado = async (empleado) => {
  const { nombre, apellido, email, password } = empleado;

  const hashed_pwd = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query(
      `INSERT INTO empleados (nombre, apellido, email, password)
       VALUES (?, ?, ?, ?)`,
      [nombre, apellido, email, hashed_pwd]
    );
    return result.insertId;
  } catch (error) {
    console.error("Error al crear empleado:", error);
    throw error;
  }
};

// Actualizar un empleado existente
const updateEmpleado = async (empleado) => {
  const { id, nombre, apellido } = empleado;

  const result = await pool.query(
    `UPDATE empleados
     SET nombre = ?, apellido = ?
     WHERE id = ?`,
    [nombre, apellido, id]
  );

  return result;
};

// Eliminar un empleado
const deleteEmpleado = async (id) => {
  const result = await pool.query("DELETE FROM empleados WHERE id = ?", [id]);
  if (result.affectedRows === 0) {
    throw new Error(`Empleado con ID ${id} no encontrado`);
  }
  return "Empleado eliminado exitosamente";
};

module.exports = {
  getAllEmpleados,
  getEmpleadoById,
  loginEmployees,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
};
