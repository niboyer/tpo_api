var ReclamosService = require('../services/reclamos.service');

// Saving the context of this module inside the _the variable
_this = this;

exports.getReclamosByDesperfectoAndDocumento = async function (req, res, next) {
    var desperfecto = req.query.idDesperfecto
    var documento = req.query.documento

    try {
        var _reclamos = await ReclamosService.getReclamosByDesperfectoAndDocumento(desperfecto, documento)
        return res.status(200).json({status: 200, message: "OK", _reclamos })
    } catch (e) {
        return res.status(500).json({status: 500, message: "Error intentando obtener los datos.", messageDetail: e.message})
    }
};

exports.getReclamosByDesperfecto = async function (req, res, next) {
    var desperfecto = req.query.idDesperfecto

    try {
        var _reclamos = await ReclamosService.getReclamosByDesperfecto(desperfecto)
        return res.status(200).json({status: 200, message: "OK", _reclamos })
    } catch (e) {
        return res.status(500).json({status: 500, message: "Error intentando obtener los datos.", messageDetail: e.message})
    }
};

exports.getReclamosByDocumento = async function (req, res, next) {
    var documento = req.query.documento

    try {
        var _reclamos = await ReclamosService.getReclamosByDocumento(documento)
        return res.status(200).json({status: 200, message: "OK", _reclamos })
    } catch (e) {
        return res.status(500).json({status: 500, message: "Error intentando obtener los datos.", messageDetail: e.message})
    }
};

exports.getMovimientosByIdReclamo = async function (req, res, next) {
    var idReclamo = req.query.idReclamo

    try {
        var _reclamos = await ReclamosService.getMovimientosByIdReclamo(idReclamo)
        return res.status(200).json({status: 200, message: "OK", _reclamos })
    } catch (e) {
        return res.status(500).json({status: 500, message: "Error intentando obtener los datos.", messageDetail: e.message})
    }
};

exports.createReclamo = async function (req, res, next) {

    var newReclamo = {
        idSitio: req.body.idSitio,
        idDesperfecto: req.body.idDesperfecto,
        descripcion: req.body.descripcion,
        imageFiles: req.files,
        documento: req.body.documento
    }

    try {
        var createdReclamo = await ReclamosService.createReclamo(newReclamo)
        return res.status(200).json({status: 200, createdReclamo, message: "Succesfully Created Reclamo"})
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({status: 500, message: "Reclamo Creation was Unsuccesfull"})
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