//var Personal = require('../models/personal.model');
const db = require("../models");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const Personal = db.personal;
const SesionesPersonal = db.sesionesPersonal;
const Op = db.Sequelize.Op;

exports.crearAcceso = async function (personal) {
    //GET USUARIO
    //var hashedPassword = bcrypt.hashSync(personal.password, 8);

    var newPersonal = new Personal({
        password: personal.password,
        nombre: personal.nombre,
        apellido: personal.apellido,
        sector: personal.sector,
        cartegoria: personal.cartegoria,
        fechaIngreso: new Date()
    })

    try {
        var savedUser = await newPersonal.save();
        return savedUser;

    } catch (e) {
        console.log(e)
        throw Error("Error del sistema al crear el acceso")
    }
}

exports.accederPersonal = async function (personal) {
    try {
        console.log(personal)

        var legajo = personal.legajo
        var condition = legajo ? { legajo: { [Op.eq]: `${legajo}` } } : null;
        var _details = await Personal.findOne({ where: condition });

        if(!_details)
            return 'NOPERSONAL'

        var passwordIsValid = false
        if(personal.password == _details.password)
            passwordIsValid = true

        if (!passwordIsValid) 
            return 'LOGINERROR'
 
        var legajo = _details.legajo
        var condition = legajo ? { legajo: { [Op.eq]: `${legajo}` } } : null;
        var _sesion = await SesionesPersonal.findOne({ where: condition });
        var token;

        if(!_sesion){
            const payload = {
                check:  true
            };
            
            token = jwt.sign(payload, _details.legajo.toString());
            
            //guardo datos en la sesion
            var newSesion = new SesionesPersonal({
                legajo: _details.legajo,
                Token: token,
                FechaCreacion: new Date()
            })

            try {
                var savedSesion = await newSesion.save();
            } catch (e) {
                throw Error("Error del sistema al solicitar el acceso del usuario")
            }
        } else {
            token = _sesion.Token
        }

        return { token: token, personal: _details };
    } catch (e) {
        throw Error("Error del sistema al solicitar el acceso del usuario")
    }

}