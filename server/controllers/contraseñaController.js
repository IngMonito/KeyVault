const pool = require('../config/db');

const obtenerTodas = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM entrada_contrasena WHERE id_usuario = ?',
      [req.usuario.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const crear = async (req, res) => {
  const { nombreServicio, urlServicio, usuarioServicio, contrasenaCifrada, notas, idCategoria } = req.body;

  if (!nombreServicio || !contrasenaCifrada) {
    return res.status(400).json({ error: 'Nombre del servicio y contraseña son obligatorios' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO entrada_contrasena (id_usuario, id_categoria, nombre_servicio, url_servicio, usuario_servicio, contrasena_cifrada, notas) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [req.usuario.id, idCategoria || null, nombreServicio, urlServicio || null, usuarioServicio || null, contrasenaCifrada, notas || null]
    );
    res.status(201).json({ mensaje: 'Contraseña guardada correctamente', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const actualizar = async (req, res) => {
  const { id } = req.params;
  const { nombreServicio, urlServicio, usuarioServicio, contrasenaCifrada, notas, idCategoria } = req.body;

  if (!nombreServicio || !contrasenaCifrada) {
    return res.status(400).json({ error: 'Nombre del servicio y contraseña son obligatorios' });
  }

  try {
    const [result] = await pool.query(
      'UPDATE entrada_contrasena SET id_categoria = ?, nombre_servicio = ?, url_servicio = ?, usuario_servicio = ?, contrasena_cifrada = ?, notas = ? WHERE id_entrada = ? AND id_usuario = ?',
      [idCategoria || null, nombreServicio, urlServicio || null, usuarioServicio || null, contrasenaCifrada, notas || null, id, req.usuario.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Contraseña no encontrada' });
    }
    res.json({ mensaje: 'Contraseña actualizada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const eliminar = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query(
      'DELETE FROM entrada_contrasena WHERE id_entrada = ? AND id_usuario = ?',
      [id, req.usuario.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Contraseña no encontrada' });
    }
    res.json({ mensaje: 'Contraseña eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { obtenerTodas, crear, actualizar, eliminar };