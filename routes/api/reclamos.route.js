const { Router } = require('express');
var express = require('express')
var router = express.Router()
var ReclamosController = require('../../controllers/reclamos.controller');

router.get('/getReclamosByDesperfectoAndDocumento',ReclamosController.getReclamosByDesperfectoAndDocumento)
router.get('/getReclamosByDesperfecto',ReclamosController.getReclamosByDesperfecto)
router.get('/getReclamosByDocumento',ReclamosController.getReclamosByDocumento)
router.post('/createReclamo',ReclamosController.createReclamo)
router.get('/getMovimientosByIdReclamo', ReclamosController.getMovimientosByIdReclamo);
/*router.get('/:id', Authorization, ProductosController.getProductoById)
router.post('/create',Authorization, ProductosController.createProducto)
router.delete('/:id',Authorization, ProductosController.deleteProducto)
router.put('/:id',Authorization, ProductosController.updateProducto)*/

// Export the Router
module.exports = router;