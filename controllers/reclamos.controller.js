var ReclamosService = require('../services/reclamos.service');

// Saving the context of this module inside the _the variable
_this = this;

exports.getReclamosByTipo = async function (req, res, next) {
    var tipo = req.query.tipo

    try {
        var _reclamos = await ReclamosService.getReclamosByTipo(tipo)
        console.log(_reclamos)
        return res.status(200).json({_reclamos, message: "OK"})
    } catch (e) {
        return res.status(400).json({status: 400, message: "Error intentando obtener los datos.", messageDetail: e.message})
    }
};

exports.getReclamosByUsuario = async function (req, res, next) {
    var usuario = req.query.usuario

    try {
        var _reclamos = await ReclamosService.getReclamosByUsuario(usuario)
        console.log(_reclamos)
        return res.status(200).json({_reclamos, message: "OK"})
    } catch (e) {
        return res.status(400).json({status: 400, message: "Error intentando obtener los datos.", messageDetail: e.message})
    }
};

exports.createReclamo = async function (req, res, next) {
    
    console.log(req.files)
    console.log(req)

    var newReclamo = {
        direccion1: req.body.direccion1,
        direccion2: req.body.direccion2,
        tipo: req.body.tipo,
        descripcion: req.body.descripcion,
        imageFiles: req.files,
        usuario: req.body.usuario
    }

    console.log(newReclamo)

    try {
        var createdReclamo = await ReclamosService.createReclamo(newReclamo)
        return res.status(201).json({status: 201, createdReclamo, message: "Succesfully Created Reclamo"})
    } catch (e) {
        return res.status(400).json({status: 400, message: "Reclamo Creation was Unsuccesfull"})
    }
};

exports.findAll = (req, res) => {
    
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};