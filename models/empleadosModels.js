const pool = require('../configs/db');

// Obtener todos los empleados
const getAllEmpleados = async () => {
  const result = await pool.query('SELECT * FROM empleados ORDER BY id ASC');
  return result.rows;
};

const loginEmployees= async(email, password) => {
  const result= await pool.query('SELECT * FROM employees WHERE access_email=$1 AND password=$2',[email,password]);
  return result.rows.length>0?{success:true}:{success:false};
};


// Obtener un empleado por ID
const getEmpleadoById = async (id) => {
  const result = await pool.query('SELECT * FROM empleados WHERE id = $1', [id]);
  return result.rows[0];
};

// Crear un nuevo empleado
const createEmpleado = async (empleado) => {
  const { nombre, apellido, email, password } = empleado;

  const hashed_pwd = await bcrypt.hash(password, 10); 
  try {
    
    const result = await pool.query(
      `INSERT INTO empleados (nombre, apellido, email, password)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [nombre, apellido, email, hashed_pwd]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error al crear empleado:', error);
    throw error; 
  }
};

// Actualizar un empleado existente
const updateEmpleado = async (id, empleado) => {
  const { nombre, apellido } = empleado;

  const result = await pool.query(
    `UPDATE empleados
     SET nombre = $1, apellido = $2
     WHERE id = $3 RETURNING *`,
    [nombre, apellido, id]
  );

  return result.rows[0];
};

// Eliminar un empleado
const deleteEmpleado = async (id) => {
  const result = await pool.query('DELETE FROM empleados WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  getAllEmpleados,
  getEmpleadoById,
  loginEmployees,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
};

