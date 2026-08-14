const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const obtenerTodos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id_usuario, correo_electronico, fecha_registro, activo FROM usuario');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const crear = async (req, res) => {
  const { correo, contrasenaMaestra } = req.body;
  if (!correo || !contrasenaMaestra) {
    return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
  }
  if (!correo.includes('@')) {
    return res.status(400).json({ error: 'El correo no es válido' });
  }
  if (contrasenaMaestra.length < 6) {
    return res.status(400).json({ error: 'La contraseña debe tener mínimo 6 caracteres' });
  }
  try {
    const hash = await bcrypt.hash(contrasenaMaestra, 10);
    const [result] = await pool.query(
      'INSERT INTO usuario (correo_electronico, contrasena_maestra_hash) VALUES (?, ?)',
      [correo, hash]
    );
    res.status(201).json({ mensaje: 'Usuario creado', id: result.insertId });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { correo, contrasenaMaestra } = req.body;
  if (!correo || !contrasenaMaestra) {
    return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
  }
  try {
    const [rows] = await pool.query(
      'SELECT * FROM usuario WHERE correo_electronico = ?',
      [correo]
    );
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }
    const usuario = rows[0];
    const valido = await bcrypt.compare(contrasenaMaestra, usuario.contrasena_maestra_hash);
    if (!valido) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }
    const token = jwt.sign(
      { id: usuario.id_usuario, correo: usuario.correo_electronico },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.json({ mensaje: 'Login exitoso', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const eliminar = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM usuario WHERE id_usuario = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { obtenerTodos, crear, login, eliminar };