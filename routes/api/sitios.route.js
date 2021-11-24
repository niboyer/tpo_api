var express = require('express')
var router = express.Router()
var SitiosController = require('../../controllers/sitios.controller');

router.get('/', SitiosController.listarSitios)
/*router.get('/:id', Authorization, ProductosController.getProductoById)
router.post('/create',Authorization, ProductosController.createProducto)
router.delete('/:id',Authorization, ProductosController.deleteProducto)
router.put('/:id',Authorization, ProductosController.updateProducto)*/

// Export the Router
module.exports = router;