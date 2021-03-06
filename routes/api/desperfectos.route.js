var express = require('express')
var router = express.Router()
var DesperfectosController = require('../../controllers/desperfectos.controller');

router.get('/', DesperfectosController.listarDesperfectos)
/*router.get('/:id', Authorization, ProductosController.getProductoById)
router.post('/create',Authorization, ProductosController.createProducto)
router.delete('/:id',Authorization, ProductosController.deleteProducto)
router.put('/:id',Authorization, ProductosController.updateProducto)*/

// Export the Router
module.exports = router;