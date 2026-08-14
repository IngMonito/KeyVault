require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

pool.getConnection()
  .then(conn => {
    console.log('✅ Conectado a MySQL correctamente');
    conn.release();
  })
  .catch(err => {
    console.error('❌ Error conectando a MySQL:', err.message);
  });

app.get('/', (req, res) => {
  res.json({ mensaje: 'KeyVault host funcionando correctamente' });
});

const usuariosRoutes = require('./routes/usuarios');
const contrasenasRoutes = require('./routes/contraseñas');

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/contrasenas', contrasenasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor KeyVault corriendo en http://localhost:${PORT}`);
});