// models/citasModel.js
const pool = require('../configs/db');

// Obtener todos los usuarios
const getAllCitas = async () => {
  const result = await pool.query(`SELECT cl.nombre as cliente_nombre, cl.apellido as cliente_apellido, cl.telefono, c.fecha, e.nombre as encargado_nombre, e.apellido as encargado_apellido, p.tipo_procedimiento, c.notas, c.mapping_estilo, c.tamaño, c.curvatura, c.espessura
  FROM citas as c
  INNER JOIN clientes as cl on c.cliente = cl.id
  INNER JOIN procedimientos as p on c.procedimiento = p.id
  INNER JOIN empleados as e on c.encargado = e.id
  WHERE c.fecha >= current_date()
  ORDER BY c.fecha DESC;`);
  return result;
};

// Obtener una cita por ID
const getCitasById = async (id) => {
  const result = await pool.query('SELECT * FROM citas WHERE id = $1', [id]);
  return result;
};

const getCitasByTel = async (tel) => {
  const result = await pool.query('SELECT cliente.nombre,cliente.telefono,citas.fecha,citas.encargado, citas.procedimiento, citas.notas, citas.mapping_estilo, citas.tamaño, citas.curvatura, citas.espessura FROM  citas  JOIN clientes   ON  citas.cliente = clientes.id WHERE clientes.telefono=$1 ORDER BY  citas.fecha DESC;', [tel])
  return result;
};

// Crear un nuevo usuario
const createCitas = async (citas) => {
  const { cliente, fecha, encargado, procedimiento, notas, mapping_estilo, tamaño, curvatura, espessura } = citas;

  const result = await pool.query(
    `INSERT INTO citas (cliente, fecha, encargado, procedimiento, notas, mapping_estilo, tamaño, curvatura, espessura)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    [cliente, fecha, encargado, procedimiento, notas, mapping_estilo, tamaño, curvatura, espessura]
  );

  return result;
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

  return result;
};

// Eliminar un usuario
const deleteCitas = async (id) => {
  const result = await pool.query('DELETE FROM citas WHERE id = $1 RETURNING *', [id]);
  return result;
};

module.exports = {
  getAllCitas,
  getCitasById,
  createCitas,
  updateCitas,
  deleteCitas,
};
