const db = require("../models");

const Sitios = db.sitios;
const Op = db.Sequelize.Op;

exports.crearBarrio = async function (barrio) {

    var newObject = new Barrios({
        nombre: barrio.nombre
    })

    try {
        var savedObject = await newObject.save();
        return savedObject;
    } catch (e) {
        throw Error(e.message)
    }
}

exports.listarSitios = async function () {
    try {
        var listObjects = await Sitios.findAll();
        return listObjects;
    } catch (e) {
        throw Error(e.message)
    }    
}