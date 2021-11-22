var express = require('express')
var router = express.Router()
var BarriosController = require('../../controllers/barrios.controller');

router.get('/', BarriosController.listarBarrios)
router.post('/CrearBarrio', BarriosController.crearBarrio)

module.exports = router;