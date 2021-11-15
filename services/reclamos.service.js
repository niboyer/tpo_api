const db = require("../models");
const Reclamos = db.reclamos;
const Op = db.Sequelize.Op;
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier')

cloudinary.config({
    cloud_name: 'dkzdetg2g',
    api_key: '694116824371623',
    api_secret: '-llUzX9C4sCAnOz3BWObuRtH344',
    secure: true
});

exports.getReclamosByTipo = async function (tipo) {
    var condition = tipo ? { tipo: { [Op.eq]: `${tipo}` } } : null;
    
    try {
        var _reclamos = await Reclamos.findAll({ where: condition });
        return _reclamos;
    } catch (e) {
        throw Error('Error de servicio: ' + e.message)
    }    
}

exports.getReclamosByUsuario = async function (usuario) {
    var condition = usuario ? { usuario: { [Op.eq]: `${usuario}` } } : null;
    
    try {
        var _reclamos = await Reclamos.findAll({ where: condition });
        return _reclamos;
    } catch (e) {
        throw Error('Error de servicio: ' + e.message)
    }    
}

exports.createReclamo = async function (reclamo) {
    let imageFiles = reclamo.imageFiles;
    let urlImagen = '';
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
                    urlImagen = urlImagen + '|' + result.url;
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
                urlImagen = urlImagen + '|' + result.url;
            }
        }

        var newReclamo = new Reclamos({
            direccion1: publicacion.direccion1,
            direccion2: publicacion.direccion2,
            tipo: publicacion.tipo,
            descripcion: publicacion.descripcion,
            urlImagenes: urlImagen,
            usuario: publicacion.usuario
        })


        var savedReclamo = await newReclamo.save();

        return savedReclamo;
    } catch (e) {
        throw Error('Error creando el reclamo: ' + e)
    }
}