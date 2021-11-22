var BarriosService = require('../services/barrios.services');

// Saving the context of this module inside the _the variable
_this = this;

exports.listarBarrios = async function (req, res, next) {
    try {
        var listaBarrios = await BarriosService.listarBarrios()
        return res.status(200).json({status: 200, listaBarrios, message: "OK"})
    } catch (e) {
        return res.status(500).json({status: 500, message: "Error intentando obtener los datos.", messageDetail: e.message})
    }
};

exports.crearBarrio = async function (req, res, next) {

  var newBarrio = {
      nombre: req.body.nombre
  }

  try {
      var barrioCreado = await BarriosService.crearBarrio(newBarrio)
      return res.status(200).json({status: 200, barrioCreado, message: "OK"})
  } catch (e) {
      return res.status(500).json({status: 500, message: "Error intentando crear el barrio.", messageDetail: e.message})
  }
};