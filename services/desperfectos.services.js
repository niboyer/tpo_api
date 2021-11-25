const db = require("../models");

const Desperfectos = db.desperfectos;
const Op = db.Sequelize.Op;

exports.listarDesperfectos = async function () {
    try {
        var listObjects = await Desperfectos.findAll();
        return listObjects;
    } catch (e) {
        throw Error(e.message)
    }    
}