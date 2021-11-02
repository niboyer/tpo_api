var PersonalService = require('../services/personal.services');

// Saving the context of this module inside the _the variable
_this = this;

exports.crearAcceso = async function(req, res, next){
    
    if(!req.body.nombre)
        return res.status(500).json({status: 500, message: "Falta parametro Documento"})
    
    var personal = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        password: req.body.password,
        sector: req.body.sector,
        cartegoria: req.body.cartegoria
    }

    try {
        var activo = await PersonalService.crearAcceso(personal)

        if(activo === "NOPERSONAL")
            return res.status(404).json({status: 404, message: "PERSONAL no encontrado, debe primero solicitar acceso."})

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

exports.accederPersonal = async function (req, res, next) {
    var personal = {
        legajo: req.body.legajo,
        password: req.body.password
    }

    try {
        // Calling the Service function with the new object from the Request Body
        var loginUser = await PersonalService.accederPersonal(personal);

        if(loginUser === "NOPERSONAL")
            return res.status(404).json({status: 404, message: "PERSONAL no encontrado, debe primero solicitar acceso."})

        if(loginUser==='LOGINERROR')
            return res.status(401).json({status: 401, message: "Documento o contraseña invalido"})

        return res.status(200).json({loginUser, status: 200, message: "Succesfully login"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(500).json({status: 400, message: e})
    }
}