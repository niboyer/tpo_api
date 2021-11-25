var DesperfectosService = require('../services/desperfectos.services');

// Saving the context of this module inside the _the variable
_this = this;

exports.listarDesperfectos = async function (req, res, next) {
    try {
        var listarDesperfectos = await DesperfectosService.listarDesperfectos()
        return res.status(200).json({status: 200, listarDesperfectos, message: "OK"})
    } catch (e) {
        return res.status(500).json({status: 500, message: "Error intentando obtener los datos.", messageDetail: e.message})
    }
};