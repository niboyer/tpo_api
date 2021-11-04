var PublicacionesService = require('../services/publicaciones.service');

// Saving the context of this module inside the _the variable
_this = this;

exports.getPublicacionesByTipo = async function (req, res, next) {
    var tipo = req.query.tipo

    try {
        var _publicaciones = await PublicacionesService.getPublicacionesByTipo(tipo)
        console.log(_publicaciones)
        return res.status(200).json({_publicaciones, message: "OK"})
    } catch (e) {
        return res.status(400).json({status: 400, message: "Error intentando obtener los datos.", messageDetail: e.message})
    }
};

exports.createPublicacion = async function (req, res, next) {
    
    console.log(req.files)
    console.log(req)

    var newPublicacion = {
        nombre: req.body.nombre,
        horarios: req.body.horarios,
        rubros: req.body.rubros,
        descripcion: req.body.descripcion,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        email: req.body.email,
        imageFiles: req.files,
        tipoPublicacion: req.body.tipoPublicacion
    }

    console.log(newPublicacion)

    try {
        var createdPublicacion = await PublicacionesService.createPublicacion(newPublicacion)
        return res.status(201).json({status: 201, createdPublicacion, message: "Succesfully Created Publicacion"})
    } catch (e) {
        return res.status(400).json({status: 400, message: "Publicacion Creation was Unsuccesfull"})
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