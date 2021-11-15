var DenunciasService = require('../services/denuncias.service');

// Saving the context of this module inside the _the variable
_this = this;

exports.getDenunciasByID = async function (req, res, next) {
    var id = req.query.id

    try {
        var _denuncias = await DenunciasService.getDenunciasByID(id)
        console.log(_denuncias)
        return res.status(200).json({_denuncias, message: "OK"})
    } catch (e) {
        return res.status(400).json({status: 400, message: "Error intentando obtener los datos.", messageDetail: e.message})
    }
};

exports.createDenuncia = async function (req, res, next) {
    
    console.log(req.files)
    console.log(req)

    var newDenuncia = {
        nombre: req.body.nombre,
        direccion1: req.body.direccion1,
        direccion2: req.body.direccion2,
        motivo: req.body.motivo,
        descripcion: req.body.descripcion,
        imageFiles: req.files,
        estado: 'creada', 
        denunciante: req.body.denunciante
    }

    console.log(newDenuncia)

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