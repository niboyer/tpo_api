const { Router } = require('express');
var express = require('express')
var router = express.Router()
var PromocionesController = require('../../controllers/promociones.controller');


router.post('/getPromocionesByTipo',PromocionesController.getPromocionesByTipo)
/*router.get('/:id', Authorization, ProductosController.getProductoById)
router.post('/create',Authorization, ProductosController.createProducto)
router.delete('/:id',Authorization, ProductosController.deleteProducto)
router.put('/:id',Authorization, ProductosController.updateProducto)*/

// Export the Router
module.exports = router;