var UserService = require('../services/users.services');

// Saving the context of this module inside the _the variable
_this = this;

exports.solicitarAcceso = async function (req, res, next) {
    var user = {
        documento: req.body.documento,
        email: req.body.email,
        nombre: req.body.nombre,
        apellido: req.body.apellido
    }

    try {
        var createdUser = await UserService.solicitarAcceso(user)

        if(createdUser==="NOVECINO")
            return res.status(404).json({status: 404, message: "Vecino no encontrado, acerquese al municipio para mayor informacion."})

        return res.status(200).json({createdUser, message: "Acceso solicitado correctamente"})
    } catch (e) {
        return res.status(400).json({status: 400, message: "Error al intentar solicitar el acceso.", messageDetail: e})
    }
}

exports.activarUsuario = async function(req, res, next){
    var user = {
        documento: req.body.documento,
        email: req.body.email
    }

    try {
        var updatedUser = await UserService.activarUsuario(user)

        if(updatedUser==="NOUSUARIO")
            return res.status(404).json({status: 404, message: "Usuario no encontrado, debe primero solicitar acceso"})

        return res.status(200).json({updatedUser, message: "Usuario activado correctamente"})
    } catch (e) {
        return res.status(400).json({status: 400, message: "Error al intentar activar el usuario.", messageDetail: e})
    }
}

exports.verificarUsuarioActivo = async function(req, res, next){
    
    if(!req.body.documento)
        return res.status(500).json({status: 500, message: "Falta parametro Documento"})
    
    var user = {
        documento: req.body.documento
    }

    try {
        var activo = await UserService.verificarUsuarioActivo(user) 

        if(activo==="NOUSUARIO")
            return res.status(404).json({status: 404, message: "Usuario no encontrado, debe primero solicitar acceso."})

        if(activo==="NOHABILITADO")
            return res.status(403).json({status: 403, message: "Usuario no habilitado para el acceso."})

        if(activo==="CREARPASSWORD")
            return res.status(201).json({status: 201, message: "Primer inicio, cree su contraseña"})

        return res.status(200).json({status: 200, message: "Usuario activo, solicitar ingreso de contraseña"})

    } catch (e) {
        return res.status(400).json({status: 400, message: "Error al intentar activar el usuario.", messageDetail: e})
    }
}

exports.crearAcceso = async function(req, res, next){
    
    if(!req.body.documento)
        return res.status(500).json({status: 500, message: "Falta parametro Documento"})
    
    var user = {
        documento: req.body.documento,
        password: req.body.password,
        preguntaSecreta: req.body.preguntaSecreta,
        respuestaSecreta: req.body.respuestaSecreta
    }

    try {
        var activo = await UserService.crearAcceso(user)

        if(activo === "NOUSUARIO")
            return res.status(404).json({status: 404, message: "Usuario no encontrado, debe primero solicitar acceso."})

        return res.status(200).json({status: 200, message: "Acceso creado correctamente"})

    } catch (e) {
        return res.status(400).json({status: 400, message: "Error al intentar crear el acceso", messageDetail: e})
    }
}

exports.findAll = (req, res) => {
    
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};

exports.accederVecino = async function (req, res, next) {
    var User = {
        documento: req.body.documento,
        password: req.body.password
    }

    try {
        // Calling the Service function with the new object from the Request Body
        var loginUser = await UserService.accederVecino(User);

        if(loginUser === "NOUSUARIO")
            return res.status(404).json({status: 404, message: "Usuario no encontrado, debe primero solicitar acceso."})

        if(loginUser==='LOGINERROR')
            return res.status(401).json({status: 401, message: "Documento o contraseña invalido"})

        return res.status(200).json({loginUser, status: 200, message: "Succesfully login"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(500).json({status: 400, message: e})
    }
}