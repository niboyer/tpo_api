const { Router } = require('express');
var express = require('express')
var router = express.Router()
var PersonalController = require('../../controllers/personal.controller');

router.post('/accederPersonal', PersonalController.accederPersonal)
router.post('/crearAcceso', PersonalController.crearAcceso)
/*router.get('/:id', Authorization, ProductosController.getProductoById)
router.post('/create',Authorization, ProductosController.createProducto)
router.delete('/:id',Authorization, ProductosController.deleteProducto)
router.put('/:id',Authorization, ProductosController.updateProducto)*/

// Export the Router
module.exports = router;