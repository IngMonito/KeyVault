const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.obtenerTodos);
router.post('/', usuarioController.crear);
router.delete('/:id', usuarioController.eliminar);

module.exports = router;