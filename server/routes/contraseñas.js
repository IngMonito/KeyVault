const express = require('express');
const router = express.Router();
const contraseñaController = require('../controllers/contraseñaController');

router.get('/', contraseñaController.obtenerTodas);
router.post('/', contraseñaController.crear);
router.put('/:id', contraseñaController.actualizar);
router.delete('/:id', contraseñaController.eliminar);

module.exports = router;