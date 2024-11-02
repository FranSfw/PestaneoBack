const express = require('express');
const app = express();
const cors = require('cors');
const citaRoutes = require('./routers/citasRouters');
const empleadoRoutes = require('./routers/empleadosRouters');
const clientesRoutes = require('./routers/clientesRouters');
const procedimientosRoutes = require('./routers/procedimientosRouters');

const corsOptions = {
  origin: '*', // Cambia esto a la IP correcta de tu cliente
  allowedHeaders: 'Content-Type',
};

// Middleware para parsear JSON
app.use(express.json());
app.use(cors(corsOptions));


// Rutas
app.use('/citas', citaRoutes);
app.use('/empleados', empleadoRoutes);
app.use('/clientes', clientesRoutes);
app.use('/procedimientos', procedimientosRoutes);

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de Pestañeo!');
});

// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
