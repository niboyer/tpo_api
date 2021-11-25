const db = require("../models");
const Reclamos = db.reclamos;
const ReclamosExtendidas = db.reclamosExtendidas;
const MovimientosReclamo = db.movimientosReclamo;
const Op = db.Sequelize.Op;
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier')

cloudinary.config({
    cloud_name: 'dkzdetg2g',
    api_key: '694116824371623',
    api_secret: '-llUzX9C4sCAnOz3BWObuRtH344',
    secure: true
});


exports.getMovimientosByIdReclamo = async function (idReclamo) {
    var condition = idReclamo ? { idReclamo: { [Op.eq]: `${idReclamo}`}} : null;
    
    try {
        var _reclamos = await MovimientosReclamo.findAll({ where: condition});
        return _reclamos;
    } catch (e) {
        throw Error('Error de servicio: ' + e.message)
    }    
}

exports.getReclamosByDesperfectoAndDocumento = async function (idDesperfecto, documento) {
    var doc = documento ? documento : ''
    var condition = idDesperfecto ? { idDesperfecto: { [Op.eq]: `${idDesperfecto}`}, documento: { [Op.like]: `%${doc}%` }} : null;
    
    try {
        var _reclamos = await Reclamos.findAll({ where: condition, include: ["reclamosExtendidas","parent","sitio","desperfecto","movimientosReclamo"] });
        return _reclamos;
    } catch (e) {
        throw Error('Error de servicio: ' + e.message)
    }    
}

exports.getReclamosByDesperfecto = async function (idDesperfecto) {
    var condition = idDesperfecto ? { idDesperfecto: { [Op.eq]: `${idDesperfecto}` } } : null;
    
    try {
        var _reclamos = await Reclamos.findAll({ where: condition, include: ["reclamosExtendidas","parent","sitio","desperfecto","movimientosReclamo"] });
        return _reclamos;
    } catch (e) {
        throw Error('Error de servicio: ' + e.message)
    }    
}

exports.getReclamosByDocumento = async function (documento) {
    var condition = documento ? { documento: { [Op.eq]: `${documento}` } } : null;
    
    try {
        var _reclamos = await Reclamos.findAll({ where: condition, include: ["reclamosExtendidas","parent","sitio","desperfecto","movimientosReclamo"] });
        return _reclamos;
    } catch (e) {
        throw Error('Error de servicio: ' + e.message)
    }    
}

exports.createReclamo = async function (reclamo) {
    let imageFiles = reclamo.imageFiles;
    let urlImagen = [];
    try {
        if (imageFiles !== null) {
            if (imageFiles.files.length !== undefined) {
                for (let i = 0; i < imageFiles.files.length; i++) {
                    let streamUpload = (imageFiles, i) => {
                        return new Promise((resolve, reject) => {
                            let stream = cloudinary.uploader.upload_stream(
                                (error, result) => {
                                    if (result) {
                                        resolve(result);
                                    } else {
                                        reject(error);
                                    }
                                }
                            );
                            streamifier.createReadStream(imageFiles.files[i].data).pipe(stream);
                        });
                    };

                    let result = await streamUpload(imageFiles, i);
                    urlImagen.push(result.url);
                }
            } else {
                let streamUpload = (imageFiles) => {
                    return new Promise((resolve, reject) => {
                        let stream = cloudinary.uploader.upload_stream(
                            (error, result) => {
                                if (result) {
                                    resolve(result);
                                } else {
                                    reject(error);
                                }
                            }
                        );
                        streamifier.createReadStream(imageFiles.files.data).pipe(stream);
                    });
                };

                let result = await streamUpload(imageFiles);
                urlImagen.push(result.url);
            }
        }

        var newReclamo = new Reclamos({
            idSitio: reclamo.idSitio,
            idDesperfecto: reclamo.idDesperfecto,
            descripcion: reclamo.descripcion,
            documento: reclamo.documento,
            estado: "Pendiente de Revision",
        })


        var savedReclamo = await newReclamo.save();

        urlImagen.forEach(async function(elemento, indice, array) {
            var newReclamoExtendida = new ReclamosExtendidas({
                idReclamo: savedReclamo.idReclamo,
                urlImagenes: elemento,
           });
   
           var savedReclamoExtendida = await newReclamoExtendida.save();
        })       

        return savedReclamo;
    } catch (e) {
        throw Error('Error creando el reclamo: ' + e)
    }
}