const { Router } = require('express');
var express = require('express')
var router = express.Router()
var DenunciasController = require('../../controllers/denuncias.controller');


router.get('/getDenunciasByID',DenunciasController.getDenunciasByID)
router.post('/createDenuncia',DenunciasController.createDenuncia)
/*router.get('/:id', Authorization, ProductosController.getProductoById)
router.post('/create',Authorization, ProductosController.createProducto)
router.delete('/:id',Authorization, ProductosController.deleteProducto)
router.put('/:id',Authorization, ProductosController.updateProducto)*/

// Export the Router
module.exports = router;