// models/citasModel.js
const pool = require("../configs/db");

// Obtener todos los usuarios
const getAllCitas = async () => {
  const result =
    await pool.query(`SELECT c.id as cita_id,cl.id as cliente_id,cl.nombre as cliente_nombre, cl.apellido as cliente_apellido, cl.telefono, c.fecha, e.nombre as encargado_nombre, e.apellido as encargado_apellido, p.tipo_procedimiento, c.notas, c.mapping_estilo, c.tamaño, c.curvatura, c.espessura, cl.foto
  FROM citas as c
  INNER JOIN clientes as cl on c.cliente = cl.id
  INNER JOIN procedimientos as p on c.procedimiento = p.id
  INNER JOIN empleados as e on c.encargado = e.id
  WHERE c.fecha >= current_date()
  ORDER BY c.fecha ASC;`);
  return result;
};
const getAllOldCitas = async () => {
  const result =
    await pool.query(`SELECT c.id as cita_id,cl.id as cliente_id,cl.nombre as cliente_nombre, cl.apellido as cliente_apellido, cl.telefono, c.fecha, e.nombre as encargado_nombre, e.apellido as encargado_apellido, p.tipo_procedimiento, c.notas, c.mapping_estilo, c.tamaño, c.curvatura, c.espessura
  FROM citas as c
  INNER JOIN clientes as cl on c.cliente = cl.id
  INNER JOIN procedimientos as p on c.procedimiento = p.id
  INNER JOIN empleados as e on c.encargado = e.id
  WHERE c.fecha < current_date()
  ORDER BY c.fecha DESC;`);
  return result;
};

// Obtener una cita por ID
const getCitasHistory = async (cliente) => {
  const id = cliente.clienteid;
  const result = await pool.query(
    `SELECT c.id as cita_id,cl.id as cliente_id,cl.nombre as cliente_nombre, cl.apellido as cliente_apellido, cl.telefono, c.fecha, e.nombre as encargado_nombre, e.apellido as encargado_apellido, p.tipo_procedimiento, c.notas, c.mapping_estilo, c.tamaño, c.curvatura, c.espessura
    FROM citas as c
    INNER JOIN clientes as cl on c.cliente = cl.id
    INNER JOIN procedimientos as p on c.procedimiento = p.id
    INNER JOIN empleados as e on c.encargado = e.id
    WHERE cl.id = ? AND c.fecha < CURDATE()
    ORDER BY c.fecha ASC
    LIMIT 1;`,
    [id]
  );
  return result;
};
const getCitasById = async (id) => {
  const result = await pool.query("SELECT * FROM citas WHERE id = ?", [id]);
  return result;
};

const getCitasByTel = async (tel) => {
  const phone = +tel.phone_number + "%";
  const result = await pool.query(
    `SELECT citas.id as citas_id, clientes.id as cliente_id cliente.nombre,cliente.telefono,citas.fecha,citas.encargado, citas.procedimiento, citas.notas, citas.mapping_estilo, citas.tamaño, citas.curvatura, citas.espessura
  FROM  citas
  JOIN clientes ON citas.cliente = clientes.id
  WHERE clientes.telefono LIKE ?
  ORDER BY citas.fecha DESC;`,
    [phone]
  );
  return result;
};

const createCitas = async (citas) => {
  console.log("hola");
  const {
    telefono,
    fecha,
    encargado,
    procedimiento,
    notas,
    mapping_estilo,
    tamaño,
    curvatura,
    espessura,
  } = citas;
  console.log("telefono: "+telefono);

  const [clienteResult] = await pool.query(
    "SELECT id FROM clientes WHERE telefono = ?",
    [telefono]
  );

  console.log(clienteResult.id);

  if (clienteResult.length === 0) {
    throw new Error("No se encontró un cliente con ese teléfono");
  }

  const cliente = clienteResult.id; // Accede al ID del cliente
  console.log("Cliente ID: " + cliente);

  const [conflictCheck] = await pool.query(
    "SELECT * FROM citas WHERE fecha = ? AND (encargado = ? OR cliente = ?)",
    [fecha, encargado, cliente]
  );
  if (conflictCheck > 0) {
    throw new Error(
      "El empleado o usuario ya tiene una cita programada en ese horario"
    );
  }

  const result = await pool.query(
    `INSERT INTO citas (cliente, fecha, encargado, procedimiento, notas, mapping_estilo, tamaño, curvatura, espessura)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      cliente,
      fecha,
      encargado,
      procedimiento,
      notas,
      mapping_estilo,
      tamaño,
      curvatura,
      espessura,
    ]
  );
  console.log(result);

  return "Cita creada exitosamente";
};

// Actualizar un usuario existente
const updateCitas = async (citas) => {
  const {
    id,
    cliente,
    fecha,
    encargado,
    procedimiento,
    notas,
    mapping_estilo,
    tamaño,
    curvatura,
    espessura,
  } = citas;

  

  const conflictCheck = await pool.query(
    "SELECT * FROM citas WHERE fecha = ? AND (encargado = ? OR cliente = ?)",
    [fecha, encargado, cliente]
  );
  if (conflictCheck.rows.length > 0) {
    throw new Error(
      "El empleado o usuario ya tiene una cita programada en ese horario"
    );
  }

  const result = await pool.query(
    `UPDATE citas
       SET cliente = ?, fecha = ?, encargado = ?, procedimiento = ?, notas = ?, mapping_estilo = ?, tamaño = ?, curvatura = ?, espessura = ?
       WHERE id = ?`,
    [
      cliente,
      fecha,
      encargado,
      procedimiento,
      notas,
      mapping_estilo,
      tamaño,
      curvatura,
      espessura,
      id,
    ]
  );

  return "Cita actualizada exitosamente";
};

// Eliminar un usuario
const deleteCitas = async (id) => {
  const result = await pool.query("DELETE FROM citas WHERE id = ?", [id]);
  if (result.affectedRows === 0) {
    throw new Error("Cita no encontrada o ya fue eliminada.");
  }
  return "Cita eliminada exitosamente";
};

module.exports = {
  getAllCitas,
  getCitasById,
  createCitas,
  updateCitas,
  deleteCitas,
  getCitasByTel,
  getCitasHistory,
  getAllOldCitas,
};
