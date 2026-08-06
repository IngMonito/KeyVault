// Archivo principal del servidor KeyVault
const express = require('express');
const cors = require('cors');

// Crear la aplicación Express
const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'KeyVault API funcionando correctamente' });
});

// Importar rutas
const usuariosRoutes = require('./routes/usuarios');
const contrasenasRoutes = require('./routes/contraseñas');

// Usar rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/contrasenas', contrasenasRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor KeyVault corriendo en http://localhost:${PORT}`);
});