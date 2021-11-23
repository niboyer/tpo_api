var express = require('express')
var router = express.Router()
var VecinosController = require('../../controllers/vecinos.controller');

router.get('/', VecinosController.findAll)

module.exports = router;