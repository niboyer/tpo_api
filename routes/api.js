/**ROUTE USER APIs. */
var express = require('express')

var router = express.Router()

var barrios = require('./api/barrios.route')
router.use('/barrios', barrios)

/*var users = require('./api/User.route')
var productos = require('./api/Producto.route')
var ventas = require('./api/Venta.route');

router.use('/users', users);
router.use('/productos', productos);
router.use('/ventas', ventas);*/

module.exports = router;
