const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const verificarToken = require('../middlewares/auth');

router.post('/login', usuarioController.login);
router.post('/', usuarioController.crear);
router.get('/', verificarToken, usuarioController.obtenerTodos);
router.delete('/:id', verificarToken, usuarioController.eliminar);

module.exports = router;