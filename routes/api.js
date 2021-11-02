/**ROUTE USER APIs. */
var express = require('express')

var router = express.Router()

var usuarios = require('./api/usuarios.route')
router.use('/usuarios', usuarios);

var barrios = require('./api/barrios.route')
router.use('/barrios', barrios)

var rubros = require('./api/rubros.route')
router.use('/rubros', rubros)

var vecinos = require('./api/vecinos.route')
router.use('/vecinos', vecinos)

var personal = require('./api/personal.route')
router.use('/personal', personal)

/*var users = require('./api/User.route')
var productos = require('./api/Producto.route')
var ventas = require('./api/Venta.route');

router.use('/users', users);
router.use('/productos', productos);
router.use('/ventas', ventas);*/

module.exports = router;