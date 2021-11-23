const { Router } = require('express');
var express = require('express')
var router = express.Router()
var ReclamosController = require('../../controllers/reclamos.controller');


router.get('/getReclamosByTipo',ReclamosController.getReclamosByTipo)
router.get('/getReclamosByUsuario',ReclamosController.getReclamosByUsuario)
router.post('/createReclamo',ReclamosController.createReclamo)
/*router.get('/:id', Authorization, ProductosController.getProductoById)
router.post('/create',Authorization, ProductosController.createProducto)
router.delete('/:id',Authorization, ProductosController.deleteProducto)
router.put('/:id',Authorization, ProductosController.updateProducto)*/

// Export the Router
module.exports = router;