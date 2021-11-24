var SitiosService = require('../services/sitios.services');

// Saving the context of this module inside the _the variable
_this = this;

exports.listarSitios = async function (req, res, next) {
    try {
        var listarSitios = await SitiosService.listarSitios()
        return res.status(200).json({status: 200, listarSitios, message: "OK"})
    } catch (e) {
        return res.status(500).json({status: 500, message: "Error intentando obtener los datos.", messageDetail: e.message})
    }
};