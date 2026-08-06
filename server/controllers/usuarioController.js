const usuarios = [];

const obtenerTodos = (req, res) => {
  res.json(usuarios);
};

const crear = (req, res) => {
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

  const nuevoUsuario = {
    id: usuarios.length + 1,
    correo,
    contrasenaMaestra,
    fechaRegistro: new Date(),
    activo: true
  };

  usuarios.push(nuevoUsuario);
  res.status(201).json({ mensaje: 'Usuario creado', usuario: nuevoUsuario });
};

const eliminar = (req, res) => {
  const { id } = req.params;
  const indice = usuarios.findIndex(u => u.id === parseInt(id));

  if (indice === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  usuarios.splice(indice, 1);
  res.json({ mensaje: 'Usuario eliminado' });
};

module.exports = { obtenerTodos, crear, eliminar };