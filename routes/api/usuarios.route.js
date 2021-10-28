const { Router } = require('express');
var express = require('express')
var router = express.Router()
var UsuariosController = require('../../controllers/usuarios.controller');

router.post('/accederVecino', UsuariosController.accederVecino)
router.post('/solicitarAcceso', UsuariosController.solicitarAcceso)
router.put('/activarUsuario', UsuariosController.activarUsuario)
router.get('/verificarUsuarioActivo',UsuariosController.verificarUsuarioActivo)
router.post('/crearAcceso', UsuariosController.crearAcceso)
/*router.get('/:id', Authorization, ProductosController.getProductoById)
router.post('/create',Authorization, ProductosController.createProducto)
router.delete('/:id',Authorization, ProductosController.deleteProducto)
router.put('/:id',Authorization, ProductosController.updateProducto)*/

// Export the Router
module.exports = router;