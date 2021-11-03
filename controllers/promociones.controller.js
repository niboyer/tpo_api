var PromocionesService = require('../services/promociones.service');

// Saving the context of this module inside the _the variable
_this = this;

exports.getPromocionesByTipo = async function (req, res, next) {
    var tipo = req.body.tipo

    try {
        var _promociones = await PromocionesService.getPromocionesByTipo(tipo)

        return res.status(200).json({_promociones, message: "OK"})
    } catch (e) {
        return res.status(400).json({status: 400, message: "Error al intentar solicitar el acceso.", messageDetail: e})
    }
}


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