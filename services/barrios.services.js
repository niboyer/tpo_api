const db = require("../models");

const Barrios = db.barrios;
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

exports.listarBarrios = async function () {
    try {
        var listObjects = await Barrios.findAll();
        return listObjects;
    } catch (e) {
        throw Error(e.message)
    }    
}