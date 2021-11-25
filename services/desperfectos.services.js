const db = require("../models");

const Desperfectos = db.desperfectos;
const Op = db.Sequelize.Op;

exports.listarDesperfectos = async function () {
    try {
        var listObjects = await Desperfectos.findAll({
            order: [
                // Will escape title and validate DESC against a list of valid direction parameters
                ['descripcion', 'ASC'],
            ]
        });
        return listObjects;
    } catch (e) {
        throw Error(e.message)
    }    
}