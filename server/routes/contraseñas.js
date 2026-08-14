const express = require('express');
const router = express.Router();
const contraseñaController = require('../controllers/contraseñaController');
const verificarToken = require('../middlewares/auth');

router.get('/', verificarToken, contraseñaController.obtenerTodas);
router.post('/', verificarToken, contraseñaController.crear);
router.put('/:id', verificarToken, contraseñaController.actualizar);
router.delete('/:id', verificarToken, contraseñaController.eliminar);

module.exports = router;