const express = require('express');
const router = express.Router();
const contrasenaController = require('../controllers/contrasenaController');

router.get('/', contrasenaController.obtenerTodas);
router.post('/', contrasenaController.crear);
router.put('/:id', contrasenaController.actualizar);
router.delete('/:id', contrasenaController.eliminar);

module.exports = router;