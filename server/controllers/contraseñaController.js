// Controlador de contraseñas - lógica de negocio
const contrasenas = [];

// Obtener todas las contraseñas
const obtenerTodas = (req, res) => {
  res.json(contrasenas);
};

// Crear contraseña
const crear = (req, res) => {
  const { idUsuario, nombreServicio, usuarioServicio, contrasenaCifrada, categoria } = req.body;

  // Validaciones
  if (!nombreServicio || !usuarioServicio || !contrasenaCifrada || !categoria) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Crear objeto contraseña
  const nuevaContrasena = {
    id: contrasenas.length + 1,
    idUsuario,
    nombreServicio,
    usuarioServicio,
    contrasenaCifrada,
    categoria,
    fechaCreacion: new Date()
  };

  contrasenas.push(nuevaContrasena);
  res.status(201).json({ mensaje: 'Contraseña guardada correctamente', contrasena: nuevaContrasena });
};

// Actualizar contraseña
const actualizar = (req, res) => {
  const { id } = req.params;
  const indice = contrasenas.findIndex(c => c.id === parseInt(id));

  if (indice === -1) {
    return res.status(404).json({ error: 'Contraseña no encontrada' });
  }

  contrasenas[indice] = { ...contrasenas[indice], ...req.body };
  res.json({ mensaje: 'Contraseña actualizada correctamente', contrasena: contrasenas[indice] });
};

// Eliminar contraseña
const eliminar = (req, res) => {
  const { id } = req.params;
  const indice = contrasenas.findIndex(c => c.id === parseInt(id));

  if (indice === -1) {
    return res.status(404).json({ error: 'Contraseña no encontrada' });
  }

  contrasenas.splice(indice, 1);
  res.json({ mensaje: 'Contraseña eliminada correctamente' });
};

module.exports = { obtenerTodas, crear, actualizar, eliminar };