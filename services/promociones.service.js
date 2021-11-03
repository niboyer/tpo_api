const db = require("../models");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const Promociones = db.promociones;
const Op = db.Sequelize.Op;

exports.getPromocionesByTipo = async function (tipo) {
    var condition = tipo ? { tipoServicio: { [Op.eq]: `${tipo}` } } : null;
    
    var _promociones = await Promociones.findAll({ where: condition });
    
    return _promociones;
}