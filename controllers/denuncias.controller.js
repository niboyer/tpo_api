var DenunciasService = require('../services/denuncias.services');

_this = this;

exports.getDenunciasByID = async function (req, res, next) {
    var id = req.query.id

    try {
        var _denuncias = await DenunciasService.getDenunciasByID(id)
        return res.status(200).json({_denuncias, message: "OK"})
    } catch (e) {
        return res.status(400).json({status: 400, message: "Error intentando obtener los datos.", messageDetail: e.message})
    }
};

exports.getDenunciasByDocumento = async function (req, res, next) {
    var documento = req.query.documento

    try {
        var _denuncias = await DenunciasService.getDenunciasByDocumento(documento)
        return res.status(200).json({_denuncias, message: "OK"})
    } catch (e) {
        return res.status(400).json({status: 400, message: "Error intentando obtener los datos.", messageDetail: e.message})
    }
};

exports.createDenuncia = async function (req, res, next) {

    var newDenuncia = {
        documento: req.body.documento,
        idSitio: req.body.idSitio,
        descripcion: req.body.descripcion,
        imageFiles: req.files,
        estado: 'creada', 
        aceptaResponsabilidad: req.body.aceptaResponsabilidad,
        descripcionDenunciado: req.body.descripcionDenunciado
    }
    
    try {
        var createdDenuncia = await DenunciasService.createDenuncia(newDenuncia)
        return res.status(201).json({status: 201, createdDenuncia, message: "Succesfully Created Denuncia"})
    } catch (e) {
        return res.status(400).json({status: 400, message: "Denuncia Creation was Unsuccesfull"})
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