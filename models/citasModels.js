// models/citasModel.js
const pool = require('../configs/db');

// Obtener todos los usuarios
async function getAllCitas() {
  try {
    const connection = await pool;
    // Make a query
    connection.query('SELECT * FROM citas ORDER by citas.fecha DESC', (error, results) => {
      if (error) throw error;
      console.log(results);
      // Always close the connection after you're done
      connection.end();
      return results.rows;
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}
// const getAllCitas = async () => {

//   const result = await pool.query('SELECT * FROM citas ORDER BY id ASC');
//   return result.rows;
// };

// Obtener una cita por ID
const getCitasById = async (id) => {
  const result = await pool.query('SELECT * FROM citas WHERE id = $1', [id]);
  return result.rows[0];
};

const getCitasByTel= async (tel) =>{
  const result= await pool.query('SELECT cliente.nombre,cliente.telefono,citas.fecha,citas.encargado, citas.procedimiento, citas.notas, citas.mapping_estilo, citas.tamaño, citas.curvatura, citas.espessura FROM  citas  JOIN clientes   ON  citas.cliente = clientes.id WHERE clientes.telefono=$1 ORDER BY  citas.fecha DESC;',[tel])
};

// Crear un nuevo usuario
const createCitas = async (citas) => {
    const { cliente, fecha, encargado, procedimiento, notas, mapping_estilo, tamaño, curvatura, espessura } = citas;
    
    const result = await pool.query(
      `INSERT INTO citas (cliente, fecha, encargado, procedimiento, notas, mapping_estilo, tamaño, curvatura, espessura)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [cliente, fecha, encargado, procedimiento, notas, mapping_estilo, tamaño, curvatura, espessura]
    );
    
    return result.rows[0];
  };
  

// Actualizar un usuario existente
const updateCitas = async (id, citas) => {
    const { cliente, fecha, encargado, procedimiento, notas, mapping_estilo, tamaño, curvatura, espessura } = citas;
  
    const result = await pool.query(
      `UPDATE citas
       SET cliente = $1, fecha = $2, encargado = $3, procedimiento = $4, notas = $5, mapping_estilo = $6, tamaño = $7, curvatura = $8, espessura = $9
       WHERE id = $10
       RETURNING *`,
      [cliente, fecha, encargado, procedimiento, notas, mapping_estilo, tamaño, curvatura, espessura, id]
    );
  
    return result.rows[0];
  };

// Eliminar un usuario
const deleteCitas = async (id) => {
  const result = await pool.query('DELETE FROM citas WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  getAllCitas,
  getCitasById,
  createCitas,
  updateCitas,
  deleteCitas,
};
