const { Router } = require('express');
var express = require('express')
var router = express.Router()
var DenunciasController = require('../../controllers/denuncias.controller');


router.get('/getDenunciasByID',DenunciasController.getDenunciasByID)
router.get('/getDenunciasByDocumento',DenunciasController.getDenunciasByDocumento)
router.get('/getDenunciasByDocumentoDenunciado',DenunciasController.getDenunciasByDocumentoDenunciado)
router.post('/createDenuncia',DenunciasController.createDenuncia)
router.get('/getMovimientosByIdDenuncia', DenunciasController.getMovimientosByIdDenuncia);

// Export the Router
module.exports = router;