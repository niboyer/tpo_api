const { Router } = require('express');
var express = require('express')
var router = express.Router()
var DenunciasController = require('../../controllers/denuncias.controller');


router.get('/getDenunciasByID',DenunciasController.getDenunciasByID)
router.get('/getDenunciasByDocumento',DenunciasController.getDenunciasByDocumento)
router.post('/createDenuncia',DenunciasController.createDenuncia)

// Export the Router
module.exports = router;