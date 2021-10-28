var User = require('../models/user.model');
const db = require("../models");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Vecinos = db.vecinos;
const Usuarios = db.usuarios;
const Sesiones = db.sesiones;
const Op = db.Sequelize.Op;

exports.solicitarAcceso = async function (user) {

    //BUSCO SI EL VECINO EXISTE, SI NO EXISTE NO PUEDO SOLICITAR ACCESO.
    var vecino = await Vecinos.findByPk(user.documento);

    if (!vecino) {
        return "NOVECINO";
    }

    var newUser = new Usuarios({
        documento: user.documento,
        password: null,
        nombre: user.nombre,
        apellido: user.apellido,
        preguntaSecreta: null,
        respuestaSecreta: null,
        email: user.email,
        habilitado: false,
        primerInicio: true,
        fechaCreacion: new Date(),
        fechaHabilitacion: null
    })

    try {
        var savedUser = await newUser.save();
        return savedUser;
    } catch (e) {
        throw Error("Error del sistema al solicitar el acceso del usuario")
    }
}

exports.activarUsuario = async function (user) {
    //GET USUARIO
    var documento = user.documento
    var condition = documento ? { documento: { [Op.eq]: `${documento}` } } : null;

    try {
        var oldUser = await Usuarios.findOne({ where: condition });
    } catch (e) {
        throw Error("Error del sistema al buscar por documento")
    }

    if (!oldUser) {
        return "NOUSUARIO";
    }

    oldUser.habilitado = true;
    oldUser.primerInicio = true;
    oldUser.fechaHabilitacion = new Date();

    try {
        var savedUser = await oldUser.save();
        return savedUser;

    } catch (e) {
        console.log(e)
        throw Error("Error del sistema al activar usuario")
    }
}

exports.verificarUsuarioActivo = async function (user) {
    //GET USUARIO
    var documento = user.documento
    var condition = documento ? { documento: { [Op.eq]: `${documento}` } } : null;

    try {
        var oldUser = await Usuarios.findOne({ where: condition });
    } catch (e) {
        throw Error("Error del sistema al buscar por documento")
    }

    if (!oldUser)
        return "NOUSUARIO";    

    if(oldUser.habilitado && oldUser.primerInicio)
        return 'CREARPASSWORD'
    
    if(oldUser.habilitado && !oldUser.primerInicio)
        return 'PEDIRPASSWORD'

    if(!oldUser.habilitado)
        return 'NOHABILITADO';
}

exports.crearAcceso = async function (user) {
    //GET USUARIO
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    var documento = user.documento
    var condition = documento ? { documento: { [Op.eq]: `${documento}` } } : null;

    try {
        var oldUser = await Usuarios.findOne({ where: condition });
    } catch (e) {
        throw Error("Error del sistema al buscar por documento")
    }

    if (!oldUser)
        return "NOUSUARIO";    
    
    oldUser.primerInicio = false;
    oldUser.password = hashedPassword;
    oldUser.preguntaSecreta = user.preguntaSecreta;
    oldUser.respuestaSecreta = user.respuestaSecreta;

    try {
        var savedUser = await oldUser.save();
        return savedUser;

    } catch (e) {
        console.log(e)
        throw Error("Error del sistema al crear el acceso")
    }
}

exports.accederVecino = async function (user) {
    try {
        var documento = user.documento
        var condition = documento ? { documento: { [Op.eq]: `${documento}` } } : null;
        var _details = await Usuarios.findOne({ where: condition });

        if(!_details)
            return 'NOUSUARIO'

        var passwordIsValid = bcrypt.compareSync(user.password, _details.password);
        if (!passwordIsValid) 
            return 'LOGINERROR'
 

        const payload = {
			check:  true
		};
		const token = jwt.sign(payload, _details.documento);

        //guardo datos en la sesion
        var newSesion = new Sesiones({
            UserId: _details.UserId,
            Token: token,
            FechaCreacion: new Date()
        })
    
        try {
            var savedSesion = await newSesion.save();
        } catch (e) {
            throw Error("Error del sistema al solicitar el acceso del usuario")
        }


        return { token: token, user: _details };
    } catch (e) {
        // return a Error message describing the reason  
        console.log(e)  
        return e
    }

}